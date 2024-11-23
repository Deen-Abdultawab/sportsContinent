<template>
    <Navbar />
    <Loader v-if="isLoading"/>
    <section class="w-[78.33%] mob2:w-[90%] mx-auto mt-[5.13rem]" v-else>    
      <div class="flex gap-[1.5rem] tab2:flex-col">
        <div class="w-[50%] tab2:w-full">
          <div class="main_image w-full rounded-[20px] mb-[1.5rem] overflow-hidden transitionItem min-h-[15rem] h-[34rem]">
            <img :src="mainUrl" alt="" class="w-full h-full object-contain block" ref="mainImg">
          </div>
          <div class="thumbnails flex gap-6">
            <article 
              class="rounded-[6px] overflow-hidden hover:scale-105 transitionItem w-[10rem] h-[10rem] cursor-pointer"
              v-for="(item, index) in singleProduct?.images?.slice(1,4)"
              :key="item"
              @click="setUrl(item)"
            >
              <img :src="item" alt="" class="w-full h-full object-contain">
            </article>
          </div>
        </div>
        <div class="product_info w-[50%] tab2:w-full flex flex-col gap-[2rem] pt-12">
          <h1 class="product_name font-Raleway font-[700] text-textCol text-[2.5rem] leading-[3rem] mob:text-[2rem] mob:leading-[2rem]">
            {{ singleProduct?.name}}
          </h1>
          <p class="font-openSans font-[400] text-[1.2rem] leading-[1.2rem]">
            {{ singleProduct?.description }}
          </p>
          <p class="font-openSans font-[400] text-[2.2rem] leading-[3.6rem] mob:text-[2rem] mob:leading-[2.6rem]">
            {{ getCurrencySymbol(singleProduct?.currency) }} {{ singleProduct?.price?.toLocaleString() }}
          </p>
          <div class="flex gap-[0.5rem]">
            <Counter col="black" class="w-[20%]" @update:initValue="handleUpdatedValue"/>
            <div class="py-4 px-6 rounded-[200px] !border !border-textCol">
              <select 
              name="size" id="size" 
              class="bg-none text-textCol font-openSans font-[600] text-[1.2rem] leading-[1rem] focus:outline-none cursor-pointer"
              v-model="selectedSize"
              >
                  <option 
                  value="default" 
                  class="text-textCol"
                  disabled
                  >Select a size</option>
                  <option
                  v-for="item in singleProduct?.sizes"
                  :value="item" 
                  class="text-textCol">{{ item }}</option>
                </select>
            </div>
          </div>
          <button 
          class="primary_btn w-full rounded-[2000px] bg-primaryBG font-[500] font-openSans text-white text-[1.2rem] leading-[1.8rem] uppercase py-[1.2rem] mob:text-[1rem]"
          @click="handleAddToCart(singleProduct?.id)"
          >
            <shortLoader v-if="isCartLoading"/>
            <span v-else>add to bag</span>
          </button>
        </div>
      </div>
      <div class="mt-[4.5rem]">
        <h3 class="mb-[2rem] font-Raleway font-[700] text-[2.5rem] leading-[3rem]">You may also like</h3>
        
        <div class="w-full h-full grid place-items-center" v-if="isLoading">
          <loader />
        </div>
        <div class="featured_products_container grid grid-cols-customGrid2 gap-[1.5rem] tab:grid-cols-customGrid3 mb-[10rem]" v-else>
          <ProductCard 
          v-for="(item, index) in featuredProducts.slice(0,3)"
          :key="item.id"
          :product="item"
          @click="routeToProductDetails(item?.id)"
          />
        </div>
      </div>
    </section>
    <Footer />
  </template>
  
  <script setup>
  import Navbar from '@/components/Navbar.vue';
  import Footer from '@/components/Footer.vue';
  import { ref, computed, onMounted, onUnmounted, watch } from "vue";
  import ProductCard from '@/components/ui/ProductCard.vue';
  import Counter from '@/components/Counter.vue';
  import { storeToRefs } from "pinia";
  import { useCurrencyStore } from '@/stores/currency';
  import { useProductsStore } from "@/stores/products";
  import { useRoute, useRouter } from 'vue-router';
  import shortLoader from "@/components/Loader/WhiteLoader.vue"
  import Loader from "@/components/Loader/Loader.vue";
  import { useCartStore } from "@/stores/cart";
  import { userStore } from "@/stores/user";
  import { useToast } from "vue-toastification";
  import { useAdminStore } from '@/stores/admin';


  const adminStore = useAdminStore()
  const cartStore = useCartStore()
  const {cartCount, updateCartCount, cartItems} = storeToRefs(cartStore)
  const { singleProduct, featuredProducts, currentCurrency } = storeToRefs(adminStore)
  const toast = useToast();
  const selectedSize = ref("default")
  const quantity = ref(1)
  const store = userStore()
  const { user } = storeToRefs(store)
  const route = useRoute();
  const router = useRouter()
  const mainUrl = ref('');
  const clickedUrl = ref();
  const isLoading = ref(false)
  const isFeaturedLoading = ref(false)
  const isCartLoading = ref(false)

  const getCurrencySymbol = (currencyCode) => {
      switch (currencyCode) {
         case 'USD':
            return '$';
         case 'GBP':
            return '£';
         case 'NGN':
            return '₦';
         default:
            return '';
      }
   };

  const handleGetSingleProduct = async(slug)=>{
      isLoading.value = true
      try {
          await adminStore.handleGetSingleProduct(slug, currentCurrency.value)
          isLoading.value = false
      } catch (error) {
          console.log(error)
          isLoading.value = false
      }
  }

  const handleGetFeaturedProducts = async ()=>{
    isFeaturedLoading.value = true
    try {
      await adminStore.handleGetProducts(1, currentCurrency.value)
      await adminStore.getFeaturedProducts()
      isFeaturedLoading.value = false
    } catch (error) {
      console.log(error)
      isFeaturedLoading.value = false
    }
  }

  const addToCart = async (payload)=>{
    isCartLoading.value = true
    try {
      let res = await cartStore.handleAddItemToCart(payload)
      await cartStore.handleGetCart()
      await cartStore.updateCartCount()
      isCartLoading.value = false
      return res
    } catch (error) {
      console.log(error)
      isCartLoading.value = false
    }
  }

  const handleAddToCart = async(slug)=>{
    await store.getUser()
    if(user.value){
      if(selectedSize.value !== "default" && quantity.value > 0){
        let payload = {
          "productId":slug,
          "quantity": quantity.value,
          "size": selectedSize.value
        }
        let res = await addToCart(payload)
        await cartStore.handleGetCart()
        await cartStore.updateCartCount()
        if(res.statusText == "OK"){
          toast.success("item added to cart successfully", {
            timeout: 4000,
          });
        }
      } else {
        toast.error("select item size or input a valid number", {
          timeout: 4000,
        });
      }
    } else {
      router.push({ name: 'signin'})
    }
  }

  const routeToProductDetails = async (slug)=>{
    isFeaturedLoading.value = true
      try {
      await handleGetSingleProduct(slug, currentCurrency.value)
      setUrl(singleProduct.value.images[0])
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      isFeaturedLoading.value = false
    } catch (error) {
      console.log(error);
      isFeaturedLoading.value = false
    }
  }

   // Set the main image URL
   const setUrl = (item) => {
    mainUrl.value = item;
  };

  const scrollToTop = () => {
      window.scrollTo({
          top: 0,        // Scroll to the top of the page
          behavior: 'smooth', // Smooth scrolling animation
      });
  };

  const handleUpdatedValue = (newValue) => {
    quantity.value = newValue
  };

  watch(currentCurrency, async (newCurrency) => {
    await adminStore.updateCurrency(newCurrency);
    await handleGetSingleProduct(route.params.slug, currentCurrency.value)
  });

  onMounted(async()=>{
    scrollToTop()
      await adminStore.getCurrency()
      await adminStore.updateCurrency(currentCurrency.value)
      await handleGetSingleProduct(route.params.slug, currentCurrency.value)
      setUrl(singleProduct.value.images[0])
      await handleGetFeaturedProducts()
  })
  
 
  </script>
  
  <style scoped>
  svg {
    color: black;
  }
  </style>
  