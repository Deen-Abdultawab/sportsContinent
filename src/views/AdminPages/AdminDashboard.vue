<template>
<dashboardLayout>
    <div v-if="isLoading" class="w-full h-full grid place-items-center">
        <loader />
    </div>
    <section class="p-4 mx-auto dashboard-home" v-else>
        <div>
            <div class="">
                <h3 class="text-[#000000] font-[700] text-[1.5rem]">Dashboard</h3>
                <p class="font-[600]">Home > Dashboard</p>
            </div>
            <div class="my-[1.5rem] grid grid-cols-customGrid3 gap-[0.88rem]">
                <orderSummary title="total orders" :quantity="analytics?.data?.totalOrders" />
                <orderSummary title="total products" :quantity="analytics?.data?.totalProducts" />
                <orderSummary title="total users" :quantity="analytics?.data?.totalUsers" />
                <orderSummary title="total revenue" :quantity="analytics?.data?.totalRevenue.toLocaleString()" showCurrency="true" />
            </div>
            <div class="bg-[#F8F8F8] py-[1.5rem] px-4 rounded-[1rem] shadow-md mb-[1.5rem]">
                <h3 class="text-textCol font-[700] mb-[0.72rem] capitalize">Best Seller</h3>
                <div class="grid grid-cols-customGrid2 gap-4">
                    <article class="flex justify-between bg-[#eae8e8] p-4 rounded-[0.5rem] shadow-lg hover:shadow-xl transitionItem cursor-pointer gap-4" 
                    @click="routeToProduct(item?.productId)"
                    v-for="item in analytics?.data?.topSellingProducts?.slice(0,3)"
                    :key="item?.productId"
                    :data-id="item?.productId"
                    >
                        <div class="flex gap-4">
                            <div class="w-[4rem] h-[4rem] rounded-[0.5rem] bg-textCol overflow-hidden">  
                            </div>
                                <!-- <img :src="item.image" alt=""> -->
                            <div>
                                <h3 class="font-[700] capitalize">{{ item?.name }}</h3>
                                <p>₦ {{ item?.price.toLocaleString() }}</p>
                            </div>
                        </div>
                        <div>
                            <h3 class="font-[700]">₦ {{ item?.price.toLocaleString() }}</h3>
                            <p>{{ item?.quantity }} sales</p>
                        </div>
                    </article>
                </div>
            </div>
            <div>
                <orderTable title="Recent Orders" :orders="analytics?.data?.recentOrders"/>
            </div>
        </div>
    </section>
</dashboardLayout>
</template>

<script setup>
import dashboardLayout from "@/components/ui/DashboardLayout.vue"
import OrderIcon from "@/components/icons/OrderIcon.vue";
import OrderSummary from "@/components/ui/dashboard/OrderSummary.vue";
import { ref, onMounted } from "vue";
import { storeToRefs } from 'pinia';
import { useRouter } from "vue-router";
import orderTable from "@/components/ui/dashboard/OrderTable.vue"
import { useAdminStore } from "@/stores/admin";
import loader from "@/components/Loader/ShortLoader.vue"

const router = useRouter()
const adminStore = useAdminStore()
const { analytics } = storeToRefs(adminStore)
const isLoading = ref(false)

const getAnalytics = async () => {
    isLoading.value = true
    try {
        await adminStore.handleGetAnalytics()
        isLoading.value = false
    } catch (error) {
        console.log(error)
        isLoading.value = false
    }
}

const routeToProduct = (slug)=> {
    router.push({ name: 'productDetails', params: { slug }})
}

onMounted( async ()=>{
    await getAnalytics()
})

</script>

<style scoped>

</style>