import { createRouter, createWebHistory } from "vue-router";
import CountriesPage from "../pages/CountriesPage.vue";
import CountryPage from "../pages/CountryPage.vue";

const routes = [
  {
    path: "/",
    name: "Countries",
    component: CountriesPage,
  },
  {
    path: "/country/:countryName",
    name: "CountryPage",
    component: CountryPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
