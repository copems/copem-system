<template>
  <div :style="s.pageContainer">
    <v-row class="mb-6">
      <v-col v-for="card in statCards" :key="card.key" cols="12" sm="6" md="4">
        <v-card
          variant="flat"
          class="rounded-xl pa-6 d-flex align-center justify-space-between custom-card-border bg-white"
          style="min-height: 120px"
        >
          <div class="flex-grow-1">
            <div class="text-body-2 text-grey-darken-1 font-weight-medium mb-3">
              {{ card.label }}
            </div>
            <div class="d-flex align-end justify-space-between">
              <span class="text-h4 font-weight-bold text-grey-darken-4">{{
                card.value
              }}</span>
              <span
                v-if="card.suffix"
                class="text-body-1 text-teal mb-1 font-weight-medium"
                >{{ card.suffix }}</span
              >
            </div>
          </div>
          <v-avatar
            v-if="card.icon"
            :color="card.iconBg"
            size="56"
            class="ml-4"
          >
            <v-icon :color="card.iconColor" size="28">{{ card.icon }}</v-icon>
          </v-avatar>
        </v-card>
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
      <v-table class="custom-data-table">
        <thead>
          <tr>
            <th
              v-for="header in headers"
              :key="header.key"
              class="text-left"
              :style="[
                s.tableHeader,
                header.key === 'action' ? { width: '150px' } : {},
              ]"
            >
              {{ header.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredPlans" :key="item.applicationNumber">
            <td class="text-left">{{ item.applicationNumber }}</td>
            <td class="text-left py-2">
              <div class="d-flex align-center">
                <v-avatar
                  size="36"
                  :color="getAvatarColor(item.initials)"
                  class="me-2 text-white"
                  >{{ item.initials }}</v-avatar
                >
                <span>{{ item.applicantName }}</span>
              </div>
            </td>

            <td class="text-left">{{ item.dateEvaluated }}</td>

            <td class="text-left">
              <span :style="[s.statusPill, statusStyles[item.status] || {}]">
                {{ item.status }}
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
        v-if="!filteredPlans.length"
        class="text-center pa-4 text-medium-emphasis"
      >
        No applicants found matching the search or filter criteria.
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "ListApproval",
  data() {
    return {
      search: "",
      activeFilterApps: "Total",
      s: {
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
        statInlineIcon: { fontSize: "40px", lineHeight: 1 },
        filterBtn: {
          background: "#e5e7eb",
          color: "#4b5563",
          borderRadius: "10px",
          textTransform: "none",
          fontWeight: 600,
          height: "42px",
          boxShadow: "none",
        },
        searchWrapper: { flexGrow: 1, maxWidth: "350px", marginRight: "8px" },
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
      },
      statusStyles: {
        Approved: { background: "#e6f9ee", color: "#067647" },
        "For Approval": { background: "#fff7e6", color: "#92400e" },
        Rejected: { background: "#fee2e2", color: "#991b1b" },
      },
      headers: [
        { title: "Application Number", key: "applicationNumber" },
        { title: "Applicant Name", key: "applicantName" },
        { title: "Date Evaluated", key: "dateEvaluated" },
        { title: "Status", key: "status" },
        { title: "Action", key: "action" },
      ],
      approvedPlans: [
        {
          applicationNumber: "BPA-2023-001",
          applicantName: "Juan Dela Cruz",
          initials: "JD",
          dateEvaluated: "2023-09-15",
          status: "For Approval",
        },
        {
          applicationNumber: "BPA-2023-005",
          applicantName: "Maria Santos",
          initials: "MS",
          dateEvaluated: "2023-09-01",
          status: "For Approval",
        },
        {
          applicationNumber: "BPA-2023-012",
          applicantName: "Roberto Garcia",
          initials: "RG",
          dateEvaluated: "2023-09-10",
          status: "For Approval",
        },
      ],
    };
  },
  computed: {
    statCards() {
      return [
        {
          key: "approved",
          label: "Approved Plans",
          value: 3,
          icon: "mdi-check-circle-outline",
          iconBg: "#e8f5e9",
          iconColor: "#4caf50",
        },
        {
          key: "thisMonth",
          label: "This Month",
          value: 3,
          icon: "mdi-file-document-edit-outline",
          iconBg: "#f3e5f5",
          iconColor: "#9c27b0",
        },
        {
          key: "avgTime",
          label: "Avg. Processing Time",
          value: 5,
          suffix: "days",
          icon: null,
          iconBg: null,
          iconColor: null,
        },
      ];
    },
    filterOptions() {
      return ["Total", "For Approval", "Approved", "Rejected"];
    },
    filteredPlans() {
      let filtered = this.approvedPlans;
      if (this.activeFilterApps !== "Total")
        filtered = filtered.filter((a) => a.status === this.activeFilterApps);
      if (this.search) {
        const q = this.search.toLowerCase();
        filtered = filtered.filter(
          (a) =>
            a.applicantName.toLowerCase().includes(q) ||
            a.applicationNumber.toLowerCase().includes(q)
        );
      }
      return filtered;
    },
  },
  methods: {
    getInitials(name) {
      const parts = name.split(" ");
      if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      }
      return name.substring(0, 2).toUpperCase();
    },
    filterByStatus(status) {
      this.activeFilterApps = status;
    },
    stringToHslColor(str, s, l) {
      let hash = 0;
      for (let i = 0; i < str.length; i++)
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      const h = hash % 360;
      return `hsl(${h}, ${s}%, ${l}%)`;
    },
    getAvatarColor(initials) {
      return this.stringToHslColor(initials, 45, 75);
    },
    viewDetails(item) {
      this.$router.push({
        name: "evaluatedplans",
        params: { applicationNumber: item.applicationNumber },
      });
    },
  },
};
</script>

<style scoped>
.custom-card-border {
  border: 1px solid #e0e0e0 !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05) !important;
}

.custom-data-table tr:hover {
  background-color: #f5f5f5 !important;
}
.custom-data-table tr td {
  border-bottom: 1px solid #e5e7eb;
}
</style>