<template>
    <section class="bg-[#FAFAFA] flex items-center flex-col w-[100%] dashboard h-screen min-h-[100vh] font-Raleway pt-[1.96rem] border border-l-[#007646] sticky top-0">
        <div class="logo w-[4rem] h-[4rem] cursor-pointer desk:hidden">
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
        </ul>
    </section>
</template>

<script setup>
import homeIcon from "@/components/icons/Home.vue"
import albumIcon from "@/components/icons/Album.vue"
import documentIcon from "@/components/icons/Document.vue"
import userIcon from "@/components/icons/UserIcon.vue"
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute()


</script>

<style lang="scss" scoped>

</style>