// occupancy permit application module (OPAM) router 

const opamRoutes = [
  // Add OPAM routes here when needed
  // Example structure:
  {
    path: "/opam/",
    component: () => import("@/layouts/ApplicantLayout.vue"),
    children: [
      {
        path: "bp-inquiry",
        name: "BpInquiry",
        component: () => import("@/pages/applicant/OPAM/BpInquiry.vue"),
      },{
        path: "forgot-password",
        name: "ForgotPW",
        component: () => import("@/pages/applicant/OPAM/ForgotPW.vue"),
      },{
        path: "op-inquiry",
        name: "OpInquiry",
        component: () => import("@/pages/applicant/OPAM/OpInquiry.vue"),
      }
    ],
  },
];

export default opamRoutes;