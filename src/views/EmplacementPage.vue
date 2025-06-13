<template>
  <LoadingSkeleton v-if="isLoading" />
  <div v-if="!isLoading" class="p-4 max-w-4xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h1
        class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200"
      >
        Arborescence des emplacements
      </h1>
      <button
        @click="isCreateEmplacementModalOpen = true"
        class="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <span class="hidden md:block">Nouvel emplacement</span>
      </button>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6">
      <ul class="space-y-3">
        <EmplacementTree
          v-for="node in treeData"
          :key="node.id"
          :node="node"
          :depth="0"
        />
      </ul>

      <div v-if="treeData.length === 0" class="text-center py-8 text-gray-500">
        Aucun emplacement trouvé
      </div>
    </div>
  </div>

  <AddNouvelEmplacementModal
    :isOpen="isCreateEmplacementModalOpen"
    @close="isCreateEmplacementModalOpen = false"
    @submit="handleCreateEmplacement"
  />
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useEmplacementStore } from "../store/emplacementStore";
import EmplacementTree from "../components/emplacement/EmplacementTree.vue";
import LoadingSkeleton from "../components/LoadingSkeleton.vue";
import AddNouvelEmplacementModal from "../components/emplacement/AddNouvelEmplacementModal.vue";

const emplacementStore = useEmplacementStore();

const isLoading = ref(false);
const isCreateEmplacementModalOpen = ref(false);

const treeData = computed(() => emplacementStore.emplacementTree);

const fetchEmplacementTree = async () => {
  try {
    await emplacementStore.fetchEmplacementTree();
  } catch (error) {
    console.error("Erreur lors du chargement des emplacements");
  }
};

const handleCreateEmplacement = async (emplacementName) => {
  try {
    await emplacementStore.createEmplacement({
      nom: emplacementName,
    });
    isCreateEmplacementModalOpen.value = false;
  } catch (error) {
    console.log("Creating new emplacement failed");
  }
};

onMounted(() => {
  isLoading.value = true;
  fetchEmplacementTree();
  isLoading.value = false;
});
</script>
