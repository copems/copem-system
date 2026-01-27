<template>
  <v-card class="rounded-lg border" flat>
    <v-card-title
      class="bg-blue-lighten-5 text-blue-darken-3 font-weight-bold py-3"
      style="font-size: 20px"
    >
      <v-icon start class="mr-2">mdi-calendar-check</v-icon>
      Inspection Schedule
    </v-card-title>

    <v-card-text class="pa-6">
      <div v-if="inspectionDetails.date">
        <!-- Schedule Info -->
        <div class="mb-6">
          <h3 class="section-header">
            <v-icon class="mr-2" size="18">mdi-calendar-clock</v-icon>
            Schedule Details
          </h3>
          <v-row class="mt-4">
            <v-col cols="12" sm="6">
              <div class="label-style">INSPECTION DATE</div>
              <div class="value-style">
                {{ formatDate(inspectionDetails.date) }}
              </div>
            </v-col>
            <v-col cols="12" sm="6">
              <div class="label-style">INSPECTION TIME</div>
              <div class="value-style">
                {{ formatTime(inspectionDetails.time) }}
              </div>
            </v-col>
          </v-row>
        </div>

        <!-- Schedule Monitoring -->
        <div>
          <h3 class="section-header">
            <v-icon class="mr-2" size="18">mdi-chart-timeline-variant</v-icon>
            Assign Inspectors
          </h3>
          <div class="mt-4">
            <div
              v-for="(detail, key) in inspectionDetails.works"
              :key="key"
              class="monitor-item"
            >
              <div class="d-flex justify-space-between align-center">
                <div class="d-flex align-center flex-grow-1">
                  <v-icon
                    size="20"
                    class="mr-2"
                    :color="statusColors[detail.status]?.icon || '#f59e0b'"
                  >
                    {{
                      detail.status === "Approved"
                        ? "mdi-check-circle"
                        : detail.status === "Rejected"
                        ? "mdi-close-circle"
                        : "mdi-alert-circle"
                    }}
                  </v-icon>
                  <span class="font-weight-medium">{{ detail.label }}</span>
                </div>
                <div class="d-flex align-center gap-2">
                  <span
                    class="status-pill"
                    :style="
                      statusColors[detail.status]?.style || {
                        background: '#fef3c7',
                        color: '#92400e',
                      }
                    "
                  >
                    {{ detail.status }}
                  </span>
                </div>
              </div>
              <div class="inspector-name">{{ detail.inspector }}</div>
            </div>
          </div>
        </div>

        <div class="d-flex justify-end mt-6">
          <v-btn
            color="primary"
            class="text-none font-weight-bold px-8"
            rounded="lg"
            size="large"
            @click="$emit('send-schedule')"
          >
            Send Schedule
          </v-btn>
        </div>
      </div>

      <div v-else class="empty-state">
        <div class="empty-state-content">
          <v-icon color="#3b82f6" size="64">mdi-calendar-off</v-icon>
          <h3 class="empty-state-title mt-4 mb-2">No Inspection Scheduled</h3>
          <p class="empty-state-subtitle mb-6">
            Schedule an inspection by assigning inspectors and setting the date and time.
          </p>
          <v-btn
            color="primary"
            class="text-none font-weight-bold"
            prepend-icon="mdi-calendar-plus"
            @click="$emit('schedule-inspection')"
          >
            Schedule Inspection
          </v-btn>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
interface WorkDetail {
  label: string;
  inspector: string;
  status: string;
}

interface InspectionDetails {
  date: string | null;
  time: string | null;
  works: Record<string, WorkDetail>;
}

defineProps<{
  inspectionDetails: InspectionDetails;
}>();

defineEmits<{
  (e: "schedule-inspection"): void;
  (e: "send-schedule"): void;
}>();

const statusColors: Record<string, { icon: string; style: Record<string, string> }> = {
  Pending: {
    icon: "#f59e0b",
    style: { background: "#fef3c7", color: "#92400e" },
  },
  Approved: {
    icon: "#10b981",
    style: { background: "#d1fae5", color: "#065f46" },
  },
  Rejected: {
    icon: "#ef4444",
    style: { background: "#fee2e2", color: "#991b1b" },
  },
};

const formatDate = (dateString: string | null) => {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );
};

const formatTime = (timeString: string | null) => {
  if (!timeString) return "";
  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes));
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
};
</script>

<style scoped>
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

.section-header {
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  display: flex;
  align-items: center;
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

.gap-2 {
  gap: 8px;
}
</style>
