export const bpamRoutes = [
  // BPAM
  {
    path: "/bpam/testing/",
    component: () => import("@/layouts/AdminLayout.vue"),
    children: [
      {
        path: "administrative",
        name: "administrative",
        component: () => import("@/pages/Admin/BPAM/Administrative.vue"),
      },
    ],
  },
];
