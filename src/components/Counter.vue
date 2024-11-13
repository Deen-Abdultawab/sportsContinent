<template>
    <div
        class="border rounded-[200px] flex items-center justify-between quantity p-[0.5rem]"
        :style="{ border: '1px solid' }"
    >
        <PlusIcon :style="{ color: col }" @click="increaseCount" />
        <span>{{ initValue }}</span>
        <MinusIcon :style="{ color: col }" @click="decreaseCount" />
    </div>
</template>

<script setup>
import PlusIcon from '@/components/icons/PlusIcon.vue';
import MinusIcon from '@/components/icons/MinusIcon.vue';
import { ref, watch } from 'vue';

// Define props with their expected types and default values
const props = defineProps({
    col: String,
    default: { type: Number, default: 1 }
});

const emit = defineEmits(['update:initValue']);

// Initialize `initValue` with the `default` prop value
const initValue = ref(props.default);

// Watch for changes to `default` prop and update `initValue` accordingly
watch(
    () => props.default,
    (newVal) => {
        initValue.value = newVal;
    }
);

// Emit event with updated value on increment
const increaseCount = () => {
    initValue.value += 1;
    emit('update:initValue', initValue.value);
};

// Emit event with updated value on decrement, ensuring it doesn’t go below 0
const decreaseCount = () => {
    if (initValue.value > 0) {
        initValue.value -= 1;
        emit('update:initValue', initValue.value);
    }
};
</script>

<style scoped>
/* Style as needed */
</style>
