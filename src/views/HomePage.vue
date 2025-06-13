<template>
  <LoadingSkeleton v-if="isLoading"/>
  <Hero
  v-if="!isLoading"
    :numberElements="numberElements"
    :percentNormalElements="percentNormalElements"
    :numberAlertes="numberAlertes"
    :threeLatestAlertes="threeLatestAlertes"
  />
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import Hero from "../components/home/Hero.vue";
import { useElementStore } from "../store/elementStore";
import { useAlerteStore } from "../store/alerteStore";
import LoadingSkeleton from "../components/LoadingSkeleton.vue";

const elementStore = useElementStore();
const alerteStore = useAlerteStore();

const isLoading = ref(false);

const numberElements = computed(() => elementStore.elements.length);

const percentNormalElements = computed(() => {
  if (elementStore.elements.length === 0) return 0;

  const functionalElements = elementStore.elements.filter(
    (element) => element.etat === "Fonctionnel"
  ).length;

  return Math.round((functionalElements / elementStore.elements.length) * 100);
});

const numberAlertes = computed(() => alerteStore.alertes.length);

const threeLatestAlertes = computed(() => {
  if (!alerteStore.alertes || alerteStore.alertes.length === 0) return [];

  return [...alerteStore.alertes]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 3);
});

onMounted(async () => {
  isLoading.value = true;
  await elementStore.fetchElements();
  await alerteStore.fetchAlertes();
  isLoading.value = false;
});
</script>

<style scoped></style>
