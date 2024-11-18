<template>
    <Navbar />
    <section>
        <div class="w-[78.33%] tab:w-[90%] mx-auto mt-[5rem] ">
            <!-- {{ filteredProducts }} -->
            <h3 class="font-Raleway font-[700] text-[3rem] leading-[3.6rem] text-textCol mb-[1.5rem]">All Products</h3>
            <div class="category_btns flex items-center flex-wrap gap-4 mb-12">
                 <!-- "All" category item -->
                <span
                @click="setActiveCategory('All')"
                class="py-[0.375rem] px-[0.75rem] rounded-[100px] border border-[#B0E3CE] cursor-pointer hover:bg-[#009759] hover:text-white transitionItem"
                :class="activeCategory === 'All' ? 'bg-[#009759] text-white' : ''"
                >
                All
                </span>

                <!-- Loop through categories and set the active category on click -->
                <span
                v-for="(category, index) in categories.category"
                :key="category.name"
                @click="setActiveCategory(category?.name)"
                class="py-[0.375rem] px-[0.75rem] rounded-[100px] border border-[#B0E3CE] cursor-pointer hover:bg-[#009759] hover:text-white transitionItem"
                :class="activeCategory === category?.name ? 'bg-[#009759] text-white' : ''"
                >
                {{ category.name }}
                </span>
            </div>
            <div class="flex items-center gap-[1.25rem] my-[4rem]">
                <h3 class="font-openSans font-[600] text-[1.25rem] leading-[1.56rem] text-textCol">Sort by:</h3>
                <div class="py-4 px-6 rounded-[200px] !border !border-textCol ">
                    <select 
                        name="sortOption" 
                        id="sortOption" 
                        v-model="sortOption" 
                        class="bg-none text-textCol font-openSans font-[600] text-[1.2rem] leading-[1rem] focus:outline-none cursor-pointer">
                        <option value="" disabled>Select sorting</option>
                        <!-- <option value="Best Selling">Best Selling</option> -->
                        <option value="Alphabetically: A-Z">Alphabetically, A-Z</option>
                        <option value="Alphabetically: Z-A">Alphabetically, Z-A</option>
                        <option value="Price: Low to High">Price, low to high</option>
                        <option value="Price: High to Low">Price, high to low</option>
                    </select>
                </div>
            </div>
            <div v-if="isLoading" class="w-full h-full">
                <loader />
            </div>
            <div v-else>
                <div v-if="filteredProducts?.length < 1" class="w-full h-full min-h-[100vh]">
                    <h3 class="text-[1.5rem] font-[600] font-Raleway">No result for this search parameter</h3>
                </div>
                <div v-else>
                    <div class="featured_products_container grid grid-cols-customGrid6 gap-[1.5rem] mb-[2.5rem] tab:grid-cols-customGrid3">
                        <ProductCard 
                            v-for="(item, index) in paginatedProducts"
                            :key="index"
                            :product="item"
                            @click="routeToProductDetails(item?.id)"
                            class=" mob:!max-w-[full] w-full border border-textCol rounded-[0.5rem] shadow-lg"
                        />
                    </div>
                    <div class="pagination flex items-center justify-center gap-[1.5rem] mb-[5.3rem]">
                        <div class="flex gap-[1.5rem] items-center">
                            <button
                            class="font-openSans font-[400] text-[1rem] leading-[1.2rem] text-textCol p-[0.5rem] rounded-full"
                            @click="setPage(page)"
                            v-for="page in paginationButtons"
                            :key="page"
                            :class="page === currentPage ? 'text-white bg-textCol': ''"
                            >{{ page }}</button>
                        </div>
                        <PaginationArrowIcon class="cursor-pointer" @click="setPage(currentPage + 1)" v-if="currentPage < totalPages"/>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <Footer />
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { ref, computed, onMounted, onUnmounted, nextTick, watch} from "vue";
import { useRoute, useRouter } from 'vue-router';
import ProductCard from '@/components/ui/ProductCard.vue';
import PaginationArrowIcon from '@/components/icons/PaginationArrowIcon.vue';
import { storeToRefs } from "pinia";
import { useProductsStore } from "@/stores/products"
import { useAdminStore } from '@/stores/admin';
import loader from "@/components/Loader/Loader.vue"

const adminStore = useAdminStore()
const { products, categories, currentCurrency, filteredProduct } = storeToRefs(adminStore)
const router = useRouter()
const route = useRoute()
const isLoading = ref(false)
const currentPage = ref(1)
const activeCategory = ref(null)
const activeSlug = ref('')
const sortOption = ref('');
const itemsPerPage = 10;


const setActiveCategory = async (slug) => {
  activeCategory.value = slug;
  activeSlug.value = slug
};

const filteredProducts = computed(()=>{
    let filtered = products.value.products;

    if(activeSlug.value?.length > 0){
        if(activeSlug.value === "All"){
            filtered = products.value.products;
        } else {
            filtered = filtered?.filter((item)=>{
                const itemCategory = item?.category?.name?.toLowerCase().trim();
                const activeCat = activeSlug.value?.toLowerCase().trim()
    
                if(itemCategory === activeCat){
                    return item
                }
            })
        }
    }

     // Apply sorting options
     if (sortOption.value === 'Price: Low to High') {
        filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption.value === 'Price: High to Low') {
        filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption.value === 'Alphabetically: A-Z') {
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption.value === 'Alphabetically: Z-A') {
        filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
    }



    return filtered
})

const routeToProductDetails = (slug)=>{
    router.push({ name: 'product_detail', params: { slug}})
}

const querySearch = ()=>{
    if(route.query.category && route.query.category.length > 0){
        activeSlug.value = route.query.category
        setActiveCategory(activeSlug.value)
    } else {
        setActiveCategory('All')
    }
}

const handleGetProducts = async ()=>{
    isLoading.value = true
    try {
        await adminStore.handleGetProducts(currentPage.value, currentCurrency.value)
        await adminStore.handleGetCategories()
        isLoading.value = false
    } catch (error) {
        console.log(error)
        isLoading.value = false
    }
}

const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredProducts.value?.slice(start, end);
});

const paginationButtons = computed(() => {
    return Array.from({ length: totalPages.value }, (_, i) => i + 1);
});

const totalPages = computed(() => {
    const totalFiltered = filteredProducts.value?.length;
    
    return Math.ceil(totalFiltered / itemsPerPage);
});

const setPage = async (page) => {
    if (page < 1 || page > totalPages.value) return;
    currentPage.value = page;
    await handleGetProducts(currentPage.value, currentCurrency.value)
};

watch(currentCurrency, async (newCurrency) => {
  await adminStore.updateCurrency(newCurrency);
  await handleGetProducts(currentPage.value, currentCurrency.value);
});

onMounted(async()=>{
    querySearch()
    await adminStore.getCurrency()
    await adminStore.updateCurrency(currentCurrency.value)
    await handleGetProducts()
})
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
</script>

<style lang="scss" scoped>

</style>