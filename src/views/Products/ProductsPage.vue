<template>
    <Navbar />
    <section>
        <div class="w-[78.33%] mx-auto mt-[5rem] ">

            <h3 class="font-Raleway font-[700] text-[3rem] leading-[3.6rem] text-textCol mb-[1.5rem]">All Products</h3>
            <div class="category_btns flex items-center flex-wrap gap-4">
                <span
                class="py-[0.375rem] px-[0.75rem] rounded-[100px] border border-[#B0E3CE] cursor-pointer hover:bg-[#009759] hover:text-white transitionItem"
                :class="index === 0? 'bg-[#009759] text-white': ''"
                v-for="(category, index) in categories"
                :key="category"
                >{{ category.title }}</span>
            </div>
            <div class="flex items-center gap-[1.25rem] my-[4rem]">
                <h3 class="font-openSans font-[600] text-[1.25rem] leading-[1.56rem] text-textCol">Sort by:</h3>
                <div class="py-4 px-6 rounded-[200px] !border !border-textCol ">
                    <select name="currency" id="currency" class="bg-none text-textCol font-openSans font-[600] text-[1.2rem] leading-[1rem] focus:outline-none cursor-pointer">
                        <option value="" class="text-textCol">Best Selling</option>
                        <option value="" class="text-textCol">Alphabetically, A-Z</option>
                        <option value="" class="text-textCol">Alphabetically, Z-A</option>
                        <option value="" class="text-textCol">Price, low to high</option>
                        <option value="" class="text-textCol">Price, high to low</option>
                    </select>
                </div>
            </div>
            <div class="featured_products_container grid grid-cols-customGrid2 gap-[1.5rem] mb-[2.5rem] tab:grid-cols-customGrid3">
                <ProductCard 
                v-for="(item, index) in allProducts.products"
                :key="item.id"
                :product="item"
                @click="routeToProductDetails(item.id)"
                />
            </div>
            <div class="pagination flex items-center justify-center gap-[1.5rem] mb-[5.3rem]">
                <div class="flex gap-[1.5rem] items-center">
                    <button
                    class="font-openSans font-[400] text-[1rem] leading-[1.2rem] text-textCol"
                    v-for="page in pages"
                    :key="page"
                    >{{ page.num }}</button>
                </div>
                <PaginationArrowIcon />
            </div>
        </div>
    </section>
    <Footer />
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { ref, computed, onMounted, onUnmounted, nextTick} from "vue";
import { useRouter } from 'vue-router';
import ProductCard from '@/components/ProductCard.vue';
import PaginationArrowIcon from '@/components/icons/PaginationArrowIcon.vue';
import { storeToRefs } from "pinia";
import { useProductsStore } from "@/stores/products"

const productStore = useProductsStore()
const { allProducts, singleProduct } = storeToRefs(productStore)
const router = useRouter()

const routeToProductDetails = (id)=>{
    router.push({ name: 'product_detail', params: { slug: id}})
}

const getAllProducts = async ()=>{
    try {
        await productStore.handleAllProducts()
        console.log(allProducts)
    } catch (error) {
        console.log(error)
    }
}

    onMounted(() => {
        getAllProducts()
    })

   const categories = [
    {
        title: 'All Products'
    },
    {
        title: 'Football Jerseys'
    },
    {
        title: 'Tracksuits'
    },
    {
        title: 'Basketball combo'
    },
    {
        title: 'Baseball Jerseys'
    },
    {
        title: 'NFL Jerseys'
    },
    {
        title: 'Gym Essentials'
    },
    {
        title: 'Casuals'
    },
    {
        title: 'Slides'
    },
    {
        title: 'Sports Continent Wears'
    },
    {
        title: 'Caps'
    },
    {
        title: 'Polowears'
    },
    {
        title: 'Roundnecks'
    },
    {
        title: 'Sweaters'
    },
    {
        title: 'Shorts'
    },
    {
        title: 'Joggers'
    },
   ]
   const featuredProducts = [
    {
        id: 1,
        src: 'col1.png',
        title: 'Arsenal 2022/2023 Jersey',
        oldPrice: 60000,
        newPrice: 60000
    },
    {
        id: 1,
        src: 'col1.png',
        title: 'Arsenal 2022/2023 Jersey',
        oldPrice: 60000,
        newPrice: 60000
    },
    {
        id: 1,
        src: 'col1.png',
        title: 'Arsenal 2022/2023 Jersey',
        oldPrice: 60000,
        newPrice: 60000
    },
    {
        id: 1,
        src: 'col1.png',
        title: 'Arsenal 2022/2023 Jersey',
        oldPrice: 60000,
        newPrice: 60000
    },
    {
        id: 1,
        src: 'col1.png',
        title: 'Arsenal 2022/2023 Jersey',
        oldPrice: 60000,
        newPrice: 60000
    },
    {
        id: 1,
        src: 'col1.png',
        title: 'Arsenal 2022/2023 Jersey',
        oldPrice: 60000,
        newPrice: 60000
    },
    {
        id: 1,
        src: 'col1.png',
        title: 'Arsenal 2022/2023 Jersey',
        oldPrice: 60000,
        newPrice: 60000
    },
    {
        id: 1,
        src: 'col1.png',
        title: 'Arsenal 2022/2023 Jersey',
        oldPrice: 60000,
        newPrice: 60000
    },
    {
        id: 1,
        src: 'col1.png',
        title: 'Arsenal 2022/2023 Jersey',
        oldPrice: 60000,
        newPrice: 60000
    },
    ]
    const pages = [
        {
            num:1
        },
        {
            num:2
        },
        {
            num:3
        },
        {
            num:4
        },
        {
            num:5
        },
        {
            num:6
        },
    ]

    const getImgUrl = (path) => {
        return new URL(`../../public/${path}`, import.meta.url).href;
    };
</script>

<style lang="scss" scoped>

</style>