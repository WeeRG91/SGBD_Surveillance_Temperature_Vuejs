import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import HomePage from "../views/HomePage.vue";
import ElementPage from "../views/ElementPage.vue";
import ElementDetailPage from "../views/elementDetailPage.vue";
import ElementHistoryPage from "../views/ElementHistoryPage.vue";
import ElementTemperaturePage from "../views/ElementTemperaturePage.vue";
import EmplacementPage from "../views/EmplacementPage.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      { path: "", name: "home", component: HomePage },
      { path: "elements", name: "element", component: ElementPage },
      { path: "elements/detail/:id", name: "element-details", component: ElementDetailPage },
      { path: "elements/history/:id", name: "element-history", component: ElementHistoryPage },
      { path: "elements/temperature/:id", name: "element-temperature", component: ElementTemperaturePage },
      { path: "emplacements", name: "emplacement", component: EmplacementPage },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
