<template>
  <div class="page-container px-3 pb-8 mt-6">
    <div class="mb-4 px-2">
      <v-btn color="blue-darken-2" variant="text" class="mb-2" @click="goBack">
        <v-icon start>mdi-arrow-left</v-icon> Back
      </v-btn>
    </div>

    <div class="d-flex align-center mb-4 px-2">
      <v-icon color="#2563eb" class="mr-3" size="40"
        >mdi-office-building</v-icon
      >
      <h1 class="gov-header font-weight-bold text-grey-darken-4">
        Evaluation Monitoring
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
          <v-icon start icon="mdi-format-list-checks" class="mr-2"></v-icon>
          Building Plans Evaluation
        </v-tab>
      </v-tabs>

      <div class="pa-6 pa-md-8 bg-white gov-body">
        <v-window v-model="activeTab">
          <v-window-item value="application">
            <v-row>
              <v-col cols="12">
                <v-card class="rounded-lg border mb-6" flat>
                  <v-card-title
                    class="bg-blue-lighten-5 text-blue-darken-3 font-weight-bold py-3"
                    style="font-size: 20px"
                  >
                    <v-icon start class="mr-2">mdi-certificate-outline</v-icon>
                    Permit Information
                  </v-card-title>
                  <v-card-text class="pa-6">
                    <v-row>
                      <v-col cols="12" md="4">
                        <div class="mb-4">
                          <div class="label-style">BP No.:</div>
                          <div class="value-style">
                            {{ permitInfo.bpNo || "---" }}
                          </div>
                        </div>
                        <div>
                          <div class="label-style">Issued On:</div>
                          <div class="value-style">
                            {{ permitInfo.bpIssuedOn || "---" }}
                          </div>
                        </div>
                      </v-col>
                      <v-col cols="12" md="4">
                        <div class="mb-4">
                          <div class="label-style">OP No.:</div>
                          <div class="value-style">
                            {{ permitInfo.opNo || "---" }}
                          </div>
                        </div>
                        <div>
                          <div class="label-style">Issued On:</div>
                          <div class="value-style">
                            {{ permitInfo.opIssuedOn || "---" }}
                          </div>
                        </div>
                      </v-col>
                      <v-col cols="12" md="4">
                        <div class="label-style">Type of Application:</div>
                        <div class="value-style text-blue-darken-2">
                          {{ permitInfo.applicationType || "---" }}
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>

                <v-card class="rounded-lg border mb-6" flat>
                  <v-card-title
                    class="bg-blue-lighten-5 text-blue-darken-3 font-weight-bold py-3"
                    style="font-size: 20px"
                  >
                    <v-icon start class="mr-2">mdi-account-outline</v-icon>
                    Application Information
                  </v-card-title>
                  <v-card-text class="pa-6">
                    <v-row>
                      <v-col cols="12" md="6">
                        <div class="mb-4">
                          <div class="label-style">Applicant Name:</div>
                          <div class="value-style">
                            {{ applicantDetails.applicantName || "---" }}
                          </div>
                        </div>
                        <div class="mb-4">
                          <div class="label-style">Address:</div>
                          <div class="value-style">
                            {{ applicantDetails.address || "---" }}
                          </div>
                        </div>
                        <div class="mb-4">
                          <div class="label-style">Project Name:</div>
                          <div class="value-style">
                            {{ applicantDetails.projectName || "---" }}
                          </div>
                        </div>
                        <div>
                          <div class="label-style">TCT No.:</div>
                          <div class="value-style">
                            {{ applicantDetails.tctNo || "---" }}
                          </div>
                        </div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <div class="mb-4">
                          <div class="label-style">Enterprise Name:</div>
                          <div class="value-style">
                            {{ applicantDetails.enterpriseName || "---" }}
                          </div>
                        </div>
                        <div class="mb-4">
                          <div class="label-style">Form of Ownership:</div>
                          <div class="value-style">
                            {{ applicantDetails.formOfOwnership || "---" }}
                          </div>
                        </div>
                        <div class="mb-4">
                          <div class="label-style">Location:</div>
                          <div class="value-style">
                            {{ applicantDetails.location || "---" }}
                          </div>
                        </div>
                        <div>
                          <div class="label-style">TD No.:</div>
                          <div class="value-style">
                            {{ applicantDetails.tdNo || "---" }}
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>

                <v-card class="rounded-lg border mb-6" flat>
                  <v-card-title
                    class="bg-blue-lighten-5 text-blue-darken-3 font-weight-bold py-3"
                    style="font-size: 20px"
                  >
                    <v-icon start class="mr-2">mdi-home-city-outline</v-icon>
                    Project Details
                  </v-card-title>
                  <v-card-text class="pa-6">
                    <v-row>
                      <v-col cols="12" md="6">
                        <div class="mb-4">
                          <div class="label-style">
                            Use/Character of Occupancy:
                          </div>
                          <div class="value-style">
                            {{ projectDetails.occupancyUse || "---" }}
                          </div>
                        </div>
                        <div class="mb-4">
                          <div class="label-style">Total Floor Area (sqm):</div>
                          <div class="value-style">
                            {{ projectDetails.totalFloorArea || "---" }}
                          </div>
                        </div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <div class="mb-4">
                          <div class="label-style">Scope of Work:</div>
                          <div class="value-style">
                            {{ projectDetails.scopeOfWork || "---" }}
                          </div>
                        </div>
                        <div>
                          <div class="label-style">No. of Storey/s:</div>
                          <div class="value-style">
                            {{ projectDetails.noOfStoreys || "---" }}
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>

                <v-card class="rounded-lg border" flat>
                  <v-card-title
                    class="bg-blue-lighten-5 text-blue-darken-3 font-weight-bold py-3"
                    style="font-size: 20px"
                  >
                    <v-icon start class="mr-2">mdi-cash-multiple</v-icon>
                    Summary of Actual Cost
                  </v-card-title>
                  <v-card-text class="pa-6">
                    <v-row>
                      <v-col cols="12" md="4">
                        <div class="label-style">Total Cost:</div>
                        <div class="value-style text-success">
                          {{ actualCost.totalCost || "---" }}
                        </div>
                      </v-col>
                      <v-col cols="12" md="8">
                        <div class="label-style">Supervising Professional:</div>
                        <div class="value-style">
                          {{ supervisingProf.name }} (PRC:
                          {{ supervisingProf.prcNo }})
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-window-item>

          <v-window-item value="checklist">
            <div class="mb-6">
              <h2 class="text-h6 font-weight-bold mb-4 text-grey-darken-3">
                Technical Plan Evaluation Status
              </h2>

              <v-table
                class="evaluation-table border rounded-lg overflow-hidden"
              >
                <thead>
                  <tr class="bg-grey-lighten-4">
                    <th class="text-subtitle-2 font-weight-bold">Plan Type</th>
                    <th class="text-subtitle-2 font-weight-bold">
                      Assigned Engineer
                    </th>
                    <th class="text-subtitle-2 font-weight-bold">
                      Latest Remark
                    </th>
                    <th class="text-subtitle-2 font-weight-bold">Status</th>
                    <th class="text-subtitle-2 font-weight-bold text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(plan, index) in evaluations" :key="index">
                    <td class="font-weight-bold py-4">
                      <div class="d-flex align-center">
                        <v-icon color="red-darken-1" class="mr-2"
                          >mdi-file-pdf-box</v-icon
                        >
                        {{ plan.type }}
                      </div>
                    </td>
                    <td>{{ plan.engineer }}</td>
                    <td class="text-grey-darken-1">{{ plan.remark }}</td>
                    <td>
                      <v-chip
                        :color="getStatusColor(plan.status)"
                        size="small"
                        label
                        class="font-weight-bold px-4"
                      >
                        {{ plan.status }}
                      </v-chip>
                    </td>
                    <td class="text-center">
                      <v-btn
                        variant="outlined"
                        color="blue-darken-2"
                        size="small"
                        class="text-none font-weight-bold"
                        @click="viewLog(plan)"
                      >
                        VIEW LOG
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </div>
          </v-window-item>
        </v-window>
      </div>
    </v-card>

    <v-dialog v-model="historyDialog" max-width="700">
      <v-card class="rounded-xl pa-4" v-if="selectedPlan">
        <v-card-title class="d-flex align-center">
          <v-avatar color="blue-darken-1" class="mr-3" size="40">
            <v-icon color="white">mdi-history</v-icon>
          </v-avatar>
          <div>
            <div class="text-h6 font-weight-bold">Transaction History</div>
            <div class="text-caption text-grey">
              {{ selectedPlan.type }} | Progress: {{ selectedPlan.progress }}%
            </div>
          </div>
          <v-spacer></v-spacer>
          <v-btn
            icon="mdi-close"
            variant="text"
            @click="historyDialog = false"
          ></v-btn>
        </v-card-title>

        <v-card-text class="pt-4">
          <v-progress-linear
            :model-value="selectedPlan.progress"
            color="blue"
            height="8"
            rounded
            class="mb-8"
          ></v-progress-linear>

          <v-timeline density="compact" align="start" side="end">
            <v-timeline-item
              v-for="(log, lIdx) in selectedPlan.logs"
              :key="lIdx"
              dot-color="blue"
              size="x-small"
            >
              <div class="d-flex flex-column mb-4">
                <div class="d-flex justify-space-between align-center mb-1">
                  <div class="text-subtitle-2 font-weight-bold">
                    {{ log.date }}
                  </div>
                  <v-chip
                    :color="getStatusColor(log.status)"
                    size="x-small"
                    label
                    class="font-weight-black"
                  >
                    {{ log.status }}
                  </v-chip>
                </div>
                <div class="text-caption text-grey-darken-1 mb-2">
                  {{ log.time }}
                </div>
                <div
                  class="bg-grey-lighten-4 pa-3 rounded-lg text-body-2 border-l-md border-blue"
                >
                  {{ log.remark }}
                </div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>

        <v-card-actions class="pa-4 bg-grey-lighten-5 rounded-lg">
          <v-icon size="small" class="mr-2">mdi-account-hard-hat</v-icon>
          <span class="text-caption"
            >Assigned Engineer:
            <strong>{{ selectedPlan.engineer }}</strong></span
          >
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            prepend-icon="mdi-bell-ring"
            class="text-none px-4"
            rounded="lg"
            variant="flat"
          >
            Notify Personnel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const activeTab = ref("application");
const historyDialog = ref(false);
const selectedPlan = ref<any>(null);

// APPLICANT DATA
const permitInfo = ref({
  bpNo: "BP-2025-101",
  bpIssuedOn: "Jan 12, 2025",
  opNo: "",
  opIssuedOn: "",
  applicationType: "Commercial Building",
});
const applicantDetails = ref({
  applicantName: "John Doe",
  address: "123 Emerald Ave",
  projectName: "Zenith Tower",
  location: "District 2",
  tctNo: "T-12345",
  enterpriseName: "Zenith Corp",
  formOfOwnership: "Corporation",
  tdNo: "TD-9988",
});
const projectDetails = ref({
  occupancyUse: "Business/Commercial",
  totalFloorArea: "1,200 sqm",
  noOfUnits: "12",
  scopeOfWork: "New Construction",
  noOfStoreys: "4",
  completionDate: "Dec 30, 2025",
});
const actualCost = ref({
  materials: "₱ 5,000,000",
  equipment: "₱ 1,200,000",
  totalCost: "₱ 6,200,000",
});
const supervisingProf = ref({
  name: "Arch. Romeo Dela Cruz",
  prcNo: "0012345",
});

// EVALUATION DATA (Including Electronic Plans)
const evaluations = ref([
  {
    type: "Architectural Plans",
    engineer: "Arch. Romeo",
    remark: "Spatial floor plan review in progress.",
    status: "Under Evaluation",
    progress: 65,
    logs: [
      {
        date: "Dec 28, 2025",
        time: "02:30 PM",
        status: "EVALUATING",
        remark: "Spatial floor plan review in progress.",
      },
      {
        date: "Dec 20, 2025",
        time: "09:00 AM",
        status: "SUBMITTED",
        remark: "Digital blueprints received.",
      },
    ],
  },
  {
    type: "Structural Plans",
    engineer: "Engr. Santos",
    remark: "Load calculation for C2 beam missing.",
    status: "Returned",
    progress: 40,
    logs: [
      {
        date: "Jan 05, 2026",
        time: "10:15 AM",
        status: "RETURNED",
        remark: "Load calculation for C2 beam missing. Please check Page 4.",
      },
    ],
  },
  {
    type: "Electrical Plans",
    engineer: "Engr. Lopez",
    remark: "All load schedules verified.",
    status: "Verified",
    progress: 100,
    logs: [
      {
        date: "Jan 10, 2026",
        time: "04:00 PM",
        status: "VERIFIED",
        remark: "All load schedules verified and approved.",
      },
    ],
  },
  {
    type: "Electronic Plans",
    engineer: "Engr. Gomez",
    remark: "Awaiting review of Fire Alarm layout.",
    status: "Under Evaluation",
    progress: 20,
    logs: [
      {
        date: "Jan 15, 2026",
        time: "11:00 AM",
        status: "EVALUATING",
        remark: "Checking FDAS and Telecommunication diagrams.",
      },
    ],
  },
  {
    type: "Mechanical Plans",
    engineer: "Engr. Rivera",
    remark: "Awaiting evaluation",
    status: "Pending",
    progress: 0,
    logs: [],
  },
]);

const getStatusColor = (status: string) => {
  const s = status.toLowerCase();
  if (s.includes("evaluation") || s === "evaluating")
    return "blue-lighten-4 text-blue-darken-4";
  if (s.includes("returned")) return "red-lighten-4 text-red-darken-4";
  if (s.includes("verified")) return "green-lighten-4 text-green-darken-4";
  return "grey-lighten-3 text-grey-darken-2";
};

const viewLog = (plan: any) => {
  selectedPlan.value = plan;
  historyDialog.value = true;
};

const goBack = () => router.back();
</script>

<style scoped>
.gov-header {
  font-size: 36px !important;
  font-family: Arial, sans-serif !important;
}
.gov-body {
  font-size: 16px !important;
  line-height: 1.7 !important;
  font-family: Arial, sans-serif !important;
}
.page-container {
  max-width: 1460px;
  margin: 0 auto;
}

.label-style {
  font-size: 11px;
  text-transform: uppercase;
  color: #757575;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
  font-weight: 600;
}
.value-style {
  font-size: 16px;
  font-weight: 700;
  color: #212121;
}

.evaluation-table :deep(th) {
  height: 56px !important;
  color: #455a64 !important;
  font-weight: bold !important;
  text-transform: uppercase;
  font-size: 12px;
}
.evaluation-table :deep(td) {
  height: 64px !important;
}

.v-timeline--density-compact :deep(.v-timeline-item__body) {
  width: 100%;
}
.border-l-md {
  border-left: 4px solid !important;
}
</style>