<template>
   <section>
       <dashboardLayout>
         <div v-if="isLoading" class="w-full h-full grid place-items-center">
            <loader />   
         </div>
           <section class="p-6 py-8 mx-auto dashboard-orders" v-else>
               <div>
                   <div class="">
                       <h3 class="text-[#000000] font-[700] text-[1.5rem]">Order Info</h3>
                       <p class="font-[600]">Home > Order Detail</p>
                   </div>
                   <div class="my-[1.5rem]">
                     <div class="order-headers">
                        <!-- Order Header -->
                        <div class="flex items-center justify-between bg-[#FFFFFF] p-4 py-8 rounded-lg shadow mb-4">
                           <div class="flex gap-[1.25rem] mob:flex-col">
                              <div class="mob:order-2">
                                 <h2 class="text-xl font-semibold mb-[1.25rem]">Order ID: #{{ singleOrder?.data?.order?.orderNumber }}</h2>
                                 <span class="text-sm text-textCol">{{ formatDate(singleOrder?.data?.order?.createdAt) }}</span>
                              </div>
                              <div>
                                 <!-- <span class="p-[0.5rem] text-sm text-textCol font-[600] bg-[#ffa52fcc] rounded-[0.5rem]">{{ singleOrder?.status }}</span> -->
                                 <span
                                 class="p-[0.5rem] text-sm text-textCol font-[600] rounded-[0.5rem]"
                                 :class="statusClass(singleOrder?.data?.order?.status)">{{ singleOrder?.data?.order?.status }}</span>
                              </div>
                           </div>
                           <div class="flex items-center gap-2">
                              <div class="border rounded pr-4 bg-[#F4F2F2]">
                                 <select class="text-textCol font-[500] focus:outline-none bg-inherit p-4 cursor-pointer" v-model="orderStatus"
                                 @change="handleUpdateStatus(singleOrder?.data?.order?.id)"
                                 >
                                    <option disabled value="Change Status">Change Status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                 </select>
                              </div>
                           <button class="border rounded p-4 bg-[#F4F2F2] cursor-pointer">Save</button>
                           </div>
                        </div>

                        <!-- Info Sections -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                           <!-- Customer Info -->
                           <div class="bg-[#FFFFFF] p-4 rounded-lg shadow flex gap-4">
                              <div>
                                 <div class="bg-textCol rounded-[0.5rem] p-4">
                                    <userIcon class="text-[white]"/>
                                 </div>
                              </div>
                              <div class="flex-1">
                                 <h3 class="font-bold mb-2">Customer</h3>
                                 <p class="text-gray-700 capitalize">Full Name: {{ singleOrder?.data?.order?.user?.lastName }} {{ singleOrder?.data?.order?.user?.firstName }}</p>
                                 <p class="text-gray-700">Email: {{ singleOrder?.data?.order?.user?.email }}</p>
                                 <p class="text-gray-700">Phone: {{ singleOrder?.data?.order?.user?.phone }}</p>
                                 <button class="black_btn px-4 py-[0.75rem] rounded-[0.5rem] w-full mt-4" @click="routeToProfile(singleOrder?.data?.order?.user?.id)">View profile</button>
                              </div>
                           </div>

                           <!-- Order Info -->
                           <div class="bg-[#FFFFFF] p-4 rounded-lg shadow flex gap-4">
                              <div>
                                 <div class="bg-textCol rounded-[0.5rem] p-4">
                                    <documentIcon class="text-[white]"/>
                                 </div>
                              </div>
                              <div class="flex-1">
                                 <h3 class="font-bold mb-2">Order Info</h3>
                                 <!-- <p class="text-gray-700">Shipping: Not</p> -->
                                 <p class="text-gray-700">Payment Method: PayStack</p>
                                 <p class="text-gray-700">Status: {{ singleOrder?.data?.order?.status }}</p>
                                 <!-- <button class="black_btn px-4 py-[0.75rem] rounded-[0.5rem] w-full mt-4">Download Info</button> -->
                              </div>
                           </div>
                           
                           <!-- Deliver to Info -->
                           <div class="bg-[#FFFFFF] p-4 rounded-lg shadow flex gap-4">
                              <div>
                                 <div class="bg-textCol rounded-[0.5rem] p-4">
                                    <documentIcon class="text-[white]"/>
                                 </div>
                              </div>
                              <div class="flex-1">
                                 <h3 class="font-bold mb-2">Deliver to:</h3>
                                 <p class="text-gray-700">Address:
                                 <br> {{ singleOrder?.data?.order?.shippingAddress?.street }}, {{ singleOrder?.data?.order?.shippingAddress?.city }}, {{ singleOrder?.data?.order?.shippingAddress?.state }}, {{ singleOrder?.data?.order?.shippingAddress?.country }} </p>
                                 <p class="text-gray-700 mt-[0.5rem]">Postal Code: {{ singleOrder?.data?.order?.shippingAddress?.postalCode }}  </p>
                              </div>
                           </div>
                        </div>

                        <!-- Payment Info and Notes -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                           <!-- Payment Info -->
                           <div class="bg-[#FFFFFF] p-4 rounded-lg shadow">
                           <h3 class="font-bold mb-2">Payment Info</h3>
                           <!-- <p class="text-gray-700 flex items-center gap-2">
                              <span>💳</span> Master Card **** 6557
                           </p> -->
                           <p class="text-gray-700 capitalize">Business name: {{ singleOrder?.data?.order?.user?.lastName }} {{ singleOrder?.data?.order?.user?.firstName }}</p>
                           <p class="text-gray-700">Phone: {{ singleOrder?.data?.order?.user?.phone }}</p>
                           </div>

                           <!-- Notes -->
                           <div class="bg-[#FFFFFF] p-4 rounded-lg shadow">
                           <h3 class="font-semibold mb-2">Note</h3>
                           <textarea
                              class="w-full border rounded p-2 focus:outline-none"
                              rows="4"
                              placeholder="Type some notes"
                           ></textarea>
                           </div>
                        </div>

                        <!-- Product Table -->
                        <div class="bg-[#FFFFFF] p-4 rounded-lg shadow dashboard-table pb-[4rem]">
                           <h3 class="font-semibold mb-4">Products</h3>
                           <div class="overflow-auto">
                              <table class="w-full text-left mb-4">
                                 <thead>
                                    <tr class="text-gray-600 uppercase text-sm">
                                    <th class="p-4 border-b">Product Name</th>
                                    <th class="p-4 border-b">Order ID</th>
                                    <th class="p-4 border-b text-center">Quantity</th>
                                    <th class="p-4 border-b text-right">Total</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    <tr v-for="(order, index) in singleOrder?.data?.order?.items" :key="order.id" class="border-b">
                                    <td class="p-4 flex items-center gap-2">
                                       <div class="form-check mr-2">
                                       </div>
                                       <img :src="order?.product?.images[0]" alt="Product Image" class="w-8 h-8 rounded">
                                       <span class="text-[#000000] font-[700] text-[0.8rem]">{{ order?.product?.name }}</span>
                                    </td>
                                    <td class="p-4">#{{ singleOrder?.data?.order?.orderNumber }}</td>
                                    <td class="p-4 text-center">{{ order?.quantity }}</td>
                                    <td class="p-4 text-right">
                                       {{ getCurrencySymbol(order?.product?.currency) }} {{ (order?.price * order?.quantity).toLocaleString() }}
                                    </td>
                                    </tr>
                                 </tbody>
                              </table>
                           </div>
                           
                           <!-- Summary -->
                           <div class="flex justify-end mt-4">
                              <div class="text-right w-[20%] mob:w-[50%] flex flex-col gap-[0.5rem] orderSummary">
                                 <div class="flex justify-between">
                                    <p>Subtotal:</p>
                                    <p>{{ getCurrencySymbol(singleOrder?.data?.order?.currency) }} {{ singleOrder?.data?.order?.total?.toLocaleString() }}</p>
                                 </div>
                                 <div class="flex justify-between">
                                    <p>Tax (0%):</p>
                                    <p> ₦0</p>
                                 </div>
                                 <div class="flex justify-between">
                                    <p>Discount:</p>
                                    <p> ₦0</p>
                                 </div>
                                 <div class="flex justify-between">
                                    <p>Shipping Rate:</p>
                                    <p> ₦0</p>
                                 </div>
                                 <div class="flex justify-between">
                                    <p class="text-xl font-bold">Total:</p>
                                    <p class="text-xl font-bold"> {{ getCurrencySymbol(singleOrder?.data?.order?.currency) }} {{ singleOrder?.data?.order?.total?.toLocaleString() }}</p>
                                 </div>
                              </div>
                           </div>
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
   import documentIcon from "@/components/icons/Document.vue"
   import userIcon from "@/components/icons/UserIcon.vue"
   import { useRouter, useRoute } from "vue-router"
   import { storeToRefs } from 'pinia';
   import { useAdminStore } from "@/stores/admin"
   import loader from "@/components/Loader/Loader.vue"

   const adminStore = useAdminStore()
   const { singleOrder } = storeToRefs(adminStore)
   const orderStatus = ref('Change Status')
   const router = useRouter()
   const route = useRoute()
   const isLoading = ref(false)
   const formattedDate = ref('')

   const handleSingleStore = async (slug)=>{
      isLoading.value = true
      try {
         await adminStore.handleGetSingleOrder(slug)
         isLoading.value = false
      } catch (error) {
         console.log(error)
         isLoading.value = false
      }
   }

   const handleUpdateStatus = async (slug)=>{
      isLoading.value = true
      const payload = {
         "status": orderStatus.value.toUpperCase()
      }
      try {
         await adminStore.handleOrderStatusUpdate(slug, payload)
         await handleSingleStore(route.params.slug)
         orderStatus.value = 'Change Status'
         isLoading.value = false
      } catch (error) {
         console.log(error)
         isLoading.value = false
      }
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

   const getCurrencySymbol = (currencyCode) => {
      switch (currencyCode) {
         case 'USD':
            return '$';
         case 'GBP':
            return '£';
         case 'NGN':
            return '₦';
         default:
            return ''; // Default symbol if currency code is unknown
      }
   };

   const routeToProfile = (slug)=> {
      router.push({ name: 'customerDetail', params: { slug }})
   }

   const statusClass = (status) => {
      switch (status) {
         case 'SHIPPED':
            return 'bg-green-500'
         case 'PENDING':
            return 'bg-orange-500'
         case 'PROCESSING':
            return 'bg-yellow-400'
         default:
            return 'bg-gray-500'
      }
   }

   onMounted(async()=>{
      await handleSingleStore(route.params.slug)
   })
   
   </script>
   
   <style lang="scss" scoped>
   
   </style>