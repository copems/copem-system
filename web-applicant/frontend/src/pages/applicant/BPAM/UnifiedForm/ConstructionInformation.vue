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
                        PROJECT LOCATION
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
                        </v-row>
                      </v-card-text>
                    </v-card>

                    <v-card class="mb-4 card-section">
                      <v-card-title class="text-h6 section-title">
                        <v-icon left color="blue-darken-3" class="mr-2"
                          >mdi-file-document-outline</v-icon
                        >
                        LOT INFORMATION
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-row dense>
                          <v-col cols="12" sm="6">
                            <div class="input-label">TCT No.</div>
                            <v-text-field
                              v-model="tctNo"
                              variant="outlined"
                              density="comfortable"
                              :rules="[rules.required]"
                              prepend-inner-icon="mdi-numeric"
                              color="blue-darken-3"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <div class="input-label">Current Tax Dec No.</div>
                            <v-text-field
                              v-model="taxDecNo"
                              variant="outlined"
                              density="comfortable"
                              :rules="[rules.required]"
                              prepend-inner-icon="mdi-numeric"
                              color="blue-darken-3"
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
                              v-model="occupancyClassified"
                              variant="outlined"
                              density="comfortable"
                              prepend-inner-icon="mdi-clipboard-outline"
                              hide-details
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
      is_enterprise: false,
      ownershipType: null,

      // Location Data
      barangay: null,
      lotNo: "",
      blkNo: "",
      street: "",
      cityMunicipality: "Naga City",

      // Lot Information
      tctNo: "",
      taxDecNo: "",

      // Feedback UI
      errorMessage: "",
      successMessage: "",
      isSaved: false,
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "success",

      // Scope of Work Logic
      workScopeType: null,
      workScopeTypes: [],
      loadingWorkScopeTypes: false,

      otherDetails: "",
      remarks: "",

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
      },

      // Occupancy Groupings
      selectedGroup: null,
      selectedCategory: null,
      occupancyUseGroups: [],
      occupancyUseTypes: [],
      loadingOccupancyGroups: false,
      loadingOccupancyTypes: false,

      // Project Details Fields
      occupancyClassified: "",
      numberOfUnits: "",
      numberOfStorey: "",
      totalFloorArea: "",
      lotArea: "",
      costBuilding: "",
      costElectrical: "",
      costMechanical: "",
      costElectronics: "",
      costPlumbing: "",
      costOthers: "",
      proposedDate: "",
      expectedDate: "",

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
  },

  methods: {
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

    getSelectedBrgyCode() {
      const selectedBarangay = this.barangays.find(
        (brgy) => brgy.brgy_id === this.barangay
      );
      return selectedBarangay ? selectedBarangay.brgy_code : null;
    },
    getOwnershipTypeId() {
      return this.ownershipType ? this.ownershipType.ot_id : null;
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
        };

        const response = await fetch(
          "http://localhost:3000/api/bpa-construction-site",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(constructionSiteData),
          }
        );

        const result = await response.json();

        if (!result.success) {
          throw new Error(
            result.message || "Failed to save construction site information"
          );
        }

        // Store construction site ID for later use
        localStorage.setItem("bpac_site_id", result.data.bpac_site_id);

        return result.data.bpac_site_id;
      } catch (error) {
        console.error("Error saving construction site:", error);
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

        // Save construction site first
        const siteId = await this.saveConstructionSite();

        // Store additional construction information in localStorage for next steps
        const constructionData = {
          bpac_site_id: siteId,
          ownership_type_id: this.getOwnershipTypeId(),
          scope_of_work: this.workScopeType,
          scope_other_details: this.workScopeType.includes("Other (Specify)")
            ? this.otherDetails
            : null,
          tax_declaration_no: this.taxDecNo,
        };

        localStorage.setItem(
          "construction_info",
          JSON.stringify(constructionData)
        );

        this.successMessage = "Construction information saved successfully!";
        this.snackbarMessage = "Construction information saved successfully!";
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
        // Delay navigation slightly to show success message
        setTimeout(() => {
          const nextStep = parseInt(this.formStepValue) + 1;
          if (nextStep === 3)
            this.$router.push("/bpam/applicant/unified-form/signatories");
        }, 1000);
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