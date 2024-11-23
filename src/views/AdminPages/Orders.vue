<template>
    <section>
        <dashboardLayout>
            <div v-if="isLoading" class="w-full h-full grid place-items-center">
                <loader />   
            </div>
            <section class="p-4 mx-auto dashboard-orders" v-else>
                <div>
                    <div class="flex justify-between">
                        <div class="">
                            <h3 class="text-[#000000] font-[700] text-[1.5rem]">Orders List</h3>
                            <p class="font-[600]">Home > Order List</p>
                        </div>
                        <div>
                                <input type="text" placeholder="Search order id" class="text-textCol font-Raleway px-4 py-[0.75rem] h-full rounded-[0.5rem] border border-textCol focus:outline-none bg-inherit" v-model="orderId">
                            </div>
                    </div>
                    <div v-if="filteredOrder?.length < 1" class="mt-[1.5rem]">
                        <h3 class="text-[1.5rem] font-[600] font-Raleway">Order with this Id does not exist</h3>
                    </div>
                    <div class="my-[1.5rem]" v-else>
                        <orderTable title="Recent Purchases" :orders="filteredOrder"/>
                    </div>
                </div>
            </section>
        </dashboardLayout>
    </section>
    </template>
    
    <script setup>
    import dashboardLayout from "@/components/ui/DashboardLayout.vue"
    import { ref, onMounted, computed } from "vue";
    import orderTable from "@/components/ui/dashboard/OrderTable.vue"
    import { storeToRefs } from 'pinia';
    import { useAdminStore } from "@/stores/admin"
    import loader from "@/components/Loader/Loader.vue"


    const adminStore = useAdminStore()
    const { orders } = storeToRefs(adminStore)
    const isLoading = ref(false)
    const orderId = ref('')

    const filteredOrder = computed(()=>{
        let filtered = orders.value

        if(orderId.value?.length > 0){
            filtered = filtered.filter((item)=>{
                const itemId = '#' + item?.orderNumber.toLowerCase().trim();
                const inputId = orderId.value?.toLowerCase().trim()
                if(itemId.includes(inputId)){
                    return item
                }
            })
        }

        return filtered
    })

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