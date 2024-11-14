<template>
    <div class="bg-[#F8F8F8] rounded-[1rem] py-[1.5rem] px-4 dashboard-table">
      <h3 class="text-[#000000] font-[700] text-[1.25rem] pb-4 border-b border-b-[#23232133] mb-4">{{ title }}</h3>
      <div class="overflow-x-auto">
          <table class="min-w-full rounded-lg">
              <thead>
                  <tr class="text-left text-gray-600 font-semibold">
                      <th class="p-4 border-b"> 
                          <div class="form-check"></div>
                      </th>
                      <th class="p-4 border-b">Order ID</th>
                      <th class="p-4 border-b">Date</th>
                      <th class="p-4 border-b" v-if="!isCustomer">Customer Name</th>
                      <th class="p-4 border-b">Status</th>
                      <th class="p-4 border-b">Amount</th>
                  </tr>
              </thead>
              <tbody>
                  <tr 
                    v-for="(order, index) in orders" 
                    :key="index" 
                    class="text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                    @click="routeToDetail(order?.id)"
                  >
                      <td class="p-4 border-b text-center">
                          <div class="form-check"></div>
                      </td>
                      <td class="p-4 border-b font-sans">#{{ order?.orderNumber }}</td>
                      <td class="p-4 border-b">
                          <span v-if="!isCustomer">{{ formatDate(order?.createdAt) }}</span>
                          <span v-else>{{ formatDate(order?.date) }}</span>
                      </td>
                      <td class="p-4 border-b" v-if="!isCustomer">
                          <div class="flex items-center gap-2 capitalize">
                              <span>{{ order?.user?.lastName }} {{ order?.user?.firstName }}</span>
                          </div>
                      </td>
                      <td class="p-4 border-b">
                          <div class="flex items-center gap-2">
                              <span :class="`${statusClass(order?.status)} w-2 h-2 rounded-full`"></span>
                              <span>{{ order?.status }}</span>
                          </div>
                      </td>
                      <td class="p-4 border-b font-sans">₦ {{ order?.total?.toLocaleString() }}</td>
                  </tr>
              </tbody>
          </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from "vue-router";
  
  const router = useRouter()
  const props = defineProps(['title', 'orders', 'isCustomer'])
  
  const routeToDetail = (slug) => {
      router.push({ name: 'order-detail', params: { slug }})
  }
  
  const formatDate = (defaultDate) => {
      let date = new Date(defaultDate)
      return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric"
      })
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
  </script>
  
  <style lang="scss" scoped>
  </style>
  