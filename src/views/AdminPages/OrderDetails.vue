<template>
   <section>
       <dashboardLayout>
           <section class="p-6 py-8 mx-auto dashboard-orders">
               <div>
                   <div class="">
                       <h3 class="text-[#000000] font-[700] text-[1.5rem]">Order Info</h3>
                       <p class="font-[600]">Home > Order Detail</p>
                   </div>
                   <div class="my-[1.5rem]">
                     <div class="order-headers">
                        <!-- Order Header -->
                        <div class="flex items-center justify-between bg-[#FFFFFF] p-4 py-8 rounded-lg shadow mb-4">
                           <div class="flex gap-[1.25rem]">
                              <div>
                                 <h2 class="text-xl font-semibold mb-[1.25rem]">Order ID: #6743</h2>
                                 <span class="text-sm text-textCol">Feb 16, 2022</span>
                              </div>
                              <div>
                                 <span class="p-[0.5rem] text-sm text-textCol font-[600] bg-[#ffa52fcc] rounded-[0.5rem]">{{ orderStatus }}</span>
                              </div>
                           </div>
                           <div class="flex items-center gap-2">
                              <div class="border rounded pr-4 bg-[#F4F2F2]">
                                 <select class="text-textCol font-[500] focus:outline-none bg-inherit p-4 cursor-pointer" v-model="orderStatus">
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
                                 <p class="text-gray-700">Full Name: Shristi Singh</p>
                                 <p class="text-gray-700">Email: shristi@gmail.com</p>
                                 <p class="text-gray-700">Phone: +91 904 231 1212</p>
                                 <button class="black_btn px-4 py-[0.75rem] rounded-[0.5rem] w-full mt-4" @click="routeToProfile">View profile</button>
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
                                 <p class="text-gray-700">Shipping: Next express</p>
                                 <p class="text-gray-700">Payment Method: Paypal</p>
                                 <p class="text-gray-700">Status: {{ orderStatus }}</p>
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
                                 <p class="text-gray-700">Address: Dharam Colony, Palam Vihar, Gurgaon, Haryana</p>
                              </div>
                           </div>
                        </div>

                        <!-- Payment Info and Notes -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                           <!-- Payment Info -->
                           <div class="bg-[#FFFFFF] p-4 rounded-lg shadow">
                           <h3 class="font-bold mb-2">Payment Info</h3>
                           <p class="text-gray-700 flex items-center gap-2">
                              <span>💳</span> Master Card **** 6557
                           </p>
                           <p class="text-gray-700">Business name: Shristi Singh</p>
                           <p class="text-gray-700">Phone: +91 904 231 1212</p>
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
                                 <tr v-for="(product, index) in products" :key="index" class="border-b">
                                 <td class="p-4 flex items-center gap-2">
                                    <div class="form-check mr-2">
                                    </div>
                                    <img :src="product.image" alt="Product Image" class="w-8 h-8 rounded">
                                    <span class="text-[#000000] font-[700] text-[0.8rem]">{{ product.name }}</span>
                                 </td>
                                 <td class="p-4">{{ product.orderId }}</td>
                                 <td class="p-4 text-center">{{ product.quantity }}</td>
                                 <td class="p-4 text-right">₹{{ product.total }}</td>
                                 </tr>
                              </tbody>
                           </table>
                           </div>
                           
                           <!-- Summary -->
                           <div class="flex justify-end mt-4">
                              <div class="text-right w-[20%] flex flex-col gap-[0.5rem] orderSummary">
                                 <div class="flex justify-between">
                                    <p>Subtotal:</p>
                                    <p>₹3,201.6</p>
                                 </div>
                                 <div class="flex justify-between">
                                    <p>Tax (20%):</p>
                                    <p> ₹640.32</p>
                                 </div>
                                 <div class="flex justify-between">
                                    <p>Discount:</p>
                                    <p> ₹0</p>
                                 </div>
                                 <div class="flex justify-between">
                                    <p>Shipping Rate:</p>
                                    <p> ₹0</p>
                                 </div>
                                 <div class="flex justify-between">
                                    <p class="text-xl font-bold">Total:</p>
                                    <p class="text-xl font-bold"> ₹3,841.92</p>
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
   import { ref } from "vue";
   import documentIcon from "@/components/icons/Document.vue"
   import userIcon from "@/components/icons/UserIcon.vue"
   import { useRouter } from "vue-router"

   const orderStatus = ref('Pending')
   const router = useRouter()

   const routeToProfile = ()=> {
      router.push({ name: 'customer-detail', params: { slug: 1}})
   }
   // Mock product data
   const products = ref([
   { image: 'https://picsum.photos/50?random=1', name: 'Lorem Ipsum', orderId: '#25421', quantity: 2, total: 800.40 },
   { image: 'https://picsum.photos/50?random=2', name: 'Lorem Ipsum', orderId: '#25421', quantity: 2, total: 800.40 },
   { image: 'https://picsum.photos/50?random=3', name: 'Lorem Ipsum', orderId: '#25421', quantity: 2, total: 800.40 },
   { image: 'https://picsum.photos/50?random=4', name: 'Lorem Ipsum', orderId: '#25421', quantity: 2, total: 800.40 }
   ]);
   
   </script>
   
   <style lang="scss" scoped>
   
   </style>