<template>
    <LoadingSkeleton v-if="isLoading"/>
    <AlerteDataTable
    v-if="tableData && !isLoading"
    :data="tableData"
    :columns="tableColumns"
    />
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import AlerteDataTable from '../components/alerte/AlerteDataTable.vue';
import { useAlerteStore } from '../store/alerteStore';
import LoadingSkeleton from '../components/LoadingSkeleton.vue';

const alerteStore = useAlerteStore();

const isLoading = ref(false);
const tableData = computed(() => alerteStore.alertes)
const tableColumns = ref([
  {
    key: "element_nom",
    label: "Nom",
    sortable: true,
  },
  {
    key: "element_temp_min",
    label: "Température (min)",
    sortable: true,
  },
  {
    key: "element_temp_max",
    label: "Température (max)",
    sortable: true,
  },
  {
    key: "temperature",
    label: "Température récente",
    sortable: true,
  },
  {
    key: "temp_date_heure",
    label: "Date/heure",
    sortable: true,
  },
  {
    key: "type_alerte",
    label: "Alerte",
    sortable: true,
  },
  {
    key: "traitee",
    label: "Traitement",
    sortable: true,
  },
]);

onMounted(async () => {
    isLoading.value = true;
    await alerteStore.fetchAlertes();
    isLoading.value = false;
});
</script>

<style scoped>

</style>