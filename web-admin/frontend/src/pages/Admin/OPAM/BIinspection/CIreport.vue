<template>
  <div>
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
        INSPECTION REPORT
      </div>
    </div>

    <div class="page-container px-3 pb-8 mt-6 print-no-mt">
      <div class="no-print mb-4 px-2">
        <v-btn color="blue-darken-2" variant="text" class="mb-2" @click="goBack">
          <v-icon start>mdi-arrow-left</v-icon>
          Back
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
          <v-tab value="report" class="text-body-2 font-weight-medium text-capitalize">
            <v-icon start icon="mdi-clipboard-check-outline" class="mr-2"></v-icon>
            Report Summary
          </v-tab>
          <v-tab value="plans" class="text-body-2 font-weight-medium text-capitalize">
            <v-icon start icon="mdi-file-check-outline" class="mr-2"></v-icon>
            PDF Plans
          </v-tab>
        </v-tabs>

        <div class="pa-6 pa-md-8 bg-white print-pa-0">
          <v-window v-model="activeTab">
            <v-window-item value="application">
              <ApplicantDetails
                :permit-info="permitInfo"
                :applicant-details="applicantDetails"
                :project-details="projectDetails"
                :actual-cost="actualCost"
                :supervising-prof="supervisingProf"
              />
            </v-window-item>

            <v-window-item value="report">
              <ReportSummaryTab
                :inspection-data="inspectionData"
                @print="printSummary"
                @update:comments="inspectionData.comments = $event"
              />
            </v-window-item>

            <v-window-item value="plans">==
              <PdfPlansTab
                :plans="pdfPlans"
                v-model="selectedPlan"
              />
            </v-window-item>
          </v-window>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import ApplicantDetails from "@/pages/Admin/OPAM/ApplicantDetails.vue";
import ReportSummaryTab from "./tabs/ReportSummaryTab.vue";
import PdfPlansTab from "./tabs/PdfPlansTab.vue";

const route = useRoute();
const router = useRouter();
const activeTab = ref("report");
const selectedPlan = ref<number | null>(0);

const permitInfo = ref({
  bpNo: "",
  bpIssuedOn: "",
  opNo: "",
  opIssuedOn: "",
  applicationType: "",
});

const applicantDetails = ref({
  applicantName: "",
  address: "",
  projectName: "",
  location: "",
  tctNo: "",
  enterpriseName: "",
  formOfOwnership: "",
  tdNo: "",
});

const projectDetails = ref({
  occupancyUse: "",
  totalFloorArea: "",
  noOfUnits: "",
  startOfConstruction: "",
  scopeOfWork: "",
  noOfStoreys: "",
  completionDate: "",
});

const actualCost = ref({
  materials: "",
  equipment: "",
  directLabor: "",
  totalCost: "",
  otherCost: "",
});

const supervisingProf = ref({
  name: "",
  prcNo: "",
  prcValidity: "",
  ptrNo: "",
  ptrValidity: "",
});

const inspectionData = ref({
  ownerName: "Juan Dela Cruz",
  ownerAddress: "123 Magsaysay Avenue, Naga City",
  installationLocation: "Brgy. Concepcion Pequeña, Naga City",
  occupancyCharacter: "Residential / 2 Storeys",
  inspectionDate: "January 07, 2026",
  chiefInspector: "Engr. Vicente Alvarez",
  comments: "",
  sections: [
    {
      title: "AS TO ARCHITECTURAL WORKS",
      icon: "mdi-floor-plan",
      inspector: "Arch. Roberto Garcia",
      date: "January 05, 2026",
      items: [
        {
          text: "Site Development Setting",
          checked: true,
          remarks: "Complies with approved site plan",
        },
        {
          text: "Light & Ventilation",
          checked: true,
          remarks: "Adequate natural lighting and ventilation",
        },
        {
          text: "Fire Safety Requirements",
          checked: true,
          remarks: "Fire extinguishers installed at designated areas",
        },
        {
          text: "Accessories Control Location",
          checked: true,
          remarks: "All accessories properly located",
        },
        {
          text: "Occupancy/Use & Functionalities",
          checked: true,
          remarks: "As per approved plans",
        },
        {
          text: "BP 344 Requirements",
          checked: true,
          remarks: "PWD ramp and accessible toilet provided",
        },
        {
          text: "Architectural Deficiencies & Parking Requirements",
          checked: false,
          remarks: "Needs 1 additional parking slot",
        },
        { text: "Others", checked: false, remarks: "No other issues noted" },
      ],
    },
    {
      title: "AS TO CIVIL / STRUCTURAL WORKS",
      icon: "mdi-pillar",
      inspector: "Engr. Maria Santos",
      date: "January 05, 2026",
      items: [
        {
          text: "Application for Building Permit",
          checked: true,
          remarks: "Permit secured and posted on site",
        },
        {
          text: "Excavation & Foundation",
          checked: true,
          remarks: "Foundation depth verified at 1.5m",
        },
        {
          text: "Scaffolding & Sidewalk",
          checked: true,
          remarks: "Safety nets and barriers installed",
        },
        {
          text: "Structural Hazards",
          checked: true,
          remarks: "No structural hazards found",
        },
        {
          text: "Safety Requirements for Construction/Demolition",
          checked: true,
          remarks: "PPE compliance verified",
        },
        {
          text: "Placement of Rebars/Pre-Pouring of Concrete",
          checked: true,
          remarks: "Rebar spacing at 150mm as per plan",
        },
        { text: "Others", checked: false, remarks: "Concrete curing period observed" },
      ],
    },
    {
      title: "AS TO SANITARY/PLUMBING WORKS",
      icon: "mdi-pipe",
      inspector: "Engr. Elena Diaz",
      date: "January 06, 2026",
      items: [
        {
          text: "Drainage & Solid / Wastewater Disposal Installation",
          checked: true,
          remarks: "Connected to main sewer line, septic tank installed",
        },
        {
          text: "Source of Water Supply & Plumbing Installation",
          checked: true,
          remarks: "City water connected, pipes PVC Schedule 40",
        },
        {
          text: "Hazards & Pollution on Building & Premises",
          checked: true,
          remarks: "No environmental violations detected",
        },
        { text: "Others", checked: false, remarks: "Water pressure test passed" },
      ],
    },
    {
      title: "AS TO MECHANICAL WORKS",
      icon: "mdi-cog",
      inspector: "Engr. Carlos Tan",
      date: "January 06, 2026",
      items: [
        {
          text: "Machinery Installations",
          checked: false,
          remarks: "N/A - Residential building, no industrial machinery",
        },
        {
          text: "Pumps, Pressure Vessels & Automatic Sprinkler",
          checked: false,
          remarks: "N/A - Not required for this occupancy type",
        },
        {
          text: "Test / Rides, Elevators/Dumbwaiters, Escalators & Conveyors",
          checked: false,
          remarks: "N/A - 2-storey building, no elevator required",
        },
        {
          text: "Others",
          checked: false,
          remarks: "HVAC not applicable for residential",
        },
      ],
    },
    {
      title: "AS TO ELECTRICAL WORKS",
      icon: "mdi-lightning-bolt",
      inspector: "Engr. Pedro Reyes",
      date: "January 07, 2026",
      items: [
        {
          text: "General Requirements",
          checked: true,
          remarks: "Electrical permit secured, meter installed",
        },
        {
          text: "General Wiring Method",
          checked: true,
          remarks: "PVC conduits and THHN wires used",
        },
        {
          text: "Services, Feeders & Branch Circuits",
          checked: true,
          remarks: "200A main breaker, properly sized circuits",
        },
        {
          text: "Grounding & Bonding",
          checked: true,
          remarks: "Copper ground rod installed, 5 ohms resistance",
        },
        {
          text: "Hazardous Locations",
          checked: true,
          remarks: "No hazardous electrical areas identified",
        },
        {
          text: "Special Occupancies",
          checked: false,
          remarks: "N/A - Standard residential occupancy",
        },
        {
          text: "Swimming Pools & Related Installations",
          checked: false,
          remarks: "N/A - No swimming pool",
        },
        {
          text: "Emergency & Standby Systems & Fire Pumps",
          checked: false,
          remarks: "N/A - Not required for residential",
        },
        {
          text: "Others",
          checked: false,
          remarks: "Load schedule verified and approved",
        },
      ],
    },
    {
      title: "AS TO OTHER WORKS (Electronics or Interior Installations)",
      icon: "mdi-television",
      inspector: "Engr. Pedro Reyes",
      date: "January 07, 2026",
      items: [
        {
          text: "Electronic Systems Installation",
          checked: true,
          remarks: "CCTV system with 8 cameras installed",
        },
        {
          text: "Interior Design Compliance",
          checked: true,
          remarks: "Interior finishes as per approved plans",
        },
        {
          text: "Others",
          checked: false,
          remarks: "Network cabling for data and telephone installed",
        },
      ],
    },
  ],
});

const pdfPlans = [
  {
    name: "Architectural Plans",
    date: "January 02, 2026",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    name: "Civil/Structural Plans",
    date: "January 02, 2026",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    name: "Mechanical Plan",
    date: "January 02, 2026",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    name: "Electrical Plans",
    date: "January 02, 2026",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    name: "Sanitary/Plumbing Plans",
    date: "January 02, 2026",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
];

const printSummary = () => window.print();
const goBack = () => router.back();

onMounted(() => {
  if (route.query.applicationData) {
    try {
      const data = JSON.parse(route.query.applicationData as string);
      if (data.applicantName) {
        applicantDetails.value.applicantName = data.applicantName;
      }
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

.label-style {
  font-size: 12px;
  text-transform: uppercase;
  color: #757575;
  margin-bottom: 4px;
}

.value-style {
  font-size: 16px;
  font-weight: 700;
  color: #212121;
}

.font-monospace {
  font-family: "Courier New", Courier, monospace;
}

.uppercase {
  text-transform: uppercase;
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
