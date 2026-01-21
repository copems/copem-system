export const bpamRoutes = [
  {
    path: "/bpam/applicant/",
    component: () => import("@/layouts/ApplicantLayout.vue"),
    children: [
      {
        path: "",
        name: "Homepage",
        component: () => import("@/pages/applicant/Homepage.vue"),
      },
    ],
  },

  // Ancillary Permits
  {
    path: "/bpam/applicant/ancillary-permits/",
    component: () => import("@/layouts/ApplicantLayout.vue"),
    children: [
      {
        path: "architectural",
        name: "Architectural",
        component: () =>
          import("@/pages/applicant/BPAM/AncillaryPermits/Architectural.vue"),
      },
      {
        path: "civil-structural",
        name: "Civilstructural",
        component: () =>
          import("@/pages/applicant/BPAM/AncillaryPermits/Civilstructural.vue"),
      },
      {
        path: "electrical",
        name: "Electrical",
        component: () =>
          import("@/pages/applicant/BPAM/AncillaryPermits/Electrical.vue"),
      },
      {
        path: "electronics",
        name: "Electronics",
        component: () =>
          import("@/pages/applicant/BPAM/AncillaryPermits/Electronics.vue"),
      },
      {
        path: "mechanical",
        name: "Mechanical",
        component: () =>
          import("@/pages/applicant/BPAM/AncillaryPermits/Mechanical.vue"),
      },
      {
        path: "plumbing",
        name: "Plumbing",
        component: () =>
          import("@/pages/applicant/BPAM/AncillaryPermits/Plumbing.vue"),
      },
      {
        path: "sanitary",
        name: "Sanitary",
        component: () =>
          import("@/pages/applicant/BPAM/AncillaryPermits/Sanitary.vue"),
      },
      {
        path: "unified-application-form",
        name: "UnifiedApplicationForm",
        component: () =>
          import(
            "@/pages/applicant/BPAM/AncillaryPermits/UnifiedApplicationForm.vue"
          ),
      },
    ],
  },

  // Unified Form
  {
    path: "/bpam/applicant/unified-form/",
    component: () => import("@/layouts/ApplicantLayout.vue"),
    children: [
      {
        path: "ancillary-forms",
        name: "AncillaryForms",
        component: () =>
          import("@/pages/applicant/BPAM/UnifiedForm/AncillaryForms.vue"),
      },
      {
        path: "applicant-information",
        name: "ApplicantInformation",
        component: () =>
          import("@/pages/applicant/BPAM/UnifiedForm/ApplicantInformation.vue"),
      },
      {
        path: "bpa-details",
        name: "BPADetails",
        component: () =>
          import("@/pages/applicant/BPAM/UnifiedForm/BPADetails.vue"),
      },
      {
        path: "co-occupancy",
        name: "CoOccupancy",
        component: () =>
          import("@/pages/applicant/BPAM/UnifiedForm/CoOccupancy.vue"),
      },
      {
        path: "construction-information",
        name: "ConstructionInformation",
        component: () =>
          import(
            "@/pages/applicant/BPAM/UnifiedForm/ConstructionInformation.vue"
          ),
      },
      {
        path: "navigation",
        name: "Navigation",
        component: () =>
          import("@/pages/applicant/BPAM/UnifiedForm/Navigation.vue"),
      },
      {
        path: "plan-upload",
        name: "PlanUpload",
        component: () =>
          import("@/pages/applicant/BPAM/UnifiedForm/PlanUpload.vue"),
      },
      {
        path: "signatories",
        name: "Signatories",
        component: () =>
          import("@/pages/applicant/BPAM/UnifiedForm/Signatories.vue"),
      },
    ],
  },
];
