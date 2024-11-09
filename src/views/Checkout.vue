<template>
    <Navbar />
    <CenteredModalLarge v-if="invoiceSent">
        <div class="text-center px-10 py-6 premiumSucessPage">
            <p class="text-[#01181B] text-[1.12rem] font-Satoshi400">
            Thank you for shopping with us, an invoice has been sent to your provided mail. Once payment is confirmed, your order will be processed.
            </p>
            <div class="flex justify-center gap-4 mt-12">
            <button
                @click="routeToHome()"
                class="bg-[#43D0DF] font-Satoshi500 text-[0.88rem] uppercase leading-[11.593px] rounded-full px-5 p-3 w-[45%] text-[#fff] btn-hover-1"
            >
                Home</button
            ><button
                @click="routeToProducts()"
                class="bg-[#43D0DF] font-Satoshi500 text-[0.88rem] uppercase leading-[11.593px] rounded-full px-5 p-3 w-[45%] text-[#fff] btn-hover-1"
            >
                <span>Continue Shopping </span>
                <!-- <WhiteLoader v-else /> -->
            </button>
            </div>
        </div>
    </CenteredModalLarge>
    <section class="w-[78.47%] mob:w-[90%] mx-auto mt-[5rem] mb-[10.69rem]">
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
                     v-for="(item, index) in cartValue?.cart?.items"
                     :key="item.id"
                    >
                        <div class="w-[6.24rem] h-[6.25rem] overflow-hidden">
                            <img :src="item.thumbnail" alt="product image" class="object-fill">
                        </div>
                        <div class="flex flex-1 justify-between">
                            <div>
                                <h3 class="font-Raleway font-[700] text-[1rem] leading-[1.2rem]">{{ item.title }}</h3>
                                <div class="flex item-center justify-between">
                                    <span class="detail uppercase">{{ item.metadata.size }}</span>
                                    <span class="detail">X{{ item.quantity }}</span>
                                </div>
                            </div>
                            <h3 class="detail">{{ currencyState.symbol }}{{ item.unit_price }}</h3>
                        </div>
                    </article>
                   
                </div>
                <div class="cost_summary flex flex-col gap-[1.5rem]">
                    <article class="flex w-full items-center gap-[1.15rem] mb-[1.25rem]">
                        <span class="">Subtotal</span>
                        <span class="flex-1 bg-textCol border border-textCol h-0"></span>
                        <span class="">{{ currencyState.symbol }}{{ cartValue?.cart?.total }}</span>
                    </article>
                    <article class="flex w-full items-center gap-[1.15rem] mb-[1.25rem]">
                        <span class="">Shipping</span>
                        <span class="flex-1 bg-textCol border border-textCol h-0"></span>
                        <span class="">Calculating...</span>
                    </article>
                    <article class="flex w-full items-center gap-[1.15rem] mb-[1.25rem]">
                        <span class="">Total</span>
                        <span class="flex-1 bg-textCol border border-textCol h-0"></span>
                        <span class="">₦40,000</span>
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
                    </div>
                    <div class="input_field">
                        <label for="street_address">Street address *</label>
                        <input type="text" id="street_address" class="flex-1 border-b border-b-[#E3E7E8]" v-model="formData.address">
                    </div>
                    <div class="input_field">
                        <label for="town">Town / City *</label>
                        <input type="text" id="town" class="flex-1 border-b border-b-[#E3E7E8]" v-model="formData.city">
                    </div>
                    <div class="input_field">
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
                    </div>
                    <div class="input_field">
                        <label for="zip">Zip Code *</label>
                        <input type="text" id="zip" class="flex-1 border-b border-b-[#E3E7E8]" v-model="formData.zip_code">
                    </div>
                </div>
                <button class="mt-[2.5rem] black_btn px-0 w-full text-center">
                    <Loader v-if="loading"/>
                    <span v-else>SAVE SHIPPING INFORMATION</span>
                </button>
            </form>
        </div>
        <div class="border-t border-t-textCol pt-[2.5rem] mt-[5rem]">
            <h3 class="font-Raleway font-[700] text-[2rem] leading-[2.4rem] text-textCol">Payment Method</h3>
            <button class="mt-[2.5rem] black_btn px-0 w-full text-center" @click="handleCheckout">CONTINUE TO PAYMENT</button>
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
import Medusa from '@medusajs/medusa-js';
import { useToast } from "vue-toastification";
import axios from "axios";
import CenteredModalLarge from "@/components/CenteredModalLarge.vue"
// import CloseIcon from '@/components/icons/CloseIcon.vue';
import cancelIcon from '@/components/icons/cancelIcon.vue';
// import { PaystackPop } from '@paystack/inline-js';

const medusa_url = import.meta.env.VITE_BACKEND_BASEURL
const medusa = new Medusa({ 
  baseUrl: medusa_url, 
  maxRetries: 3 
})
const toast = useToast();
const store = userStore()
const currencyStore = useCurrencyStore()
const { currencyState } = currencyStore.useCurrency();
const cartStore = useCartStore()
const { cartValue } = storeToRefs(cartStore)
const { user, countries, states } = storeToRefs(store)
const router = useRouter()
const loading = ref(false)
const invoiceSent = ref(false)
// const { paystackTxRef } = paymentSession.data;

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
        let update = await medusa.customers.update({
            billing_address: {
                first_name: formData.firstName || "null",
                last_name: formData.lastName || "null",
                postal_code: formData.zip_code || "null",
                province: formData.state || "null",
                city: formData.city || "null",
                address_1: formData.address || "null",
                metadata: {
                    country: formData.country || "null",
                    email: formData.email || "null"
                }
            },
        })
        console.log(update)
        const updatedCustomer = update.customer
        if(update.response.statusText === "OK"){
            store.saveUser(updatedCustomer)
            await cartStore.handleUpdateCart(user.value?.metadata?.cart_id, {
                shipping_address: {
                    first_name: formData.firstName || "null",
                    last_name: formData.lastName || "null",
                    address_1: formData.address || "null",
                    city: formData.city || "null",
                    // country_code,
                    province: formData.state || "null",
                    postal_code: formData.state || "null",
                    // phone,
                },
            })
            toast.success("Sucessfully Logged In", {
                timeout: 4000,
            });
            loading.value = false
        }
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


// const handleStates =async ()=>{
//     console.log(formData.country)
//      if(formData.country && formData.country !== ""){
//         await store.getStates(formData.country)
//     }
// }

// const loadPaystackScript = () => {
//   return new Promise((resolve, reject) => {
//     if (document.querySelector('script[src="https://js.paystack.co/v1/inline.js"]')) {
//       resolve() // If the script is already loaded, resolve the promise
//     } else {
//       const script = document.createElement('script')
//       script.src = "https://js.paystack.co/v1/inline.js"
//       script.onload = () => resolve()
//       script.onerror = () => reject(new Error("Failed to load Paystack script"))
//       document.head.appendChild(script)
//     }
//   })
// }

const handleCheckout = ()=>{
    generateOrderId();
    console.log(latestOrderId.value);
    invoiceSent.value = true
}

// const handleCheckout = async () => {
//   const email = formData.email;
//   const amount = cartValue.value?.cart?.total * 100;
//   let public_key = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

//   try {
//     await loadPaystackScript();

//     const handler = window.PaystackPop.setup({
//       key: public_key, // Replace with your Paystack public key
//       email: email, // Customer's email
//       amount: amount, // Amount in kobo
//       currency: 'NGN', // Set currency to Naira
//       callback: (response) => {
//         console.log('Payment Response:', response);

//         try {
//           // Use the reference from Paystack to verify the payment
//           const verified = cartStore.verifyPaymentWithServer(response.reference);

//           if (verified) {
//             // Call the function to complete the cart
//             let res = cartStore.completeCart(user.value?.metadata?.cart_id);
//             if(res.type === "cart"){
//                 console.log(error)
//             }
//             console.log('Cart completed successfully');

//             // Show success message
//             toast.success("Payment and cart completion successful.", {
//               timeout: 4000,
//             });
//           } else {
//             // Handle case where payment verification fails
//             toast.error("Payment verification failed. Please try again.");
//           }
//         } catch (error) {
//           console.error("Error completing cart:", error);
//           toast.error("Failed to complete the payment.");
//         }
//       },
//       onClose: function () {
//         console.log('Payment Cancelled');
//         toast.warning("Payment was cancelled.");
//       }
//     });

//     // Trigger the payment process
//     handler.openIframe();

//   } catch (error) {
//     console.error("Error initiating payment:", error);
//     toast.error("Error initiating payment.");
//   }
// };

// Function to verify payment with your server
// const verifyPaymentWithServer = async (reference) => {
//   try {
//     const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/payments/verify`, { reference });
//     return response.data.status === 'success';
//   } catch (error) {
//     console.error('Payment verification failed:', error);
//     return false;
//   }
// };





// const payWithPaystack = ()=> {
//     let public_key = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY
//   e.preventDefault();

//   const paystack = new PaystackPop();

//   paystack.newTransaction({
//     key: public_key,
//     email: formData.email,
//     amount: cartValue.value?.cart?.total,
//     ref: paystackTxRef,
//     async onSuccess() {
//       await cartStore.completeCart(user.value?.metadata?.cart_id)
//     },
//     onCancel() {
//       alert("Window closed.");
//     },
//   });
// }

const routeToSignin = ()=>{
    router.push({ name: 'signin'})
}

const routeToHome = ()=>{
    router.push({ name: 'home'})
}

const routeToProducts = ()=>{
    router.push({ name: 'products'})
}

onMounted(async()=>{
    await store.getUser()
    await cartStore.getCart(user.value?.metadata?.cart_id)
    await cartStore.createPaymentSession(user.value?.metadata?.cart_id)
    await cartStore.selectPaymentSession(user.value?.metadata?.cart_id)
    store.getCountries()
})
   
</script>

<style lang="scss" scoped>

</style>