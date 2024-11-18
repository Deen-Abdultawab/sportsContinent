<template>
    <div>
        <form @submit.prevent="handleLogin">
            <h3 class="font-Raleway font-[700] text-[1.25rem] leading-[1.6rem] text-center">LOG IN</h3>
            <div class="mt-[3.06rem] flex flex-col gap-6">
                <AuthInput
                    :error="errors.email"
                    v-model="formState.email"
                    type="email"
                    placeholder="Email Address*"
                    id="email"
                />
                <PasswordInput
                    :error="errors.password"
                    :errorsMsg="errorsMsg?.password || !isValidPassword"
                    v-model="formState.password"
                    placeholder="Password*"
                    id="create_password"
                    @keyup.enter="handleLogin"
                />
            </div>
            <router-link to="/forgot-password">
              <p class="text-center font-[600] font-openSans text-[1rem] leading-[1.2rem] text-[#3B3B3B] my-[2rem] cursor-pointer">Forgot Password?</p>
            </router-link>

            <button class="black_btn mb-[3rem] w-full py-[1rem] px-[auto] hover:!bg-textCol hover:!text-white">
                <Loader v-if="loading" color="#fffff !important"/>
             <span v-else>Log In</span>
            </button>
        </form>
        <div class="hidden">
            <div class="flex items-center gap-[1.0625rem]">
                <span class="flex-1 border border-[#646464]"></span>
                <h3 class="font-openSans font-[500] text-[1rem] leading-[1.2rem]">Continue with</h3>
                <span class="flex-1 border border-[#646464]"></span>
            </div>
            <div class="mt-[1.5rem] flex flex-col gap-6">
                <div class="flex items-center justify-center altSignup">
                    <GoogleIcon />
                    <h3>Continue with Google</h3>
                </div>
                <div class="flex items-center justify-center altSignup">
                    <AppleIcon />
                    <h3>Continue with Apple</h3>
                </div>
                <div class="flex items-center justify-center altSignup">
                    <FacebookIcon />
                    <h3>Continue with Facebook</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { login } from '@/services/Auth';
import GoogleIcon from '@/components/icons/GoogleIcon.vue';
import AppleIcon from '@/components/icons/AppleIcon.vue';
import FacebookIcon from '@/components/icons/FacebookIcon.vue';
import Loader from "@/components/Loader/WhiteLoader.vue"
import AuthInput from "@/components/Forms/Inputs/AuthInputs/AuthInput.vue"
import PasswordInput from "@/components/Forms/Inputs/AuthInputs/PasswordInput.vue"
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
import { userStore } from '@/stores/user';
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';

const cartStore = useCartStore()
const { cartValue, cartCount } = storeToRefs(cartStore)

const store = userStore()
const {user} = storeToRefs(store)
const router = useRouter()
const toast = useToast();
const loading = ref(false)
const formState = reactive({
  email: "",
  password: "",
});

const errors = reactive({
  email: false,
  password: false,
});
const errorsMsg = {
  password: "",
};
const isValidEmail = computed(() => {
  return formState.email.trim() !== "";
});

const isValidPassword = computed(() => {
  return formState.password.trim() !== "";
});

const validateForm = () => {
  // Reset errorsMsg
  Object.keys(errors).forEach((key) => {
    errors[key] = false;
  });

  // Perform validation before submission
  let isValid = true;

  if (!isValidEmail.value) {
    errors.email = true;
    errorsMsg.email = "Email is required"
    isValid = false;
  }

  if (!isValidPassword.value) {
    errors.password = true;
    errorsMsg.password = "Password is required";
    isValid = false;
  }

  return isValid; // Only return false if there are validation errors
};

const clearInputErrors = () => {
  Object.keys(errors).forEach((key) => {
    errors[key] = false;
  });

  Object.keys(errorsMsg).forEach((key) => {
    errorsMsg[key] = "";
  });
};

watch(formState, () => {
  clearInputErrors();
});

const handleLogin = async ()=>{
    loading.value = true
    if (!validateForm()) {
        loading.value = false;
        return;
    }
    try {
        let res = await login(formState.email, formState.password)
        if(res.status === 200){
          store.saveUser(res?.data?.user)
          if(res?.data?.user?.role === 'ADMIN'){
            router.push({ name: 'dashboard'})
          } else {
            router.go(-1)
          }
        }
        loading.value = false
    } catch (error) {
        console.log(error)
        toast.error("incorrect login credentials", {
          timeout: 4000,
        });
        loading.value = false
    }
  }

</script>

<style lang="scss" scoped>

</style>