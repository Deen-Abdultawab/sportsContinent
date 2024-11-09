<template>
    <div class="relative">
      <input 
      :class="error ? 'border-[#DA5252]' : 'reg'"
      :type="type" 
      :id="id" 
      :placeholder="placeholder" 
      :value="modelValue"
       @input="$emit('update:modelValue', $event.target.value)"
        @change="emit('update:modelValue', $event.target.value)"
      >
      <errorInputIcon v-if="error" class="absolute right-4 top-[50%] translate-y-[-50%]" />
      <!-- <greenInputTick v-if="modelValue.length && !error" class="absolute top-1 right-1" /> -->
      <span v-if="error" class="text-[#993939] font-Satoshi400 text-sm">{{
        errorsMsg
      }}</span>
    </div>
  </template>
  
  <script setup>
  import errorInputIcon from "@/components/icons/errorInputIcon.vue";
  defineProps({
    modelValue: String | Number,
    type: String,
    placeholder: String,
    error: Boolean,
    errorsMsg: String,
    id: String | Number,
  });

  const errorsMsgs = {
  firstName: "First name is required",
  lastName: "Last name is required",
  email: "Email is required",
  password: "Password is required",
  confirmPassword: "Password does not match",
  business_name: "Business name is required",
  country_code: "country code is required",
  phone_number: "phone number is required",
};
  
  const emit = defineEmits(["update:modelValue"]);
  </script>
  