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
                                        <!-- {{ customers?.data?.pagination }} -->
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

                <div class="flex justify-start items-end mt-[4rem]">
                        <div class="flex">
                            <button
                            v-for="i in totalPages"
                            class="px-4 py-[0.5rem] border border-[#232321] rounded mx-1 hover:bg-textCol hover:!text-[white] transitionItem"
                            @click="setPage(i)"
                            :class="i === currentPage ? 'bg-textCol text-white': ''"
                            v-if="totalPages > 1"
                            >{{ i }}</button>
                        </div>
                    </div>
            </section>
        </dashboardLayout>
    </section>
    </template>
    
    <script setup>
    import dashboardLayout from "@/components/ui/DashboardLayout.vue"
    import { ref, onMounted, computed } from "vue";
    import { useRouter } from "vue-router"
    import userIcon from "@/components/icons/UserIcon.vue"
    import { useAdminStore } from "@/stores/admin";
    import loader from "@/components/Loader/Loader.vue"
    import { storeToRefs } from "pinia";

    const router = useRouter();
    const isLoading = ref(false)
    const adminStore = useAdminStore()
    const { customers } = storeToRefs(adminStore)

    const routeToDetail = (slug)=>{
        router.push({ name: 'customerDetail', params: { slug }})
    }

    const formatDate = (defaultDate) => {
        let date = new Date(defaultDate)
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        })
    }

    const handleGetCustomers = async ()=>{
        isLoading.value = true
        try {
            await adminStore.handleGetCustomers(1)
            isLoading.value = false
        } catch (error) {
            console.log(error)
            isLoading.value = false
        }
    }

    // pagination

    const pagination = computed(()=>customers.value?.data?.pagination)
    const currentPage = ref(1)

    const totalPages = computed(()=>pagination.value?.totalPages)

    const setPage = async(page)=>{
        scrollToTop()
        if(page !== currentPage.value){
            currentPage.value = page
            await handleGetProducts(currentPage.value)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,        // Scroll to the top of the page
            behavior: 'smooth', // Smooth scrolling animation
        });
    };

    onMounted(async()=>{
        scrollToTop()
        await handleGetCustomers()
    })
    
    </script>
    
    <style scoped>
    
    </style>