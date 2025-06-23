<template>
  <div class="bg-[var(--secondary-color)]">
    <header class="py-20 px-4">
      <div class="container mx-auto text-center">
        <h1
          class="text-4xl mb:text-5xl font-bold pb-2 bg-gradient-to-r from-blue-600 to-red-600 text-transparent bg-clip-text"
        >
          FrigoMonitor
        </h1>
        <p
          class="text-xl text-[var(--primary-color)] font-semibold md:text-2xl mb-8"
        >
          Surveillance intelligente de vos environnements frigorifiques
        </p>
        <RouterLink
          :to="{ name: 'elements' }"
          class="bg-[var(--bg-secondary-color)] text-[var(--primary-color)] px-8 py-3 rounded-lg font-semibold hover:bg-[var(--bg-primary-color)] hover:text-white transition duration-300"
        >
          Démarrer la surveillance
        </RouterLink>
      </div>
    </header>

    <section class="bg-[var(--primary-color)] py-16 px-4">
      <div class="container mx-auto">
        <h2 class="text-2xl text-white font-bold mb-8 text-center">
          Votre surveillance en chiffre
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div class="bg-white p-6 rounded-lg shadow">
            <p class="text-3xl font-bold text-blue-600">24/7</p>
            <p class="text-gray-600">Surveillance</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow">
            <p class="text-3xl font-bold text-green-600">
              {{ numberElements }}
            </p>
            <p class="text-gray-600">Équipement(s)</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow">
            <p class="text-3xl font-bold text-red-600">{{ numberAlertes }}</p>
            <p class="text-gray-600">Alerte(s)</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow">
            <p class="text-3xl font-bold text-purple-600">
              {{ percentNormalElements }}%
            </p>
            <p class="text-gray-600">Dans les normes</p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-[var(--bg-secondary-color)] py-12 px-4">
      <div class="container mx-auto">
        <h2
          class="text-2xl text-[var(--primary-color)] font-bold mb-6 text-center"
        >
          Dernières alertes
        </h2>

        <div
          v-if="latestAlertes.length !== 0"
          class="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div class="divide-y divide-gray-200 max-h-56 overflow-y-auto">
            <div
              v-for="alerte in latestAlertes"
              class="p-4 hover:bg-gray-100 transition flex items-center"
            >
              <div class="w-3 h-3 rounded-full bg-red-500 mr-4"></div>
              <div>
                <p class="font-semibold">{{ alerte.type_alerte }}</p>
                <p class="text-sm text-gray-500">
                  {{ alerte.element_nom }} ({{ alerte.element_temp_min }} -
                  {{ alerte.element_temp_max }}) - {{ alerte.temperature }}°C le
                  {{ formatDate(alerte.temp_date_heure) }}
                </p>
              </div>
            </div>
          </div>

          <div class="text-center text-[var(--primary-color)] py-4 bg-gray-50">
            <RouterLink
              :to="{ name: 'alertes' }"
              class="text--blue-600 font-medium hover:underline"
            >
              Voir toutes les alertes
            </RouterLink>
          </div>
        </div>

        <div
          v-if="latestAlertes.length === 0"
          class="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div
            class="flex flex-col items-center justify-center p-8 text-center"
          >
            <h3 class="text-lg font-medium text-gray-700 mb-2">
              Aucune alerte
            </h3>
            <p class="text-gray-500">
              Aucune alerte n'a été enregistrée pour le moment
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { defineProps } from "vue";

const props = defineProps({
  numberElements: {
    type: Number,
    required: true,
  },
  percentNormalElements: {
    type: Number,
    required: true,
  },
  numberAlertes: {
    type: Number,
    required: true,
  },
  latestAlertes: {
    type: Array,
    required: true,
  },
});

const formatDate = (dateString) => {
  if (!dateString) return "Non spécifié";
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("fr-FR", options);
};
</script>

<style scoped></style>
