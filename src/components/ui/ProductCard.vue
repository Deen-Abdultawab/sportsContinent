<template>
  {{ props.product }}
    <article 
          class="shrink-0 flex flex-col gap-[1.25rem] cursor-pointer hover:scale-105 transitionItem"
          >
            <div class="rounded-[0.75rem] overflow-hidden h-full w-full">
              <img :src="props?.product?.thumbnail" alt="" class="object-contain h-full w-full">
            </div>
            <div class="">
             <h3 class="font-Raleway font-[700] text-[0.875rem] leading-[1.05rem] text-textCol">{{ props?.product?.name }}</h3>
             <div class=" items-end font-openSans font-[400] text-textCol mt-[0.2rem]">
              <span class="old_price text-[0.75rem] line-through mr-[0.5rem] leading-[0.9rem]">{{ currencyState.symbol }}</span>
              <span class="current_price text-[1rem] leading-[1.2rem]">{{ currencyState.symbol }}{{ productPrice }}</span>
             </div>
            </div>
          </article>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCurrencyStore } from '@/stores/currency';

const currencyStore = useCurrencyStore()
const { currencyState, updateCurrencyState } = currencyStore.useCurrency();
const props = defineProps(['product', 'dataIndex'])
const router = useRouter()
const getImgUrl = (path) => {
    return new URL(`../../public/${path}`, import.meta.url).href;
};

const productPrice = computed(() => {
    const prices = props.product?.variants[0]?.prices;
    if (!prices) return undefined; 
    
    const matchingPrice = prices.find(price => price?.currency_code === currencyState.value?.toLowerCase());
    
    return matchingPrice ? matchingPrice.amount : undefined;
  });


    
 

</script>

<style lang="scss" scoped>

</style>