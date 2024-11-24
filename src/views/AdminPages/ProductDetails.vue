<template>
    <section>
        <dashboardLayout>
            <div class="w-full h-full min-h-[100vh] grid place-items-center" v-if="productLoading">
                <loader />
            </div>
            <section class="tab:w-[90%] tab:py-8 p-4 mx-auto dashboard-orders" v-else>
                <div>
                    <div class="">
                        <h3 class="text-[#000000] font-[700] text-[1.5rem]">New Product</h3>
                        <p class="font-[600]">Home > {{ singleProduct?.name }}</p>
                    </div>
                    <div class="my-[1.5rem] bg-[#F8F8F8] p-[1.25rem] rounded-[1rem] grid grid-cols-customGrid4 tab:grid-cols-1 gap-[2rem]">
                        <div class="w-full flex flex-col gap-[1.25rem]">
                            <div class="w-full">
                                <InputField 
                                    type="text"
                                    placeholder="Product Name"
                                    v-model="productDetails.name"
                                    title="Product Name"
                                    :isEditable="!isEditable"
                                />
                            </div>
                            <div class="w-full">
                                <label class="text-[#232321] font-[600]">Description</label>
                                <textarea placeholder="Product Description" rows="7" class=" mt-4 border border-[#232321] rounded-[0.5rem] w-full px-4 py-[0.95rem]" 
                                v-model="productDetails.description"
                                ></textarea>
                            </div>
                            <div class="w-full">
                                <label for="isFeatured">Select Category</label>
                                <div class="mt-4 border border-[#232321] rounded-[0.5rem] w-full px-4 py-[0.95rem] transitionItem" >
                                    <select 
                                        class="w-full border-none focus:outline-none bg-inherit"
                                        v-model="productDetails.categoryId" 
                                        id="category"
                                    >
                                        <option value="Select Category" disabled>Select Category</option>
                                        <option 
                                        :value="item?.id" v-for="item in categories?.category"
                                        :id="item?.id"
                                        >{{ item.name }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="flex gap-[1.25rem]">
                                <div class="w-full">
                                    <div class="flex flex-col">
                                        <label for="isFeatured">Featured Product</label>
                                        <div class="mt-4 border border-[#232321] rounded-[0.5rem] w-full px-4 py-[0.95rem] transitionItem" >
                                            <select 
                                                class="w-full border-none focus:outline-none bg-inherit"
                                                v-model="productDetails.isFeatured" 
                                                id="isFeatured"
                                            >
                                                <option :value="true">True</option>
                                                <option :value="false">False</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="w-full">
                                    <InputField 
                                        type="text"
                                        placeholder="Lorem Ipsum"
                                        v-model="productDetails.stock"
                                        title="Stock Quantity"
                                        :isEditable="!isEditable"
                                    />
                                </div>
                            </div>
                            <div class="gap-[1.25rem]">
                               <h3 class="text-[#232321] font-[600] mb-4">Prices</h3>
                               <div class="flex flex-col gap-[1.25rem]">
                                <article>
                                    <h3 class="text-[#232321] font-[600]">₦-NGN:</h3>
                                    <div class="flex items-center gap-[1.25rem]">
                                        <InputField 
                                            type="number"
                                            placeholder="Enter Price in Naira"
                                            v-model="productDetails.discountPrice"
                                            title="Regular/Discounted Price"
                                            :isEditable="!isEditable"
                                        />
                                        <InputField 
                                            type="number"
                                            placeholder="Lorem Ipsum"
                                            v-model="productDetails.price"
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
                                            v-for="(size, index) in productSizes" 
                                            :key="size"
                                            class="bg-[#36323B] rounded-[20px] py-[0.25rem] px-[1rem] text-[#E9E9EA] text-[0.7rem] cursor-pointer" @click="removeSize(size)">{{ size }}</span>
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
                                <label for="fileUpload" class="absolute top-0 left-0 w-full h-full z-[1] hidden">
                                        <div class="flex flex-col items-center justify-center py-8 px-4 rounded-[0.5rem] border gap-[1.63rem] border-dashed border-[#232321] mb-[1.25rem] h-full z-[1]"
                                        :class="!isEditable? 'cursor-not-allowed': 'cursor-pointer'"
                                        >
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
                                        @change="uploadMainImg"
                                    >
                                <!-- <div class="absolute top-0 w-full  h-full flex-col items-center justify-center py-8 px-4 rounded-[0.5rem] border gap-[1.63rem] border-dashed border-[#232321] cursor-pointer" :class="isEditable? 'flex': 'hidden'">
                                    <uploadIcon />
                                    <h3>
                                        Click to upload Images. <br> Jpeg, png are allowed
                                    </h3>
                                </div> -->
                                <img :src="mainBG" alt="" class="absolute top-0 w-full h-full left-0" :class="mainBG.length > 0? 'opacity-[0.5] z-[0.5]': 'opacity-0 z-[-1]'">
                            </div>
                            <div>
                                <h3 class="text-[#232321] font-[600] mb-4">
                                    Product Thumbnails
                                </h3>
                                <div class="hidden">
                                    <label for="thumbUpload">
                                        <div class="flex flex-col items-center justify-center py-8 px-4 rounded-[0.5rem] border gap-[1.63rem] border-dashed border-[#232321] mb-[1.25rem]"
                                        :class="!isEditable? 'cursor-not-allowed': 'cursor-pointer'"
                                        >
                                            <uploadIcon />
                                            <h3>
                                                Click to upload Images. <br> Jpeg, png are allowed
                                            </h3>
                                        </div>
                                    </label>
                                    <input 
                                        type="file" 
                                        name="thumbUpload"
                                        hidden 
                                        id="thumbUpload"
                                        v-bind="$attrs"
                                        class="!hidden"
                                        @change="uploadThumbnails"
                                    >
                                </div>

                                <div class="flex flex-col gap-[1.25rem]" v-if="singleProduct?.images?.length > 1">
                                    <article 
                                    v-for="(item, index) in singleProduct?.images?.slice(1, 4)"
                                    :key="index"
                                    class="flex items-center justify-between bg-[#FAFAFA] rounded-[0.5rem] py-4 px-[1.25rem]">
                                        <div class="flex items-center gap-4">
                                            <div class="w-[4rem] h-[4rem] rounded-[0.5rem] border !border-textCol shadow-md overflow-hidden">
                                                <img :src="item" alt="" class="w-full h-full object-cover">
                                            </div>
                                            <div>
                                                <h3 class="mb-4">Thumbnail {{ index + 1 }}</h3>
                                                <rangeBar />
                                            </div>
                                        </div>
                                        <checkIcon />
                                    </article>
                                </div>
                                <div v-else>
                                    <h3>No thumbnails uploaded</h3>
                                </div>
                            </div>
                            <div class="w-full flex gap-4 mt-[4rem]">
                                <button class="black_btn px-4 py-[0.75rem] rounded-[0.5rem] h-full capitalize w-full hover:!bg-textCol hover:!text-white" @click="!isEditable ? toggleEdit() : updateChanges()">
                                    <shortLoader v-if="isLoading"/>
                                    <span v-else>{{ !isEditable ? "Update" : "Save" }}</span>
                              </button>
                                <button class="black_btn px-4 py-[0.75rem] rounded-[0.5rem] h-full capitalize w-full hover:!bg-textCol hover:!text-white" @click="handleDelete">
                                    <shortLoader v-if="isDeleting"/>
                                    <span v-else>delete</span>
                                </button>
                                <button class="black_btn px-4 py-[0.75rem] rounded-[0.5rem] h-full capitalize w-full" v-if="isEditable" @click="toggleEdit">
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
    import { ref, computed, reactive, onMounted, watch } from "vue";
    import InputField from "@/components/ui/dashboard/InputField.vue";
    import uploadIcon from "@/components/icons/UploadImageIcon.vue"
    import checkIcon from "@/components/icons/CheckIcon.vue"
    import rangeBar from "@/components/icons/LoadBarIcon.vue"
    import { useAdminStore } from "@/stores/admin";
    import { useRouter, useRoute } from "vue-router";
    import shortLoader from "@/components/Loader/WhiteLoader.vue"
    import loader from "@/components/Loader/ShortLoader.vue"
    import { useToast } from "vue-toastification";
    import { storeToRefs } from "pinia";

    const adminStore = useAdminStore()
    const { categories, createResponse, singleProduct } = storeToRefs(adminStore)
    const isEditable = ref(false)
    const productSizes = ref([])
    const newSize = ref('')
    const isLoading = ref(false)
    const mainBG = ref('')
    const thumbnails = ref([])
    const toast = useToast();
    const router = useRouter()
    const route = useRoute()
    const productLoading = ref(false)
    const isDeleting = ref(false)

    const uploadMainImg = (event) => {
        const file = event.target.files[0];
        if (file) {
        const reader = new FileReader();

        reader.onload = () => {
            mainBG.value = reader.result
            productDetails.images = [mainBG.value]
        };

        reader.readAsDataURL(file);
        } else {
        console.log(file)
        }
    };

    const toggleEdit = ()=> {
        isEditable.value = !isEditable.value // Toggle the edit state
    }

    const productDetails = reactive({
        name: "",
        description: "",
        price: 0,
        currency: "NGN",
        discountPrice: 0,
        images: [],
        sizes: [],
        isFeatured: false,
        stock: 0,
        categoryId: "",
    });

    const uploadThumbnails = (event) => {
        const file = event.target.files[0];
        if (file) {
        const reader = new FileReader();

        reader.onload = () => {
            thumbnails.value.push({
                name: file.name,
                file: reader.result
            })
            // productDetails.images.push(mainBG.value)
        };

        reader.readAsDataURL(file);
        } else {
        console.log(file)
        }
    };

    const updateChanges = async ()=> {
        let payload = {
            "name": productDetails.name,
            "price": parseFloat(productDetails.price),
            "currency": productDetails.currency || "NGN",
            "discountPrice": parseFloat(productDetails.discountPrice),
            "sizes": productDetails.sizes,
            "description": productDetails.description,
            "isFeatured": productDetails.isFeatured,
            "categoryId": productDetails.categoryId,
            "stock": parseInt(productDetails.stock),
            "originalStock": parseInt(productDetails.stock),
         }
        try {
            let res = await handleUpdateProduct(route?.params?.slug, payload)
            console.log(res)
            toast.success("product updated successfully", {
                timeout: 4000,
            });
            await handleGetSingleProduct(route.params.slug)
            toggleEdit()
        } catch (error) {
            console.log(error)
        }
    }

    const handleAddSize = () => {
        if (newSize.value.trim()) {
            productSizes.value.push(newSize.value.trim().toUpperCase()); // Add the size
            productDetails.sizes = productSizes.value
            newSize.value = ""; // Clear input field after adding
        }
    };

    const handleUpdateProduct =async (slug, payload)=>{
        isLoading.value = true
        try {
            await adminStore.handleUpdateProducts(slug, payload)
            isLoading.value = false
        } catch (error) {
            console.log(error)
            isLoading.value = false
        }
    }

    const handleGetSingleProduct = async(slug)=>{
        productLoading.value = true
        try {
            await adminStore.handleGetSingleProduct(slug)
            productLoading.value = false
        } catch (error) {
            console.log(error)
            productLoading.value = false
        }
    }

    const handleDelete = async()=>{
        isDeleting.value = true
        try {
            await adminStore.handleDeleteProduct(route.params.slug)
            isDeleting.value = false
            router.push({ name: "products"})
        } catch (error) {
            console.log(error)
            isDeleting.value = false
        }
    }

    const areArraysEqual = (arr1, arr2)=> {
        // Check if the arrays have the same length
        if (arr1.length !== arr2.length) return false;

        // Compare stringified versions of each array
        return JSON.stringify(arr1) === JSON.stringify(arr2);
    }

    const removeSize = (sizeToRemove) => {
        productSizes.value = productSizes.value.filter(size => size !== sizeToRemove);
        productDetails.sizes = productSizes.value
    };

    watch(
        () => singleProduct.value,
        (newProduct) => {
            if (newProduct) {
                productDetails.name = newProduct.name;
                productDetails.description = newProduct.description;
                productDetails.price = newProduct.price;
                productDetails.currency = newProduct.currency;
                productDetails.discountPrice = newProduct.discountPrice;
                productDetails.images = newProduct.images;
                productDetails.sizes = newProduct.sizes;
                productDetails.isFeatured = newProduct.isFeatured;
                productDetails.stock = newProduct.stock;
                productDetails.categoryId = newProduct.categoryId;
            }
        },
        { immediate: true } // This ensures it runs immediately on component load
    );

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,        // Scroll to the top of the page
            behavior: 'smooth', // Smooth scrolling animation
        });
    };

    onMounted(async()=>{
        scrollToTop()
        await handleGetSingleProduct(route?.params?.slug)
        await adminStore.handleGetCategories()
        productSizes.value = singleProduct.value?.sizes
        mainBG.value = singleProduct.value?.images[0] || ""
    })
    
    </script>
    
    <style lang="scss" scoped>
    
    </style>