<script setup>
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification';
import { logout } from '@/services/Auth';
import { userStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const route = useRoute()
const router = useRouter()
const toast = useToast();
const store = userStore()
const { user } = storeToRefs(store)
const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 10 minutes in milliseconds
let inactivityTimer;

const clearLocalStorageItems = ()=>{
  if(localStorage.getItem('_cart_id')){
        localStorage.removeItem('_cart_id')
    }
    
    if (localStorage.getItem('_user_data')) {
        localStorage.removeItem('_user_data')
    }
}

const handleLogout = async () =>{
    try {
       let res = await logout();
       if(res?.statusText == "OK"){
           clearLocalStorageItems()
         
           if(route.name !== "paymentFailed"){
               router.push({ name: "signin" });
           }
       }
    } catch (error) {
        console.log(error)
    }
}

// Function to clear local storage
async function clearLocalStorage() {
  console.log("User inactive. Clearing local storage...");
  await store.getUser()
  if(user.value){
    await handleLogout()
  } else {
    clearLocalStorageItems()
  }
  // localStorage.clear();
  // Optionally, redirect or show a message to the user
}

// Function to reset the inactivity timer
function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(clearLocalStorage, INACTIVITY_TIMEOUT);
}

// Add event listeners to track user activity
function trackUserActivity() {
  ['mousemove', 'keydown', 'click', 'scroll'].forEach(event => {
    window.addEventListener(event, resetInactivityTimer);
  });
}

// Initialize the inactivity tracker
function initInactivityTracker() {
  trackUserActivity();
  resetInactivityTimer(); // Start the timer initially
}

// Start tracking when the site loads
window.onload = initInactivityTracker;



</script>

<template>
  <!-- <Navbar /> -->
  <RouterView />
  <!-- <Footer /> -->
</template>

<style scoped>


/* nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
} */
</style>
