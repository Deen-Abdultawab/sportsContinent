<template>
    <div>
        <form @submit.prevent="handleSignup">
            <h3 class="font-Raleway font-[700] text-[1.25rem] leading-[1.6rem] text-center">CREATE ACCOUNT </h3>
            <div class="mt-[3.06rem] flex flex-col gap-6">
                <AuthInput 
                    :error="errors.firstName"
                    :errorMsg="errorsMsg?.firstName"
                    type="text"
                    id="first_name"
                    placeholder="First Name*"
                    v-model="formData.firstName"
                />

                <AuthInput 
                    :error="errors.lastName"
                    :errorMsg="errorsMsg?.lastName"
                    type="text"
                    id="last_name"
                    placeholder="Last Name*"
                    v-model="formData.lastName"
                />
               
                <AuthInput
                    :error="errors.email"
                    :errorsMsg="errorsMsg?.email"
                    v-model="formData.email"
                    type="email"
                    placeholder="Email Address*"
                    id="email"
                />

                <AuthInput
                    :error="errors.phone_number"
                    :errorsMsg="errorsMsg?.phone_number"
                    v-model="formData.phone_number"
                    type="tel"
                    placeholder="Enter Phone Number with Country Code*"
                    id="tel"
                />

                <PasswordInput
                    :error="errors.password"
                    :errorsMsg="errorsMsg?.password || !isValidPassword"
                    v-model="formData.password"
                    placeholder="Password*"
                    id="create_password"
                />

                <div
                    v-if="formData.password.length && !isValidPassword"
                    class="flex flex-col font-Satoshi400 text-gray-400 text-[12px] gap-2"
                >
                    <div class="flex items-center gap-2">
                    <div
                        :class="{
                        ' bg-[#55eb37]': isMinLengthMet,
                        ' bg-gray-200': !isMinLengthMet,
                        }"
                        class="h-3 w-3 flex justify-center items-center rounded-full"
                    ></div>
                    <p>A minimum of 8 characters</p>
                    </div>
                    <div class="flex items-center gap-2">
                    <div
                        :class="{
                        ' bg-[#55eb37]': isAtLeastOneNumber,
                        ' bg-gray-200': !isAtLeastOneNumber,
                        }"
                        class="h-3 w-3 flex justify-center items-center rounded-full"
                    ></div>
                    <p>Atleast one number</p>
                    </div>
                    <div class="flex items-center gap-2">
                    <div
                        :class="{
                        ' bg-[#55eb37]': isAtLeastOneSpecialChar,
                        ' bg-gray-200': !isAtLeastOneSpecialChar,
                        }"
                        class="h-3 w-3 flex justify-center items-center rounded-full"
                    ></div>
                    <p>Atleast one special character</p>
                    </div>
                    <div class="flex items-center gap-2">
                    <div
                        :class="{
                        ' bg-[#55eb37]': isAtLeastOneLowercase,
                        ' bg-gray-200': !isAtLeastOneLowercase,
                        }"
                        class="h-3 w-3 flex justify-center items-center rounded-full"
                    ></div>
                    <p>Atleast one lowercase letter</p>
                    </div>
                    <div class="flex items-center gap-2">
                    <div
                        :class="{
                        ' bg-[#55eb37]': isAtLeastOneUppercase,
                        ' bg-gray-200': !isAtLeastOneUppercase,
                        }"
                        class="h-3 w-3 flex justify-center items-center rounded-full"
                    ></div>
                    <p>Atleast one uppercase letter</p>
                    </div>
                </div>

                <PasswordInput
                    :error="errors.confirmPassword || !passwordsMatch"
                    :errorsMsg="errorsMsg?.confirmPassword"
                    placeholder="Confirm Password*"
                    v-model="confirmPassword"
                    id="confirm_password"
                />
            </div>
            <button class="black_btn my-[4rem] w-full py-[1rem] px-[auto] hover:!bg-textCol hover:!text-white">
              <Loader v-if="loading"/>
             <span v-else> Create Account</span>
            </button>
        </form>
        <div class="hidden">
            <div class="flex items-center gap-[1.0625rem]">
                <span class="flex-1 border border-[#646464]"></span>
                <h3 class="font-openSans font-[500] text-[1rem] leading-[1.2rem]">Create Account with</h3>
                <span class="flex-1 border border-[#646464]"></span>
            </div>
            <div class="mt-[1.5rem] flex flex-col gap-6">
              <a href="">
                <div class="flex items-center justify-center altSignup">
                    <GoogleIcon />
                    <h3>Create account with Google</h3>
                </div>
              </a>
                <div class="flex items-center justify-center altSignup">
                    <AppleIcon />
                    <h3>Create account with Apple</h3>
                </div>
                <div class="flex items-center justify-center altSignup">
                    <FacebookIcon />
                    <h3>Create account with Facebook</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { registerCustomer } from '@/services/Auth';
import GoogleIcon from '@/components/icons/GoogleIcon.vue';
import AppleIcon from '@/components/icons/AppleIcon.vue';
import FacebookIcon from '@/components/icons/FacebookIcon.vue';
import Loader from "@/components/Loader/WhiteLoader.vue"
import AuthInput from "@/components/Forms/Inputs/AuthInputs/AuthInput.vue"
import PasswordInput from "@/components/Forms/Inputs/AuthInputs/PasswordInput.vue"
import { storeToRefs } from "pinia";
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
import { userStore } from '@/stores/user';

const store = userStore()
const toast = useToast();
const loading = ref(false)
const confirmPassword = ref("");
const router = useRouter()


const formData = reactive({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phone_number: "",
});

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

const isValidEmail = computed(() => {
  return emailRegex.test(formData.email);
});

const isValidPassword = computed(() => {
  return passwordRegex.test(formData.password);
});

const isMinLengthMet = computed(() => {
  return formData.password.length >= 8;
});

const isAtLeastOneNumber = computed(() => {
  return /\d/.test(formData.password);
});

const isAtLeastOneSpecialChar = computed(() => {
  return /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]+/.test(formData.password);
});

const isAtLeastOneLowercase = computed(() => {
  return /[a-z]/.test(formData.password);
});

const isAtLeastOneUppercase = computed(() => {
  return /[A-Z]/.test(formData.password);
});

const errors = reactive({
  firstName: false,
  lastName: false,
  email: false,
  password: false,
  confirmPassword: false,
  business_name: false,
  phone_number: false,
});

const errorsMsg = {
  firstName: "First name is required",
  lastName: "Last name is required",
  email: "Email is required",
  password: "Password is required",
  confirmPassword: "Password does not match",
  business_name: "Business name is required",
  country_code: "country code is required",
  phone_number: "phone number is required",
};

const clearInputErrors = () => {
  Object.keys(errors).forEach((key) => {
    errors[key] = false;
  });

  Object.keys(errorsMsg).forEach((key) => {
    errorsMsg[key] = "";
  });
};

const passwordsMatch = computed(() => {
  return formData.password === confirmPassword.value;
});

const validateForm = () => {
  // Reset errorsMsg
  Object.keys(errors).forEach((key) => {
    errors[key] = false;
  });

  // Perform validation before submission
  let isValid = true;

  Object.keys(formData).forEach((key) => {
    if (!formData[key]) {
      errors[key] = true;
      isValid = false;
    }
  });
  if (!isValidEmail.value) {
    errors.email = true;
    errorsMsg.email = "Email is required";
    isValid = false;
  }

  if (!isValidPassword.value) {
    errors.password = true;
    errorsMsg.password = "Password is required";
    isValid = false;
  }
  if (formData.phone_number === "") {
    errors.phone_number = true;
    errorsMsg.phone_number = "phone number is required";
    isValid = false;
  }
  if (formData.password !== confirmPassword.value) {
    errors.confirmPassword = true;
    errorsMsg.confirmPassword = "Password does not match"
    isValid = false;
  }

  return isValid;
};

watch(formData, () => {
  clearInputErrors();
});

const handleSignup = async () => {
    loading.value = true
    if (!validateForm()) {
        loading.value = false;
        return;
    }
    let payload = {
      "email": formData.email,
      "firstName": formData.firstName,
      "lastName": formData.lastName,
      "password": formData.password,
      "phone": formData.phone_number
    }
    try {
        const res = await registerCustomer(payload)
        if(res?.statusText == "Created"){
          store.saveUser(res?.data?.user)
          router.go(-1)
        }
        loading.value = false
    } catch (error) {
        console.log(error)
        toast.error(`${error.response.data.error}`, {
          timeout: 4000,
        });
        loading.value = false
    } finally {
        loading.value = false;
    }
}

onMounted(()=>{
  const urlString = window.location.href;
})


</script>

<style lang="scss" scoped>

</style>