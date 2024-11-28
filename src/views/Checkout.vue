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
                    <article 
                    class="flex gap-[4.3rem] mob:gap-5"
                     v-for="(item, index) in cartItems?.cart?.items"
                     :key="item.id"
                    >
                        <div class="w-[6.24rem] h-[6.25rem] overflow-hidden">
                            <img :src="item?.product?.images[0]" alt="product image" class="object-fill">
                        </div>
                        <div class="flex flex-1 justify-between">
                            <div>
                                <h3 class="font-Raleway font-[700] text-[1rem] leading-[1.2rem]">{{ item?.product?.name }}</h3>
                                <div class="flex item-center justify-between">
                                    <span class="detail uppercase">{{ item?.size }}</span>
                                    <span class="detail">X{{ item?.quantity }}</span>
                                </div>
                            </div>
                            <h3 class="detail">{{ getCurrencySymbol(item?.product?.currency) }} {{ item.price }}</h3>
                        </div>
                    </article>
                   
                </div>
                <div class="cost_summary flex flex-col gap-[1.5rem]">
                    <article class="flex w-full items-center gap-[1.15rem] mb-[1.25rem]">
                        <span class="">Subtotal</span>
                        <span class="flex-1 bg-textCol border border-textCol h-0"></span>
                        <span class="">₦ {{ cartItems?.cart?.total?.toLocaleString() }}</span>
                    </article>
                    <article class="flex w-full items-center gap-[1.15rem] mb-[1.25rem]">
                        <span class="">Shipping</span>
                        <span class="flex-1 bg-textCol border border-textCol h-0"></span>
                        <span class="">₦ 8,000</span>
                    </article>
                    <article class="flex w-full items-center gap-[1.15rem] mb-[1.25rem]">
                        <span class="">Total</span>
                        <span class="flex-1 bg-textCol border border-textCol h-0"></span>
                        <span class="">₦ {{ (cartItems?.cart?.total + 8000).toLocaleString() }}</span>
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
import { onMounted, reactive, ref } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useCurrencyStore } from '@/stores/currency';
import Loader from "@/components/Loader/WhiteLoader.vue"
import loader from "@/components/Loader/Loader.vue"
import { useToast } from "vue-toastification";
import { useAdminStore } from "@/stores/admin"


const adminStore = useAdminStore()
const { addresses } = storeToRefs(adminStore)
const toast = useToast();
const store = userStore()
// const currencyStore = useCurrencyStore()
// const { currencyState } = currencyStore.useCurrency();
const cartStore = useCartStore()
const { cartItems } = storeToRefs(cartStore)
const { user } = storeToRefs(store)
const router = useRouter()
const loading = ref(false)
const billingAddress = ref([])
const cartId = ref('')
const isLoading = ref(false)
const isPageLoading = ref(false)
const sortedAddresses = ref([])
const addressId = ref('')

const formData = reactive({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
});

const updateShippingInfo = async ()=>{
    loading.value = true
    try {
       console.log('try')
    } catch (error) {
        console.log(error)
        loading.value = false
    }
}

function findMatchingAddress(addressArray, comparisonObject) {
    // Iterate over the addressArray to find the matching address
    for (let address of addressArray) {
        // Check if all keys in comparisonObject match the corresponding keys in the address
        let isMatch = Object.keys(comparisonObject).every(key => comparisonObject[key] === address[key]);
        
        // If all keys match, return the id
        if (isMatch) {
            return address.id;
        }
    }
    // If no match is found, return null
    return null;
}

const handleCheckout = async () => {
    if (Object.values(formData).some(field => !field)) {
        toast.error("Please fill in all fields.", {
            timeout: 4000,
        });
        return;
    }

    isLoading.value = true;
    try {
        const comparisonObject = {
            street: formData.address,
            city: formData.city,
            state: formData.state,
            country: formData.country,
            postalCode: formData.zip_code
        };

        const match = findMatchingAddress(sortedAddresses.value, comparisonObject);
        cartId.value = match ? match : cartId.value;
        const payload = sortedAddresses.value?.length > 0
            ? { cartId: cartId.value, addressId: addressId.value }
            : {
                cartId: cartId.value,
                shippingAddress: { ...comparisonObject },
                };  

        const res = await adminStore.handleCreateOrders(payload);
        if (res?.status === 201) {
            // Redirect to payment or confirmation
            const paymentPayload = {
                orderId: res.data?.order?.id,
                email: formData.email,
                amount: res.data?.order?.total,
            };
            const paymentRes = await adminStore.handleMakePayments(paymentPayload);

            if (paymentRes?.authorization_url) {
                window.location.href = paymentRes.authorization_url;
            }
        } else {
            isLoading.value = false
            return
        }
    } catch (error) {
        console.error("Error during checkout:", error);
        toast.error("Checkout failed. Please try again.", {
            timeout: 4000
        });
    } finally {
        isLoading.value = false;
    }
};


const routeToSignin = ()=>{
    router.push({ name: 'signin'})
}

const autoFillAddress = ()=>{
    if (billingAddress.value) {
        formData.email = billingAddress.value?.email || "";
        formData.country = billingAddress.value?.country || "";
        formData.address = billingAddress.value?.street || "";
        formData.city = billingAddress.value?.city || "";
        formData.state = billingAddress.value?.state || "";
        formData.zip_code = billingAddress.value?.postalCode || "";
        addressId.value = billingAddress.value?.id
    }
}

const scrollToTop = () => {
    window.scrollTo({
        top: 0,        // Scroll to the top of the page
        behavior: 'smooth', // Smooth scrolling animation
    });
};

const getCurrencySymbol = (currencyCode) => {
      switch (currencyCode) {
         case 'USD':
            return '$';
         case 'GBP':
            return '£';
         case 'NGN':
            return '₦';
         default:
            return '';
      }
   };

onMounted(async()=>{
    scrollToTop()
    await store.getUser()
    await cartStore.handleGetCart()
    await adminStore.handleGetAddresses()
    cartId.value = cartItems.value?.cart?.id
    if(addresses.value?.addresses?.length > 0){
        sortedAddresses.value = [...addresses.value?.addresses].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    billingAddress.value = sortedAddresses.value[0]
    autoFillAddress()
})
   
</script>

<style lang="scss" scoped>

</style>