export const bpamRoutes = [
  // BPAM
  {
    path: "/bpam/AA-approval/",
    component: () => import("@/layouts/AdminLayout.vue"),
    children: [
      {
        path: "administrative",
        name: "administrative",
        component: () => import("@/pages/Admin/BPAM/AAapproval/Administrative.vue"),
      },
      {
        path: "approvedplans",
        name: "approvedplans",
        component: () => import("@/pages/Admin/BPAM/AAapproval/ApprovedPlans.vue"),
      },
    ],
  },
  // BPAM Evaluator
  {
    path: "/bpam/Plan-evaluator/",
    component: () => import("@/layouts/OBOLayout.vue"),
    children: [
      {
        path: "list-plan",
        name: "ListPlan",
        component: () =>
          import("@/pages/Admin/BPAM/PlanEvaluator/ListPlan.vue"),
      },
      {
        path: "plan-information",
        name: "PlanInformation",
        component: () =>
          import("@/pages/Admin/BPAM/PlanEvaluator/PlanInformation.vue"),
      },
      {
        path: "plan-evaluation",
        name: "PlanEvaluation",
        component: () =>
          import("@/pages/Admin/BPAM/PlanEvaluator/PlanEvaluation.vue"),
      },
    ],
  },
    // BPAM
  {
    path: "/bpam/Obo-Head/",
    component: () => import("@/layouts/OBOLayout.vue"),
    children: [
      {
        path: "List-Approval",
        name: "listapproval",
        component: () => import("@/pages/Admin/BPAM/OboHead/ListApproval.vue"),
      },
            {
        path: "Evaluated-Plans/:applicationNumber",
        name: "evaluatedplans",
        component: () => import("@/pages/Admin/BPAM/OboHead/EvaluatedPlans.vue"),
      },

    ],
  },
];
