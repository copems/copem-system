<template>
  <div>
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
                  <div class="plain-value">{{ cityMunicipality }}</div>
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
                  <div class="plain-value">{{ occupancyClassified }}</div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="plain-label">Date of Completion:</div>
                  <div class="plain-value">{{ dateOfCompletion }}</div>
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
      <v-btn class="btn-rounded mr-2" variant="tonal" @click="$emit('back')">
        <v-icon left>mdi-arrow-left</v-icon>Back
      </v-btn>
      <v-btn
        color="blue-darken-3"
        class="btn-rounded"
        variant="elevated"
        @click="$emit('next')"
      >
        Next<v-icon right>mdi-arrow-right</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Step2ApplicationDetails",
  emits: ["next", "back"],
  data() {
    return {
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
});
</script>

<style scoped>
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

.card-title-responsive {
  font-size: 1rem;
}
</style>
