export const opamRoutes = [
  // OPAM Verification
  {
    path: "/opam/AA-verification/",
    component: () => import("@/layouts/AdminLayout.vue"),
    children: [
      {
        path: "aa-checklist",
        name: "AAchecklist",
        component: () =>
          import("@/pages/Admin/OPAM/AAverification/AAchecklist.vue"),
      },
      {
        path: "aa-dashboard",
        name: "AAdashboard",
        component: () =>
          import("@/pages/Admin/OPAM/AAverification/AAdashboard.vue"),
      },
    ],
  },
  // OPAM Scheduling
  {
    path: "/opam/ts-scheduling/",
    component: () => import("@/layouts/OBOLayout.vue"),
    children: [
      {
        path: "ts-dashboard",
        name: "TSdashboard",
        component: () =>
          import("@/pages/Admin/OPAM/TSscheduling/TSdashboard.vue"),
      },
      {
        path: "ts-inspection",
        name: "TSinspection",
        component: () =>
          import("@/pages/Admin/OPAM/TSscheduling/TSinspection.vue"),
      },
    ],
  },

  // OPAM Inspection
  {
    path: "/opam/bi-inspection/",
    component: () => import("@/layouts/OBOLayout.vue"),
    children: [
      {
        path: "bi-dashboard",
        name: "BIdashboard",
        component: () =>
          import("@/pages/Admin/OPAM/BIinspection/BIdashboard.vue"),
      },
      {
        path: "bi-report",
        name: "BIreport",
        component: () => import("@/pages/Admin/OPAM/BIinspection/BIreport.vue"),
      },
      {
        path: "ci-dashboard",
        name: "CIdashboard",
        component: () =>
          import("@/pages/Admin/OPAM/BIinspection/CIdashboard.vue"),
      },
      {
        path: "ci-report",
        name: "CIreport",
        component: () => import("@/pages/Admin/OPAM/BIinspection/CIreport.vue"),
      },
    ],
  },
];
