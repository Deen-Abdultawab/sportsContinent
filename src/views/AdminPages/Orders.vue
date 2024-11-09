<template>
    <section>
        <dashboardLayout>
            <section class="p-4 mx-auto dashboard-orders">
                <div>
                    <div class="">
                        <h3 class="text-[#000000] font-[700] text-[1.5rem]">Orders List</h3>
                        <p class="font-[600]">Home > Order List</p>
                    </div>
                    <div class="my-[1.5rem]">
                        <orderTable title="Recent Purchases" :orders="purchases"/>
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