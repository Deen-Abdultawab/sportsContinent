<template>
    <section class="bg-[#FAFAFA] flex items-center flex-col w-[100%] dashboard h-screen min-h-[100vh] font-Raleway pt-[1.96rem] border border-l-[#007646]">
        <div class="logo w-[4rem] h-[4rem] cursor-pointer desk:hidden" @click="routeToDashboard">
            <img src="@/assets/images/logo.png" alt="">
        </div>
        <ul class="w-full px-4 flex flex-col gap-4 mt-[2rem]">
            <li>
                <router-link :to="{name: 'dashboard'}"
                class="link"
                :class="route.name === 'dashboard'? 'active': ''"
                >
                    <homeIcon />
                    <h3>Dashboard</h3>
                </router-link>
            </li>
            <li>
                <router-link :to="{name: 'products'}"
                class="link"
                :class="route.name === 'products'? 'active': ''"
                >
                    <albumIcon/>
                    <h3>All products</h3>
                </router-link>
            </li>
            <li>
                <router-link :to="{name: 'orders'}"
                class="link"
                :class="route.name === 'orders'? 'active': ''"
                >
                    <documentIcon />
                    <h3>Order list</h3>
                </router-link>
            </li>
            <li>
                <router-link :to="{name: 'customers'}"
                class="link"
                :class="route.name === 'customers'? 'active': ''"
                >
                <userIcon />
                <h3>Customers</h3>
                </router-link>
            </li>
            <li>
                <div class="link" @click="showCreateCategory">
                    <CategoryIcon />
                    <h3>Create Category</h3>
                </div>
                <div class="w-full mt-4 transitionItem overflow-hidden"
                :class="showCreateCats? 'h-auto': 'h-0'"
                >
                    <article>
                        <label for="name" class="font-[500]"> Name</label>
                        <input 
                        v-model="categoryName"
                        type="text" 
                        id="name"
                        placeholder="Category Name" class="border border-textCol p-[0.5rem] rounded-[0.3rem] bg-inherit focus:outline-none text-[0.8rem] mt-[0.3rem] w-full">
                    </article>
                    <article class="my-[0.5rem]">
                        <label for="descr" class="font-[500]"> Description </label>
                        <textarea 
                        v-model="categoryDescription"
                        name="descr" id="descr" placeholder="Category Name" class="border border-textCol p-[0.3rem] bg-inherit focus:outline-none text-[0.8rem] w-full mt-[0.3rem] rounded-[0.3rem]"></textarea>
                    </article>
                    <button class="w-full bg-textCol text-white p-[0.5rem] rounded-[0.5rem]" @click="handleCreateCategory">
                        <loader v-if="isLoading"/>
                        <span v-else>Submit</span>
                    </button>
                </div>
            </li>
        </ul>

        <!-- <div class="absolute left-0 bottom-4 item-start gap-4 mob:w-full px-4 flex flex-col ">
            <button class="black_btn px-4 py-[0.75rem] rounded-[0.5rem] w-full">
                Create New Product
            </button>
            <div class="flex items-center justify-between gap-[0.3rem] border border-textCol px-4 py-[0.72rem] rounded-[0.5rem] cursor-pointer">
                <h3>Admin</h3>
                <ArrowDown />
            </div>
        </div> -->
    </section>
</template>

<script setup>
import homeIcon from "@/components/icons/Home.vue"
import albumIcon from "@/components/icons/Album.vue"
import documentIcon from "@/components/icons/Document.vue"
import userIcon from "@/components/icons/UserIcon.vue"
import ArrowDown from "@/components/icons/ArrowDown.vue"
import { useRoute, useRouter } from "vue-router";
import { useAdminStore } from "@/stores/admin"
import { ref } from "vue"
import loader from "@/components/Loader/WhiteLoader.vue"
import { useToast } from "vue-toastification";
import CategoryIcon from "@/components/icons/CategoryIcon.vue"

const adminStore = useAdminStore()
const router = useRouter();
const route = useRoute()
const categoryName = ref('')
const categoryDescription = ref('')
const showCreateCats = ref(false)
const isLoading = ref(false)
const toast = useToast()

const emit = defineEmits(['closeNav'])

const showCreateCategory = async ()=>{
    showCreateCats.value = !showCreateCats.value
}

const routeToDashboard = ()=>{
  router.push({ name: 'dashboard' })
}

const handleCreateCategory = async()=>{
    isLoading.value = true
    let payload = {
        "name": categoryName.value,
        "slug": categoryName.value?.toLowerCase().replace(/\s+/g, "-"),
        "description": categoryDescription.value
    }
    try {
        await adminStore.handleCreateCategories(payload)
        emit('closeNav')
        toast.success("category created successfully", {
                timeout: 4000,
            });
        isLoading.value = false
    } catch (error) {
        console.log(error)
        isLoading.value = false
    }
}

</script>

<style lang="scss" scoped>

</style>