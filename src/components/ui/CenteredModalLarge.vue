<template>
  <div
    class="modal backdrop-blur z-[100] fixed animate__zoomIn animate__rubberBand animate__fadeOut min-h-screen h-full"
  >
    <div
      class="modal__body relative w-full max-w-[90%] md:max-w-[600px] bg-white m-0 md:px-5 py-4 px-4 md:max-w-2/12"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.modal {
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  background: rgba(0, 0, 0, 0.3);
}

.modal__body {
  position: relative;
    border-radius: 12px;
    animation: slidedown 0.8s ease;
    overflow: auto;
}

.modal__body::-webkit-scrollbar {
      display: none;
    }
</style>
