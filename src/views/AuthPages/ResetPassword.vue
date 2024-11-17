<template>
  <Navbar />
   <section class="forget_password w-[60.07%] mob:w-[90%] mx-auto mt-[5rem] mb-[10.69rem] px-[2rem] mob:p-0">
    <div class="flex justify-center flex-col text-center">
        <div class="flex justify-end mb-[3rem] cursor-pointer" @click="routeBack">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_177_737)">
                <path d="M6 6L18.7279 18.7279" stroke="#3B3B3B" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M5.63672 19L18.3646 6.27208" stroke="#3B3B3B" stroke-width="1.5" stroke-linecap="round"/>
                </g>
                <defs>
                <clipPath id="clip0_177_737">
                <rect width="24" height="24" rx="12" fill="white"/>
                </clipPath>
                </defs>
            </svg>
        </div>
        <h1 class="font-Raleway text-[#000] font-[700] text-[1.5rem] leading-[1.75rem] mb-[1.5rem]">
            FORGOT PASSWORD
        </h1>
        <p class="font-openSans text-[#3b3b3b] text-[1.25rem] leading-[1.5rem]">
            Enter your email for the verification process, we will send 4 digit code to your email.
        </p>
        <div class="mt-[3rem] mb-[2rem]">
            <AuthInput
                :error="errors.email"
                v-model="formState.email"
                type="email"
                placeholder="Email Address*"
                id="email"
            />
        </div>
        <button class="black_btn" @click="handleRequestToken">
            <Loader v-if="loading"/>
            <span v-else>Continue</span>
        </button>
        <p class="font-openSans text-[#3b3b3b] text-[1.25rem] leading-[1.5rem] mt-[1.5rem]">If you didn’t receive a code! <span class="text-[#f2451c]" @click="handleRequestToken">Resend</span></p>
    </div>
   </section>
   <Footer />
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import AuthInput from "@/components/Forms/Inputs/AuthInputs/AuthInput.vue"
import { reactive, watch, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
import Loader from "@/components/Loader/WhiteLoader.vue"

const loading = ref(false)
const router = useRouter()
const toast = useToast();
const errors = reactive({
  email: false,
});

const formState = reactive({
  email: "",
});

const isValidEmail = computed(() => {
  return formState.email.trim() !== "";
});

const errorsMsg = {
  email: "",
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

const routeBack = ()=>{
    router.back()
}

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


  return isValid; // Only return false if there are validation errors
};

const handleRequestToken = async ()=>{
    loading.value = true
    if (!validateForm()) {
        loading.value = false;
        return;
    }
    try {
        
        loading.value = false
    } catch (error) {
        console.log(error)
        toast.error("user email does not exist", {
          timeout: 4000,
        });
        loading.value = false
    }
}

</script>

<style lang="scss" scoped>

</style>