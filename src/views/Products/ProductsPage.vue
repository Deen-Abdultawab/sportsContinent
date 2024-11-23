<template>
    <Navbar />
    <section>
        <div class="w-[78.33%] tab:w-[90%] mx-auto mt-[5rem] ">
            <!-- {{ filteredProducts }} -->
            <h3 class="font-Raleway font-[700] text-[3rem] leading-[3.6rem] text-textCol mb-[1.5rem]">All Products</h3>
            <div>
                <div class="w-[20%] mob:w-[50%] mob:py-[0.6rem] rounded-[5rem] flex items-center gap-4 py-4 bg-[#009759] justify-center mb-8 cursor-pointer hover:bg-[#0e3323] transitionItem" @click="toggleShowFilter">
                    <h3 class="text-[1.5rem] text-white font-Raleway">Filter</h3>
                    <FilterIcon class="text-white w-[2rem] h-[2rem]"/>
                </div>
                <div class="!transitionItem" :class="showFilter? 'border-[red] h-auto animate__animated animate__fadeIn': 'overflow-hidden animate__animated animate__fadeOut h-0'">
                    <div class="category_btns flex items-center flex-wrap gap-4 mb-12 h-full transitionItem">
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
                        @click="setActiveCategory(category?.slug)"
                        class="py-[0.375rem] px-[0.75rem] rounded-[100px] border border-[#B0E3CE] cursor-pointer hover:bg-[#009759] hover:text-white transitionItem"
                        :class="activeCategory === category?.slug ? 'bg-[#009759] text-white' : ''"
                        >
                        {{ category.name }}
                        </span>
                    </div>
                    <div class="flex mt-[4rem] mb-4 gap-[3rem] mob:flex-col mob:gap-[1.5rem]">
                        <div class="flex flex-col gap-[1.25rem] mob:gap-[0.5rem]">
                            <h3 class="font-openSans font-[600] text-[1.25rem] leading-[1.56rem] text-textCol">Sort by:</h3>
                            <div class="py-4 px-6 rounded-[200px] !border !border-textCol ">
                                <select 
                                    name="sortOption" 
                                    id="sortOption" 
                                    v-model="sortOption" 
                                    class="bg-none text-textCol font-openSans font-[600] text-[1.2rem] leading-[1rem] focus:outline-none cursor-pointer w-full">
                                    <option value="" disabled>Select sorting</option>
                                    <!-- <option value="Best Selling">Best Selling</option> -->
                                    <option value="Alphabetically: A-Z">Alphabetically, A-Z</option>
                                    <option value="Alphabetically: Z-A">Alphabetically, Z-A</option>
                                    <option value="Price: Low to High">Price, low to high</option>
                                    <option value="Price: High to Low">Price, high to low</option>
                                </select>
                            </div>
                        </div>
                        <div class="flex flex-col gap-[1.25rem] mob:gap-[0.5rem]">
                            <h3 class="font-openSans font-[600] text-[1.25rem] leading-[1.56rem] text-textCol">Search by name:</h3>
                            <div class="py-4 px-6 rounded-[200px] !border !border-textCol ">
                                <input type="text" class="bg-inherit !text-textCol font-Raleway text-[1rem] leading-[1rem] focus:outline-none cursor-pointer" placeholder="Enter product name" v-model="productName"
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="isLoading" class="w-full h-full">
                <loader />
            </div>
            <div v-else>
                <div v-if="activeCategory === 'All'">
                    <div v-if="filteredProducts?.length < 1" class="w-full h-full min-h-[100vh]">
                        <h3 class="text-[1.5rem] font-[600] font-Raleway">No result for this search parameter</h3>
                    </div>
                    <div class="grid grid-cols-customGrid2 gap-4" v-else>
                        <article 
                            class="flex flex-col gap-[1.25rem] cursor-pointer hover:scale-105 transitionItem rounded-lg p-4 relative"
                            v-for="(product, index) in filteredProducts"
                            :key="index"
                            :id="product?.id"
                            :class="[
                            products?.products?.length < 2 ? 'max-w-[22rem]' : '',
                            product?.stock < 1 ? 'pointer-events-none opacity-50 cursor-not-allowed' : ''
                            ]"
                            @click="routeToProductDetails(product?.id)"
                        >
                            <!-- Overlay for Out of Stock -->
                            <div 
                                class="overlay bg-transparent absolute top-0 left-0 w-full h-full backdrop-blur-[4px] pointer-events-all text-center cursor-not-allowed" 
                                v-if="product?.stock < 1"
                            >
                                <div class="grid place-items-center w-full h-full">
                                    <h3 class="text-[red] font-Raleway font-[600] capitalize bg-white p-4">
                                        Item sold out
                                    </h3>
                                </div>
                            </div>

                            <!-- Product Image -->
                            <div class="flex-1 min-h-[250px]">
                                <img 
                                    :src="product?.images[0]" 
                                    alt="Product Image" 
                                    class="w-full h-full object-cover rounded-lg mb-4"
                                />
                            </div>

                            <!-- Product Details -->
                            <div class="text-center">
                                <h3 class="font-Raleway font-[700] text-[0.875rem] leading-[1.05rem] text-textCol">
                                    {{ product?.name }}
                                </h3>
                                <div class="items-end font-openSans font-[400] text-textCol mt-[0.2rem]">
                                    <span 
                                        class="old_price text-[0.75rem] line-through mr-[0.5rem] leading-[0.9rem]" 
                                        v-if="product?.discountPrice"
                                    >
                                        {{ getCurrencySymbol(product?.currency) }}{{ product?.discountPrice }}
                                    </span>
                                    <span class="current_price text-[1rem] leading-[1.2rem]">
                                        {{ getCurrencySymbol(product?.currency) }}{{ product?.price?.toLocaleString() }}
                                    </span>
                                </div>
                            </div>
                        </article>

                    </div>

                </div>
                <div v-else>
                    <div v-if="paginatedProducts?.length < 1" class="w-full h-full min-h-[100vh]">
                        <h3 class="text-[1.5rem] font-[600] font-Raleway">No result for this search parameter</h3>
                    </div>
                    <div v-else class="grid grid-cols-customGrid2 gap-4">
                        <article 
                            class="flex flex-col gap-[1.25rem] cursor-pointer hover:scale-105 transitionItem rounded-lg p-4"
                            v-for="(product, index) in paginatedProducts"
                            :key="product?.id"
                            :id="product?.id"
                            :class="paginatedProducts?.length < 2? 'max-w-[22rem]': ''"
                            @click="routeToProductDetails(product?.id)"
                        >
                            <div class="overlay bg-transparent absolute top-0 left-0 w-full h-full backdrop-blur-[4px] cursor-not-allowed text-center" v-if="product?.stock < 1">
                                <div class="grid place-items-center w-full h-full">
                                    <h3 class="text-[red] font-Raleway font-[600] capitalize bg-white p-4">Item sold out</h3>
                                </div>
                            </div>
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
               
                <div class="pagination flex items-center justify-center gap-[1.5rem] mb-[5.3rem] mt-[6rem]">
                    <div class="flex gap-[1.5rem] items-center" v-if="activeCategory === 'All'">
                        <button
                        class="font-openSans font-[400] text-[1rem] leading-[1.2rem] text-textCol p-[0.5rem] rounded-full"
                        @click="setPage(page)"
                        v-for="page in totalPages"
                        :key="page"
                        :class="page === currentPage ? 'text-white bg-textCol': ''"
                        >{{ page }}</button>
                    </div>
                    <div class="flex gap-[1.5rem] items-center" v-else>
                        <button
                        class="font-openSans font-[400] text-[1rem] leading-[1.2rem] text-textCol p-[0.5rem] rounded-full"
                        @click="setPage(page)"
                        v-for="page in totalPagesByCategory"
                        :key="page"
                        :class="page === currentPage ? 'text-white bg-textCol': ''"
                        >{{ page }}</button>
                    </div>
                    <PaginationArrowIcon class="cursor-pointer" @click="setPage(currentPage + 1)" v-if="activeCategory === 'All' && currentPage < totalPages"/>
                    <PaginationArrowIcon class="cursor-pointer" @click="setPage(currentPage + 1)" v-if="activeCategory !== 'All' && currentPage < totalPagesByCategory"/>
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
  import FilterIcon from '@/components/icons/FilterIcon.vue';
  
  const adminStore = useAdminStore()
  const { products, categories, currentCurrency, filteredProduct } = storeToRefs(adminStore)
  const router = useRouter()
  const route = useRoute()
  const isLoading = ref(false)
  const currentPage = ref(1)
  const activeCategory = ref('All')
  const activeSlug = ref('')
  const sortOption = ref('');
  const filtered = ref([])
  const categoryFiltered = ref([])
  const showFilter = ref(false)
  const productName = ref('')
  
  const handleGetProducts = async ()=>{
    isLoading.value = true
    try {
        await adminStore.handleGetProducts(currentPage.value, currentCurrency.value)
        if(activeCategory.value !== "All"){
            await adminStore.handleProductByCategory(activeCategory.value, currentCurrency.value)
        }
        await adminStore.handleGetCategories()
        isLoading.value = false
    } catch (error) {
        console.log(error)
        isLoading.value = false
    }
  }

  const toggleShowFilter = ()=>{
        showFilter.value = !showFilter.value
   }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,        // Scroll to the top of the page
            behavior: 'smooth', // Smooth scrolling animation
        });
    };
  
  const setActiveCategory = async (slug) => {
    isLoading.value = true
    activeCategory.value = slug;
    activeSlug.value = slug
    currentPage.value = 1
    try {
        if(activeCategory.value?.length > 0){
            if(activeCategory.value === "All"){
                filteredProductByCategory.value = products.value?.products;
            } else {
                await adminStore.handleProductByCategory(slug)
                categoryFiltered.value = filteredProduct.value?.products
            }
        }
        isLoading.value = false
    } catch (error) {
        console.log(error)
        isLoading.value = false
    }
  };

  const filteredProductByCategory = computed(()=>{
      if(activeCategory.value === "All"){
       return
      }
   
       categoryFiltered.value = filteredProduct.value?.products

       if(productName.value){
            categoryFiltered.value = categoryFiltered.value?.filter((item)=>{
                const itemName = item?.name?.toLowerCase().trim();
                const inputName = productName.value?.toLowerCase().trim()
                if(itemName.includes(inputName)){
                    return item
                }
            })
        }
   
       if (sortOption.value === 'Price: Low to High') {
           categoryFiltered.value = categoryFiltered.value?.sort((a, b) => a.price - b.price);
       } else if (sortOption.value === 'Price: High to Low') {
           categoryFiltered.value = categoryFiltered.value?.sort((a, b) => b.price - a.price);
       } else if (sortOption.value === 'Alphabetically: A-Z') {
           categoryFiltered.value = categoryFiltered.value?.sort((a, b) => a.name.localeCompare(b.name));
       } else if (sortOption.value === 'Alphabetically: Z-A') {
           categoryFiltered.value = categoryFiltered.value?.sort((a, b) => b.name.localeCompare(a.name));
       }

       return categoryFiltered.value
  })
  
  const filteredProducts = computed(()=>{
    filtered.value = products.value?.products
  
     // Apply sorting options

     if(productName.value){
        filtered.value = filtered.value?.filter((item)=>{
            const itemName = item?.name?.toLowerCase().trim();
            const inputName = productName.value?.toLowerCase().trim()
            if(itemName.includes(inputName)){
                return item
            }
        })
     }
     
    if (sortOption.value === 'Price: Low to High') {
        filtered.value = filtered.value?.sort((a, b) => a.price - b.price);
    } else if (sortOption.value === 'Price: High to Low') {
        filtered.value = filtered.value?.sort((a, b) => b.price - a.price);
    } else if (sortOption.value === 'Alphabetically: A-Z') {
        filtered.value = filtered.value?.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption.value === 'Alphabetically: Z-A') {
        filtered.value = filtered.value?.sort((a, b) => b.name.localeCompare(a.name));
    }
    return filtered.value
  })
  
  const routeToProductDetails = (slug)=>{
    router.push({ name: 'product_detail', params: { slug}})
  }
  
  const querySearch = ()=>{
    if(route.query.category && route.query.category.length > 0){
        activeCategory.value = route.query.category
        setActiveCategory(activeCategory.value)
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
  
  const paginatedProducts = computed(() => {
    const perPage = 20
    const start = (currentPage.value - 1) * perPage;
    const end = start + perPage;
    return filteredProductByCategory.value?.slice(start, end) || [];
  });
  
  
  const totalPages = computed(()=>products.value?.totalPages)
  const totalPagesByCategory = computed(() => {
    if (Array.isArray(filteredProductByCategory.value)) {
        return Math.ceil(filteredProductByCategory.value?.length / 20);
    }
    return 1;
  });
  
  const setPage = async (page) => {
        if (page < 1 || page > totalPages.value) return;
        currentPage.value = page;
        scrollToTop();

        if (activeCategory.value === "All") {
            await handleGetProducts(currentPage.value, currentCurrency.value);
        } else {
            isLoading.value = true;
            const perPage = 20;
            const start = (currentPage.value - 1) * perPage;
            const end = start + perPage;

            setTimeout(() => {
                const paginatedData = filteredProductByCategory.value?.slice(start, end);
            }, 5000);
            isLoading.value = false;
        }
    };

  
  watch(currentCurrency, async (newCurrency) => {
    await adminStore.updateCurrency(newCurrency);
    await handleGetProducts(currentPage.value, currentCurrency.value);
  });
  
  onMounted(async()=>{
      scrollToTop()
    querySearch()
    await adminStore.getCurrency()
    await adminStore.updateCurrency(currentCurrency.value)
    await handleGetProducts()
    // await setActiveCategory(activeCategory.value)
  })
  </script>
  
  <style lang="scss" scoped>
  
  </style>