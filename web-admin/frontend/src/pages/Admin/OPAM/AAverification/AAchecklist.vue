<template>
  <div class="page-container px-3 pb-8 mt-6">
    <div class="mb-4 px-2">
      <v-btn color="blue-darken-2" variant="text" class="mb-2" @click="goBack">
        <v-icon start>mdi-arrow-left</v-icon> Back
      </v-btn>
    </div>

    <div class="d-flex align-center mb-4 px-2">
      <v-icon color="#2563eb" class="mr-3" size="40">mdi-office-building</v-icon>
      <h1 class="gov-header font-weight-bold text-grey-darken-4">
        Occupancy Permit Application
      </h1>
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
          value="checklist"
          class="font-weight-medium text-capitalize"
          style="font-size: 16px"
        >
          <v-icon start icon="mdi-format-list-checks" class="mr-2"></v-icon> Checklist
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

          <v-window-item value="checklist">
            <Checklist
              :sections="documentaryData.sections"
              :is-submitted="isSubmitted"
              @submit="saveChecklist"
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
import ApplicantDetails from "../ApplicantDetails.vue";
import Checklist from "./tabs/Checklist.vue";

const router = useRouter();
const activeTab = ref("application");
const isSubmitted = ref(false);

// DATA RESET TO BLANK
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

const documentaryData = ref({
  sections: [
    {
      title: "Occupancy Requirements Checklist",
      items: [
        {
          text:
            "Two (2) copies of accomplished Unified Application form for Certificate of Occupancy, duly notarized;",
          checked: false,
          remarks: "",
        },
        {
          text: "Two (2) copies of Certificate of Completion, duly notarized;",
          checked: false,
          remarks: "",
        },
        {
          text:
            "Construction Logbook, signed and sealed by the Owner's Architect or Civil Engineer who undertook full-time inspection and supervision;",
          checked: false,
          remarks: "",
        },
        {
          text:
            "Two (2) photocopies of the valid licenses of all involved professionals;",
          checked: false,
          remarks: "",
        },
        {
          text:
            "Photograph of the structure with substantial completion showing front, sides, and rear areas;",
          checked: false,
          remarks: "",
        },
        {
          text:
            "Two (2) sets of As-Built Plans, if there are changes in the building plans covered by the issued Building Permit;",
          checked: false,
          remarks: "",
        },
        {
          text: "Two (2) copies of Certificate of Final Electrical Inspection;",
          checked: false,
          remarks: "",
        },
        {
          text:
            "Two (2) copies of Fire Safety Inspection Certificate from the Bureau of Fire and Protection;",
          checked: false,
          remarks: "",
        },
        {
          text: "Sketch map indicating the location of the project;",
          checked: false,
          remarks: "",
        },
        {
          text: "Others:",
          checked: false,
          remarks: "",
        },
      ],
    },
  ],
});

const goBack = () => router.back();
const saveChecklist = () => {
  isSubmitted.value = true;
  alert("Checklist saved!");
};
</script>

<style scoped>
.gov-header {
  font-size: 36px !important;
  font-family: Arial, Helvetica, sans-serif !important;
}

.gov-body {
  font-size: 16px !important;
  line-height: 1.7 !important;
  font-family: Arial, Helvetica, sans-serif !important;
}

.page-container {
  max-width: 1460px;
  margin: 0 auto;
}
</style>
