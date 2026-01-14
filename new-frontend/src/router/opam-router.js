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
        path: "op-location",
        name: "OPlocation",
        component: () =>
          import("@/pages/applicant/OPAM/OPapplication/Oploaction.vue"),
      },
      {
        path: "op-owner",
        name: "OPowner",
        component: () =>
          import("@/pages/applicant/OPAM/OPapplication/OPowner.vue"),
      },
      {
        path: "op-portal",
        name: "OPportal",
        component: () =>
          import("@/pages/applicant/OPAM/OPapplication/OPportal.vue"),
      },
      {
        path: "op-signatories",
        name: "OPsignatories",
        component: () =>
          import("@/pages/applicant/OPAM/OPapplication/OPsignatories.vue"),
      },
      {
        path: "op-type",
        name: "OPtype",
        component: () =>
          import("@/pages/applicant/OPAM/OPapplication/OPtype.vue"),
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
        name: "Completion",
        component: () =>
          import("@/pages/applicant/OPAM/OPforms/Completion.vue"),
      },
      {
        path: "electrical",
        name: "Electrical",
        component: () =>
          import("@/pages/applicant/OPAM/OPforms/Electrical.vue"),
      },
      {
        path: "unified",
        name: "Unified",
        component: () => import("@/pages/applicant/OPAM/OPforms/Unified.vue"),
      },
      {
        path: "forms-section",
        name: "FormsSection",
        component: () =>
          import("@/pages/applicant/OPAM/OPforms/FormsSection.vue"),
      },
    ],
  },
];
