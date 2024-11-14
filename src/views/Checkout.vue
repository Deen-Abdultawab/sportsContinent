<template>
    <Navbar />
    <div class="w-full h-[100vh] grid place-items-center" v-if="isPageLoading">
        <loader />
    </div>
    <section class="w-[78.47%] mob:w-[90%] mx-auto mt-[5rem] mb-[10.69rem]" v-else>
        <h1 class="font-Raleway font-[700] text-textCol text-[3rem] leading-[3.6rem] mb-[3rem]">Checkout</h1>
        <div
         v-if="!user"
         class="w-full bg-[#E3E7E8] py-[1.25rem] rounded-[200px] text-center">
            <h3 
            class="font-openSans font-[400] text-[1rem] leading-[1.2rem] text-[#838889]">Already have an account? 
                <span class="text-textCol cursor-pointer" @click="routeToSignin">
                Click here to Login 
                </span>
            </h3>
        </div>
        <div class="mt-[3rem] border-t border-t-textCol pt-[2.5rem]">
            <div class="order_details">
                <h3 class="font-Raleway font-[700] text-[2rem] leading-[2.4rem] text-textCol">Your Order</h3>
                <div class="my-[2.5rem] flex flex-col gap-4">
                    <!-- {{ cartItems }} -->
                    <article 
                    class="flex gap-[4.3rem] mob:gap-5"
                     v-for="(item, index) in cartItems?.items"
                     :key="item.id"
                    >
                        <div class="w-[6.24rem] h-[6.25rem] overflow-hidden">
                            <img :src="item?.product?.images" alt="product image" class="object-fill">
                        </div>
                        <div class="flex flex-1 justify-between">
                            <div>
                                <h3 class="font-Raleway font-[700] text-[1rem] leading-[1.2rem]">{{ item?.product?.name }}</h3>
                                <div class="flex item-center justify-between">
                                    <span class="detail uppercase">{{ item?.size }}</span>
                                    <span class="detail">X{{ item?.quantity }}</span>
                                </div>
                            </div>
                            <h3 class="detail">{{ currencyState.symbol }}{{ item.price }}</h3>
                        </div>
                    </article>
                   
                </div>
                <div class="cost_summary flex flex-col gap-[1.5rem]">
                    <article class="flex w-full items-center gap-[1.15rem] mb-[1.25rem]">
                        <span class="">Subtotal</span>
                        <span class="flex-1 bg-textCol border border-textCol h-0"></span>
                        <span class="">{{ currencyState.symbol }}{{ cartItems?.cart?.total?.toLocaleString() }}</span>
                    </article>
                    <article class="flex w-full items-center gap-[1.15rem] mb-[1.25rem]">
                        <span class="">Shipping</span>
                        <span class="flex-1 bg-textCol border border-textCol h-0"></span>
                        <span class="">₦ 8,000</span>
                    </article>
                    <article class="flex w-full items-center gap-[1.15rem] mb-[1.25rem]">
                        <span class="">Total</span>
                        <span class="flex-1 bg-textCol border border-textCol h-0"></span>
                        <span class="">₦{{ (cartItems?.cart?.total + 8000).toLocaleString() }}</span>
                    </article>
                </div>
            </div>
        </div>
        <div class="billing_details mt-[5rem] border-t border-t-textCol pt-[2.5rem]">
            <h3 class="font-Raleway font-[700] text-[2rem] leading-[2.4rem] text-textCol">Billing Information</h3>
            <form class="mt-[2.5rem]" @submit.prevent="updateShippingInfo">
                <div class="flex flex-col gap-12">
                    <div class="input_field">
                        <label for="name">Name *</label>
                        <div id="name" class="flex-1 flex justify-between">
                            <input type="text" placeholder="First Name" class="w-[45%] border-b border-b-[#E3E7E8]" v-model="formData.firstName">
                            <input type="text" placeholder="Last Name" class="w-[45%] border-b border-b-[#E3E7E8]"
                            v-model="formData.lastName"
                            >
                        </div>
                    </div>
                    <div class="input_field">
                        <label for="email">Email Address *</label>
                        <input type="email" name="" id="email" class="flex-1 border-b border-b-[#E3E7E8]"
                        v-model="formData.email"
                        >
                    </div>
                    <div class="input_field">
                        <label for="street_address">Country *</label>
                        <input type="text" id="street_address" class="flex-1 border-b border-b-[#E3E7E8]" v-model="formData.country">
                    </div>
                    <!-- <div class="input_field">
                        <label for="country">Country *</label>
                        <select name="country" id="country" class="flex-1 border-b border-b-[#E3E7E8]"
                        v-model="formData.country"
                        @change="handleGetStates"
                        >
                        <option 
                        value="default" 
                        class="text-textCol"
                        disabled
                        >Country</option>
                        <option 
                        v-for="country in countries.data"
                        :value="country.name"
                        :key="country.name"
                        >{{ country.name }}</option>
                        </select>
                    </div> -->
                    <div class="input_field">
                        <label for="street_address">Street address *</label>
                        <input type="text" id="street_address" class="flex-1 border-b border-b-[#E3E7E8]" v-model="formData.address">
                    </div>
                    <div class="input_field">
                        <label for="town">Town / City *</label>
                        <input type="text" id="town" class="flex-1 border-b border-b-[#E3E7E8]" v-model="formData.city">
                    </div>
                    <div class="input_field">
                        <label for="town">State *</label>
                        <input type="text" id="town" class="flex-1 border-b border-b-[#E3E7E8]" v-model="formData.state">
                    </div>
                    <!-- <div class="input_field">
                        <label for="country">State *</label>
                        <select name="state" id="state" class="flex-1 border-b border-b-[#E3E7E8]" v-model="formData.state"
                        >
                            <option 
                            value="default" 
                            class="text-textCol"
                            disabled
                            >States</option>
                            <option 
                            v-for="state in states.states"
                            :value="state.name"
                            :key="state.name"
                            >{{ state.name }}</option>
                        </select>
                    </div> -->
                    <div class="input_field">
                        <label for="zip">Zip Code *</label>
                        <input type="text" id="zip" class="flex-1 border-b border-b-[#E3E7E8]" v-model="formData.zip_code">
                    </div>
                </div>
                <!-- <button class="mt-[2.5rem] black_btn px-0 w-full text-center">
                    <Loader v-if="loading"/>
                    <span v-else>SAVE SHIPPING INFORMATION</span>
                </button> -->
            </form>
        </div>
        <div class="border-t border-t-textCol pt-[2.5rem] mt-[5rem]">
            <h3 class="font-Raleway font-[700] text-[2rem] leading-[2.4rem] text-textCol">Payment Method</h3>
            <button class="mt-[2.5rem] black_btn px-0 w-full text-center hover:!bg-textCol hover:!text-white" @click="handleCheckout">
                <Loader v-if="isLoading"/>
                <span v-else>CONTINUE TO PAYMENT</span>
            </button>
        </div>
    </section>
    <Footer />
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { useRouter } from 'vue-router';
import { userStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { computed, onMounted, reactive, ref } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useCurrencyStore } from '@/stores/currency';
import Loader from "@/components/Loader/WhiteLoader.vue"
import loader from "@/components/Loader/Loader.vue"
import { useToast } from "vue-toastification";
import axios from "axios";
import CenteredModalLarge from "@/components/ui/CenteredModalLarge.vue"
import cancelIcon from '@/components/icons/cancelIcon.vue';
import { useAdminStore } from "@/stores/admin"
import { useUserProfile } from "@/stores/profile"

const profileStore = useUserProfile()
const { customer } = storeToRefs(profileStore)
const adminStore = useAdminStore()
const { createdOrder } = storeToRefs(adminStore)
const toast = useToast();
const store = userStore()
const currencyStore = useCurrencyStore()
const { currencyState } = currencyStore.useCurrency();
const cartStore = useCartStore()
const { cartItems } = storeToRefs(cartStore)
const { user, countries, states } = storeToRefs(store)
const router = useRouter()
const loading = ref(false)
const invoiceSent = ref(false)
const billingAddress = ref([])
const cartId = ref('')
const isLoading = ref(false)
const totalCost = ref(0)
const personalInfo = ref({})
const addresses = ref([])
const isPageLoading = ref(false)

const billingDetails = computed(()=>user.value?.billing_address)

const formData = reactive({
    firstName: billingDetails.value?.first_name || "",
    lastName: billingDetails.value?.last_name || "",
    email: billingDetails.value?.metadata?.email || "",
    country: billingDetails.value?.metadata?.country || "",
    address: billingDetails.value?.address_1 || "",
    city: billingDetails.value?.city || "",
    state: billingDetails.value?.province || "",
    zip_code: billingDetails.value?.postal_code || "",
})

const updateShippingInfo = async ()=>{
    loading.value = true
    try {
       console.log('try')
    } catch (error) {
        console.log(error)
        loading.value = false
    }
    
}

const handleGetStates = async ()=>{
    try {
       await store.getStates(formData.country)
    } catch (error) {
        console.log(error)
    }
}

// generate unique order ID

// Variable to store the latest generated order ID
const latestOrderId = ref(null);

// Set to store previously generated order IDs
const generatedOrderIds = new Set();

function generateOrderId() {
    let orderId;

    do {
        const randomNumber = Math.floor(1000 + Math.random() * 9000);
        orderId = `#${randomNumber}`;
    } while (generatedOrderIds.has(orderId)); 

    generatedOrderIds.add(orderId);
    latestOrderId.value = orderId;

    return orderId;
}

const handleCheckout = async ()=>{
     // create order
    let payload = {
        "cartId": cartId.value,
        "shippingAddress": {
            "street": formData.address,
            "city": formData.city,
            "state": formData.state,
            "country": formData.country,
            "postalCode": formData.zip_code
        }
    }
    console.log(payload)
    isLoading.value = true
    try {
        if(formData.address.length > 0 && formData.city.length > 0 && formData.state.length > 0 && formData.country.length > 0 && formData.zip_code.length > 0 && formData.email.length > 0) {
            let res = await adminStore.handleCreateOrders(payload)
            console.log(res)
            if(res.status === 201 ){
                let payload = {
                    "orderId": res.data?.order?.id,
                    "email": formData.email,
                    "amount": res.data?.order?.total
                }
                let paymentRes = await adminStore.handleMakePayments(payload)
                console.log(paymentRes)
                if(paymentRes?.authorization_url){
                    window.location.href = paymentRes?.authorization_url;
                }
            } else {
                isLoading.value = false
                return
            }
            isLoading.value = false
        } else {
            toast.error("billing address not complete", {
            timeout: 4000,
          });
          isLoading.value = false
        }
    } catch (error) {
        console.log(error)
        isLoading.value = false
    }
}

const routeToSignin = ()=>{
    router.push({ name: 'signin'})
}

const routeToHome = ()=>{
    router.push({ name: 'home'})
}

const routeToProducts = ()=>{
    router.push({ name: 'products'})
}

const handleAddress = async ()=>{
    isPageLoading.value = true
    try {
        await profileStore.customerProfile()
        personalInfo.value = customer.value?.data?.personalInfo
        addresses.value = customer.value?.data?.addresses[0]
        isPageLoading.value = false
    } catch (error) {
        console.log(error)
        isPageLoading.value = false
    }
}

onMounted(async()=>{
    await store.getUser()
    await cartStore.handleGetCart()
    await handleAddress()
    console.log(personalInfo.value, addresses.value)
})
   
</script>

<style lang="scss" scoped>

</style>