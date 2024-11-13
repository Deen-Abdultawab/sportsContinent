<template>
    <Navbar />
   <section class="grid place-items-center w-full h-full min-h-[100vh]">
    <div class="text-center">
        <h1 class="text-[2rem] font-[600] text-[red]">Payment Failed!</h1>
        <p class="text-[1.5rem]">Oops! Your payment wasn't successfull this time, <br> you can try again</p>
        <div class="mt-12 flex gap-6">
            <button class="black_btn" @click="routeToProducts">
                Go to products
            </button>
            <router-link to="/">
                <button class="black_btn" @click="routeToProducts">
                    Home
                </button>
            </router-link>
        </div>
    </div>
   </section>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import { useRouter } from "vue-router"

const router = useRouter()
const routeToProducts = ()=>{
    router.push({ name: "allProducts" });
}
</script>

<style lang="scss" scoped>


</style>