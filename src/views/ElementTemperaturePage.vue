<template>
  <LoadingSkeleton v-if="isLoading" />
  <div v-if="!isLoading" class="container mx-auto px-4 py-8">
    <!-- Header with back button -->
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
      <h1 class="text-2xl font-bold ml-4">Historique des températures</h1>
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

    <!-- Period selector and date picker -->
    <div class="bg-white rounded-lg shadow-md p-4 mb-6">
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div class="flex items-center space-x-2">
          <label for="period" class="text-sm font-medium text-gray-700"
            >Période:</label
          >
          <select
            id="period"
            v-model="selectedPeriod"
            @change="handlePeriodChange"
            class="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
          >
            <option value="day">Jour</option>
            <option value="week">Semaine</option>
            <option value="month">Mois</option>
            <option value="year">Année</option>
            <option value="custom">Personnalisée</option>
          </select>
        </div>

        <div
          v-if="selectedPeriod === 'custom'"
          class="flex items-center space-x-2"
        >
          <div>
            <label for="startDate" class="text-sm font-medium text-gray-700"
              >De:</label
            >
            <input
              type="date"
              id="startDate"
              v-model="startDate"
              @change="fetchDataForCustomPeriod"
              class="ml-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            />
          </div>
          <div>
            <label for="endDate" class="text-sm font-medium text-gray-700"
              >À:</label
            >
            <input
              type="date"
              id="endDate"
              v-model="endDate"
              @change="fetchDataForCustomPeriod"
              class="ml-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>
        <div v-else class="text-sm text-gray-500">
          Affichage des données pour: {{ currentPeriodLabel }}
        </div>
      </div>
    </div>

    <!-- Temperature Chart Component -->
    <TemperatureChart
      v-if="temperatures && temperatures.length > 0"
      :temperatures="temperatures"
      :min-temp="element.temp_min"
      :max-temp="element.temp_max"
      :period="selectedPeriod"
    />

    <!-- Temperature table -->
    <div
      v-if="temperatures"
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
                Température
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Statut
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Alerte
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="temp in temperatures" :key="temp.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDateTime(temp.date_heure) }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium"
                :class="{
                  'text-red-500': temp.type_alerte,
                  'text-gray-900': !temp.type_alerte,
                }"
              >
                {{ temp.temperature }}°C
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span
                  v-if="temp.type_alerte"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="
                    temp.traitee
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  "
                >
                  {{ temp.type_alerte }} ({{
                    temp.traitee ? "traitée" : "non traitée"
                  }})
                </span>
                <span v-else class="text-gray-400">Normal</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  v-if="temp.type_alerte && !temp.traitee"
                  @click="openAlerteHandleModal(temp.id_alerte)"
                  class="text-blue-600 hover:text-blue-800"
                >
                  Marquer comme traitée
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <AlertHandleModal
    :isOpen="isAlerteHandleModalOpen"
    @close="isAlerteHandleModalOpen = false"
    @confirm="handleAlerte"
  />
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useTemperatureStore } from "../store/temperatureStore";
import { useElementStore } from "../store/elementStore";
import { subDays, subWeeks, subMonths, subYears, format } from "date-fns";
import TemperatureChart from "../components/temperature/TemperatureChart.vue";
import LoadingSkeleton from "../components/LoadingSkeleton.vue";
import AlertHandleModal from "../components/temperature/AlertHandleModal.vue";
import { useAlerteStore } from "../store/alerteStore";

const route = useRoute();
const temperatureStore = useTemperatureStore();
const elementStore = useElementStore();
const alerteStore = useAlerteStore();

const isLoading = ref(false);
const selectedPeriod = ref("week");
const isAlerteHandleModalOpen = ref(false);
const selectedAlerteId = ref(null);
const startDate = ref("");
const endDate = ref("");

const temperatures = computed(() => temperatureStore.temperatures);
const element = computed(() => elementStore.currentElement);
const currentPeriodLabel = computed(() => {
  switch (selectedPeriod.value) {
    case "day":
      return "les dernières 24 heures";
    case "week":
      return "la dernière semaine";
    case "month":
      return "le dernier mois";
    case "year":
      return "la dernière année";
    case "custom":
      return "la période personnalisée";
    default:
      return "";
  }
});

const getDateRange = () => {
  const now = new Date();
  switch (selectedPeriod.value) {
    case "day":
      return {
        start: subDays(now, 1),
        end: now,
      };
    case "week":
      return {
        start: subWeeks(now, 1),
        end: now,
      };
    case "month":
      return {
        start: subMonths(now, 1),
        end: now,
      };
    case "year":
      return {
        start: subYears(now, 1),
        end: now,
      };
    case "custom":
      return {
        start: startDate.value ? new Date(startDate.value) : subDays(now, 1),
        end: endDate.value ? new Date(endDate.value) : now,
      };
    default:
      return {
        start: subDays(now, 1),
        end: now,
      };
  }
};

const fetchElement = async () => {
  try {
    await elementStore.fetchElement(route.params.id);
  } catch (error) {
    console.error("Error fetching element:", error);
  }
};

const fetchTemperatures = async () => {
  try {
    isLoading.value = true;
    const range = getDateRange();
    await temperatureStore.fetchTemperaturesWithAlerteByElementId({
      id_element: route.params.id,
      date_start: range.start,
      date_end: range.end,
    });
  } catch (error) {
    console.error("Error fetching temperatures:", error);
  } finally {
    isLoading.value = false;
  }
};

const handlePeriodChange = () => {
  if (selectedPeriod.value !== "custom") {
    fetchTemperatures();
  }
};

const fetchDataForCustomPeriod = () => {
  if (selectedPeriod.value === "custom" && startDate.value && endDate.value) {
    fetchTemperatures();
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

const openAlerteHandleModal = (id_alerte) => {
  selectedAlerteId.value = id_alerte;
  isAlerteHandleModalOpen.value = true;
};

const handleAlerte = async () => {
  if (selectedAlerteId.value) {
    try {
      await alerteStore.updateAlerte(selectedAlerteId.value.id, {
        traitee: true,
      });
      selectedAlerteId.value = null;
      isAlerteHandleModalOpen.value = false;
    } catch (error) {
      console.error("Handling alerte failed:", error);
    }
  }
};

onMounted(async () => {
  isLoading.value = true;
  const today = format(new Date(), "yyyy-MM-dd");
  const yesterday = format(subDays(new Date(), 1), "yyyy-MM-dd");
  startDate.value = yesterday;
  endDate.value = today;
  await fetchElement();
  await fetchTemperatures();
  isLoading.value = false;
});
</script>
