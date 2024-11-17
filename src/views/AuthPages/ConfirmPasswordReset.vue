<template>
  <Navbar />
    <section class="forget_password w-[60.07%] mob:w-[90%] mx-auto mt-[5rem] mb-[10.69rem] px-[2rem] mob:p-0">
     <div class="flex justify-center flex-col">
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
         <h1 class="font-Raleway text-[#000] font-[700] text-[1.5rem] leading-[1.75rem] mb-[1.5rem] text-center">
             NEW PASSWORD
         </h1>
         <p class="font-openSans text-[#3b3b3b] text-[1.25rem] leading-[1.5rem] text-center">
            Set new password for your account
         </p>
         <div class="mt-[3rem] mb-[2rem] flex flex-col gap-6">
            <!-- <AuthInput
                :error="errors.email"
                :errorsMsg="errorsMsg?.email"
                v-model="formData.email"
                type="email"
                placeholder="Email Address*"
                id="email"
            /> -->
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
         <button class="black_btn" @click="handleResetPassword">
             <Loader v-if="loading"/>
             <span v-else>Continue</span>
         </button>
     </div>
    </section>
    <Footer />
 </template>
 
 <script setup>
 import Navbar from '@/components/Navbar.vue';
 import Footer from '@/components/Footer.vue';
 import AuthInput from "@/components/Forms/Inputs/AuthInputs/AuthInput.vue"
 import PasswordInput from "@/components/Forms/Inputs/AuthInputs/PasswordInput.vue";
 import { reactive, watch, computed, ref } from 'vue';
 import { useRouter } from 'vue-router';
 import { useToast } from "vue-toastification";
 import Loader from "@/components/Loader/WhiteLoader.vue"
 
 const loading = ref(false)
 const router = useRouter()
 const toast = useToast();
 const confirmPassword = ref('')

 const formData = reactive({
  password: "",
  email: ""
});

 const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

 const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

 const isValidPassword = computed(() => {
    return passwordRegex.test(formData.password);
  });

  const isValidEmail = computed(() => {
    return emailRegex.test(formData.email);
  });

  const passwordsMatch = computed(() => {
    return formData.password === confirmPassword.value;
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
   password: false,
   email: false
 });
 
 const formState = reactive({
   password: "",
   email: ""
 });
 
 const errorsMsg = {
    email: "",
    confirmPassword: "",
    password: ""
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

  if (formData.password !== confirmPassword.value) {
    errors.confirmPassword = true;
    errorsMsg.confirmPassword = "Password does not match"
    isValid = false;
  }
 
 
   return isValid; // Only return false if there are validation errors
 };
 
 const handleResetPassword = async ()=>{
     loading.value = true
     if (!validateForm()) {
         loading.value = false;
         return;
     }
     try {
        //  const res = await medusa.customers.resetPassword({
        //     email: formState.email,
        //     password: formState.password,
        //     token: token,
        //   })
          
        //  if(res.response.statustext === "OK"){
        //      toast.success("Password Successfully Updated", {
        //      timeout: 4000,
        //    });
        //  }
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