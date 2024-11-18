<template>
  <Navbar />
  <section class="home_view">
    <header class="min-h-[630px] w-full relative background">
      <video src="https://res.cloudinary.com/dfnecyrhc/video/upload/v1731546288/Sports%20Continent/ntdsnoue2wlme5rclrdf.mp4" autoplay muted loop playsinline class="h-full w-full object-cover mob:object-cover absolute z-[-1]"></video>
      <!-- <video src="https://res.cloudinary.com/dfnecyrhc/video/upload/v1731546288/Sports%20Continent/ntdsnoue2wlme5rclrdf.mp4" autoplay muted loop playsinline class="h-full w-full object-cover mob:object-cover absolute z-[-1]" poster="../assets/images/header_img.png"></video> -->
      <div class="pt-[10rem] pl-[9.75rem] w-[50.08%] tab2:w-[90%] tab2:pl-[2rem]">
        <div class="animate__animated animate__fadeInLeft animate__slow">
          <h1 class="font-Raleway font-[700] text-[#FFFFFF] text-[3rem] leading-[3.6rem]">Shop easy, Ball hard</h1>
          <p class="font-openSans font-[400] text-[1rem] leading-[1.2rem] text-[#FFFFFF] w-[82%] my-[1.5rem]">Experience the best in sports fashion with SportsContinent. Shop our exclusive range of jerseys, tracksuits, polos, and sport caps. Every piece tells a story.</p>
          <router-link :to="{name: 'allProducts'}">
            <button class="bg-[#007646] py-[0.75rem] px-[1.5rem] rounded-[12.5rem] font-openSans text-[1.2rem] font-[400] leading-[1.2rem] mob:py-[0.9rem] mob:w-[50%] text-[#FFFFFF] border-0">Shop Now</button>
          </router-link>
        </div>
        <a href="https://wa.me/+2348138726068" target="_blank">
          <img src="../assets/images/whatsapp_logo.png" alt="" class="fixed mob:top-[50rem] bottom-[3.75rem] right-[9.75rem] cursor-pointer hover:scale-105 transitionItem tab2:right-[2rem]">
        </a>
      </div>
    </header>
    <main class="py-[2.5rem] tab:w-[90%] mx-auto">
      <div class="pl-[9.75rem] tab:pl-0">
        <h3 class="font-Raleway font-[700] text-textCol text-[3rem] leading-[3.6rem] mb-[2.5rem] mob2:text-[2.5rem]">Our Collections</h3>
        <div class="w-full h-full grid place-items-center" v-if="isLoadingCategory">
          <loader />
        </div>
        <div class="collection_slide_container flex overflow-x-auto gap-[1.5rem] no-scrollbar" v-else>
          <article 
          class="flex flex-col gap-[1.25rem] cursor-pointer mob:basis-[70%] pr-8"
          v-for="item in categories?.category"
          :key="item.id"
          @click="routeToProductSearch(item?.name)"
          >
            <div class="rounded-[0.75rem] overflow-hidden min-w-[20rem] min-h-[20rem] max-h-[20rem] border border-textCol">
              <img :src="item?.image" :alt="item?.name">
            </div>
            <div class="flex items-center justify-between">
              <h3 class="font-Raleway font-[700] text-[2rem] leading-[2.4rem] capitalize">{{ item?.name }}</h3>
              <RightArrowIcon />
            </div>
          </article>
        </div>
      </div>
      <div class="featured_products mt-[10rem] tab:mt-[6rem] w-[78%] mx-auto tab:w-full">
        <h3 class="font-Raleway font-[700] text-textCol text-[3rem] leading-[3.6rem] mb-[2rem] mob2:text-[2.5rem]">Featured Products</h3>
        <div class="w-full h-full grid place-items-center" v-if="isLoading">
          <loader />
        </div>
        <div class="featured_products_container flex gap-[1.5rem] flex-wrap justify-center" v-else>
          <ProductCard 
          v-for="(item, index) in featuredProducts?.slice(0,3)"
          :key="item.id"
          :product="item"
          @click="routeToProductDetails(item?.id)"
          class="max-w-[20rem]"
          />
        </div>
      </div>
    </main>
  </section>
  <Footer />
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import mainbg from "@/assets/images/header_img.png"
import RightArrowIcon from "@/components/icons/RightArrowIcon.vue";
import ProductCard from "@/components/ui/ProductCard.vue";
const image = mainbg
import { useAdminStore } from '@/stores/admin';
import { storeToRefs } from "pinia";
import { useProductsStore } from "@/stores/products"
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { ref, watch } from "vue"
import loader from "@/components/Loader/Loader.vue"

const adminStore = useAdminStore()
const { featuredProducts, currentCurrency, categories } = storeToRefs(adminStore)
const router = useRouter()
const isLoading = ref(false)
const isLoadingCategory = ref(false)

const handleGetFeaturedProducts = async ()=>{
  isLoading.value = true
  try {
    await adminStore.handleGetProducts(1, currentCurrency.value)
    await adminStore.getFeaturedProducts()
    isLoading.value = false
  } catch (error) {
    console.log(error)
    isLoading.value = false
  }
}

const handleGetCategories = async ()=>{
  isLoadingCategory.value = true
  try {
    await adminStore.handleGetCategories()
    isLoadingCategory.value = false
  } catch (error) {
    console.log(error)
    isLoadingCategory.value = false
  } 
}

watch(currentCurrency, async (newCurrency) => {
  await adminStore.updateCurrency(newCurrency);
  await handleGetFeaturedProducts();
});

const routeToProductDetails = (slug)=>{
  console.log(slug)
    router.push({ name: 'product_detail', params: { slug}})
}

const routeToProductSearch = (slug)=>{
  console.log(slug)
  router.push({
    name: "allProducts",
    query: {
      category: slug
    }
  })
}

onMounted(async () => {
  await adminStore.getCurrency()
  await adminStore.updateCurrency(currentCurrency.value)
  await handleGetCategories()
  await handleGetFeaturedProducts()
})


const getImgUrl = (path) => {
    return new URL(`../../public/${path}`, import.meta.url).href;
  };

</script>

<style scoped>
.background {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

</style>