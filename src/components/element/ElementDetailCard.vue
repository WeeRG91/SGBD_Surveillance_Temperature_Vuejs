<template>
  <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
    <!-- Card Header with Element Name and Status -->
    <div class="bg-gradient-to-r from-[var(--primary-color)] to-blue-800 p-6">
      <div class="flex justify-between items-start">
        <div>
          <h1 class="text-2xl font-bold text-white">{{ element.nom }}</h1>
          <div class="flex items-center mt-2">
            <span
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
              :class="{
                'bg-green-100 text-green-800':
                  element.etat && element.etat === 'Fonctionnel',
                'bg-blue-100 text-blue-800':
                  element.etat && element.etat === 'Observé',
                'bg-red-100 text-red-800':
                  element.etat && element.etat === 'En panne',
                'bg-orange-100 text-orange-800':
                  element.etat && element.etat === 'A réparer',
                'bg-yellow-100 text-yellow-800':
                  element.etat && element.etat === 'Entretien',
                'bg-purple-100 text-purple-800':
                  element.etat && element.etat === 'Déclassé',
              }"
            >
              {{ element.etat ? element.etat : "État inconnu" }}
            </span>
            <span
              class="ml-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
            >
              {{ element.type_element ? element.type_element : "Type inconnu" }}
            </span>
          </div>
        </div>
        <div class="bg-white p-2 rounded-lg shadow">
          <div class="text-xs text-gray-500">QR Code</div>
          <div class="text-sm font-mono">
            {{ element.qr_code || "Non spécifié" }}
          </div>
        </div>
      </div>
    </div>

    <!-- Card Body -->
    <div class="p-6">
      <!-- Technical Specifications Section -->
      <div class="mb-8">
        <h2 class="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
          Spécifications techniques
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-gray-50 p-4 rounded-lg">
            <h3 class="text-sm font-medium text-gray-500 mb-2">
              Identification
            </h3>
            <div class="space-y-3">
              <div>
                <p class="text-xs text-gray-500">Numéro de série</p>
                <p class="font-medium">
                  {{ element.numero_serie || "Non spécifié" }}
                </p>
              </div>
              <div>
                <p class="text-xs text-gray-500">Marque</p>
                <p class="font-medium">
                  {{ element.marque || "Non spécifié" }}
                </p>
              </div>
              <div>
                <p class="text-xs text-gray-500">Série</p>
                <p class="font-medium">{{ element.serie || "Non spécifié" }}</p>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg">
            <h3 class="text-sm font-medium text-gray-500 mb-2">
              Caractéristiques
            </h3>
            <div class="space-y-3">
              <div>
                <p class="text-xs text-gray-500">Capacité</p>
                <p class="font-medium">{{ element.capacite }} L</p>
              </div>
              <div>
                <p class="text-xs text-gray-500">Plage de température</p>
                <p class="font-medium">
                  {{ element.temp_min }}°C à {{ element.temp_max }}°C
                </p>
              </div>
              <div>
                <p class="text-xs text-gray-500">Remplissage</p>
                <p class="font-medium capitalize">
                  {{ element.remplissage || "Non spécifié" }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Operational Details Section -->
      <div class="mb-8">
        <h2 class="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
          Détails opérationnels
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-gray-50 p-4 rounded-lg">
            <h3 class="text-sm font-medium text-gray-500 mb-2">
              Mise en service
            </h3>
            <div class="space-y-3">
              <div>
                <p class="text-xs text-gray-500">Date de mise en fonction</p>
                <p class="font-medium">
                  {{ formatDate(element.date_fonction) }}
                </p>
              </div>
              <div>
                <p class="text-xs text-gray-500">Garantie</p>
                <p class="font-medium">
                  {{ element.nombre_annees_garantie }} an(s)
                </p>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg">
            <h3 class="text-sm font-medium text-gray-500 mb-2">Localisation</h3>
            <div class="space-y-3">
              <div>
                <p class="text-xs text-gray-500">Emplacement</p>
                <p class="font-medium">
                  {{
                    element.emplacement ? element.emplacement : "Non spécifié"
                  }}
                </p>
              </div>
              <div>
                <p class="text-xs text-gray-500">Usage</p>
                <p class="font-medium">
                  {{ element.usage ? element.usage : "Non spécifié" }}
                </p>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg">
            <h3 class="text-sm font-medium text-gray-500 mb-2">
              Statut actuel
            </h3>
            <div class="space-y-3">
              <div>
                <p class="text-xs text-gray-500">Dernière maintenance</p>
                <p class="font-medium">
                  {{
                    element.last_maintenance
                      ? formatDate(element.last_maintenance)
                      : "Aucune"
                  }}
                </p>
              </div>
              <div>
                <p class="text-xs text-gray-500">Prochaine maintenance</p>
                <p class="font-medium">
                  {{
                    element.next_maintenance
                      ? formatDate(element.next_maintenance)
                      : "Non planifiée"
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Temperature History Section -->
      <div
        class="mb-8"
        v-if="element.temperatures && element.temperatures.length > 0"
      >
        <h2 class="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
          Températures
        </h2>
        <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
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
                    Alerte
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="temp in element.temperatures.sort(
                    (a, b) => new Date(b.date_heure) - new Date(a.date_heure)
                  )"
                  :key="temp.id"
                >
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(temp.date_heure) }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm font-medium"
                    :class="{
                      'text-red-500': temp.alerte,
                      'text-gray-900': !temp.alerte,
                    }"
                  >
                    {{ temp.temperature }}°C
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span
                      v-if="temp.alerte"
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="
                        temp.alerte.traitee
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      "
                    >
                      {{ temp.alerte.type_alerte }} ({{
                        temp.alerte.traitee ? "traitée" : "non traitée"
                      }})
                    </span>
                    <span v-else class="text-gray-400">-</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="px-6 py-3 bg-gray-50 text-right">
            <RouterLink
              :to="{ name: 'element-temperature', params: { id: element.id } }"
              class="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Voir toutes les températures
              <svg
                class="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Modification History Section -->
      <div
        class="mb-8"
        v-if="element.historiques && element.historiques.length > 0"
      >
        <h2 class="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
          Modifications
        </h2>
        <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
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
                <tr
                  v-for="hist in element.historiques.sort(
                    (a, b) => new Date(b.date_heure) - new Date(a.date_heure)
                  )"
                  :key="hist.id"
                >
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(hist.date_modification) }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize"
                  >
                    {{ hist.champ_modifie }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ hist.ancienne_valeur || "-" }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ hist.nouvelle_valeur || "-" }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="px-6 py-3 bg-gray-50 text-right">
            <RouterLink
              :to="{ name: 'element-history', params: { id: element.id } }"
              class="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Voir tous les historiques
              <svg
                class="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Additional Information Section -->
      <div>
        <h2 class="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
          Informations supplémentaires
        </h2>
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-sm font-medium text-gray-500 mb-2">Remarques</h3>
          <p class="text-gray-700">
            {{ element.remarque || "Aucune remarque" }}
          </p>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="mt-6 flex flex-wrap justify-end gap-3">
        <!-- Temperature Button -->
        <button
          @click="isTemperatureModalOpen = true"
          class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center flex-1 sm:flex-none justify-center"
        >
          <svg
            class="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            ></path>
          </svg>
          <span class="whitespace-nowrap">Enregistrer température</span>
        </button>

        <!-- Transfer Button -->
        <button
          @click="isTransferModalOpen = true"
          class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center flex-1 sm:flex-none justify-center"
        >
          <svg
            class="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            ></path>
          </svg>
          <span class="whitespace-nowrap">Transférer contenu</span>
        </button>

        <!-- Edit Button -->
        <button
          @click.stop="isEditModalOpen = true"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center flex-1 sm:flex-none justify-center"
        >
          <svg
            class="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            ></path>
          </svg>
          <span class="whitespace-nowrap">Modifier</span>
        </button>

        <!-- Delete Button -->
        <button
          @click.stop="isDeleteModalOpen = true"
          class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center flex-1 sm:flex-none justify-center"
        >
          <svg
            class="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            ></path>
          </svg>
          <span class="whitespace-nowrap">Supprimer</span>
        </button>
      </div>
    </div>
  </div>

  <TemperatureAddModal
    :isOpen="isTemperatureModalOpen"
    :elementId="element.id"
    @close="isTemperatureModalOpen = false"
    @register="handleTemperatureRegister"
  />

  <TransfertContenuModal
    :isOpen="isTransferModalOpen"
    :currentElement="element"
    @close="isTransferModalOpen = false"
    @transfer="handleTransferElement"
  />

  <DeleteConfirmationModal
    :isOpen="isDeleteModalOpen"
    :deleteText="'Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.'"
    @close="isDeleteModalOpen = false"
    @confirm="handleDeleteConfirm"
  />

  <ElementEditModal
    :isOpen="isEditModalOpen"
    :element="element"
    :types="types"
    :etats="etats"
    :usages="usages"
    :emplacements="emplacements"
    @close="isEditModalOpen = false"
    @update="handleUpdateFormSubmit"
  />
</template>

<script setup>
import { computed, defineProps, onMounted, ref } from "vue";
import ElementEditModal from "./ElementEditModal.vue";
import { useEmplacementStore } from "../../store/emplacementStore";
import { useEtatElementStore } from "../../store/etatElementStore";
import { useTypeElementStore } from "../../store/typeElementStore";
import { useUsageStore } from "../../store/usageStore";
import DeleteConfirmationModal from "../DeleteConfirmationModal.vue";
import { useElementStore } from "../../store/elementStore";
import { RouterLink, useRouter } from "vue-router";
import TransfertContenuModal from "../transfert/TransfertContenuModal.vue";
import TemperatureAddModal from "../temperature/TemperatureAddModal.vue";

const props = defineProps({
  element: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const router = useRouter();
const isEditModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const isTransferModalOpen = ref(false);
const isTemperatureModalOpen = ref(false);
const isLoading = ref(false);
const types = computed(() => typeStore.typeElements);
const usages = computed(() => usageStore.usages);
const etats = computed(() => etatStore.etatElements);
const emplacements = computed(() => emplacementStore.emplacements);

const emplacementStore = useEmplacementStore();
const etatStore = useEtatElementStore();
const typeStore = useTypeElementStore();
const usageStore = useUsageStore();
const elementStore = useElementStore();

onMounted(async () => {
  isLoading.value = true;
  await emplacementStore.fetchEmplacements();
  await etatStore.fetchEtatElements();
  await typeStore.fetchTypeElements();
  await usageStore.fetchUsages();
  isLoading.value = false;
});

const formatDate = (dateString) => {
  if (!dateString) return "Non spécifié";
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("fr-FR", options);
};

const handleTemperatureRegister = async () => {
  isTemperatureModalOpen.value = false;
  await elementStore.fetchElement(props.element.id);
};

const handleTransferElement = () => {
  isTransferModalOpen.value = false;
};

const handleDeleteConfirm = async () => {
  try {
    await elementStore.deleteElement(props.element.id);
    isDeleteModalOpen.value = false;
    router.push("/elements");
  } catch (error) {
    console.error("Erreur lors de la modification:", error);
  }
};

const handleUpdateFormSubmit = () => {
  isEditModalOpen.value = false;
};
</script>

<style scoped></style>
