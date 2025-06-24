import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import HomePage from "../views/HomePage.vue";
import ElementPage from "../views/ElementPage.vue";
import ElementHistoryPage from "../views/ElementHistoryPage.vue";
import ElementTemperaturePage from "../views/ElementTemperaturePage.vue";
import EmplacementPage from "../views/EmplacementPage.vue";
import EtatElementPage from "../views/EtatElementPage.vue";
import TypeElementPage from "../views/TypeElementPage.vue";
import UsageElementPage from "../views/UsageElementPage.vue";
import ElementDetailPage from "../views/ElementDetailPage.vue";
import AlertePage from "../views/AlertePage.vue";
import ElementTransferPage from "../views/ElementTransferPage.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      { path: "", name: "home", component: HomePage },
      { path: "elements", name: "elements", component: ElementPage },
      { path: "elements/detail/:id", name: "element-detail", component: ElementDetailPage },
      { path: "elements/history/:id", name: "element-history", component: ElementHistoryPage },
      { path: "elements/temperature/:id", name: "element-temperature", component: ElementTemperaturePage },
      { path: "elements/transfer/:id", name: "element-transfer", component: ElementTransferPage },
      { path: "emplacements", name: "emplacements", component: EmplacementPage },
      { path: "etats", name: "etats", component: EtatElementPage },
      { path: "types", name: "types", component: TypeElementPage },
      { path: "usages", name: "usages", component: UsageElementPage },
      { path: "alertes", name: "alertes", component: AlertePage },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
