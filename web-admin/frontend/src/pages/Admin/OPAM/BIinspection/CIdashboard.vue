<template>
  <div :style="s.pageContainer">
    <v-row class="mb-6">
      <v-col v-for="card in statCards" :key="card.key" cols="12" sm="6" md="3">
        <div :style="s.statCard" role="button" @click="filterByStatus(card.clickStatus)">
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

    <v-row class="mb-4 align-center">
      <v-col cols="12" sm="4" md="6"></v-col>

      <v-col cols="12" sm="8" md="6" class="d-flex justify-end align-center">
        <div :style="s.searchWrapper">
          <v-text-field
            v-model="search"
            label="Search applicants..."
            prepend-inner-icon="mdi-magnify"
            density="compact"
            variant="solo"
            rounded="lg"
            hide-details
            single-line
            :loading="loading"
            @click:append-inner="onClick"
          />
        </div>

        <v-menu :close-on-content-click="false" location="bottom right">
          <template #activator="{ props }">
            <v-btn :style="s.filterBtn" prepend-icon="mdi-filter-variant" v-bind="props"
              >Filter</v-btn
            >
          </template>
          <v-list>
            <v-list-item
              v-for="opt in filterOptions"
              :key="opt"
              @click="filterByStatus(opt)"
            >
              <v-list-item-title>{{ opt === "Total" ? "All" : opt }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>

    <v-card class="elevation-1" :style="s.tableCard">
      <v-table class="custom-data-table">
        <thead>
          <tr>
            <th
              v-for="header in appHeaders"
              :key="header.key"
              class="text-left"
              :style="[s.tableHeader, header.key === 'action' ? { width: '120px' } : {}]"
            >
              {{ header.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredApplicants" :key="item.applicationNumber">
            <td class="text-left">{{ item.applicationNumber }}</td>
            <td class="text-left py-2">
              <div class="d-flex align-center">
                <v-avatar
                  size="36"
                  :color="getAvatarColor(item.initials)"
                  class="me-2 text-white"
                  >{{ item.initials }}</v-avatar
                >
                <span>{{ item.name }}</span>
              </div>
            </td>
            <td class="text-left">{{ item.dateSubmitted }}</td>
            <td class="text-left">
              <span :style="[s.statusPill, statusStyles[applicantStatus(item)]]">
                {{ applicantStatus(item) }}
              </span>
            </td>
            <td class="text-left">
              <v-btn size="small" :style="s.viewBtn" @click="viewDetails(item)"
                >View Details</v-btn
              >
            </td>
          </tr>
        </tbody>
      </v-table>
      <div
        v-if="!filteredApplicants.length"
        class="text-center pa-4 text-medium-emphasis"
      >
        No applicants found matching the search or filter criteria.
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const activeTab = ref("applications");
const search = ref("");
const activeFilterApps = ref("Total");
const loading = ref(false);

const router = useRouter();

const applicants = ref([
  {
    applicationNumber: "OP-2025-001",
    name: "Maria Santos",
    initials: "MS",
    dateSubmitted: "May 8, 2025",
    permitStatus: "Pending",
  },
]);

const applicantStatus = (applicant) => {
  return applicant.permitStatus;
};

const statCards = computed(() => {
  const total = applicants.value.length;
  const pending = applicants.value.filter((a) => a.permitStatus === "Pending").length;
  const passed = applicants.value.filter((a) => a.permitStatus === "Passed").length;
  const violations = applicants.value.filter((a) => a.permitStatus === "With Violations")
    .length;

  return [
    {
      key: "total",
      label: "Total Inspection Reports",
      value: total,
      icon: "mdi-account-group",
      iconColor: "#3b82f6",
      clickStatus: "Total",
    },
    {
      key: "pending",
      label: "Pending Reports ",
      value: pending,
      icon: "mdi-clock-outline",
      iconColor: "#f59e0b",
      clickStatus: "Pending",
    },
    {
      key: "passed",
      label: "Passed",
      value: passed,
      icon: "mdi-check-circle-outline",
      iconColor: "#22c55e",
      clickStatus: "Passed",
    },
    {
      key: "violations",
      label: "With Violations",
      value: violations,
      icon: "mdi-alert-octagon-outline",
      iconColor: "#ef4444",
      clickStatus: "With Violations",
    },
  ];
});

const filteredApplicants = computed(() => {
  let filtered = applicants.value;
  if (activeFilterApps.value !== "Total") {
    filtered = filtered.filter((a) => applicantStatus(a) === activeFilterApps.value);
  }
  if (search.value) {
    const q = search.value.toLowerCase();
    filtered = filtered.filter(
      (a) =>
        a.name.toLowerCase().includes(q) || a.applicationNumber.toLowerCase().includes(q)
    );
  }

  return filtered;
});

function onClick() {
  loading.value = true;
  setTimeout(() => (loading.value = false), 2000);
}

const filterByStatus = (status) => {
  activeFilterApps.value = status;
};

const logOut = () => {
  console.log("Log Out clicked. User should be logged out.");
};

const filterOptions = computed(() => ["Total", "Pending", "Passed", "With Violations"]);

const stringToHslColor = (str, s, l) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  const h = hash % 360;
  return `hsl(${h}, ${s}%, ${l}%)`;
};

const getAvatarColor = (initials) => {
  const defined = {
    MS: "#F59E0B",
    ND: "#3B82F6",
  };
  return defined[initials] ?? stringToHslColor(initials, 45, 75);
};

const viewDetails = (item) => {
  const status = applicantStatus(item);

  if (status === "Pending") {
    router.push("/opam/bi-inspection/ci-report");
    console.log(
      `Navigating to /opam/bi-inspection/ci-report for pending application: ${item.applicationNumber}`
    );
  }
};
const appHeaders = [
  { title: "Application Number", key: "applicationNumber", sortable: false },
  { title: "Applicant Name", key: "name", sortable: false },
  { title: "Date Submitted", key: "dateSubmitted", sortable: true },
  { title: "Status", key: "status", sortable: true },
  { title: "Action", key: "action", sortable: false },
];

const s = {
  topToolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 24px",
    background: "#fff",
    borderBottom: "1px solid #e8eaf0",
  },
  textToolbar: { color: "#111827" },
  pageContainer: {
    maxWidth: "1460px",
    margin: "16px auto 0",
    padding: "0 12px",
  },
  statCard: {
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    padding: "16px",
    minHeight: "100px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "transform 0.1s ease-in-out",
  },
  statLabel: {
    fontSize: "15px",
    color: "#475467",
    fontWeight: 500,
    marginBottom: "8px",
  },
  statValueGroup: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  statValue: {
    fontSize: "36px",
    color: "#111827",
    fontWeight: 800,
    lineHeight: 1,
  },
  statInlineIcon: {
    fontSize: "40px",
    lineHeight: 1,
  },
  filterBtn: {
    background: "#e5e7eb",
    color: "#4b5563",
    borderRadius: "10px",
    textTransform: "none",
    fontWeight: 600,
    height: "42px",
    boxShadow: "none",
  },
  searchWrapper: {
    flexGrow: 1,
    maxWidth: "350px",
    marginRight: "8px",
  },
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
  viewBtn: {
    background: "#3b82f6",
    color: "#fff",
    textTransform: "none",
    fontWeight: 600,
    borderRadius: "4px",
  },
  profileBtn: {
    backgroundColor: "transparent",
    boxShadow: "none",
    padding: 0,
    minWidth: "unset",
  },
};

const statusStyles = {
  Passed: { background: "#e6f9ee", color: "#067647" },
  Pending: { background: "#fff7e6", color: "#92400e" },
  "With Violations": { background: "#fee2e2", color: "#991b1b" },
};
</script>

<style scoped>
.custom-data-table tr:hover {
  background-color: #f5f5f5 !important;
}
.custom-data-table tr td {
  border-bottom: 1px solid #e5e7eb;
}
</style>
