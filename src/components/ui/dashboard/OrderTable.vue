<template>
  <div class="bg-[#F8F8F8] rounded-[1rem] py-[1.5rem] px-4 dashboard-table">
    <h3 class="text-[#000000] font-[700] text-[1.25rem] pb-4 border-b border-b-[#23232133] mb-4">{{ props.title }}</h3>
    <div class="overflow-x-auto">
        <table class="min-w-full rounded-lg">
            <thead>
                <tr class="text-left text-gray-600 font-semibold">
                <th class="p-4 border-b"> 
                    <div class="form-check">
                    </div>
                </th>
                <th class="p-4 border-b">Product</th>
                <th class="p-4 border-b">Order ID</th>
                <th class="p-4 border-b">Date</th>
                <th class="p-4 border-b">Customer Name</th>
                <th class="p-4 border-b">Status</th>
                <th class="p-4 border-b">Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr 
                v-for="(order, index) in props.orders" 
                :key="index" 
                class="text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                @click="routeToDetail(order.id)"
                >
                    <td class="p-4 border-b text-center">
                        <div class="form-check">
                        </div>
                    </td>
                    <td class="p-4 border-b">
                        <div class="flex items-center">
                        <span>Lorem Ipsum</span>
                        </div>
                    </td>
                    <td class="p-4 border-b">#{{ order.id }}</td>
                    <td class="p-4 border-b">{{ order.date }}</td>
                    <td class="p-4 border-b">
                        <div class="flex items-center gap-2">
                        <img
                            :src="order.avatar"
                            alt="Customer Avatar"
                            class="w-8 h-8 rounded-full"
                        />
                        <span>{{ order.customerName }}</span>
                        </div>
                    </td>
                    <td class="p-4 border-b">
                        <div class="flex items-center gap-2">
                        <span 
                            :class="order.status === 'Delivered' ? 'bg-blue-500' : 'bg-orange-500'"
                            class="w-2 h-2 rounded-full"
                        ></span>
                        <span>{{ order.status }}</span>
                        </div>
                    </td>
                    <td class="p-4 border-b">₹{{ order.amount }}</td>
                </tr>
            </tbody>
        </table>
    </div>

    </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter()

const props = defineProps(['title', 'orders'])
const routeToDetail = ()=>{
    router.push({ name: 'order-detail', params: { slug :1}})
} 

</script>

<style lang="scss" scoped>

</style>