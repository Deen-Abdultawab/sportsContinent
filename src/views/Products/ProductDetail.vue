<template>
    <Navbar />
    <Loader v-if="loadingSingle"/>
    <section class="w-[78.33%] mob2:w-[90%] mx-auto mt-[5.13rem]" v-else>
      <!-- {{ variant.id }} -->
      
      <div class="flex gap-[1.5rem] tab2:flex-col">
        <div class="w-[50%] tab2:w-full">
          <div class="main_image w-full rounded-[20px] mb-[1.5rem] overflow-hidden transitionItem">
            <img :src="mainUrl" alt="" class="w-full h-full" ref="mainImg">
          </div>
          <div class="thumbnails flex gap-6">
            <article 
              class="rounded-[6px] overflow-hidden hover:scale-105 transitionItem"
              v-for="(item, index) in singleProduct?.product?.images?.slice(0, 3)"
              :key="item.id"
              @click="setUrl(item.url)"
            >
              <img :src="item?.url" alt="" class="w-full h-full object-contain">
            </article>
          </div>
        </div>
        <div class="product_info w-[50%] tab2:w-full flex flex-col gap-[2rem]">
          <h1 class="product_name font-Raleway font-[700] text-textCol text-[2.5rem] leading-[3rem] mob:text-[2rem] mob:leading-[2rem]">
            {{ singleProduct?.product?.title }}
          </h1>
          <p class="font-openSans font-[400] text-[1rem] leading-[1.2rem]">
            {{ singleProduct?.product?.description }}
          </p>
          <p class="font-openSans font-[400] text-[2.5rem] leading-[3.6rem] mob:text-[2rem] mob:leading-[2.6rem]">
            {{ currencyState.symbol }} {{ productPrice }}
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
                  v-for="item in productSize"
                  :value="item.value" 
                  class="text-textCol">{{ item.value }}</option>
                </select>
            </div>
          </div>
          <button 
          class="primary_btn w-full rounded-[2000px] bg-primaryBG font-[500] font-openSans text-white text-[1.5rem] leading-[1.8rem] uppercase py-[1.5rem] mob:text-[1rem]"
          @click="handleAddToCart"
          >
            add to bag
          </button>
        </div>
      </div>
      <div class="mt-[4.5rem]">
        <h3 class="mb-[2rem] font-Raleway font-[700] text-[2.5rem] leading-[3rem]">You may also like</h3>
        <div class="featured_products_container grid grid-cols-customGrid2 gap-[1.5rem] mb-[4.44rem] tab:grid-cols-customGrid3">
          <ProductCard 
            v-for="item in featuredProducts"
            :key="item.id"
            :product="item"
            @click="handleProductDetail(item.id)"
          />
        </div>
      </div>
    </section>
    <Footer />
  </template>
  
  <script setup>
  import Navbar from '@/components/Navbar.vue';
  import Footer from '@/components/Footer.vue';
  import { ref, computed, onMounted, onUnmounted } from "vue";
  import ProductCard from '@/components/ProductCard.vue';
  import Counter from '@/components/Counter.vue';
  import { storeToRefs } from "pinia";
  import { useCurrencyStore } from '@/stores/currency';
  import { useProductsStore } from "@/stores/products";
  import { useRoute, useRouter } from 'vue-router';
  import Loader from "@/components/Loader/Loader.vue";
  import { useCartStore } from "@/stores/cart";
  import { userStore } from "@/stores/user";
  import Medusa from '@medusajs/medusa-js';
  import { useToast } from "vue-toastification";


  const toast = useToast();
  const selectedSize = ref("default")
  const quantity = ref(1)
  const store = userStore()
  const cartStore = useCartStore()
  const currencyStore = useCurrencyStore()
  const { currencyState, updateCurrencyState } = currencyStore.useCurrency();
  const productStore = useProductsStore();
  const { allProducts, singleProduct } = storeToRefs(productStore);
  const { cartID, cartCount } = storeToRefs(cartStore)
  const { user } = storeToRefs(store)
  const route = useRoute();
  const router = useRouter()
  const mainUrl = ref('');
  const clickedUrl = ref();
  const loadingSingle = ref(false);
  const currencyValue = ref('NGN'); // Default to NGN
  const currencySymbol = ref('₦'); // Default to ₦
  const medusa_url = import.meta.env.VITE_BACKEND_BASEURL
  const medusa = new Medusa({ 
    baseUrl: medusa_url, 
    maxRetries: 3 
  })
  
  // Fetch single product details
  const getSingleProduct = async () => {
    loadingSingle.value = true;
    try {
      await productStore.handleSingleProduct(route.params.slug);
      mainUrl.value = singleProduct.value?.product?.thumbnail;
      loadingSingle.value = false;
    } catch (error) {
      console.log(error);
      loadingSingle.value = false;
    }
  };
  
  // Fetch all products
  const getAllProducts = async () => {
    try {
      await productStore.handleAllProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdatedValue = (newValue) => {
    quantity.value = newValue
  };
  
  // Handle product detail view
  const handleProductDetail = async (id) => {
    try {
      await productStore.handleSingleProduct(id);
      mainUrl.value = singleProduct.value?.product?.thumbnail;
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  // Get featured products
  const featuredProducts = computed(() => {
    return allProducts.value?.products?.splice(0, 3);
  });

  const productPrice = computed(() => {
    const prices = singleProduct.value?.product?.variants[0]?.prices;
    if (!prices) return undefined; 
    
    const matchingPrice = prices.find(price => price?.currency_code === currencyState.value?.toLowerCase());
    
    return matchingPrice ? matchingPrice.amount : undefined;
  });

  const variant = computed(()=>{
    return singleProduct.value?.product?.variants[0]
  })

  const productSize = computed(() => {
    return singleProduct.value?.product?.options[0].values || [];
  });
  
  // Set the main image URL
  const setUrl = (item) => {
    mainUrl.value = item;
  };
  
  // Update currency values
  const updateCurrencyValue = () => {
    const storedCurrency = localStorage.getItem('currency');
    if (storedCurrency) {
      currencyValue.value = storedCurrency;
    } else {
      currencyValue.value = 'NGN'; // Fallback to NGN if no value is found
    }
  
    switch (currencyValue.value) {
      case 'USD':
        currencySymbol.value = '$';
        break;
      case 'GBP':
        currencySymbol.value = '£';
        break;
      case 'NGN':
      default:
        currencySymbol.value = '₦';
    }
  };
  
  // Handle storage changes
  const handleStorageChange = (event) => {
    if (event.storageArea === localStorage && event.key === 'currency') {
      updateCurrencyValue();
    }
  };

  const handleAddToCart = async ()=>{
    if(user.value.id !== "null"){
      if(selectedSize.value !== "default" && quantity.value > 0){
        let cartItems = await cartStore.getCart(user.value?.metadata?.cart_id)
        const itemSize = cartItems.cart.items.find(item=> {
          if(item?.metadata?.size === selectedSize.value && item.variant_id === variant.value.id){
            return item
          }
        })
        if(itemSize){
          let res = await medusa.carts.lineItems.update(user.value?.metadata?.cart_id, itemSize.id, {
            quantity: itemSize.quantity + quantity.value,
          })
          if(res.response.statusText === "OK"){
            await cartStore.getCart(user.value?.metadata?.cart_id)
            cartStore.updateCartCount() 
            console.log(cartCount)
            toast.success("item sucessfully added to cart", {
              timeout: 4000,
            });
          }
        } else {
          let res = await medusa.carts.lineItems.create(user.value?.metadata?.cart_id, {
            variant_id: variant.value.id,
            quantity: quantity.value,
            metadata: {
              size: selectedSize.value
            }
          })
          if(res.response.statusText === "OK"){
            await cartStore.getCart(user.value?.metadata?.cart_id)
            cartStore.updateCartCount() 
            console.log(cartCount)
            toast.success("item sucessfully added to cart", {
              timeout: 4000,
            });
          }
        }
      } else {
        toast.error("select item size or input a valid number", {
          timeout: 4000,
        });
      }
    } else {
      router.push({ name: 'login'})
    }
  }
  
  // Handle currency change selection
  const handleCurrencyChange = (event) => {
    const newCurrency = event.target.value;
    updateCurrencyState(newCurrency);
    localStorage.setItem('currency', newCurrency);
  };
  
  // Initialize component
  onMounted(async() => {
    getAllProducts();
    getSingleProduct();
    updateCurrencyValue();
    store.getUser();
    window.addEventListener('storage', handleStorageChange);

    if(user.value?.id !== "null"){
      if(user.value?.metadata?.cart_id === "null"){
        console.log('creating cart')
        let res = await medusa.carts.create()
        if(res.response.statusText === "OK"){
          console.log('cart created successfully')
          let update = await medusa.customers.update({
              metadata: {
                cart_id: res?.cart.id || "null"
              }
            })
            const updatedCustomer = update.customer
            console.log(updatedCustomer)
            store.saveUser(updatedCustomer)
            const updateCart = await medusa.carts.update(user.value?.metadata?.cart_id, {
              customer_id: user.value.id
            })

          console.log(updateCart)
        }
      } else {
        console.log('finding cart...')
        let res = await cartStore.getCart(user.value?.metadata?.cart_id)
        if(res.response.statusText === "OK"){
          console.log('cart found')
        } else {
          console.log('error finding cart')
        }
      }
    }
  });
  
  // Cleanup on component unmount
  onUnmounted(() => {
    window.removeEventListener('storage', handleStorageChange);
  });
  </script>
  
  <style scoped>
  svg {
    color: black;
  }
  </style>
  