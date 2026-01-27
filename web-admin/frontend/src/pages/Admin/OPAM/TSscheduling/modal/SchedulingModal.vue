<template>
  <v-dialog v-model="dialogModel" max-width="600px" persistent>
    <v-card class="dialog-card">
      <v-card-title class="dialog-header">
        <v-icon class="mr-3" color="#fff">mdi-calendar-check</v-icon>
        <span class="text-h6 font-weight-bold dialog-title">Schedule Inspection</span>
        <v-spacer></v-spacer>
        <v-btn icon variant="text" @click="closeDialog" size="small">
          <v-icon color="#fff">mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="pt-4">
        <v-form ref="formRef" @submit.prevent="submitSchedule">
          <v-row class="mb-2">
            <v-col cols="12" sm="6">
              <v-label class="input-label">Date of Inspection</v-label>
              <v-text-field
                v-model="inspectionDate"
                variant="outlined"
                density="compact"
                hide-details
                type="date"
                :min="minDate"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-label class="input-label">Time</v-label>
              <v-text-field
                v-model="inspectionTime"
                variant="outlined"
                density="compact"
                hide-details
                type="time"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-label class="mt-4 mb-2 input-label">Assign Inspectors</v-label>
          <v-row>
            <v-col cols="12" sm="6">
              <v-label class="input-label-small">Architectural Works</v-label>
              <v-select
                v-model="inspectors.architectural"
                :items="inspectorsList.architectural"
                label="Select Inspector"
                density="compact"
                variant="outlined"
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-label class="input-label-small">Civil/Structural Works</v-label>
              <v-select
                v-model="inspectors.civilStructural"
                :items="inspectorsList.civilStructural"
                label="Select Inspector"
                density="compact"
                variant="outlined"
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-label class="input-label-small">Electrical Works</v-label>
              <v-select
                v-model="inspectors.electrical"
                :items="inspectorsList.electrical"
                label="Select Inspector"
                density="compact"
                variant="outlined"
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-label class="input-label-small">Sanitary Plumbing Works</v-label>
              <v-select
                v-model="inspectors.sanitaryPlumbing"
                :items="inspectorsList.sanitaryPlumbing"
                label="Select Inspector"
                density="compact"
                variant="outlined"
                hide-details
              ></v-select>
            </v-col>
          </v-row>

          <div class="d-flex justify-end mt-4 gap-2">
            <v-btn variant="outlined" color="grey" class="text-none" @click="closeDialog">
              Cancel
            </v-btn>
            <v-btn
              class="submit-btn"
              type="submit"
              size="default"
              style="min-width: 150px"
            >
              SET SCHEDULE
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

interface Inspectors {
  architectural: string | null;
  civilStructural: string | null;
  electrical: string | null;
  sanitaryPlumbing: string | null;
}

interface ScheduleData {
  date: string;
  time: string;
  inspectors: Inspectors;
}

const props = defineProps<{
  modelValue: boolean;
  inspectorsList: {
    architectural: string[];
    civilStructural: string[];
    electrical: string[];
    sanitaryPlumbing: string[];
  };
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "submit", data: ScheduleData): void;
}>();

const dialogModel = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const minDate = computed(() => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
});

const inspectionDate = ref<string | null>(null);
const inspectionTime = ref<string | null>(null);
const inspectors = ref<Inspectors>({
  architectural: null,
  civilStructural: null,
  electrical: null,
  sanitaryPlumbing: null,
});

// Reset form when dialog opens
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      resetForm();
    }
  }
);

const resetForm = () => {
  inspectionDate.value = null;
  inspectionTime.value = null;
  inspectors.value = {
    architectural: null,
    civilStructural: null,
    electrical: null,
    sanitaryPlumbing: null,
  };
};

const closeDialog = () => {
  emit("update:modelValue", false);
};

const submitSchedule = () => {
  if (
    !inspectionDate.value ||
    !inspectionTime.value ||
    !inspectors.value.architectural ||
    !inspectors.value.civilStructural ||
    !inspectors.value.electrical ||
    !inspectors.value.sanitaryPlumbing
  ) {
    alert("Please fill in all fields");
    return;
  }

  emit("submit", {
    date: inspectionDate.value,
    time: inspectionTime.value,
    inspectors: { ...inspectors.value } as Inspectors &
      { [K in keyof Inspectors]: string },
  });

  closeDialog();
};
</script>

<style scoped>
.dialog-card {
  border-radius: 12px;
  overflow: hidden;
}

.dialog-header {
  background: #3b82f6;
  color: #ffffff;
  padding: 16px 20px;
  display: flex;
  align-items: center;
}

.dialog-title {
  color: #ffffff;
}

.input-label {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
  display: block;
}

.input-label-small {
  font-size: 12px;
  font-weight: 500;
  color: #6b7280;
  margin-bottom: 4px;
  display: block;
}

.submit-btn {
  background: #3b82f6 !important;
  color: #ffffff !important;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.gap-2 {
  gap: 8px;
}
</style>
