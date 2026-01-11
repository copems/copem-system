<template>
  <v-app class="bg-slate-50" style="font-family: 'Arial', sans-serif">
    <v-app-bar
      flat
      color="white"
      height="88"
      class="elevation-4 border-b"
      app
      style="position: fixed; top: 0; z-index: 1006"
    >
      <v-container
        fluid
        class="d-flex align-center py-0 h-100"
        style="max-width: 100%; padding-left: 24px; padding-right: 24px"
      >
        <div class="d-flex align-center">
          <v-img
            src="https://www2.naga.gov.ph/wp-content/uploads/2022/05/Naga_City_Official_Seal-1.png"
            alt="LGU Seal"
            width="85"
            height="75"
            contain
            class="me-4"
          />
          <div>
            <div
              style="
                font-size: var(--text-label);
                font-weight: 400;
                color: Black;
                line-height: 1.2;
              "
            >
              REPUBLIC OF THE PHILIPPINES
            </div>
            <div
              style="
                font-size: var(--text-body);
                font-weight: 700;
                color: Black;
                line-height: 1.2;
              "
            >
              CITY GOVERNMENT OF NAGA
            </div>
          </div>
        </div>

        <v-spacer></v-spacer>

        <div class="d-flex align-center">
          <v-menu location="bottom end">
            <template #activator="{ props }">
              <v-btn variant="text" :style="s.profileBtn" v-bind="props">
                <v-avatar size="32" class="mx-2" color="blue-darken-2">
                  <span class="text-white font-weight-bold text-caption">
                    {{ getInitials(mockEvaluatorProfile.name) }}
                  </span>
                </v-avatar>
                <div class="d-flex flex-column text-left">
                  <span
                    class="text-caption font-weight-bold"
                    style="color: #555; white-space: nowrap"
                  >
                    {{ mockEvaluatorProfile.name }}
                  </span>
                  <span
                    class="text-caption font-weight-medium"
                    style="color: #888; white-space: nowrap"
                  >
                    {{ mockEvaluatorProfile.title }}
                  </span>
                </div>
                <v-icon class="ml-1" size="small">mdi-chevron-down</v-icon>
              </v-btn>
            </template>

            <v-card min-width="200" class="mt-1 border shadow-sm">
              <v-list density="compact" nav>
                <v-list-item>
                  <v-list-item-title class="font-weight-bold">
                    {{ mockEvaluatorProfile.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ mockEvaluatorProfile.specialty }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-divider class="my-1"></v-divider>
                <v-list-item link @click="logout" class="text-red-darken-1">
                  <template #prepend><v-icon>mdi-logout</v-icon></template>
                  <v-list-item-title>Log Out</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </div>
      </v-container>
    </v-app-bar>

    <v-main class="bg-grey-lighten-4">
      <v-container fluid class="px-6 pt-2 pb-6">
        <div class="mb-3 d-flex align-center">
          <v-icon color="blue-darken-3" class="mr-2" size="20"
            >mdi-file-document-outline</v-icon
          >
          <span class="text-subtitle-1 font-weight-bold text-blue-darken-4">
            Document Evaluation: Architectural Plan
          </span>
          <v-chip
            size="small"
            color="blue"
            class="ml-3 font-weight-bold text-uppercase"
            variant="flat"
          >
            Architectural
          </v-chip>
        </div>

        <v-row>
          <v-col cols="12" md="7" lg="8" class="pt-0">
            <v-card
              flat
              class="rounded-lg border d-flex align-center justify-center bg-white"
              height="calc(100vh - 165px)"
            >
              <div class="text-center">
                <h2 class="text-h5 font-weight-bold text-grey-darken-1">
                  Architectural Plan Placeholder
                </h2>
                <p class="text-caption text-grey">
                  PDF/Image Viewer Integration Area
                </p>
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" md="5" lg="4" class="pt-0">
            <v-card
              flat
              class="rounded-xl border d-flex flex-column bg-white"
              height="calc(100vh - 165px)"
            >
              <div class="pa-4 pb-1">
                <div
                  class="pill-container bg-grey-lighten-4 rounded-pill d-flex pa-1"
                >
                  <v-btn
                    flat
                    rounded="pill"
                    class="flex-grow-1 text-none font-weight-bold transition-swing"
                    :class="
                      activeTab === 'checklist'
                        ? 'active-pill'
                        : 'inactive-pill'
                    "
                    @click="activeTab = 'checklist'"
                    height="36"
                  >
                    Requirements Checklist
                  </v-btn>
                  <v-btn
                    flat
                    rounded="pill"
                    class="flex-grow-1 text-none font-weight-bold transition-swing"
                    :class="
                      activeTab === 'assessment'
                        ? 'active-pill'
                        : 'inactive-pill'
                    "
                    @click="activeTab = 'assessment'"
                    height="36"
                  >
                    Assessment Inputs
                  </v-btn>
                </div>
              </div>

              <v-card-text class="overflow-y-auto px-5 py-0 flex-grow-1">
                <v-window v-model="activeTab">
                  <v-window-item value="checklist">
                    <h3
                      class="text-caption font-weight-bold text-blue-darken-3 mb-1"
                    >
                      Architectural Requirements Checklist
                    </h3>
                    <div
                      v-for="(item, i) in requirements"
                      :key="i"
                      class="checklist-item-wrapper"
                    >
                      <v-checkbox
                        v-model="checkedRequirements"
                        :value="item"
                        :color="
                          nonComplianceReasons[item] ? 'red' : 'blue-darken-3'
                        "
                        :false-icon="
                          nonComplianceReasons[item]
                            ? 'mdi-close-box'
                            : '$checkboxOff'
                        "
                        hide-details
                        density="compact"
                        class="custom-checkbox"
                        @change="clearReasonIfChecked(item)"
                      >
                        <template #label>
                          <span class="text-body-2 text-grey-darken-3">{{
                            item
                          }}</span>
                        </template>
                      </v-checkbox>
                      <v-text-field
                        v-if="!checkedRequirements.includes(item)"
                        v-model="nonComplianceReasons[item]"
                        placeholder="Reason for non-compliance..."
                        variant="outlined"
                        density="compact"
                        hide-details
                        class="ml-8 mt-1 mb-2 rounded-lg reason-input"
                        bg-color="white"
                        @input="uncheckIfHasValue(item)"
                      ></v-text-field>
                    </div>
                  </v-window-item>

                  <v-window-item value="assessment">
                    <div class="mb-4">
                      <h3
                        class="text-caption font-weight-bold text-blue-darken-3 mb-2"
                      >
                        Project Parameters (Basis of Assessment)
                      </h3>
                      <v-select
                        v-model="assessment.occupancy"
                        label="Character of Occupancy (Group)"
                        :items="occupancyGroups"
                        variant="outlined"
                        density="comfortable"
                        class="mb-3"
                        hide-details
                      ></v-select>
                      <v-text-field
                        v-model.number="assessment.floorArea"
                        label="Total Floor Area"
                        suffix="sqm"
                        type="number"
                        variant="outlined"
                        density="comfortable"
                        hide-details
                      ></v-text-field>
                    </div>

                    <div class="mb-4">
                      <h3
                        class="text-caption font-weight-bold text-blue-darken-3 mb-2"
                      >
                        Fee Computation
                      </h3>
                      <div
                        class="bg-blue-grey-lighten-5 pa-4 rounded-lg border"
                      >
                        <div
                          class="d-flex justify-space-between text-body-2 mb-2"
                        >
                          <span class="text-grey-darken-1">Building Fee:</span>
                          <span class="font-weight-medium">{{
                            formatCurrency(buildingFee)
                          }}</span>
                        </div>
                        <div
                          class="d-flex justify-space-between text-body-2 mb-2"
                        >
                          <span class="text-grey-darken-1"
                            >Processing Fee:</span
                          >
                          <span class="font-weight-medium">{{
                            formatCurrency(processingFee)
                          }}</span>
                        </div>
                        <v-divider class="my-3"></v-divider>
                        <div class="d-flex justify-space-between align-center">
                          <span
                            class="text-subtitle-2 font-weight-bold text-blue-darken-4"
                            >Total Amount Due:</span
                          >
                          <span
                            class="text-subtitle-1 font-weight-black text-blue-darken-4"
                          >
                            {{ formatCurrency(totalAmountDue) }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </v-window-item>
                </v-window>
              </v-card-text>

              <v-divider></v-divider>
              <v-card-actions class="pa-4 bg-white d-flex align-center">
                <div
                  class="text-caption font-weight-bold text-grey-darken-1 mr-2"
                >
                  Status:
                </div>
                <v-chip
                  :color="statusColor"
                  size="x-small"
                  variant="flat"
                  class="font-weight-bold px-3"
                >
                  {{ currentStatus }}
                </v-chip>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue-darken-2"
                  variant="flat"
                  class="text-none font-weight-bold px-6"
                  rounded="lg"
                  @click="submitForm"
                  size="small"
                >
                  Submit Evaluation
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from "vue";

// UI Style Object
const s = {
  profileBtn: {
    backgroundColor: "transparent",
    boxShadow: "none",
    padding: "0",
    minWidth: "unset",
  },
};

// Mock Profile Data
const mockEvaluatorProfile = ref({
  name: "Julian Lumanta",
  title: "Architect",
});

// Checklist Logic
const activeTab = ref("checklist");
const checkedRequirements = ref([]);
const nonComplianceReasons = ref({});
const requirements = [
  "Standard Form (Type A0, A1, A2, A3) for Bldg Plans",
  "Lot Plan (Orientation, Bearing, Distance, Roads, Area)",
  "Site Development Plan (Scale, Tech Desc, Setbacks)",
  "Restrictions: Abutments and Firewalls",
  "Vicinity Map/Location Plan (2km radius)",
  "Perspective (Eye level or Bird's Eye View)",
  "Column Gridlines & Dimensions (All plans)",
  "Floor Plans (min 1:100m, labels, dimensions)",
  "Min. 4 Elevations and 2 Sections (showing heights)",
  "Stairs/Access Details (Comply with PD 1096, BP 344)",
  "Toilet and Bath Details (plans, sections, finishes)",
  "Kitchen Details (plans, sections, finishes)",
  "Doors and Windows Schedule & Details",
  "Roof Plan / Roof Deck Plan (Passable/Non-passable)",
  "Other Architectural Details (as needed)",
];

// Assessment State
const assessment = ref({
  occupancy: "Group A-1 (Single Detached)",
  floorArea: 0,
});
const occupancyGroups = [
  "Group A-1 (Single Detached)",
  "Group A-2 (Duplex/Townhouse)",
  "Group B (Commercial)",
  "Group C (Industrial)",
  "Group D (Institutional)",
  "Group E (Educational)",
];

// Calculation Logic
const buildingFee = computed(() => assessment.value.floorArea * 23.0);
const processingFee = computed(() =>
  assessment.value.floorArea > 0 ? 500.0 : 0
);
const totalAmountDue = computed(() => buildingFee.value + processingFee.value);

// Checklist Actions
const uncheckIfHasValue = (item) => {
  if (nonComplianceReasons.value[item]?.length > 0) {
    const idx = checkedRequirements.value.indexOf(item);
    if (idx > -1) checkedRequirements.value.splice(idx, 1);
  }
};
const clearReasonIfChecked = (item) => {
  if (checkedRequirements.value.includes(item))
    nonComplianceReasons.value[item] = "";
};

// Utilities
const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2);
const formatCurrency = (val) =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(
    val
  );
const logout = () => alert("Logging out...");
const currentStatus = computed(() =>
  checkedRequirements.value.length === requirements.length
    ? "Approved"
    : "For Revision"
);
const statusColor = computed(() =>
  checkedRequirements.value.length === requirements.length
    ? "success"
    : "orange-lighten-2"
);
const submitForm = () => alert("Evaluation Submitted Successfully");
</script>

<style scoped>
.pill-container {
  border: 1px solid #e0e0e0;
}
.active-pill {
  background-color: white !important;
  color: #000000 !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
}
.inactive-pill {
  color: #757575 !important;
}
.reason-input :deep(.v-field__input) {
  font-size: var(--text-label) !important;
  min-height: 28px !important;
  padding: 4px 8px !important;
}
.checklist-item-wrapper {
  margin-bottom: 2px;
}
.custom-checkbox :deep(.v-selection-control) {
  min-height: 24px !important;
}
.custom-checkbox :deep(.v-label) {
  font-size: var(--text-label) !important;
  opacity: 1 !important;
  padding-inline-start: 8px !important;
}
</style>