<template>
    <div class="w-full">
      <label class="text-[#232321] font-[600]">{{ props.title }}</label>
      <input 
        :type="props.type" 
        :placeholder="props.placeholder" 
        class="mt-4 border border-[#232321] rounded-[0.5rem] w-full px-4 py-[0.95rem] transitionItem" 
        :value="props.modelValue" 
        :readonly="props.isEditable" 
        @input="updateValue"
      />
    </div>
  </template>
  
  <script setup>
  const props = defineProps(['title', 'isEditable', 'placeholder', 'modelValue', 'type'])
  
  // Emit update:modelValue when the input changes
  const emit = defineEmits(['update:modelValue'])
  
  const updateValue = (event) => {
    emit('update:modelValue', event.target.value)
  }
  </script>
  
  <style scoped>
  </style>
  