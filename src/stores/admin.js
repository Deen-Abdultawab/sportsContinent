import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { 
    getAnalytics,
    getOrders,
    getSingleOrder,
    updateOrderStatus,
    getAllProducts,
    getSingleProduct,
    getAllCustomers,
    getSingleCustomer,
    createProducts,
    createOrders,
    initializePayment,
    deleteProduct,
    getCategories,
    createCategories,
    deleteCategories,
    updateProducts,
    getProductsByCategories
 } from '@/services/Admin'

export const useAdminStore = defineStore('admin', ()=>{
    const analytics = ref([])
    const orders = ref([])
    const singleOrder = ref([])
    const products = ref([])
    const singleProduct = ref([])
    const customers = ref([])
    const singleCustomer = ref([])
    const featuredProducts = ref([])
    const createdOrder = ref({})
    const categories = ref([])
    const createResponse = ref('')
    const currentCurrency = ref('')
    const filteredProduct = ref({})
    const productDetails = ref(
        {
            "name": "",
            "description": "",
            "price": 0,
            "currency": "",
            "discountPrice": 0,
            "images": [],
            "sizes": [],
            "isFeatured": false,
            "stock": 0,
            "categoryId": "",
            
        }
        
    )

    const handleGetAnalytics = async ()=>{
        try {
            analytics.value = await getAnalytics()
            return analytics.value
        } catch (error) {
            console.log(error)
        }
    }

    const handleCreateOrders = async(payload)=>{
        try {
            createdOrder.value = await createOrders(payload)
            return createdOrder.value
        } catch (error) {
            console.log(error)
        }
    }

    const handleMakePayments = async(payload)=>{
        try {
            let res = await initializePayment(payload)
            return res
        } catch (error) {
            console.log(error)
        }
    }

    const handleGetOrders = async ()=>{
        try {
            orders.value = await getOrders()
            return orders.value
        } catch (error) {
            console.log(error)
        }
    }

    const handleGetSingleOrder = async (slug)=>{
        try {
            singleOrder.value = await getSingleOrder(slug)
            return singleOrder.value
        } catch (error) {
            console.log(error)
        }
    }

    const handleOrderStatusUpdate = async (slug, payload)=>{
        try {
            let res = await updateOrderStatus(slug, payload)
            return res
        } catch (error) {
            console.log(error)
        }
    }

    const handleCreateProducts = async (payload)=>{
        try {
            createResponse.value = await createProducts(payload)
            return createResponse.value
        } catch (error) {
            console.log(error)
        }
    }

    const handleCreateCategories = async (payload)=>{
        try {
            let res = await createCategories(payload)
            return res
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteCategories = async (id)=>{
        try {
            let res = await deleteCategories(id)
            return res
        } catch (error) {
            console.log(error)
        }
    }

    const handleGetCategories = async ()=>{
        try {
            categories.value = await getCategories()
            return categories.value
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteProduct = async (slug)=>{
        try {
            let res = await deleteProduct(slug)
            return res
        } catch (error) {
            console.log(error)
        }
    }

    const handleGetProducts = async (page, currency)=>{
        try {
            products.value = await getAllProducts(page, currency)
            return products.value
        } catch (error) {
            console.log(error)
        }
    }

    const handleProductByCategory = async (slug)=>{
        try {
            filteredProduct.value = await getProductsByCategories(slug)
            return filteredProduct.value
        } catch (error) {
            console.log(error)
        }
    }

    const updateCurrency = (newCurrency) => {
        currentCurrency.value = newCurrency;
        localStorage.setItem('currency', currentCurrency.value);
        return currentCurrency.value
    };

    const getCurrency = ()=>{
        const storedCurrency = localStorage.getItem('currency');
    
        if (storedCurrency) {
            currentCurrency.value = storedCurrency;
        } else {
            currentCurrency.value = 'NGN';
            localStorage.setItem('currency', 'NGN');
        }
        return currentCurrency.value
    }

    const handleGetSingleProduct = async (slug, currency)=>{
        try {
            singleProduct.value = await getSingleProduct(slug, currency)
            return singleProduct.value
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdateProducts = async (slug, payload)=>{
        try {
            let res = await updateProducts(slug, payload)
            return res
        } catch (error) {
            console.log(error)
        }
    }

    const getFeaturedProducts = ()=>{
        featuredProducts.value = products.value?.products?.filter(item => item.isFeatured)
        return featuredProducts.value
    }

    const handleGetCustomers = async ()=>{
        try {
            customers.value = await getAllCustomers()
            return customers.value
        } catch (error) {
            console.log(error)
        }
    }

    const handleGetSingleCustomer = async (slug)=>{
        try {
            singleCustomer.value = await getSingleCustomer(slug)
            return singleCustomer.value
        } catch (error) {
            console.log(error)
        }
    }

    const getCurrencySymbol = (currencyCode) => {
        switch (currencyCode) {
           case 'USD':
              return '$';
           case 'GBP':
              return '£';
           case 'NGN':
              return '₦';
           default:
              return ''; // Default symbol if currency code is unknown
        }
     };

    return { 
        orders,
        products,
        analytics,
        singleOrder,
        singleProduct,
        customers,
        singleCustomer,
        handleGetOrders,
        handleGetAnalytics,
        handleGetSingleOrder,
        handleOrderStatusUpdate,
        handleGetSingleProduct,
        handleGetProducts,
        handleGetCustomers,
        handleGetSingleCustomer,
        handleCreateProducts,
        productDetails,
        featuredProducts,
        getFeaturedProducts,
        getCurrencySymbol,
        createdOrder,
        handleCreateOrders,
        handleMakePayments,
        handleDeleteProduct,
        handleGetCategories,
        categories,
        createResponse,
        handleCreateCategories,
        handleUpdateProducts,
        updateCurrency,
        currentCurrency,
        getCurrency,
        filteredProduct,
        handleProductByCategory,
        handleDeleteCategories
    }
})