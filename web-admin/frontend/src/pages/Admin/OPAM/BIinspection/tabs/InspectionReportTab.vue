<template>
  <v-row>
    <v-col cols="12" md="7" lg="8">
      <v-card
        flat
        class="rounded-lg border d-flex align-center justify-center bg-white"
        height="600"
      >
        <div class="text-center">
          <v-icon size="64" color="grey-lighten-1" class="mb-4">
            mdi-file-document-outline
          </v-icon>
          <h2 class="text-h5 font-weight-bold text-grey-darken-1">
            Architectural Plan Placeholder
          </h2>
          <p class="text-caption text-grey">PDF/Image Viewer Integration Area</p>
        </div>
      </v-card>
    </v-col>

    <v-col cols="12" md="5" lg="4">
      <v-card
        flat
        class="rounded-xl border d-flex flex-column bg-white"
        height="600"
      >
        <div class="pa-4 pb-2">
          <h3 class="text-caption font-weight-bold text-blue-darken-3">
            Architectural Works Inspection Report
          </h3>
        </div>

        <v-card-text class="overflow-y-auto px-5 py-0 flex-grow-1">
          <div
            v-for="(item, i) in requirements"
            :key="i"
            class="checklist-item-wrapper"
          >
            <v-checkbox
              v-model="localCheckedRequirements"
              :value="item"
              color="blue-darken-3"
              hide-details
              density="compact"
              class="inspection-checkbox"
            >
              <template #label>
                <span class="text-body-2 text-grey-darken-3">{{ item }}</span>
              </template>
            </v-checkbox>
            <v-textarea
              v-model="localRemarks[item]"
              placeholder="Add your remarks here..."
              variant="outlined"
              density="compact"
              hide-details
              rows="2"
              class="ml-8 mt-1 mb-2 rounded-lg reason-input"
              bg-color="white"
            ></v-textarea>
          </div>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions class="pa-4 bg-white d-flex justify-end">
          <v-btn
            color="blue-darken-2"
            variant="flat"
            class="text-none font-weight-bold px-6"
            rounded="lg"
            @click="handleSubmit"
            size="small"
          >
            Submit Report
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  requirements: string[];
  checkedRequirements: string[];
  remarks: Record<string, string>;
}>();

const emit = defineEmits<{
  (e: "update:checkedRequirements", value: string[]): void;
  (e: "update:remarks", value: Record<string, string>): void;
  (e: "submit"): void;
}>();

const localCheckedRequirements = ref([...props.checkedRequirements]);
const localRemarks = ref({ ...props.remarks });

watch(localCheckedRequirements, (val) => {
  emit("update:checkedRequirements", val);
}, { deep: true });

watch(localRemarks, (val) => {
  emit("update:remarks", val);
}, { deep: true });

const handleSubmit = () => {
  emit("submit");
};
</script>

<style scoped>
.checklist-item-wrapper {
  margin-bottom: 2px;
}

.inspection-checkbox :deep(.v-selection-control) {
  min-height: 24px !important;
}

.inspection-checkbox :deep(.v-label) {
  font-size: 12px !important;
  opacity: 1 !important;
  padding-inline-start: 8px !important;
}

.reason-input :deep(.v-field__input) {
  font-size: 12px !important;
  min-height: 28px !important;
  padding: 4px 8px !important;
}
</style>
