<template>
  <div class="fixed top-4 right-4 z-50 space-y-3 w-80">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        @click="toastStore.removeToast(toast.id)"
        class="p-4 rounded-lg shadow-lg cursor-pointer transition-colors"
        :class="{
          'bg-green-500 text-white': toast.type === 'success',
          'bg-red-500 text-white': toast.type === 'error',
          'bg-blue-500 text-white': toast.type === 'info',
          'bg-yellow-500 text-white': toast.type === 'warning'
        }"
      >
        <div class="flex justify-between items-center">
          <span>{{ toast.message }}</span>
          <button class="text-white hover:text-white/80">
            &times;
          </button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { useToastStore } from '../store/toastStore';

const toastStore = useToastStore();
</script>

<style>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.5s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>