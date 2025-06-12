<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
  >
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
      <!-- Modal Header -->
      <div class="bg-[var(--primary-color)] text-white p-4 rounded-t-lg">
        <h3 class="text-lg font-semibold">Confirmer le transfert</h3>
      </div>

      <!-- Modal Body -->
      <div class="p-6">
        <p class="mb-4">
          Êtes-vous sûr de vouloir transférer le contenu de
          <strong>{{ currentElement.nom }}</strong> vers
          <strong>{{ targetElement.nom }}</strong> ?
        </p>

        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-yellow-700">
                Cette action est irréversible. Vérifiez que les éléments sont
                compatibles.
              </p>
            </div>
          </div>
        </div>

        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Remarque (optionnelle)
          </label>
          <textarea
            v-model="remarque"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows="3"
            placeholder="Ajoutez une remarque sur ce transfert..."
          ></textarea>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="px-4 py-3 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
        <button
          @click="closeModal"
          class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
        >
          Annuler
        </button>
        <button
          @click="confirmTransfer"
          class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Confirmer
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
  currentElement: {
    type: Object,
    required: true,
  },
  targetElement: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["close", "confirm"]);

const remarque = ref("");

const closeModal = () => {
  emit("close");
};

const confirmTransfer = () => {
  emit("confirm", remarque.value);
  closeModal();
};
</script>
