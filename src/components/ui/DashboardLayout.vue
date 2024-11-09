<template>
    <section class="bg-[#eae8e8] font-Raleway">
        <div class="lg:flex">
            <div class="desk:hidden sidebar w-[16rem]">
                <Sidebar />
            </div>
            <div 
             v-if="closeBackdrop"
             @click.self="toggle"
            class="desk:block hidden sidebar z-20 menubg fixed top-0 left-0 w-full exclude-from-print menubg">
                <div class="w-2/3 animate__animated animate__slideInLeft"
                :class="{ 'animate__animated animate__slideOutLeft': !closeNav }"
                >
                    <mobSidebar />
                </div>
            </div>
            
            <div class="flex-1 flex-grow">
                <nav class="flex w-full bg-[#FAFAFA] justify-end desk:justify-between py-[1rem] px-[3.75rem] !sticky top-0 min-[370px]:pt-5 items-center z-[999]">
                    <div class="logo w-[4rem] h-[4rem] cursor-pointer desk:block hidden">
                        <img src="@/assets/images/logo.png" alt="">
                    </div>
                    <div class="hidden lg:flex items-end gap-[2.5rem]">
                        <!-- <SearchIcon /> -->
                        <button class="black_btn px-4 py-[0.75rem] rounded-[0.5rem] h-full" @click="routeToCreate">
                            Create New Product
                        </button>
                        <div class="flex items-center gap-[0.3rem] border border-textCol px-4 py-[0.72rem] rounded-[0.5rem] h-full cursor-pointer"
                        @click="toggleAdminDropDown"
                        >
                            <h3>Admin</h3>
                            <ArrowDown class="transitionItem" :class="showAdminDropDown ? 'rotate-180': 'rotate-0'"/>
                        </div>
                    </div>
                    <div @click="toggle" class="lg:hidden cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-8 h-8"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      />
                    </svg>
                  </div>
                  <div class="desk:hidden relative">
                      <div class="absolute top-[4rem] right-[2rem] bg-white min-w-[230px] rounded-[0.5rem] transitionItem"
                      :class="showAdminDropDown ? 'p-4 h-auto': 'h-0 overflow-hidden p-0'"
                      >
                        <h1 class="font-[700] mb-4 text-[1.25rem]">Admin</h1>
                        <div class="flex items-center justify-between w-full py-[0.3rem] cursor-pointer">
                            <h3>Change Password</h3>
                            <ArrowDown class="text-[red] -rotate-90"/>
                        </div>
                        <div class="flex items-center justify-between w-full py-[0.3rem] cursor-pointer" @click="handleLogOut">
                            <h3>Log Out</h3>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.5 10.5V11.75C9.5 12.0815 9.3683 12.3995 9.13388 12.6339C8.89946 12.8683 8.58152 13 8.25 13H3.25C2.91848 13 2.60054 12.8683 2.36612 12.6339C2.1317 12.3995 2 12.0815 2 11.75V4.25C2 3.91848 2.1317 3.60054 2.36612 3.36612C2.60054 3.1317 2.91848 3 3.25 3H8C8.69031 3 9.5 3.55969 9.5 4.25V5.5M11.5 10.5L14 8L11.5 5.5M5.5 8H13.5" stroke="#232321" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                      </div>
                  </div>
                </nav>

                <slot></slot>
            </div>
        </div>
    </section>
</template>

<script setup>
import mobSidebar from "@/components/ui/SidebarMob.vue"
import Sidebar from "@/components/ui/Sidebar.vue"
import SearchIcon from "@/components/icons/SearchIcon.vue";
import ArrowDown from "@/components/icons/ArrowDown.vue"
import { ref } from "vue";
import { useRouter } from "vue-router"
import { logout, getToken } from '@/services/Auth';
import { useUserProfile } from "@/stores/profile"
import { storeToRefs } from "pinia";

const userStore = useUserProfile()
const { customer } = storeToRefs(userStore)
const closeNav = ref(false);
const closeBackdrop = ref(false);
const showAdminDropDown = ref(false)
const router = useRouter();

const routeToCreate = ()=>{
    router.push({name: 'new-product'})
}

const handleLogOut = async ()=>{
  try {
    let res = await logout()
    router.push({ name: 'admin'})
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}

const toggle = () => {
  closeNav.value = !closeNav.value;

  if (closeNav.value) {
    closeBackdrop.value = !closeBackdrop.value;
  }

  if (!closeNav.value) {
    setTimeout(() => {
      closeBackdrop.value = !closeBackdrop.value;
    }, 1000);
  }
};

const toggleAdminDropDown = ()=>{
    showAdminDropDown.value = !showAdminDropDown.value
}

</script>

<style scoped>
.menubg {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(7px);
}

</style>