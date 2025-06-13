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
          FrigoMonitor
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
        class="w-full md:block md:w-auto transition-all duration-700"
        :class="{
          'max-h-0 opacity-0 invisible md:max-h-full md:opacity-100 md:visible':
            !isOpen,
          'max-h-[500px] opacity-100 visible': isOpen,
        }"
        id="mobile-menu"
      >
        <ul
          class="flex flex-col mt-4 space-y-2 md:space-y-0 md:flex-row md:space-x-1 lg:space-x-6 md:mt-0 text-[var(--primary-color)] font-medium"
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
              :to="{ name: 'elements' }"
              class="block font-semibold md:text-lg py-2 px-3 rounded-md text-[var(--primary-color)] bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-all duration-300"
              >Elements</RouterLink
            >
          </li>
          <li>
            <RouterLink
              :to="{ name: 'emplacements' }"
              class="block font-semibold md:text-lg py-2 px-3 rounded-md text-[var(--primary-color)] bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-all duration-300"
              >Emplacements</RouterLink
            >
          </li>

          <li class="relative" ref="dropdownRef">
            <button
              @click="isDropdownOpen = !isDropdownOpen"
              class="flex items-center font-semibold md:text-lg py-2 px-3 rounded-md text-[var(--primary-color)] bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-all duration-300 w-full text-left"
            >
              Administration
              <svg
                :class="{ 'rotate-180': isDropdownOpen }"
                class="ml-2 w-5 h-5 transition-transform duration-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 9l6 6 6-6"
                />
              </svg>
            </button>

            <ul
              v-if="isDropdownOpen"
              class="absolute left-0 mt-2 py-2 w-full min-w-[calc(100%)] bg-[var(--secondary-color)] border border-gray-200 rounded-md shadow-lg z-50"
            >
              <li>
                <RouterLink
                  :to="{ name: 'etats' }"
                  class="block py-2 px-4 text-[var(--primary-color)] hover:bg-[var(--bg-secondary-color)]"
                >
                  Etats
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  :to="{ name: 'types' }"
                  class="block py-2 px-4 text-[var(--primary-color)] hover:bg-[var(--bg-secondary-color)]"
                >
                  Types
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  :to="{ name: 'usages' }"
                  class="block py-2 px-4 text-[var(--primary-color)] hover:bg-[var(--bg-secondary-color)]"
                >
                  Usages
                </RouterLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { RouterLink } from "vue-router";
const dropdownRef = ref(null);

const isOpen = ref(false);
const isDropdownOpen = ref(false);

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped></style>
