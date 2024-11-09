<template>
    <section class="home_view">
      <header class="h-[calc(100vh-78.91px)] w-full relative background">
        <video src="../assets/videos/intro.mp4" autoplay muted loop class="h-full w-full object-cover mob:object-fill"></video>
        <div class="pt-[10rem] pl-[9.75rem] w-[50.08%] tab2:w-[90%] tab2:pl-[2rem] absolute top-0 animate__animated animate__fadeInLeft animate__slow">
          <h1 class="font-Raleway font-[700] text-[#FFFFFF] text-[3rem] leading-[3.6rem]">Shop easy, Ball hard</h1>
          <p class="font-openSans font-[400] text-[1rem] leading-[1.2rem] text-[#FFFFFF] w-[82%] my-[1.5rem]">Experience the best in sports fashion with SportsContinent. Shop our exclusive range of jerseys, tracksuits, polos, and sport caps. Every piece tells a story.</p>
          <router-link :to="{name: 'products'}">
            <button class="bg-[#007646] py-[0.75rem] px-[1rem] rounded-[12.5rem] font-openSans text-[1rem] font-[400] leading-[1.2rem] text-[#FFFFFF] border-0">Shop Now</button>
          </router-link>
        </div>
        <a href="https://wa.me/1234567890" target="_blank" class="">
          <img src="../assets/images/whatsapp_logo.png" alt="" class="absolute bottom-[3.75rem] right-[9.75rem] cursor-pointer hover:scale-105 transitionItem tab2:right-[2rem] animate__animated animate__fadeInRight animate__slow">
        </a>
      </header>
      <main class="py-[2.5rem] tab:w-[90%] mx-auto">
        <div class="pl-[9.75rem] tab:pl-0">
          <h3 class="font-Raleway font-[700] text-textCol text-[3rem] leading-[3.6rem] mb-[2.5rem] mob2:text-[2.5rem]">Our Collections</h3>
          <div class="collection_slide_container flex overflow-x-auto gap-[1.5rem] no-scrollbar">
            <article 
            class="shrink-0 flex flex-col gap-[1.25rem] cursor-pointer"
            v-for="item in collections"
            :key="item.id"
            >
              <div class="rounded-[0.75rem] overflow-hidden">
                <img :src="getImgUrl(item.src)" :alt="item.title">
              </div>
              <div class="flex items-center justify-between">
                <h3 class="font-Raleway font-[700] text-[2rem] leading-[2.4rem] capitalize">{{ item.title }}</h3>
                <RightArrowIcon />
              </div>
            </article>
          </div>
        </div>
        <div class="featured_products mt-[12.31rem] tab:mt-[6rem] w-[78%] mx-auto tab:w-full">
          <h3 class="font-Raleway font-[700] text-textCol text-[3rem] leading-[3.6rem] mb-[2rem] mob2:text-[2.5rem]">Featured Products</h3>
          <div class="featured_products_container grid grid-cols-customGrid2 gap-[1.5rem] tab:grid-cols-customGrid3">
            <ProductCard 
            v-for="(item, index) in featuredProducts"
            :key="item.id"
            :product="item"
            @click="routeToProductDetails(item.id)"
            />
          </div>
        </div>
      </main>
    </section>
  </template>
  
  <script setup>
  import mainbg from "@/assets/images/header_img.png"
  import RightArrowIcon from "@/components/icons/RightArrowIcon.vue";
  import ProductCard from "@/components/ProductCard.vue";
  const image = mainbg
  import { storeToRefs } from "pinia";
  import { useProductsStore } from "@/stores/products"
  import { onMounted } from "vue";
  import { useRouter } from "vue-router";
  import 'animate.css'
  
  const productStore = useProductsStore()
  const { allProducts, featuredProducts } = storeToRefs(productStore)
  const router = useRouter()
  
  const getAllProducts = async ()=>{
      try {
          await productStore.handleAllProducts()
          productStore.getFeaturedProducts()
          console.log(featuredProducts.value)
      } catch (error) {
          console.log(error)
      }
  }
  
  const routeToProductDetails = (id)=>{
      router.push({ name: 'product_detail', params: { slug: id}})
  }
  
  onMounted(async () => {
      getAllProducts()
  })
  
  const collections = [
    {
      id: 1,
      src: 'col1.png',
      title: 'Football Jerseys'
    },
    {
      id: 2,
      src: 'col2.png',
      title: 'Basketball Combo'
    },
    {
      id: 3,
      src: 'col3.png',
      title: 'Slides'
    },
    {
      id: 5,
      src: 'col5.png',
      title: 'Roundnecks'
    },
    {
      id: 6,
      src: 'col6.png',
      title: 'Tracksuits'
    },
    {
      id: 7,
      src: 'col7.png',
      title: 'Tracksuits'
    },
    {
      id: 9,
      src: 'col9.png',
      title: 'Shorts'
    },
    {
      id: 10,
      src: 'col10.png',
      title: 'Baseball Jerseys'
    },
    {
      id: 11,
      src: 'col11.png',
      title: 'joggers'
    },
  ]
  
  
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