<template>
     <div class="border rounded-[200px] flex items-center justify-between quantity p-[0.5rem]"
     :style="{border: '1px solid' }"
     >
        <PlusIcon :style="{color: col}" @click="increaseCount"/>
        <span>{{ initValue }}</span>
        <MinusIcon :style="{ color: col}" @click="decreaseCount"/>            
    </div>
</template>

<script setup>
import PlusIcon from '@/components/icons/PlusIcon.vue';
import MinusIcon from '@/components/icons/MinusIcon.vue';
import { ref } from 'vue';

const props = defineProps(['col', 'default']);
const emit = defineEmits(['update:initValue']);

const initValue = ref(props.default || 1)

const increaseCount = ()=>{
    initValue.value += 1
    emit('update:initValue', initValue.value);
}

const decreaseCount = ()=>{
    if(initValue.value > 0){
        initValue.value -= 1
        emit('update:initValue', initValue.value);
    }
}
    
</script>

<style scoped>

</style>