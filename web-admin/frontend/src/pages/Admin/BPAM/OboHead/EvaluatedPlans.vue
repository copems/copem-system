<template>
  <div class="page-container px-3 pb-8 mt-6">
    <div class="mb-4 px-2">
      <v-btn color="blue-darken-2" variant="text" class="mb-2" @click="goBack">
        <v-icon start>mdi-arrow-left</v-icon>
        Back
      </v-btn>
    </div>
    <div class="d-flex align-center justify-space-between mb-4 px-2">
      <div class="d-flex align-center">
        <v-icon color="#2563eb" class="mr-3" size="32"
          >mdi-office-building</v-icon
        >
        <h1 class="text-h4 font-weight-bold text-grey-darken-4">
          Evaluated Plans
        </h1>
      </div>
      <v-btn
        color="primary"
        prepend-icon="mdi-printer"
        class="text-none font-weight-bold px-6"
        rounded="lg"
        @click="printSummary"
      >
        Print Summary Report
      </v-btn>
    </div>

    <!-- Application Header Card -->
    <v-card flat class="mb-4 border rounded-lg">
      <v-card-text class="d-flex align-center justify-space-between flex-wrap">
        <div class="d-flex align-center">
          <h1 class="text-h5 font-weight-bold mr-3">{{ applicationNumber }}</h1>
          <v-chip
            color="warning"
            size="small"
            variant="tonal"
            prepend-icon="mdi-clock-outline"
          >
            For Approval
          </v-chip>
        </div>
        <div class="d-flex ga-2"></div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="d-flex text-caption text-grey-darken-1 ga-6">
        <div class="d-flex align-center">
          <v-avatar
            size="24"
            color="blue-darken-3"
            class="mr-2 text-white"
            style="font-size: 10px"
            >{{ currentApplication.initials }}</v-avatar
          >
          Applicant:
          <strong class="ml-1">{{ currentApplication.applicantName }}</strong>
        </div>
        <div class="d-flex align-center">
          <v-icon size="16" class="mr-1">mdi-calendar-check</v-icon>
          Evaluated: {{ currentApplication.dateApproved }}
        </div>
        <div class="d-flex align-center">
          <v-icon size="16" class="mr-1">mdi-office-building</v-icon>
          {{ currentApplication.constructionType }}
        </div>
      </v-card-text>
    </v-card>

    <v-card
      class="rounded-xl border-0 shadow-sm overflow-hidden"
      color="white"
      min-height="800"
    >
      <v-tabs
        v-model="activeTab"
        color="primary"
        bg-color="white"
        class="border-b px-6"
        height="60"
      >
        <v-tab
          value="evaluated"
          class="text-body-2 font-weight-medium text-capitalize"
        >
          <v-icon start icon="mdi-file-check-outline" class="mr-2"></v-icon>
          Evaluated Plans
        </v-tab>
        <v-tab
          value="summary"
          class="text-body-2 font-weight-medium text-capitalize"
        >
          <v-icon
            start
            icon="mdi-clipboard-check-outline"
            class="mr-2"
          ></v-icon>
          Evaluation & Assessment Summary
        </v-tab>
      </v-tabs>

      <div class="pa-6 pa-md-8 bg-white">
        <v-window v-model="activeTab">
          <v-window-item value="evaluated">
            <v-row>
              <v-col cols="12" md="3">
                <v-card flat class="border rounded-lg">
                  <v-list density="compact">
                    <v-list-subheader
                      class="font-weight-bold text-blue-darken-3"
                    >
                      <v-icon size="small" class="mr-2"
                        >mdi-file-document-outline</v-icon
                      >
                      Plan Documents
                    </v-list-subheader>
                    <v-list-item
                      v-for="plan in plans"
                      :key="plan.title"
                      :active="selectedPlan === plan.title"
                      color="primary"
                      variant="tonal"
                      class="rounded-lg ma-2"
                      @click="selectedPlan = plan.title"
                    >
                      <v-list-item-title class="text-body-2">{{
                        plan.title
                      }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>

              <v-col cols="12" md="9">
                <v-card
                  flat
                  class="border rounded-lg mb-4 d-flex flex-column align-center justify-center"
                  min-height="400"
                >
                  <div class="w-100 d-flex justify-space-between px-4 py-2">
                    <span class="text-subtitle-2">{{ selectedPlan }}</span>
                    <div class="d-flex ga-2">
                      <v-btn
                        icon="mdi-magnify-minus-outline"
                        variant="text"
                        size="small"
                      ></v-btn>
                      <v-btn
                        icon="mdi-magnify-plus-outline"
                        variant="text"
                        size="small"
                      ></v-btn>
                      <v-btn
                        icon="mdi-tray-arrow-down"
                        variant="text"
                        size="small"
                      ></v-btn>
                    </div>
                  </div>
                  <v-divider class="w-100"></v-divider>
                  <v-spacer></v-spacer>
                  <v-icon size="64" color="blue-lighten-3"
                    >mdi-file-pdf-box</v-icon
                  >
                  <div class="text-h6 mt-2">PDF Preview</div>
                  <div class="text-caption text-grey">
                    Actual PDF content would render here
                  </div>
                  <v-spacer></v-spacer>
                </v-card>

                <v-card flat class="border rounded-lg mb-4">
                  <v-card-title
                    class="d-flex justify-space-between align-center border-b"
                  >
                    <span class="text-primary">{{ selectedPlan }}</span>
                    <v-chip color="success" size="x-small" variant="flat"
                      >COMPLIANT</v-chip
                    >
                  </v-card-title>
                  <v-card-subtitle class="mt-1">
                    Evaluator: <strong>Dr. Maria Santos</strong> | Date:
                    <strong>September 18, 2023</strong>
                  </v-card-subtitle>
                  <v-card-text>
                    <div
                      v-for="item in complianceItems"
                      :key="item.title"
                      class="mb-4"
                    >
                      <div class="d-flex align-center mb-1">
                        <span class="font-weight-bold text-body-2 mr-2">{{
                          item.title
                        }}</span>
                        <v-chip size="x-small" color="success" variant="tonal"
                          >Approved</v-chip
                        >
                      </div>
                      <ul class="text-caption text-grey-darken-2 ml-4">
                        <li v-for="point in item.points" :key="point">
                          {{ point }}
                        </li>
                      </ul>
                    </div>
                  </v-card-text>
                </v-card>

                <!-- Action Buttons -->
                <div class="d-flex justify-end ga-3 mt-4">
                  <v-btn
                    color="error"
                    variant="outlined"
                    prepend-icon="mdi-arrow-left-circle-outline"
                    class="text-none font-weight-medium px-6"
                    @click="showReturnDialog = true"
                  >
                    Return
                  </v-btn>
                  <v-btn
                    color="success"
                    variant="flat"
                    prepend-icon="mdi-check-circle-outline"
                    class="text-none font-weight-medium px-6"
                    @click="handleApprove"
                  >
                    Approved
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-window-item>

          <v-window-item value="summary">
            <v-row>
              <v-col cols="12" md="6">
                <v-card flat class="border rounded-lg h-100">
                  <v-card-title
                    class="bg-blue-lighten-5 text-blue-darken-3 font-weight-bold text-h6 py-3"
                  >
                    <v-icon start class="mr-2"
                      >mdi-clipboard-check-outline</v-icon
                    >
                    Evaluation Summary
                  </v-card-title>
                  <v-card-text class="pa-6">
                    <div
                      v-for="(evalPlan, index) in evaluationSummary"
                      :key="index"
                      class="mb-6"
                    >
                      <div
                        class="d-flex justify-space-between align-center mb-1"
                      >
                        <span class="font-weight-bold text-body-1">{{
                          evalPlan.title
                        }}</span>
                        <v-chip
                          size="x-small"
                          color="success"
                          class="font-weight-bold"
                          >COMPLIANT</v-chip
                        >
                      </div>
                      <div class="text-caption text-grey-darken-1 mb-1">
                        Evaluator: {{ evalPlan.evaluator }} | Date:
                        {{ evalPlan.date }}
                      </div>
                      <div class="text-body-2 text-grey-darken-3">
                        {{ evalPlan.remarks }}
                      </div>
                      <v-divider
                        v-if="index < evaluationSummary.length - 1"
                        class="mt-4"
                      ></v-divider>
                    </div>

                    <v-row class="mt-12 pt-12">
                      <v-col cols="6" class="text-center">
                        <v-divider class="mb-2 mx-4"></v-divider>
                        <div class="text-caption">Applicant Signature</div>
                      </v-col>
                      <v-col cols="6" class="text-center">
                        <div class="font-weight-bold text-body-2">
                          Engr. Vicente Alvarez
                        </div>
                        <div class="text-caption">City Building Official</div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" md="6">
                <v-card flat class="border rounded-lg overflow-hidden h-100">
                  <v-card-title
                    class="bg-orange-lighten-5 text-orange-darken-3 font-weight-bold"
                  >
                    <v-icon start class="mr-2">mdi-calculator</v-icon>
                    Assessment Summary
                  </v-card-title>
                  <v-card-text class="pa-6">
                    <div
                      v-for="(fee, index) in assessmentFees"
                      :key="index"
                      class="d-flex justify-space-between mb-3 text-body-2"
                    >
                      <span class="text-grey-darken-2">{{ fee.label }}</span>
                      <span class="font-weight-medium"
                        >₱ {{ fee.amount.toFixed(2) }}</span
                      >
                    </div>
                    <v-divider class="my-4"></v-divider>
                    <div
                      class="bg-blue-grey-lighten-5 pa-4 rounded-lg d-flex justify-space-between align-center"
                    >
                      <span class="text-h6 font-weight-bold text-blue-darken-3"
                        >Total Amount</span
                      >
                      <span
                        class="text-h5 font-weight-black text-blue-darken-4"
                      >
                        ₱
                        {{
                          totalAmount.toLocaleString("en-PH", {
                            minimumFractionDigits: 2,
                          })
                        }}
                      </span>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
      </div>
    </v-card>

    <!-- Return Dialog -->
    <v-dialog v-model="showReturnDialog" max-width="500" persistent>
      <v-card class="rounded-lg">
        <v-card-title class="bg-error text-white d-flex align-center py-4">
          <v-icon class="mr-2">mdi-arrow-left-circle-outline</v-icon>
          Return Application
        </v-card-title>
        <v-card-text class="pa-6">
          <p class="text-body-2 text-grey-darken-2 mb-4">
            Please provide remarks for returning this evaluated plan to the
            assigned evaluator.
          </p>
          <v-textarea
            v-model="returnRemarks"
            label="Remarks"
            placeholder="Enter your remarks here..."
            variant="outlined"
            rows="4"
            counter
            maxlength="500"
            :rules="[(v) => !!v || 'Remarks are required']"
          ></v-textarea>
        </v-card-text>
        <v-card-actions class="pa-4 pt-0">
          <v-spacer></v-spacer>
          <v-btn variant="text" class="text-none" @click="closeReturnDialog">
            Cancel
          </v-btn>
          <v-btn
            color="error"
            variant="flat"
            class="text-none px-6"
            :disabled="!returnRemarks.trim()"
            @click="handleReturn"
          >
            Submit Return
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

// Get application number from route params
const applicationNumber = ref(route.params.applicationNumber || "BPA-2023-001");

const activeTab = ref("evaluated");

const selectedPlan = ref("Architectural Plan");

// Return dialog state
const showReturnDialog = ref(false);
const returnRemarks = ref("");

// Applications Data (mock data - would come from API in production)
const applicationsData = {
  "BPA-2023-001": {
    applicantName: "Juan Dela Cruz",
    initials: "JDC",
    dateApproved: "2023-09-20",
    constructionType: "Residential Construction",
    status: "For Approval",
    plans: [
      { title: "Architectural Plan" },
      { title: "Structural Plan" },
      { title: "Electrical Plan" },
    ],
    evaluationSummary: [
      {
        title: "Architectural Plan",
        evaluator: "Dr. Maria Santos",
        date: "September 18, 2023",
        remarks: "All structural requirements met.",
      },
      {
        title: "Structural Plan",
        evaluator: "Dr. Maria Santos",
        date: "September 18, 2023",
        remarks: "Beam and column specifications verified.",
      },
      {
        title: "Electrical Plan",
        evaluator: "Dr. Maria Santos",
        date: "September 18, 2023",
        remarks: "Electrical load calculations correct.",
      },
    ],
    assessmentFees: [
      { label: "Architectural Plan", amount: 15000.0 },
      { label: "Structural Plan", amount: 12000.0 },
      { label: "Electrical Plan", amount: 8000.0 },
      { label: "Processing Fee (3 plans)", amount: 750.0 },
      { label: "Building Inspection", amount: 0.0 },
      { label: "Fines / Surcharges / Penalties", amount: 0.0 },
      { label: "Certificate", amount: 0.0 },
      { label: "Adjustment", amount: 0.0 },
    ],
  },
  "BPA-2023-005": {
    applicantName: "Maria Santos",
    initials: "MS",
    dateApproved: "2023-09-01",
    constructionType: "Commercial Construction",
    status: "For Approval",
    plans: [
      { title: "Architectural Plan" },
      { title: "Structural Plan" },
      { title: "Electrical Plan" },
      { title: "Mechanical Plan" },
    ],
    evaluationSummary: [
      {
        title: "Architectural Plan",
        evaluator: "Engr. Pedro Reyes",
        date: "August 28, 2023",
        remarks: "Design meets commercial building standards.",
      },
      {
        title: "Structural Plan",
        evaluator: "Engr. Pedro Reyes",
        date: "August 29, 2023",
        remarks: "Load-bearing calculations verified.",
      },
      {
        title: "Electrical Plan",
        evaluator: "Engr. Ana Cruz",
        date: "August 30, 2023",
        remarks: "Electrical system design approved.",
      },
      {
        title: "Mechanical Plan",
        evaluator: "Engr. Ana Cruz",
        date: "August 30, 2023",
        remarks: "HVAC specifications verified.",
      },
    ],
    assessmentFees: [
      { label: "Architectural Plan", amount: 25000.0 },
      { label: "Structural Plan", amount: 20000.0 },
      { label: "Electrical Plan", amount: 15000.0 },
      { label: "Mechanical Plan", amount: 12000.0 },
      { label: "Processing Fee (4 plans)", amount: 1000.0 },
      { label: "Building Inspection", amount: 0.0 },
      { label: "Fines / Surcharges / Penalties", amount: 0.0 },
      { label: "Certificate", amount: 0.0 },
      { label: "Adjustment", amount: 0.0 },
    ],
  },
  "BPA-2023-012": {
    applicantName: "Roberto Garcia",
    initials: "RG",
    dateApproved: "2023-09-10",
    constructionType: "Industrial Construction",
    status: "For Approval",
    plans: [
      { title: "Architectural Plan" },
      { title: "Structural Plan" },
      { title: "Electrical Plan" },
      { title: "Plumbing Plan" },
      { title: "Fire Protection Plan" },
    ],
    evaluationSummary: [
      {
        title: "Architectural Plan",
        evaluator: "Arch. Luis Mendoza",
        date: "September 5, 2023",
        remarks: "Industrial facility layout approved.",
      },
      {
        title: "Structural Plan",
        evaluator: "Engr. Carlos Tan",
        date: "September 6, 2023",
        remarks: "Heavy load requirements satisfied.",
      },
      {
        title: "Electrical Plan",
        evaluator: "Engr. Carlos Tan",
        date: "September 7, 2023",
        remarks: "Industrial electrical system verified.",
      },
      {
        title: "Plumbing Plan",
        evaluator: "Engr. Jose Ramos",
        date: "September 8, 2023",
        remarks: "Plumbing system meets industrial standards.",
      },
      {
        title: "Fire Protection Plan",
        evaluator: "FO3 Ramon Silva",
        date: "September 9, 2023",
        remarks: "Fire suppression system approved.",
      },
    ],
    assessmentFees: [
      { label: "Architectural Plan", amount: 35000.0 },
      { label: "Structural Plan", amount: 30000.0 },
      { label: "Electrical Plan", amount: 25000.0 },
      { label: "Plumbing Plan", amount: 15000.0 },
      { label: "Fire Protection Plan", amount: 18000.0 },
      { label: "Processing Fee (5 plans)", amount: 1250.0 },
      { label: "Building Inspection", amount: 0.0 },
      { label: "Fines / Surcharges / Penalties", amount: 0.0 },
      { label: "Certificate", amount: 0.0 },
      { label: "Adjustment", amount: 0.0 },
    ],
  },
};

// Computed properties for current application data
const currentApplication = computed(() => {
  return (
    applicationsData[applicationNumber.value] ||
    applicationsData["BPA-2023-001"]
  );
});

const plans = computed(() => currentApplication.value.plans);
const evaluationSummary = computed(
  () => currentApplication.value.evaluationSummary
);
const assessmentFees = computed(() => currentApplication.value.assessmentFees);

const complianceItems = [
  {
    title: "Structural Compliance",
    points: [
      "All structural requirements met.",
      "Foundation design approved per National Structural Code.",
    ],
  },
  {
    title: "Fire Code Compliance",
    points: [
      "Fire exits properly placed.",
      "Fire-rated materials specified comply with Fire Code.",
    ],
  },
  {
    title: "Zoning Compliance",
    points: [
      "Setbacks meet requirements.",
      "Building height within allowable limits.",
    ],
  },
];

const totalAmount = computed(() => {
  return assessmentFees.value.reduce((acc, fee) => acc + fee.amount, 0);
});

const printSummary = () => window.print();
const goBack = () => router.back();

const handleApprove = () => {
  // TODO: Implement approval logic
  console.log("Application approved");
};

const closeReturnDialog = () => {
  showReturnDialog.value = false;
  returnRemarks.value = "";
};

const handleReturn = () => {
  // TODO: Implement return logic with remarks
  console.log("Application returned with remarks:", returnRemarks.value);
  closeReturnDialog();
};
</script>

<style scoped>
.page-container {
  max-width: 1460px;
  margin: 0 auto;
}

.border-b {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
</style>