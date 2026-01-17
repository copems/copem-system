<template>
  <v-app>
    <!-- Header: Fixed at top -->
    <v-app-bar elevation="1" color="white" height="60" style="flex-shrink: 0">
      <v-container
        class="d-flex align-center px-6"
        fluid
        style="max-width: 1300px"
      >
        <h1 class="text-subtitle-1 font-weight-bold text-grey-darken-3">
          Occupancy Permit Portal
        </h1>
        <v-spacer></v-spacer>

        <!-- Profile Menu -->
        <v-menu v-model="showProfileMenu" location="bottom end" offset="10">
          <template v-slot:activator="{ props }">
            <v-btn
              variant="text"
              class="text-none px-2"
              v-bind="props"
              height="40"
            >
              <div class="d-flex align-center">
                <v-avatar
                  color="blue-lighten-5"
                  size="32"
                  class="mr-2 text-blue-darken-1 font-weight-medium text-caption"
                >
                  JA
                </v-avatar>
                <div class="d-none d-sm-block text-left mr-2">
                  <div class="text-caption font-weight-bold text-grey-darken-3">
                    Jacqueline Azada
                  </div>
                </div>
                <v-icon size="small" color="grey-lighten-1"
                  >mdi-chevron-down</v-icon
                >
              </div>
            </v-btn>
          </template>

          <v-list elevation="2" rounded="lg" border density="compact">
            <v-list-item @click="handleLogout" density="compact">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-container>
    </v-app-bar>

    <!-- Main Content: Scrollable -->
    <v-main class="bg-grey-lighten-5">
      <!-- Expanded max-width to 1200px to fill the screen better -->
      <v-container style="max-width: 1300px" class="pt-0 pb-6 px-6" fluid>
        <!-- Application Header Text -->
        <div class="mb-2">
          <h2 class="text-h6 font-weight-bold text-grey-darken-3 mb-1">
            Application OP-2025-001
          </h2>
          <p class="text-caption text-grey-darken-1">
            View the current progress of your building permit request.
          </p>
        </div>

        <!-- Application Info Card -->
        <v-card flat border class="mb-4 rounded-lg">
          <v-card-text class="pa-4">
            <v-row dense>
              <v-col cols="6" md="3">
                <div class="text-caption text-grey mb-1">Submission Date</div>
                <div class="text-body-2 font-weight-medium text-grey-darken-3">
                  Jan 15, 2024
                </div>
              </v-col>
              <v-col cols="6" md="3">
                <div class="text-caption text-grey mb-1">Application Type</div>
                <div class="text-body-2 font-weight-medium text-grey-darken-3">
                  New Construction
                </div>
              </v-col>
              <v-col cols="6" md="3">
                <div class="text-caption text-grey mb-1">Current Status</div>
                <v-chip
                  color="success"
                  variant="tonal"
                  size="x-small"
                  class="font-weight-medium rounded-sm"
                >
                  Submitted
                </v-chip>
              </v-col>
              <v-col cols="6" md="3">
                <div class="text-caption text-grey mb-1">Last Updated</div>
                <div class="text-body-2 font-weight-medium text-grey-darken-3">
                  2h ago
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Released Building Permit Card -->
        <v-card flat border class="rounded-lg mb-4">
          <div class="d-flex justify-space-between align-center px-6 pt-4 pb-2">
            <div class="d-flex align-center">
              <v-icon class="mr-2" size="24" color="grey-darken-3"
                >mdi-file-document-outline</v-icon
              >
              <h2 class="text-h6 font-weight-medium text-grey-darken-4">
                Released Building Permit
              </h2>
            </div>
            <v-chip
              color="green lighten-4"
              variant="flat"
              size="small"
              class="font-weight-bold"
            >
              <v-icon start size="18">mdi-check-circle</v-icon>
              Released
            </v-chip>
          </div>

          <div class="px-6 pb-4">
            <v-card flat class="pa-3 mb-4 permit-number-box">
              <div
                class="text-caption font-weight-medium text-uppercase text-grey-darken-1 mb-1"
              >
                BUILDING PERMIT NUMBER
              </div>
              <div class="text-h5 font-weight-bold text-blue-darken-2">
                BP-2024-001
              </div>
            </v-card>

            <v-row dense class="mb-2">
              <v-col cols="12" sm="6">
                <div
                  class="text-caption font-weight-medium text-uppercase text-grey-darken-1 mb-1"
                >
                  APPLICATION DATE
                </div>
                <div class="d-flex align-center text-body-1 text-grey-darken-3">
                  <v-icon size="20" class="mr-2" color="grey-darken-1"
                    >mdi-calendar-month</v-icon
                  >
                  <span class="font-weight-medium">January 15, 2024</span>
                </div>
              </v-col>

              <v-col cols="12" sm="6">
                <div
                  class="text-caption font-weight-medium text-uppercase text-grey-darken-1 mb-1"
                >
                  RELEASE DATE
                </div>
                <div class="d-flex align-center text-body-1 text-grey-darken-3">
                  <v-icon size="20" class="mr-2" color="grey-darken-1"
                    >mdi-calendar-check</v-icon
                  >
                  <span class="font-weight-medium">March 20, 2024</span>
                </div>
              </v-col>
            </v-row>

            <v-divider class="my-3"></v-divider>

            <v-row dense class="mb-2">
              <v-col cols="12" sm="6">
                <div
                  class="text-caption font-weight-medium text-uppercase text-grey-darken-1 mb-1"
                >
                  PERMIT STATUS
                </div>
                <div
                  class="d-flex align-center text-body-1"
                  style="color: #2e7d32"
                >
                  <v-icon size="10" class="mr-2" color="#2e7d32"
                    >mdi-circle</v-icon
                  >
                  <span class="font-weight-bold" style="color: #2e7d32"
                    >Active & Valid</span
                  >
                </div>
              </v-col>

              <v-col cols="12" sm="6">
                <div
                  class="text-caption font-weight-medium text-uppercase text-grey-darken-1 mb-1"
                >
                  VALIDITY PERIOD
                </div>
                <div class="text-body-1 text-grey-darken-3 font-weight-medium">
                  March 20, 2025
                </div>
              </v-col>
            </v-row>

            <v-divider class="my-3"></v-divider>

            <div class="mb-2">
              <div
                class="text-caption font-weight-medium text-uppercase text-grey-darken-1 mb-1"
              >
                AUTHORIZED PROJECT
              </div>
              <div class="text-h6 font-weight-bold text-grey-darken-4 mb-1">
                Geguaman Residential Building
              </div>
              <div class="text-body-2 text-grey-darken-2">
                456 Main St., Brgy. San Isidro, Naga City
              </div>
            </div>
          </div>
        </v-card>

        <!-- Application Status Tracker -->
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
                  <div
                    class="d-flex align-center justify-space-between mb-1 w-100"
                  >
                    <h4
                      class="text-body-2 font-weight-bold text-grey-darken-3 flex-grow-1 mr-4"
                    >
                      {{ step.title }}
                    </h4>

                    <!-- Fixed Width Container for Chip -->
                    <div
                      style="width: 100px"
                      class="flex-shrink-0 d-flex justify-end"
                    >
                      <v-chip
                        :color="
                          step.status === 'completed' ? 'success' : 'grey'
                        "
                        :variant="
                          step.status === 'completed' ? 'tonal' : 'tonal'
                        "
                        size="x-small"
                        class="font-weight-medium justify-center"
                        style="width: 100%"
                      >
                        {{
                          step.status === "completed" ? "Completed" : "Pending"
                        }}
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
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const showProfileMenu = ref(false);

const steps = ref([
  {
    id: 1,
    title: "Submitted Application",
    applicationId: "OP-2025-001",
    statusText: "Submitted: May 19, 2025",
    description:
      "Your application has been successfully submitted and is now in the review process.",
    status: "completed",
  },
  {
    id: 2,
    title: "Requirements Checklist Verification",
    applicationId: "OP-2025-001",
    statusText: "Awaiting Submission",
    description:
      "Submit Onsite Requirements Checklist for initial review and verification.",
    status: "not-started",
  },
  {
    id: 3,
    title: "Building Inspection",
    applicationId: "OP-2025-001",
    statusText: "Pending Schedule",
    description:
      "Onsite inspection will be scheduled upon successful verification of requirements.",
    status: "not-started",
  },
  {
    id: 4,
    title: "Final Approval",
    applicationId: "OP-2025-001",
    statusText: "Awaiting previous stages",
    description:
      "Final approval and permit issuance will proceed after successful inspection.",
    status: "not-started",
  },
]);

const handleLogout = () => {
  localStorage.removeItem("currentBuildingOwnerId");
  localStorage.removeItem("buildingOwnerData");
  showProfileMenu.value = false;
  router.push({ name: "Login" });
};
</script>

<style scoped>
/* Government Standard Font Styles */
* {
  font-family: Arial, Helvetica, sans-serif;
}

/* Body */
.app-container,
.v-application {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.7;
}

/* Header (H1) - 36px */
.page-header,
.text-h4 {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1.25;
}

/* Subheader (H2) - 24px */
.section-header,
.text-h5 {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.35;
}

/* Subheader (H3) - 20px */
.text-h6 {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.35;
}

/* Label/Title - 14px */
.form-label,
.table-header,
.ui-label,
.text-subtitle-1 {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.5;
}

/* Body Text - 14px */
.text-body-1,
.text-body-2 {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.6;
}

/* Small/Helper Text - 13px */
.helper-text,
.text-caption {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.6;
}

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
  font-family: Arial, Helvetica, sans-serif;
}

:deep(.v-main) {
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  min-height: 0;
}

:deep(.v-main__wrap) {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.v-application {
  background-color: #f8fafc !important;
  font-family: Arial, Helvetica, sans-serif;
}

.permit-number-box {
  border: 1px solid #e0eeef;
  background-color: #f7f9fc;
  border-radius: 6px !important;
}

/* Timeline text styling */
:deep(.v-timeline-item) {
  font-family: Arial, Helvetica, sans-serif;
}

/* Card text styling */
:deep(.v-card-title),
:deep(.v-card-text) {
  font-family: Arial, Helvetica, sans-serif;
}

/* Chip styling */
:deep(.v-chip) {
  font-family: Arial, Helvetica, sans-serif;
}

/* List items styling */
:deep(.v-list-item-title) {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
