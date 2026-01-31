export const cmmRoutes = [
  // BPAM
  {
    path: "/CMM/ComplianceFolder/",
    component: () => import("@/layouts/AdminLayout.vue"),
    children: [
      {
        path: "compliancetab",
        name: "compliancetab",
        component: () =>
          import("@/pages/Admin/CMM/ComplianceTab/compliance.vue"), // Or any other component for the root
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
