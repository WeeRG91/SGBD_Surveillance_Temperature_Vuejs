<template>
  <li>
    <div
      class="group flex items-center py-2 px-4 hover:bg-gray-50 rounded cursor-pointer"
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
        class="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        @click.stop="isAddEmplacementModalOpen = true"
        title="Ajouter emplacement"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-500 hover:text-green-700"
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

      <button
        @click.stop="isEditEmplacementModalOpen = true"
        title="Modifier emplacement"
        class="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 text-gray-500 hover:text-blue-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      </button>

      <button
        @click.stop="isDeleteEmplacementModalOpen = true"
        title="Supprimer emplacement"
        class="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 text-gray-500 hover:text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>

    <!-- Elements list -->
    <ul v-if="isExpanded && node.elements.length" class="ml-8">
      <li
        v-for="element in node.elements"
        :key="element.id"
        class="py-1 px-4 text-sm text-gray-600 hover:text-blue-800"
        :style="{ paddingLeft: `${depth * 1.5 + 2}rem` }"
      >
        <RouterLink
          :to="{ name: 'element-detail', params: { id: element.id } }"
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

    <AddChildEmplacementModal
      v-if="isAddEmplacementModalOpen"
      :isOpen="isAddEmplacementModalOpen"
      :parentName="node.nom"
      @close="isAddEmplacementModalOpen = false"
      @submit="handleAddChildEmplacement"
    />

    <EditEmplacementModal
      v-if="isEditEmplacementModalOpen"
      :isOpen="isEditEmplacementModalOpen"
      :emplacementName="node.nom"
      @close="isEditEmplacementModalOpen = false"
      @submit="handleEditEmplacement"
    />

    <DeleteConfirmationModal
      v-if="isDeleteEmplacementModalOpen"
      :isOpen="isDeleteEmplacementModalOpen"
      :deleteText="'Êtes-vous sûr de vouloir supprimer cet emplacement ? Cette action est irréversible.'"
      @close="isDeleteEmplacementModalOpen = false"
      @confirm="handleDeleteEmplacement"
    />
  </li>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import AddChildEmplacementModal from "./AddChildEmplacementModal.vue";
import { useEmplacementStore } from "../../store/emplacementStore";
import EditEmplacementModal from "./EditEmplacementModal.vue";
import DeleteConfirmationModal from "../DeleteConfirmationModal.vue";

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

const emplacementStore = useEmplacementStore();

const isExpanded = ref(false);
const isAddEmplacementModalOpen = ref(false);
const isEditEmplacementModalOpen = ref(false);
const isDeleteEmplacementModalOpen = ref(false);

const toggleExpend = () => {
  console.log("toggleExpand");
  isExpanded.value = !isExpanded.value;
};

const handleAddChildEmplacement = async (emplacementName) => {
  try {
    await emplacementStore.createEmplacement({
      nom: emplacementName,
      parent_id: props.node.id,
    });

    isAddEmplacementModalOpen.value = false;
    isExpanded.value = ref(true);
  } catch (error) {
    console.log("Storing child emplacement failed");
  }
};

const handleEditEmplacement = async (editedEmplacementName) => {
  try {
    await emplacementStore.updateEmplacement(props.node.id, {
      nom: editedEmplacementName,
    });

    isEditEmplacementModalOpen.value = false;
  } catch (error) {
    console.log("Editing emplacement failed");
  }
};

const handleDeleteEmplacement = async () => {
  try {
    await emplacementStore.deleteEmplacement(props.node.id);

    isDeleteEmplacementModalOpen.value = false;
  } catch (error) {
    console.log("Editing emplacement failed");
  }
};
</script>
