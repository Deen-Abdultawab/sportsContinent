<template>
  <section>
      <dashboardLayout>
          <div class="min-h-[100vh] h-full w-full grid place-items-center" v-if="isLoading">
              <loader />
          </div>
          <section class="tab:w-[90%] tab:py-8 p-4 mx-auto dashboard-orders" v-else>
              <div>
                  <div class="">
                      <h3 class="text-[#000000] font-[700] text-[1.5rem]">Product Details</h3>
                      <p class="font-[600]">Home > All Products > {{ singleProduct?.name }}</p>
                  </div>
                  <div class="my-[1.5rem] bg-[#F8F8F8] p-[1.25rem] rounded-[1rem] grid grid-cols-customGrid4 tab:grid-cols-1 gap-[2rem]">
                      <div class="w-full flex flex-col gap-[1.25rem]">
                          <div class="w-full">
                              <label class="text-[#232321] font-[600]">Product Name</label>
                              <input type="text" placeholder="Lorem Ipsum" class=" mt-4 border border-[#232321] rounded-[0.5rem] w-full px-4 py-[0.95rem]" v-model="singleProduct?.name" :readonly="!isEditable">
                          </div>
                          <div class="w-full">
                              <label class="text-[#232321] font-[600]">Description</label>
                              <textarea placeholder="Lorem Ipsum" rows="7" class=" mt-4 border border-[#232321] rounded-[0.5rem] w-full px-4 py-[0.95rem]" 
                              v-model="singleProduct?.description" :readonly="!isEditable"></textarea>
                          </div>
                          <div class="w-full">
                              <label class="text-[#232321] font-[600]">Category</label>
                              <input type="text" placeholder="Lorem Ipsum" class=" mt-4 border border-[#232321] rounded-[0.5rem] w-full px-4 py-[0.95rem]" value="Jersey" :readonly="!isEditable">
                          </div>
                          <div class="flex gap-[1.25rem]">
                              <div class="w-full">
                                  <InputField 
                                      type="text"
                                      placeholder="Lorem Ipsum"
                                      v-model="singleProduct?.id"
                                      title="Product ID"
                                      :isEditable="!isEditable"
                                  />
                              </div>
                              <div class="w-full">
                                  <InputField 
                                      type="text"
                                      placeholder="Lorem Ipsum"
                                      v-model="singleProduct?.stock"
                                      title="Stock Quantity"
                                      :isEditable="!isEditable"
                                  />
                              </div>
                          </div>
                          <div class="gap-[1.25rem]">
                             <h3 class="text-[#232321] font-[600] mb-4">Prices</h3>
                             <div class="flex flex-col gap-[1.25rem]">
                              <article>
                                  <h3 class="text-[#232321] font-[600]">$-USD:</h3>
                                  <div class="flex items-center gap-[1.25rem]">
                                      <InputField 
                                          type="text"
                                          placeholder="Lorem Ipsum"
                                          v-model="stockQuantity"
                                          title="Regular/Discounted Price"
                                          :isEditable="!isEditable"
                                      />
                                      <InputField 
                                          type="text"
                                          placeholder="Lorem Ipsum"
                                          v-model="stockQuantity"
                                          title="Sale Price"
                                          :isEditable="!isEditable"
                                      />
                                  </div>
                              </article>
                              <article>
                                  <h3 class="text-[#232321] font-[600]">₦-NGN:</h3>
                                  <div class="flex items-center gap-[1.25rem]">
                                      <InputField 
                                          type="text"
                                          placeholder="Lorem Ipsum"
                                          v-model="stockQuantity"
                                          title="Regular/Discounted Price"
                                          :isEditable="!isEditable"
                                      />
                                      <InputField 
                                          type="text"
                                          placeholder="Lorem Ipsum"
                                          v-model="stockQuantity"
                                          title="Sale Price"
                                          :isEditable="!isEditable"
                                      />
                                  </div>
                              </article>
                              <article>
                                  <h3 class="text-[#232321] font-[600]">£-GBP:</h3>
                                  <div class="flex items-center gap-[1.25rem]">
                                      <InputField 
                                          type="text"
                                          placeholder="Lorem Ipsum"
                                          v-model="stockQuantity"
                                          title="Regular/Discounted Price"
                                          :isEditable="!isEditable"
                                      />
                                      <InputField 
                                          type="text"
                                          placeholder="Lorem Ipsum"
                                          v-model="stockQuantity"
                                          title="Sale Price"
                                          :isEditable="!isEditable"
                                      />
                                  </div>
                              </article>
                              <article>
                                  <h3 class="text-[#232321] font-[600]">Sizes</h3>
                                  <div class="mt-4 border border-[#232321] rounded-[0.5rem] w-full px-4 py-[0.5rem] transitionItem h-[5rem]">
                                      <div class="mb-[0.5rem] flex items-center gap-[0.5rem]">
                                          <span 
                                          v-for="size in productSizes" 
                                          :key="size"
                                          class="bg-[#36323B] rounded-[20px] py-[0.25rem] px-[1rem] text-[#E9E9EA] text-[0.7rem]">{{ size }}</span>
                                      </div>
                                      <input 
                                          type="text" 
                                          placeholder="enter size" 
                                          class="capitalize bg-inherit w-full p-[0.2rem] focus:outline-none"
                                          :readonly="!isEditable"
                                          v-model="newSize" 
                                          @keypress.enter="handleAddSize" 
                                      >
                                  </div>
                              </article>
                             </div>
                          </div>
                      </div>
                      <div>
                          <div class="rounded-[0.5rem] bg-[#00000033] h-[500px] w-full mb-[2rem] relative">
                              <div class="absolute top-0 w-full  h-full flex-col items-center justify-center py-8 px-4 rounded-[0.5rem] border gap-[1.63rem] border-dashed border-[#232321] cursor-pointer" :class="isEditable? 'flex': 'hidden'">
                                  <uploadIcon />
                                  <h3>
                                      Click to upload Images. <br> Jpeg, png are allowed
                                  </h3>
                              </div>
                              <!-- <img src="" alt=""> -->
                          </div>
                          <div>
                              <h3 class="text-[#232321] font-[600] mb-4">
                                  Product Thumbnails
                              </h3>
                              <div>
                                  <label for="fileUpload">
                                      <div class="flex flex-col items-center justify-center py-8 px-4 rounded-[0.5rem] border gap-[1.63rem] border-dashed border-[#232321] mb-[1.25rem]" :class="!isEditable? 'cursor-not-allowed': 'cursor-pointer'">
                                          <uploadIcon />
                                          <h3>
                                              Click to upload Images. <br> Jpeg, png are allowed
                                          </h3>
                                      </div>
                                  </label>
                                  <input 
                                      type="file" 
                                      name="fileUpload"
                                      hidden 
                                      id="fileUpload"
                                      v-bind="$attrs"
                                      class="!hidden"
                                      @change="uploadFile"
                                  >
                              </div>

                              <div class="flex flex-col gap-[1.25rem]">
                                  <article class="flex items-center justify-between bg-[#FAFAFA] rounded-[0.5rem] py-4 px-[1.25rem]">
                                      <div class="flex items-center gap-4">
                                          <div class="w-[4rem] h-[4rem] bg-[#00000033] rounded-[0.5rem]">
  
                                          </div>
                                          <div>
                                              <h3 class="mb-4">Product thumbnail.png</h3>
                                              <rangeBar />
                                          </div>
                                      </div>
                                      <checkIcon />
                                  </article>
                                  <article class="flex items-center justify-between bg-[#FAFAFA] rounded-[0.5rem] py-4 px-[1.25rem]">
                                      <div class="flex items-center gap-4">
                                          <div class="w-[4rem] h-[4rem] bg-[#00000033] rounded-[0.5rem]">
  
                                          </div>
                                          <div>
                                              <h3 class="mb-4">Product thumbnail.png</h3>
                                              <rangeBar />
                                          </div>
                                      </div>
                                      <checkIcon />
                                  </article>
                                  <article class="flex items-center justify-between bg-[#FAFAFA] rounded-[0.5rem] py-4 px-[1.25rem]">
                                      <div class="flex items-center gap-4">
                                          <div class="w-[4rem] h-[4rem] bg-[#00000033] rounded-[0.5rem]">
  
                                          </div>
                                          <div>
                                              <h3 class="mb-4">Product thumbnail.png</h3>
                                              <rangeBar />
                                          </div>
                                      </div>
                                      <checkIcon />
                                  </article>
                              </div>
                          </div>
                          {{ singleProduct }}
                          <div class="w-full flex gap-4 mt-[4rem]">
                              <button class="black_btn px-4 py-[0.75rem] rounded-[0.5rem] h-full capitalize w-full hover:!bg-textCol hover:!text-white" @click="toggleEdit">
                                  {{ isEditable ? "Save" : "Update" }}
                              </button>
                              <button class="black_btn px-4 py-[0.75rem] rounded-[0.5rem] h-full capitalize w-full hover:!bg-textCol hover:!text-white" @click="deleteProduct(singleProduct?.id)">
                                  <shortLoader v-if="isDeleting"/>
                                  <span v-else>
                                      delete
                                  </span>
                              </button>
                              <button class="black_btn px-4 py-[0.75rem] rounded-[0.5rem] h-full capitalize w-full" v-if="isEditable" @click="cancelUpdate">
                                  Cancel
                              </button>
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
  import { onMounted, ref, watch} from "vue";
  import InputField from "@/components/ui/dashboard/InputField.vue";
  import uploadIcon from "@/components/icons/UploadImageIcon.vue"
  import checkIcon from "@/components/icons/CheckIcon.vue"
  import rangeBar from "@/components/icons/LoadBarIcon.vue"
  import { useAdminStore } from "@/stores/admin";
  import loader from "@/components/Loader/Loader.vue"
  import { storeToRefs } from "pinia";
  import { useRoute } from "vue-router";
  import shortLoader from "@/components/Loader/WhiteLoader.vue"


  const isLoading = ref(false)
  const isDeleting = ref(false)
  const adminStore = useAdminStore()
  const { singleProduct } = storeToRefs(adminStore)
  const stockQuantity = ref(10)
  const route = useRoute()
  const productSizes = ref([])
  const newSize = ref('')

  // const getSizes = computed(()=>{
  //     return productSizes.value = singleProduct.value?.sizes || []
  // })

  const getProductSizes = ()=>{
      productSizes.value = [...singleProduct.value?.sizes] || []
      return productSizes.value
  }

  const handleAddSize = () => {
      if (newSize.value.trim()) {
          productSizes.value.push(newSize.value.trim().toUpperCase()); // Add the size
          newSize.value = ""; // Clear input field after adding
      }
  };

  const isEditable = ref(false)

  function toggleEdit() {
      isEditable.value = !isEditable.value // Toggle the edit state
  }

  const cancelUpdate = ()=>{
      isEditable.value = !isEditable.value // Toggle the edit state
  }

  const handleGetSingleProduct = async(slug)=>{
      isLoading.value = true
      try {
          await adminStore.handleGetSingleProduct(slug)
          isLoading.value = false
      } catch (error) {
          console.log(error)
          isLoading.value = false
      }
  }

  const deleteProduct = async(slug)=>{
      isDeleting.value = true
      try {
          await adminStore.handleDeleteProduct(slug)
          isDeleting.value = false
      } catch (error) {
          console.log(error)
          isDeleting.value = false
      }
  }

  const uploadFile = (event) => {
      const file = event.target.files[0];
      if (file) {
      const reader = new FileReader();

      reader.onload = () => {
          console.log(reader.result)
      };

      reader.readAsDataURL(file);
      } else {
      console.log(file)
      }
  };

  watch(
      () => singleProduct.value?.sizes, // Watch the `sizes` field within `singleProduct`
      (newSizes) => {
          productSizes.value = [...(newSizes || [])]; // Update `productSizes` when `sizes` changes
      },
      { immediate: true } // Ensure it runs immediately after mounting
  );

  onMounted(async()=>{
      await handleGetSingleProduct(route.params.slug)
      getProductSizes()
      console.log(singleProduct.value)
  })
  
  </script>
  
  <style lang="scss" scoped>
  
  </style>