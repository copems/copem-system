<template>
  <div class="permit-form-container">
    <div class="mb-2 text-center">
      <p class="header-text mb-0">Republic of the Philippines</p>
      <p class="header-text mb-0">
        City/Municipality of <span class="header-underline">NAGA</span>
      </p>
      <p class="header-text font-italic">
        Province of <span class="header-underline">CAMARINES SUR</span>
      </p>
      <h4 class="title-main font-weight-bold mt-2">
        UNIFIED APPLICATION FORM FOR BUILDING PERMIT
      </h4>
    </div>

    <div class="checkbox-alignment-container mb-4">
      <v-row no-gutters justify="center">
        <v-col cols="3" class="d-flex align-end pb-1">
          <p class="applies-for-text mb-0">THIS APPLIES ALSO FOR:</p>
        </v-col>
        <v-col cols="3">
          <v-checkbox
            v-model="reviewData.isSimple"
            label="SIMPLE"
            hide-details
            density="compact"
            class="header-cb compact-cb"
          />
          <v-checkbox
            v-model="reviewData.isNew"
            label="NEW"
            hide-details
            density="compact"
            class="header-cb compact-cb"
          />
          <v-checkbox
            v-model="reviewData.hasLocationalClearance"
            label="LOCATIONAL CLEARANCE"
            hide-details
            density="compact"
            class="header-cb compact-cb"
          />
        </v-col>
        <v-col cols="2">
          <v-checkbox
            v-model="reviewData.isRenewal"
            label="RENEWAL"
            hide-details
            density="compact"
            class="header-cb compact-cb mt-8"
          />
        </v-col>
        <v-col cols="4">
          <v-checkbox
            v-model="reviewData.isComplex"
            label="COMPLEX*"
            hide-details
            density="compact"
            class="header-cb compact-cb"
          />
          <v-checkbox
            v-model="reviewData.isAmendatory"
            label="AMENDATORY"
            hide-details
            density="compact"
            class="header-cb compact-cb"
          />
          <v-checkbox
            v-model="reviewData.hasFireSafetyEvaluationClearance"
            label="FIRE SAFETY EVALUATION CLEARANCE"
            hide-details
            density="compact"
            class="header-cb compact-cb"
          />
        </v-col>
      </v-row>
    </div>

    <v-row no-gutters class="px-3 mb-1">
      <v-col cols="9">
        <p class="box-inner-label mb-0">APPLICATION NO.</p>
        <div class="application-no-wrapper">
          <div class="number-grid-container">
            <input
              v-for="i in 10"
              :key="'app-2-' + i"
              v-model="reviewData.applicationNo[i + 2]"
              type="text"
              class="number-grid-input"
              maxlength="1"
            />
          </div>
        </div>
      </v-col>
      <v-col cols="3">
        <p class="box-inner-label mb-0">AREA NO.</p>
        <div class="application-no-wrapper justify-end">
          <div class="number-grid-container">
            <input
              v-for="i in 10"
              :key="'area-2-' + i"
              v-model="reviewData.areaNo[i + 2]"
              type="text"
              class="number-grid-input"
              maxlength="1"
            />
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row no-gutters class="px-3">
      <v-col cols="10" class="pr-2">
        <p class="box-label text-uppercase mb-0">
          BOX 1 (TO BE ACCOMPLISHED IN PRINT BY THE APPLICANT)
        </p>

        <div class="box-1-main-border">
          <div class="box-1-row d-flex">
            <div class="box-1-cell" style="flex: 1.5">
              <p class="cell-label">OWNER/ APPLICANT</p>
            </div>
            <div class="box-1-cell" style="flex: 2">
              <p class="cell-label">LAST NAME</p>
              <div class="cell-value">{{ reviewData.lastName }}</div>
            </div>
            <div class="box-1-cell" style="flex: 2">
              <p class="cell-label">FIRST NAME</p>
              <div class="cell-value">{{ reviewData.firstName }}</div>
            </div>
            <div class="box-1-cell" style="flex: 0.5">
              <p class="cell-label">M.I.</p>
              <div class="cell-value text-center">{{ reviewData.mi }}</div>
            </div>
            <div class="box-1-cell no-right-border" style="flex: 2">
              <p class="cell-label">TIN</p>
              <div class="cell-value">{{ reviewData.tin }}</div>
            </div>
          </div>

          <div class="box-1-row d-flex border-top-black">
            <div class="box-1-cell" style="flex: 3.5">
              <p class="cell-label">FOR CONSTRUCTION OWNED BY AN ENTERPRISE</p>
            </div>
            <div class="box-1-cell no-right-border" style="flex: 6.5">
              <p class="cell-label">FORM OF OWNERSHIP</p>
            </div>
          </div>

          <div class="box-1-row d-flex border-top-black">
            <div class="box-1-cell" style="flex: 1">
              <p class="cell-label">ADDRESS: NO.,</p>
            </div>
            <div class="box-1-cell" style="flex: 1.5">
              <p class="cell-label">STREET,</p>
            </div>
            <div class="box-1-cell" style="flex: 1.5">
              <p class="cell-label">BARANGAY,</p>
            </div>
            <div class="box-1-cell" style="flex: 2.5">
              <p class="cell-label">CITY/MUNICIPALITY</p>
            </div>
            <div class="box-1-cell" style="flex: 1">
              <p class="cell-label">ZIP CODE</p>
            </div>
            <div class="box-1-cell no-right-border" style="flex: 2">
              <p class="cell-label">CONTACT NO.</p>
            </div>
          </div>

          <div class="box-1-row border-top-black pa-2">
            <div class="d-flex align-center flex-wrap mb-2">
              <span class="cell-label mr-1"
                >LOCATION OF CONSTRUCTION: LOT NO.</span
              >
              <span class="underline-field mr-3" style="width: 60px"></span>
              <span class="cell-label mr-1">BLK NO.</span>
              <span class="underline-field mr-3" style="width: 60px"></span>
              <span class="cell-label mr-1">TCT NO.</span>
              <span class="underline-field mr-3" style="width: 120px"></span>
              <span class="cell-label mr-1">CURRENT TAX DEC. NO.</span>
              <span class="underline-field flex-grow-1"></span>
            </div>
            <div class="d-flex align-center">
              <span class="cell-label mr-1">STREET</span>
              <span class="underline-field" style="flex: 1"></span>
              <span class="cell-label mx-2">BARANGAY</span>
              <span class="underline-field" style="flex: 1"></span>
              <span class="cell-label ml-2 mr-1">CITY/ MUNICIPALITY OF</span>
              <span class="underline-field" style="flex: 1"></span>
            </div>
          </div>

          <div class="box-1-row border-top-black pa-2">
            <p class="cell-label mb-1">SCOPE OF WORK</p>
            <v-row no-gutters>
              <v-col cols="4" v-for="(col, i) in scopeColumns" :key="i">
                <div
                  v-for="item in col"
                  :key="item.label"
                  class="scope-item d-flex align-center"
                >
                  <v-checkbox
                    :label="item.label"
                    hide-details
                    density="compact"
                    class="custom-checkbox compact-cb flex-grow-0"
                  />
                  <span
                    class="underline-field flex-grow-1 ml-1"
                    style="min-height: 14px"
                  ></span>
                </div>
              </v-col>
            </v-row>
          </div>
        </div>
        <UseOrCharacterOfOccupancy />
      </v-col>

      <v-col cols="2">
        <div class="psa-alignment-spacer"></div>
        <div class="psa-label-external text-center font-weight-bold">
          DO NOT FILL-UP (PSA USE ONLY)
        </div>
        <div class="psa-container-detached">
          <div class="psa-grid">
            <div v-for="row in 14" :key="row" class="psa-row d-flex">
              <div
                class="psa-box"
                :class="
                  [2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13].includes(row)
                    ? 'grey-box'
                    : 'white-box'
                "
              ></div>
              <div
                class="psa-box"
                :class="
                  [2, 4, 5, 6, 7, 8, 10, 11, 12, 13].includes(row)
                    ? 'grey-box'
                    : 'white-box'
                "
              ></div>
              <div
                class="psa-box"
                :class="
                  [2, 4, 5, 7, 10, 11, 12].includes(row)
                    ? 'grey-box'
                    : 'white-box'
                "
              ></div>
              <div
                class="psa-box"
                :class="
                  [2, 4, 5, 6, 7, 10, 11].includes(row)
                    ? 'grey-box'
                    : 'white-box'
                "
              ></div>
              <div
                class="psa-box"
                :class="
                  [2, 4, 5, 6, 7, 10, 11].includes(row)
                    ? 'grey-box'
                    : 'white-box'
                "
              ></div>
              <div
                class="psa-box"
                :class="
                  [2, 4, 5, 7, 10].includes(row) ? 'grey-box' : 'white-box'
                "
              ></div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import UseOrCharacterOfOccupancy from "./useorcharacterofoccupancy.vue";

export default defineComponent({
  name: "Box1",
  components: { UseOrCharacterOfOccupancy },
  props: {
    reviewData: { type: Object, required: true },
  },
  data() {
    return {
      scopeColumns: [
        [
          { label: "NEW CONSTRUCTION" },
          { label: "ERECTION" },
          { label: "ADDITION" },
          { label: "ALTERATION" },
        ],
        [
          { label: "RENOVATION" },
          { label: "CONVERSION" },
          { label: "REPAIR" },
          { label: "MOVING" },
        ],
        [
          { label: "RAISING" },
          { label: "ACCESSORY BUILDING/STRUCTURE" },
          { label: "LEGALIZATION OF EXISTING" },
          { label: "OTHERS (Specify)" },
        ],
      ],
    };
  },
});
</script>

<style scoped>
.permit-form-container {
  font-family: Arial, sans-serif;
  color: black;
  max-width: 1100px;
  margin: auto;
  background: white;
}

.header-underline {
  text-decoration: underline;
  font-weight: bold;
}

.compact-cb {
  margin-top: 0 !important;
  padding-top: 0 !important;
}

.compact-cb :deep(.v-selection-control) {
  min-height: 24px !important;
  margin-bottom: 0px !important;
}

.compact-cb :deep(.v-selection-control__wrapper) {
  height: 24px !important;
  width: 24px !important;
}

.application-no-wrapper {
  display: flex;
  gap: 12px;
  margin-top: 2px;
}

.number-grid-container {
  display: flex;
  border: 1px solid black;
}

.number-grid-input {
  width: 22px;
  height: 22px;
  border-right: 1px solid black;
  text-align: center;
  font-size: 0.8rem;
  border-top: none;
  border-left: none;
  border-bottom: none;
  outline: none;
  background: transparent;
}

.number-grid-input:last-child {
  border-right: none;
}

.box-inner-label {
  font-size: 0.7rem;
}

/* PSA Alignment Styling */
.psa-alignment-spacer {
  height: 18px; /* Matches the vertical space of 'BOX 1 (TO BE ACCOMPLISHED...)' title height */
}

.psa-label-external {
  font-size: 0.5rem;
  text-transform: uppercase;
  margin-bottom: 2px;
  line-height: 1.2;
}

.psa-container-detached {
  border: 1px solid black;
}

.psa-row {
  border-bottom: 1px solid black;
  height: 52px;
}

.psa-row:last-child {
  border-bottom: none;
}

.psa-box {
  flex: 1;
  border-right: 1px solid black;
}

.psa-box:last-child {
  border-right: none;
}

.grey-box {
  background-color: #666;
}

/* Box 1 Styling */
.box-1-main-border {
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-bottom: none;
}

.box-1-cell {
  border-right: 1px solid black;
  padding: 2px 4px;
  min-height: 40px;
}

.box-1-cell.no-right-border {
  border-right: none;
}

.border-top-black {
  border-top: 1px solid black;
}

.cell-label {
  font-size: 0.7rem;
  text-transform: uppercase;
}

.cell-value {
  font-size: 0.85rem;
  padding-top: 2px;
}

.underline-field {
  border-bottom: 1px solid black;
}

.custom-checkbox :deep(.v-label) {
  font-size: 0.7rem !important;
  color: black !important;
  opacity: 1;
  padding-inline-start: 4px !important;
}

.header-cb :deep(.v-label) {
  font-size: 0.7rem !important;
  color: black !important;
  padding-inline-start: 4px !important;
}

.box-label {
  font-size: 0.75rem;
}

.header-text {
  font-size: 0.75rem;
}

.title-main {
  font-size: 0.9rem;
}

.applies-for-text {
  font-size: 0.7rem;
}
</style>