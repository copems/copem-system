<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters class="px-3">
      <v-col cols="12">
        <v-row no-gutters class="mb-1">
          <v-col cols="6" class="pa-0 box-label">BOX 3</v-col>
          <v-col cols="6" class="pa-0 box-label">BOX 4</v-col>
        </v-row>

        <v-row no-gutters class="box-outer-border">
          <v-col cols="6" class="column-divider d-flex flex-column">
            <div class="pa-1 label-main">APPLICANT:</div>

            <div class="px-2 mt-auto mb-1">
              <div class="d-flex align-end">
                <div class="flex-grow-1 d-flex flex-column align-center">
                  <div class="signature-line w-100"></div>
                  <div class="caption-sub mt-1">
                    (Signature Over Printed Name)
                  </div>
                </div>
                <div class="d-flex align-end ml-2 pb-5">
                  <span class="label-date">Date</span>
                  <div class="date-line ml-1"></div>
                </div>
              </div>
            </div>

            <div class="border-top-black">
              <div class="pa-1 address-height border-bottom-black label-small">
                Address
              </div>
              <v-row no-gutters>
                <v-col
                  cols="4"
                  class="pa-1 detail-cell border-right-black label-small"
                  >Gov't Issued ID No.</v-col
                >
                <v-col
                  cols="4"
                  class="pa-1 detail-cell border-right-black label-small"
                  >Date Issued</v-col
                >
                <v-col cols="4" class="pa-1 detail-cell label-small"
                  >Place Issued</v-col
                >
              </v-row>
            </div>
          </v-col>

          <v-col cols="6" class="d-flex flex-column">
            <div class="pa-1 label-main">
              WITH MY CONSENT: LOT OWNER / AUTHORIZED REPRESENTATIVE
            </div>

            <div class="px-2 mt-auto mb-1">
              <div class="d-flex align-end">
                <div class="flex-grow-1 d-flex flex-column align-center">
                  <div class="signature-line w-100"></div>
                  <div class="caption-sub mt-1">
                    (Signature Over Printed Name)
                  </div>
                </div>
                <div class="d-flex align-end ml-2 pb-5">
                  <span class="label-date">Date</span>
                  <div class="date-line ml-1"></div>
                </div>
              </div>
            </div>

            <div class="border-top-black">
              <div class="pa-1 address-height border-bottom-black label-small">
                Address
              </div>
              <v-row no-gutters>
                <v-col
                  cols="4"
                  class="pa-1 detail-cell border-right-black label-small"
                  >Gov't Issued ID No.</v-col
                >
                <v-col
                  cols="4"
                  class="pa-1 detail-cell border-right-black label-small"
                  >Date Issued</v-col
                >
                <v-col cols="4" class="pa-1 detail-cell label-small"
                  >Place Issued</v-col
                >
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PermitFormBoxes",
});
</script>

<style scoped>
.box-label {
  font-size: 0.75rem;
}

.box-outer-border {
  border: 1px solid black;
  font-family: Arial, sans-serif;
}

.column-divider {
  border-right: 1px solid black;
}

.label-main {
  font-size: 0.7rem;
}

.label-date {
  font-size: 0.7rem;
  line-height: 1;
}

.label-small {
  font-size: 0.7rem;
}

.caption-sub {
  font-size: 0.65rem;
  white-space: nowrap;
}

/* Lines */
.signature-line {
  border-bottom: 1px solid black;
  height: 40px; /* Space for signing */
}

.date-line {
  border-bottom: 1px solid black;
  width: 100px;
  height: 1px;
}

/* Bottom Grid Sections */
.border-top-black {
  border-top: 1px solid black;
}

.border-bottom-black {
  border-bottom: 1px solid black;
}

.border-right-black {
  border-right: 1px solid black;
}

.address-height {
  height: 40px;
}

.detail-cell {
  height: 35px;
}

.w-100 {
  width: 100%;
}
</style>