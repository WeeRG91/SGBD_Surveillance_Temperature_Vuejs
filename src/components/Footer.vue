<template>
  <footer class="bg-[var(--secondary-color)] border-gray-200">
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <div class="flex justify-center items-center space-x-2">
        <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/logo.png" class="h-10" alt="SGBD Logo" />
        </a>
        <p class="text-gray-500">© 2023 <a href="#" class="hover:underline">FrigoMonitor</a></p>
      </div>

      <!-- Nav Links -->
      <div class="hidden w-full md:block md:w-auto">
        <ul
          class="flex flex-col mt-4 space-y-2 md:space-y-0 md:flex-row md:space-x-6 lg:space-x-8 md:mt-0 text-gray-500"
        >
          <li>
            <a
              href="#"
              class="block md:text-lg py-2 px-3 hover:underline"
              >Home</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block md:text-lg py-2 px-3 hover:underline"
              >Services</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block md:text-lg py-2 px-3 hover:underline"
              >Pricing</a
            >
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup></script>

<style scoped></style>
