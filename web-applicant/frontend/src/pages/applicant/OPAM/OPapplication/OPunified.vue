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
                  @click="goToSidebarStep(index)"
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

              <div class="mt-4"></div>
            </v-card>
          </v-col>

          <!-- RIGHT MAIN CONTENT -->
          <v-col cols="12" md="9" class="main-content-bg pa-6">
            <v-container fluid class="px-4 mx-auto" style="max-width: 1300px">
              <!-- STEPPER -->
              <v-stepper
                v-model="currentStep"
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
                      :complete="currentStep > step.value"
                      :color="
                        currentStep >= step.value ? 'blue-darken-1' : 'grey lighten-2'
                      "
                      class="stepper-item-custom"
                      @click="goToStep(step.value)"
                      style="cursor: pointer"
                    />
                    <v-divider
                      v-if="index < formSteps.length - 1"
                      :thickness="3"
                      :style="{
                        'border-color': currentStep > step.value ? '#1976D2' : '#e0e0e0',
                      }"
                      class="mx-2"
                    />
                  </div>
                </v-stepper-header>
              </v-stepper>

              <!-- STEP CONTENT -->
              <Step1 v-if="currentStep === 1" @next="nextStep" @back="goBack" />
              <Step2 v-if="currentStep === 2" @next="nextStep" @back="prevStep" />
              <Step3 v-if="currentStep === 3" @back="prevStep" @submit="handleSubmit" />
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- SUCCESS DIALOG -->
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
import Step1 from "./components/Step1.vue";
import Step2 from "./components/Step2.vue";
import Step3 from "./components/Step3.vue";

export default defineComponent({
  name: "OPUnifiedPage",
  components: {
    Step1,
    Step2,
    Step3,
  },
  data() {
    return {
      currentStep: 1,
      formSteps: [
        { title: "Owner/Applicant", value: 1 },
        { title: "Application Details", value: 2 },
        { title: "Signatories Details", value: 3 },
      ],
      sidebarStep: 0,
      sidebarSteps: [
        "Fill up the Unified Application Form",
        "Download Filled-up Unified Application Form and Completion Permits",
      ],
      dialog: false,
      applicationNumber: "",
    };
  },
  methods: {
    nextStep() {
      if (this.currentStep < 3) {
        this.currentStep++;
      }
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },
    goToStep(step) {
      this.currentStep = step;
    },
    goToSidebarStep(index) {
      this.sidebarStep = index;
    },
    goBack() {
      this.$router.push("/opam/op-application/op-apply");
    },
    handleSubmit() {
      const year = new Date().getFullYear();
      const randomNumber = Math.floor(1000 + Math.random() * 9000);
      this.applicationNumber = `OP-${year}-${randomNumber}`;
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
      this.$router.push("/opam/op-forms/forms-section");
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
  min-height: 100%;
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

.submission-number-card {
  background: #e3f0ff !important;
  border: 1px solid #a3c9f2;
  border-radius: 8px;
}

.no-scroll {
  min-height: 100vh;
  padding-top: 88px;
}
</style>
