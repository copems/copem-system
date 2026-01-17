import { createRouter, createWebHistory } from "vue-router";
import { opamRoutes } from "./opam-router.js";
import { bpamRoutes } from "./bpam-router.js";
import { cmmRoutes } from "./cmm-router.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/layouts/default.vue"),
      children: [
        {
          path: "",
          name: "Login",
          component: () => import("@/pages/auth/Login.vue"),
        },
      ],
    },
    ...opamRoutes,
    ...bpamRoutes,
    ...cmmRoutes,
  ],
});

export default router;
