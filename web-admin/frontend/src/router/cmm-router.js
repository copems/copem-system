export const cmmRoutes = [
  // BPAM
  {
    path: "/cmm/testing/",
    component: () => import("@/layouts/AdminLayout.vue"),
    children: [
      {
        path: "ComplianceMonitoring",
        name: "ComplianceMonitoring",
        component: () => import("@/pages/Admin/CMM/Compliance/compliance.vue"), // Or any other component for the root
      },

      {
        path: "rqmonitoring",
        name: "rqmonitoring",
        component: () =>
          import("@/pages/Admin/CMM/RQMonitoring/rqmonitoring.vue"), // Or any other component for the root
      },
    ],
  },
];
