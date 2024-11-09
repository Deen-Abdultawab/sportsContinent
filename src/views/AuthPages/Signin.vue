<template>
   <section class="w-[60.07%] mob:w-[90%] mx-auto mt-[5rem] mb-[10.69rem] px-[2rem] mob:p-0">
    <div class="flex justify-end mb-[1.4rem] cursor-pointer" @click="routeBack">
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
    <div class="flex justify-between items-center">
        <h1 
        class="cursor-pointer font-Raleway font-[700] text-[1.25rem] leading-[1.5rem] text-center flex-1 pb-[1.69rem] border-b-2"
        :class="showSignup? 'text-textCol border-b-textCol': 'text-[#D9D9D9] border-b-[#D9D9D9]'"
        @click="handleShowSignup"
        >CREATE ACCOUNT</h1>
        <div class="border-2 bg-[#D9D9D9] border-[#D9D9D9] mb-[1.69rem] h-[30px]"></div>
        <h1 
        class="cursor-pointer font-Raleway font-[700] text-[1.25rem] leading-[1.5rem] text-center flex-1 pb-[1.69rem] border-b-2"
        :class="showLogin? 'text-textCol border-b-textCol': 'text-[#D9D9D9] border-b-[#D9D9D9]'"
        @click="handleShowLogin"
        >LOG IN</h1>
    </div>
    <div class="form_container mt-[3rem]">
        <article 
        class="create_account"
        v-if="showSignup"
        >
            <SignupForm />
        </article>
        <article 
        class="log_in"
        v-if="showLogin"
        >
           <SigninForm />
        </article>
        
    </div>
   </section>
</template>

<script setup>
import SignupForm from '@/components/Forms/AuthForms/SignupForm.vue';
import SigninForm from '@/components/Forms/AuthForms/SigninForm.vue';
import CloseIcon from '@/components/icons/CloseIcon.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const showLogin = ref(true)
const showSignup = ref(false)
const router = useRouter()

const handleShowLogin = ()=>{
    if(showSignup.value){
        showSignup.value = false
    }
    showLogin.value = true
}

const handleShowSignup = ()=>{
    if(showLogin.value){
        showLogin.value = false
    }
    showSignup.value = true
}

const routeBack = ()=>{
    router.back()
}



</script>

<style scoped>

</style>