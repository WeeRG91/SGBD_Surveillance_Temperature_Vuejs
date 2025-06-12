<template>
  <div class="container mx-auto p-4">
    <LoadingSkeleton v-if="isLoading" />
    <ElementdetailCard
      v-if="selectedElement"
      :element="selectedElement"
      @delete="handleDelete"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import ElementdetailCard from "../components/element/ElementdetailCard.vue";
import { useElementStore } from "../store/elementStore";
import { useRoute } from "vue-router";
import LoadingSkeleton from "../components/LoadingSkeleton.vue";

const route = useRoute();
const elementStore = useElementStore();
const selectedElement = computed(() => elementStore.currentElement);
const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  await elementStore.fetchElement(route.params.id);
  isLoading.value = false;
});

const handleDelete = () => {
  console.log("Delete button clicked");
  // Show confirmation dialog and delete if confirmed
};
</script>
