<template>
  <div class="page-container px-3 pb-8 mt-6">
        <div class="mb-4 px-2">
          <v-btn color="blue-darken-2" variant="text" class="mb-2" @click="goBack">
            <v-icon start>mdi-arrow-left</v-icon> Back
          </v-btn>
        </div>

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
              value="application"
              class="font-weight-medium text-capitalize"
              style="font-size: 16px"
            >
              <v-icon start icon="mdi-file-document-outline" class="mr-2"></v-icon>
              Applicant Details
            </v-tab>
            <v-tab
              value="inspection-report"
              class="font-weight-medium text-capitalize"
              style="font-size: 16px"
            >
              <v-icon start icon="mdi-clipboard-check-outline" class="mr-2"></v-icon>
              Inspection Report
            </v-tab>
          </v-tabs>

          <div class="pa-6 pa-md-8 bg-white gov-body">
            <v-window v-model="activeTab">
              <v-window-item value="application">
                <ApplicantDetails
                  :permit-info="permitInfo"
                  :applicant-details="applicantDetails"
                  :project-details="projectDetails"
                  :actual-cost="actualCost"
                  :supervising-prof="supervisingProf"
                />
              </v-window-item>

              <!-- Tab 2: Inspection Report -->
              <v-window-item value="inspection-report">
                <InspectionReportTab
                  :requirements="inspectionRequirements"
                  :checked-requirements="checkedRequirements"
                  :remarks="inspectionRemarks"
                  @update:checked-requirements="checkedRequirements = $event"
                  @update:remarks="inspectionRemarks = $event"
                  @submit="submitReport"
                />
              </v-window-item>
            </v-window>
          </div>
        </v-card>
      </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import ApplicantDetails from "@/pages/Admin/OPAM/ApplicantDetails.vue";
import InspectionReportTab from "./tabs/InspectionReportTab.vue";

const router = useRouter();
const activeTab = ref("application");

const permitInfo = ref({
  bpNo: "",
  bpIssuedOn: "",
  opNo: "",
  opIssuedOn: "",
  applicationType: "",
});

const applicantDetails = ref({
  applicantName: "",
  address: "",
  projectName: "",
  location: "",
  tctNo: "",
  enterpriseName: "",
  formOfOwnership: "",
  tdNo: "",
});

const projectDetails = ref({
  occupancyUse: "",
  totalFloorArea: "",
  noOfUnits: "",
  startOfConstruction: "",
  scopeOfWork: "",
  noOfStoreys: "",
  completionDate: "",
});

const actualCost = ref({
  materials: "",
  equipment: "",
  directLabor: "",
  totalCost: "",
  otherCost: "",
});

const supervisingProf = ref({
  name: "",
  prcNo: "",
  prcValidity: "",
  ptrNo: "",
  ptrValidity: "",
});

// Inspection Report Tab Data
const checkedRequirements = ref<string[]>([]);
const inspectionRemarks = ref<Record<string, string>>({});

const inspectionRequirements = [
  "Site Development Setting",
  "Fire Safety Requirements",
  "Occupancy/Use & Functionalities",
  "Architectural Deficiencies & Parking Requirements",
  "Light & Ventilation",
  "Accessories Control Location",
  "BP 344 Requirements",
  "Mechanical Requirements",
];

const goBack = () => router.back();
const submitReport = () => alert("Report Submitted Successfully");
</script>

<style scoped>
.gov-body {
  font-size: 16px !important;
  line-height: 1.7 !important;
  font-family: Arial, Helvetica, sans-serif !important;
}

.page-container {
  max-width: 1460px;
  margin: 0 auto;
}

.label-style {
  font-size: 12px;
  text-transform: uppercase;
  color: #757575;
  margin-bottom: 4px;
}

.value-style {
  font-size: 16px;
  font-weight: 700;
  color: #212121;
}

.reason-input :deep(.v-field__input) {
  font-size: 12px !important;
  min-height: 28px !important;
  padding: 4px 8px !important;
}

.checklist-item-wrapper {
  margin-bottom: 2px;
}

.inspection-checkbox :deep(.v-selection-control) {
  min-height: 24px !important;
}

.inspection-checkbox :deep(.v-label) {
  font-size: 12px !important;
  opacity: 1 !important;
  padding-inline-start: 8px !important;
}
</style>
