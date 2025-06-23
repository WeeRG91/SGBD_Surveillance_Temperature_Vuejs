<template>
  <div class="container mx-auto px-4 py-10">
    <!-- Search and Controls -->
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4"
    >
      <div class="w-full md:w-auto">
        <input
          type="text"
          id="search"
          v-model="searchTerm"
          placeholder="Rechercher..."
          class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-64"
        />
      </div>

      <div class="flex flex-row justify-between gap-4 w-full md:w-auto">
        <div class="flex flex-row gap-4 w-full md:w-auto">
          <label
            for="perPage"
            class="text-sm font-medium text-gray-700 mb-1 flex items-center"
            >Éléments par page</label
          >
          <select
            id="perPage"
            v-model="itemsPerPage"
            class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>

        <button
          @click.stop="() => (isCreateModalOpen = true)"
          class="bg-[var(--bg-secondary-color)] text-[var(--primary-color)] px-8 py-2 rounded-md font-semibold hover:bg-[var(--primary-color)] hover:text-white transition duration-300"
        >
          Ajouter
        </button>
      </div>
    </div>

    <!-- Filtres Section - Responsive Design -->
    <div class="mb-6">
      <!-- Mobile: Collapsible Filters -->
      <div class="md:hidden mb-3">
        <button
          @click.stop="showMobileFilters = !showMobileFilters"
          class="flex items-center justify-between w-full px-4 py-2 bg-gray-100 rounded-lg"
        >
          <span class="font-medium">Filtres</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 transition-transform duration-200"
            :class="{ 'rotate-180': showMobileFilters }"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <!-- Filters Container -->
      <div
        class="transition-all duration-300 overflow-hidden"
        :class="{
          'max-h-0': !showMobileFilters && isMobile,
          'max-h-[500px]': showMobileFilters || !isMobile,
        }"
      >
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 gap-3 mt-3"
        >
          <!-- Type Filter -->
          <div class="relative">
            <label
              class="absolute -top-2 left-2 px-1 text-xs bg-white text-gray-500"
              >Type</label
            >
            <select
              v-model="filters.type"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option :value="null">Tous</option>
              <option v-for="type in types" :key="type.id" :value="type.nom">
                {{ type.nom }}
              </option>
            </select>
          </div>

          <!-- Usage Filter -->
          <div class="relative">
            <label
              class="absolute -top-2 left-2 px-1 text-xs bg-white text-gray-500"
              >Usage</label
            >
            <select
              v-model="filters.usage"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option :value="null">Tous</option>
              <option
                v-for="usage in usages"
                :key="usage.id"
                :value="usage.nom"
              >
                {{ usage.nom }}
              </option>
            </select>
          </div>

          <!-- État Filter -->
          <div class="relative">
            <label
              class="absolute -top-2 left-2 px-1 text-xs bg-white text-gray-500"
              >État</label
            >
            <select
              v-model="filters.etat"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option :value="null">Tous</option>
              <option v-for="etat in etats" :key="etat.id" :value="etat.nom">
                {{ etat.nom }}
              </option>
            </select>
          </div>

          <!-- Emplacement Filter -->
          <div class="relative">
            <label
              class="absolute -top-2 left-2 px-1 text-xs bg-white text-gray-500"
              >Emplacement</label
            >
            <select
              v-model="filters.emplacement"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option :value="null">Tous</option>
              <option
                v-for="emp in emplacements"
                :key="emp.id"
                :value="emp.nom"
              >
                {{ emp.nom }}
              </option>
            </select>
          </div>

          <!-- Remplissage Filter -->
          <div class="relative">
            <label
              class="absolute -top-2 left-2 px-1 text-xs bg-white text-gray-500"
              >Remplissage</label
            >
            <select
              v-model="filters.remplissage"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option :value="null">Tous</option>
              <option value="Plein">Plein</option>
              <option value="Vide">Vide</option>
            </select>
          </div>

          <!-- Reset Button -->
          <div class="flex items-end">
            <button
              @click.stop="resetFilters"
              class="w-full h-[42px] flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Réinitialiser</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto bg-white rounded-lg shadow">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-[var(--primary-color)]">
          <tr>
            <th
              v-for="(column, index) in columns"
              :key="index"
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer"
              @click.stop="sortBy(column.key)"
            >
              <div class="flex items-center">
                {{ column.label }}
                <span v-if="sortKey === column.key" class="ml-1">
                  {{ sortDirection === "asc" ? "↑" : "↓" }}
                </span>
              </div>
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-if="filteredData.length === 0">
            <td
              :colspan="columns.length + 1"
              class="px-6 py-4 text-center text-sm text-gray-500"
            >
              Aucune donnée trouvée
            </td>
          </tr>
          <tr
            v-for="(item, index) in paginatedData"
            :key="index"
            class="hover:bg-gray-50"
          >
            <td
              v-for="(column, colIndex) in columns"
              :key="colIndex"
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
            >
              <template v-if="column.transform">
                {{ column.transform(item[column.key]) }}
              </template>
              <template v-else>
                <span
                  v-if="!searchTerm"
                  :class="
                    column.cellClass
                      ? column.cellClass(item[column.key])
                      : 'text-gray-900'
                  "
                  >{{ item[column.key] }}</span
                >
                <span
                  v-else
                  v-html="highlightSearchTerm(item[column.key])"
                  :class="
                    column.cellClass
                      ? column.cellClass(item[column.key])
                      : 'text-gray-900'
                  "
                ></span>
              </template>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div class="flex space-x-2">
                <RouterLink
                  :to="{ name: 'element-detail', params: { id: item.id } }"
                  title="Voir plus"
                  class="text-indigo-600 hover:text-indigo-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fill-rule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </RouterLink>
                <button
                  @click.stop="openDeleteModal(item)"
                  title="Supprimer"
                  class="text-red-600 hover:text-red-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div
      class="flex flex-col sm:flex-row items-center justify-between mt-4 px-4 py-3 bg-white border-t border-gray-200 sm:px-6 rounded-b-lg"
    >
      <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Affichage
            <span class="font-medium">{{ pagination.startIndex + 1 }}</span> à
            <span class="font-medium">{{ pagination.endIndex }}</span> sur
            <span class="font-medium">{{ filteredData.length }}</span> résultats
          </p>
        </div>
        <div>
          <nav
            class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="sr-only">Précédent</span>
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>

            <button
              v-for="page in pages"
              :key="page"
              @click="goToPage(page)"
              :class="[
                page === currentPage
                  ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
              ]"
            >
              {{ page }}
            </button>

            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="sr-only">Suivant</span>
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>

    <DeleteConfirmationModal
      :isOpen="isDeleteModalOpen"
      :deleteText="'Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.'"
      @close="isDeleteModalOpen = false"
      @confirm="handleDeleteConfirm"
    />

    <ElementCreateModal
      v-if="!isLoading"
      :isOpen="isCreateModalOpen"
      :types="types"
      :usages="usages"
      :etats="etats"
      :emplacements="emplacements"
      @close="isCreateModalOpen = false"
      @create="handleCreateFormSubmit"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import ElementCreateModal from "./ElementCreateModal.vue";
import DeleteConfirmationModal from "../DeleteConfirmationModal.vue";
import { useEmplacementStore } from "../../store/emplacementStore";
import { useEtatElementStore } from "../../store/etatElementStore";
import { useTypeElementStore } from "../../store/typeElementStore";
import { useUsageStore } from "../../store/usageStore";
import { RouterLink } from "vue-router";
import { useElementStore } from "../../store/elementStore";

const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
  columns: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const searchTerm = ref("");
const itemsPerPage = ref(10);
const currentPage = ref(1);
const sortKey = ref(props.columns[0]?.key || "");
const sortDirection = ref("asc");
const isCreateModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const types = computed(() => typeStore.typeElements);
const usages = computed(() => usageStore.usages);
const etats = computed(() => etatStore.etatElements);
const emplacements = computed(() => emplacementStore.emplacements);
const isLoading = ref(false);
const filters = ref({
  type: null,
  usage: null,
  etat: null,
  emplacement: null,
  remplissage: null,
});
const showMobileFilters = ref(false);
const isMobile = ref(false);
const selectedItemToDelete = ref(null);

const elementStore = useElementStore();
const emplacementStore = useEmplacementStore();
const etatStore = useEtatElementStore();
const typeStore = useTypeElementStore();
const usageStore = useUsageStore();

onMounted(async () => {
  isLoading.value = true;
  await emplacementStore.fetchEmplacements();
  await etatStore.fetchEtatElements();
  await typeStore.fetchTypeElements();
  await usageStore.fetchUsages();
  isLoading.value = false;
});

onMounted(() => {
  checkIfMobile();
  window.addEventListener("resize", checkIfMobile);
});

const checkIfMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

const resetFilters = () => {
  filters.value = {
    type: null,
    usage: null,
    etat: null,
    emplacement: null,
    remplissage: null,
  };
  searchTerm.value = "";
};

const filteredData = computed(() => {
  let result = [...props.data];

  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase();
    result = result.filter((item) => {
      return props.columns.some((column) => {
        const value = String(item[column.key]).toLowerCase();
        return value.includes(term);
      });
    });
  }

  if (filters.value.type) {
    result = result.filter((item) => item.type_element === filters.value.type);
  }
  if (filters.value.usage) {
    result = result.filter((item) => item.usage === filters.value.usage);
  }
  if (filters.value.etat) {
    result = result.filter((item) => item.etat === filters.value.etat);
  }
  if (filters.value.emplacement) {
    result = result.filter(
      (item) => item.emplacement === filters.value.emplacement
    );
  }
  if (filters.value.remplissage) {
    result = result.filter(
      (item) => item.remplissage === filters.value.remplissage
    );
  }

  return result;
});

const sortedData = computed(() => {
  if (!sortKey.value) return filteredData.value;

  return [...filteredData.value].sort((a, b) => {
    let comparison = 0;
    const aValue = a[sortKey.value];
    const bValue = b[sortKey.value];

    if (typeof aValue === "string" && typeof bValue === "string") {
      comparison = aValue.localeCompare(bValue);
    } else if (typeof aValue === "number" && typeof bValue === "number") {
      comparison = aValue - bValue;
    } else if (aValue instanceof Date && bValue instanceof Date) {
      comparison = aValue - bValue;
    }

    return sortDirection.value === "asc" ? comparison : -comparison;
  });
});

const totalPages = computed(() => {
  return Math.ceil(sortedData.value.length / itemsPerPage.value);
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return sortedData.value.slice(start, end);
});

const pagination = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = Math.min(start + itemsPerPage.value, sortedData.value.length);
  return { startIndex: start, endIndex: end };
});

const pages = computed(() => {
  const maxVisiblePages = 5;
  const pages = [];

  if (totalPages.value <= maxVisiblePages) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    let startPage = Math.max(
      1,
      currentPage.value - Math.floor(maxVisiblePages / 2)
    );
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages.value) {
      endPage = totalPages.value;
      startPage = endPage - maxVisiblePages + 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
  }

  return pages;
});

const sortBy = (key) => {
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortKey.value = key;
    sortDirection.value = "asc";
  }
};

const highlightSearchTerm = (text) => {
  if (!searchTerm.value) return text;

  const term = searchTerm.value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${term})`, "gi");

  return String(text).replace(regex, '<span class="bg-yellow-200">$1</span>');
};

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

watch([itemsPerPage, searchTerm], () => {
  currentPage.value = 1;
});

watch(totalPages, (newTotal) => {
  if (currentPage.value > newTotal && newTotal > 0) {
    currentPage.value = newTotal;
  }
});

const handleCreateFormSubmit = () => {
  console.log("Created");
};

const openDeleteModal = (item) => {
  selectedItemToDelete.value = item;
  isDeleteModalOpen.value = true;
};

const handleDeleteConfirm = async () => {
  if (selectedItemToDelete.value) {
    try {
      await elementStore.deleteElement(selectedItemToDelete.value.id);
      isDeleteModalOpen.value = false;
      selectedItemToDelete.value = null;
    } catch (error) {
      console.error("Erreur deleting element:", error);
    }
  }
};
</script>
