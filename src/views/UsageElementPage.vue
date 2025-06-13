<template>
  <LoadingSkeleton v-if="isLoading" />
  <DataTable
    v-if="!isLoading"
    :data="tableData"
    :columns="tableColumns"
    :for="'usage'"
  />
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import DataTable from "../components/DataTable.vue";
import LoadingSkeleton from "../components/LoadingSkeleton.vue";
import { useUsageStore } from "../store/usageStore";

const usageStore = useUsageStore();

const isLoading = ref(false);
const tableData = computed(() => usageStore.usages);
const tableColumns = ref([
  {
    key: "nom",
    label: "Nom",
    sortable: true,
  },
  {
    key: "created_at",
    label: "Créé le",
    sortable: true,
  },
  {
    key: "updated_at",
    label: "Mis à jour le",
    sortable: true,
  },
]);

onMounted(async () => {
  isLoading.value = true;
  await usageStore.fetchUsages();
  isLoading.value = false;
});
</script>

<style scoped></style>
