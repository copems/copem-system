export const opamRoutes = [
  // OPAM Application
  {
    path: "/opam/op-application/",
    component: () => import("@/layouts/ApplicantLayout.vue"),
    children: [
      {
        path: "op-apply",
        name: "OPapply",
        component: () =>
          import("@/pages/applicant/OPAM/OPapplication/Opapply.vue"),
      },
      {
        path: "op-unified",
        name: "OPunified",
        component: () =>
          import("@/pages/applicant/OPAM/OPapplication/OPunified.vue"),
      },
      {
        path: "op-portal",
        name: "OPportal",
        component: () =>
          import("@/pages/applicant/OPAM/OPapplication/OPportal.vue"),
      },

      {
        path: "op-owner",
        redirect: { name: "OPunified" },
      },
      {
        path: "op-location",
        redirect: { name: "OPunified" },
      },
      {
        path: "op-signatories",
        redirect: { name: "OPunified" },
      },
    ],
  },

  // OPAM Forms
  {
    path: "/opam/op-forms/",
    component: () => import("@/layouts/ApplicantLayout.vue"),
    children: [
      {
        path: "completion",
        name: "OPCompletion",
        component: () =>
          import("@/pages/applicant/OPAM/OPforms/Completion.vue"),
      },
      {
        path: "electrical",
        name: "OPElectrical",
        component: () =>
          import("@/pages/applicant/OPAM/OPforms/Electrical.vue"),
      },
      {
        path: "unified",
        name: "OPUnified",
        component: () => import("@/pages/applicant/OPAM/OPforms/Unified.vue"),
      },
      {
        path: "forms-section",
        name: "OPFormsSection",
        component: () =>
          import("@/pages/applicant/OPAM/OPforms/FormsSection.vue"),
      },
      {
        path: "testing",
        name: "testing",
        component: () => import("@/pages/applicant/OPAM/OPforms/testing.vue"),
      },
    ],
  },
];
