import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
    getAllProducts,
    getSingleProducts
} from "@/services/Products"

export const useProductsStore = defineStore('products', ()=>{
    const allProducts = ref([])
    const singleProduct = ref([])
    const featuredProducts = ref([])

    const handleAllProducts = async ()=>{
        try {
            allProducts.value = await getAllProducts()
            return allProducts.value
        } catch (error) {
            console.log(error)
        }
    }

    const handleSingleProduct = async (product_id)=>{
        try {
            singleProduct.value = await getSingleProducts(product_id)
            return singleProduct.value
        } catch (error) {
            console.log(error)
        }
    }

    const getFeaturedProducts = ()=>{
        featuredProducts.value = allProducts.value?.products?.filter(item=> item.isFeatured)
        return featuredProducts.value
    }



    return {
        handleAllProducts,
        handleSingleProduct,
        allProducts,
        singleProduct,
        featuredProducts,
        getFeaturedProducts
    }
})