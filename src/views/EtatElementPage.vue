<template>
  <LoadingSkeleton v-if="isLoading" />
  <DataTable
    v-if="!isLoading"
    :data="tableData"
    :columns="tableColumns"
    :for="'etat'"
  />
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import DataTable from "../components/DataTable.vue";
import LoadingSkeleton from "../components/LoadingSkeleton.vue";
import { useEtatElementStore } from "../store/etatElementStore";

const etatElementStore = useEtatElementStore();

const isLoading = ref(false);
const tableData = computed(() => etatElementStore.etatElements);
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
  await etatElementStore.fetchEtatElements();
  isLoading.value = false;
});
</script>

<style scoped></style>
