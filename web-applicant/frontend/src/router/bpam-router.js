// building permit application module (BPAM) router 

const bpamRoutes = [
  {
    path: "/bpam/",
    component: () => import("@/layouts/ApplicantLayout.vue"),
    children: [
      {
        path: "homepage",
        name: "BPAMHomepage",
        component: () => import("@/pages/applicant/Homepage.vue"),
      }
    ],
  },
  {
    path: "/bpam/ancillary-permits/",
    component: () => import("@/layouts/ApplicantLayout.vue"),
    children: [
      {
        path: "architectural",
        name: "Architectural",
        component: () => import("@/pages/applicant/BPAM/AncillaryPermits/Architectural.vue"),
      },
      {
        path: "civilstructural",
        name: "Civilstructural",
        component: () => import("@/pages/applicant/BPAM/AncillaryPermits/Civilstructural.vue"),
      },
      {
        path: "electrical",
        name: "Electrical",
        component: () => import("@/pages/applicant/BPAM/AncillaryPermits/Electrical.vue"),
      },
      {
        path: "electronics",
        name: "Electronics",
        component: () => import("@/pages/applicant/BPAM/AncillaryPermits/Electronics.vue"),
      },
      {
        path: "mechanical",
        name: "Mechanical",
        component: () => import("@/pages/applicant/BPAM/AncillaryPermits/Mechanical.vue"),
      },
      {
        path: "plumbing",
        name: "Plumbing",
        component: () => import("@/pages/applicant/BPAM/AncillaryPermits/Plumbing.vue"),
      },
      {
        path: "sanitary",
        name: "Sanitary",
        component: () => import("@/pages/applicant/BPAM/AncillaryPermits/Sanitary.vue"),
      },
    ],
  },
  {
    path: "/bpam/unified-form/",
    component: () => import("@/layouts/ApplicantLayout.vue"),
    children: [
      {
        path: "ancillaryforms",
        name: "AncillaryForms",
        component: () => import("@/pages/applicant/BPAM/UnifiedForm/AncillaryForms.vue"),
      },
      {
        path: "applicantinformation",
        name: "ApplicantInformation",
        component: () => import("@/pages/applicant/BPAM/UnifiedForm/ApplicantInformation.vue"),
      },
      {
        path: "bpadetails",
        name: "BPADetails",
        component: () => import("@/pages/applicant/BPAM/UnifiedForm/BPADetails.vue"),
      },
      {
        path: "constructioninformation",
        name: "ConstructionInformation",
        component: () => import("@/pages/applicant/BPAM/UnifiedForm/ConstructionInformation.vue"),
      },
      {
        path: "cooccupancy",
        name: "CoOccupancy",
        component: () => import("@/pages/applicant/BPAM/UnifiedForm/CoOccupancy.vue"),
      },
      {
        path: "navigation",
        name: "Navigation",
        component: () => import("@/pages/applicant/BPAM/UnifiedForm/Navigation.vue"),
      },
      {
        path: "planupload",
        name: "PlanUpload",
        component: () => import("@/pages/applicant/BPAM/UnifiedForm/PlanUpload.vue"),
      },
      {
        path: "signatories",
        name: "Signatories",
        component: () => import("@/pages/applicant/BPAM/UnifiedForm/Signatories.vue"),
      },
    ],
  },
];

export default bpamRoutes;