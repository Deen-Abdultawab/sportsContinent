<template>
    <section>
        <dashboardLayout>
            <section class="p-4 mx-auto dashboard-orders">
                <div>
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-[#000000] font-[700] text-[1.5rem]">All Products</h3>
                            <p class="font-[600]">Home > All Products</p>
                        </div>
                        <button class="black_btn px-4 py-[0.75rem] rounded-[0.5rem] h-full" @click="routeToCreate">
                            Create New Product
                        </button>
                    </div>
                    <div class="my-[1.5rem]">
                        <div class="grid grid-cols-customGrid2 gap-4">
                            <div 
                                v-for="(product, index) in products" 
                                :key="index" 
                            class="bg-[#F8F8F8] rounded-lg shadow-md p-4 cursor-pointer hover:shadow-xl transitionItem"
                            @click="routeToDetails"
                            >
                                <!-- Product Image -->
                                <img 
                                :src="product.image" 
                                alt="Product Image" 
                                class="w-full h-40 object-cover rounded-lg mb-4"
                                />
                                
                                <!-- Product Title and Price -->
                                <div class="mb-2">
                                <h3 class="text-lg font-semibold">{{ product.title }}</h3>
                                <p class="text-sm text-gray-500">{{ product.subtitle }}</p>
                                <p class="font-bold text-lg mt-2">₹{{ product.price }}</p>
                                </div>
                                
                                <!-- Product Summary -->
                                <p class="text-gray-600 text-sm mb-4">
                                {{ product.summary }}
                                </p>

                                <!-- Sales and Remaining Products -->
                                <div class="flex justify-between items-center text-gray-600 text-sm mt-4">
                                    <div class="flex items-center">
                                        <span>📊</span>
                                        <p class="ml-2">Sales: {{ product.sales }}</p>
                                    </div>
                                    <div class="flex items-center">
                                        <span>📉</span>
                                        <p class="ml-2">Remaining: {{ product.remaining }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-start items-end mt-[4rem]">
                        <div class="flex">
                            <button
                            v-for="i in [1,2,3,4,5]"
                            class="px-4 py-[0.5rem] border border-[#232321] rounded mx-1 hover:bg-textCol hover:!text-[white] transitionItem">{{ i }}</button>
                        </div>
                        <span class="item-self-end mx-4">...</span>
                        <button
                        class="px-4 py-[0.5rem] border border-[#232321] rounded mx-1 hover:bg-textCol hover:!text-[white] transitionItem">10</button>
                        <button class="rounded ml- border border-[#232321] px-4 py-[0.5rem]  hover:bg-textCol hover:!text-[white] transitionItem">Next &gt;</button>
                    </div>
                </div>
            
            </section>
        </dashboardLayout>
    </section>
</template>
    
<script setup>
import dashboardLayout from "@/components/ui/DashboardLayout.vue"
import { ref } from "vue";
import orderTable from "@/components/ui/dashboard/OrderTable.vue"
import { useRouter } from "vue-router";

// Array of products with random images and data
const products = ref([
    { 
        image: 'https://picsum.photos/200/150?random=1', 
        title: 'Lorem Ipsum', 
        subtitle: 'Battery', 
        price: '110.40', 
        summary: 'Lorem ipsum is placeholder text commonly used in the graphic.',
        sales: 1269, 
        remaining: 1269 
    },
    { 
        image: 'https://picsum.photos/200/150?random=2', 
        title: 'Lorem Ipsum', 
        subtitle: 'Battery', 
        price: '110.40', 
        summary: 'Lorem ipsum is placeholder text commonly used in the graphic.',
        sales: 1269, 
        remaining: 1269 
    },
    { 
        image: 'https://picsum.photos/200/150?random=2', 
        title: 'Lorem Ipsum', 
        subtitle: 'Battery', 
        price: '110.40', 
        summary: 'Lorem ipsum is placeholder text commonly used in the graphic.',
        sales: 1269, 
        remaining: 1269 
    },
    { 
        image: 'https://picsum.photos/200/150?random=2', 
        title: 'Lorem Ipsum', 
        subtitle: 'Battery', 
        price: '110.40', 
        summary: 'Lorem ipsum is placeholder text commonly used in the graphic.',
        sales: 1269, 
        remaining: 1269 
    },
    { 
        image: 'https://picsum.photos/200/150?random=2', 
        title: 'Lorem Ipsum', 
        subtitle: 'Battery', 
        price: '110.40', 
        summary: 'Lorem ipsum is placeholder text commonly used in the graphic.',
        sales: 1269, 
        remaining: 1269 
    },
    { 
        image: 'https://picsum.photos/200/150?random=2', 
        title: 'Lorem Ipsum', 
        subtitle: 'Battery', 
        price: '110.40', 
        summary: 'Lorem ipsum is placeholder text commonly used in the graphic.',
        sales: 1269, 
        remaining: 1269 
    },
    // Repeat similar objects to populate the grid
]);

const router = useRouter()

const routeToDetails = ()=>{
    router.push({name: 'product-details', params: { slug: 1}})
}

const routeToCreate = ()=>{
    router.push({name: 'new-product'})
}

</script>

<style lang="scss" scoped>

</style>