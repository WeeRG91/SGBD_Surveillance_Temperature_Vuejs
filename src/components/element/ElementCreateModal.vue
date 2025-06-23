<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <div
      class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <!-- Background overlay -->
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div
          class="absolute inset-0 bg-gray-500 opacity-75"
          @click="closeModal"
        ></div>
      </div>

      <!-- Modal container -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full"
      >
        <form @submit.prevent="submitForm">
          <!-- Modal header with step indicator -->
          <div
            class="bg-gradient-to-r from-[var(--primary-color)] to-blue-800 px-4 py-3 sm:px-6 sm:flex sm:items-center sm:justify-between"
          >
            <div class="flex items-center space-x-4">
              <h3 class="text-lg leading-6 font-medium text-white">
                Ajouter un nouvel élément (Étape {{ currentStep }} sur
                {{ totalSteps }})
              </h3>
              <div class="flex space-x-2">
                <div
                  v-for="step in totalSteps"
                  :key="step"
                  class="w-3 h-3 rounded-full"
                  :class="{
                    'bg-white': currentStep === step,
                    'bg-white bg-opacity-50': currentStep !== step,
                  }"
                ></div>
              </div>
            </div>
            <button
              type="button"
              class="hidden text-white hover:text-gray-200"
              @click="closeModal"
            >
              <span class="sr-only">Fermer</span>
              <svg
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

          <!-- Modal body -->
          <div class="px-4 py-5 sm:p-6">
            <!-- Step 1: Basic Information -->
            <div
              v-show="currentStep === 1"
              class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2"
            >
              <div class="sm:col-span-2">
                <h4 class="text-md font-medium text-gray-900 mb-3">
                  Informations de base
                </h4>
                <div class="border-t border-gray-200 pt-3"></div>
              </div>

              <div>
                <label for="nom" class="block text-sm font-medium text-gray-700"
                  >Nom *</label
                >
                <input
                  type="text"
                  v-model="form.nom"
                  id="nom"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <p v-if="errors.nom" class="mt-2 text-sm text-red-600">
                  {{ errors.nom[0] }}
                </p>
              </div>

              <div>
                <label
                  for="numero_serie"
                  class="block text-sm font-medium text-gray-700"
                  >Numéro de série *</label
                >
                <input
                  type="text"
                  v-model="form.numero_serie"
                  id="numero_serie"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <p v-if="errors.numero_serie" class="mt-2 text-sm text-red-600">
                  {{ errors.numero_serie[0] }}
                </p>
              </div>

              <div>
                <label
                  for="marque"
                  class="block text-sm font-medium text-gray-700"
                  >Marque *</label
                >
                <input
                  type="text"
                  v-model="form.marque"
                  id="marque"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <p v-if="errors.marque" class="mt-2 text-sm text-red-600">
                  {{ errors.marque[0] }}
                </p>
              </div>

              <div>
                <label
                  for="serie"
                  class="block text-sm font-medium text-gray-700"
                  >Série *</label
                >
                <input
                  type="text"
                  v-model="form.serie"
                  id="serie"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <p v-if="errors.serie" class="mt-2 text-sm text-red-600">
                  {{ errors.serie[0] }}
                </p>
              </div>

              <div>
                <label
                  for="date_fonction"
                  class="block text-sm font-medium text-gray-700"
                  >Date de mise en fonction *</label
                >
                <input
                  type="date"
                  v-model="form.date_fonction"
                  id="date_fonction"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <p
                  v-if="errors.date_fonction"
                  class="mt-2 text-sm text-red-600"
                >
                  {{ errors.date_fonction[0] }}
                </p>
              </div>

              <div>
                <label
                  for="nombre_annees_garantie"
                  class="block text-sm font-medium text-gray-700"
                  >Années de garantie *</label
                >
                <input
                  type="number"
                  v-model="form.nombre_annees_garantie"
                  id="nombre_annees_garantie"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <p
                  v-if="errors.nombre_annees_garantie"
                  class="mt-2 text-sm text-red-600"
                >
                  {{ errors.nombre_annees_garantie[0] }}
                </p>
              </div>
            </div>

            <!-- Step 2: Technical Specifications -->
            <div
              v-show="currentStep === 2"
              class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2"
            >
              <div class="sm:col-span-2">
                <h4 class="text-md font-medium text-gray-900 mb-3">
                  Spécifications techniques
                </h4>
                <div class="border-t border-gray-200 pt-3"></div>
              </div>

              <div>
                <label
                  for="capacite"
                  class="block text-sm font-medium text-gray-700"
                  >Capacité (L)*</label
                >
                <input
                  type="number"
                  step="0.01"
                  v-model="form.capacite"
                  id="capacite"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <p v-if="errors.capacite" class="mt-2 text-sm text-red-600">
                  {{ errors.capacite[0] }}
                </p>
              </div>

              <div>
                <label
                  for="temp_min"
                  class="block text-sm font-medium text-gray-700"
                  >Température minimale (°C)*</label
                >
                <input
                  type="number"
                  step="0.01"
                  v-model="form.temp_min"
                  id="temp_min"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <p v-if="errors.temp_min" class="mt-2 text-sm text-red-600">
                  {{ errors.temp_min[0] }}
                </p>
              </div>

              <div>
                <label
                  for="temp_max"
                  class="block text-sm font-medium text-gray-700"
                  >Température maximale (°C)*</label
                >
                <input
                  type="number"
                  step="0.01"
                  v-model="form.temp_max"
                  id="temp_max"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <p v-if="errors.temp_max" class="mt-2 text-sm text-red-600">
                  {{ errors.temp_max[0] }}
                </p>
              </div>

              <div>
                <label
                  for="remplissage"
                  class="block text-sm font-medium text-gray-700"
                  >Remplissage *</label
                >
                <select
                  v-model="form.remplissage"
                  id="remplissage"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="Vide">Vide</option>
                  <option value="Plein">Plein</option>
                </select>
                <p v-if="errors.remplissage" class="mt-2 text-sm text-red-600">
                  {{ errors.remplissage[0] }}
                </p>
              </div>
            </div>

            <!-- Step 3: Relations -->
            <div
              v-show="currentStep === 3"
              class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2"
            >
              <div class="sm:col-span-2">
                <h4 class="text-md font-medium text-gray-900 mb-3">
                  Details opérationnels
                </h4>
                <div class="border-t border-gray-200 pt-3"></div>
              </div>

              <div>
                <label
                  for="id_type"
                  class="block text-sm font-medium text-gray-700"
                  >Type *</label
                >
                <select
                  v-model="form.id_type"
                  id="id_type"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Sélectionnez un type</option>
                  <option v-for="type in types" :key="type.id" :value="type.id">
                    {{ type.nom }}
                  </option>
                </select>
                <p v-if="errors.id_type" class="mt-2 text-sm text-red-600">
                  {{ errors.id_type[0] }}
                </p>
              </div>

              <div>
                <label
                  for="id_usage"
                  class="block text-sm font-medium text-gray-700"
                  >Usage *</label
                >
                <select
                  v-model="form.id_usage"
                  id="id_usage"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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

              <div>
                <label
                  for="id_etat"
                  class="block text-sm font-medium text-gray-700"
                  >État *</label
                >
                <select
                  v-model="form.id_etat"
                  id="id_etat"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Sélectionnez un état</option>
                  <option v-for="etat in etats" :key="etat.id" :value="etat.id">
                    {{ etat.nom }}
                  </option>
                </select>
                <p v-if="errors.id_etat" class="mt-2 text-sm text-red-600">
                  {{ errors.id_etat[0] }}
                </p>
              </div>

              <div>
                <label
                  for="id_emplacement"
                  class="block text-sm font-medium text-gray-700"
                  >Emplacement *</label
                >
                <select
                  v-model="form.id_emplacement"
                  id="id_emplacement"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
            </div>

            <!-- Step 4: Additional Information -->
            <div
              v-show="currentStep === 4"
              class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2"
            >
              <div class="sm:col-span-2">
                <h4 class="text-md font-medium text-gray-900 mb-3">
                  Informations supplémentaires
                </h4>
                <div class="border-t border-gray-200 pt-3"></div>
              </div>

              <div>
                <label
                  for="last_maintenance"
                  class="block text-sm font-medium text-gray-700"
                  >Dernière maintenance</label
                >
                <input
                  type="date"
                  v-model="form.last_maintenance"
                  id="last_maintenance"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  for="next_maintenance"
                  class="block text-sm font-medium text-gray-700"
                  >Prochaine maintenance</label
                >
                <input
                  type="date"
                  v-model="form.next_maintenance"
                  id="next_maintenance"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div class="sm:col-span-2">
                <label
                  for="remarque"
                  class="block text-sm font-medium text-gray-700"
                  >Remarque</label
                >
                <textarea
                  v-model="form.remarque"
                  id="remarque"
                  rows="3"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                ></textarea>
                <p v-if="errors.remarque" class="mt-2 text-sm text-red-600">
                  {{ errors.remarque[0] }}
                </p>
              </div>
            </div>
          </div>

          <!-- Modal footer with step navigation -->
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              v-if="currentStep < totalSteps"
              type="button"
              @click.stop="nextStep"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[var(--primary-color)] text-base font-medium text-white hover:bg-[var(--bg-primary-color)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Suivant
            </button>
            <button
              v-if="currentStep === totalSteps"
              type="submit"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              :disabled="isLoading"
            >
              <span v-if="!isLoading">Enregistrer</span>
              <span v-else class="flex items-center">
                <svg
                  class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Enregistrement...
              </span>
            </button>
            <button
              v-if="currentStep > 1"
              type="button"
              @click.stop="prevStep"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Précédent
            </button>
            <button
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              @click.stop="closeModal"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { useElementStore } from "../../store/elementStore";

const props = defineProps({
  isOpen: Boolean,
  types: Array,
  usages: Array,
  etats: Array,
  emplacements: Array,
});

const elementStore = useElementStore();

const emit = defineEmits(["close", "create"]);

const currentStep = ref(1);
const totalSteps = 4;

const form = ref({
  nom: "",
  numero_serie: "",
  marque: "",
  serie: "",
  date_fonction: "",
  nombre_annees_garantie: null,
  capacite: null,
  temp_max: null,
  temp_min: null,
  id_type: "",
  id_usage: "",
  id_etat: "",
  id_emplacement: "",
  last_maintenance: "",
  next_maintenance: "",
  qr_code: "",
  remplissage: "vide",
  remarque: "",
});

const errors = ref({});
const isLoading = ref(false);

const nextStep = () => {
  currentStep.value++;
};

const prevStep = () => {
  currentStep.value--;
};

const closeModal = () => {
  emit("close");
  resetForm();
};

const resetForm = () => {
  form.value = {
    nom: "",
    numero_serie: "",
    marque: "",
    serie: "",
    date_fonction: "",
    nombre_annees_garantie: null,
    capacite: null,
    temp_max: null,
    temp_min: null,
    id_type: "",
    id_usage: "",
    id_etat: "",
    id_emplacement: "",
    last_maintenance: "",
    next_maintenance: "",
    qr_code: "",
    remplissage: "vide",
    remarque: "",
  };
  errors.value = {};
  currentStep.value = 1;
};

const submitForm = async () => {
  isLoading.value = true;
  errors.value = {};

  await elementStore.createElement(form.value);
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
      currentStep.value = 1;
    } else if (
      errors.value.capacite ||
      errors.value.temp_min ||
      errors.value.temp_max ||
      errors.value.remplissage
    ) {
      currentStep.value = 2;
    } else if (
      errors.value.id_type ||
      errors.value.id_usage ||
      errors.value.id_etat ||
      errors.value.id_emplacement
    ) {
      currentStep.value = 3;
    } else {
      currentStep.value = 4;
    }
  }

  isLoading.value = false;
  if (!errors.value) {
    emit("create");
    closeModal();
  }
};
</script>
