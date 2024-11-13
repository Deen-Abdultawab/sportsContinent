<template>
    <section>
        <dashboardLayout>
            <div class="min-h-[100vh] h-full w-full grid place-items-center" v-if="isLoading">
                <loader />
            </div>
            <section class="p-4 mx-auto dashboard-orders" v-else>
                <div>
                    <div class="">
                        <h3 class="text-[#000000] font-[700] text-[1.5rem]">Customers</h3>
                        <p class="font-[600]">Home > Customers</p>
                    </div>
                    <div class="my-[1.5rem]">
                        <div class="bg-[#F8F8F8] rounded-[1rem] py-[1.5rem] px-4 dashboard-table">
                            <h3 class="text-[#000000] font-[700] text-[1.25rem] pb-4 border-b border-b-[#23232133] mb-4">Customers</h3>
                            <div class="overflow-x-auto">
                                <table class="min-w-full rounded-lg">
                                    <thead>
                                        <tr class="text-left text-gray-600 font-semibold">
                                        <th class="p-4 border-b"> 
                                            <div class="form-check">
                                            </div>
                                        </th>
                                        <!-- <th class="p-4 border-b">P</th>
                                        <th class="p-4 border-b">Order ID</th> -->
                                        <th class="p-4 border-b">Date Joined</th>
                                        <th class="p-4 border-b">Customer Name</th>
                                        <th class="p-4 border-b">Email</th>
                                        <th class="p-4 border-b text-center">Total Orders</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <!-- {{ customers.data.customers }} -->
                                        <tr 
                                        v-for="(customer, index) in customers?.data?.customers" 
                                        :key="index" 
                                        class="text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                                        @click="routeToDetail(customer?.id)"
                                        >
                                            <td class="p-4 border-b text-center">
                                                <div class="form-check">
                                                </div>
                                            </td>
                                            <!-- <td class="p-4 border-b">
                                                <div class="flex items-center">
                                                <span>Lorem Ipsum</span>
                                                </div>
                                            </td> -->
                                            <!-- <td class="p-4 border-b">#{{ order.id }}</td> -->
                                            <td class="p-4 border-b">{{ formatDate(customer?.memberSince) }}</td>
                                            <td class="p-4 border-b">
                                                <div class="flex items-center gap-4">
                                                    <div class="w-8 h-8 rounded-full border border-textCol grid place-items-center">
                                                        <userIcon />
                                                    </div>
                                                <!-- <img
                                                    :src="order.avatar"
                                                    alt="Customer Avatar"
                                                    class="w-8 h-8 rounded-full"
                                                /> -->
                                                <span>{{ customer?.fullName }}</span>
                                                </div>
                                            </td>
                                            <td class="p-4 border-b">
                                                <div class="flex items-center gap-2">
                                                <span>{{ customer?.email }}</span>
                                                </div>
                                            </td>
                                            <td class="p-4 border-b text-center">{{ customer?.metrics?.totalOrders }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </dashboardLayout>
    </section>
    </template>
    
    <script setup>
    import dashboardLayout from "@/components/ui/DashboardLayout.vue"
    import { ref, onMounted } from "vue";
    import { useRouter } from "vue-router"
    import orderTable from "@/components/ui/dashboard/OrderTable.vue"
    import userIcon from "@/components/icons/userIcon.vue"
    import { useAdminStore } from "@/stores/admin";
    import loader from "@/components/Loader/Loader.vue"
    import { storeToRefs } from "pinia";

    const router = useRouter();
    const isLoading = ref(false)
    const adminStore = useAdminStore()
    const { customers } = storeToRefs(adminStore)
    const formattedDate = ref('')

    const orders = ref([
        { id: '25426', date: 'Nov 8, 2023', customerName: 'Kavin Abba', avatar: 'https://picsum.photos/seed/kavin/50', status: 'kevinabba@gmail.com', amount: 2 },
        { id: '25425', date: 'Nov 7, 2023', customerName: 'Komael Azr', avatar: 'https://picsum.photos/seed/komael/50', status: 'azr124@yahoo.com', amount: 2 },
        { id: '25424', date: 'Nov 6, 2023', customerName: 'Nikhil Mikahil', avatar: 'https://picsum.photos/seed/nikhil/50', status: 'mikinikki@gmail.com', amount: 3 },
        { id: '25423', date: 'Nov 5, 2023', customerName: 'Shivam Rashid', avatar: 'https://picsum.photos/seed/shivam/50', status: 'shivamrash@gmail.com', amount: 4 },
        { id: '25422', date: 'Nov 4, 2023', customerName: 'Shadab dihar', avatar: 'https://picsum.photos/seed/shadab/50', status: 'shadhir@gmail.com', amount: 3 },
        { id: '25421', date: 'Nov 2, 2023', customerName: 'Yoges diharh', avatar: 'https://picsum.photos/seed/yogesh/50', status: 'dhiyo@yahoo.com', amount: 4 },
    ]);

    const routeToDetail = (slug)=>{
        router.push({ name: 'customerDetail', params: { slug }})
    }

    const formatDate = (defaultDate)=>{
      let date = new Date(defaultDate)

      formattedDate.value = date.toLocaleDateString("en-US", {
         month: "short", // "Nov"
         day: "numeric", // "4"
         year: "numeric" // "2024"
      });

      return formattedDate.value
   }

    const handleGetCustomers = async ()=>{
        isLoading.value = true
        try {
            await adminStore.handleGetCustomers()
            isLoading.value = false
        } catch (error) {
            console.log(error)
            isLoading.value = false
        }
    }

    onMounted(async()=>{
        await handleGetCustomers()
        console.log(customers.value)
    })
    
    </script>
    
    <style scoped>
    
    </style>