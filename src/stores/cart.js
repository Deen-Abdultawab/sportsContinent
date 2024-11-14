import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";
import { 
    getCart,
    addToCart,
    updateCart,
    deleteCart,
    deleteCartItem
} from '@/services/Carts'


export const useCartStore = defineStore('cart', ()=>{
    const cartItems = ref([])
    const cartCount = ref(0)

    const handleGetCart = async ()=>{
        try {
            cartItems.value = await getCart()
            return cartItems.value
        } catch (error) {
            console.log(error)
        }
    }

    const handleAddItemToCart = async (payload)=>{
        try {
            let res = await addToCart(payload)
            return res
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdateCart = async (slug, payload)=>{
        try {
            let res = await updateCart(slug, payload)
            return res
        } catch (error) {
           console.log(error) 
        }
    }

    const handleDeleteCart = async ()=>{
        try {
            let res = await deleteCart()
            return res
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteCartItem = async (slug)=>{
        try {
            let res = await deleteCartItem(slug)
            return res
        } catch (error) {
            console.log(error)
        }
    }

    const updateCartCount = () => {
        cartCount.value = cartItems.value?.cart?.items?.reduce((sum, item) => sum + item?.quantity, 0) || 0;
       return cartCount.value
    }

   

    return {
       cartItems,
       handleGetCart,
       handleAddItemToCart,
       handleDeleteCart,
       handleUpdateCart,
       cartCount,
       updateCartCount,
       handleDeleteCartItem
    }
})