<template>
<dashboardLayout>
    <section class="p-4 mx-auto dashboard-home">
        <div>
            <div class="">
                <h3 class="text-[#000000] font-[700] text-[1.5rem]">Dashboard</h3>
                <p class="font-[600]">Home > Dashboard</p>
            </div>
            <div class="my-[1.5rem] grid grid-cols-customGrid3 gap-[0.88rem]">
                <article 
                class="bg-[#F8F8F8] py-[1.5rem] px-4 rounded-[1rem] shadow-md"
                v-for="order in orderSummary"
                >
                    <h3 class="text-textCol font-[700] mb-[0.72rem] capitalize">{{ order.title }}</h3>
                    <div class="flex items-center gap-4">
                        <OrderIcon />
                        <h3 class="font-[700]">{{ order.amount }}</h3>
                    </div>
                </article>
            </div>
            <div class="bg-[#F8F8F8] py-[1.5rem] px-4 rounded-[1rem] shadow-md mb-[1.5rem]">
                <h3 class="text-textCol font-[700] mb-[0.72rem] capitalize">Best Seller</h3>
                <div class="grid grid-cols-customGrid2 gap-4">
                    <article class="flex justify-between bg-[#eae8e8] p-4 rounded-[0.5rem] shadow-lg hover:shadow-xl transitionItem cursor-pointer" @click="routeToProduct">
                        <div class="flex gap-4">
                            <div class="w-[4rem] h-[4rem] rounded-[0.5rem] bg-textCol overflow-hidden">  
                            </div>
                            <div>
                                <h3 class="font-[700]">Lorem Ipsum</h3>
                                <p>₹126.500</p>
                            </div>
                        </div>
                        <div>
                            <h3 class="font-[700]">₹126.500</h3>
                            <p>999 sales</p>
                        </div>
                    </article>
                </div>
            </div>
            <div>
                <orderTable title="Recent Orders" :orders="orders"/>
            </div>
        </div>
    </section>
</dashboardLayout>
</template>

<script setup>
import dashboardLayout from "@/components/ui/DashboardLayout.vue"
import OrderIcon from "@/components/icons/OrderIcon.vue";
import { ref, onMounted } from "vue";
import { storeToRefs } from 'pinia';
import { useRouter } from "vue-router";
import orderTable from "@/components/ui/dashboard/OrderTable.vue"
import { useAnalyticsStore } from "@/stores/analytics"

const router = useRouter()
const analyticStore = useAnalyticsStore()
const { analytics } = storeToRefs(analyticStore)
const orderSummary = [
    {
        title: 'total orders',
        amount: '₹126.500'
    },
    {
        title: 'active orders',
        amount: '₹126.500'
    },
    {
        title: 'completed orders',
        amount: '₹126.500'
    },
    {
        title: 'canceled orders',
        amount: '₹126.500'
    },
] 

const orders = ref([
  { id: '25426', date: 'Nov 8, 2023', customerName: 'Kavin', avatar: 'https://picsum.photos/seed/kavin/50', status: 'Delivered', amount: '200.00' },
  { id: '25425', date: 'Nov 7, 2023', customerName: 'Komael', avatar: 'https://picsum.photos/seed/komael/50', status: 'Canceled', amount: '200.00' },
  { id: '25424', date: 'Nov 6, 2023', customerName: 'Nikhil', avatar: 'https://picsum.photos/seed/nikhil/50', status: 'Delivered', amount: '200.00' },
  { id: '25423', date: 'Nov 5, 2023', customerName: 'Shivam', avatar: 'https://picsum.photos/seed/shivam/50', status: 'Canceled', amount: '200.00' },
  { id: '25422', date: 'Nov 4, 2023', customerName: 'Shadab', avatar: 'https://picsum.photos/seed/shadab/50', status: 'Delivered', amount: '200.00' },
  { id: '25421', date: 'Nov 2, 2023', customerName: 'Yogesh', avatar: 'https://picsum.photos/seed/yogesh/50', status: 'Delivered', amount: '200.00' },
]);

const routeToProduct = ()=> {
    router.push({ name: 'product-details', params: { slug: 1}})
}

onMounted( async ()=>{
    await analyticStore.handleGetAnalytics()
    console.log(analytics.value)
})

</script>

<style scoped>

</style>