<template>
  <LoadingSkeleton v-if="loading" />
  <ElementDataTable
    v-if="tableData && !loading"
    :data="tableData"
    :columns="tableColumns"
  />
</template>

<script setup>
import ElementDataTable from "../components/element/ElementDataTable.vue";
import { computed, onMounted, ref } from "vue";
import LoadingSkeleton from "../components/LoadingSkeleton.vue";
import { useElementStore } from "../store/elementStore";

const elementStore = useElementStore();
const loading = ref(false);
const tableData = computed(() => elementStore.elements);
const tableColumns = ref([
  {
    key: "nom",
    label: "Nom",
    sortable: true,
    class: "font-medium text-blue-600 hover:underline cursor-pointer",
  },
  {
    key: "marque",
    label: "Marque",
    sortable: true,
  },
  {
    key: "type_element",
    label: "Type",
    sortable: true,
  },
  {
    key: "usage",
    label: "Usage",
    sortable: true,
  },
  {
    key: "etat",
    label: "État",
    sortable: true,
    cellClass: (value) => {
      return (
        {
          "Fonctionnel":
            "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs",
          "Observé":
            "bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs",
          "En panne": "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs",
          "A réparer":
            "bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs",
          "Entretien":
            "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs",
          "Déclassé":
            "bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs",
        }[value] || "bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs"
      );
    },
  },
  {
    key: "emplacement",
    label: "Emplacement",
    sortable: true,
  },
  {
    key: "derniere_temperature",
    label: "Température",
    sortable: true,
  },
  {
    key: "remplissage",
    label: "Remplissage",
    sortable: true,
    transform: (value) => (value === "Plein" ? "🔴 Plein" : "⚪ Vide"),
  },
]);

onMounted(async () => {
  loading.value = true;
  await elementStore.fetchElements();
  loading.value = false;
});
</script>

<style scoped></style>
