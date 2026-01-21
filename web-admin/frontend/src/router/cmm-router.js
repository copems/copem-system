export const cmmRoutes = [
  // BPAM
  {
    path: "/cmm/testing/",
    component: () => import("@/layouts/AdminLayout.vue"),
    children: [
      {
        path: "Compliance",
        name: "compliance",
        component: () => import("@/pages/Admin/CMM/Compliance.vue"),
      },
    ],
  },
];
