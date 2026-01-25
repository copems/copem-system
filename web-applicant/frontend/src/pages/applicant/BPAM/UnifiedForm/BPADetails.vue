<template>
  <v-container style="max-width: 1300px" class="pa-0 px-6 pb-6" fluid>
    <!-- Loading State -->
    <v-skeleton-loader
      v-if="loading"
      type="card, card"
      class="mb-4"
    ></v-skeleton-loader>

    <!-- Error State -->
    <v-alert
      v-if="error"
      type="error"
      closable
      @click:close="error = ''"
      class="mb-4"
    >
      {{ error }}
    </v-alert>

    <!-- Content -->
    <div v-if="!loading && !error" class="mb-1 mt-0 py-2">
      <h2 class="text-h6 font-weight-bold text-grey-darken-3 mb-0">
        Application {{ applicationNumber || "N/A" }}
      </h2>
      <p class="text-caption text-grey-darken-1">
        View the current progress of your building permit request.
      </p>
    </div>

    <v-card v-if="!loading && !error" flat border class="mb-2 rounded-lg">
      <v-card-text class="pa-4">
        <v-row dense>
          <v-col cols="6" md="3">
            <div class="text-caption text-grey mb-1">Submission Date</div>
            <div class="text-body-2 font-weight-medium text-grey-darken-3">
              {{ submissionDate || "N/A" }}
            </div>
          </v-col>
          <v-col cols="6" md="3">
            <div class="text-caption text-grey mb-1">Application Type</div>
            <div class="text-body-2 font-weight-medium text-grey-darken-3">
              {{ applicationType || "N/A" }}
            </div>
          </v-col>
          <v-col cols="6" md="3">
            <div class="text-caption text-grey mb-1">Current Status</div>
            <v-chip
              :color="statusColor"
              variant="tonal"
              size="x-small"
              class="font-weight-medium rounded-sm"
            >
              {{ currentStatus }}
            </v-chip>
          </v-col>
          <v-col cols="6" md="3">
            <div class="text-caption text-grey mb-1">Last Updated</div>
            <div class="text-body-2 font-weight-medium text-grey-darken-3">
              {{ lastUpdated || "N/A" }}
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card flat border class="rounded-lg">
      <v-card-title
        class="text-subtitle-1 font-weight-bold text-grey-darken-3 px-4 pt-4 pb-2"
      >
        Application Status Tracker
      </v-card-title>

      <v-card-text class="px-4 pb-4">
        <v-timeline
          align="start"
          density="compact"
          side="end"
          truncate-line="both"
        >
          <v-timeline-item
            v-for="step in steps"
            :key="step.id"
            :dot-color="
              step.status === 'completed' ? 'primary' : 'grey-lighten-2'
            "
            :icon="step.status === 'completed' ? 'mdi-check' : ''"
            :icon-color="step.status === 'completed' ? 'white' : ''"
            size="x-small"
            fill-dot
            width="100%"
          >
            <div class="d-flex flex-column w-100">
              <div class="d-flex align-center justify-space-between mb-1 w-100">
                <h4
                  class="text-body-2 font-weight-bold text-grey-darken-3 flex-grow-1 mr-4"
                >
                  {{ step.title }}
                </h4>

                <div
                  style="width: 100px"
                  class="flex-shrink-0 d-flex justify-end"
                >
                  <v-chip
                    :color="step.status === 'completed' ? 'success' : 'grey'"
                    variant="tonal"
                    size="x-small"
                    class="font-weight-medium justify-center"
                    style="width: 100%"
                  >
                    {{ step.status === "completed" ? "Completed" : "Pending" }}
                  </v-chip>
                </div>
              </div>

              <div
                class="text-caption text-grey-darken-1 mb-1 font-mono"
                style="font-size: 0.7rem !important"
              >
                {{ step.applicationId }}
              </div>
              <div
                class="text-caption font-weight-bold text-grey-darken-2 mb-1"
              >
                {{ step.statusText }}
              </div>
              <div class="text-caption text-grey-darken-1">
                {{ step.description }}
              </div>
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

// State
const loading = ref(true);
const error = ref("");
const applicationNumber = ref("");
const submissionDate = ref("");
const applicationType = ref("");
const currentStatus = ref("Submitted");
const lastUpdated = ref("");
const bpacId = ref(null);
const applicationStatuses = ref([]);

// Status stages configuration
const statusStages = [
  {
    id: 1,
    title: "Submitted Application",
    statusDesc: 0, // Maps to status_desc = 0
    description: "Application submitted and in review process.",
  },
  {
    id: 2,
    title: "PDF Plan Verification",
    statusDesc: 1, // Maps to status_desc = 1 (In Review)
    description: "Reviewing submitted plans for completeness.",
  },
  {
    id: 3,
    title: "Evaluation of Plans",
    statusDesc: 1, // Also maps to status_desc = 1 (In Review)
    description: "Comprehensive evaluation begins after verification.",
  },
  {
    id: 4,
    title: "Final Approval",
    statusDesc: 2, // Maps to status_desc = 2 (Approved)
    description: "Permit issuance after successful evaluation.",
  },
];

// Computed properties
const statusColor = computed(() => {
  const status = currentStatus.value.toLowerCase();
  if (status.includes("approved")) return "success";
  if (status.includes("rejected") || status.includes("returned")) return "error";
  if (status.includes("review")) return "warning";
  return "info";
});

// Format date helper
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (e) {
    return dateString;
  }
};

// Format relative time helper
const formatRelativeTime = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(dateString);
  } catch (e) {
    return dateString;
  }
};

// Get application type from work scope
const getApplicationType = (workScopeTypeId) => {
  // This is a placeholder - you may need to fetch work scope type from API
  // For now, return a default value
  return "New Construction";
};

// Load application number from localStorage or route
const loadApplicationNumber = () => {
  // Try route params first
  if (route.params.applicationNumber) {
    return route.params.applicationNumber;
  }
  // Then try localStorage
  const stored = localStorage.getItem("application_number");
  if (stored) {
    return stored;
  }
  return null;
};

// Fetch BPA construction data by application number
const fetchBpaConstruction = async (appNo) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/bpa-construction/application/${appNo}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch application data");
    }
    const result = await response.json();
    if (result.success && result.data) {
      return result.data;
    }
    throw new Error("Application data not found");
  } catch (err) {
    console.error("Error fetching BPA construction:", err);
    throw err;
  }
};

// Fetch application statuses by bpac_id
const fetchApplicationStatuses = async (bpacId) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/bp-application-status/bpac/${bpacId}`
    );
    if (!response.ok) {
      return [];
    }
    const result = await response.json();
    if (result.success && result.data) {
      return result.data;
    }
    return [];
  } catch (err) {
    console.error("Error fetching application statuses:", err);
    return [];
  }
};

// Determine status stages based on application statuses
const determineStatusStages = (statuses) => {
  const steps = statusStages.map((stage) => {
    // Find if there's a status record for this stage
    const statusRecord = statuses.find(
      (s) => s.status_desc === stage.statusDesc
    );

    let status = "not-started";
    let statusText = "Awaiting previous stages";
    let dateConducted = null;

    if (statusRecord) {
      status = "completed";
      dateConducted = statusRecord.date_conducted;
      
      // Format status text based on status description
      switch (stage.statusDesc) {
        case 0:
          statusText = `Submitted: ${formatDate(dateConducted)}`;
          break;
        case 1:
          statusText = `In Review: ${formatDate(dateConducted)}`;
          break;
        case 2:
          statusText = `Approved: ${formatDate(dateConducted)}`;
          break;
        case 3:
          statusText = `Rejected: ${formatDate(dateConducted)}`;
          break;
        default:
          statusText = `Completed: ${formatDate(dateConducted)}`;
      }
    } else {
      // Check if previous stages are completed
      if (stage.id === 1) {
        // First stage - if application exists, it's submitted
        status = "completed";
        statusText = "Submitted";
      } else {
        // Check if previous stage is completed
        const prevStage = statusStages.find((s) => s.id === stage.id - 1);
        if (prevStage) {
          const prevStatus = statuses.find(
            (s) => s.status_desc === prevStage.statusDesc
          );
          if (prevStatus) {
            statusText = "Awaiting review";
          }
        }
      }
    }

    return {
      ...stage,
      applicationId: applicationNumber.value,
      status,
      statusText,
      dateConducted,
    };
  });

  return steps;
};

// Computed steps based on application statuses
const steps = computed(() => {
  return determineStatusStages(applicationStatuses.value);
});

// Load application data
const loadApplicationData = async () => {
  loading.value = true;
  error.value = "";

  try {
    // Load application number
    const appNo = loadApplicationNumber();
    if (!appNo) {
      error.value = "Application number not found. Please complete the application process.";
      loading.value = false;
      return;
    }

    applicationNumber.value = appNo;

    // Fetch BPA construction data
    const constructionData = await fetchBpaConstruction(appNo);
    
    if (!constructionData) {
      error.value = "Application data not found.";
      loading.value = false;
      return;
    }

    // Store bpac_id for fetching statuses
    bpacId.value = constructionData.bpac_id;

    // Set submission date (use construction_date or current date if not available)
    if (constructionData.construction_date) {
      submissionDate.value = formatDate(constructionData.construction_date);
    } else {
      // If no construction date, use current date as fallback
      submissionDate.value = formatDate(new Date().toISOString());
    }

    // Set application type (you may need to fetch work scope type details)
    applicationType.value = getApplicationType(
      constructionData.work_scope_type_id
    );

    // Fetch application statuses
    const statuses = await fetchApplicationStatuses(constructionData.bpac_id);
    applicationStatuses.value = statuses;

    // Determine current status from latest status
    if (statuses.length > 0) {
      const latestStatus = statuses[0]; // Assuming sorted by date desc
      switch (latestStatus.status_desc) {
        case 0:
          currentStatus.value = "Submitted";
          break;
        case 1:
          currentStatus.value = "In Review";
          break;
        case 2:
          currentStatus.value = "Approved";
          break;
        case 3:
          currentStatus.value = "Rejected";
          break;
        default:
          currentStatus.value = "Submitted";
      }
      lastUpdated.value = formatRelativeTime(latestStatus.date_conducted);
    } else {
      // No status records yet, default to Submitted
      currentStatus.value = "Submitted";
      lastUpdated.value = formatRelativeTime(submissionDate.value);
    }
  } catch (err) {
    console.error("Error loading application data:", err);
    error.value = err.message || "Failed to load application data. Please try again later.";
  } finally {
    loading.value = false;
  }
};

// Initialize on mount
onMounted(() => {
  loadApplicationData();
});

const handleLogout = () => {
  router.push({ name: "Login" });
};
</script>

<style scoped>
:deep(.v-app) {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

:deep(.v-app-bar) {
  flex-shrink: 0 !important;
  position: sticky !important;
  top: 0 !important;
}

:deep(.v-main) {
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  min-height: 0;
  padding-top: 88px !important;
}

.v-application {
  background-color: #f8fafc !important;
}
</style>