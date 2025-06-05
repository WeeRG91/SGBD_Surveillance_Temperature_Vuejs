<template>
  <div class="min-h-[calc(100vh_-_76px)] bg-[var(--secondary-color)]">
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
        <button
          class="bg-[var(--bg-secondary-color)] text-[var(--primary-color)] px-8 py-3 rounded-lg font-semibold hover:bg-[var(--bg-primary-color)] hover:text-white transition duration-300"
        >
          Démarrer la surveillance
        </button>
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
            <p class="text-3xl font-bold text-green-600">15</p>
            <p class="text-gray-600">Équipements</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow">
            <p class="text-3xl font-bold text-red-600">3</p>
            <p class="text-gray-600">Alertes aujourd'hui</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow">
            <p class="text-3xl font-bold text-purple-600">99%</p>
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

        <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="divide-y divide-gray-200">
                <div class="p-4 hover:bg-gray-100 transition flex items-center">
                    <div class="w-3 h-3 rounded-full bg-red-500 mr-4"></div>
                    <div>
                        <p class="font-semibold">Température trop basse</p>
                        <p class="text-sm text-gray-500">
                            Chambre froide #1 - +5.2°C à 14:30
                        </p>
                    </div>
                </div>
                <div class="p-4 hover:bg-gray-100 transition flex items-center">
                    <div class="w-3 h-3 rounded-full bg-red-500 mr-4"></div>
                    <div>
                        <p class="font-semibold">Température trop élevée</p>
                        <p class="text-sm text-gray-500">
                            Chambre froide #1 - +5.2°C à 14:30
                        </p>
                    </div>
                </div>
                <div class="p-4 hover:bg-gray-100 transition flex items-center">
                    <div class="w-3 h-3 rounded-full bg-red-500 mr-4"></div>
                    <div>
                        <p class="font-semibold">Température trop élevée</p>
                        <p class="text-sm text-gray-500">
                            Chambre froide #1 - +5.2°C à 14:30
                        </p>
                    </div>
                </div>
            </div>

            <div class="text-center text-[var(--primary-color)] py-4 bg-gray-50">
                <button class="text--blue-600 font-medium hover:underline">
                    Voir toutes les alertes
                </button>
            </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup></script>

<style scoped></style>
