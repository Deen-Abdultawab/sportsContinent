<template>
    <section>
        <dashboardLayout>
            <div class="min-h-[100vh] h-full w-full grid place-items-center" v-if="isLoading">
                <loader />
            </div>
            <section class="p-4 mx-auto dashboard-orders" v-else>
                <div>
                    <div class="flex items-center justify-between mob:justify-end">
                        <div class="mob:hidden">
                            <h3 class="text-[#000000] font-[700] text-[1.5rem]">All Products</h3>
                            <p class="font-[600]">Home > All Products</p>
                        </div>
                        <div class="flex gap-4">
                            <div>
                                <input type="text" placeholder="Search product name" class="text-textCol font-Raleway px-4 py-[0.75rem] h-full rounded-[0.5rem] border border-textCol focus:outline-none bg-inherit" v-model="productName">
                            </div>
                            <button class="black_btn px-4 py-[0.75rem] rounded-[0.5rem] h-full" @click="routeToCreate">
                                Create New Product
                            </button>
                        </div>
                    </div>
                  
                    <div class="my-[1.5rem]">
                        <div v-if="filteredProduct.length < 1">
                            <h3 class="text-[1.5rem] font-[600] font-Raleway">No result for this search parameter on this page</h3>
                        </div>
                        <div class="grid grid-cols-customGrid2 gap-4" v-else>
                            <div 
                                v-for="(product, index) in filteredProduct" 
                                :key="product?.id" 
                            class="bg-[#F8F8F8] rounded-lg shadow-md p-4 cursor-pointer hover:shadow-xl transitionItem flex flex-col" :id="product?.id"
                            :class="filteredProduct?.length < 2? 'max-w-[22rem]': ''"
                            @click="routeToDetails(product?.id)"
                            >
                                 <div class="flex-1 min-h-[250px]">
                                     <img 
                                     :src="product?.images[0]" 
                                     alt="Product Image" 
                                     class="w-full h-full object-cover rounded-lg mb-4"
                                     />
                                 </div>
                                
                                <!-- Product Title and Price -->
                                <div class="mb-2">
                                <h3 class="text-lg font-semibold">{{ product?.name }}</h3>
                                <p class="text-sm text-gray-500">{{ product?.category?.name }}</p>
                                <p class="font-bold text-lg mt-2">{{ getCurrencySymbol(product?.currency) }}{{ product?.price.toLocaleString() }}</p>
                                </div>
                                
                                <!-- Product Summary -->
                                <p class="text-gray-600 text-sm mb-4">
                                {{ product?.description }}
                                </p>

                                <!-- Sales and Remaining Products -->
                                <div class="flex justify-between items-center text-gray-600 text-sm mt-4">
                                    <div class="flex items-center">
                                        <span>📊</span>
                                        <p class="ml-2">Sales: 0</p>
                                    </div>
                                    <div class="flex items-center">
                                        <span>📉</span>
                                        <p class="ml-2">Remaining: {{ product?.stock }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-start items-end mt-[4rem]">
                        <div class="flex">
                            <button
                            v-for="i in totalPages"
                            class="px-4 py-[0.5rem] border border-[#232321] rounded mx-1 hover:bg-textCol hover:!text-[white] transitionItem"
                            @click="setPage(i)"
                            :class="i === currentPage ? 'bg-textCol text-white': ''"
                            >{{ i }}</button>
                        </div>
                        <!-- <span class="item-self-end mx-4">...</span> -->
                        <!-- <button
                        class="px-4 py-[0.5rem] border border-[#232321] rounded mx-1 hover:bg-textCol hover:!text-[white] transitionItem">10</button>
                        <button class="rounded ml- border border-[#232321] px-4 py-[0.5rem]  hover:bg-textCol hover:!text-[white] transitionItem">Next &gt;</button> -->
                    </div>
                </div>
            
            </section>
        </dashboardLayout>
    </section>
</template>
    
<script setup>
import dashboardLayout from "@/components/ui/DashboardLayout.vue"
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAdminStore } from "@/stores/admin";
import { storeToRefs } from "pinia";
import loader from "@/components/Loader/Loader.vue"


const isLoading = ref(false)

const adminStore = useAdminStore()
const { products } = storeToRefs(adminStore)
const router = useRouter()
const currentPage = ref(1)
const productName = ref('')

const routeToDetails = (slug)=>{
    router.push({ name: 'productDetails', params: { slug}})
}

const routeToCreate = ()=>{
    router.push({name: 'newProduct'})
}

const handleGetProducts = async ()=>{
    isLoading.value = true
    try {
        await adminStore.handleGetProducts(currentPage.value)
        isLoading.value = false
    } catch (error) {
        console.log(error)
        isLoading.value = false
    }
}

const filteredProduct = computed(()=>{
    let filtered = products.value?.products

    if(productName.value){
        filtered = filtered.filter((item)=>{
            const itemName = item?.name?.toLowerCase().trim();
            const inputName = productName.value?.toLowerCase().trim()
            if(itemName.includes(inputName)){
                return item
            }
        })
    }

    return filtered

})

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

const totalPages = computed(()=>products.value?.totalPages)

const setPage = async(page)=>{
    currentPage.value = page
    await handleGetProducts(currentPage.value)
}

onMounted(async()=>{
    await handleGetProducts(currentPage.value)
})

</script>

<style lang="scss" scoped>

</style>