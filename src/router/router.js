import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import HomePage from "../views/HomePage.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [{ path: "", name: "home", component: HomePage }],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
