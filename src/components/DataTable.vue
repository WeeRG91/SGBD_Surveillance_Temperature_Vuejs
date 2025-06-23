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
        <button
          @click="isCreateModalOpen = true"
          class="bg-[var(--bg-secondary-color)] text-[var(--primary-color)] px-8 py-2 rounded-md font-semibold hover:bg-[var(--primary-color)] hover:text-white transition duration-300"
        >
          Ajouter
        </button>
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
              <span v-html="highlightSearchTerm(item[column.key])"></span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div class="flex space-x-2">
                <button
                  @click.stop="openEditModal(item)"
                  title="Modifier"
                  class="text-indigo-600 hover:text-indigo-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                    />
                  </svg>
                </button>
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
  </div>

  <CreateModal
    :isOpen="isCreateModalOpen"
    :createText="createText"
    @close="isCreateModalOpen = false"
    @submit="handleCreate"
  />

  <EditModal
    :isOpen="isEditModalOpen"
    :itemName="itemNameToEdit"
    :editText="editText"
    @close="isEditModalOpen = false"
    @submit="handleEdit"
  />

  <DeleteConfirmationModal
    :isOpen="isDeleteModalOpen"
    :deleteText="deleteText"
    @close="isDeleteModalOpen = false"
    @confirm="handleDelete"
  />
</template>

<script setup>
import { ref, computed } from "vue";
import DeleteConfirmationModal from "./DeleteConfirmationModal.vue";
import { useEtatElementStore } from "../store/etatElementStore";
import { useTypeElementStore } from "../store/typeElementStore";
import { useUsageStore } from "../store/usageStore";
import EditModal from "./EditModal.vue";
import CreateModal from "./createModal.vue";

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
  for: {
    type: String,
    required: true,
  },
});

const etatElementStore = useEtatElementStore();
const typeElementStore = useTypeElementStore();
const usageStore = useUsageStore();

const searchTerm = ref("");
const sortKey = ref(props.columns[0]?.key || "");
const sortDirection = ref("asc");
const itemNameToEdit = ref("");
const isCreateModalOpen = ref(false);
const isEditModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const selectedItemToDelete = ref(null);
const selectedItemToEdit = ref(null);

const createText = computed(() => {
  if (props.for === "etat") {
    return "Créer un nouvel état";
  } else if (props.for === "type") {
    return "Créer un nouveau type";
  } else if (props.for === "usage") {
    return "Créer un nouvel usage";
  }
  return "";
});
const editText = computed(() => {
  if (props.for === "etat") {
    return "Modifier l'état";
  } else if (props.for === "type") {
    return "Modifier le type";
  } else if (props.for === "usage") {
    return "Modifier l'usage";
  }
  return "";
});
const deleteText = computed(() => {
  if (props.for === "etat") {
    return "Êtes-vous sûr de vouloir supprimer cet état ? Cette action est irréversible.";
  } else if (props.for === "type") {
    return "Êtes-vous sûr de vouloir supprimer ce type ? Cette action est irréversible.";
  } else if (props.for === "usage") {
    return "Êtes-vous sûr de vouloir supprimer cet usage ? Cette action est irréversible.";
  }
  return "";
});
const filteredData = computed(() => {
  if (!searchTerm.value) return props.data;

  const term = searchTerm.value.toLowerCase();
  return props.data.filter((item) => {
    return props.columns.some((column) => {
      const value = String(item[column.key]).toLowerCase();
      return value.includes(term);
    });
  });
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

const handleCreate = async (nom) => {
  if (nom) {
    try {
      if (props.for === "etat") {
        await etatElementStore.createEtatElement({
          nom: nom,
        });
        isCreateModalOpen.value = false;
      } else if (props.for === "type") {
        await typeElementStore.createTypeElement({
          nom: nom,
        });
        isCreateModalOpen.value = false;
      } else if (props.for === "usage") {
        await usageStore.createUsage({
          nom: nom,
        });
        isCreateModalOpen.value = false;
      }
    } catch (error) {
      console.error("Error creating:", error);
    }
  }
}; 

const openEditModal = (item) => {
  selectedItemToEdit.value = item;
  itemNameToEdit.value = selectedItemToEdit.value.nom;
  isEditModalOpen.value = true;
};

const handleEdit = async (editedName) => {
  if (selectedItemToEdit.value) {
    try {
      if (props.for === "etat") {
        await etatElementStore.updateEtatElement(selectedItemToEdit.value.id, {
          nom: editedName,
        });
        isEditModalOpen.value = false;
        selectedItemToEdit.value = null;
      } else if (props.for === "type") {
        await typeElementStore.updateTypeElement(selectedItemToEdit.value.id, {
          nom: editedName,
        });
        isEditModalOpen.value = false;
        selectedItemToEdit.value = null;
      } else if (props.for === "usage") {
        await usageStore.updateUsage(selectedItemToEdit.value.id, {
          nom: editedName,
        });
        isEditModalOpen.value = false;
        selectedItemToEdit.value = null;
      }
    } catch (error) {
      console.error("Error updating:", error);
    }
  }
};

const openDeleteModal = (item) => {
  selectedItemToDelete.value = item;
  isDeleteModalOpen.value = true;
};

const handleDelete = async () => {
  if (selectedItemToDelete.value) {
    try {
      if (props.for === "etat") {
        await etatElementStore.deleteEtatElement(selectedItemToDelete.value.id);
        isDeleteModalOpen.value = false;
        selectedItemToDelete.value = null;
      } else if (props.for === "type") {
        await typeElementStore.deleteTypeElement(selectedItemToDelete.value.id);
        isDeleteModalOpen.value = false;
        selectedItemToDelete.value = null;
      } else if (props.for === "usage") {
        await usageStore.deleteUsage(selectedItemToDelete.value.id);
        isDeleteModalOpen.value = false;
        selectedItemToDelete.value = null;
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  }
};
</script>
