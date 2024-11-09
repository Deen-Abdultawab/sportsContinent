<template>
    <section>
        <dashboardLayout>
            <section class="p-4 mx-auto dashboard-orders">
                <div>
                    <div class="">
                        <h3 class="text-[#000000] font-[700] text-[1.5rem]">Customer Info</h3>
                        <p class="font-[600]">Home > Customer Detail</p>
                    </div>
                    <div class="my-[1.5rem]">
                        <div class="grid grid-cols-customGrid3 gap-6 mb-6">
                            <div class="bg-[#F8F8F8] p-6 rounded-lg shadow-md flex flex-col items-center">
                                <p class="text-gray-500">Purchases</p>
                                <h3 class="text-2xl font-semibold">$75,620</h3>
                                <!-- <span class="text-green-500">+2.2%</span> -->
                            </div>
                            <div class="bg-[#F8F8F8] p-6 rounded-lg shadow-md flex flex-col items-center">
                                <p class="text-gray-500">Orders Placed</p>
                                <h3 class="text-2xl font-semibold">520</h3>
                                <!-- <span class="text-green-500">+5.7%</span> -->
                            </div>
                            <div class="bg-[#F8F8F8] p-6 rounded-lg shadow-md flex flex-col items-center">
                                <p class="text-gray-500">Refunds/Canceled Orders</p>
                                <h3 class="text-2xl font-semibold">7,283</h3>
                            </div>
                            <!-- <div class="bg-[#F8F8F8] p-6 rounded-lg shadow-md flex flex-col items-center">
                                <p class="text-gray-500">Net Profit</p>
                                <h3 class="text-2xl font-semibold">28%</h3>
                            </div> -->
                            </div>

                            <!-- Customer Info and Revenue Chart -->
                            <div class="grid grid-cols-3 gap-6 mb-6">
                            <!-- Customer Info Card -->
                            <div class="bg-[#F8F8F8] p-6 rounded-lg shadow-md col-span-1">
                                <div class="flex items-center mb-4">
                                <img src="https://via.placeholder.com/50" alt="Customer" class="rounded-full mr-4 w-16 h-16">
                                <div>
                                    <h3 class="text-lg font-semibold">Connie Robertson</h3>
                                    <p class="text-gray-500">connie@example.com</p>
                                </div>
                                </div>
                                <ul class="text-gray-600">
                                <!-- <li class="flex justify-between py-2"><span>Group:</span><span>$3,500</span></li> -->
                                <li class="flex justify-between py-2"><span>Location:</span><span>Minneapolis, MN</span></li>
                                <li class="flex justify-between py-2"><span>First Order:</span><span>Sep 30, 2019</span></li>
                                <li class="flex justify-between py-2"><span>Latest Order:</span><span>Feb 14, 2020</span></li>
                                </ul>
                            </div>

                            <!-- Revenue Chart (Placeholder) -->
                            <div class="bg-[#F8F8F8] p-6 rounded-lg shadow-md col-span-2">
                                <h3 class="text-lg font-semibold mb-4">Billing Address</h3>
                                <p class="text-gray-700">Address: Dharam Colony, Palam Vihar, Gurgaon, Haryana</p>
                            </div>
                            </div>

                            <!-- Order Table -->
                            <div class="bg-[#F8F8F8] p-6 rounded-lg shadow-md dashboard-table">
                            <h3 class="text-lg font-semibold mb-4">Orders</h3>
                                <OrderTable :orders="purchases"/>
                            </div>
                        
                    </div>
                </div>
            </section>
        </dashboardLayout>
    </section>
    </template>
    
    <script setup>
    import dashboardLayout from "@/components/ui/DashboardLayout.vue"
    import OrderTable from "@/components/ui/dashboard/OrderTable.vue";
    import { ref } from "vue";


    const statusClass = (status) => {
        switch (status) {
            case 'Completed':
            return 'text-green-500'
            case 'Pending':
            return 'text-orange-500'
            case 'Refund':
            return 'text-red-500'
            default:
            return 'text-gray-500'
        }
    }

    const purchases = ref([
        { id: '25426', date: 'Nov 8, 2023', customerName: 'Kavin', avatar: 'https://picsum.photos/seed/kavin/50', status: 'Delivered', amount: '200.00' },
        { id: '25425', date: 'Nov 7, 2023', customerName: 'Komael', avatar: 'https://picsum.photos/seed/komael/50', status: 'Canceled', amount: '200.00' },
        { id: '25424', date: 'Nov 6, 2023', customerName: 'Nikhil', avatar: 'https://picsum.photos/seed/nikhil/50', status: 'Delivered', amount: '200.00' },
        { id: '25423', date: 'Nov 5, 2023', customerName: 'Shivam', avatar: 'https://picsum.photos/seed/shivam/50', status: 'Canceled', amount: '200.00' },
        { id: '25422', date: 'Nov 4, 2023', customerName: 'Shadab', avatar: 'https://picsum.photos/seed/shadab/50', status: 'Delivered', amount: '200.00' },
        { id: '25421', date: 'Nov 2, 2023', customerName: 'Yogesh', avatar: 'https://picsum.photos/seed/yogesh/50', status: 'Delivered', amount: '200.00' },
    ]);
    
    </script>
    
    <style lang="scss" scoped>
    
    </style>