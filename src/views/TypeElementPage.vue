<template>
  <LoadingSkeleton v-if="isLoading" />
  <DataTable
    v-if="!isLoading"
    :data="tableData"
    :columns="tableColumns"
    :for="'type'"
  />
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import DataTable from "../components/DataTable.vue";
import LoadingSkeleton from "../components/LoadingSkeleton.vue";
import { useTypeElementStore } from "../store/typeElementStore";

const typeElementStore = useTypeElementStore();

const isLoading = ref(false);
const tableData = computed(() => typeElementStore.typeElements);
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
  await typeElementStore.fetchTypeElements();
  isLoading.value = false;
});
</script>

<style scoped></style>
