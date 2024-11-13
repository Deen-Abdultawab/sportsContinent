<template>
    <article 
    class="bg-[#F8F8F8] py-[1.5rem] px-4 rounded-[1rem] shadow-md"
    >
        <h3 class="text-textCol font-[700] mb-[0.72rem] capitalize">{{ props.title }}</h3>
        <div class="flex items-center gap-4">
            <OrderIcon />
            <h3 class="font-[700]"> <span v-if="showCurrency" class="font-[700]">NGN</span> {{ props.quantity }}</h3>
        </div>
    </article>
</template>

<script setup>
import OrderIcon from "@/components/icons/OrderIcon.vue";

const props = defineProps(['title', 'quantity', 'showCurrency'])

</script>

<style scoped>

</style>