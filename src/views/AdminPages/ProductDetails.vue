<template>
    <section>
        <dashboardLayout>
            <section class="tab:w-[90%] tab:py-8 p-4 mx-auto dashboard-orders">
                <div>
                    <div class="">
                        <h3 class="text-[#000000] font-[700] text-[1.5rem]">Product Details</h3>
                        <p class="font-[600]">Home > All Products > Product Details</p>
                    </div>
                    <div class="my-[1.5rem] bg-[#F8F8F8] p-[1.25rem] rounded-[1rem] grid grid-cols-customGrid4 tab:grid-cols-1 gap-[2rem]">
                        <div class="w-full flex flex-col gap-[1.25rem]">
                            <div class="w-full">
                                <label class="text-[#232321] font-[600]">Product Name</label>
                                <input type="text" placeholder="Lorem Ipsum" class=" mt-4 border border-[#232321] rounded-[0.5rem] w-full px-4 py-[0.95rem]" value="Red Jeysey" :readonly="!isEditable">
                            </div>
                            <div class="w-full">
                                <label class="text-[#232321] font-[600]">Description</label>
                                <textarea placeholder="Lorem Ipsum" rows="7" class=" mt-4 border border-[#232321] rounded-[0.5rem] w-full px-4 py-[0.95rem]" value="High quality cotton jersey" :readonly="!isEditable"></textarea>
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
                                        v-model="orderID"
                                        title="Order ID"
                                        :isEditable="!isEditable"
                                    />
                                </div>
                                <div class="w-full">
                                    <InputField 
                                        type="text"
                                        placeholder="Lorem Ipsum"
                                        v-model="stockQuantity"
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
                                    <h3 class="text-[#232321] font-[600]">$-GBP:</h3>
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
                                        <div class="flex flex-col items-center justify-center py-8 px-4 rounded-[0.5rem] border gap-[1.63rem] border-dashed border-[#232321] cursor-pointer mb-[1.25rem]">
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
                            <div class="w-full flex gap-4 mt-[4rem]">
                                <button class="black_btn px-4 py-[0.75rem] rounded-[0.5rem] h-full capitalize w-full" @click="toggleEdit">
                                    {{ isEditable ? "Save" : "Update" }}
                                </button>
                                <button class="black_btn px-4 py-[0.75rem] rounded-[0.5rem] h-full capitalize w-full">
                                    delete
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
    import { readonly, ref } from "vue";
    import orderTable from "@/components/ui/dashboard/OrderTable.vue"
    import InputField from "@/components/ui/dashboard/InputField.vue";
    import uploadIcon from "@/components/icons/UploadImageIcon.vue"
    import checkIcon from "@/components/icons/CheckIcon.vue"
    import rangeBar from "@/components/icons/LoadBarIcon.vue"

    const stockQuantity = ref(10)
    const orderID = ref('#1342')

    const purchases = ref([
        { id: '25426', date: 'Nov 8, 2023', customerName: 'Kavin', avatar: 'https://picsum.photos/seed/kavin/50', status: 'Delivered', amount: '200.00' },
        { id: '25425', date: 'Nov 7, 2023', customerName: 'Komael', avatar: 'https://picsum.photos/seed/komael/50', status: 'Canceled', amount: '200.00' },
        { id: '25424', date: 'Nov 6, 2023', customerName: 'Nikhil', avatar: 'https://picsum.photos/seed/nikhil/50', status: 'Delivered', amount: '200.00' },
        { id: '25423', date: 'Nov 5, 2023', customerName: 'Shivam', avatar: 'https://picsum.photos/seed/shivam/50', status: 'Canceled', amount: '200.00' },
        { id: '25422', date: 'Nov 4, 2023', customerName: 'Shadab', avatar: 'https://picsum.photos/seed/shadab/50', status: 'Delivered', amount: '200.00' },
        { id: '25421', date: 'Nov 2, 2023', customerName: 'Yogesh', avatar: 'https://picsum.photos/seed/yogesh/50', status: 'Delivered', amount: '200.00' },
    ]);
    const isEditable = ref(false)

    function toggleEdit() {
        isEditable.value = !isEditable.value // Toggle the edit state
    }

    const cancelUpdate = ()=>{
        isEditable.value = !isEditable.value // Toggle the edit state
    }
    
    </script>
    
    <style lang="scss" scoped>
    
    </style>