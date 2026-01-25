<template>
  <div>
    <v-form ref="form" @submit.prevent="validateAndProceed">
      <!-- SELECT APPLICATION Card -->
      <v-card
        class="my-2 pa-4 card-shadow"
        :class="{ 'error-card-wrapper': validationFailed }"
      >
        <v-card-title class="text-h6 card-title-responsive mb-2">
          SELECT APPLICATION
        </v-card-title>
        <v-divider class="mb-4"></v-divider>
        <v-card-text>
          <v-card
            class="mb-4 card-section"
            :class="{
              'error-section': validationFailed && selectedApplicationType === null,
            }"
          >
            <v-card-title
              class="text-h6 card-title-responsive section-title"
              :class="{
                'text-red-darken-1': validationFailed && selectedApplicationType === null,
              }"
            >
              <v-icon
                left
                :color="validationFailed ? 'red-darken-1' : 'blue-darken-3'"
                class="mr-2"
              >
                mdi-format-list-bulleted
              </v-icon>
              TYPE OF APPLICATION
            </v-card-title>
            <v-divider
              :color="validationFailed ? 'red-lighten-3' : 'grey-lighten-2'"
            ></v-divider>
            <v-card-text>
              <v-radio-group
                v-model="selectedApplicationType"
                :rules="[(v) => !!v || 'Please select an application type.']"
                mandatory
                class="mt-0 pt-0"
                :error="validationFailed"
                hide-details
              >
                <v-row>
                  <v-col cols="12" md="6">
                    <v-card
                      :class="{
                        'card-selected': selectedApplicationType === 'partial',
                      }"
                      @click="selectedApplicationType = 'partial'"
                      class="pa-4 custom-radio-card"
                      flat
                    >
                      <div class="d-flex align-center">
                        <v-radio :value="'partial'"></v-radio>
                        <div class="flex-grow-1 ml-2">
                          <div class="text-h6 radio-card-title-responsive">
                            Partial
                          </div>
                        </div>
                        <v-icon
                          :color="selectedApplicationType === 'partial' ? 'blue' : 'grey'"
                        >
                          mdi-home
                        </v-icon>
                      </div>
                    </v-card>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-card
                      :class="{
                        'card-selected': selectedApplicationType === 'complete',
                      }"
                      @click="selectedApplicationType = 'complete'"
                      class="pa-4 custom-radio-card"
                      flat
                    >
                      <div class="d-flex align-center">
                        <v-radio :value="'complete'"></v-radio>
                        <div class="flex-grow-1 ml-2">
                          <div class="text-h6 radio-card-title-responsive">
                            Full
                          </div>
                        </div>
                        <v-icon
                          :color="selectedApplicationType === 'complete' ? 'blue' : 'grey'"
                        >
                          mdi-truck
                        </v-icon>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
              </v-radio-group>
            </v-card-text>
          </v-card>
          <v-row v-if="validationFailed && selectedApplicationType === null">
            <v-col cols="12" class="pt-0 pb-2">
              <span class="text-caption text-red-darken-1">
                Please select an application type.
              </span>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- OWNER/APPLICANT DETAILS Card -->
      <v-card class="my-2 pa-4 card-shadow">
        <v-card-title class="text-h6 card-title-responsive mb-2">
          OWNER/APPLICANT DETAILS
        </v-card-title>
        <v-divider class="mb-4" />

        <v-card-text>
          <v-card class="mb-4 card-section">
            <v-card-title class="text-h6 section-title">
              <v-icon left color="blue-darken-3" class="mr-2">
                mdi-account
              </v-icon>
              OWNER/APPLICANT
            </v-card-title>
            <v-divider />
            <v-card-text>
              <v-row dense>
                <v-col cols="12" sm="6" md="4">
                  <div class="plain-label">Last Name</div>
                  <div class="plain-value">
                    {{ applicantData.lastName }}
                  </div>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <div class="plain-label">First Name:</div>
                  <div class="plain-value">
                    {{ applicantData.firstName }}
                  </div>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <div class="plain-label">MI:</div>
                  <div class="plain-value">
                    {{ applicantData.middleInitial }}
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <v-card class="card-section">
            <v-card-title class="text-h6 section-title">
              <v-icon left color="blue-darken-3" class="mr-2">
                mdi-map-marker
              </v-icon>
              ADDRESS
            </v-card-title>
            <v-divider />
            <v-card-text>
              <v-row dense>
                <v-col cols="12" sm="6" md="3">
                  <div class="plain-label">No. Street:</div>
                  <div class="plain-value">
                    {{ applicantData.street }}
                  </div>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <div class="plain-label">Barangay:</div>
                  <div class="plain-value">
                    {{ applicantData.barangay }}
                  </div>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <div class="plain-label">City/Municipality:</div>
                  <div class="plain-value">
                    {{ applicantData.city }}
                  </div>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <div class="plain-label">Contact No.:</div>
                  <div class="plain-value">
                    {{ applicantData.contactNo }}
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-card-text>
      </v-card>

      <div class="d-flex justify-end mt-6 mb-8">
        <v-btn class="btn-rounded mr-2" variant="tonal" @click="$emit('back')">
          <v-icon left>mdi-arrow-left</v-icon>Back
        </v-btn>
        <v-btn
          color="blue-darken-3"
          class="btn-rounded"
          variant="elevated"
          type="submit"
        >
          Next<v-icon right>mdi-arrow-right</v-icon>
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Step1OwnerApplicant",
  emits: ["next", "back"],
  data() {
    return {
      applicantData: {
        lastName: "",
        firstName: "",
        middleInitial: "",
        street: "",
        barangay: "",
        city: "",
        contactNo: "",
      },
      selectedApplicationType: null,
      validationFailed: false,
    };
  },
  methods: {
    validateAndProceed() {
      if (this.selectedApplicationType) {
        this.validationFailed = false;
        this.$emit("next");
      } else {
        this.validationFailed = true;
      }
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
}

.btn-rounded {
  border-radius: 30px !important;
  min-width: 110px;
  font-weight: 600;
}

.plain-label {
  font-size: 0.8rem;
  color: #616161;
  font-weight: 500;
}

.plain-value {
  font-size: 1rem;
  color: #212121;
  font-weight: 600;
  padding: 6px 0;
  min-height: 38px;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 12px;
}

.error-card-wrapper {
  border: 1.5px solid #ef9a9a !important;
}

.error-section {
  background: #ffebee !important;
  border: 1px solid #e57373 !important;
}

.custom-radio-card {
  border: 1px solid #e0e0e0;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
  border-radius: 10px;
}

.custom-radio-card:hover {
  border-color: #bbdefb;
  box-shadow: 0 0 8px rgba(25, 118, 210, 0.1);
}

.card-selected {
  border: 2px solid #1976d2;
  box-shadow: 0 0 12px rgba(25, 118, 210, 0.2);
  background-color: #e3f2fd !important;
}

.radio-card-title-responsive {
  font-size: 1rem;
}

.card-title-responsive {
  font-size: 1rem;
}
</style>
