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
                    class="text-caption"
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

    <v-main
      style="
        background-color: #f5f6fa;
        padding-top: 88px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      "
    >
      <v-container fluid class="pa-6 pb-0">
        <v-btn
          color="blue-darken-2"
          variant="text"
          class="mb-4"
          @click="goBack"
        >
          <v-icon start>mdi-arrow-left</v-icon>
          Back
        </v-btn>
      </v-container>

      <v-container
        fluid
        class="px-6 pb-6 pt-0 flex-grow-1"
        style="overflow: hidden; display: flex; flex-direction: column"
      >
        <v-card
          elevation="2"
          class="rounded-lg flex-grow-1 d-flex flex-column"
          style="overflow: hidden"
        >
          <v-card-title class="pa-0">
            <v-tabs
              v-model="activeTab"
              color="blue-darken-2"
              bg-color="white"
              height="60"
            >
              <v-tab value="information" class="text-none font-weight-bold">
                <v-icon start>mdi-information-outline</v-icon>
                Plan Information
              </v-tab>
              <v-tab value="evaluation" class="text-none font-weight-bold">
                <v-icon start>mdi-clipboard-check-outline</v-icon>
                Plan Evaluation
              </v-tab>
            </v-tabs>
          </v-card-title>
          <v-divider></v-divider>

          <v-card-text class="pa-0 flex-grow-1" style="overflow: hidden">
            <v-window v-model="activeTab" class="h-100">
              <v-window-item value="information" class="h-100">
                <div
                  class="d-flex flex-wrap pa-6 h-100"
                  style="overflow-y: auto; gap: 20px"
                >
                  <div
                    class="d-flex flex-column"
                    style="flex: 2; min-width: 350px; flex-shrink: 0"
                  >
                    <v-card
                      elevation="2"
                      class="rounded-lg mb-5"
                      v-if="selectedApplicant.id"
                    >
                      <div class="pa-4">
                        <div class="d-flex align-center mb-3">
                          <v-icon class="me-3" color="blue"
                            >mdi-account-details-outline</v-icon
                          >
                          <div class="text-h6 font-weight-bold">
                            Applicant Information
                          </div>
                        </div>
                        <v-divider class="mb-4"></v-divider>
                        <v-row dense>
                          <v-col cols="12" sm="6" class="mb-2">
                            <div class="text-caption text-grey-darken-1">
                              Applicant Name:
                            </div>
                            <div
                              class="text-subtitle-2 font-weight-bold text-black"
                            >
                              {{ selectedApplicant.applicantName }}
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6" class="mb-2">
                            <div class="text-caption text-grey-darken-1">
                              Project Name:
                            </div>
                            <div
                              class="text-subtitle-2 font-weight-bold text-black"
                            >
                              {{ selectedApplicant.projectName }}
                            </div>
                          </v-col>
                          <v-col cols="12">
                            <div class="text-caption text-grey-darken-1">
                              Project Location:
                            </div>
                            <div
                              class="text-subtitle-2 font-weight-bold text-black"
                            >
                              {{ selectedApplicant.projectLocation }}
                            </div>
                          </v-col>
                        </v-row>
                      </div>
                    </v-card>

                    <v-card
                      elevation="2"
                      class="rounded-lg mb-5"
                      v-if="selectedApplicant.id"
                    >
                      <div class="pa-4">
                        <div class="d-flex align-center mb-3">
                          <v-icon class="me-3" color="blue"
                            >mdi-home-city-outline</v-icon
                          >
                          <div class="text-h6 font-weight-bold">
                            Property Details
                          </div>
                        </div>
                        <v-divider class="mb-4"></v-divider>
                        <v-row dense>
                          <v-col cols="12" sm="6" class="mb-2">
                            <div class="text-caption text-grey-darken-1">
                              Property Type:
                            </div>
                            <div
                              class="text-subtitle-2 font-weight-bold text-black"
                            >
                              {{
                                selectedApplicant.propertyDetails.propertyType
                              }}
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6" class="mb-2">
                            <div class="text-caption text-grey-darken-1">
                              Building Use:
                            </div>
                            <div
                              class="text-subtitle-2 font-weight-bold text-black"
                            >
                              {{
                                selectedApplicant.propertyDetails.buildingUse
                              }}
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6" class="mb-2">
                            <div class="text-caption text-grey-darken-1">
                              Floor Area:
                            </div>
                            <div
                              class="text-subtitle-2 font-weight-bold text-black"
                            >
                              {{ selectedApplicant.propertyDetails.floorArea }}
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6" class="mb-2">
                            <div class="text-caption text-grey-darken-1">
                              Number of Floors:
                            </div>
                            <div
                              class="text-subtitle-2 font-weight-bold text-black"
                            >
                              {{
                                selectedApplicant.propertyDetails.numberOfFloors
                              }}
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6" class="mb-2">
                            <div class="text-caption text-grey-darken-1">
                              Lot Area:
                            </div>
                            <div
                              class="text-subtitle-2 font-weight-bold text-black"
                            >
                              {{ selectedApplicant.propertyDetails.lotArea }}
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6" class="mb-2">
                            <div class="text-caption text-grey-darken-1">
                              Property Address:
                            </div>
                            <div
                              class="text-subtitle-2 font-weight-bold text-black"
                            >
                              {{
                                selectedApplicant.propertyDetails
                                  .propertyAddress
                              }}
                            </div>
                          </v-col>
                        </v-row>
                      </div>
                    </v-card>

                    <v-card
                      elevation="2"
                      class="rounded-lg"
                      v-if="selectedApplicant.id"
                    >
                      <div class="pa-4">
                        <div class="d-flex align-center mb-3">
                          <v-icon class="me-3" color="blue"
                            >mdi-file-download-outline</v-icon
                          >
                          <div class="text-h6 font-weight-bold">
                            Submitted Documents
                          </div>
                        </div>
                        <v-divider class="mb-4"></v-divider>
                        <v-list class="pa-0">
                          <v-list-item
                            v-for="(plan, index) in selectedApplicant.documents
                              .surveyPlans"
                            :key="index"
                            class="rounded-lg mb-2 document-item"
                            lines="two"
                            color="blue"
                          >
                            <template v-slot:prepend>
                              <v-icon color="red-darken-1" size="24"
                                >mdi-file-pdf-box</v-icon
                              >
                            </template>
                            <v-list-item-title
                              class="font-weight-bold text-body-1"
                            >
                              {{ plan.name }}
                              <v-chip
                                size="x-small"
                                label
                                class="ml-2 text-uppercase"
                                color="blue-grey-lighten-4"
                                >{{ plan.planType }}</v-chip
                              >
                            </v-list-item-title>
                            <v-list-item-subtitle class="text-caption">
                              {{ plan.description }} - {{ plan.size }} MB
                            </v-list-item-subtitle>

                            <template v-slot:append>
                              <v-btn
                                color="blue"
                                variant="outlined"
                                size="small"
                                class="text-none"
                                @click="switchToEvaluation(plan)"
                                >Evaluate</v-btn
                              >
                            </template>
                          </v-list-item>
                        </v-list>
                      </div>
                    </v-card>
                  </div>

                  <div
                    class="d-flex flex-column overflow-y-auto"
                    style="flex: 1; min-width: 300px; min-height: 0"
                  >
                    <v-card
                      elevation="2"
                      class="rounded-lg mb-5"
                      v-if="selectedApplicant.id"
                    >
                      <div class="pa-4">
                        <div class="d-flex align-center mb-3">
                          <v-icon class="me-3" color="blue"
                            >mdi-text-box-outline</v-icon
                          >
                          <div class="text-h6 font-weight-bold">
                            Application Summary
                          </div>
                        </div>
                        <v-divider class="mb-4"></v-divider>
                        <v-row dense>
                          <v-col cols="12" class="mb-2">
                            <div class="text-caption text-grey-darken-1">
                              Application Number
                            </div>
                            <div
                              class="text-subtitle-2 font-weight-bold text-black"
                            >
                              {{ selectedApplicant.applicationId }}
                            </div>
                          </v-col>
                          <v-col cols="12" class="mb-2">
                            <div class="text-caption text-grey-darken-1">
                              Type
                            </div>
                            <div
                              class="text-subtitle-2 font-weight-bold text-black"
                            >
                              {{ selectedApplicant.type }}
                            </div>
                          </v-col>
                          <v-col cols="12" class="mb-2">
                            <div class="text-caption text-grey-darken-1">
                              Processing Fee
                            </div>
                            <div
                              class="text-subtitle-2 font-weight-bold text-black"
                            >
                              {{ selectedApplicant.processingFee }}
                            </div>
                          </v-col>
                          <v-col cols="12">
                            <div class="text-caption text-grey-darken-1 mb-1">
                              Payment Status
                            </div>
                            <v-chip
                              :color="selectedApplicant.paymentStatusColor"
                              size="small"
                              variant="flat"
                              label
                              class="font-weight-bold"
                              >{{ selectedApplicant.paymentStatus }}</v-chip
                            >
                          </v-col>
                        </v-row>
                        <div class="text-caption mt-4 text-grey-darken-2">
                          <strong>Note:</strong>
                          Payment will be processed after plan evaluation is
                          complete.
                        </div>
                      </div>
                    </v-card>

                    <v-card
                      elevation="2"
                      class="rounded-lg"
                      v-if="selectedApplicant.id"
                    >
                      <div class="pa-4">
                        <div class="d-flex align-center mb-3">
                          <v-icon class="me-3" color="blue"
                            >mdi-list-box-outline</v-icon
                          >
                          <div class="text-h6 font-weight-bold">
                            Application Timeline
                          </div>
                        </div>
                        <v-divider class="mb-4"></v-divider>
                        <v-timeline side="end" align="start" density="compact">
                          <v-timeline-item
                            v-for="(event, index) in selectedApplicant.timeline"
                            :key="index"
                            :dot-color="event.color"
                            size="small"
                            :fill-dot="event.filled"
                            class="pb-0"
                          >
                            <div
                              class="text-body-2 font-weight-bold text-black"
                            >
                              {{ event.title }}
                            </div>
                            <div class="text-caption text-grey-darken-1">
                              {{ event.date }}
                            </div>
                          </v-timeline-item>
                        </v-timeline>
                      </div>
                    </v-card>
                  </div>

                  <div
                    v-if="!selectedApplicant.id"
                    class="pa-6 text-center text-h6 text-grey-darken-1 w-100 d-flex align-center justify-center"
                    style="min-height: 300px"
                  >
                    Select an application from the table to view its details and
                    begin evaluation.
                  </div>
                </div>
              </v-window-item>

              <v-window-item value="evaluation" class="h-100">
                <div class="pa-6 h-100" style="overflow-y: auto">
                  <v-row style="min-height: calc(100vh - 300px)">
                    <v-col cols="12" md="7" lg="8">
                      <v-card
                        flat
                        class="rounded-lg border d-flex align-center justify-center bg-white"
                        style="min-height: 600px"
                      >
                        <div class="text-center">
                          <h2
                            class="text-h5 font-weight-bold text-grey-darken-1"
                          >
                            {{ selectedPlanName || "Architectural Plan" }}
                            Placeholder
                          </h2>
                          <p class="text-caption text-grey">
                            PDF/Image Viewer Integration Area
                          </p>
                        </div>
                      </v-card>
                    </v-col>

                    <v-col cols="12" md="5" lg="4">
                      <v-card
                        flat
                        class="rounded-xl border d-flex flex-column bg-white"
                        style="min-height: 600px"
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
                                evaluationTab === 'checklist'
                                  ? 'active-pill'
                                  : 'inactive-pill'
                              "
                              @click="evaluationTab = 'checklist'"
                              height="36"
                            >
                              Requirements Checklist
                            </v-btn>
                            <v-btn
                              flat
                              rounded="pill"
                              class="flex-grow-1 text-none font-weight-bold transition-swing"
                              :class="
                                evaluationTab === 'assessment'
                                  ? 'active-pill'
                                  : 'inactive-pill'
                              "
                              @click="evaluationTab = 'assessment'"
                              height="36"
                            >
                              Assessment Inputs
                            </v-btn>
                          </div>
                        </div>

                        <v-card-text
                          class="overflow-y-auto px-5 py-0 flex-grow-1"
                        >
                          <v-window v-model="evaluationTab">
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
                                    nonComplianceReasons[item]
                                      ? 'red'
                                      : 'blue-darken-3'
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
                                    <span
                                      class="text-body-2 text-grey-darken-3"
                                      >{{ item }}</span
                                    >
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
                                    <span class="text-grey-darken-1"
                                      >Building Fee:</span
                                    >
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
                                  <div
                                    class="d-flex justify-space-between align-center"
                                  >
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
                        <v-card-actions
                          class="pa-4 bg-white d-flex align-center"
                        >
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
                </div>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

// Tab management
const activeTab = ref("information");
const evaluationTab = ref("checklist");
const selectedPlanName = ref("");

// Evaluation state
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

const mockEvaluatorProfile = ref({
  name: "Julian Lumanta",
  title: "Architect",
  department: "Architectural",
  avatar: "https://cdn.vuetifyjs.com/images/john.jpg",
});

const getInitials = (name) => {
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const s = {
  topToolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 24px",
    background: "#fff",
    borderBottom: "1px solid #e8eaf0",
    flexShrink: 0,
  },
  textToolbar: {
    color: "#111827",
  },
  profileBtn: {
    backgroundColor: "transparent",
    boxShadow: "none",
    padding: "0",
    minWidth: "unset",
  },
};

const applicantsDetailed = ref([
  {
    id: 1,
    applicantName: "Jim Deguzman",
    initials: "JD",
    status: "Verified",
    applicationNumber: "BP-2024-808123-T",
    applicationId: "BP-2024-000123-T",
    projectName: "Commercial Building",
    projectLocation: "San Felipe, Deca II Naga City",
    propertyDetails: {
      propertyType: "Commercial Building",
      buildingUse: "Retail Store",
      floorArea: "230 sq m",
      numberOfFloors: "2 Floors",
      propertyAddress: "456 Commercial Avenue, San Felipe, Deca I Naga City",
      lotArea: "350 sq m",
    },
    documents: {
      surveyPlans: [
        {
          name: "Architectural Plan ",
          description: "Floor plan and elevations",
          size: 2.5,
          planType: "Architectural",
        },
      ],
    },
    type: "Building Permit",
    processingFee: "₱2,500.00",
    paymentStatus: "Pending Plan Evaluation",
    paymentStatusColor: "#FBF46D",
    timeline: [
      {
        title: "Application Submitted",
        date: "Jan 16, 2024 - 10:30 AM",
        color: "#B4FE98",
        filled: true,
      },
      {
        title: "Under Architectural Review",
        date: "Jan 17, 2024 - 9:00 AM",
        color: "#FBF46D",
        filled: true,
      },
      {
        title: "Payment Processing",
        date: "Pending",
        color: "grey",
        filled: false,
      },
    ],
  },
  {
    id: 2,
    applicantName: "Sarah Geronimo",
    initials: "SG",
    status: "Pending",
    applicationNumber: "BP-2024-808234-T",
    applicationId: "BP-2024-000234-T",
    projectName: "Residential Building",
    projectLocation: "Abucay, Naga City",
    propertyDetails: {
      propertyType: "Residential Building",
      buildingUse: "Apartment",
      floorArea: "450 sq m",
      numberOfFloors: "5 Floors",
      propertyAddress: "123 Abucay Street, Abucay, Naga City",
      lotArea: "600 sq m",
    },
    documents: {
      surveyPlans: [
        {
          name: "Architectural Plan ",
          description: "Floor plan and elevations",
          size: 3.2,
          planType: "Architectural",
        },
      ],
    },
    type: "Building Permit",
    processingFee: "₱250",
    paymentStatus: "Pending Payment",
    paymentStatusColor: "#FBF46D",
    timeline: [
      {
        title: "Application Submitted",
        date: "Jan 16, 2024 - 2:15 PM",
        color: "#B4FE98",
        filled: true,
      },
      {
        title: "Under Architectural Review",
        date: "Jan 18, 2024 - 10:00 AM",
        color: "#FBF46D",
        filled: true,
      },
      {
        title: "Payment Processing",
        date: "Pending",
        color: "grey",
        filled: false,
      },
    ],
  },
  {
    id: 3,
    applicantName: "Michael Padilla",
    initials: "MP",
    status: "Return",
    applicationNumber: "BP-2024-808345-T",
    applicationId: "BP-2024-000345-T",
    projectName: "Mixed-Use Building",
    projectLocation: "Tinago, Naga City",
    propertyDetails: {
      propertyType: "Mixed-Use Building",
      buildingUse: "Commercial/Residential",
      floorArea: "800 sq m",
      numberOfFloors: "8 Floors",
      propertyAddress: "789 Tinago Avenue, Tinago, Naga City",
      lotArea: "1000 sq m",
    },
    documents: {
      surveyPlans: [
        {
          name: "Architectural Plan ",
          description: "Floor plan and elevations",
          size: 4.1,
          planType: "Architectural",
        },
      ],
    },
    type: "Building Permit",
    processingFee: "₱4,500.00",
    paymentStatus: "Returned for Revision",
    paymentStatusColor: "#FF6B6B",
    timeline: [
      {
        title: "Application Submitted",
        date: "Jan 14, 2024 - 9:00 AM",
        color: "#B4FE98",
        filled: true,
      },
      {
        title: "Under Review",
        date: "Jan 15, 2024 - 11:00 AM",
        color: "#FBF46D",
        filled: true,
      },
      {
        title: "Returned for Revision",
        date: "Jan 19, 2024 - 3:30 PM",
        color: "#FF6B6B",
        filled: true,
      },
    ],
  },
  {
    id: 4,
    applicantName: "David Tolo",
    initials: "DT",
    status: "Pending",
    applicationNumber: "BP-2024-808678-T",
    applicationId: "BP-2024-000678-T",
    projectName: "Structural Addition",
    projectLocation: "West Poblacion, Naga City",
    propertyDetails: {
      propertyType: "Structural Addition",
      buildingUse: "Industrial Warehouse",
      floorArea: "1200 sq m",
      numberOfFloors: "3 Floors",
      propertyAddress: "321 West Poblacion Road, Naga City",
      lotArea: "1500 sq m",
    },
    documents: {
      surveyPlans: [
        {
          name: "Structural Plan ",
          description: "Structural design and specifications",
          size: 5.3,
          planType: "Structural",
        },
      ],
    },
    type: "Building Permit",
    processingFee: "₱5,000.00",
    paymentStatus: "Pending Structural Review",
    paymentStatusColor: "#FBF46D",
    timeline: [
      {
        title: "Application Submitted",
        date: "Jan 20, 2024 - 8:00 AM",
        color: "#B4FE98",
        filled: true,
      },
      {
        title: "Under Structural Review",
        date: "Jan 21, 2024 - 9:00 AM",
        color: "#FBF46D",
        filled: true,
      },
      {
        title: "Awaiting Evaluation",
        date: "Pending",
        color: "grey",
        filled: false,
      },
    ],
  },
]);

const selectedApplicant = computed(() => {
  const applicationNumber = route.query.applicationNumber;
  if (applicationNumber) {
    const found = applicantsDetailed.value.find(
      (app) => app.applicationNumber === applicationNumber
    );
    return found || {};
  }
  return {};
});

const logout = () => {
  console.log("User clicked logout");
  router.push("/login");
};

const goBack = () => {
  router.back();
};

const switchToEvaluation = (plan) => {
  selectedPlanName.value = plan.name;
  activeTab.value = "evaluation";
};

const formatCurrency = (val) =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(
    val
  );
</script>

<style scoped>
.document-item {
  transition: all 0.2s ease;
  cursor: pointer;
}

.document-item:hover {
  background-color: #f0f0f0;
}

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