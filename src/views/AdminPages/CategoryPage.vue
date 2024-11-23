<template>
    <section>
        <dashboardLayout>
            <div v-if="isLoading" class="w-full h-full grid place-items-center">
                <loader />   
            </div>
            <section class="p-4 mx-auto dashboard-orders min-h-[100vh] pb-[5rem]" v-else>
                <div>
                    <div class="">
                        <h3 class="text-[#000000] font-[700] text-[1.5rem]">Collections</h3>
                        <p class="font-[600]">Home > Collections</p>
                    </div>
                    <div class="my-[1.5rem]">
                        <div class="bg-[#F8F8F8] rounded-[1rem] py-[1.5rem] px-4 dashboard-table">
                            <h3 class="text-[#000000] font-[700] text-[1.25rem] pb-4 border-b border-b-[#23232133] mb-4">Collections</h3>
                            <div class="overflow-x-auto">
                                <table class="min-w-full rounded-lg">
                                    <thead>
                                        <tr class="text-left text-gray-600 font-semibold">
                                            <th class="p-4 border-b"> 
                                                <div class="form-check"></div>
                                            </th>
                                            <th class="p-4 border-b">Collection Title</th>
                                            <th class="p-4 border-b">Description</th>
                                            <th class="p-4 border-b text-right">
                                                Options
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr 
                                        v-for="(category, index) in categories?.category" 
                                        :key="index" 
                                        class="text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                                        >
                                            <td class="p-4 border-b text-center">
                                                <div class="form-check">
                                                </div>
                                            </td>
                                            <td class="p-4 border-b">
                                                {{ category?.name }}
                                            </td>
                                            <td class="p-4 border-b">
                                               {{ category?.description }}
                                            </td>
                                            <th class="p-4 border-b text-right flex items-center justify-end gap-[0.5rem]">
                                                <span @click="initiateUpdateCategory(category?.name, category?.description, category?.image, category?.id)">
                                                    <editIcon />
                                                </span>
                                                <span @click="deleteCategory(category?.id)">
                                                    <DeleteIcon class="w-[1.2rem] h-[1.2rem] inline" />
                                                </span>
                                            </th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="w-[70%] mt-[3rem]">
                        <div 
                            class="border border-textCol p-[0.5rem] w-[30%] bg-textCol text-white rounded-[0.5rem] text-center cursor-pointer mob:w-full flex items-center gap-[0.5rem]"
                            @click="showCreateCategory"
                        >
                            <CategoryIcon />
                            <h3>Create Category</h3>
                        </div>
                        <transition name="fade" appear>
                            <div 
                                class="w-full mt-4 overflow-hidden"
                                v-show="showCreateCats"
                            >
                                <article>
                                    <label for="name" class="font-[500]"> Name</label>
                                    <input 
                                    v-model="categoryName"
                                    type="text" 
                                    id="name"
                                    placeholder="Category Name" 
                                    class="border border-textCol p-[1rem] rounded-[0.3rem] bg-inherit focus:outline-none text-[1rem] mt-[0.3rem] w-full">
                                </article>
                                <article class="my-[1rem]">
                                    <label for="descr" class="font-[500]"> Description </label>
                                    <textarea 
                                    v-model="categoryDescription"
                                    name="descr" 
                                    id="descr" 
                                    placeholder="Category Description" 
                                    class="border border-textCol p-[1rem] bg-inherit focus:outline-none text-[1rem] w-full mt-[0.3rem] rounded-[0.3rem]"></textarea>
                                </article>
                                <article>
                                    <h3 class="font-[500]">Select Category Image</h3>
                                    <label for="categoryImage">
                                        <div  
                                            class="border border-textCol p-[0.5rem] rounded-[0.3rem] bg-inherit focus:outline-none text-[1rem] mt-[0.3rem] w-full grid place-items-center cursor-pointer bgStyle h-[12rem]"
                                            :style="{ backgroundImage: `url(${bgImage})` }"
                                        >
                                            <UploadImageIcon class="w-[2rem]" />
                                        </div>
                                    </label>
                                    <input 
                                        type="file" 
                                        name="categoryImage" 
                                        id="categoryImage"
                                        hidden           
                                        v-bind="$attrs"
                                        class="!hidden"
                                        @change="uploadCategoryImage"
                                    >
                                    <p class="mt-4 mb-12">NB: Images should not exceed <span>20mb</span> in size</p>
                                </article>
                                <button 
                                    class="w-full bg-textCol text-white p-[0.5rem] rounded-[0.5rem] mt-[1rem]" 
                                    @click="handleCreateCategory"
                                    v-if="!isEdit"
                                >
                                    <whiteLoader v-if="isCreating"/>
                                    <span v-else>Submit</span>
                                </button>
                                <button 
                                    class="w-full bg-textCol text-white p-[0.5rem] rounded-[0.5rem] mt-[1rem]" 
                                    @click="updateCategory"
                                    v-else
                                >
                                    <whiteLoader v-if="isUpdating"/>
                                    <span v-else>Update</span>
                                </button>
                            </div>
                        </transition>
                    </div>
                </div>
            </section>
        </dashboardLayout>
    </section>
    </template>
    
    <script setup>
    import dashboardLayout from "@/components/ui/DashboardLayout.vue"
    import { ref, onMounted } from "vue";
    import { storeToRefs } from 'pinia';
    import { useAdminStore } from "@/stores/admin"
    import loader from "@/components/Loader/Loader.vue"
    import DeleteIcon from "@/components/icons/DeleteIcon.vue"
    import whiteLoader from "@/components/Loader/WhiteLoader.vue"
    import UploadImageIcon from "@/components/icons/UploadImageIcon.vue"
    import { useToast } from "vue-toastification";
    import CategoryIcon from "@/components/icons/CategoryIcon.vue"
    import editIcon from "@/components/icons/editIcon.vue";
    

    const showCreateCategory = () => {
        showCreateCats.value = !showCreateCats.value
    }

    const adminStore = useAdminStore()
    const { categories } = storeToRefs(adminStore)
    const isLoading = ref(false)
    const categoryName = ref('')
    const categoryDescription = ref('')
    const showCreateCats = ref(false)
    const bgImage = ref('')
    const isCreating = ref(false)
    const toast = useToast()
    const isEdit = ref(false)
    const isUpdating = ref(false)
    const categoryId = ref('')
    const currentImage = ref('')

    const deleteCategory = async (id)=>{
        isLoading.value = true
        try {
            let res = await adminStore.handleDeleteCategories(id)
            await handleGetCategories()
            isLoading.value = false
        } catch (error) {
            console.log(error)
            isLoading.value = false
        }
    }

    const handleGetCategories = async ()=>{
        isLoading.value = true
        try {
            await adminStore.handleGetCategories()
            isLoading.value = false
        } catch (error) {
            console.log(error)
            isLoading.value = false
        }
    }

    const handleCreateCategory = async () => {
        isCreating.value = true;
        let payload = {
            "name": categoryName.value,
            "slug": categoryName.value?.toLowerCase().replace(/\s+/g, "-"),
            "description": categoryDescription.value,
            "image": bgImage.value
        };
        try {
            let res = await adminStore.handleCreateCategories(payload);
            if( res?.statusText == "Created"){
                toast.success("Category created successfully", {
                    timeout: 4000,
                });
                // Autofill form fields
                categoryName.value = '';
                categoryDescription.value = '';
                bgImage.value = '';
                showCreateCats.value = false; // Hide the creation form
    
                // Fetch the latest categories
                await handleGetCategories();
            } else {
                toast.error("Error creating category, ensure image size is within allowed limits", {
                timeout: 4000,
            });
            }
        } catch (error) {
            console.log(error);
            toast.error("Image too large", {
                timeout: 4000,
            });
        } finally {
            isCreating.value = false;
        }
    };


    const uploadCategoryImage = (event) => {
        const file = event.target.files[0];
        if (file) {
        const reader = new FileReader();

        reader.onload = () => {
            bgImage.value = reader.result
        };

        reader.readAsDataURL(file);
        } else {
        console.log(file)
        }
    };

    const initiateUpdateCategory = async (name, descr, image, slug)=> {
        isEdit.value = true
        categoryName.value = name
        categoryDescription.value = descr
        bgImage.value = image
        categoryId.value = slug
        currentImage.value = image
        showCreateCategory()
        
        window.scrollTo({
            top: document.body.scrollHeight, // Scroll to the bottom
            behavior: 'smooth' // Add smooth scrolling
        });
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,        // Scroll to the top of the page
            behavior: 'smooth', // Smooth scrolling animation
        });
    };

    const updateCategory = async () => {
        isUpdating.value = true;
        
        let payload = {
            "name": categoryName.value,
            "slug": categoryName.value?.toLowerCase().replace(/\s+/g, "-"),
            "description": categoryDescription.value,
        };

        // Only add the image if it's new or modified
        if (currentImage.value !== bgImage.value) {
            payload.image = bgImage.value;
        }

        try {
            let res = await adminStore.handleEditCategories(payload, categoryId.value)
            if(res?.statusText == "OK"){
                toast.success("Category created successfully", {
                    timeout: 4000,
                });
                showCreateCategory()
            }
            isUpdating.value = false;
        } catch (error) {
            console.log(error);
            isUpdating.value = false;
        }
    };

    onMounted(async()=>{
            scrollToTop()
            await handleGetCategories()
    })
    </script>
    
    <style scoped>
    .bgStyle {
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }

    .fade-enter-active, .fade-leave-active {
        transition: all 0.3s ease;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
        transform: scaleY(0);
        transform-origin: top;
    }
    </style>