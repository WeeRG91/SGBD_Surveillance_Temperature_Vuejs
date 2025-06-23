<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
  >
    <div
      class="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
    >
      <!-- Modal Header -->
      <div
        class="bg-gradient-to-r from-[var(--primary-color)] to-blue-800 p-4 sm:p-6 sticky top-0 z-10"
      >
        <div class="flex justify-between items-start">
          <div class="flex-1 min-w-0">
            <h2 class="text-lg sm:text-xl font-bold text-white truncate">
              Modifier l'élément
            </h2>
            <div class="flex mt-2 space-x-1 overflow-auto pb-1 hide-scrollbar">
              <button
                v-for="(step, index) in steps"
                :key="index"
                @click.stop="currentStep = index"
                class="flex-shrink-0 px-2 py-1 text-xs rounded-full transition-colors whitespace-nowrap"
                :class="{
                  'bg-white text-blue-800': currentStep === index,
                  'bg-blue-700 text-white hover:bg-blue-600':
                    currentStep !== index,
                }"
              >
                <span class="sm:hidden">{{ index + 1 }}</span>
                <span class="hidden sm:inline">{{ step.label }}</span>
              </button>
            </div>
          </div>
          <button
            @click.stop="closeModal"
            class="flex-shrink-0 ml-2 text-white hover:text-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Modal Body -->
      <div class="p-6">
        <form @submit.prevent="submitForm">
          <!-- Step 1: Basic Information -->
          <div v-show="currentStep === 0">
            <h3 class="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
              Informations de base
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Nom</label
                >
                <input
                  v-model="formData.nom"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p v-if="errors.nom" class="mt-2 text-sm text-red-600">
                  {{ errors.nom[0] }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Marque</label
                >
                <input
                  v-model="formData.marque"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p v-if="errors.marque" class="mt-2 text-sm text-red-600">
                  {{ errors.marque[0] }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Série</label
                >
                <input
                  v-model="formData.serie"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p v-if="errors.serie" class="mt-2 text-sm text-red-600">
                  {{ errors.serie[0] }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Numéro de série</label
                >
                <input
                  v-model="formData.numero_serie"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p v-if="errors.numero_serie" class="mt-2 text-sm text-red-600">
                  {{ errors.numero_serie[0] }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Date de mise en fonction</label
                >
                <input
                  v-model="formData.date_fonction"
                  type="date"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p
                  v-if="errors.date_fonction"
                  class="mt-2 text-sm text-red-600"
                >
                  {{ errors.date_fonction[0] }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Années de garantie</label
                >
                <input
                  v-model.number="formData.nombre_annees_garantie"
                  type="number"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p
                  v-if="errors.nombre_annees_garantie"
                  class="mt-2 text-sm text-red-600"
                >
                  {{ errors.nombre_annees_garantie[0] }}
                </p>
              </div>
            </div>
          </div>

          <!-- Step 2: Manufacturer & Technical Specs -->
          <div v-show="currentStep === 1">
            <div class="mb-8">
              <h3
                class="text-lg font-semibold text-gray-800 border-b pb-2 mb-4"
              >
                Spécifications techniques
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Capacité (L)</label
                  >
                  <input
                    v-model.number="formData.capacite"
                    type="number"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p v-if="errors.capacite" class="mt-2 text-sm text-red-600">
                    {{ errors.capacite[0] }}
                  </p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Remplissage</label
                  >
                  <select
                    v-model="formData.remplissage"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Vide">Vide</option>
                    <option value="Plein">Plein</option>
                  </select>
                  <p
                    v-if="errors.remplissage"
                    class="mt-2 text-sm text-red-600"
                  >
                    {{ errors.remplissage[0] }}
                  </p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Température minimale (°C)</label
                  >
                  <input
                    v-model.number="formData.temp_min"
                    type="number"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p v-if="errors.temp_min" class="mt-2 text-sm text-red-600">
                    {{ errors.temp_min[0] }}
                  </p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Température maximale (°C)</label
                  >
                  <input
                    v-model.number="formData.temp_max"
                    type="number"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p v-if="errors.temp_max" class="mt-2 text-sm text-red-600">
                    {{ errors.temp_max[0] }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3: Operational Details -->
          <div v-show="currentStep === 2">
            <div class="mb-8">
              <h3
                class="text-lg font-semibold text-gray-800 border-b pb-2 mb-4"
              >
                Détails opérationnels
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Type d'élément</label
                  >
                  <select
                    v-model="formData.id_type"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Sélectionnez un type</option>
                    <option
                      v-for="type in types"
                      :key="type.id"
                      :value="type.id"
                    >
                      {{ type.nom }}
                    </option>
                  </select>
                  <p v-if="errors.id_type" class="mt-2 text-sm text-red-600">
                    {{ errors.id_type[0] }}
                  </p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >État</label
                  >
                  <select
                    v-model="formData.id_etat"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Sélectionnez un état</option>
                    <option
                      v-for="etat in etats"
                      :key="etat.id"
                      :value="etat.id"
                    >
                      {{ etat.nom }}
                    </option>
                  </select>
                  <p v-if="errors.id_etat" class="mt-2 text-sm text-red-600">
                    {{ errors.id_etat[0] }}
                  </p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Emplacement</label
                  >
                  <select
                    v-model="formData.id_emplacement"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Sélectionnez un emplacement</option>
                    <option
                      v-for="emplacement in emplacements"
                      :key="emplacement.id"
                      :value="emplacement.id"
                    >
                      {{ emplacement.nom }}
                    </option>
                  </select>
                  <p
                    v-if="errors.id_emplacement"
                    class="mt-2 text-sm text-red-600"
                  >
                    {{ errors.id_emplacement[0] }}
                  </p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Usage</label
                  >
                  <select
                    v-model="formData.id_usage"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Sélectionnez un usage</option>
                    <option
                      v-for="usage in usages"
                      :key="usage.id"
                      :value="usage.id"
                    >
                      {{ usage.nom }}
                    </option>
                  </select>
                  <p v-if="errors.id_usage" class="mt-2 text-sm text-red-600">
                    {{ errors.id_usage[0] }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 4: Additional Information -->
          <div v-show="currentStep === 3">
            <div class="mb-6">
              <h3
                class="text-lg font-semibold text-gray-800 border-b pb-2 mb-4"
              >
                Informations supplémentaires
              </h3>
              <div class="mb-8">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                      >Dernière maintenance</label
                    >
                    <input
                      v-model="formData.last_maintenance"
                      type="date"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p
                      v-if="errors.last_maintenance"
                      class="mt-2 text-sm text-red-600"
                    >
                      {{ errors.last_maintenance[0] }}
                    </p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                      >Prochaine maintenance</label
                    >
                    <input
                      v-model="formData.next_maintenance"
                      type="date"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p
                      v-if="errors.next_maintenance"
                      class="mt-2 text-sm text-red-600"
                    >
                      {{ errors.next_maintenance[0] }}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Remarques</label
                >
                <textarea
                  v-model="formData.remarque"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="flex justify-between pt-4 border-t">
            <button
              type="button"
              @click.stop="prevStep"
              v-show="currentStep > 0"
              class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
            >
              Précédent
            </button>
            <div class="flex-grow"></div>
            <!-- Spacer -->
            <button
              type="button"
              @click.stop="closeModal"
              class="px-4 py-2 mx-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
            >
              Annuler
            </button>
            <button
              type="button"
              @click.stop="nextStep"
              v-show="currentStep < steps.length - 1"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Suivant
            </button>
            <button
              type="submit"
              v-show="currentStep === steps.length - 1"
              class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, computed, onMounted } from "vue";
import { useElementStore } from "../../store/elementStore";
import { useEmplacementStore } from "../../store/emplacementStore";
import { useEtatElementStore } from "../../store/etatElementStore";
import { useTypeElementStore } from "../../store/typeElementStore";
import { useUsageStore } from "../../store/usageStore";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  element: {
    type: Object,
    required: true,
  }
});

const emit = defineEmits(["close", "update"]);

const emplacementStore = useEmplacementStore();
const etatStore = useEtatElementStore();
const typeStore = useTypeElementStore();
const usageStore = useUsageStore();

const types = computed(() => typeStore.typeElements);
const usages = computed(() => usageStore.usages);
const etats = computed(() => etatStore.etatElements);
const emplacements = computed(() => emplacementStore.emplacements);

const isLoading = ref(false);
const errors = ref({});
const formData = ref({ ...props.element });
const steps = ref([
  { label: "Informations" },
  { label: "Spécifications" },
  { label: "Opération" },
  { label: "Finalisation" },
]);
const currentStep = ref(0);
const elementStore = useElementStore();

watch(
  () => props.element,
  (newValue) => {
    formData.value = { ...newValue };
  },
  { deep: true }
);

const closeModal = () => {
  currentStep.value = 0;
  emit("close");
};

const nextStep = () => {
  if (currentStep.value < steps.value.length - 1) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
};

const submitForm = async () => {
  isLoading.value = true;
  errors.value = {};

  await elementStore.updateElement(formData.value.id, formData.value);
  errors.value = elementStore.errors;

  if (errors.value) {
    if (
      errors.value.nom ||
      errors.value.numero_serie ||
      errors.value.marque ||
      errors.value.serie ||
      errors.value.date_fonction ||
      errors.value.nombre_annees_garantie
    ) {
      currentStep.value = 0;
    } else if (
      errors.value.capacite ||
      errors.value.temp_min ||
      errors.value.temp_max ||
      errors.value.remplissage
    ) {
      currentStep.value = 1;
    } else if (
      errors.value.id_type ||
      errors.value.id_usage ||
      errors.value.id_etat ||
      errors.value.id_emplacement
    ) {
      currentStep.value = 2;
    } else {
      currentStep.value = 3;
    }
  }

  if (!errors.value) {
    isLoading.value = false;
    emit("update");
  }
};

onMounted(async () => {
  await emplacementStore.fetchEmplacements();
  await etatStore.fetchEtatElements();
  await typeStore.fetchTypeElements();
  await usageStore.fetchUsages();
});
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
