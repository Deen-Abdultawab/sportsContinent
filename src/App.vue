<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useCurrencyStore } from '@/stores/currency';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { storeToRefs } from "pinia";

const currencyStore = useCurrencyStore()
const {provideCurrency} = storeToRefs(currencyStore)

// Provide currency state to the entire app

currencyStore.provideCurrency();
</script>

<template>
  <!-- <Navbar /> -->
  <RouterView />
  <!-- <Footer /> -->
</template>

<style scoped>


/* nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
} */
</style>
