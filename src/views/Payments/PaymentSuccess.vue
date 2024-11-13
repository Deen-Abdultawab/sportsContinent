<template>
    <Navbar />
   <section class="grid place-items-center w-full h-full min-h-[100vh]">
    <div class="text-center">
        <h1 class="text-[2rem] font-[600]">Payment Successful</h1>
        <p class="text-[1.5rem]">Thank you for shopping with us</p>
        <div class="mt-12">
            <button class="black_btn" @click="routeToProducts">
                Continue Shopping
            </button>
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