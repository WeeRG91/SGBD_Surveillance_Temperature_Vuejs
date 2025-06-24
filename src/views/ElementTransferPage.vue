<template>
  <LoadingSkeleton v-if="isLoading" />
  <div v-if="!isLoading" class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="flex items-center mb-6">
      <button
        @click="$router.go(-1)"
        class="flex items-center text-blue-600 hover:text-blue-800"
      >
        <svg
          class="w-5 h-5 mr-2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 19L3 12L10 5M4 12H21"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Retour
      </button>
      <h1 class="text-2xl font-bold ml-4">Historique des transferts</h1>
    </div>

    <!-- Element info card -->
    <div v-if="element" class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 class="text-xl font-semibold mb-2">{{ element.nom }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <p class="text-sm text-gray-500">Numéro de série</p>
          <p class="font-medium">{{ element.numero_serie || "N/A" }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Plage de température</p>
          <p class="font-medium">
            {{ element.temp_min }}°C à {{ element.temp_max }}°C
          </p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Emplacement</p>
          <p class="font-medium">{{ element.emplacement || "N/A" }}</p>
        </div>
      </div>
    </div>

    <!-- Historique table -->
    <div
      v-if="transferts"
      class="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Élément source
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Élément destination
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="transfert in transferts" :key="transfert.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDateTime(transfert.date_transfert) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {{
                  transfert.element_source_id === element.id
                    ? "Sortie"
                    : "Entrée"
                }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span
                  v-if="transfert.element_source_id !== element.id"
                  class="text-gray-900"
                >
                  {{ transfert.element_source_nom }}
                </span>
                <span v-else class="text-gray-900">
                  {{ transfert.element_source_nom }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span
                  v-if="transfert.element_source_id !== element.id"
                  class="text-gray-900"
                >
                  {{ transfert.element_source_nom }}
                </span>
                <span v-else class="text-gray-900">
                  {{ transfert.element_source_nom }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useElementStore } from "../store/elementStore";
import LoadingSkeleton from "../components/LoadingSkeleton.vue";
import { useTransfertStore } from "../store/transfertStore";

const route = useRoute();
const transferts = computed(() => transfertStore.transferts);
const element = computed(() => elementStore.currentElement);
const isLoading = ref(false);
const transfertStore = useTransfertStore();
const elementStore = useElementStore();

onMounted(async () => {
  isLoading.value = true;
  await fetchElement();
  await fetchTransferts();
  isLoading.value = false;
});

const fetchElement = async () => {
  try {
    await elementStore.fetchElement(route.params.id);
  } catch (error) {
    console.error("Error fetching element:", error);
  }
};

const fetchTransferts = async () => {
  try {
    await transfertStore.fetchTransfertsByElementId(route.params.id);
  } catch (error) {
    console.error("Error fetching transferts:", error);
  }
};

const formatDateTime = (dateString) => {
  if (!dateString) return "";
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("fr-FR", options);
};
</script>
