<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
  >
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
      <div class="p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          Enregistrer une température
        </h3>

        <div class="mb-4">
          <label
            for="temperature"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Température (°C)
          </label>
          <input
            type="number"
            step="0.1"
            id="temperature"
            v-model="temperatureValue"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Entrez la température"
          />
        </div>
      </div>

      <div
        class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-lg"
      >
        <button
          type="button"
          @click="submitTemperature"
          class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Enregistrer
        </button>
        <button
          type="button"
          @click="$emit('close')"
          class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Annuler
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTemperatureStore } from "../../store/temperatureStore";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  elementId: {
    type: [String, Number],
    required: true,
  },
});

const emit = defineEmits(["close", "register"]);

const temperatureStore = useTemperatureStore();
const temperatureValue = ref(null);

const submitTemperature = async () => {
  try {
    const response = await temperatureStore.storeTemperature({
      id_element: props.elementId,
      temperature: temperatureValue.value,
    });
    emit("register");
    resetForm();
  } catch (error) {
    console.error("Error registering temperature:", error);
  }
};

const resetForm = () => {
  temperatureValue.value = null;
  dateTimeValue.value = new Date().toISOString().slice(0, 16);
};
</script>
