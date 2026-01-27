<template>
  <v-row>
    <v-col cols="12">
      <div
        v-for="(section, sIndex) in sections"
        :key="sIndex"
        class="mb-8"
      >
        <div class="d-flex align-center justify-space-between mb-4">
          <span class="text-subtitle-1 font-weight-bold">{{ section.title }}</span>
          <v-chip
            color="success"
            variant="flat"
            size="small"
            class="font-weight-bold"
          >
            <v-icon start size="16">mdi-check-circle</v-icon>
            Complete
          </v-chip>
        </div>
        <v-row dense>
          <v-col
            cols="12"
            v-for="(item, iIndex) in section.items"
            :key="iIndex"
          >
            <div class="checklist-item-wrapper">
              <v-checkbox
                :model-value="true"
                color="blue-darken-2"
                hide-details
                density="compact"
                class="custom-checkbox-checked"
                readonly
              >
                <template #label>
                  <span style="color: #000000; font-size: 16px">{{ item.text }}</span>
                </template>
              </v-checkbox>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- What's Next Section -->
      <v-card class="whats-next-card mt-6" flat>
        <v-card-text class="pa-5">
          <div class="d-flex align-center mb-4">
            <v-icon color="blue-darken-2" class="mr-2">mdi-information-outline</v-icon>
            <span class="text-subtitle-1 font-weight-bold">What's Next?</span>
          </div>

          <div class="next-step-item mb-4">
            <div class="d-flex align-start">
              <v-avatar color="blue-darken-2" size="28" class="mr-3 mt-1">
                <span class="text-white font-weight-bold" style="font-size: 14px">1</span>
              </v-avatar>
              <div>
                <div class="font-weight-bold" style="font-size: 15px">
                  Checklist Verification Complete
                </div>
                <div class="text-grey-darken-1" style="font-size: 14px">
                  All required documents have been verified and marked as complete.
                </div>
              </div>
            </div>
          </div>

          <div class="next-step-item mb-4">
            <div class="d-flex align-start">
              <v-avatar color="blue-darken-2" size="28" class="mr-3 mt-1">
                <span class="text-white font-weight-bold" style="font-size: 14px">2</span>
              </v-avatar>
              <div>
                <div class="font-weight-bold" style="font-size: 15px">
                  Schedule On-site Inspection
                </div>
                <div class="text-grey-darken-1" style="font-size: 14px">
                  Set an inspection schedule and assign qualified inspectors to each category.
                </div>
              </div>
            </div>
          </div>

          <v-divider class="my-3"></v-divider>

          <div class="text-grey-darken-1" style="font-size: 13px">
            <span class="font-weight-bold">Note:</span> You can monitor the inspection
            schedule status in the "Inspection Schedule" tab above.
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
interface ChecklistItem {
  text: string;
  checked?: boolean;
}

interface ChecklistSection {
  title: string;
  items: ChecklistItem[];
}

defineProps<{
  sections: ChecklistSection[];
}>();
</script>

<style scoped>
.custom-checkbox-checked :deep(.v-label) {
  opacity: 1 !important;
  font-size: 16px !important;
  color: #000000 !important;
}

.custom-checkbox-checked :deep(.v-selection-control__input) {
  color: #1565c0 !important;
}

.custom-checkbox-checked :deep(.v-checkbox .v-selection-control) {
  opacity: 1 !important;
}

.whats-next-card {
  background-color: #eff6ff !important;
  border: 1px solid #bfdbfe !important;
  border-radius: 12px !important;
}

.next-step-item {
  padding-left: 4px;
}
</style>
