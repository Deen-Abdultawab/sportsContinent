<template>
    <section class="w-[60.07%] mob:w-[90%] mx-auto mt-[5rem] mb-[10.69rem] px-[2rem] mob:p-0">
        <div class="form_container mt-[3rem]">
           <article 
           class="log_in"
           >
              <SigninForm />
           </article>
       </div>
    </section>
</template>

<script setup>
import SigninForm from '@/components/Forms/AuthForms/SigninForm.vue';

</script>

<style lang="scss" scoped>

</style>