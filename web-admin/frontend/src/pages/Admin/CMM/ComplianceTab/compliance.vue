<template>
  <v-app>
    <v-main style="background-color: #f5f6fa; padding-top: 15px">
      <div :style="s.pageContainer">
        <v-row class="mb-6">
          <v-col
            v-for="card in statCards"
            :key="card.key"
            cols="12"
            sm="6"
            md="3"
          >
            <div
              :style="s.statCard"
              role="button"
              @click="filterByStatus(card.clickStatus)"
            >
              <div :style="s.statLabel">{{ card.label }}</div>
              <div :style="s.statValueGroup">
                <div :style="s.statValue">{{ card.value }}</div>
                <v-icon :style="s.statInlineIcon" :color="card.iconColor">{{
                  card.icon
                }}</v-icon>
              </div>
            </div>
          </v-col>
        </v-row>

        <v-row class="mb-4 align-center no-gutters">
          <v-col cols="12" md="7">
            <v-tabs
              v-model="activeTab"
              color="primary"
              align-tabs="start"
              hide-slider
            >
              <v-tab value="applied" class="text-none font-weight-bold"
                >Applied Applicants</v-tab
              >
              <v-tab value="approved" class="text-none font-weight-bold"
                >Approved Building Permit Statuses</v-tab
              >
            </v-tabs>
          </v-col>
          <v-col cols="12" md="5" class="d-flex justify-end align-center">
            <div :style="s.searchWrapper">
              <v-text-field
                v-model="search"
                label="Search applicants..."
                prepend-inner-icon="mdi-magnify"
                density="compact"
                variant="solo"
                flat
                hide-details
                rounded="lg"
                bg-color="white"
                class="elevation-1"
              />
            </div>
            <v-btn
              variant="outlined"
              color="grey-darken-1"
              class="text-none font-weight-bold ml-2"
              prepend-icon="mdi-filter-variant"
              :style="s.filterBtnAlt"
              >FILTER</v-btn
            >
          </v-col>
        </v-row>

        <v-card class="elevation-1" :style="s.tableCard">
          <v-window v-model="activeTab">
            <v-window-item value="applied">
              <v-table class="custom-data-table">
                <thead>
                  <tr>
                    <th class="text-left" :style="s.tableHeader">
                      Applicant Name
                    </th>
                    <th class="text-left" :style="s.tableHeader">
                      Application Number
                    </th>
                    <th class="text-left" :style="s.tableHeader">Profession</th>
                    <th class="text-left" :style="s.tableHeader">
                      Date Submitted
                    </th>
                    <th class="text-left" :style="s.tableHeader">Status</th>
                    <th class="text-left" :style="s.tableHeader">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in filteredApplicants"
                    :key="item.applicationNumber"
                  >
                    <td class="py-2">
                      <div class="d-flex align-center">
                        <v-avatar
                          size="32"
                          :color="getAvatarColor(item.initials)"
                          class="me-2 text-white text-caption font-weight-bold"
                        >
                          {{ item.initials }}
                        </v-avatar>
                        <span>{{ item.name }}</span>
                      </div>
                    </td>
                    <td>{{ item.applicationNumber }}</td>
                    <td>{{ item.profession || "Engineer" }}</td>
                    <td>{{ item.dateSubmitted }}</td>
                    <td>
                      <span
                        :style="[s.statusPill, statusStyles[item.permitStatus]]"
                        >{{ item.permitStatus }}</span
                      >
                    </td>
                    <td>
                      <v-btn
                        size="small"
                        :style="s.viewBtn"
                        @click="viewDetails(item)"
                        >View Details</v-btn
                      >
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-window-item>

            <v-window-item value="approved">
              <v-table class="custom-data-table">
                <thead>
                  <tr>
                    <th class="text-left" :style="s.tableHeader">
                      Application Number
                    </th>
                    <th class="text-left" :style="s.tableHeader">
                      Applicant Name
                    </th>
                    <th class="text-left" :style="s.tableHeader">
                      BP Date Issued
                    </th>
                    <th class="text-left" :style="s.tableHeader">
                      NOC Submission
                    </th>
                    <th class="text-left" :style="s.tableHeader">Status</th>
                    <th class="text-left" :style="s.tableHeader">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in approvedApplicants"
                    :key="item.applicationNumber"
                  >
                    <td>{{ item.applicationNumber }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.dateIssued || "01/01/2025" }}</td>
                    <td>
                      <span
                        v-if="item.inspectionDate"
                        class="text-caption font-weight-bold text-primary"
                      >
                        Scheduled: {{ item.inspectionDate }}
                      </span>
                      <span v-else :style="s.statusPillInactive">Pending</span>
                    </td>
                    <td><span :style="s.statusPillInactive">ACTIVE</span></td>
                    <td class="d-flex align-center py-4">
                      <v-btn
                        size="small"
                        :style="s.emailBtn"
                        class="mr-2"
                        @click="sendEmail(item)"
                        >Email</v-btn
                      >
                      <v-btn
                        size="small"
                        :style="s.viewBtn"
                        @click="openInspectionDialog(item)"
                      >
                        {{
                          item.inspectionDate
                            ? "Update Inspection"
                            : "Set Inspection"
                        }}
                      </v-btn>
                      <v-menu location="bottom end">
                        <template v-slot:activator="{ props }">
                          <v-btn
                            icon="mdi-dots-vertical"
                            variant="text"
                            size="small"
                            class="ml-1"
                            v-bind="props"
                          ></v-btn>
                        </template>
                        <v-list density="compact">
                          <v-list-item @click="viewReport(item)">
                            <template #prepend
                              ><v-icon size="small"
                                >mdi-file-eye-outline</v-icon
                              ></template
                            >
                            <v-list-item-title>View Report</v-list-item-title>
                          </v-list-item>
                          <v-list-item @click="openToFollowDialog(item)">
                            <template #prepend
                              ><v-icon size="small"
                                >mdi-clipboard-text-clock-outline</v-icon
                              ></template
                            >
                            <v-list-item-title>To Follow</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-window-item>
          </v-window>
        </v-card>
      </div>
    </v-main>

    <v-dialog v-model="toFollowDialog" max-width="750px">
      <v-card rounded="lg">
        <v-card-title
          class="pa-4 bg-grey-lighten-4 font-weight-bold d-flex align-center"
        >
          <v-icon class="mr-2" color="primary">mdi-file-clock</v-icon>
          Clearances Status
          <v-spacer></v-spacer>
          <v-btn
            icon="mdi-close"
            variant="text"
            @click="toFollowDialog = false"
          ></v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-6">
          <div v-if="selectedItem" class="mb-6">
            <div class="text-overline text-grey-darken-1">
              APPLICANT DETAILS
            </div>
            <div class="text-h6 font-weight-bold">{{ selectedItem.name }}</div>
            <div class="text-caption text-grey-darken-1">
              {{ selectedItem.applicationNumber }}
            </div>
          </div>

          <v-table class="border rounded-lg overflow-hidden">
            <thead class="bg-grey-lighten-5">
              <tr>
                <th
                  class="text-left text-uppercase text-caption font-weight-bold py-4"
                >
                  Clearance Type
                </th>
                <th
                  class="text-left text-uppercase text-caption font-weight-bold py-4"
                >
                  Status & Timestamp
                </th>
                <th
                  class="text-center text-uppercase text-caption font-weight-bold py-4"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(status, type) in selectedItemClearances" :key="type">
                <td
                  class="font-weight-bold text-body-2 py-4"
                  style="color: #334155"
                >
                  {{ type }}
                </td>
                <td class="py-4">
                  <div class="d-flex flex-column">
                    <div class="d-flex align-center mb-1">
                      <v-icon
                        size="16"
                        :color="
                          status.submitted ? 'success' : 'orange-darken-1'
                        "
                        class="mr-1"
                      >
                        {{
                          status.submitted
                            ? "mdi-check-circle"
                            : "mdi-alert-circle"
                        }}
                      </v-icon>
                      <span
                        :class="
                          status.submitted
                            ? 'text-success'
                            : 'text-orange-darken-2'
                        "
                        class="text-caption font-weight-black"
                      >
                        {{
                          status.submitted ? "SUBMITTED" : "PENDING SUBMISSION"
                        }}
                      </span>
                    </div>
                    <div
                      v-if="status.submitted"
                      class="text-caption font-weight-medium text-grey-darken-1 ml-5"
                    >
                      Received: {{ status.date }} at {{ status.time }}
                    </div>
                  </div>
                </td>
                <td class="text-center py-4">
                  <v-btn
                    v-if="!status.submitted"
                    size="small"
                    color="primary"
                    elevation="0"
                    prepend-icon="mdi-bell-outline"
                    class="text-none font-weight-bold"
                    @click="notifyClearance(type)"
                  >
                    Notify
                  </v-btn>
                  <v-btn
                    v-else
                    size="small"
                    color="grey-lighten-3"
                    disabled
                    elevation="0"
                    class="text-none font-weight-bold text-grey-darken-1"
                  >
                    Notified
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn
            color="grey-darken-1"
            variant="text"
            class="text-none font-weight-bold"
            @click="toFollowDialog = false"
            >Close Window</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="inspectionDialog" max-width="500px" persistent>
      <v-card rounded="lg">
        <v-card-title class="pa-4 bg-grey-lighten-4 font-weight-bold">
          Set Inspection Schedule
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-6">
          <v-form ref="form" v-model="isFormValid">
            <v-text-field
              v-model="inspectionForm.location"
              label="Site Location"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-map-marker"
              readonly
              bg-color="grey-lighten-4"
              class="mb-4"
            />

            <v-select
              v-model="inspectionForm.inspector"
              :items="availableInspectors"
              label="Assign Inspector"
              placeholder="Select an available inspector"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-account-hard-hat"
              class="mb-4"
              :rules="[(v) => !!v || 'Please assign an inspector']"
            >
              <template v-slot:item="{ props, item }">
                <v-list-item
                  v-bind="props"
                  :subtitle="item.raw.role"
                ></v-list-item>
              </template>
            </v-select>

            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="inspectionForm.date"
                  label="Date"
                  type="date"
                  variant="outlined"
                  density="comfortable"
                  prepend-inner-icon="mdi-calendar"
                  :rules="[(v) => !!v || 'Date is required']"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="inspectionForm.time"
                  label="Time"
                  type="time"
                  variant="outlined"
                  density="comfortable"
                  prepend-inner-icon="mdi-clock-outline"
                  :rules="[(v) => !!v || 'Time is required']"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pa-4 justify-end">
          <v-btn
            variant="text"
            color="grey-darken-1"
            @click="inspectionDialog = false"
            >Cancel</v-btn
          >
          <v-btn
            color="primary"
            variant="flat"
            :disabled="!isFormValid"
            @click="saveInspection"
            >Save Schedule</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="reportDialog" max-width="600px">
      <v-card rounded="lg">
        <v-card-title class="pa-4 bg-primary text-white d-flex align-center">
          <v-icon class="mr-2">mdi-file-chart</v-icon>
          Construction Progress Report
          <v-spacer></v-spacer>
          <v-btn
            icon="mdi-close"
            variant="text"
            @click="reportDialog = false"
          ></v-btn>
        </v-card-title>
        <v-card-text class="pa-6">
          <div v-if="selectedReport" class="report-content">
            <v-row class="mb-4">
              <v-col cols="12" class="pb-0">
                <div class="text-overline mb-1">Applicant Name</div>
                <div class="text-h6">{{ selectedReport.name }}</div>
              </v-col>
              <v-col cols="12">
                <div class="text-overline mb-1">Project Site</div>
                <div class="text-body-1 font-weight-medium">
                  {{ selectedReport.location }}
                </div>
              </v-col>
            </v-row>
            <v-divider class="mb-6"></v-divider>
            <div class="d-flex align-center justify-space-between mb-4">
              <span class="text-subtitle-1 font-weight-bold"
                >Construction Started:</span
              >
              <v-chip
                :color="selectedReport.hasStarted ? 'success' : 'red'"
                text-color="white"
                class="font-weight-bold"
              >
                {{ selectedReport.hasStarted ? "YES" : "NO" }}
              </v-chip>
            </div>
            <v-card
              variant="outlined"
              color="grey-lighten-2"
              class="pa-4 bg-grey-lighten-5"
            >
              <div v-if="selectedReport.hasStarted">
                <div class="d-flex justify-space-between mb-2">
                  <span class="text-body-2">Current Progress:</span>
                  <span class="text-body-2 font-weight-bold"
                    >{{ selectedReport.percentage }}%</span
                  >
                </div>
                <v-progress-linear
                  :model-value="selectedReport.percentage"
                  color="success"
                  height="10"
                  rounded
                ></v-progress-linear>
                <div class="mt-4 text-body-2">
                  <strong>Last Inspection:</strong>
                  {{ selectedReport.lastChecked }}
                </div>
              </div>
              <div v-else class="text-center py-4">
                <v-icon color="grey" size="48">mdi-hard-hat</v-icon>
                <div class="text-grey-darken-1 mt-2">
                  No physical construction activity detected at this site yet.
                </div>
              </div>
            </v-card>
          </div>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="outlined"
            @click="reportDialog = false"
            >Close Report</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      location="top"
      elevation="24"
    >
      <div class="d-flex align-center">
        <v-icon class="me-3">{{ snackbar.icon }}</v-icon>
        {{ snackbar.text }}
      </div>
    </v-snackbar>
  </v-app>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const drawer = ref(true);
const activeTab = ref("applied");
const search = ref("");
const activeFilter = ref("Total");

const inspectionDialog = ref(false);
const reportDialog = ref(false);
const toFollowDialog = ref(false);
const isFormValid = ref(false);
const selectedItem = ref(null);
const selectedReport = ref(null);

const snackbar = ref({
  show: false,
  text: "",
  color: "success",
  icon: "mdi-check-circle",
});

const inspectionForm = ref({
  location: "",
  date: "",
  time: "",
  inspector: null,
});

// LIST OF AVAILABLE INSPECTORS
const availableInspectors = ref([
  {
    title: "Engr. Ricardo Gomez",
    role: "Chief Inspector",
    value: "Ricardo Gomez",
  },
  {
    title: "Arch. Elena Cruz",
    role: "Structural Specialist",
    value: "Elena Cruz",
  },
  { title: "Engr. Mateo Remeo", role: "Site Inspector", value: "Mateo Reyes" },
  {
    title: "Engr. Sofia Lim",
    role: "Electrical Inspector",
    value: "Sofia Lim",
  },
]);

const applicants = ref([
  {
    applicationNumber: "BP-2025-001-A",
    name: "Laurence Francisco",
    initials: "LF",
    profession: "Civil Engineer",
    dateSubmitted: "04/02/2025",
    dateIssued: "01/01/2025",
    permitStatus: "Pending",
    email: "laurence.f@email.com",
    inspectionDate: "2025-05-10",
    location: "Brgy. Concepcion Pequena, Naga City",
    constructionData: {
      hasStarted: true,
      percentage: 35,
      lastChecked: "June 12, 2025",
    },
    clearances: {
      "DOLE CLEARANCE": {
        submitted: true,
        date: "2025-01-10",
        time: "09:30 AM",
      },
      "DPWH CLEARANCE": { submitted: false, date: null, time: null },
      "BARANGAY CLEARANCES": {
        submitted: true,
        date: "2025-01-05",
        time: "02:15 PM",
      },
    },
  },
  {
    applicationNumber: "BP-2024-808234-T",
    name: "Aaron James Carter",
    initials: "AC",
    profession: "Architect",
    dateSubmitted: "04/02/2025",
    dateIssued: "08/10/2025",
    permitStatus: "Pending",
    email: "aaron.c@email.com",
    inspectionDate: null,
    location: "Magsaysay Ave., Naga City",
    constructionData: { hasStarted: false, percentage: 0, lastChecked: "N/A" },
    clearances: {
      "DOLE CLEARANCE": { submitted: false, date: null, time: null },
      "DPWH CLEARANCE": { submitted: false, date: null, time: null },
      "BARANGAY CLEARANCES": { submitted: false, date: null, time: null },
    },
  },
  {
    applicationNumber: "OP-2025-001",
    name: "Maria Santos",
    initials: "MS",
    profession: "Civil Engineer",
    dateSubmitted: "May 8, 2025",
    permitStatus: "Pending",
    email: "maria.santos@email.com",
    inspectionDate: null,
    location: "Panganiban Drive, Naga City",
    constructionData: { hasStarted: false, percentage: 0, lastChecked: "N/A" },
    clearances: {
      "DOLE CLEARANCE": {
        submitted: true,
        date: "2025-03-12",
        time: "10:00 AM",
      },
      "DPWH CLEARANCE": {
        submitted: true,
        date: "2025-03-14",
        time: "11:30 AM",
      },
      "BARANGAY CLEARANCES": {
        submitted: true,
        date: "2025-03-10",
        time: "03:45 PM",
      },
    },
  },
]);

const viewReport = (item) => {
  selectedReport.value = {
    name: item.name,
    location: item.location,
    ...item.constructionData,
  };
  reportDialog.value = true;
};

const openToFollowDialog = (item) => {
  selectedItem.value = item;
  toFollowDialog.value = true;
};

const selectedItemClearances = computed(() =>
  selectedItem.value ? selectedItem.value.clearances : {}
);

const notifyClearance = (type) => {
  snackbar.value = {
    show: true,
    text: `Notification sent to ${selectedItem.value.name} for ${type}`,
    color: "primary",
    icon: "mdi-bell-ring",
  };
};

const sendEmail = (item) => {
  snackbar.value = {
    show: true,
    text: `Email successfully sent to ${item.name}`,
    color: "blue-darken-3",
    icon: "mdi-email-check",
  };
};

const openInspectionDialog = (item) => {
  selectedItem.value = item;
  inspectionForm.value = {
    location: item.location,
    date: item.inspectionDate || "",
    time: item.inspectionTime || "",
    inspector: item.assignedInspector || null,
  };
  inspectionDialog.value = true;
};

const saveInspection = () => {
  if (selectedItem.value) {
    const index = applicants.value.findIndex(
      (a) => a.applicationNumber === selectedItem.value.applicationNumber
    );
    if (index !== -1) {
      applicants.value[index].inspectionDate = inspectionForm.value.date;
      applicants.value[index].inspectionTime = inspectionForm.value.time;
      applicants.value[index].assignedInspector =
        inspectionForm.value.inspector;
    }
    inspectionDialog.value = false;
    snackbar.value = {
      show: true,
      text: `Inspection set for ${inspectionForm.value.date} assigned to ${inspectionForm.value.inspector}`,
      color: "success",
      icon: "mdi-calendar-check",
    };
  }
};

const statCards = computed(() => [
  {
    key: "total",
    label: "Total Inspection Reports",
    value: applicants.value.length,
    clickStatus: "Total",
    icon: "mdi-account-group",
    iconColor: "#3b82f6",
  },
  {
    key: "pending",
    label: "Pending",
    value: applicants.value.filter((a) => a.permitStatus === "Pending").length,
    clickStatus: "Pending",
    icon: "mdi-clock",
    iconColor: "#f59e0b",
  },
  {
    key: "Approved",
    label: "Approved",
    value: applicants.value.filter((a) => a.permitStatus === "Approved").length,
    clickStatus: "Approved",
    icon: "mdi-check-circle",
    iconColor: "#22c55e",
  },
  {
    key: "violations",
    label: "With Violations",
    value: applicants.value.filter((a) => a.permitStatus === "With Violations")
      .length,
    clickStatus: "With Violations",
    icon: "mdi-alert",
    iconColor: "#ef4444",
  },
]);

const filteredApplicants = computed(() => {
  let data = applicants.value;
  if (activeFilter.value !== "Total")
    data = data.filter((a) => a.permitStatus === activeFilter.value);
  if (search.value) {
    const q = search.value.toLowerCase();
    data = data.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.applicationNumber.toLowerCase().includes(q)
    );
  }
  return data;
});

const approvedApplicants = computed(() =>
  applicants.value.filter((a) => a.permitStatus === "Approved" || a.dateIssued)
);
const filterByStatus = (status) => (activeFilter.value = status);
const viewDetails = (item) =>
  router.push({
    path: "/CMM/ComplianceTab/rqmonitoring",
    state: { complianceData: item },
  });
const logOut = () => console.log("Logging out...");
const getAvatarColor = (initials) => {
  const colors = { LF: "#3B82F6", AC: "#22C55E", MS: "#F59E0B" };
  return colors[initials] || "#6366f1";
};

const s = {
  pageContainer: {
    maxWidth: "1460px",
    margin: "16px auto 0",
    padding: "0 12px",
  },
  statCard: {
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    padding: "16px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "100px",
  },
  statLabel: { fontSize: "15px", color: "#475467", fontWeight: 500 },
  statValue: {
    fontSize: "36px",
    color: "#111827",
    fontWeight: 800,
    lineHeight: 1,
  },
  statValueGroup: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  statInlineIcon: { fontSize: "40px" },
  searchWrapper: { flexGrow: 1, maxWidth: "350px" },
  tableCard: { borderRadius: "12px", overflow: "hidden" },
  tableHeader: {
    background: "#f8fafc",
    color: "#334155",
    fontSize: "12px",
    fontWeight: 700,
    textTransform: "uppercase",
  },
  statusPill: {
    padding: "4px 10px",
    borderRadius: "16px",
    fontSize: "12px",
    fontWeight: 700,
  },
  statusPillInactive: {
    padding: "4px 10px",
    borderRadius: "16px",
    fontSize: "12px",
    fontWeight: 700,
    background: "#fee2e2",
    color: "#991b1b",
  },
  viewBtn: {
    background: "#3b82f6",
    color: "#fff",
    textTransform: "none",
    fontWeight: 600,
    borderRadius: "4px",
  },
  emailBtn: {
    background: "#ffffff",
    color: "#4b5563",
    border: "1px solid #d1d5db",
    textTransform: "none",
    fontWeight: 600,
    borderRadius: "4px",
  },
  filterBtnAlt: { borderRadius: "10px", height: "42px", boxShadow: "none" },
};

const statusStyles = {
  Pending: { background: "#fff7e6", color: "#92400e" },
  Passed: { background: "#e6f9ee", color: "#067647" },
  "With Violations": { background: "#fee2e2", color: "#991b1b" },
};
</script>

<style scoped>
.header-subtitle {
  font-size: 12px;
  font-weight: 600;
  color: #475467;
}
.header-title {
  font-size: 20px;
  font-weight: 800;
  color: #111827;
}
.v-tab--selected {
  border-bottom: 3px solid #1976d2 !important;
  color: #1976d2 !important;
}
.custom-data-table tr:hover {
  background-color: #f5f5f5 !important;
}
.custom-data-table tr td {
  border-bottom: 1px solid #e5e7eb;
}
.nav-item-style {
  color: #475467 !important;
  font-weight: 600;
  margin-bottom: 4px;
}
:deep(.v-list-item-title) {
  font-size: 14px !important;
}
</style>