<template>
  <footer class="bg-[var(--secondary-color)]">
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <div class="flex justify-center items-center space-x-2">
        <RouterLink :to="{ name: 'home' }" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/logo.png" class="h-10" alt="SGBD Logo" />
        </RouterLink>
        <p class="text-gray-500">
          © 2023
          <RouterLink :to="{ name: 'home' }" class="hover:underline"
            >FrigoMonitor</RouterLink
          >
        </p>
      </div>

      <!-- Nav Links -->
      <div class="hidden w-full md:block md:w-auto">
        <ul
          class="flex flex-col mt-4 space-y-2 md:space-y-0 md:flex-row md:space-x-6 lg:space-x-8 md:mt-0 text-gray-500"
        >
          <li>
            <a href="#" class="block md:text-lg py-2 px-3 hover:underline"
              >Home</a
            >
          </li>
          <li>
            <RouterLink
              :to="{ name: 'element' }"
              class="block md:text-lg py-2 px-3 hover:underline"
              >Elements</RouterLink
            >
          </li>
          <li>
            <a href="#" class="block md:text-lg py-2 px-3 hover:underline"
              >Emplacements</a
            >
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<style scoped></style>
