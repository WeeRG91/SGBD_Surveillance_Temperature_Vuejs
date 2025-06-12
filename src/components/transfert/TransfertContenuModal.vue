<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
  >
    <div
      class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col"
    >
      <!-- Modal Header -->
      <div class="bg-[var(--primary-color)] text-white p-4 rounded-t-lg">
        <h3 class="text-lg font-semibold">Transférer le contenu</h3>
        <p class="text-sm opacity-80">
          Sélectionnez un élément disponible pour le transfert
        </p>
      </div>

      <!-- Modal Body -->
      <div class="p-4 overflow-y-auto flex-grow">
        <div v-if="isLoading" class="flex justify-center items-center h-32">
          <p>Chargement des éléments disponibles...</p>
        </div>

        <div v-else>
          <div v-if="availableElements.length === 0" class="text-center py-8">
            <p class="text-gray-500">
              Aucun élément disponible pour le transfert
            </p>
          </div>

          <div v-else class="space-y-3">
            <div
              v-for="element in availableElements"
              :key="element.id"
              class="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-colors"
              :class="{
                'border-blue-500 bg-blue-50': selectedElementId === element.id,
              }"
              @click="selectedElementId = element.id"
            >
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="font-medium">{{ element.nom }}</h4>
                  <p class="text-sm text-gray-600">
                    {{ element.type_element }}
                  </p>
                </div>
                <div class="text-right">
                  <p class="text-sm">Capacité: {{ element.capacite }} L</p>
                  <p class="text-sm">Emplacement: {{ element.emplacement }}</p>
                </div>
              </div>
              <div v-if="element.remarque" class="mt-2 text-xs text-gray-500">
                {{ element.remarque }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="p-4 border-t flex justify-end space-x-3">
        <button
          @click="$emit('close')"
          class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
        >
          Annuler
        </button>
        <button
          @click="isTransfertConfirmOpen = true"
          :disabled="!selectedElementId"
          class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Confirmer le transfert
        </button>
      </div>
    </div>
  </div>

  <TransfertConfirmModal
    :isOpen="isTransfertConfirmOpen"
    :currentElement="currentElement"
    :targetElement="selectedElement"
    @close="isTransfertConfirmOpen = false"
    @confirm="handleConfirmTransfer"
  />
</template>

<script setup>
import { computed, ref, watch } from "vue";
import elementApi from "../../api/element";
import TransfertConfirmModal from "./TransfertConfirmModal.vue";
import { useTransfertStore } from "../../store/transfertStore";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  currentElement: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["close", "transfer"]);

const transfertStore = useTransfertStore();
const availableElements = ref([]);
const selectedElementId = ref(null);
const isLoading = ref(false);
const isTransfertConfirmOpen = ref(false);
const selectedElement = computed(() => {
  return availableElements.value.find(
    (element) => element.id === selectedElementId.value
  );
});

const fetchAvailableElements = async () => {
  isLoading.value = true;
  try {
    const response = await elementApi.getTransferOptions({
      id_element: props.currentElement.id,
      current_capacite: props.currentElement.capacite,
      id_type: props.currentElement.id_type,
    });

    availableElements.value = response.data.availableElements;
  } catch (error) {
    console.error("Erreur lors du chargement des éléments:", error);
    availableElements.value = [];
  } finally {
    isLoading.value = false;
  }
};

const handleConfirmTransfer = async (remarque) => {
  try {
    await transfertStore.transferElement({
      element_source_id: props.currentElement.id,
      element_destination_id: selectedElementId.value,
      remarque: remarque,
    });
    emit("transfer");
  } catch (error) {
    console.error("Erreur lors du transfert:", error);
  }
};

watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      selectedElementId.value = null;
      fetchAvailableElements();
    }
  }
);
</script>
