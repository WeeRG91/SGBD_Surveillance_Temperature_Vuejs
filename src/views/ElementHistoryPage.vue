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
      <h1 class="text-2xl font-bold ml-4">Historique des modifications</h1>
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
      v-if="historiques"
      class="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date/Heure
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Modification
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Ancienne valeur
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nouvelle valeur
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="his in historiques" :key="his.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDateTime(his.date_modification) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {{ his.champ_modifie }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ his.ancienne_valeur }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ his.nouvelle_valeur }}
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
import { useHistoriqueStore } from "../store/historiqueStore";
import LoadingSkeleton from "../components/LoadingSkeleton.vue";

const route = useRoute();
const historiques = computed(() => historiqueStore.historiques);
const element = computed(() => elementStore.currentElement);
const isLoading = ref(false);
const historiqueStore = useHistoriqueStore();
const elementStore = useElementStore();

onMounted(async () => {
  isLoading.value = true;
  await fetchElement();
  await fetchHistoriques();
  isLoading.value = false;
});

const fetchElement = async () => {
  try {
    await elementStore.fetchElement(route.params.id);
  } catch (error) {
    console.error("Error fetching element:", error);
  }
};

const fetchHistoriques = async () => {
  try {
    await historiqueStore.fetchHistoriquesByElementId(route.params.id);
  } catch (error) {
    console.error("Error fetching historiques:", error);
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
