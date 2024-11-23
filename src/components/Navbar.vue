<template>
    <nav class="bg-[#FFFFFF] relative">
        <div class="nav_center w-[78.3%] tab:w-[90%] mx-auto flex items-center justify-between py-[0.9rem]">
            <div 
            class="navBtn"
            @click="handleNavDropTogggle"
            >MENU</div>
            <router-link to="/">
                <div class="w-[auto] h-[5.75rem] overflow-hidden">
                    <img src="@/assets/images/logoImg.jpeg" alt="logo image" class="w-full h-full">
                </div>
            </router-link>
            <div class="navBtn"
            @click="handleShowBag"
            >
                BAG({{ cartCount }})
            </div>
        </div>
        <div 
        class="fixed w-full min-h-[100vh] top-0 left-0 bg-transparent backdrop-blur-sm"
        :class="showBag || showNavDropDown ? 'opacity-1 z-[9999]': 'opacity-0 z-[-1]' "
        >

        </div>
        <div 
        class="bg-[#10162f1a] dropdown absolute w-full transitionItem top-0"
        :class="showNavDropDown? 'z-[9999] opacity-100': 'opacity-0 z-[-1]'"
        >
            <div class="bg-[#007646] w-full py-[1.06rem] px-[3rem] text-white flex justify-between items-center mob:justify-end">
                <div class="flex items-center gap-[2.5rem] mob:hidden">
                    <a href="https://wa.me/+2348138726068" target="_blank">
                        <p>+2348138726068</p>
                    </a>
                    <a href="" target="_blank">
                        <p>Twitter</p>
                    </a>
                    <a href="" target="_blank">
                        <p>Instagram</p>
                    </a>
                </div>
                <div 
                class="flex items-center gap-[0.2rem] text-[1rem] font-openSans font-[400] cursor-pointer hover:scale-[1.1] transitionItem"
                @click="handleCloseNavDrop"
                >
                    <p>Close</p>
                    <CloseIcon />
                </div>
            </div>
            <div class="bg-textCol py-[2.5rem] w-full">
                <div class="w-[79.33%] tab:w-[90%] mx-auto flex justify-between mob:flex-col mob:items-center mob:gap-[2rem]">
                    <img src="../assets/images/nav_drop_logo.png" alt="" class="tab:!w-[100px] tab:h-[100px]">
                    <div class="flex flex-1 justify-center gap-[6rem]">
                        <div class="flex flex-col items-start gap-4">
                            <span 
                            class="btn"
                            @click="routeToProducts"
                            >All Products</span>
                            <span class="btn">Search</span>
                        </div>
                        <div class="flex flex-col items-start gap-4">
                            <!-- <router-link to="/"></router-link> -->
                            <span v-if="user" class="btn" @click="handleLogout">Log Out</span>
                            <span v-else class="btn" @click="routeToLogin">Login</span>
                            <span class="btn" @click="routeToBag">Bag ({{ cartCount }})</span>
                        </div>
                    </div>
                    <div>
                        <div class="w-full py-4 px-6 rounded-[200px] !border !border-white">
                            <select name="currency" id="currency" class="bg-transparent text-white font-openSans font-[600] text-[1.2rem] leading-[1rem] focus:outline-none cursor-pointer tab:text-[1rem]"
                            v-model="currentCurrency"
                            @change="handleCurrencyChange"
                            >
                                <option value="NGN" class="text-textCol">Currency: ₦/NGN</option>
                                <option value="USD" class="text-textCol">Currency: $/USD</option>
                                <option value="GBP" class="text-textCol">Currency: £/GBP </option>
                            </select>
                        </div>
                        <p class="text-white text-right mt-[1.5rem] font-[500] font-openSans text-[1.25rem] tab:text-[1rem] leading-[1.5rem] mob:text-center mob:mt-[4rem]">Policy</p>
                    </div>
                </div>
            </div>
        </div>
        <div 
        class="side_bar fixed h-full z-[9999] max-w-[90%] top-0 left-0 flex overflow-hidden transitionItem"
        :class="showBag?'w-[37.875rem]': 'w-0'"
        >
            <div class="bg-primaryBG text-white w-[10%]">
                <div class="mt-[3rem] text-center px-4 cursor-pointer"
                @click="handleCloseBag"
                >
                    <CloseIcon />
                    <div class="vertical_text text-center">Continue Shopping</div>
                </div>
            </div>
            <div 
            class="flex-1 bg-textCol text-white h-full"
            :class="showBag?'w-auto': 'w-0'"
            >
                <div class="flex flex-col h-full">
                    <h3 class="text-right text-[4rem] font-Raleway leading-[4.8rem] font-[700] mb-4 px-[1.69rem] pt-[3rem]">Your Bag</h3>
                    <div class="flex-1 px-[1.69rem] mt-[.625rem] overflow-y-auto">
                        <p 
                        v-if="!cartLength > 0"
                        class="text-right font-openSans font-[500] text-[1.5rem] leading-[1.675rem]">Your bag is empty at the moment</p>
                        <div v-else class="flex flex-col gap-8 py-4">
                            <div 
                            class="flex gap-[1.25rem]"
                            v-for="(item, index) in cartItems?.cart?.items"
                            :key="item.id"
                            > 
                                <div class="w-[5rem] h-[5rem] overflow-hidden">
                                    <img :src="item?.product?.images[0]" alt="product image" class="object-contain">
                                </div>
                                <div class="flex-1 flex justify-between">
                                    <div class="flex flex-col justify-between">
                                        <h3 class="font-Raleway font-[700] text-[0.7rem] leading-[1.2rem]">{{ item?.product?.name }}</h3>
                                        <Counter :default="item?.quantity" @update:initValue="handleUpdatedValue($event, item?.product?.id, item?.id)"/>
                                    </div>
                                    <div class="flex flex-col justify-between">
                                        <span class="font-openSans font-[400] text-[0.7rem] leading-[1.2rem]">{{ currencyState.symbol }}{{ item?.price?.toLocaleString() }}</span>
                                        <span 
                                        class="font-openSans font-[400] text-[0.7rem] leading-[1.2rem] cursor-pointer"
                                        @click="handleRemoveItem(item?.id)"
                                        >Remove</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="border border-white w-full px-[2.19rem] py-4">
                        <div class="flex w-full items-center gap-[0.25rem] mb-[1.25rem]">
                            <span class="font-openSans text-[1rem] leading-[1.2rem] font-[400]">Subtotal</span>
                            <span class="flex-1 bg-white border border-white h-0"></span>
                            <span class="font-openSans text-[1rem] leading-[1.2rem] font-[400]">{{ currencyState.symbol }}{{ cartItems?.cart?.total?.toLocaleString() }}</span>
                        </div>
                        <button
                        class="primary_btn w-full rounded-[2000px] font-[500] font-openSans text-white text-[1.2rem] leading-[1.8rem] uppercase py-[1rem]"
                        :class="!cartLength > 0 ? '!cursor-not-allowed !bg-gray-400': 'bg-primaryBG'"
                        @click="routeToCheckout"
                        >checkout</button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <div class="fixed top-0 left-0 w-[100vw] h-[100vh] grid place-items-center bg-[#cbc7c7] opacity-[0.6] z-[9999999999999]" v-if="isRemoving">
        <loader />
    </div>
</template>

<script setup>
import CloseIcon from '@/components/icons/CloseIcon.vue';
import { useCurrencyStore } from '@/stores/currency';
import { onMounted, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Counter from '@/components/Counter.vue';
import { userStore } from '@/stores/user';
import { logout } from '@/services/Auth';
import { useToast } from "vue-toastification";
import { storeToRefs } from "pinia";

import { useCartStore } from '@/stores/cart';
import { useAdminStore } from "@/stores/admin"
import loader from "@/components/Loader/ShortLoader.vue"

const adminStore = useAdminStore()
const { currentCurrency } = storeToRefs(adminStore)
const cartStore = useCartStore()
const toast = useToast();
const store = userStore()
const { user } = storeToRefs(store)
const currencyStore = useCurrencyStore()
const { currencyState } = currencyStore.useCurrency();
const { cartItems, cartCount } = storeToRefs(cartStore)
const showNavDropDown = ref(false);
const showBag = ref(false);
const router = useRouter()
const route = useRoute()
const isRemoving = ref(false)
const cartLength = ref(0)

const handleCurrencyChange =async () => {
  await adminStore.updateCurrency(currentCurrency.value)
  localStorage.setItem('currency', currentCurrency.value);
  handleCloseNavDrop()
};

const handleLogout = async () =>{
    try {
       let res = await logout();
       if(res?.statusText == "OK"){
           handleCloseNavDrop()
           user.value = null
           if(localStorage.getItem('_cart_id')){
               localStorage.removeItem('_cart_id')
           }
           
           if (localStorage.getItem('_user_data')) {
               localStorage.removeItem('_user_data')
           }
           cartCount.value = 0
           cartLength.value = 0
           if(route.name === "home"){
               router.push({ name: "signin" });
           } else {
               router.push({ name: "home" });
           }
       }
    } catch (error) {
        console.log(error)
    }
}

const routeToProducts = ()=>{
    handleCloseNavDrop()
    router.push({ name: "allProducts" });
}

const routeToCheckout = ()=>{
    handleCloseNavDrop()
    handleCloseBag()
    router.push({ name: "checkout" });
}

const routeToLogin = ()=>{
    handleCloseNavDrop()
    router.push({ name: "signin" });
}

const routeToBag = async ()=>{
    handleCloseNavDrop()
    handleShowBag()
}

const handleNavDropTogggle = ()=>{
    showNavDropDown.value = true
}

const handleCloseNavDrop = ()=>{
    showNavDropDown.value = false
}

// const cartValue = ref({})

const handleShowBag = async()=>{
    showBag.value = true
}

const handleCloseBag = ()=>{
    showBag.value = false
}

const handleUpdatedValue = async (newValue, item_id, id) => {
    if(newValue > 0){
        isRemoving.value = true
        let payload = {
            "quantity": newValue
        }
        try {
            await cartStore.handleUpdateCart(item_id, payload)
            await cartStore.handleGetCart()
            await cartStore.updateCartCount()
            isRemoving.value = false
            handleCloseBag()
        } catch (error) {
            console.log(error)
            isRemoving.value = false
        }
    } else {
        await handleRemoveItem(id)
    }
};

const handleRemoveItem = async (item_id)=>{
    isRemoving.value = true
    try {
        await cartStore.handleDeleteCartItem(item_id)
        await cartStore.handleGetCart()
        await cartStore.updateCartCount()
        isRemoving.value = false
    } catch (error) {
        console.log(error)
        isRemoving.value = false
    }
}

watch(
  () => cartItems.value?.cart?.items?.length,
  (newLength) => {
    cartLength.value = newLength || 0; 
  },
  { immediate: true } 
);

onMounted( async () => {
    await store.getUser()
    if(user.value){
        await cartStore.handleGetCart()
        cartStore.updateCartCount()
        cartLength.value = cartItems.value?.cart?.items?.length
    }

    const storedCurrency = localStorage.getItem('currency');
    
    if (storedCurrency) {
        currentCurrency.value = storedCurrency;
    } else {
        currentCurrency.value = 'NGN';
        localStorage.setItem('currency', 'NGN');
    }
    await adminStore.updateCurrency(currentCurrency.value);
})
</script>

<style scoped>
 .vertical_text {
        writing-mode: vertical-rl; /* Vertical text from top to bottom */
        text-align: center; /* Centers text in the container */
    }

</style>