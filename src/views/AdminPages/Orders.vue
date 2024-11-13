<template>
    <section>
        <dashboardLayout>
            <div v-if="isLoading" class="w-full h-full grid place-items-center">
                <loader />   
            </div>
            <section class="p-4 mx-auto dashboard-orders" v-else>
                <div>
                    <div class="">
                        <h3 class="text-[#000000] font-[700] text-[1.5rem]">Orders List</h3>
                        <p class="font-[600]">Home > Order List</p>
                    </div>
                    <div class="my-[1.5rem]">
                        <orderTable title="Recent Purchases" :orders="orders"/>
                    </div>
                </div>
            </section>
        </dashboardLayout>
    </section>
    </template>
    
    <script setup>
    import dashboardLayout from "@/components/ui/DashboardLayout.vue"
    import { ref, onMounted } from "vue";
    import orderTable from "@/components/ui/dashboard/OrderTable.vue"
    import { storeToRefs } from 'pinia';
    import { useAdminStore } from "@/stores/admin"
    import loader from "@/components/Loader/Loader.vue"


    const adminStore = useAdminStore()
    const { orders } = storeToRefs(adminStore)
    const isLoading = ref(false)

    const handleGetAllOrders = async ()=>{
      isLoading.value = true
      try {
         await adminStore.handleGetOrders()
         isLoading.value = false
      } catch (error) {
         console.log(error)
         isLoading.value = false
      }
   }

   onMounted(async()=>{
      await handleGetAllOrders()
   })

    
    </script>
    
    <style lang="scss" scoped>
    
    </style>