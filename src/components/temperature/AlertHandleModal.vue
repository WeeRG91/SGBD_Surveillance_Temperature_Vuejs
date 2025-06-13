<template>
  <!-- Modal Backdrop -->
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click.self="closeModal"
  >
    <!-- Modal Container -->
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
      <!-- Modal Header -->
      <div class="p-4 border-b">
        <h3 class="text-lg font-semibold text-gray-900">
          Traitement de l'alerte
        </h3>
      </div>

      <!-- Modal Body -->
      <div class="p-4">
        <p class="text-gray-600">
          La température de l'élément réfrigérant n'est pas dans la plage de
          température. <br/>
          Souhaitez-vous confirmer le traitement de cette alerte ?
        </p>
      </div>

      <!-- Modal Footer -->
      <div class="p-4 border-t flex justify-end space-x-3">
        <button
          @click="closeModal"
          class="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          Annuler
        </button>
        <button
          @click="confirmDelete"
          class="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
        >
          <span v-if="!isLoading">Traiter</span>
          <span v-else class="flex items-center">
            <svg
              class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Traiter...
          </span>
        </button>
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
});

const emit = defineEmits(["confirm", "close"]);

const isLoading = ref(false);

const closeModal = () => {
  emit("close");
};

const confirmDelete = () => {
  isLoading.value = true;
  emit("confirm");
  isLoading.value = false;
};
</script>
