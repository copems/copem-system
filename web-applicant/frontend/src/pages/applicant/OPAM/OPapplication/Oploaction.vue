<template>
  <v-app>
    <v-main>
      <v-container fluid class="pa-0 content-area">
        <v-row no-gutters class="fill-height">
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
                  elevation="sidebarStep === index ? 2 : 0"
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

              <div class="mt-4"></div>
            </v-card>
          </v-col>

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
                <v-card-title class="text-h6 card-title-responsive mb-2">
                  APPLICATION DETAILS
                </v-card-title>
                <v-divider class="mb-4" />
                <v-card-text>
                  <v-form ref="form" v-model="formValid">
                    <v-card class="mb-4 card-section">
                      <v-card-title class="text-h6 section-title">
                        <v-icon left color="blue-darken-3" class="mr-2">
                          mdi-clipboard-text
                        </v-icon>
                        Project Details
                      </v-card-title>
                      <v-divider />
                      <v-card-text>
                        <v-row dense>
                          <v-col cols="12">
                            <div class="plain-label">Project Name:</div>
                            <div class="plain-value">{{ projectName }}</div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>

                    <v-card class="mb-4 card-section">
                      <v-card-title class="text-h6 section-title">
                        <v-icon left color="blue-darken-3" class="mr-2">
                          mdi-map-marker
                        </v-icon>
                        LOCATION OF PROJECT
                      </v-card-title>
                      <v-divider />
                      <v-card-text>
                        <v-row dense>
                          <v-col cols="12" sm="4">
                            <div class="plain-label">BLK. No.:</div>
                            <div class="plain-value">{{ blkNo }}</div>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="plain-label">Street:</div>
                            <div class="plain-value">{{ street }}</div>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="plain-label">Barangay:</div>
                            <div class="plain-value">{{ barangay }}</div>
                          </v-col>
                          <v-col cols="12">
                            <div class="plain-label">City/Municipal of:</div>
                            <div class="plain-value">
                              {{ cityMunicipality }}
                            </div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>

                    <v-card class="mb-4 card-section">
                      <v-card-title class="text-h6 section-title">
                        <v-icon left color="blue-darken-3" class="mr-2">
                          mdi-home-group
                        </v-icon>
                        USE OR CHARACTER OF OCCUPANCY
                      </v-card-title>
                      <v-divider />
                      <v-card-text>
                        <v-row dense>
                          <v-col cols="12">
                            <div class="plain-label">Group:</div>
                            <div class="plain-value">{{ occupancyGroup }}</div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>

                    <v-card class="mb-4 card-section">
                      <v-card-title class="text-h6 section-title">
                        <v-icon left color="blue-darken-3" class="mr-2">
                          mdi-file-document-multiple
                        </v-icon>
                        PROJECT DETAILS
                      </v-card-title>
                      <v-divider />
                      <v-card-text>
                        <v-row dense>
                          <v-col cols="12" md="6">
                            <div class="plain-label">Occupancy Classified:</div>
                            <div class="plain-value">
                              {{ occupancyClassified }}
                            </div>
                          </v-col>
                          <v-col cols="12" md="6">
                            <div class="plain-label">Date of Completion:</div>
                            <div class="plain-value">
                              {{ dateOfCompletion }}
                            </div>
                          </v-col>
                          <v-col cols="12" md="6">
                            <div class="plain-label">No. of Units:</div>
                            <div class="plain-value">{{ numberOfUnits }}</div>
                          </v-col>
                          <v-col cols="12" md="6">
                            <div class="plain-label">No. of Storeys:</div>
                            <div class="plain-value">{{ numberOfStoreys }}</div>
                          </v-col>
                          <v-col cols="12">
                            <div class="plain-label">Total Floor Area (sq. m):</div>
                            <div class="plain-value">{{ totalFloorArea }}</div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-form>
                </v-card-text>
              </v-card>

              <div class="d-flex justify-end mt-6 mb-8">
                <v-btn class="btn-rounded mr-2" variant="tonal" @click="goBack">
                  <v-icon left>mdi-arrow-left</v-icon>Back
                </v-btn>
                <v-btn
                  color="blue-darken-3"
                  class="btn-rounded"
                  variant="elevated"
                  @click="goNext"
                >
                  Next<v-icon right>mdi-arrow-right</v-icon>
                </v-btn>
              </div>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "OccupancyPermitLocationPage",

  data() {
    return {
      formStepValue: 3,
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
      formValid: false,
      projectName: "",
      blkNo: "",
      street: "",
      barangay: "",
      cityMunicipality: "",
      occupancyGroup: "",
      occupancyClassified: "",
      numberOfUnits: "",
      numberOfStoreys: "",
      totalFloorArea: "",
      dateOfCompletion: "",
    };
  },
  methods: {
    handleLogout() {
      this.$router.push({ name: "Login" });
    },
    goToStep(index) {
      this.sidebarStep = index;
    },
    goNext() {
      this.$router.push("/opam/op-application/op-signatories");
    },
    goBack() {
      this.$router.push("/opam/op-application/op-owner");
    },
  },
});
</script>

<style scoped>
/* Government Standard Font Styles */
* {
  font-family: Arial, Helvetica, sans-serif;
}

/* Body */
.app-container,
.v-application {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.7;
}

/* Header (H1) - 36px */
.page-header,
.text-h4 {
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1.25;
}

/* Subheader (H2) - 24px */
.section-header,
.text-h5 {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.35;
}

/* Label/Title - 14px */
.form-label,
.table-header,
.ui-label {
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.5;
}

/* Small/Helper Text - 13px */
.helper-text,
.text-caption {
  font-size: 13px;
  font-weight: 400;
  line-height: 1.6;
}

.plain-label {
  font-size: 0.88rem;
  color: #444;
  font-weight: 500;
}
.plain-value {
  font-size: 1.08rem;
  color: #222;
  font-weight: 700;
  min-height: 32px;
  margin-bottom: 18px;
}

.content-area {
  flex: 1;
}

.main-content-bg {
  background: #fafdff;
}

.quick-guide-card {
  min-height: 100%;
  background: #fcfcff;
  border-right: 1px solid #e0e0e0;
}

.quick-guide-step:hover {
  background: #e3f0ff !important;
}

.active-step {
  background: #e7efff !important;
}

.stepper-elevated {
  background: white;
  border-radius: 14px;
  box-shadow: 0 2px 6px rgba(25, 118, 210, 0.06);
  padding: 20px 0;
}

.card-shadow {
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.08);
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
  font-weight: 600;
}

.no-scroll {
  height: 100vh;
  overflow: hidden !important;
  padding-top: 88px;
}
</style>
