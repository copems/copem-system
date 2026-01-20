<template>
  <v-container fluid class="pa-0 content-area fill-height">
    <v-row no-gutters class="fill-height">
      <Navigation
        :sidebar-step="sidebarStep"
        :sidebar-steps="sidebarSteps"
        @go-to-step="goToStep"
        @logout="handleLogout"
      />

      <v-col cols="12" md="9" class="main-content-bg d-flex flex-column pa-0">
        <div class="stepper-fixed-container pa-6 pb-2">
          <Stepper
            :model-value="formStepValue"
            :steps="formSteps"
            @update:model-value="formStepValue = $event"
          />
        </div>

        <div class="scrollable-content pa-6 pt-0">
          <v-container fluid class="px-4 mx-auto" style="max-width: 1300px">
            <v-card class="my-2 pa-4 card-shadow">
              <v-alert
                v-if="successMessage"
                type="success"
                closable
                @click:close="successMessage = ''"
                class="mb-4"
              >
                {{ successMessage }}
              </v-alert>
              <v-alert
                v-if="errorMessage"
                type="error"
                closable
                @click:close="errorMessage = ''"
                class="mb-4"
              >
                {{ errorMessage }}
              </v-alert>

              <v-card-text>
                <v-form ref="form" v-model="formValid">
                  <div v-if="formStepValue === 2">
                    <v-card class="mb-4 card-section">
                      <v-card-title
                        class="text-h6 card-title-responsive section-title"
                      >
                        <v-icon left color="blue-darken-3" class="mr-2"
                          >mdi-domain</v-icon
                        >
                        FOR CONSTRUCTION OWNED BY AN ENTERPRISE
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-row dense class="d-flex align-center">
                          <v-col cols="12" md="6">
                            <v-checkbox
                              v-model="is_enterprise"
                              label="Owned by an Enterprise"
                              hide-details
                              color="blue-darken-3"
                              density="comfortable"
                            ></v-checkbox>
                          </v-col>
                          <v-col cols="12" md="6">
                            <v-select
                              v-model="ownershipType"
                              :items="ownershipTypes"
                              item-title="ot_desc"
                              item-value="ot_id"
                              label="Form of Ownership"
                              variant="outlined"
                              :disabled="!is_enterprise"
                              density="comfortable"
                              :rules="[is_enterprise ? rules.required : true]"
                              prepend-inner-icon="mdi-account-group-outline"
                              color="blue-darken-3"
                              :loading="loadingOwnershipTypes"
                            ></v-select>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>

                    <v-card class="mb-4 card-section">
                      <v-card-title class="text-h6 section-title">
                        <v-icon left color="blue-darken-3" class="mr-2"
                          >mdi-map-marker</v-icon
                        >
                        PROJECT LOCATION & LOT INFORMATION
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-row dense>
                          <v-col cols="12" sm="2">
                            <div class="input-label">Lot No.</div>
                            <v-text-field
                              v-model="lotNo"
                              variant="outlined"
                              density="comfortable"
                              :rules="[rules.required]"
                              prepend-inner-icon="mdi-numeric"
                              color="blue-darken-3"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="2">
                            <div class="input-label">BLK. No.</div>
                            <v-text-field
                              v-model="blkNo"
                              variant="outlined"
                              density="comfortable"
                              :rules="[rules.required]"
                              prepend-inner-icon="mdi-numeric"
                              color="blue-darken-3"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="input-label">Street</div>
                            <v-text-field
                              v-model="street"
                              variant="outlined"
                              density="comfortable"
                              :rules="[rules.required]"
                              prepend-inner-icon="mdi-road-variant"
                              color="blue-darken-3"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="input-label">Barangay</div>
                            <v-select
                              v-model="barangay"
                              :items="barangays"
                              item-title="brgy_name"
                              item-value="brgy_id"
                              variant="outlined"
                              density="comfortable"
                              :rules="[rules.required]"
                              prepend-inner-icon="mdi-home-group"
                              color="blue-darken-3"
                              :loading="loadingBarangays"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <div class="input-label">TCT No.</div>
                            <v-text-field
                              v-model="tctNo"
                              variant="outlined"
                              density="comfortable"
                              :rules="[rules.required, rules.tctNo]"
                              prepend-inner-icon="mdi-numeric"
                              color="blue-darken-3"
                              maxlength="6"
                              placeholder="XXXXXX"
                              @input="formatTctNo"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <div class="input-label">Current Tax Dec No.</div>
                            <v-text-field
                              v-model="taxDecNo"
                              variant="outlined"
                              density="comfortable"
                              :rules="[rules.required, rules.taxDecNo]"
                              prepend-inner-icon="mdi-numeric"
                              color="blue-darken-3"
                              maxlength="6"
                              placeholder="XXXX to XXXXXX"
                              @input="formatTaxDecNo"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>

                    <v-card class="mb-4 card-section">
                      <v-card-title class="text-h6 section-title">
                        <v-icon left color="blue-darken-3" class="mr-2"
                          >mdi-hammer-wrench</v-icon
                        >
                        SCOPE OF WORK
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-row dense>
                          <v-col cols="6">
                            <div class="input-label">Select Scope of Work</div>
                            <v-select
                              v-model="workScopeType"
                              :items="workScopeTypes"
                              item-title="scope_desc"
                              item-value="ws_type_id"
                              variant="outlined"
                              density="comfortable"
                              :rules="[rules.requiredScope]"
                              chips
                              prepend-inner-icon="mdi-format-list-bulleted"
                              color="blue-darken-3"
                              :loading="loadingWorkScopeTypes"
                            ></v-select>
                          </v-col>
                          <v-col
                            v-if="
                              workScopeType &&
                              workScopeTypes.find(
                                (ws) => ws.ws_type_id === workScopeType
                              )?.ws_type_desc === 'Other (Specify)'
                            "
                            cols="12"
                          >
                            <v-text-field
                              v-model="otherDetails"
                              label="Please specify"
                              variant="outlined"
                              density="comfortable"
                              :rules="[rules.requiredOther]"
                              color="blue-darken-3"
                              prepend-inner-icon="mdi-pencil"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <div class="input-label">Remarks</div>
                            <v-text-field
                              v-model="remarks"
                              variant="outlined"
                              density="comfortable"
                              :rules="[rules.required]"
                              prepend-inner-icon="mdi-comment-alert"
                              color="blue-darken-3"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>

                    <v-card class="mb-4 card-section">
                      <v-card-title class="text-h6 section-title">
                        <v-icon left color="blue-darken-3" class="mr-2"
                          >mdi-domain</v-icon
                        >
                        USE OR CHARACTER OF OCCUPANCY
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-row dense>
                          <v-col cols="12" md="6">
                            <v-select
                              v-model="selectedGroup"
                              :items="occupancyUseGroups"
                              item-title="ou_group_desc"
                              item-value="ou_group_id"
                              label="Groups"
                              variant="outlined"
                              prepend-inner-icon="mdi-format-list-bulleted"
                              color="blue-darken-3"
                              :loading="loadingOccupancyGroups"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" md="6">
                            <v-select
                              v-model="selectedCategory"
                              :items="occupancyUseTypes"
                              item-title="ou_type_desc"
                              item-value="ou_type_id"
                              label="Category"
                              variant="outlined"
                              :disabled="!selectedGroup"
                              prepend-inner-icon="mdi-shape"
                              color="blue-darken-3"
                              :loading="loadingOccupancyTypes"
                            ></v-select>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>

                    <v-card class="card-section">
                      <v-card-title
                        class="text-h6 card-title-responsive section-title"
                      >
                        <v-icon left color="blue-darken-3" class="mr-2"
                          >mdi-file-document-outline</v-icon
                        >
                        PROJECT DETAILS
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-row dense>
                          <v-col cols="12" md="6">
                            <div class="input-label">Occupancy Classified</div>
                            <v-text-field
                              v-model="occupancyClassifiedComputed"
                              variant="outlined"
                              density="comfortable"
                              prepend-inner-icon="mdi-clipboard-outline"
                              hide-details
                              readonly
                              bg-color="grey-lighten-4"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            md="6"
                            class="d-flex flex-column justify-center"
                          >
                            <div class="input-label mb-1">
                              Total Estimated Cost
                            </div>
                            <div
                              class="font-weight-bold text-h5 gradient-cost px-2 py-1"
                            >
                              ₱ {{ totalEstimatedCostComputed }}
                            </div>
                          </v-col>
                          <v-col cols="12" md="6">
                            <div class="input-label">Number of Units</div>
                            <v-text-field
                              v-model="numberOfUnits"
                              variant="outlined"
                              density="comfortable"
                              prepend-inner-icon="mdi-counter"
                              hide-details
                              @keypress="isNumber($event)"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="3">
                            <div class="input-label">Building</div>
                            <v-text-field
                              v-model="costBuilding"
                              variant="outlined"
                              density="comfortable"
                              prefix="₱"
                              prepend-inner-icon="mdi-home-city"
                              hide-details
                              @keypress="isNumber($event)"
                              @blur="formatNumber('costBuilding')"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="3">
                            <div class="input-label">Electrical</div>
                            <v-text-field
                              v-model="costElectrical"
                              variant="outlined"
                              density="comfortable"
                              prefix="₱"
                              prepend-inner-icon="mdi-flash"
                              hide-details
                              @keypress="isNumber($event)"
                              @blur="formatNumber('costElectrical')"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="6">
                            <div class="input-label">Number of Storey</div>
                            <v-text-field
                              v-model="numberOfStorey"
                              variant="outlined"
                              density="comfortable"
                              prepend-inner-icon="mdi-numeric"
                              hide-details
                              @keypress="isNumber($event)"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="3">
                            <div class="input-label">Mechanical</div>
                            <v-text-field
                              v-model="costMechanical"
                              variant="outlined"
                              density="comfortable"
                              prefix="₱"
                              prepend-inner-icon="mdi-cog"
                              hide-details
                              @keypress="isNumber($event)"
                              @blur="formatNumber('costMechanical')"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="3">
                            <div class="input-label">Electronics</div>
                            <v-text-field
                              v-model="costElectronics"
                              variant="outlined"
                              density="comfortable"
                              prefix="₱"
                              prepend-inner-icon="mdi-television"
                              hide-details
                              @keypress="isNumber($event)"
                              @blur="formatNumber('costElectronics')"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="6">
                            <div class="input-label">
                              Total Floor Area (sq. m)
                            </div>
                            <v-text-field
                              v-model="totalFloorArea"
                              variant="outlined"
                              density="comfortable"
                              prepend-inner-icon="mdi-ruler-square"
                              hide-details
                              @keypress="isNumber($event)"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="3">
                            <div class="input-label">Plumbing</div>
                            <v-text-field
                              v-model="costPlumbing"
                              variant="outlined"
                              density="comfortable"
                              prefix="₱"
                              prepend-inner-icon="mdi-pipe"
                              hide-details
                              @keypress="isNumber($event)"
                              @blur="formatNumber('costPlumbing')"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="3">
                            <div class="input-label">Others</div>
                            <v-text-field
                              v-model="costOthers"
                              variant="outlined"
                              density="comfortable"
                              prefix="₱"
                              prepend-inner-icon="mdi-dots-horizontal"
                              hide-details
                              @keypress="isNumber($event)"
                              @blur="formatNumber('costOthers')"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="6">
                            <div class="input-label">Lot Area (sq. m)</div>
                            <v-text-field
                              v-model="lotArea"
                              variant="outlined"
                              density="comfortable"
                              prepend-inner-icon="mdi-map"
                              hide-details
                              @keypress="isNumber($event)"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="3">
                            <div class="input-label">
                              Proposed Date of Construction
                            </div>
                            <v-text-field
                              v-model="proposedDate"
                              type="date"
                              variant="outlined"
                              density="comfortable"
                              prepend-inner-icon="mdi-calendar"
                              hide-details
                              :min="minDate"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="3">
                            <div class="input-label">
                              Expected Date of Completion
                            </div>
                            <v-text-field
                              v-model="expectedDate"
                              type="date"
                              variant="outlined"
                              density="comfortable"
                              prepend-inner-icon="mdi-calendar-check"
                              hide-details
                              :min="minExpectedDate"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </div>
                </v-form>
              </v-card-text>
            </v-card>

            <div class="d-flex justify-end mt-6 mb-8">
              <v-btn
                color="blue-grey-lighten-4"
                class="mr-2 btn-rounded"
                elevation="2"
                variant="tonal"
                @click="
                  $router.push(
                    '/bpam/applicant/unified-form/applicant-information'
                  )
                "
              >
                <v-icon left>mdi-arrow-left</v-icon>Back
              </v-btn>
              <v-btn
                v-if="!isSaved"
                color="blue-darken-3"
                class="btn-rounded"
                elevation="2"
                @click="saveForm"
                variant="elevated"
              >
                Save
                <v-icon right>mdi-content-save</v-icon>
              </v-btn>
              <v-btn
                v-else
                color="blue-darken-3"
                class="btn-rounded"
                elevation="2"
                @click="proceedToNext"
                variant="elevated"
              >
                Next
                <v-icon right>mdi-arrow-right</v-icon>
              </v-btn>
            </div>
          </v-container>
        </div>

        <v-snackbar
          v-model="snackbar"
          :color="snackbarColor"
          :timeout="3000"
          location="top right"
        >
          {{ snackbarMessage }}
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/**
 * Building Permit Application System - Step 2
 * Follows ACM citation style for software component documentation.
 */

import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import Navigation from "./Navigation.vue";
import Stepper from "./Stepper.vue";
import Header from "@/components/Header.vue";
import constructionSiteService from "@/services/constructionSiteService";
import bpaConstructionService from "@/services/bpaConstructionInsertService";

export default defineComponent({
  name: "BuildingPermitStep2",
  components: { Navigation, Stepper, Header },

  setup() {
    const router = useRouter();
    return { router };
  },

  data() {
    return {
      // Form State
      formStepValue: 2,
      formSteps: [
        { title: "Applicant Information", value: 1 },
        { title: "Construction Information", value: 2 },
        { title: "Signatories Details", value: 3 },
      ],
      formValid: false,

      // Enterprise Information
      is_enterprise: true,
      ownershipType: null, // Will be set after fetching ownership types

      // Location Data
      barangay: null, // Will be set after fetching barangays
      lotNo: "15",
      blkNo: "3",
      street: "Rizal Street",
      cityMunicipality: "Naga City",

      // Lot Information
      tctNo: "123456",
      taxDecNo: "98765",

      // Feedback UI
      errorMessage: "",
      successMessage: "",
      isSaved: false,
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "success",

      // Draft management
      draftBpacId: null,
      draftBpacSiteId: null,

      // Scope of Work Logic
      workScopeType: null, // Will be set after fetching work scope types
      workScopeTypes: [],
      loadingWorkScopeTypes: false,

      otherDetails: "",
      remarks: "New construction for residential building",

      // Location Reference
      barangays: [],
      loadingBarangays: false,

      // Ownership Type Reference
      ownershipTypes: [],
      loadingOwnershipTypes: false,

      // Validation Rules
      rules: {
        required: (value) => !!value || "This field is required.",
        requiredScope: (value) =>
          (value && value.length > 0) ||
          "Please select at least one scope of work.",
        requiredOther: (value) => {
          if (
            this.workScopeType &&
            this.workScopeType.includes("Other (Specify)")
          ) {
            return !!value || "Please specify details for 'Other'.";
          }
          return true;
        },
        tctNo: (value) => {
          if (!value) return true;
          const tctPattern = /^\d{6}$/;
          return tctPattern.test(value) || "TCT No. must be exactly 6 digits";
        },
        taxDecNo: (value) => {
          if (!value) return true;
          const taxDecPattern = /^\d{4,6}$/;
          return (
            taxDecPattern.test(value) || "Tax Dec No. must be 4 to 6 digits"
          );
        },
      },

      // Occupancy Groupings
      selectedGroup: null, // Will be set after fetching groups
      selectedCategory: null, // Will be set after fetching categories
      occupancyUseGroups: [],
      occupancyUseTypes: [],
      loadingOccupancyGroups: false,
      loadingOccupancyTypes: false,

      // Project Details Fields
      occupancyClassified: "",
      numberOfUnits: "4",
      numberOfStorey: "2",
      totalFloorArea: "250.50",
      lotArea: "300.00",
      costBuilding: "1,500,000.00",
      costElectrical: "150,000.00",
      costMechanical: "100,000.00",
      costElectronics: "75,000.00",
      costPlumbing: "80,000.00",
      costOthers: "50,000.00",
      proposedDate: "2026-02-15",
      expectedDate: "2026-12-31",

      // Sidebar Progress
      sidebarStep: 0,
      sidebarSteps: [
        "Fill up the Unified Application Form",
        "Upload Building Plans & Lot Plans",
        "Download Filled-up Unified Application Form and Required Ancillary Permits ",
      ],
    };
  },

  computed: {
    totalEstimatedCostComputed() {
      const costs = [
        this.costBuilding,
        this.costElectrical,
        this.costMechanical,
        this.costElectronics,
        this.costPlumbing,
        this.costOthers,
      ];
      const total = costs.reduce((sum, cost) => {
        const cleanedCost =
          parseFloat((cost || "0").toString().replace(/,/g, "")) || 0;
        return sum + cleanedCost;
      }, 0);

      return total.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },
    occupancyClassifiedComputed() {
      const group = this.occupancyUseGroups.find(
        (g) => g.ou_group_id === this.selectedGroup
      );
      const category = this.occupancyUseTypes.find(
        (c) => c.ou_type_id === this.selectedCategory
      );

      if (group && category) {
        // Extract the main part of the group description (e.g., "RESIDENTIAL" from "RESIDENTIAL (DWELLING UNITS)")
        const groupName = group.ou_group_desc.split("(")[0].trim();
        return `${groupName}: ${category.ou_type_desc}`;
      } else if (group) {
        return group.ou_group_desc.split("(")[0].trim();
      }
      return "";
    },
    minDate() {
      // Get tomorrow's date as the minimum selectable date
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split("T")[0];
    },
    minExpectedDate() {
      // If proposed date is set, use it as minimum, otherwise use tomorrow
      if (this.proposedDate) {
        return this.proposedDate;
      }
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split("T")[0];
    },
  },

  watch: {
    selectedGroup(newVal) {
      this.selectedCategory = null;
      if (newVal) {
        this.fetchOccupancyUseTypes(newVal);
      } else {
        this.occupancyUseTypes = [];
      }
    },
    is_enterprise(newVal) {
      if (!newVal) this.ownershipType = null;
    },
  },

  mounted() {
    this.fetchBarangays();
    this.fetchOwnershipTypes();
    this.fetchWorkScopeTypes();
    this.fetchOccupancyUseGroups();
    // Load draft if exists
    this.loadDraft();
  },

  methods: {
    async loadDraft() {
      try {
        const applicantId = localStorage.getItem("applicant_id");
        if (!applicantId) {
          console.log("No applicant ID found, redirecting to Step 1");
          this.snackbarMessage = "Please complete Applicant Information first";
          this.snackbarColor = "warning";
          this.snackbar = true;
          setTimeout(() => {
            this.$router.push(
              "/bpam/applicant/unified-form/applicant-information"
            );
          }, 1500);
          return;
        }

        // Verify the applicant exists in the database
        try {
          const verifyResponse = await fetch(
            `http://localhost:3000/api/permit-applicant/id/${applicantId}`
          );

          if (!verifyResponse.ok) {
            console.log("Applicant ID is stale, redirecting to Step 1");
            // Clear stale localStorage
            localStorage.removeItem("applicant_id");
            localStorage.removeItem("applicant_gov_id");
            localStorage.removeItem("applicant_form_data");
            localStorage.removeItem("bpac_id");
            localStorage.removeItem("bpac_site_id");

            this.snackbarMessage =
              "Session expired. Please complete Applicant Information again";
            this.snackbarColor = "warning";
            this.snackbar = true;
            setTimeout(() => {
              this.$router.push(
                "/bpam/applicant/unified-form/applicant-information"
              );
            }, 1500);
            return;
          }
        } catch (error) {
          console.error("Error verifying applicant:", error);
        }

        const result = await bpaConstructionService.getLatestDraft(applicantId);

        if (result.success && result.data) {
          const draft = result.data;
          console.log("Loading draft:", draft);

          // Store the draft ID for updating
          this.draftBpacId = draft.bpac_id;
          this.draftBpacSiteId = draft.bpac_site_id;

          // Populate form fields from draft
          this.is_enterprise = draft.ownership_type_id ? true : false;
          this.ownershipType = draft.ownership_type_id;

          // Load construction site data
          if (draft.bpac_site_id) {
            await this.loadConstructionSiteData(draft.bpac_site_id);
          }

          this.workScopeType = draft.work_scope_type_id;
          this.remarks = draft.workscope_remarks || "";
          this.otherDetails = draft.ou_type_others || "";
          this.selectedCategory = draft.ou_type_id;
          this.numberOfUnits = draft.num_units?.toString() || "";
          this.numberOfStorey = draft.num_storey?.toString() || "";
          this.totalFloorArea = draft.total_floor_area?.toString() || "";
          this.lotArea = draft.lot_area?.toString() || "";

          // Load costs
          this.costBuilding = this.formatCurrency(draft.building_cost);
          this.costElectrical = this.formatCurrency(draft.electrical_cost);
          this.costMechanical = this.formatCurrency(draft.mechanical_cost);
          this.costElectronics = this.formatCurrency(draft.electronic_cost);
          this.costPlumbing = this.formatCurrency(draft.plumbing_cost);

          // Load dates
          if (draft.construction_date) {
            this.proposedDate = new Date(draft.construction_date)
              .toISOString()
              .split("T")[0];
          }
          if (draft.completion_date) {
            this.expectedDate = new Date(draft.completion_date)
              .toISOString()
              .split("T")[0];
          }

          this.snackbarMessage = "Draft loaded successfully!";
          this.snackbarColor = "info";
          this.snackbar = true;
        }
      } catch (error) {
        console.error("Error loading draft:", error);
        // Don't show error to user - just log it
      }
    },

    async loadConstructionSiteData(siteId) {
      try {
        const result = await constructionSiteService.getById(siteId);
        if (result.success && result.data) {
          const site = result.data.data;
          this.lotNo = site.bpacs_lot_no || "";
          this.blkNo = site.bpacs_blk_no || "";
          this.street = site.bpacs_street || "";
          this.tctNo = site.bpacs_tct_no || "";
          this.taxDecNo = site.bpacs_tax_dec_no || "";

          // Set barangay if available
          if (site.bpacs_brgy_id) {
            // Wait for barangays to load
            await new Promise((resolve) => {
              const checkBarangays = setInterval(() => {
                if (this.barangays.length > 0) {
                  clearInterval(checkBarangays);
                  resolve();
                }
              }, 100);
            });
            this.barangay = site.bpacs_brgy_id;
          }
        }
      } catch (error) {
        console.error("Error loading construction site data:", error);
      }
    },

    formatCurrency(value) {
      if (!value) return "";
      return parseFloat(value).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },

    async fetchBarangays() {
      this.loadingBarangays = true;
      try {
        // Filter Barangay data by citymun_id = 617
        const citymunId = 617;

        const response = await fetch(
          `http://localhost:3000/api/barangay/city-mun/${citymunId}`
        );
        const result = await response.json();

        if (result.success) {
          this.barangays = result.data;
        } else {
          this.snackbarMessage = "Failed to load barangays";
          this.snackbarColor = "error";
          this.snackbar = true;
        }
      } catch (error) {
        console.error("Error fetching barangays:", error);
        this.snackbarMessage = "Failed to load barangays";
        this.snackbarColor = "error";
        this.snackbar = true;
      } finally {
        this.loadingBarangays = false;
      }
    },

    async fetchOccupancyUseGroups() {
      this.loadingOccupancyGroups = true;
      try {
        const response = await fetch(
          `http://localhost:3000/api/occupancy-use-group`
        );
        const result = await response.json();

        if (result.success) {
          this.occupancyUseGroups = result.data;
        } else {
          this.snackbarMessage = "Failed to load occupancy use groups";
          this.snackbarColor = "error";
          this.snackbar = true;
        }
      } catch (error) {
        console.error("Error fetching occupancy use groups:", error);
        this.snackbarMessage = "Failed to load occupancy use groups";
        this.snackbarColor = "error";
        this.snackbar = true;
      } finally {
        this.loadingOccupancyGroups = false;
      }
    },

    async fetchOccupancyUseTypes(groupId) {
      this.loadingOccupancyTypes = true;
      try {
        const response = await fetch(
          `http://localhost:3000/api/occupancy-use-type/group/${groupId}`
        );
        const result = await response.json();

        if (result.success) {
          this.occupancyUseTypes = result.data;
        } else {
          this.snackbarMessage = "Failed to load occupancy use types";
          this.snackbarColor = "error";
          this.snackbar = true;
        }
      } catch (error) {
        console.error("Error fetching occupancy use types:", error);
        this.snackbarMessage = "Failed to load occupancy use types";
        this.snackbarColor = "error";
        this.snackbar = true;
      } finally {
        this.loadingOccupancyTypes = false;
      }
    },

    async fetchOwnershipTypes() {
      this.loadingOwnershipTypes = true;
      try {
        const response = await fetch(
          `http://localhost:3000/api/ownership-type`
        );
        const result = await response.json();

        if (result.success) {
          this.ownershipTypes = result.data;
        } else {
          this.snackbarMessage = "Failed to load ownership types";
          this.snackbarColor = "error";
          this.snackbar = true;
        }
      } catch (error) {
        console.error("Error fetching ownership types:", error);
        this.snackbarMessage = "Failed to load ownership types";
        this.snackbarColor = "error";
        this.snackbar = true;
      } finally {
        this.loadingOwnershipTypes = false;
      }
    },

    async fetchWorkScopeTypes() {
      this.loadingWorkScopeTypes = true;
      try {
        const response = await fetch(
          `http://localhost:3000/api/work-scope-type`
        );
        const result = await response.json();

        if (result.success) {
          this.workScopeTypes = result.data;
        } else {
          this.snackbarMessage = "Failed to load work scope types";
          this.snackbarColor = "error";
          this.snackbar = true;
        }
      } catch (error) {
        console.error("Error fetching work scope types:", error);
        this.snackbarMessage = "Failed to load work scope types";
        this.snackbarColor = "error";
        this.snackbar = true;
      } finally {
        this.loadingWorkScopeTypes = false;
      }
    },

    setSampleData() {
      // Set sample data after a short delay to ensure reference data is loaded
      setTimeout(() => {
        // Set first barangay if available
        if (this.barangays.length > 0) {
          this.barangay = this.barangays[0].brgy_id;
        }

        // Set first ownership type if available
        if (this.ownershipTypes.length > 0) {
          this.ownershipType = this.ownershipTypes[0];
        }

        // Set first work scope type if available
        if (this.workScopeTypes.length > 0) {
          this.workScopeType = this.workScopeTypes[0].ws_type_id;
        }

        // Set first occupancy group if available
        if (this.occupancyUseGroups.length > 0) {
          this.selectedGroup = this.occupancyUseGroups[0].ou_group_id;
        }
      }, 1000);
    },

    getSelectedBrgyCode() {
      const selectedBarangay = this.barangays.find(
        (brgy) => brgy.brgy_id === this.barangay
      );
      return selectedBarangay ? selectedBarangay.brgy_code : null;
    },
    getOwnershipTypeId() {
      // If enterprise, use selected ownership type
      if (this.is_enterprise && this.ownershipType) {
        return this.ownershipType;
      }
      // If not enterprise (individual), use default ownership type '01' for Individual
      return "01"; // Default to Individual ownership
    },

    async saveConstructionSite() {
      try {
        const applicantId = localStorage.getItem("applicant_id");
        if (!applicantId) {
          throw new Error(
            "Applicant ID not found. Please complete Step 1 first."
          );
        }

        const brgyCode = this.getSelectedBrgyCode();
        if (!brgyCode) {
          throw new Error("Invalid barangay selection");
        }

        const constructionSiteData = {
          applicant_id: parseInt(applicantId),
          lot_no: this.lotNo,
          block_no: this.blkNo,
          tct_no: this.tctNo,
          tax_dec_no: this.taxDecNo,
          street: this.street,
          brgy_code: brgyCode,
          applicant_owned: !this.is_enterprise,
        };

        const result = await constructionSiteService.create(
          constructionSiteData
        );

        if (!result.success) {
          throw new Error(
            result.message || "Failed to save construction site information"
          );
        }

        // Store construction site ID for later use
        const siteId = result.data.data.bpac_site_id;
        this.draftBpacSiteId = siteId;
        localStorage.setItem("bpac_site_id", siteId);

        return siteId;
      } catch (error) {
        console.error("Error saving construction site:", error);
        throw error;
      }
    },

    async updateConstructionSite(siteId) {
      try {
        const applicantId = localStorage.getItem("applicant_id");
        if (!applicantId) {
          throw new Error(
            "Applicant ID not found. Please complete Step 1 first."
          );
        }

        const brgyCode = this.getSelectedBrgyCode();
        if (!brgyCode) {
          throw new Error("Invalid barangay selection");
        }

        const constructionSiteData = {
          applicant_id: parseInt(applicantId),
          lot_no: this.lotNo,
          block_no: this.blkNo,
          tct_no: this.tctNo,
          tax_dec_no: this.taxDecNo,
          street: this.street,
          brgy_code: brgyCode,
          applicant_owned: !this.is_enterprise,
        };

        const result = await constructionSiteService.update(
          siteId,
          constructionSiteData
        );

        if (!result.success) {
          throw new Error(
            result.message || "Failed to update construction site information"
          );
        }

        return siteId;
      } catch (error) {
        console.error("Error updating construction site:", error);
        throw error;
      }
    },

    async saveConstructionInformation() {
      try {
        const { valid } = await this.$refs.form.validate();
        if (!valid) {
          this.snackbarMessage = "Please fill in all required fields";
          this.snackbarColor = "warning";
          this.snackbar = true;
          return false;
        }

        // Save or update construction site first
        const siteId = this.draftBpacSiteId
          ? await this.updateConstructionSite(this.draftBpacSiteId)
          : await this.saveConstructionSite();

        // Get applicant ID
        const applicantId = localStorage.getItem("applicant_id");
        if (!applicantId) {
          throw new Error(
            "Applicant ID not found. Please complete Step 1 first."
          );
        }

        // Get applicant government ID from localStorage if available
        const applicantGovId = localStorage.getItem("applicant_gov_id");

        // Helper function to clean currency values
        const cleanCurrency = (value) => {
          if (!value) return 0;
          return parseFloat(value.toString().replace(/,/g, "")) || 0;
        };

        // Generate area number based on barangay code and timestamp
        const brgyCode = this.getSelectedBrgyCode();
        const areaNo = `AREA-${brgyCode}-${Date.now().toString().slice(-6)}`;

        // Set lot owner fields to null for now (will be updated in signatories step)
        const lotOwnerId = null;
        const lotOwnerGovId = null;

        // Prepare BPA construction data
        const bpaConstructionData = {
          application_no:
            localStorage.getItem("application_no") || `APP-${Date.now()}`,
          applicant_id: parseInt(applicantId),
          area_no: areaNo,
          ownership_type_id: this.getOwnershipTypeId(),
          bpac_site_id: siteId,
          work_scope_type_id: this.workScopeType,
          workscope_remarks: this.remarks || null,
          ou_type_id: this.selectedCategory || null,
          ou_type_others: this.otherDetails || null,
          num_units: parseInt(this.numberOfUnits) || null,
          num_storey: parseInt(this.numberOfStorey) || null,
          total_floor_area: parseFloat(this.totalFloorArea) || null,
          lot_area: parseFloat(this.lotArea) || null,
          building_cost: cleanCurrency(this.costBuilding),
          electrical_cost: cleanCurrency(this.costElectrical),
          electrical_equipment_cost: 0,
          mechanical_cost: cleanCurrency(this.costMechanical),
          mechanical_equipment_cost: 0,
          electronic_cost: cleanCurrency(this.costElectronics),
          electronic_equipment_cost: 0,
          plumbing_cost: cleanCurrency(this.costPlumbing),
          plumbing_equipment_cost: 0,
          construction_date: this.proposedDate || null,
          completion_date: this.expectedDate || null,
          applicant_gov_id: applicantGovId ? parseInt(applicantGovId) : null,
          bpacs_lot_owner_id: lotOwnerId,
          bpacs_lo_gov_id: lotOwnerGovId,
          bpac_supervisor_id: null,
          applicant_owned: !this.is_enterprise,
          is_draft: true, // Always save as draft
        };

        let constructionResult;
        if (this.draftBpacId) {
          // Update existing draft
          constructionResult = await bpaConstructionService.update(
            this.draftBpacId,
            bpaConstructionData
          );
        } else {
          // Create new draft
          constructionResult = await bpaConstructionService.create(
            bpaConstructionData
          );
        }

        if (!constructionResult.success) {
          throw new Error(
            constructionResult.message ||
              "Failed to save BPA construction information"
          );
        }

        // Store construction ID for later use
        const bpacId = this.draftBpacId || constructionResult.data.data.bpac_id;
        this.draftBpacId = bpacId;
        localStorage.setItem("bpac_id", bpacId);

        // Store additional construction information in localStorage for next steps
        const constructionInfo = {
          bpac_id: bpacId,
          bpac_site_id: siteId,
          ownership_type_id: this.getOwnershipTypeId(),
          scope_of_work: this.workScopeType,
          scope_other_details: this.workScopeType.includes("Other (Specify)")
            ? this.otherDetails
            : null,
          tax_declaration_no: this.taxDecNo,
          is_enterprise: this.is_enterprise,
        };

        localStorage.setItem(
          "construction_info",
          JSON.stringify(constructionInfo)
        );

        this.successMessage = "Construction information saved as draft!";
        this.snackbarMessage = "Construction information saved as draft!";
        this.snackbarColor = "success";
        this.snackbar = true;
        this.isSaved = true;

        return true;
      } catch (error) {
        console.error("Error saving construction information:", error);
        this.errorMessage =
          error.message || "Failed to save construction information";
        this.snackbarMessage =
          error.message || "Failed to save construction information";
        this.snackbarColor = "error";
        this.snackbar = true;
        return false;
      }
    },

    isNumber(event) {
      const charCode = event.which ? event.which : event.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        event.preventDefault();
      }
    },

    formatTctNo() {
      // Remove all non-digit characters and limit to 6 digits
      this.tctNo = this.tctNo.replace(/\D/g, "").substring(0, 6);
    },

    formatTaxDecNo() {
      // Remove all non-digit characters and limit to 6 digits
      this.taxDecNo = this.taxDecNo.replace(/\D/g, "").substring(0, 6);
    },

    formatNumber(fieldName) {
      let value = this[fieldName] ? this[fieldName].replace(/,/g, "") : "";
      value = value.replace(/[^\d.]/g, "");
      const parts = value.split(".");
      let integer = parts[0];
      const decimal = parts[1];

      integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      if (decimal !== undefined) {
        this[fieldName] = integer + "." + decimal.slice(0, 2);
      } else {
        this[fieldName] = integer;
      }
    },

    async saveForm() {
      await this.saveConstructionInformation();
    },

    proceedToNext() {
      this.$router.push("/bpam/applicant/unified-form/signatories");
    },

    async nextStep() {
      const saved = await this.saveConstructionInformation();
      if (saved) {
        // Redirect to signatories step
        this.$router.push("/bpam/applicant/unified-form/signatories");
      }
    },

    handleLogout() {
      this.$router.push({ name: "Login" });
    },

    goToStep(index) {
      if (index === 0)
        this.$router.push("/bpam/applicant/unified-form/applicant-information");
    },
  },
});
</script>

<style scoped>
/* Scoped Layout Styles */
.no-scroll {
  overflow: hidden !important;
  padding-top: 88px;
}

.v-main.no-scroll {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f6fafd;
}

/* Main Container */
.content-area {
  height: 100vh;
  overflow: hidden;
}

.fill-height {
  height: 100vh;
}

.main-content-bg {
  background: #fafdff;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.stepper-fixed-container {
  flex: 0 0 auto;
  z-index: 50;
  background: #fafdff;
  overflow: hidden;
}

.scrollable-content {
  flex: 1 1 auto;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none; /* Firefox */
}

.scrollable-content::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}

/* UI Component Refinement */
.stepper-elevated {
  background: white;
  border-radius: 14px;
  box-shadow: 0 2px 6px 0 rgba(25, 118, 210, 0.06);
  padding: 15px 0;
}

.card-shadow {
  box-shadow: 0 2px 8px 0 rgba(25, 118, 210, 0.08);
  border-radius: 18px;
  border: 1.5px solid #e3eafc;
}

.card-section {
  background: #f7fafd;
  border-radius: 12px;
  border: 1px solid #e3eafc;
}

.section-title {
  color: #1976d2;
  font-weight: bold;
}

.btn-rounded {
  border-radius: 30px !important;
  min-width: 110px;
}

.input-label {
  font-weight: 500;
  color: #455a64;
  margin-bottom: 4px;
  font-size: 0.875rem;
}

/* Responsive Overrides */
@media (max-width: 600px) {
  :deep(.v-stepper-item__title) {
    display: none !important;
  }
}
</style>