<template>
  <div>
    <div class="print-section mb-6">
      <div class="d-flex justify-space-between align-center mb-4">
        <div></div>
        <div class="text-right">
          <div class="text-caption uppercase">DATE OF INSPECTION</div>
          <div class="text-body-2 font-weight-bold">
            {{ inspectionData.inspectionDate }}
          </div>
        </div>
      </div>
    </div>

    <v-divider class="my-4 no-print"></v-divider>

    <div class="print-section mb-6">
      <div class="text-overline text-primary font-weight-bold mb-2 print-title-sm">
        PROJECT IDENTIFICATION
      </div>
      <v-row no-gutters class="print-tight-row">
        <v-col cols="12" md="6" class="mb-2">
          <span class="text-caption uppercase print-label">Name of Owner:</span>
          <span class="text-body-2 font-weight-bold ml-2">{{ inspectionData.ownerName }}</span>
        </v-col>
        <v-col cols="12" md="6" class="mb-2">
          <span class="text-caption uppercase print-label">Address of Owner:</span>
          <span class="text-body-2 font-weight-bold ml-2">{{ inspectionData.ownerAddress }}</span>
        </v-col>
        <v-col cols="12" md="6" class="mb-2">
          <span class="text-caption uppercase print-label">Location of Installation:</span>
          <span class="text-body-2 font-weight-bold ml-2">{{ inspectionData.installationLocation }}</span>
        </v-col>
        <v-col cols="12" md="6" class="mb-2">
          <span class="text-caption uppercase print-label">Use or Character of Occupancy / No. of Storeys:</span>
          <span class="text-body-2 font-weight-bold ml-2">{{ inspectionData.occupancyCharacter }}</span>
        </v-col>
      </v-row>
    </div>

    <v-divider class="my-4 no-print"></v-divider>

    <div class="print-section">
      <div class="text-overline text-primary font-weight-bold mb-4 print-title-sm">
        INSPECTION REPORT
      </div>

      <!-- Inspection Sections -->
      <div
        v-for="(section, sIndex) in inspectionData.sections"
        :key="sIndex"
        class="mb-6"
      >
        <v-card class="rounded-lg border" flat>
          <v-card-title
            class="font-weight-bold py-3 border-b"
            style="font-size: 16px; color: #000"
          >
            {{ section.title }}
          </v-card-title>
          <v-card-text class="pa-4">
            <div class="text-caption mb-3">
              Inspector:
              <span class="font-weight-bold">{{ section.inspector }}</span>
              <span class="mx-1">|</span> Date:
              <span class="font-weight-bold">{{ section.date }}</span>
            </div>

            <v-row dense>
              <v-col
                v-for="(item, iIndex) in section.items"
                :key="iIndex"
                cols="12"
                md="6"
              >
                <div class="d-flex align-start mb-2">
                  <v-icon color="black" size="20" class="mr-2 mt-1">
                    {{ item.checked ? "mdi-checkbox-marked" : "mdi-checkbox-blank-outline" }}
                  </v-icon>
                  <div class="flex-grow-1">
                    <div class="text-body-2">{{ item.text }}</div>
                    <div
                      v-if="item.remarks"
                      class="text-caption text-grey-darken-1 font-italic"
                    >
                      Remarks: {{ item.remarks }}
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </div>
    </div>

    <!-- Comments/Recommendations Section -->
    <div class="print-section mt-6">
      <v-card class="rounded-lg border" flat>
        <v-card-title
          class="font-weight-bold py-3 border-b"
          style="font-size: 16px; color: #000"
        >
          Comments/Recommendations:
        </v-card-title>
        <v-card-text class="pa-4">
          <v-textarea
            v-model="localComments"
            variant="outlined"
            rows="4"
            placeholder="Enter comments or recommendations..."
            hide-details
            class="no-print"
          ></v-textarea>
          <div
            class="print-only text-body-2"
            style="min-height: 100px; line-height: 1.8"
          >
            {{ localComments || "No additional comments or recommendations." }}
          </div>
        </v-card-text>
      </v-card>
    </div>

    <div class="mt-8 border-t pt-4 print-mt-4">
      <div class="d-flex justify-space-between align-center print-signature-block">
        <v-btn
          color="primary"
          prepend-icon="mdi-printer"
          class="text-none font-weight-bold px-6 no-print"
          rounded="lg"
          @click="$emit('print')"
        >
          Print Summary Report
        </v-btn>
        <div class="text-center" style="width: 280px">
          <div class="text-body-2 font-weight-black uppercase">
            {{ inspectionData.chiefInspector }}
          </div>
          <div class="border-b-2"></div>
          <div class="text-caption mt-1 uppercase">
            CHIEF, INSPECTION & ENFORCEMENT DIVISION
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

interface InspectionItem {
  text: string;
  checked: boolean;
  remarks: string;
}

interface InspectionSection {
  title: string;
  icon: string;
  inspector: string;
  date: string;
  items: InspectionItem[];
}

interface InspectionData {
  ownerName: string;
  ownerAddress: string;
  installationLocation: string;
  occupancyCharacter: string;
  inspectionDate: string;
  chiefInspector: string;
  comments: string;
  sections: InspectionSection[];
}

const props = defineProps<{
  inspectionData: InspectionData;
}>();

const emit = defineEmits<{
  (e: "print"): void;
  (e: "update:comments", value: string): void;
}>();

const localComments = ref(props.inspectionData.comments);

watch(localComments, (val) => {
  emit("update:comments", val);
});
</script>

<style scoped>
.uppercase {
  text-transform: uppercase;
}

.print-only {
  display: none;
}

@media print {
  .no-print {
    display: none !important;
  }

  .print-only {
    display: block !important;
  }

  .print-title-sm {
    border-bottom: 2px solid black;
    color: black !important;
    font-size: 0.875rem;
    margin-bottom: 5px !important;
  }

  .print-label {
    width: 150px;
    display: inline-block;
    color: black !important;
    font-size: 0.75rem;
  }

  .print-mt-4 {
    margin-top: 1rem !important;
  }

  .print-signature-block {
    page-break-inside: avoid;
  }
}
</style>
