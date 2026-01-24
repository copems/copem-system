<template>
  <div :style="s.pageContainer">
    <v-row class="mb-6">
      <v-col v-for="card in statCards" :key="card.key" cols="12" sm="6" md="3">
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
            <v-btn
              :style="s.filterBtn"
              prepend-icon="mdi-filter-variant"
              v-bind="props"
              >Filter</v-btn
            >
          </template>
          <v-list>
            <v-list-item
              v-for="opt in filterOptions"
              :key="opt"
              @click="filterByStatus(opt)"
            >
              <v-list-item-title>{{
                opt === "Total" ? "All" : opt
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>

    <v-card class="elevation-1" :style="s.tableCard">
      <v-table class="custom-data-table" fixed-header>
        <thead>
          <tr>
            <th
              v-for="header in headers"
              :key="header.key"
              class="text-left"
              :style="[s.tableHeader, { width: header.width }]"
            >
              {{ header.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredApplicants" :key="item.applicationNumber">
            <td :style="{ width: headers[0].width }" class="text-left">
              {{ item.applicationNumber }}
            </td>
            <td :style="{ width: headers[1].width }" class="text-left py-2">
              <div class="d-flex align-center">
                <v-avatar
                  size="36"
                  :color="getAvatarColor(item.initials)"
                  class="me-2 text-white"
                  >{{ item.initials }}</v-avatar
                >
                <span class="text-truncate">{{ item.name }}</span>
              </div>
            </td>
            <td :style="{ width: headers[2].width }" class="text-left">
              {{ item.dateSubmitted }}
            </td>
            <td :style="{ width: headers[3].width }" class="text-left">
              <span :style="[s.statusPill, statusStyles[item.status] || {}]">
                {{ item.status }}
              </span>
            </td>
            <td :style="{ width: headers[4].width }" class="text-left">
              <v-btn size="small" :style="s.viewBtn" @click="viewDetails(item)"
                >View Details</v-btn
              >
            </td>
          </tr>
        </tbody>
      </v-table>
      <div
        v-if="!filteredApplicants.length"
        class="text-center pa-10 text-medium-emphasis bg-white"
      >
        No applicants found matching the search or filter criteria.
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const search = ref("");
const activeFilterApps = ref("Total");
const loading = ref(false);

const mockEvaluatorProfile = ref({
  name: "Julian Lumanta",
  title: "Architect",
  specialty: "Architectural",
  initials: "ZL",
  avatar: "https://cdn.vuetifyjs.com/images/john.jpg",
});

const getInitials = (name) => {
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const applicants = ref([
  {
    initials: "JM",
    name: "Jm Deguzman",
    applicationNumber: "BP-2024-808123-T",
    dateSubmitted: "Jan 15, 2024",
    status: "Verified",
    discipline: "Architectural",
  },
  {
    initials: "SG",
    name: "Sarah Geronimo",
    applicationNumber: "BP-2024-808234-T",
    dateSubmitted: "Jan 16, 2024",
    status: "Pending",
    discipline: "Architectural",
  },
  {
    initials: "MP",
    name: "Michael Padilla",
    applicationNumber: "BP-2024-808345-T",
    dateSubmitted: "Jan 17, 2024",
    status: "Return",
    discipline: "Architectural",
  },
  {
    initials: "DT",
    name: "David Tolo",
    applicationNumber: "BP-2024-808678-T",
    dateSubmitted: "Jan 20, 2024",
    status: "Pending",
    discipline: "Structural",
  },
  {
    initials: "SG",
    name: "Sarah Gomez",
    applicationNumber: "BP-2024-808890-T",
    dateSubmitted: "Jan 22, 2024",
    status: "Pending",
    discipline: "Electrical",
  },
]);

const relevantApplicants = computed(() => {
  return applicants.value.filter(
    (a) => a.discipline === mockEvaluatorProfile.value.specialty
  );
});

const filterOptions = computed(() => [
  "Total",
  "Pending",
  "Verified",
  "Return",
]);

const statCards = computed(() => {
  const total = relevantApplicants.value.length;
  const pending = relevantApplicants.value.filter(
    (a) => a.status === "Pending"
  ).length;
  const verified = relevantApplicants.value.filter(
    (a) => a.status === "Verified"
  ).length;
  const returns = relevantApplicants.value.filter(
    (a) => a.status === "Return"
  ).length;

  return [
    {
      key: "total",
      label: "Total Applicants",
      value: total,
      icon: "mdi-account-group",
      iconColor: "#3b82f6",
      clickStatus: "Total",
    },
    {
      key: "pending",
      label: "Pending",
      value: pending,
      icon: "mdi-clock-outline",
      iconColor: "#f59e0b",
      clickStatus: "Pending",
    },
    {
      key: "verified",
      label: "Verified",
      value: verified,
      icon: "mdi-check-circle-outline",
      iconColor: "#22c55e",
      clickStatus: "Verified",
    },
    {
      key: "return",
      label: "Return",
      value: returns,
      icon: "mdi-alert-octagon-outline",
      iconColor: "#ef4444",
      clickStatus: "Return",
    },
  ];
});

const filteredApplicants = computed(() => {
  let filtered = relevantApplicants.value;

  if (activeFilterApps.value !== "Total") {
    filtered = filtered.filter((a) => a.status === activeFilterApps.value);
  }

  if (search.value) {
    const q = search.value.toLowerCase();
    filtered = filtered.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.applicationNumber.toLowerCase().includes(q)
    );
  }

  return filtered;
});

const filterByStatus = (status) => {
  activeFilterApps.value = status;
};

function onClick() {
  loading.value = true;
  setTimeout(() => (loading.value = false), 2000);
}

const logout = () => {
  console.log("User logging out...");
  router.push("/login");
};

const viewDetails = (item) => {
  console.log(`Navigating for: ${item.applicationNumber}`);
  router.push({
    name: "PlanInformation",
    query: { applicationNumber: item.applicationNumber },
  });
};

const stringToHslColor = (str, s, l) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++)
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  const h = hash % 360;
  return `hsl(${h}, ${s}%, ${l}%)`;
};

const getAvatarColor = (initials) => {
  const defined = {
    JM: "#007bff",
    SG: "#28a745",
    MP: "#dc3545",
  };
  return defined[initials] ?? stringToHslColor(initials, 45, 75);
};

// Defined Widths to ensure columns don't move when data is filtered
const headers = [
  {
    title: "Application Number",
    key: "applicationNumber",
    sortable: false,
    width: "25%",
  },
  { title: "Applicant Name", key: "name", sortable: false, width: "30%" },
  {
    title: "Date Submitted",
    key: "dateSubmitted",
    sortable: true,
    width: "20%",
  },
  { title: "Status", key: "status", sortable: true, width: "12%" },
  { title: "Action", key: "action", sortable: false, width: "13%" },
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
    boxShadow:
      "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
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
  Verified: { background: "#e6f9ee", color: "#067647" },
  Pending: { background: "#fff7e6", color: "#92400e" },
  Return: { background: "#fee2e2", color: "#991b1b" },
};
</script>

<style scoped>
.custom-data-table {
  table-layout: fixed; /* This forces the table to respect the widths */
  width: 100%;
}
.custom-data-table tr:hover {
  background-color: #f5f5f5 !important;
}
.custom-data-table tr td {
  border-bottom: 1px solid #e5e7eb;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>