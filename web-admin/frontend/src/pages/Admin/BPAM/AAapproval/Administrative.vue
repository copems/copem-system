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

            <td class="text-left">{{ item.submissionDate }}</td>

            <td class="text-left">
              <span
                :style="[s.statusPill, statusStyles[item.physicalStatus] || {}]"
              >
                {{ item.physicalStatus }}
              </span>
            </td>

            <td class="text-left">
              <v-btn size="small" :style="s.viewBtn" @click="viewPlan(item)"
                >Verify Physical</v-btn
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
  name: "AdminDashboard",
  data() {
    return {
      search: "",
      activeFilterApps: "Total",
      // --- NEW NAVIGATION DATA ---
      navItems: [
        {
          title: "Building Permit",
          icon: "mdi-office-building-outline",
          hasSubmenu: false,
        },
        {
          title: "Locational Clearance",
          icon: "mdi-map-marker-outline",
          hasSubmenu: false,
        },
        {
          title: "Compliance Monitoring",
          icon: "mdi-clipboard-list-outline",
          hasSubmenu: true,
        },
        {
          title: "Occupancy Permit",
          icon: "mdi-key-variant",
          hasSubmenu: false,
        },
      ],
      // --- STYLES ---
      s: {
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
        profileBtn: {
          backgroundColor: "transparent",
          boxShadow: "none",
          padding: 0,
          minWidth: "unset",
        },
      },
      statusStyles: {
        Verified: { background: "#e6f9ee", color: "#067647" },
        Pending: { background: "#fff7e6", color: "#92400e" },
        Mismatch: { background: "#fee2e2", color: "#991b1b" },
      },

      // --- DATA ---
      mockEvaluatorProfile: {
        name: "Zoe Lumanta",
        title: "Administrative Aide",
        specialty: "Administrative Aide",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
      },

      headers: [
        { title: "Application Number", key: "applicationNumber" },
        { title: "Applicant Name", key: "applicantName" },
        { title: "Date Submitted", key: "submissionDate" },
        { title: "Status", key: "physicalStatus" },
        { title: "Action", key: "action" },
      ],
      approvedPlans: [
        {
          applicationNumber: "BPA-2023-001",
          applicantName: "Juan Dela Cruz",
          initials: "JD",
          projectType: "Single Dwelling Residential",
          submissionDate: "2023-09-15",
          physicalStatus: "Verified",
          controlNo: "APP-12345",
          projectName: "2-Storey Residence",
          projectLocation: "Naga City",
          applicationType: "BUILDING PERMIT",
          dateTimeReceived: "2023-09-15 10:00 AM",
          dateTimePrinted: "2023-10-25 09:00 AM",
          bldgEvaluatorFindings:
            "Architectural plans reviewed. Complies with setbacks.",
          bldgEvaluatorDate: "2023-10-01",
          physicalChecklistStatus: [],
        },
        {
          applicationNumber: "BPA-2023-002",
          applicantName: "Maria Santos",
          initials: "MS",
          projectType: "Commercial Building",
          submissionDate: "2023-09-01",
          physicalStatus: "Pending",
          controlNo: "APP-67890",
          projectName: "Retail Store Fit-out",
          projectLocation: "Magsaysay Ave",
          applicationType: "BUILDING PERMIT",
          dateTimeReceived: "2023-09-01 02:30 PM",
          dateTimePrinted: "2023-10-19 04:00 PM",
          bldgEvaluatorFindings: "Initial review compliance.",
          bldgEvaluatorDate: "2023-10-05",
          physicalChecklistStatus: null,
        },
      ],

      // Notifications
      applicationsToEvaluate: [],
    };
  },
  computed: {
    statCards() {
      const total = this.approvedPlans.length;
      const pending = this.approvedPlans.filter(
        (a) => a.physicalStatus === "Pending"
      ).length;
      const verified = this.approvedPlans.filter(
        (a) => a.physicalStatus === "Verified"
      ).length;
      const mismatch = this.approvedPlans.filter(
        (a) => a.physicalStatus === "Mismatch"
      ).length;
      return [
        {
          key: "total",
          label: "Total Plans",
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
          key: "mismatch",
          label: "Mismatch",
          value: mismatch,
          icon: "mdi-alert-octagon-outline",
          iconColor: "#ef4444",
          clickStatus: "Mismatch",
        },
      ];
    },
    filterOptions() {
      return ["Total", "Pending", "Verified", "Mismatch"];
    },
    filteredPlans() {
      let filtered = this.approvedPlans;
      if (this.activeFilterApps !== "Total")
        filtered = filtered.filter(
          (a) => a.physicalStatus === this.activeFilterApps
        );
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
    logout() {
      console.log("Logging out");
    },
    filterByStatus(status) {
      this.activeFilterApps = status;
    },
    getStatusColor(status) {
      return status === "Verified"
        ? "success"
        : status === "Pending"
        ? "warning"
        : "error";
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
    viewPlan(item) {
      this.$router.push({
        name: "approvedplans",
        query: {
          applicationData: JSON.stringify(item),
        },
      });
    },
  },
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