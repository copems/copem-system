<template>
  <div class="page-container px-3 pb-8 mt-6">
    <div class="print-only mb-4 text-center">
      <div style="font-size: var(--text-body)" class="uppercase">
        Republic of the Philippines
      </div>
      <div style="font-size: var(--text-h2)" class="font-weight-bold uppercase">
        City Government of Naga
      </div>
      <div style="font-size: var(--text-h3)" class="font-weight-bold">
        OFFICE OF THE CITY BUILDING OFFICIAL
      </div>
      <div
        style="font-size: var(--text-h1)"
        class="font-weight-black mt-2 border-b-2 pb-1"
      >
        BUILDING PERMIT EVALUATION SUMMARY
      </div>
    </div>

    <div class="mb-4 px-2">
      <v-btn
        color="blue-darken-2"
        variant="text"
        class="mb-2 no-print"
        @click="goBack"
      >
        <v-icon start>mdi-arrow-left</v-icon>
        Back
      </v-btn>
    </div>
    <div class="d-flex align-center justify-space-between mb-4 px-2 no-print">
      <div class="d-flex align-center">
        <v-icon color="#2563eb" class="mr-3" size="32"
          >mdi-office-building</v-icon
        >
        <h1 class="text-h4 font-weight-bold text-grey-darken-4">
          Building Permit Application
        </h1>
      </div>
      <v-btn
        color="primary"
        prepend-icon="mdi-printer"
        class="text-none font-weight-bold px-6"
        rounded="lg"
        @click="printSummary"
      >
        Print Summary Report
      </v-btn>
    </div>

    <v-card
      class="rounded-xl border-0 shadow-sm overflow-hidden print-flat"
      color="white"
      min-height="800"
    >
      <v-tabs
        v-model="activeTab"
        color="primary"
        bg-color="white"
        class="border-b px-6 no-print"
        height="60"
      >
        <v-tab
          value="application"
          class="text-body-2 font-weight-medium text-capitalize"
        >
          <v-icon start icon="mdi-file-document-outline" class="mr-2"></v-icon>
          Applicant Details
        </v-tab>
        <v-tab
          value="evaluation"
          class="text-body-2 font-weight-medium text-capitalize"
        >
          <v-icon
            start
            icon="mdi-clipboard-check-outline"
            class="mr-2"
          ></v-icon>
          Evaluation Summary
        </v-tab>
        <v-tab
          value="plans"
          class="text-body-2 font-weight-medium text-capitalize"
        >
          <v-icon start icon="mdi-file-check-outline" class="mr-2"></v-icon>
          PDF Plans
        </v-tab>
        <v-tab
          value="checklist"
          class="text-body-2 font-weight-medium text-capitalize"
        >
          <v-icon start icon="mdi-format-list-checks" class="mr-2"></v-icon>
          Checklist
        </v-tab>
      </v-tabs>

      <div class="pa-6 pa-md-8 bg-white print-pa-0">
        <v-window v-model="activeTab">
          <v-window-item value="application">
            <v-row class="align-stretch">
              <v-col cols="12" md="8" class="d-flex flex-column">
                <!-- Applicant Information Card -->
                <v-card class="rounded-lg border mb-4" flat>
                  <v-card-title
                    class="bg-blue-lighten-5 text-blue-darken-3 font-weight-bold text-h6 py-3"
                  >
                    <v-icon start class="mr-2">mdi-format-list-bulleted</v-icon>
                    Applicant Information
                  </v-card-title>
                  <v-card-text class="pa-4">
                    <v-row>
                      <v-col cols="12" md="6">
                        <div class="mb-3">
                          <div class="text-caption text-grey-darken-1 mb-1">
                            Applicant Name:
                          </div>
                          <div class="text-body-1 font-weight-bold">
                            {{ applicantDetails.applicantName }}
                          </div>
                        </div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <div class="mb-3">
                          <div class="text-caption text-grey-darken-1 mb-1">
                            Project Name:
                          </div>
                          <div class="text-body-1 font-weight-bold">
                            {{ applicantDetails.projectName }}
                          </div>
                        </div>
                      </v-col>
                      <v-col cols="12">
                        <div class="mb-0">
                          <div class="text-caption text-grey-darken-1 mb-1">
                            Project Location:
                          </div>
                          <div class="text-body-1 font-weight-bold">
                            {{ applicantDetails.projectLocation }}
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>

                <!-- Property Details Card -->
                <v-card class="rounded-lg border flex-grow-1" flat>
                  <v-card-title
                    class="bg-blue-lighten-5 text-blue-darken-3 font-weight-bold text-h6 py-3"
                  >
                    <v-icon start class="mr-2">mdi-home-city-outline</v-icon>
                    Property Details
                  </v-card-title>
                  <v-card-text class="pa-4">
                    <v-row>
                      <v-col cols="12" md="6">
                        <div class="mb-3">
                          <div class="text-caption text-grey-darken-1 mb-1">
                            Property Type:
                          </div>
                          <div class="text-body-1 font-weight-bold">
                            {{ propertyDetails.propertyType }}
                          </div>
                        </div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <div class="mb-3">
                          <div class="text-caption text-grey-darken-1 mb-1">
                            Building Use:
                          </div>
                          <div class="text-body-1 font-weight-bold">
                            {{ propertyDetails.buildingUse }}
                          </div>
                        </div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <div class="mb-3">
                          <div class="text-caption text-grey-darken-1 mb-1">
                            Floor Area:
                          </div>
                          <div class="text-body-1 font-weight-bold">
                            {{ propertyDetails.floorArea }}
                          </div>
                        </div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <div class="mb-3">
                          <div class="text-caption text-grey-darken-1 mb-1">
                            Number of Floors:
                          </div>
                          <div class="text-body-1 font-weight-bold">
                            {{ propertyDetails.numberOfFloors }}
                          </div>
                        </div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <div class="mb-3">
                          <div class="text-caption text-grey-darken-1 mb-1">
                            Lot Area:
                          </div>
                          <div class="text-body-1 font-weight-bold">
                            {{ propertyDetails.lotArea }}
                          </div>
                        </div>
                      </v-col>
                      <v-col cols="12">
                        <div class="mb-0">
                          <div class="text-caption text-grey-darken-1 mb-1">
                            Property Address:
                          </div>
                          <div class="text-body-1 font-weight-bold">
                            {{ propertyDetails.propertyAddress }}
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>

              <!-- Assessment Summary Card (Right Side) -->
              <v-col cols="12" md="4" class="d-flex flex-column">
                <v-card class="rounded-lg border flex-grow-1" flat>
                  <v-card-title
                    class="bg-orange-lighten-5 text-orange-darken-3 font-weight-bold"
                  >
                    <v-icon start class="mr-2">mdi-calculator</v-icon>
                    Assessment Summary
                  </v-card-title>
                  <v-card-text class="pa-6">
                    <div class="mb-3">
                      <div
                        class="d-flex justify-space-between align-center mb-2"
                      >
                        <span class="text-body-2 text-grey-darken-2"
                          >Building Construction</span
                        >
                        <span class="text-body-2 font-weight-bold">₱ 0.00</span>
                      </div>
                      <v-divider class="my-2"></v-divider>
                    </div>
                    <div class="mb-3">
                      <div
                        class="d-flex justify-space-between align-center mb-2"
                      >
                        <span class="text-body-2 text-grey-darken-2"
                          >Electrical Installation</span
                        >
                        <span class="text-body-2 font-weight-bold">₱ 0.00</span>
                      </div>
                      <v-divider class="my-2"></v-divider>
                    </div>
                    <div class="mb-3">
                      <div
                        class="d-flex justify-space-between align-center mb-2"
                      >
                        <span class="text-body-2 text-grey-darken-2"
                          >Mechanical Installation</span
                        >
                        <span class="text-body-2 font-weight-bold">₱ 0.00</span>
                      </div>
                      <v-divider class="my-2"></v-divider>
                    </div>
                    <div class="mb-3">
                      <div
                        class="d-flex justify-space-between align-center mb-2"
                      >
                        <span class="text-body-2 text-grey-darken-2"
                          >Plumbing Installation</span
                        >
                        <span class="text-body-2 font-weight-bold">₱ 0.00</span>
                      </div>
                      <v-divider class="my-2"></v-divider>
                    </div>
                    <div class="mb-3">
                      <div
                        class="d-flex justify-space-between align-center mb-2"
                      >
                        <span class="text-body-2 text-grey-darken-2"
                          >Electronic Installation</span
                        >
                        <span class="text-body-2 font-weight-bold">₱ 0.00</span>
                      </div>
                      <v-divider class="my-2"></v-divider>
                    </div>
                    <div class="mb-3">
                      <div
                        class="d-flex justify-space-between align-center mb-2"
                      >
                        <span class="text-body-2 text-grey-darken-2"
                          >Building Accessories</span
                        >
                        <span class="text-body-2 font-weight-bold">₱ 0.00</span>
                      </div>
                      <v-divider class="my-2"></v-divider>
                    </div>
                    <div class="mb-3">
                      <div
                        class="d-flex justify-space-between align-center mb-2"
                      >
                        <span class="text-body-2 text-grey-darken-2"
                          >Building Occupancy</span
                        >
                        <span class="text-body-2 font-weight-bold">₱ 0.00</span>
                      </div>
                      <v-divider class="my-2"></v-divider>
                    </div>
                    <div class="mb-3">
                      <div
                        class="d-flex justify-space-between align-center mb-2"
                      >
                        <span class="text-body-2 text-grey-darken-2"
                          >Building Inspection</span
                        >
                        <span class="text-body-2 font-weight-bold">₱ 0.00</span>
                      </div>
                      <v-divider class="my-2"></v-divider>
                    </div>
                    <div class="mb-3">
                      <div
                        class="d-flex justify-space-between align-center mb-2"
                      >
                        <span class="text-body-2 text-grey-darken-2"
                          >Fines / Surcharges / Penalties</span
                        >
                        <span class="text-body-2 font-weight-bold">₱ 0.00</span>
                      </div>
                      <v-divider class="my-2"></v-divider>
                    </div>
                    <div class="mb-3">
                      <div
                        class="d-flex justify-space-between align-center mb-2"
                      >
                        <span class="text-body-2 text-grey-darken-2"
                          >Certificate</span
                        >
                        <span class="text-body-2 font-weight-bold">₱ 0.00</span>
                      </div>
                      <v-divider class="my-2"></v-divider>
                    </div>
                    <div class="mb-3">
                      <div
                        class="d-flex justify-space-between align-center mb-2"
                      >
                        <span class="text-body-2 text-grey-darken-2"
                          >Adjustment</span
                        >
                        <span class="text-body-2 font-weight-bold">₱ 0.00</span>
                      </div>
                      <v-divider class="my-3"></v-divider>
                    </div>
                    <div class="bg-blue-grey-lighten-5 pa-3 rounded">
                      <div class="d-flex justify-space-between align-center">
                        <span
                          class="text-subtitle-2 font-weight-bold text-blue-darken-4"
                          >Total Amount</span
                        >
                        <span
                          class="text-h6 font-weight-black text-blue-darken-4"
                          >₱ 0.00</span
                        >
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-window-item>

          <v-window-item value="evaluation">
            <div class="print-section mb-6">
              <div class="d-flex justify-space-between align-center mb-4">
                <div>
                  <div class="text-caption uppercase">
                    Final Recommendation:
                  </div>
                  <div
                    class="text-h5 font-weight-black text-success print-text-black"
                  >
                    {{ evaluationData.recommendation.recommendation }}
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-caption uppercase">Date Issued:</div>
                  <div class="text-body-2 font-weight-bold">
                    {{ evaluationData.recommendation.date }}
                  </div>
                </div>
              </div>
            </div>

            <v-divider class="my-4 no-print"></v-divider>

            <div class="print-section mb-6">
              <div
                class="text-overline text-primary font-weight-bold mb-2 print-title-sm"
              >
                PROJECT IDENTIFICATION
              </div>
              <v-row no-gutters class="print-tight-row">
                <v-col cols="12" md="6" class="mb-2">
                  <span class="text-caption uppercase print-label"
                    >Control Number:</span
                  >
                  <span
                    class="text-body-2 font-weight-bold font-monospace ml-2"
                    >{{ evaluationData.application.controlNo }}</span
                  >
                </v-col>
                <v-col cols="12" md="6" class="mb-2">
                  <span class="text-caption uppercase print-label"
                    >Applicant Name:</span
                  >
                  <span class="text-body-2 font-weight-bold ml-2">{{
                    evaluationData.application.applicantName
                  }}</span>
                </v-col>
                <v-col cols="12" md="6" class="mb-2">
                  <span class="text-caption uppercase print-label"
                    >Project Type:</span
                  >
                  <span class="text-body-2 font-weight-bold ml-2">{{
                    evaluationData.application.projectName
                  }}</span>
                </v-col>
                <v-col cols="12" md="6" class="mb-2">
                  <span class="text-caption uppercase print-label"
                    >Location:</span
                  >
                  <span class="text-body-2 font-weight-bold ml-2">{{
                    evaluationData.application.projectLocation
                  }}</span>
                </v-col>
              </v-row>
            </div>

            <v-divider class="my-4 no-print"></v-divider>

            <div class="print-section">
              <div
                class="text-overline text-primary font-weight-bold mb-4 print-title-sm"
              >
                TECHNICAL EVALUATION RESULTS
              </div>
              <v-row>
                <v-col
                  v-for="(evalItem, index) in evaluationData.evaluations"
                  :key="index"
                  cols="12"
                  md="6"
                  class="print-col-12"
                >
                  <div
                    class="border rounded-lg pa-3 mb-2 print-no-border print-pa-0"
                  >
                    <div class="d-flex justify-space-between align-center mb-1">
                      <span
                        class="text-subtitle-2 font-weight-black text-blue-darken-3 uppercase"
                        >{{ evalItem.title }}</span
                      >
                      <v-chip
                        size="x-small"
                        color="success"
                        class="font-weight-bold no-print"
                        >COMPLIANT</v-chip
                      >
                      <span class="print-only text-caption font-weight-bold"
                        >[ COMPLIANT ]</span
                      >
                    </div>
                    <div class="text-caption mb-2">
                      Evaluator:
                      <span class="font-weight-bold">{{
                        evalItem.evaluator
                      }}</span>
                      <span class="mx-1">|</span> Date:
                      <span class="font-weight-bold">{{ evalItem.date }}</span>
                    </div>
                    <div
                      class="bg-grey-lighten-5 pa-2 rounded print-bg-white print-pa-0"
                    >
                      <div
                        v-for="(finding, fIndex) in evalItem.findings"
                        :key="fIndex"
                        class="text-caption"
                        style="line-height: 1.1"
                      >
                        • {{ finding }}
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>

            <div class="mt-8 border-t pt-4 print-mt-4">
              <div class="d-flex justify-space-between print-signature-block">
                <div class="text-center" style="width: 200px">
                  <div class="border-b-2 pt-4"></div>
                  <div class="text-caption mt-1 uppercase">
                    Applicant Signature
                  </div>
                </div>
                <div class="text-center" style="width: 250px">
                  <div class="text-body-2 font-weight-black uppercase">
                    {{ evaluationData.recommendation.buildingOfficial }}
                  </div>
                  <div class="border-b-2"></div>
                  <div class="text-caption mt-1 uppercase">
                    City Building Official
                  </div>
                </div>
              </div>
            </div>
          </v-window-item>

          <v-window-item value="plans">
            <v-row>
              <v-col cols="12" md="4">
                <div class="text-overline text-grey-darken-1 mb-2">
                  Available Documents
                </div>
                <v-list class="bg-transparent pa-0">
                  <v-list-item
                    v-for="(plan, index) in pdfPlans"
                    :key="index"
                    @click="togglePlan(index)"
                    rounded="lg"
                    :active="selectedPlan === index"
                    active-color="primary"
                    class="mb-2 border bg-white"
                  >
                    <template #prepend
                      ><v-icon
                        :color="selectedPlan === index ? 'primary' : 'grey'"
                        >mdi-file-pdf-box</v-icon
                      ></template
                    >
                    <v-list-item-title class="font-weight-bold text-body-2">{{
                      plan.name
                    }}</v-list-item-title>
                    <v-list-item-subtitle
                      class="text-caption font-weight-bold"
                      >{{ plan.date }}</v-list-item-subtitle
                    >
                    <template #append
                      ><v-chip
                        size="x-small"
                        color="success"
                        variant="tonal"
                        class="ml-2"
                        >Approved</v-chip
                      ></template
                    >
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col cols="12" md="8">
                <v-card
                  v-if="selectedPlan !== null"
                  class="rounded-lg border overflow-hidden"
                  height="600"
                  flat
                >
                  <iframe
                    :src="pdfPlans[selectedPlan].pdfUrl + '#toolbar=0'"
                    width="100%"
                    height="100%"
                    style="border: none"
                  ></iframe>
                </v-card>
              </v-col>
            </v-row>
          </v-window-item>

          <v-window-item value="checklist">
            <v-row>
              <v-col cols="12">
                <div
                  v-for="(section, sIndex) in documentaryData.sections"
                  :key="sIndex"
                  class="mb-8"
                >
                  <div class="d-flex align-center mb-4">
                    <v-avatar color="primary" size="24" class="mr-3">
                      <span class="text-caption text-white">{{
                        sIndex + 1
                      }}</span>
                    </v-avatar>
                    <span class="text-subtitle-1 font-weight-bold uppercase">
                      {{ section.title }}
                    </span>
                    <v-divider class="ml-4"></v-divider>
                  </div>

                  <v-row dense>
                    <v-col
                      cols="12"
                      v-for="(item, iIndex) in section.items"
                      :key="iIndex"
                    >
                      <div class="checklist-item-wrapper">
                        <v-checkbox
                          v-model="item.checked"
                          :color="item.remarks ? 'red' : 'blue-darken-3'"
                          :false-icon="
                            item.remarks ? 'mdi-close-box' : '$checkboxOff'
                          "
                          hide-details
                          density="compact"
                          class="custom-checkbox"
                          @change="clearRemarksIfChecked(item)"
                        >
                          <template #label>
                            <span class="text-body-2 text-grey-darken-3">{{
                              item.text
                            }}</span>
                          </template>
                        </v-checkbox>
                        <v-text-field
                          v-if="!item.checked"
                          v-model="item.remarks"
                          placeholder="Reason for non-compliance..."
                          variant="outlined"
                          density="compact"
                          hide-details
                          class="ml-8 mt-1 mb-2 rounded-lg reason-input"
                          bg-color="white"
                          @input="uncheckIfHasRemarks(item)"
                        ></v-text-field>
                      </div>
                    </v-col>
                  </v-row>
                </div>
                <div class="d-flex justify-end mt-6">
                  <v-btn
                    color="primary"
                    class="text-none font-weight-bold px-8"
                    rounded="lg"
                    @click="saveChecklist"
                  >
                    Save
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const s = {
  profileBtn: {
    backgroundColor: "transparent",
    boxShadow: "none",
    padding: 0,
    minWidth: "unset",
  },
};
const navItems = [
  {
    title: "Building Permit",
    icon: "mdi-office-building-outline",
    hasSubmenu: false,
    active: true,
  },
  {
    title: "Compliance Monitoring",
    icon: "mdi-clipboard-list-outline",
    hasSubmenu: true,
    active: false,
  },
  {
    title: "Occupancy Permit",
    icon: "mdi-key-variant",
    hasSubmenu: false,
    active: false,
  },
];

const route = useRoute();
const router = useRouter();
const activeTab = ref("evaluation");

const applicantDetails = ref({
  applicantName: "Jim Deguzman",
  projectName: "Commercial Building",
  projectLocation: "San Felipe, Deca II Naga City",
});

const propertyDetails = ref({
  propertyType: "Commercial Building",
  buildingUse: "Retail Store",
  floorArea: "230 sq m",
  numberOfFloors: "2 Floors",
  lotArea: "350 sq m",
  propertyAddress: "456 Commercial Avenue, San Felipe, Deca I Naga City",
});

const evaluationData = ref({
  application: {
    controlNo: "2024-BP-001234",
    applicantName: "JUAN DELA CRUZ",
    projectName: "Proposed 2-Storey Residential",
    projectLocation: "Brgy. Concepcion Pequeña, Naga City",
    dateReceived: "January 02, 2026",
  },
  evaluations: [
    {
      title: "Architectural Plans",
      evaluator: "Arch. Roberto Garcia",
      date: "January 02, 2026",
      findings: [
        "Building design complies with NBC",
        "Proper fire exits indicated",
      ],
    },
    {
      title: "Civil/Structural Plans",
      evaluator: "Engr. Maria Santos",
      date: "January 02, 2026",
      findings: [
        "Structural design meets NSCP 2015",
        "Foundation design appropriate",
      ],
    },
    {
      title: "Sanitary/Plumbing Plans",
      evaluator: "Engr. Elena Diaz",
      date: "January 02, 2026",
      findings: [
        "Septic tank dimensions verified",
        "Proper venting system design",
      ],
    },
    {
      title: "Mechanical Plan",
      evaluator: "Engr. Carlos Tan",
      date: "January 02, 2026",
      findings: ["HVAC system design meets standards"],
    },
    {
      title: "Electrical Plans",
      evaluator: "Engr. Pedro Reyes",
      date: "January 02, 2026",
      findings: ["Electrical load calculations verified"],
    },
  ],
  recommendation: {
    status: "approved",
    recommendation: "FOR APPROVAL",
    buildingOfficial: "Engr. Vicente Alvarez",
    date: "January 07, 2026",
  },
});

const documentaryData = ref({
  sections: [
    {
      title: "TECHNICAL DOCUMENTS",
      items: [
        {
          text: "4 copies - Notarized Application Form",
          checked: false,
          remarks: "",
        },
        {
          text: "4 copies - Ancillary Permit Forms",
          checked: false,
          remarks: "",
        },
        { text: "4 sets - Design Plans", checked: false, remarks: "" },
      ],
    },
    {
      title: "LOT DOCUMENTS",
      items: [
        {
          text: "2 copies - Certificate of Title",
          checked: false,
          remarks: "",
        },
        { text: "2 copies - Tax Declaration", checked: false, remarks: "" },
      ],
    },
    {
      title: "CLEARANCES",
      items: [
        { text: "Construction Safety (DOLE)", checked: false, remarks: "" },
        { text: "Fire Safety (BFP)", checked: false, remarks: "" },
        { text: "Locational Clearance (CPDO)", checked: false, remarks: "" },
        { text: "Barangay Clearance", checked: false, remarks: "" },
      ],
    },
  ],
});

const pdfPlans = [
  {
    name: "Architectural Plans",
    date: "January 02, 2026",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    name: "Civil/Structural Plans",
    date: "January 02, 2026",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    name: "Mechanical Plan",
    date: "January 02, 2026",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    name: "Electrical Plans",
    date: "January 02, 2026",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    name: "Sanitary/Plumbing Plans",
    date: "January 02, 2026",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
];

const selectedPlan = ref<number | null>(0);
const togglePlan = (index: number) => {
  selectedPlan.value = index;
};
const getInitials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase();
const mockEvaluatorProfile = ref({
  name: "Zoe Lumanta",
  title: "Administrative Aide",
  specialty: "Administrative Aide",
});
const printSummary = () => window.print();
const logout = () => console.log("Logout clicked");
const goBack = () => router.back();

const clearRemarksIfChecked = (item: any) => {
  if (item.checked) {
    item.remarks = "";
  }
};

const uncheckIfHasRemarks = (item: any) => {
  if (item.remarks && item.remarks.length > 0) {
    item.checked = false;
  }
};

const saveChecklist = () => {
  console.log("Checklist saved", documentaryData.value);
  alert("Checklist saved successfully!");
};

onMounted(() => {
  if (route.query.applicationData) {
    try {
      const data = JSON.parse(route.query.applicationData as string);
      evaluationData.value.application.controlNo =
        data.controlNo || "2024-BP-001234";
      evaluationData.value.application.applicantName =
        data.applicantName || "Unknown";
    } catch (e) {
      console.error(e);
    }
  }
});
</script>

<style scoped>
:root {
  --text-label: 0.75rem;
  --text-body: 0.875rem;
  --text-h1: 2rem;
  --text-h2: 1.5rem;
  --text-h3: 1.25rem;
}

.page-container {
  max-width: 1460px;
  margin: 0 auto;
}

.font-monospace {
  font-family: "Courier New", Courier, monospace;
}

.uppercase {
  text-transform: uppercase;
}

.checklist-item-wrapper {
  margin-bottom: 2px;
}

.custom-checkbox :deep(.v-selection-control) {
  min-height: 24px !important;
}

.custom-checkbox :deep(.v-label) {
  font-size: 0.75rem !important;
  opacity: 1 !important;
  padding-inline-start: 8px !important;
}

.reason-input :deep(.v-field__input) {
  font-size: 0.75rem !important;
  min-height: 28px !important;
  padding: 4px 8px !important;
}

.print-only {
  display: none;
}

@media print {
  .no-print {
    display: none !important;
  }

  .v-main {
    padding: 0 !important;
    background: white !important;
    overflow: visible !important;
  }

  .page-container {
    max-width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .print-only {
    display: block !important;
  }

  .print-flat {
    border: none !important;
    box-shadow: none !important;
  }

  .print-pa-0 {
    padding: 0 !important;
  }

  .print-col-12 {
    flex: 0 0 100% !important;
    max-width: 100% !important;
  }

  .print-label {
    width: 150px;
    display: inline-block;
    color: black !important;
    font-size: 0.75rem;
  }

  .print-title-sm {
    border-bottom: 2px solid black;
    color: black !important;
    font-size: 0.875rem;
    margin-bottom: 5px !important;
  }

  .print-bg-white {
    background: white !important;
  }

  .print-text-black {
    color: black !important;
  }

  .text-body-2 {
    font-size: 0.875rem !important;
    line-height: 1 !important;
    color: black !important;
  }

  .text-caption {
    font-size: 0.75rem !important;
    line-height: 1 !important;
  }

  .print-no-border {
    border: none !important;
  }

  .print-mt-4 {
    margin-top: 1rem !important;
  }

  .print-signature-block {
    page-break-inside: avoid;
  }
}
</style>