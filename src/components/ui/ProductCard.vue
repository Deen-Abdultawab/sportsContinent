<template>
  <article 
      class="shrink-0 flex flex-col gap-[1.25rem] cursor-pointer hover:scale-105 transitionItem"
      @click="$emit('click')"
  >
  <!-- {{ props.product }} -->
      <div class="rounded-[0.75rem] overflow-hidden h-full w-full max-h-[15rem] !rounded-b-none">
          <img :src="props?.product?.images[0]" alt="" class="object-fill h-full w-full">
      </div>
      <div class="text-center">
          <h3 class="font-Raleway font-[700] text-[0.875rem] leading-[1.05rem] text-textCol">{{ props?.product?.name}}</h3>
          <div class="items-end font-openSans font-[400] text-textCol mt-[0.2rem]">
              <span class="old_price text-[0.75rem] line-through mr-[0.5rem] leading-[0.9rem]" v-if="props.product?.discountPrice">{{ getCurrencySymbol(props.product?.currency) }}{{ props.product?.discountPrice }}</span>
              <span class="current_price text-[1rem] leading-[1.2rem]">{{ getCurrencySymbol(props.product?.currency) }}{{ props.product?.price?.toLocaleString() }}</span>
          </div>
      </div>
  </article>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// Define props and emits
const props = defineProps(['product']);
const emit = defineEmits(['click']); // Declare 'click' as an emitted event

// Function to return the currency symbol
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
</script>
