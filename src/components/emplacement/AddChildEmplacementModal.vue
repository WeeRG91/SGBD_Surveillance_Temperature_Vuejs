<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Background overlay -->
    <div class="fixed inset-0 bg-black bg-opacity-25" @click="closeModal"></div>

    <!-- Modal container -->
    <div class="flex min-h-screen items-center justify-center p-4">
      <!-- Modal content -->
      <div class="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <!-- Close button -->
        <button
          class="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-500"
          @click="closeModal"
        >
          <svg
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Modal header -->
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Ajouter un nouvel emplacement
        </h3>

        <!-- Modal body -->
        <div class="mt-4">
          <p class="text-sm text-gray-500 mb-4">
            Ajout sous: <strong>{{ parentName }}</strong>
          </p>

          <div class="mb-4">
            <label
              for="emplacementName"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Nom de l'emplacement
            </label>
            <input
              type="text"
              id="emplacementName"
              v-model="emplacementName"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Entrez le de l'emplacement"
              @keyup.enter="submitForm"
            />
          </div>
        </div>

        <!-- Modal footer -->
        <div class="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            @click="closeModal"
          >
            Annuler
          </button>
          <button
            type="button"
            class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            @click="submitForm"
            :disabled="!emplacementName"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  parentName: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["close", "submit"]);

const emplacementName = ref("");

const closeModal = () => {
  emplacementName.value = "";
  emit("close");
};

const submitForm = () => {
  if (!emplacementName.value) return;

  emit("submit", emplacementName.value);

  emplacementName.value = "";
};
</script>
