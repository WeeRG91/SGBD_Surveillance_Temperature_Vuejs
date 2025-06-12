<template>
  <LoadingSkeleton v-if="isLoading" />
  <div v-if="!isLoading" class="p-4 max-w-4xl mx-auto">
    <h1 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
      Arborescence des emplacements
    </h1>

    <div v-if="loading" class="text-center py-12">
      <div
        class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto"
      ></div>
      <p class="mt-3 text-gray-600 dark:text-gray-400">Chargement en cours...</p>
    </div>

    <div v-else class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6">
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
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useEmplacementStore } from "../store/emplacementStore";
import EmplacementTree from "../components/emplacement/EmplacementTree.vue";
import LoadingSkeleton from "../components/LoadingSkeleton.vue";

const emplacementStore = useEmplacementStore();

const isLoading = ref(true);

const treeData = computed(() => emplacementStore.emplacements);

const fetchEmplacements = async () => {
  try {
    await emplacementStore.fetchEmplacements();
  } catch (error) {
    console.error("Erreur lors du chargement des emplacements");
  }
};

onMounted(() => {
  isLoading.value = true;
  fetchEmplacements();
  isLoading.value = false;
});
</script>
