<template>
  <div :style="s.pageContainer">
    <v-row class="mb-6">
      <v-col v-for="card in statCards" :key="card.key" cols="12" sm="6" md="3">
        <StatsCard
          :label="card.label"
          :value="card.value"
          :icon="card.icon"
          :icon-color="card.iconColor"
          @click="filterByStatus(card.clickStatus)"
        />
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

    <DataTable
      :headers="appHeaders"
      :items="filteredApplicants"
      item-key="applicationNumber"
      empty-message="No applicants found matching the search or filter criteria."
    >
      <template #cell-applicationNumber="{ value }">
        {{ value }}
      </template>
      <template #cell-name="{ item }">
        <div class="d-flex align-center py-2">
          <v-avatar
            size="36"
            :color="getAvatarColor(item.initials)"
            class="me-2 text-white"
          >
            {{ item.initials }}
          </v-avatar>
          <span>{{ item.name }}</span>
        </div>
      </template>
      <template #cell-dateSubmitted="{ value }">
        {{ value }}
      </template>
      <template #cell-status="{ item }">
        <span :style="[s.statusPill, statusStyles[applicantStatus(item)]]">
          {{ applicantStatus(item) }}
        </span>
      </template>
      <template #cell-action="{ item }">
        <v-btn size="small" :style="s.viewBtn" @click="viewDetails(item)">
          View Details
        </v-btn>
      </template>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import StatsCard from "@/components/StatsCard.vue";
import DataTable from "@/components/DataTable.vue";

const activeTab = ref("applications");
const search = ref("");
const activeFilterApps = ref("Total");
const loading = ref(false);

const router = useRouter();

const applicants = ref([
  {
    applicationNumber: "OP-2025-002",
    name: "Noah Deguzman",
    initials: "ND",
    dateSubmitted: "June 17, 2025",
    isVerifiedByAdmin: true,
    isReturned: false,
  },
]);

const applicantStatus = (applicant) => {
  if (applicant.isReturned) return "Incomplete";
  if (applicant.isVerifiedByAdmin) return "Complete";
  return "Unsubmitted";
};

const statCards = computed(() => {
  const total = applicants.value.length;
  const unsubmitted = applicants.value.filter((a) => applicantStatus(a) === "Unsubmitted")
    .length;
  const complete = applicants.value.filter((a) => applicantStatus(a) === "Complete")
    .length;
  const incomplete = applicants.value.filter((a) => applicantStatus(a) === "Incomplete")
    .length;

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
      key: "complete",
      label: "Complete",
      value: complete,
      icon: "mdi-check-circle-outline",
      iconColor: "#22c55e",
      clickStatus: "Complete",
    },
    {
      key: "incomplete",
      label: "Incomplete",
      value: incomplete,
      icon: "mdi-alert-circle-outline",
      iconColor: "#ef4444",
      clickStatus: "Incomplete",
    },
    {
      key: "unsubmitted",
      label: "Unsubmitted",
      value: unsubmitted,
      icon: "mdi-clock-outline",
      iconColor: "#f59e0b",
      clickStatus: "Unsubmitted",
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

const filterOptions = computed(() => ["Total", "Complete", "Incomplete", "Unsubmitted"]);

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

  if (status === "Complete") {
    router.push("/opam/ts-scheduling/ts-inspection", {});
    console.log(
      `Navigating to /opam/ts-scheduling/ts-inspection for complete application: ${item.applicationNumber}`
    );
  } else {
    console.log("View Details clicked for:", item);
    console.log(
      `Details for ${item.name} (${item.applicationNumber}) should open here, current status: ${status}.`
    );
  }
};

const appHeaders = [
  { title: "Application Number", key: "applicationNumber" },
  { title: "Applicant Name", key: "name" },
  { title: "Date Submitted", key: "dateSubmitted" },
  { title: "Status", key: "status" },
  { title: "Action", key: "action", width: "120px" },
];

const s = {
  pageContainer: {
    maxWidth: "1460px",
    margin: "16px auto 0",
    padding: "0 12px",
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
};

const statusStyles = {
  Complete: { background: "#e6f9ee", color: "#067647" },
  Incomplete: { background: "#fee2e2", color: "#991b1b" },
  Unsubmitted: { background: "#fff7e6", color: "#92400e" },
  Passed: { background: "#d1fae5", color: "#065f46" },
  Violation: { background: "#fee2e2", color: "#991b1b" },
};
</script>

<style scoped></style>
