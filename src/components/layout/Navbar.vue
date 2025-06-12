<template>
  <nav class="bg-[var(--secondary-color)] border border-gray-200">
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <RouterLink
        :to="{ name: 'home' }"
        class="flex items-center space-x-3 rtl:space-x-reverse"
      >
        <img src="/logo.png" class="h-10" alt="SGBD Logo" />
        <span
          class="text-[var(--primary-color)] self-center text-2xl font-bold whitespace-nowrap"
        >
          SGBD - FrigoMonitor
        </span>
      </RouterLink>

      <!-- Burger Button -->
      <button
        @click="isOpen = !isOpen"
        type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-[var(--primary-color)] rounded-lg md:hidden hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)] focus:outline-none transition"
        aria-controls="mobile-menu"
        aria-expanded="false"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <!-- Nav Links -->
      <div
        class="w-full md:block md:w-auto transition-all duration-700 overflow-hidden"
        :class="{
          'max-h-0 opacity-0 md:max-h-full md:opacity-100': !isOpen,
          'max-h-[500px] opacity-100': isOpen,
        }"
        id="mobile-menu"
      >
        <ul
          class="flex flex-col mt-4 space-y-2 md:space-y-0 md:flex-row md:space-x-6 lg:space-x-8 md:mt-0 text-[var(--primary-color)] font-medium"
        >
          <li>
            <RouterLink
              :to="{ name: 'home' }"
              class="block font-semibold md:text-lg py-2 px-3 rounded-md text-[var(--primary-color)] bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-all duration-300"
              >Home</RouterLink
            >
          </li>
          <li>
            <RouterLink
              :to="{ name: 'element' }"
              class="block font-semibold md:text-lg py-2 px-3 rounded-md text-[var(--primary-color)] bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-all duration-300"
              >Elements</RouterLink
            >
          </li>
          <li>
            <RouterLink
              :to="{ name: 'emplacement' }"
              class="block font-semibold md:text-lg py-2 px-3 rounded-md text-[var(--primary-color)] bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-all duration-300"
              >Emplacements</RouterLink
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

const isOpen = ref(false);
</script>

<style scoped></style>
