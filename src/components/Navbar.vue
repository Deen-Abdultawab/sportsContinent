<template>
    <nav class="bg-[#FFFFFF] relative">
        <div class="nav_center w-[78.3%] tab:w-[90%] mx-auto flex items-center justify-between py-[0.9rem]">
            <div 
            class="navBtn"
            @click="handleNavDropTogggle"
            >MENU</div>
            <router-link to="/">
                <div class="w-[3.625rem] h-[3.75rem] overflow-hidden">
                    <img src="@/assets/images/logo.png" alt="logo image" class="w-full h-full">
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
                    <a href="https://wa.me/1234567890" target="_blank">
                        <p>+234 123 456 7890</p>
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
                            v-model="currencyState.value"
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
                    <h3 class="text-right text-[4rem] font-Raleway leading-[4.8rem] font-[700] mb-4 px-[1.69rem] pt-[3.5rem]">Your Bag</h3>
                    <div class="flex-1 px-[1.69rem] mt-[1.625rem] overflow-y-auto">
                        <p 
                        v-if="!cartValue?.cart?.items?.length > 0"
                        class="text-right font-openSans font-[500] text-[1.5rem] leading-[1.675rem]">Your bag is empty at the moment</p>
                        <div v-else class="flex flex-col gap-4">
                            <div 
                            class="flex gap-[1.25rem]"
                            v-for="(item, index) in cartValue?.cart?.items"
                            :key="item.id"
                            > 
                                <div class="w-[6.25rem] h-[6.25rem] overflow-hidden">
                                    <img :src="item.thumbnail" alt="product image" class="object-contain">
                                </div>
                                <div class="flex-1 flex justify-between">
                                    <div class="flex flex-col justify-between">
                                        <h3 class="font-Raleway font-[700] text-[1rem] leading-[1.2rem]">{{ item.title }}</h3>
                                        <Counter :default="item.quantity" @update:initValue="handleUpdatedValue($event, item.id)"/>
                                    </div>
                                    <div class="flex flex-col justify-between">
                                        <span class="font-openSans font-[400] text-[1rem] leading-[1.2rem]">{{ currencyState.symbol }}{{ item.unit_price }}</span>
                                        <span 
                                        class="font-openSans font-[400] text-[1rem] leading-[1.2rem] cursor-pointer"
                                        @click="handleRemoveItem(item.id)"
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
                            <span class="font-openSans text-[1rem] leading-[1.2rem] font-[400]">{{ currencyState.symbol }}{{ cartValue?.cart?.total }}</span>
                        </div>
                        <button
                        class="primary_btn w-full rounded-[2000px] font-[500] font-openSans text-white text-[1.5rem] leading-[1.8rem] uppercase py-[1.5rem]"
                        :class="!cartValue?.cart?.items?.length > 0 ? '!cursor-not-allowed !bg-gray-400': 'bg-primaryBG'"
                        @click="routeToCheckout"
                        >checkout</button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import CloseIcon from '@/components/icons/CloseIcon.vue';
import { useCurrencyStore } from '@/stores/currency';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Counter from '@/components/Counter.vue';
import { userStore } from '@/stores/user';
import { logout } from '@/services/Auth';
import { useToast } from "vue-toastification";
import { storeToRefs } from "pinia";
import Medusa from '@medusajs/medusa-js';
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore()
const toast = useToast();
const store = userStore()
const { user } = storeToRefs(store)
const currencyStore = useCurrencyStore()
const { currencyState, updateCurrencyState } = currencyStore.useCurrency();
const { cartValue, cartCount } = storeToRefs(cartStore)
const showNavDropDown = ref(false);
const showBag = ref(false);
const router = useRouter()
const currencyValue = ref('')
const quantity = ref(0)
const medusa_url = import.meta.env.VITE_BACKEND_BASEURL
  const medusa = new Medusa({ 
    baseUrl: medusa_url, 
    maxRetries: 3 
  })

const handleCurrencyChange = (event) => {
  const newCurrency = event.target.value;
  updateCurrencyState(newCurrency);
  localStorage.setItem('currency', newCurrency);
};

const handleLogout = async () =>{
    try {
        await logout();
        toast.success("Sucessfully Logged Out", {
            timeout: 4000,
        })
        cartValue.value.cart = {}
        cartCount.value = 0
        handleCloseNavDrop()
        user.value = null
        router.push({ name: "signin" });
    } catch (error) {
        console.log(error)
    }

    if(localStorage.getItem('_cart_id')){
        localStorage.removeItem('_cart_id')
    }
    
    if (localStorage.getItem('_user_data')) {
        localStorage.removeItem('_user_data')
        return { name: 'login' }
    }
    return undefined
}

const routeToProducts = ()=>{
    handleCloseNavDrop()
    router.push({ name: "products" });
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
    if(user.value?.id !== "null"){
        if(user.value?.metadata?.cart_id !== "null"){
            await cartStore.getCart(user.value?.metadata?.cart_id)
            cartStore.updateCartCount()
        }
    } else {
        cartValue.value.cart = {}
    }
    showBag.value = true
}

const handleCloseBag = ()=>{
    showBag.value = false
}

const handleUpdatedValue = async (newValue, item_id) => {
    if(newValue > 0){
        await medusa.carts.lineItems.update(user.value?.metadata?.cart_id, item_id, {
            quantity: newValue,
        })
        await cartStore.getCart(user.value?.metadata?.cart_id)
        cartStore.updateCartCount()
    } else {
        await medusa.carts.lineItems.delete(user.value?.metadata?.cart_id, item_id)
        await cartStore.getCart(user.value?.metadata?.cart_id)
        cartStore.updateCartCount()
    }
};

const handleRemoveItem = async (item_id)=>{
    await medusa.carts.lineItems.delete(user.value?.metadata?.cart_id, item_id)
    await cartStore.getCart(user.value?.metadata?.cart_id)
    cartStore.updateCartCount()
}

onMounted( async () => {
    await store.getUser()
    if(user.value && user.value?.id !== "null"){
        if(user.value?.metadata?.cart_id !== "null"){
           await cartStore.getCart(user.value?.metadata?.cart_id)
            cartStore.updateCartCount()
        }
    } else {
        cartValue.value.cart = {}
    }
  const storedCurrency = localStorage.getItem('currency');
  if (storedCurrency) {
    updateCurrencyState(storedCurrency);
  } else {
    updateCurrencyState('NGN');
    localStorage.setItem('currency', 'NGN');
  }
})
</script>

<style scoped>
 .vertical_text {
        writing-mode: vertical-rl; /* Vertical text from top to bottom */
        text-align: center; /* Centers text in the container */
    }

</style>