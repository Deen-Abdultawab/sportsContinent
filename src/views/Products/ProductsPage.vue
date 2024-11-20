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
                    <h3 class="text-[1.5rem] font-[600] font-Raleway">No result for this search parameter on this page</h3>
                </div>
                <div v-else>
                    <div class="grid grid-cols-customGrid2 gap-4">
                        <article 
                            class="flex flex-col gap-[1.25rem] cursor-pointer hover:scale-105 transitionItem rounded-lg p-4"
                            v-for="(product, index) in filteredProducts"
                            :key="index"
                            :id="product?.id"
                            :class="products?.products?.length < 2? 'max-w-[22rem]': ''"
                            @click="routeToProductDetails(product?.id)"
                        >
                            <div class="flex-1 min-h-[250px]">
                                <img 
                                :src="product?.images[0]" 
                                alt="Product Image" 
                                class="w-full h-full object-cover rounded-lg mb-4"
                                />
                            </div>
                            <div class="text-center">
                                <h3 class="font-Raleway font-[700] text-[0.875rem] leading-[1.05rem] text-textCol">{{product?.name}}</h3>
                                <div class="items-end font-openSans font-[400] text-textCol mt-[0.2rem]">
                                    <span class="old_price text-[0.75rem] line-through mr-[0.5rem] leading-[0.9rem]" v-if="product?.discountPrice">{{ getCurrencySymbol(product?.currency) }}{{ product?.discountPrice }}</span>
                                    <span class="current_price text-[1rem] leading-[1.2rem]">{{ getCurrencySymbol(product?.currency) }}{{ product?.price?.toLocaleString() }}</span>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div class="pagination flex items-center justify-center gap-[1.5rem] mb-[5.3rem]">
                    <div class="flex gap-[1.5rem] items-center">
                        <button
                        class="font-openSans font-[400] text-[1rem] leading-[1.2rem] text-textCol p-[0.5rem] rounded-full"
                        @click="setPage(page)"
                        v-for="page in totalPages"
                        :key="page"
                        :class="page === currentPage ? 'text-white bg-textCol': ''"
                        >{{ page }}</button>
                    </div>
                    <PaginationArrowIcon class="cursor-pointer" @click="setPage(currentPage + 1)" v-if="currentPage < totalPages"/>
                </div>
            </div>
        </div>
    </section>
    <Footer />
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { ref, computed, onMounted, watch} from "vue";
import { useRoute, useRouter } from 'vue-router';
import PaginationArrowIcon from '@/components/icons/PaginationArrowIcon.vue';
import { storeToRefs } from "pinia";
import { useAdminStore } from '@/stores/admin';
import loader from "@/components/Loader/Loader.vue"

const adminStore = useAdminStore()
const { products, categories, currentCurrency } = storeToRefs(adminStore)
const router = useRouter()
const route = useRoute()
const isLoading = ref(false)
const currentPage = ref(1)
const activeCategory = ref(null)
const activeSlug = ref('')
const sortOption = ref('');

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

const setActiveCategory = async (slug) => {
    currentPage.value = 1
  activeCategory.value = slug;
  activeSlug.value = slug
};

const filteredProducts = computed(()=>{
    let filtered = products.value?.products;

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

const getCurrencySymbol = (currencyCode) => {
    switch (currencyCode) {
        case 'USD':
        return '$';
        case 'GBP':
        return '£';
        case 'NGN':
        return '₦';
        default:
        return ''; // Default symbol if currency code is unknown
    }
};

const productsData = computed(()=> products.value?.products || [])

const paginatedProducts = computed(() => {
    const perPage = products.value?.pageSize;
    const start = (currentPage.value - 1) * perPage;
    const end = start + perPage;
    return productsData.value;
});


const totalPages = computed(()=>products.value?.totalPages)

// const totalPages = computed(() => {
//   // Ensure categoryFiltered.value is an array before trying to access its length
//   if (Array.isArray(filteredProducts.value)) {
//     return Math.ceil(filteredProducts.value?.length / 10); // Round up to the nearest whole number
//   }
//   return 0; // Default value if categoryFiltered.value is not an array
// });

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
</script>

<style lang="scss" scoped>

</style>