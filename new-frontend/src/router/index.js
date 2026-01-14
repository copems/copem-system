import { createRouter, createWebHistory } from "vue-router";
import { bpamRoutes } from "./bpam-router";
import { opamRoutes } from "./opam-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/layouts/default.vue"),
      children: [
        {
          path: "",
          name: "LandingPage",
          component: () => import("@/pages/landing-page/LandingPage.vue"),
        },
        {
          path: "login",
          name: "Login",
          component: () => import("@/pages/auth/Login.vue"),
        },
      ],
    },

    // BPAM Routes
    ...bpamRoutes,

    // OPAM Routes
    ...opamRoutes,
  ],
});

export default router;
