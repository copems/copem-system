<template>
  <v-app>
    <v-main>
      <v-container fluid class="pa-0 content-area">
        <v-row no-gutters class="fill-height">
          <!-- LEFT SIDEBAR -->
          <v-col cols="12" md="3" class="pa-0">
            <v-card
              flat
              class="pa-4 quick-guide-card d-flex flex-column justify-space-between elevation-2"
              style="border-right: 1px solid #e0e0e0; height: 100%; background: #fcfcff"
            >
              <div>
                <h4 class="mb-2 text-h5 font-weight-bold text-blue-darken-3">
                  Occupancy Permit Application
                </h4>
                <div class="text-subtitle-2 mb-6 text-blue-grey-darken-1">
                  Follow these steps to complete your application
                </div>

                <v-card
                  v-for="(step, index) in sidebarSteps"
                  :key="index"
                  flat
                  :color="sidebarStep === index ? 'blue-lighten-5' : '#f6f8fa'"
                  class="d-flex align-center pa-3 mb-4 rounded-lg quick-guide-step"
                  :class="{
                    'clickable-step': index === 0,
                    'active-step': sidebarStep === index,
                  }"
                  @click="goToStep(index)"
                  :elevation="sidebarStep === index ? 2 : 0"
                  style="transition: box-shadow 0.16s, background 0.16s"
                >
                  <v-avatar
                    :color="sidebarStep === index ? 'primary' : '#2563EB'"
                    size="36"
                    class="white--text mr-3 quick-guide-avatar"
                  >
                    <span class="text-h6 font-weight-bold">
                      {{ index + 1 }}
                    </span>
                  </v-avatar>
                  <div class="font-weight-bold text-body-1 step-label">
                    {{ step }}
                  </div>
                </v-card>
              </div>

              <v-spacer />

              <div class="mt-4">
                <v-btn
                  block
                  color="white"
                  variant="flat"
                  to="/login"
                  class="text-capitalize font-weight-bold logout-btn-white"
                  @click="handleLogout"
                >
                  <v-icon left color="black">mdi-logout</v-icon>
                  <span style="color: #222; font-weight: bold">Logout</span>
                </v-btn>
              </div>
            </v-card>
          </v-col>

          <!-- RIGHT MAIN CONTENT -->
          <v-col cols="12" md="9" class="main-content-bg pa-6">
            <v-container fluid class="px-4 mx-auto" style="max-width: 1300px">
              <v-stepper
                v-model="formStepValue"
                alt-labels
                flat
                class="mb-4 mt-2 stepper-elevated"
              >
                <v-stepper-header>
                  <div
                    v-for="(step, index) in formSteps"
                    :key="index"
                    class="d-flex align-center"
                  >
                    <v-stepper-item
                      :title="step.title"
                      :value="step.value"
                      :complete="formStepValue > step.value"
                      :color="
                        formStepValue >= step.value ? 'blue-darken-1' : 'grey lighten-2'
                      "
                      class="stepper-item-custom"
                    />
                    <v-divider
                      v-if="index < formSteps.length - 1"
                      :thickness="3"
                      :style="{
                        'border-color':
                          formStepValue > step.value ? '#1976D2' : '#e0e0e0',
                      }"
                      class="mx-2"
                    />
                  </div>
                </v-stepper-header>
              </v-stepper>

              <v-card class="my-2 pa-4 card-shadow">
                <v-card-text>
                  <v-form ref="form">
                    <!-- SIGNATORIES DETAILS LABEL (Styled like APPLICATION DETAILS) -->
                    <div class="mb-4" style="padding-top: 8px">
                      <span
                        class="text-h6 font-weight-bold"
                        style="color: #222; font-size: 1.5rem"
                        >SIGNATORIES DETAILS</span
                      >
                      <v-divider class="mt-2 mb-1" />
                    </div>

                    <!-- APPLICANT/OWNER INFORMATION BOX -->
                    <v-card class="mb-4 card-section">
                      <v-card-title class="text-h6 card-title-responsive section-title">
                        <v-icon left color="blue-darken-3" class="mr-2">
                          mdi-account
                        </v-icon>
                        APPLICANT/OWNER
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-row dense>
                          <v-col cols="12" sm="4">
                            <div class="input-label">Last Name</div>
                            <v-text-field
                              v-model="applicantLastName"
                              variant="plain"
                              density="compact"
                              disabled
                              style="height: 50px; min-height: 50px"
                            />
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="input-label">First Name</div>
                            <v-text-field
                              v-model="applicantFirstName"
                              variant="plain"
                              density="compact"
                              disabled
                              style="height: 50px; min-height: 50px"
                            />
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="input-label">M.I.</div>
                            <v-text-field
                              v-model="applicantMiddleInitial"
                              variant="plain"
                              density="compact"
                              disabled
                              style="height: 50px; min-height: 50px"
                            />
                          </v-col>
                        </v-row>
                        <v-row dense>
                          <v-col cols="12" sm="4">
                            <div class="input-label">Community Tax Certificate No.</div>
                            <v-text-field
                              v-model="applicantCommunityTaxNo"
                              variant="plain"
                              density="compact"
                              disabled
                              style="height: 50px; min-height: 50px"
                            />
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="input-label">Date Issued</div>
                            <v-text-field
                              v-model="applicantCommunityTaxDateIssued"
                              variant="plain"
                              density="compact"
                              disabled
                              style="height: 50px; min-height: 50px"
                            />
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="input-label">Place Issued</div>
                            <v-text-field
                              v-model="applicantCommunityTaxPlaceIssued"
                              variant="plain"
                              density="compact"
                              disabled
                              style="height: 50px; min-height: 50px"
                            />
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                    <!-- ENGINEER'S INFORMATION -->
                    <v-card class="mb-4 card-section">
                      <v-card-title class="text-h6 card-title-responsive section-title">
                        <v-icon left color="blue-darken-3" class="mr-2">
                          mdi-account-hard-hat
                        </v-icon>
                        FULL-TIME INSPECTOR OR SUPERVISOR OF CONSTRUCTION
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-row dense>
                          <v-col cols="12" sm="4">
                            <div class="input-label">First Name</div>
                            <v-text-field
                              v-model="engineerFirstName"
                              variant="plain"
                              density="compact"
                              disabled
                              style="height: 50px; min-height: 50px"
                            />
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="input-label">Last Name</div>
                            <v-text-field
                              v-model="engineerLastName"
                              variant="plain"
                              density="compact"
                              disabled
                              style="height: 50px; min-height: 50px"
                            />
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="input-label">M.I.</div>
                            <v-text-field
                              v-model="engineerMiddleInitial"
                              variant="plain"
                              density="compact"
                              disabled
                              style="height: 50px; min-height: 50px"
                            />
                          </v-col>
                        </v-row>
                        <v-row dense>
                          <v-col cols="12" sm="6">
                            <div class="input-label">PRC NO:</div>
                            <v-text-field
                              v-model="prcNo"
                              variant="plain"
                              density="compact"
                              disabled
                              :maxlength="7"
                              style="height: 50px; min-height: 50px"
                            />
                          </v-col>
                          <v-col cols="12" sm="6">
                            <div class="input-label">Validity:</div>
                            <v-text-field
                              v-model="validity"
                              variant="plain"
                              density="compact"
                              disabled
                              style="height: 50px; min-height: 50px"
                            />
                          </v-col>
                        </v-row>
                        <v-row dense>
                          <v-col cols="12" sm="6">
                            <div class="input-label">PTR NO:</div>
                            <v-text-field
                              v-model="ptrNo"
                              variant="plain"
                              density="compact"
                              disabled
                              :maxlength="8"
                              style="height: 50px; min-height: 50px"
                            />
                          </v-col>
                          <v-col cols="12" sm="6">
                            <div class="input-label">Date Issued:</div>
                            <v-text-field
                              v-model="dateIssued"
                              variant="plain"
                              density="compact"
                              disabled
                              style="height: 50px; min-height: 50px"
                            />
                          </v-col>
                        </v-row>
                        <v-row dense>
                          <v-col cols="12" sm="6">
                            <div class="input-label">Issued at:</div>
                            <v-text-field
                              v-model="issuedAt"
                              variant="plain"
                              density="compact"
                              disabled
                              style="height: 50px; min-height: 50px"
                            />
                          </v-col>
                          <v-col cols="12" sm="6">
                            <div class="input-label">TIN:</div>
                            <v-text-field
                              v-model="tin"
                              variant="plain"
                              density="compact"
                              disabled
                              :maxlength="15"
                              style="height: 50px; min-height: 50px"
                            />
                          </v-col>
                        </v-row>
                        <v-row dense>
                          <v-col cols="12" sm="4">
                            <div class="input-label">CTC NO:</div>
                            <v-text-field
                              v-model="ctcNo"
                              variant="outlined"
                              density="compact"
                              style="height: 50px; min-height: 50px"
                            />
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="input-label">Date Issued:</div>
                            <v-menu
                              v-model="ctcDateIssuedMenu"
                              :close-on-content-click="false"
                              transition="scale-transition"
                              min-width="auto"
                            >
                              <template v-slot:activator="{ props }">
                                <v-text-field
                                  v-model="ctcDateIssued"
                                  variant="outlined"
                                  density="compact"
                                  style="height: 50px; min-height: 50px"
                                  v-bind="props"
                                />
                              </template>
                              <v-date-picker
                                v-model="ctcDateIssued"
                                @update:model-value="ctcDateIssuedMenu = false"
                              />
                            </v-menu>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="input-label">Issued at:</div>
                            <v-text-field
                              v-model="ctcIssuedAt"
                              variant="outlined"
                              density="compact"
                              style="height: 50px; min-height: 50px"
                            />
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-form>
                </v-card-text>
              </v-card>

              <div class="d-flex justify-end mt-6 mb-8">
                <v-btn
                  color="blue-grey-4"
                  class="btn-rounded mr-2"
                  elevation="2"
                  @click="goBack"
                  variant="tonal"
                >
                  <v-icon left>mdi-arrow-left</v-icon>Back
                </v-btn>

                <v-btn
                  color="blue-darken-3"
                  class="btn-rounded"
                  elevation="2"
                  @click="openSuccessDialog"
                  variant="elevated"
                >
                  SUBMIT
                </v-btn>
              </div>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-dialog v-model="dialog" max-width="400" persistent>
      <v-card class="pa-4 text-center rounded-xl" elevation="10">
        <v-card-text>
          <div class="mb-4">
            <v-icon color="green" size="72">mdi-check-circle</v-icon>
          </div>

          <h3 class="text-h6 font-weight-bold mb-4">
            Application Submitted Successfully!
          </h3>

          <p class="text-body-1 mb-6 text-grey-darken-1">
            Your occupancy permit application has been submitted.
          </p>

          <v-card flat class="pa-4 mx-auto mb-6 submission-number-card">
            <p class="text-subtitle-1 mb-1">Your Application Number</p>
            <p class="text-h5 font-weight-black text-blue-darken-3">
              {{ applicationNumber }}
            </p>
          </v-card>

          <p class="text-caption text-grey-darken-1 mb-6">
            Please keep this number for tracking your application status.
          </p>

          <v-btn
            color="blue-darken-3"
            block
            @click="closeDialog"
            class="text-capitalize font-weight-bold"
            size="large"
            to="/opam/FormsSection"
          >
            SAVE
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "OccupancySignatoriesPage",
  data() {
    return {
      formStepValue: 4,
      formSteps: [
        { title: "Application", value: 1 },
        { title: "Owner/Applicant", value: 2 },
        { title: "Application Details", value: 3 },
        { title: "Signatories Details", value: 4 },
      ],
      sidebarStep: 0,
      sidebarSteps: [
        "Fill up the Unified Application Form",
        "Download Filled-up Unified Application Form and Completion Permits",
      ],
      selectedApplicationType: null,
      validationFailed: false,

      engineerFirstName: "",
      engineerLastName: "",
      engineerMiddleInitial: "",

      prcNo: "",
      validity: new Date().toISOString().substr(0, 10),
      validityMenu: false,

      ptrNo: "",
      dateIssued: new Date().toISOString().substr(0, 10),
      dateIssuedMenu: false,

      issuedAt: "",
      tin: "",

      ctcNo: "",
      ctcDateIssued: "",
      ctcDateIssuedMenu: false,
      ctcIssuedAt: "",

      province: "",
      municipality: "",
      barangay: "",
      blkNo: "",
      street: "",

      applicantFirstName: "",
      applicantLastName: "",
      applicantMiddleInitial: "",
      applicantCommunityTaxNo: "",
      applicantCommunityTaxDateIssued: "",
      applicantCommunityTaxPlaceIssued: "",
      applicantProvince: "",
      applicantMunicipality: "",
      applicantBarangay: "",
      applicantHouseNo: "",
      applicantStreet: "",
      applicantGovIdNo: "",
      applicantIdDateIssued: "",
      applicantIdPlaceIssued: "",

      provinces: ["Province A", "Province B"],
      barangays: ["Barangay 1", "Barangay 2"],

      dialog: false,
      applicationNumber: "",
    };
  },
  methods: {
    async validateAndProceed() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        this.validationFailed = false;
        this.formStepValue = 2;
        this.$router.push("/applicantlayout/constructioninformation");
      } else {
        this.validationFailed = true;
      }
    },

    handleLogout() {
      localStorage.removeItem("currentBuildingOwnerId");
      localStorage.removeItem("buildingOwnerData");
      this.$router.push("/login");
    },

    goToStep(index) {
      this.sidebarStep = index;
      if (index === 0) {
        console.log("Navigating to step 1 details...");
      }
    },

    goBack() {
      this.$router.push("/opam/OPlocation");
    },

    async openSuccessDialog() {
      const year = new Date().getFullYear();
      const randomNumber = Math.floor(1000 + Math.random() * 9000);
      this.applicationNumber = `OP-${year}-${randomNumber}`;
      this.dialog = true;
      console.log("Application submitted, dialog displayed.");
    },

    closeDialog() {
      this.dialog = false;
      this.$router.push("/opam/FormsSection");
      console.log("Dialog closed, navigating to FormsSection.");
    },
  },
  watch: {
    selectedApplicationType(newValue) {
      if (newValue !== null && this.validationFailed) {
        this.validationFailed = false;
      }
    },
  },
});
</script>

<style scoped>
* {
  font-family: Arial, Helvetica, sans-serif;
}

.app-container,
.v-application {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.7;
}

.page-header,
.text-h4 {
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1.25;
}

.section-header,
.text-h5 {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.35;
}

.form-label,
.table-header,
.ui-label {
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.5;
}

.helper-text,
.text-caption {
  font-size: 13px;
  font-weight: 400;
  line-height: 1.6;
}

.content-area {
  flex: 1;
}

.main-content-bg {
  background: #fafdff;
}

.quick-guide-card {
  background: #fcfcff;
  border-right: 1px solid #e0e0e0;
}

.quick-guide-step {
  transition: background 0.2s, box-shadow 0.2s;
}

.quick-guide-step:hover {
  background: #e3f0ff !important;
  box-shadow: 0 2px 12px rgba(59, 130, 246, 0.08);
}

.active-step {
  background: #e7efff !important;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.12);
}

.quick-guide-avatar {
  transition: background 0.2s;
}

.step-label {
  color: #23407c;
}

.clickable-step {
  cursor: pointer;
}

.stepper-elevated {
  background: white;
  border-radius: 14px;
  box-shadow: 0 2px 6px 0 rgba(25, 118, 210, 0.06);
  padding: 20px 0;
}

.stepper-item-custom .v-stepper-item__step {
  box-shadow: 0 1px 4px 0 rgba(25, 118, 210, 0.13);
  transition: background 0.2s;
}

:deep(.v-stepper-item--selected .v-stepper-item__step) {
  background-color: #1976d2 !important;
  color: #fff !important;
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
  font-size: 1.09rem;
  letter-spacing: 0.01em;
}

.input-label {
  font-size: 0.85rem;
  color: #2a2a2a;
  margin-bottom: 4px;
  font-weight: 500;
}

.btn-rounded {
  border-radius: 30px !important;
  min-width: 110px;
  font-weight: 600;
  letter-spacing: 0.03em;
}

.submission-number-card {
  background: #e3f0ff !important;
  border: 1px solid #a3c9f2;
  border-radius: 8px;
}

@media (max-width: 800px) {
  .section-title {
    font-size: 0.92rem !important;
  }
}

@media (max-width: 600px) {
  .v-stepper-item .v-stepper-item__title {
    display: none;
  }
  .card-shadow,
  .card-section {
    padding: 6px !important;
  }
  .step-label {
    font-size: 1rem !important;
  }
}

@media (max-width: 480px) {
  .btn-rounded {
    min-width: 90px;
    font-size: 0.9rem;
  }
}

.no-scroll {
  height: 100vh;
  overflow: hidden !important;
  padding-top: 88px;
}
</style>
