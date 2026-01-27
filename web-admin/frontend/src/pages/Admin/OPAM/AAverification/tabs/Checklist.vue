<template>
  <v-row>
    <v-col cols="12">
      <div
        v-for="(section, sIndex) in sections"
        :key="sIndex"
        class="mb-8"
      >
        <div class="d-flex align-center mb-4">
          <v-avatar color="primary" size="24" class="mr-3">
            <span class="text-caption text-white">{{ sIndex + 1 }}</span>
          </v-avatar>
          <span class="text-subtitle-1 font-weight-bold uppercase">{{
            section.title
          }}</span>
          <v-spacer></v-spacer>
          <v-chip
            :color="
              checklistStatus === 'Completed'
                ? 'success'
                : checklistStatus === 'Incomplete'
                ? 'error'
                : 'warning'
            "
            variant="flat"
            size="small"
            class="font-weight-bold"
          >
            <v-icon start size="small">
              {{
                checklistStatus === "Completed"
                  ? "mdi-check-circle"
                  : checklistStatus === "Incomplete"
                  ? "mdi-alert-circle"
                  : "mdi-clock-outline"
              }}
            </v-icon>
            {{ checklistStatus }}
          </v-chip>
        </div>
        <v-row dense>
          <v-col
            cols="12"
            v-for="(item, iIndex) in section.items"
            :key="iIndex"
          >
            <div class="checklist-item-wrapper">
              <!-- Show X icon when has remarks (non-compliant) -->
              <div
                v-if="item.remarks && item.remarks.trim() !== ''"
                class="d-flex align-center"
              >
                <v-icon color="error" size="24" class="mr-2 ml-1">
                  mdi-close-box
                </v-icon>
                <span class="text-body-1 text-grey-darken-3">{{ item.text }}</span>
              </div>

              <!-- Show checkbox when no remarks -->
              <v-checkbox
                v-else
                v-model="item.checked"
                color="blue-darken-3"
                hide-details
                density="compact"
                class="custom-checkbox"
                :disabled="!isItemEditable(item)"
              >
                <template #label>
                  <span class="text-body-1 text-grey-darken-3">{{
                    item.text
                  }}</span>
                </template>
              </v-checkbox>
              <v-text-field
                v-if="!item.checked || (item.remarks && item.remarks.trim() !== '')"
                v-model="item.remarks"
                placeholder="Reason for non-compliance..."
                variant="outlined"
                density="compact"
                hide-details
                class="ml-8 mt-1 mb-2 rounded-lg"
                bg-color="white"
                :disabled="!isItemEditable(item)"
              ></v-text-field>
            </div>
          </v-col>
        </v-row>
      </div>
      <div v-if="checklistStatus !== 'Completed'" class="d-flex justify-end mt-6">
        <v-btn
          color="primary"
          class="text-none font-weight-bold px-8"
          rounded="lg"
          :disabled="!isFormValid"
          @click="handleSubmit"
        >
          Submit Checklist
        </v-btn>
      </div>
      <p v-if="checklistStatus !== 'Completed' && !isFormValid" class="text-caption text-error text-right mt-2">
        All items must be checked or have remarks before submitting.
      </p>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface ChecklistItem {
  text: string;
  checked: boolean;
  remarks: string;
}

interface ChecklistSection {
  title: string;
  items: ChecklistItem[];
}

const props = defineProps<{
  sections: ChecklistSection[];
  isSubmitted: boolean;
}>();

const emit = defineEmits<{
  (e: "submit"): void;
}>();

const checklistStatus = computed(() => {
  const allItems = props.sections.flatMap((section) => section.items);
  const hasRemarks = allItems.some((item) => item.remarks && item.remarks.trim() !== "");
  const allChecked = allItems.every((item) => item.checked);
  const someChecked = allItems.some((item) => item.checked);


  if (hasRemarks) return "Incomplete";
  if (allChecked && someChecked) return "Completed";
  return "Pending";
});

const isFormValid = computed(() => {
  const allItems = props.sections.flatMap((section) => section.items);
  return allItems.every((item) => item.checked || (item.remarks && item.remarks.trim() !== ""));
});

const isItemEditable = (item: ChecklistItem) => {
  if (!props.isSubmitted) return true;
  return item.remarks && item.remarks.trim() !== "";
};

const handleSubmit = () => {
  emit("submit");
};
</script>

<style scoped>
.custom-checkbox :deep(.v-label) {
  opacity: 1;
  font-size: 16px !important;
}

.checklist-item-wrapper :deep(.v-input--disabled) {
  opacity: 1 !important;
}

.checklist-item-wrapper :deep(.v-input--disabled .v-label) {
  opacity: 1 !important;
  color: #424242 !important;
}

.checklist-item-wrapper :deep(.v-input--disabled .v-selection-control__input) {
  opacity: 0.7;
}

.checklist-item-wrapper :deep(.v-text-field--disabled .v-field__input) {
  color: #424242 !important;
  opacity: 1 !important;
}

.checklist-item-wrapper :deep(.v-text-field--disabled .v-field) {
  opacity: 1 !important;
}
</style>
