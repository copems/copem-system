<template>
  <div>
    <v-card class="my-2 pa-4 card-shadow">
      <v-card-text>
        <v-form ref="form">
          <!-- SIGNATORIES DETAILS LABEL -->
          <div class="mb-4" style="padding-top: 8px">
            <span class="text-h6 font-weight-bold" style="color: #222; font-size: 1.5rem">
              SIGNATORIES DETAILS
            </span>
            <v-divider class="mt-2 mb-1" />
          </div>

          <!-- APPLICANT/OWNER INFORMATION BOX -->
          <v-card class="mb-4 card-section">
            <v-card-title class="text-h6 card-title-responsive section-title">
              <v-icon left color="blue-darken-3" class="mr-2"> mdi-account </v-icon>
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
                    :maxlength="8"
                    :rules="ctcRules"
                    @keypress="onlyNumbers"
                    @input="formatCtcNo"
                    @paste="handlePaste"
                    type="tel"
                    inputmode="numeric"
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
                        :value="ctcDateIssuedRaw ? formatDate(ctcDateIssuedRaw) : ''"
                        variant="outlined"
                        density="compact"
                        readonly
                        style="height: 50px; min-height: 50px"
                        v-bind="props"
                      />
                    </template>
                    <v-date-picker
                      v-model="ctcDateIssuedRaw"
                      @update:model-value="onCtcDateSelected"
                      :show-current="false"
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
        @click="$emit('back')"
        variant="tonal"
      >
        <v-icon left>mdi-arrow-left</v-icon>Back
      </v-btn>

      <v-btn
        color="blue-darken-3"
        class="btn-rounded"
        elevation="2"
        @click="$emit('submit')"
        variant="elevated"
      >
        SUBMIT
      </v-btn>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Step3SignatoriesDetails",
  emits: ["back", "submit"],
  data() {
    return {
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
      ctcDateIssuedRaw: null,
      ctcDateIssuedMenu: false,
      ctcIssuedAt: "",

      applicantFirstName: "",
      applicantLastName: "",
      applicantMiddleInitial: "",
      applicantCommunityTaxNo: "",
      applicantCommunityTaxDateIssued: "",
      applicantCommunityTaxPlaceIssued: "",

      ctcRules: [
        (v) => !!v || "CTC No. is required",
        (v) => /^\d+$/.test(v) || "CTC No. must contain only numbers",
        (v) => (v && v.length === 8) || "CTC No. must be exactly 8 digits",
      ],
    };
  },
  methods: {
    onlyNumbers(event) {
      // allow common control/navigation keys
      const allowed = [
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "Tab",
        "Home",
        "End",
      ];
      if (allowed.includes(event.key)) return;
      // if it's a printable character and not a digit, block it
      if (event.key && event.key.length === 1 && !/^\d$/.test(event.key)) {
        event.preventDefault();
      }
    },
    handlePaste(event) {
      const paste = (event.clipboardData || window.clipboardData).getData("text") || "";
      const digits = paste.replace(/\D/g, "").slice(0, 8);
      if (!digits) {
        event.preventDefault();
        return;
      }
      // Prevent default paste and insert sanitized digits capped to maxlength
      event.preventDefault();
      this.ctcNo = (this.ctcNo + digits).replace(/\D/g, "").slice(0, 8);
    },
    onCtcDateSelected(val) {
      this.ctcDateIssuedRaw = val;
      this.ctcDateIssuedMenu = false;
    },
    formatDate(value) {
      if (!value) return "";
      // If value is a Date object
      if (value instanceof Date) {
        return value.toISOString().slice(0, 10);
      }
      // If value is an ISO string like '2026-01-13' or full datetime
      const iso = String(value);
      // Try to extract YYYY-MM-DD
      const match = iso.match(/(\d{4}-\d{2}-\d{2})/);
      if (match) return match[1];
      // Fallback: create Date and format
      const d = new Date(iso);
      if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
      return iso;
    },
    formatCtcNo() {
      this.ctcNo = this.ctcNo.replace(/\D/g, "").slice(0, 8);
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

.card-title-responsive {
  font-size: 1rem;
}

@media (max-width: 800px) {
  .section-title {
    font-size: 0.92rem !important;
  }
}

@media (max-width: 600px) {
  .card-shadow,
  .card-section {
    padding: 6px !important;
  }
}

@media (max-width: 480px) {
  .btn-rounded {
    min-width: 90px;
    font-size: 0.9rem;
  }
}
</style>
