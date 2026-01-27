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
          value="checklist"
          class="font-weight-medium text-capitalize"
          style="font-size: 16px"
        >
          <v-icon start icon="mdi-format-list-checks" class="mr-2"></v-icon> Checklist
        </v-tab>
        <v-tab
          value="schedule"
          class="font-weight-medium text-capitalize"
          style="font-size: 16px"
        >
          <v-icon start icon="mdi-calendar-check" class="mr-2"></v-icon> Inspection
          Schedule
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
            <ChecklistTab :sections="documentaryData.sections" />
          </v-window-item>

          <!-- Tab 3: Inspection Schedule -->
          <v-window-item value="schedule">
            <InspectionScheduleTab
              :inspection-details="inspectionDetails"
              @schedule-inspection="scheduleInspection"
              @send-schedule="sendSchedule"
            />
          </v-window-item>
        </v-window>
      </div>
    </v-card>

    <!-- Schedule Inspection Modal -->
    <SchedulingModal
      v-model="dialog"
      :inspectors-list="inspectorsList"
      @submit="handleScheduleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import ApplicantDetails from "@/pages/Admin/OPAM/ApplicantDetails.vue";
import ChecklistTab from "./tabs/ChecklistTab.vue";
import InspectionScheduleTab from "./tabs/InspectionScheduleTab.vue";
import SchedulingModal from "./modal/SchedulingModal.vue";

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
            "Construction Logbook, signed and sealed by the Owner’s Architect or Civil Engineer who undertook full-time inspection and supervision;",
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

const dialog = ref(false);

const inspectionDetails = ref({
  date: null,
  time: null,
  works: {
    architectural: {
      label: "Architectural Works",
      inspector: "",
      status: "Pending",
    },
    civilStructural: {
      label: "Civil/Structural Works",
      inspector: "",
      status: "Pending",
    },
    electrical: {
      label: "Electrical Works",
      inspector: "",
      status: "Pending",
    },
    sanitaryPlumbing: {
      label: "Sanitary Plumbing Works",
      inspector: "",
      status: "Pending",
    },
  },
});

const inspectorsList = {
  architectural: ["Arch. Joyce Oberos", "Arch. Anne Dela Cruz", "Arch. Mark Villanueva"],
  civilStructural: ["Eng. Roberto Martinez", "Eng. Brian Santos", "Eng. Lyka Gomez"],
  electrical: ["Eng. Bernadette Veroza", "Eng. Claire Garcia", "Eng. John Paul Lim"],
  sanitaryPlumbing: ["Eng. Andrew Villapane", "Eng. D. Reyes", "Eng. M. Fernandez"],
};

interface ScheduleData {
  date: string;
  time: string;
  inspectors: {
    architectural: string;
    civilStructural: string;
    electrical: string;
    sanitaryPlumbing: string;
  };
}

const scheduleInspection = () => {
  dialog.value = true;
};

const sendSchedule = () => {
  alert("Schedule sent!");
};

const handleScheduleSubmit = (data: ScheduleData) => {
  inspectionDetails.value.date = data.date;
  inspectionDetails.value.time = data.time;
  inspectionDetails.value.works.architectural.inspector = data.inspectors.architectural;
  inspectionDetails.value.works.architectural.status = "Pending";
  inspectionDetails.value.works.civilStructural.inspector = data.inspectors.civilStructural;
  inspectionDetails.value.works.civilStructural.status = "Pending";
  inspectionDetails.value.works.electrical.inspector = data.inspectors.electrical;
  inspectionDetails.value.works.electrical.status = "Pending";
  inspectionDetails.value.works.sanitaryPlumbing.inspector = data.inspectors.sanitaryPlumbing;
  inspectionDetails.value.works.sanitaryPlumbing.status = "Pending";
};

const goBack = () => router.back();
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

.whats-next-card {
  background-color: #eff6ff !important;
  border: 1px solid #bfdbfe !important;
  border-radius: 12px !important;
}

.next-step-item {
  padding-left: 4px;
}

.custom-checkbox :deep(.v-label) {
  opacity: 1;
  font-size: 16px !important;
}

.custom-checkbox-checked :deep(.v-label) {
  opacity: 1 !important;
  font-size: 16px !important;
  color: #000000 !important;
}

.custom-checkbox-checked :deep(.v-selection-control__input) {
  color: #1565c0 !important;
}

.custom-checkbox-checked :deep(.v-checkbox .v-selection-control) {
  opacity: 1 !important;
}

.unified-tab-card {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #ffffff;
  overflow: hidden;
}

.tab-header-section {
  padding: 20px 24px;
  background: #f8fafc;
  border-bottom: 1px solid #e5e7eb;
}

.tab-title-section {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.tab-icon-wrapper {
  width: 48px;
  height: 48px;
  background: #3b82f6;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-icon {
  color: #ffffff;
  font-size: 24px;
}

.tab-title-content {
  flex: 1;
}

.tab-title {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 4px 0;
}

.tab-subtitle {
  font-size: 14px;
  color: #64748b;
  margin: 0;
}

.tab-divider {
  height: 1px;
  background: #e5e7eb;
}

.tab-content-section {
  padding: 24px;
}

.content-section {
  margin-bottom: 24px;
}

.section-header {
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.info-field {
  margin-bottom: 8px;
}

.field-label {
  font-size: 12px;
  text-transform: uppercase;
  color: #6b7280;
  margin-bottom: 4px;
  letter-spacing: 0.5px;
}

.field-value {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
}

.monitor-item {
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 12px;
  background: #fafafa;
}

.inspector-name {
  font-size: 13px;
  color: #6b7280;
  margin-top: 8px;
  margin-left: 28px;
}

.status-pill {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
}

.empty-state-content {
  max-width: 400px;
}

.empty-state-title {
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
}

.empty-state-subtitle {
  font-size: 14px;
  color: #6b7280;
}

</style>
