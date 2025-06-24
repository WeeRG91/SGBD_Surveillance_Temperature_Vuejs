<template>
  <div class="container mx-auto px-4 py-10">
    <!-- Search and Controls -->
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4"
    >
      <div class="w-full md:w-auto flex gap-4 items-center">
        <!-- Search Input -->
        <input
          type="text"
          id="search"
          v-model="searchTerm"
          placeholder="Rechercher..."
          class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-64"
        />

        <!-- Element Selection Dropdown -->
        <select
          v-model="selectedElement"
          @change="onElementSelected"
          class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="" selected>Sélectionner un élément</option>
          <option v-for="item in uniqueElements" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
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
              @click="sortBy(column.key)"
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
          <tr v-if="sortedAndFilteredData.length === 0">
            <td
              :colspan="columns.length + 1"
              class="px-6 py-4 text-center text-sm text-gray-500"
            >
              Aucune donnée trouvée
            </td>
          </tr>
          <tr
            v-for="(item, index) in sortedAndFilteredData"
            :key="index"
            class="hover:bg-gray-50"
          >
            <td
              v-for="(column, colIndex) in columns"
              :key="colIndex"
              class="px-6 py-4 whitespace-nowrap text-sm"
            >
              <span
                v-html="
                  column.key === 'temp_date_heure'
                    ? highlightSearchTerm(formatDate(item[column.key]))
                    : highlightSearchTerm(item[column.key])
                "
                :class="{
                  'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs':
                    column.key === 'traitee' && item[column.key] === 'Traitée',
                  'bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs':
                    column.key === 'traitee' &&
                    item[column.key] === 'Non traitée',
                }"
              ></span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div class="flex justify-center">
                <button
                  @click="openAlerteHandleModal(item['id'])"
                  title="Traiter l'alerte"
                  class="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
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

    <AlertHandleModal
      :isOpen="isAlerteHandleModalOpen"
      @close="isAlerteHandleModalOpen = false"
      @confirm="handleAlerte"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import AlertHandleModal from "./AlertHandleModal.vue";
import { useAlerteStore } from "../../store/alerteStore";

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

const alerteStore = useAlerteStore();

const selectedElement = ref("");
const searchTerm = ref("");
const sortKey = ref(props.columns[0]?.key || "");
const sortDirection = ref("asc");
const isAlerteHandleModalOpen = ref(false);
const selectedAlerteId = ref(null);

const uniqueElements = computed(() => {
  const elements = new Set();
  props.data.forEach((item) => {
    if (item.element_nom) {
      elements.add(item.element_nom);
    }
  });
  return Array.from(elements).sort();
});

const filteredData = computed(() => {
  let filtered = [...props.data];

  if (selectedElement.value) {
    filtered = filtered.filter(
      (item) => item.element_nom === selectedElement.value
    );
  }

  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase();
    filtered = filtered.filter((item) => {
      return props.columns.some((column) => {
        const value = String(item[column.key]).toLowerCase();
        return value.includes(term);
      });
    });
  }

  return filtered;
});

const sortedAndFilteredData = computed(() => {
  const data = [...filteredData.value];

  if (!sortKey.value) return data;

  return data.sort((a, b) => {
    let valueA = a[sortKey.value];
    let valueB = b[sortKey.value];

    if (!isNaN(valueA) && !isNaN(valueB)) {
      valueA = Number(valueA);
      valueB = Number(valueB);
    }

    if (typeof valueA === "string" && typeof valueB === "string") {
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }

    if (valueA < valueB) {
      return sortDirection.value === "asc" ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortDirection.value === "asc" ? 1 : -1;
    }
    return 0;
  });
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

const openAlerteHandleModal = (id_alerte) => {
  selectedAlerteId.value = id_alerte;
  isAlerteHandleModalOpen.value = true;
};

const handleAlerte = async () => {
  if (selectedAlerteId.value) {
    try {
      await alerteStore.updateAlerte(selectedAlerteId.value, {
        traitee: 1,
      });
      selectedAlerteId.value = null;
      isAlerteHandleModalOpen.value = false;
    } catch (error) {
      console.error("Handling alerte failed:", error);
    }
  }
};
</script>
