import { ref } from 'vue'
import { defineStore } from 'pinia'
import Medusa from '@medusajs/medusa-js';
import axios from "axios";
import { 
    createCart,
} from '@/services/Carts'


export const useCartStore = defineStore('cart', ()=>{
    const cartID = ref(null)
    const cartValue = ref({})
    const cartCount = ref(0)
    const medusa_url = import.meta.env.VITE_BACKEND_BASEURL
    const medusa = new Medusa({ 
        baseUrl: medusa_url, 
        maxRetries: 3 
    })

    const handleCreateCart = async ()=>{
        try {
            const res = await createCart()
            let cart_id = res.cart.id
            localStorage.setItem('_cart_id', cart_id);
            return res
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdateCart = async (cart_id, payload)=>{
        try {
            const res = await medusa.carts.update(cart_id, payload)
            console.log(res)
            return res
        } catch (error) {
            console.log(error)
        }
    }

    const createPaymentSession = async (cart_id)=>{
        try {
            const res = await medusa.carts.createPaymentSessions(cart_id)
            console.log(res)
            return res
        } catch (error) {
            console.log(error)
        }
    }

    const selectPaymentSession = async (cart_id)=>{
        try {
            const res = await medusa.carts.setPaymentSession(cart_id, {
                provider_id: "paystack"
              })              
              console.log(res)
              return res
        } catch (error) {
            
        }
    }

    const updatePaymentSession = async (cart_id, paymentProviderId, payload)=>{
        try {
            const res = await medusa.carts.updatePaymentSession(cart_id, paymentProviderId, {payload})
            console.log(res)
            return res
        } catch (error) {
            console.log(error)
        }
    }

    const verifyPaymentWithServer = async (reference) => {
        try {
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/payments/verify`, { reference });
          return response.data.status === 'success';
        } catch (error) {
          console.error('Payment verification failed:', error);
          return false;
        }
      };

    const completeCart = async (cart_id)=>{
        try {
            const res = await medusa.carts.complete(cart_id)
            console.log(res)
            return res
        } catch (error) {
            console.log(error)
        }
    }

    const getCartID = async ()=>{
        let storedCart = localStorage.getItem('_cart_id')
        if(storedCart){
            cartID.value = storedCart
            return cartID.value
        } else {
            return null
        }
    }

    const getCart = async (cart_id)=>{
        try {
            let res = await medusa.carts.retrieve(cart_id)
            cartValue.value = res
            return cartValue.value
        } catch (error) {
            console.log(error)
        }
    }

    const updateCartCount = () => {
        cartCount.value = cartValue.value?.cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0
    }

    return {
        handleCreateCart,
        handleUpdateCart,
        getCartID,
        cartID,
        getCart,
        cartValue,
        updateCartCount,
        cartCount,
        createPaymentSession,
        selectPaymentSession,
        updatePaymentSession,
        completeCart,
        verifyPaymentWithServer
    }
})