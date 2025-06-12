<template>
  <li>
    <div
      class="flex items-center py-2 px-4 hover:bg-gray-50 rounded cursor-pointer"
      :style="{ paddingLeft: `${depth * 1.5 + 1}rem` }"
      @click="toggleExpend"
    >
      <span class="mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 inline-block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            :d="isExpanded ? 'M19 9l-7 7-7-7' : 'M9 5l7 7-7 7'"
          />
        </svg>
      </span>

      <span class="font-medium">{{ node.nom }}</span>

      <button 
        class="ml-2"
        @click.stop="isAddChildEmplacementModalOpen = true"
        title="Add child emplacement"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 text-gray-500 hover:text-gray-700"
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
      </button>
    </div>

    <!-- Elements list -->
    <ul v-if="isExpanded && node.elements.length" class="ml-8">
      <li
        v-for="element in node.elements"
        :key="element.id"
        class="py-1 px-4 text-sm text-gray-600"
        :style="{ paddingLeft: `${depth * 1.5 + 2}rem` }"
      >
        <RouterLink
          :to="{ name: 'element-details', params: { id: element.id } }"
          class="flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3 mr-2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          {{ element.nom }}
        </RouterLink>
      </li>
    </ul>

    <!-- Children nodes -->
    <ul
      v-if="isExpanded && node.children.length"
      class="border-l-2 border-gray-200 ml-4"
    >
      <EmplacementTree
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :depth="depth + 1"
      />
    </ul>

    <AddChildrenEmplacementModal
      :isOpen="isAddChildEmplacementModalOpen"
      :parentId="node.id"
      :parentName="node.nom"
      @close="isAddChildEmplacementModalOpen = false"
      @submit="handleAddChildEmplacement"
    />
  </li>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import AddChildrenEmplacementModal from "./AddChildrenEmplacementModal.vue";

const props = defineProps({
  node: {
    type: Object,
    required: true,
  },
  depth: {
    type: Number,
    default: 0,
  },
});

const isExpanded = ref(false);
const isAddChildEmplacementModalOpen = ref(false);

const toggleExpend = () => {
  console.log("toggleExpand");
  isExpanded.value = !isExpanded.value;
};

const handleAddChildEmplacement = () => {
  console.log("submit child emplacement")
}
</script>
