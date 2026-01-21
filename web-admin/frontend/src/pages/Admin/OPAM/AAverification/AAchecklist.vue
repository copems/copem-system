<template>
  <div class="page-container px-3 pb-8 mt-6">
    <div class="mb-4 px-2">
      <v-btn color="blue-darken-2" variant="text" class="mb-2" @click="goBack">
        <v-icon start>mdi-arrow-left</v-icon> Back
      </v-btn>
    </div>

    <div class="d-flex align-center mb-4 px-2">
          <v-icon color="#2563eb" class="mr-3" size="40">mdi-office-building</v-icon>
          <h1 class="gov-header font-weight-bold text-grey-darken-4">
            Occupancy Permit Application
          </h1>
        </div>

        <v-card
          class="rounded-xl border-0 shadow-sm overflow-hidden"
          color="white"
          min-height="800"
        >
          <v-tabs
            v-model="activeTab"
            color="primary"
            bg-color="white"
            class="border-b px-6"
            height="60"
          >
            <v-tab
              value="application"
              class="font-weight-medium text-capitalize"
              style="font-size: 16px"
            >
              <v-icon start icon="mdi-file-document-outline" class="mr-2"></v-icon>
              Applicant Details
            </v-tab>
            <v-tab
              value="checklist"
              class="font-weight-medium text-capitalize"
              style="font-size: 16px"
            >
              <v-icon start icon="mdi-format-list-checks" class="mr-2"></v-icon> Checklist
            </v-tab>
          </v-tabs>

          <div class="pa-6 pa-md-8 bg-white gov-body">
            <v-window v-model="activeTab">
              <v-window-item value="application">
                <v-row>
                  <v-col cols="12">
                    <v-card class="rounded-lg border mb-6" flat>
                      <v-card-title
                        class="bg-blue-lighten-5 text-blue-darken-3 font-weight-bold py-3"
                        style="font-size: 20px"
                      >
                        <v-icon start class="mr-2">mdi-certificate-outline</v-icon>
                        Permit Information
                      </v-card-title>
                      <v-card-text class="pa-6">
                        <v-row>
                          <v-col cols="12" md="4">
                            <div class="mb-4">
                              <div class="label-style">BP No.:</div>
                              <div class="value-style">
                                {{ permitInfo.bpNo || "---" }}
                              </div>
                            </div>
                            <div>
                              <div class="label-style">Issued On:</div>
                              <div class="value-style">
                                {{ permitInfo.bpIssuedOn || "---" }}
                              </div>
                            </div>
                          </v-col>
                          <v-col cols="12" md="4">
                            <div class="mb-4">
                              <div class="label-style">OP No.:</div>
                              <div class="value-style">
                                {{ permitInfo.opNo || "---" }}
                              </div>
                            </div>
                            <div>
                              <div class="label-style">Issued On:</div>
                              <div class="value-style">
                                {{ permitInfo.opIssuedOn || "---" }}
                              </div>
                            </div>
                          </v-col>
                          <v-col cols="12" md="4">
                            <div class="label-style">Type of Application:</div>
                            <div class="value-style text-blue-darken-2">
                              {{ permitInfo.applicationType || "---" }}
                            </div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>

                    <v-card class="rounded-lg border mb-6" flat>
                      <v-card-title
                        class="bg-blue-lighten-5 text-blue-darken-3 font-weight-bold py-3"
                        style="font-size: 20px"
                      >
                        <v-icon start class="mr-2">mdi-account-outline</v-icon>
                        Application Information
                      </v-card-title>
                      <v-card-text class="pa-6">
                        <v-row>
                          <v-col cols="12" md="6">
                            <div class="mb-4">
                              <div class="label-style">Applicant Name:</div>
                              <div class="value-style">
                                {{ applicantDetails.applicantName || "---" }}
                              </div>
                            </div>
                            <div class="mb-4">
                              <div class="label-style">Address:</div>
                              <div class="value-style">
                                {{ applicantDetails.address || "---" }}
                              </div>
                            </div>
                            <div class="mb-4">
                              <div class="label-style">Project Name:</div>
                              <div class="value-style">
                                {{ applicantDetails.projectName || "---" }}
                              </div>
                            </div>
                            <div>
                              <div class="label-style">TCT No.:</div>
                              <div class="value-style">
                                {{ applicantDetails.tctNo || "---" }}
                              </div>
                            </div>
                          </v-col>
                          <v-col cols="12" md="6">
                            <div class="mb-4">
                              <div class="label-style">Enterprise Name:</div>
                              <div class="value-style">
                                {{ applicantDetails.enterpriseName || "---" }}
                              </div>
                            </div>
                            <div class="mb-4">
                              <div class="label-style">Form of Ownership:</div>
                              <div class="value-style">
                                {{ applicantDetails.formOfOwnership || "---" }}
                              </div>
                            </div>
                            <div class="mb-4">
                              <div class="label-style">Location:</div>
                              <div class="value-style">
                                {{ applicantDetails.location || "---" }}
                              </div>
                            </div>
                            <div>
                              <div class="label-style">TD No.:</div>
                              <div class="value-style">
                                {{ applicantDetails.tdNo || "---" }}
                              </div>
                            </div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>

                    <v-card class="rounded-lg border mb-6" flat>
                      <v-card-title
                        class="bg-blue-lighten-5 text-blue-darken-3 font-weight-bold py-3"
                        style="font-size: 20px"
                      >
                        <v-icon start class="mr-2">mdi-home-city-outline</v-icon>
                        Project Details
                      </v-card-title>
                      <v-card-text class="pa-6">
                        <v-row>
                          <v-col cols="12" md="6">
                            <div class="mb-4">
                              <div class="label-style">Use/Character of Occupancy:</div>
                              <div class="value-style">
                                {{ projectDetails.occupancyUse || "---" }}
                              </div>
                            </div>
                            <div class="mb-4">
                              <div class="label-style">Total Floor Area (sqm):</div>
                              <div class="value-style">
                                {{ projectDetails.totalFloorArea || "---" }}
                              </div>
                            </div>
                            <div class="mb-4">
                              <div class="label-style">No. of Units:</div>
                              <div class="value-style">
                                {{ projectDetails.noOfUnits || "---" }}
                              </div>
                            </div>
                            <div>
                              <div class="label-style">Start of Construction:</div>
                              <div class="value-style">
                                {{ projectDetails.startOfConstruction || "---" }}
                              </div>
                            </div>
                          </v-col>
                          <v-col cols="12" md="6">
                            <div class="mb-4">
                              <div class="label-style">Scope of Work:</div>
                              <div class="value-style">
                                {{ projectDetails.scopeOfWork || "---" }}
                              </div>
                            </div>
                            <div class="mb-4">
                              <div class="label-style">No. of Storey/s:</div>
                              <div class="value-style">
                                {{ projectDetails.noOfStoreys || "---" }}
                              </div>
                            </div>
                            <div>
                              <div class="label-style">Completion Date:</div>
                              <div class="value-style">
                                {{ projectDetails.completionDate || "---" }}
                              </div>
                            </div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>

                    <v-card class="rounded-lg border" flat>
                      <v-card-title
                        class="bg-blue-lighten-5 text-blue-darken-3 font-weight-bold py-3"
                        style="font-size: 20px"
                      >
                        <v-icon start class="mr-2">mdi-cash-multiple</v-icon>
                        Summary of Actual Cost
                      </v-card-title>
                      <v-card-text class="pa-6">
                        <v-row class="mb-6">
                          <v-col cols="12" md="6">
                            <div class="mb-4">
                              <div class="label-style">Materials:</div>
                              <div class="value-style">
                                {{ actualCost.materials || "---" }}
                              </div>
                            </div>
                            <div class="mb-4">
                              <div class="label-style">Equipment:</div>
                              <div class="value-style">
                                {{ actualCost.equipment || "---" }}
                              </div>
                            </div>
                            <div>
                              <div class="label-style">Direct Labor:</div>
                              <div class="value-style">
                                {{ actualCost.directLabor || "---" }}
                              </div>
                            </div>
                          </v-col>
                          <v-col cols="12" md="6">
                            <div class="mb-4">
                              <div class="label-style">Total Cost:</div>
                              <div class="value-style">
                                {{ actualCost.totalCost || "---" }}
                              </div>
                            </div>
                            <div>
                              <div class="label-style">Other Cost:</div>
                              <div class="value-style">
                                {{ actualCost.otherCost || "---" }}
                              </div>
                            </div>
                          </v-col>
                        </v-row>

                        <v-divider class="mb-6"></v-divider>

                        <div
                          class="text-subtitle-1 font-weight-bold text-blue-darken-3 mb-4"
                        >
                          <v-icon start class="mr-2">mdi-account-hard-hat</v-icon>
                          Full Time Supervising Professional
                        </div>
                        <v-row>
                          <v-col cols="12" class="mb-4">
                            <div class="label-style">Name:</div>
                            <div class="value-style">
                              {{ supervisingProf.name || "---" }}
                            </div>
                          </v-col>
                          <v-col cols="12" md="6">
                            <div class="mb-4">
                              <div class="label-style">PRC No:</div>
                              <div class="value-style">
                                {{ supervisingProf.prcNo || "---" }}
                              </div>
                            </div>
                            <div>
                              <div class="label-style">Validity:</div>
                              <div class="value-style">
                                {{ supervisingProf.prcValidity || "---" }}
                              </div>
                            </div>
                          </v-col>
                          <v-col cols="12" md="6">
                            <div class="mb-4">
                              <div class="label-style">PTR No:</div>
                              <div class="value-style">
                                {{ supervisingProf.ptrNo || "---" }}
                              </div>
                            </div>
                            <div>
                              <div class="label-style">Validity:</div>
                              <div class="value-style">
                                {{ supervisingProf.ptrValidity || "---" }}
                              </div>
                            </div>
                          </v-col>
                        </v-row>
                      </v-card-text>
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
                          <span class="text-caption text-white">{{ sIndex + 1 }}</span>
                        </v-avatar>
                        <span class="text-subtitle-1 font-weight-bold uppercase">{{
                          section.title
                        }}</span>
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
                              color="blue-darken-3"
                              hide-details
                              density="compact"
                              class="custom-checkbox"
                            >
                              <template #label>
                                <span class="text-body-1 text-grey-darken-3">{{
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
                              class="ml-8 mt-1 mb-2 rounded-lg"
                              bg-color="white"
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
                        >Submit Checklist</v-btn
                      >
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
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const activeTab = ref("application");

// DATA RESET TO BLANK
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

const documentaryData = ref({
  sections: [
    {
      title: "Occupancy Requirements Checklist",
      items: [
        {
          text:
            "Two (2) copies of accomplished Unified Application form for Certificate of Occupancy, duly notarized;",
          checked: false,
          remarks: "",
        },
        {
          text: "Two (2) copies of Certificate of Completion, duly notarized;",
          checked: false,
          remarks: "",
        },
        {
          text:
            "Construction Logbook, signed and sealed by the Owner’s Architect or Civil Engineer who undertook full-time inspection and supervision;",
          checked: false,
          remarks: "",
        },
        {
          text:
            "Two (2) photocopies of the valid licenses of all involved professionals;",
          checked: false,
          remarks: "",
        },
        {
          text:
            "Photograph of the structure with substantial completion showing front, sides, and rear areas;",
          checked: false,
          remarks: "",
        },
        {
          text:
            "Two (2) sets of As-Built Plans, if there are changes in the building plans covered by the issued Building Permit;",
          checked: false,
          remarks: "",
        },
        {
          text: "Two (2) copies of Certificate of Final Electrical Inspection;",
          checked: false,
          remarks: "",
        },
        {
          text:
            "Two (2) copies of Fire Safety Inspection Certificate from the Bureau of Fire and Protection;",
          checked: false,
          remarks: "",
        },
        {
          text: "Sketch map indicating the location of the project;",
          checked: false,
          remarks: "",
        },
        {
          text: "Others:",
          checked: false,
          remarks: "",
        },
      ],
    },
  ],
});

const goBack = () => router.back();
const saveChecklist = () => alert("Checklist saved!");
</script>

<style scoped>
/* Typography & Container Updates */
.gov-header {
  font-size: 36px !important;
  font-family: Arial, Helvetica, sans-serif !important;
}

.gov-body {
  font-size: 16px !important;
  line-height: 1.7 !important;
  font-family: Arial, Helvetica, sans-serif !important;
}

.page-container {
  max-width: 1460px;
  margin: 0 auto;
}

.label-style {
  font-size: 12px;
  text-transform: uppercase;
  color: #757575; /* grey-darken-1 */
  margin-bottom: 4px;
}

.value-style {
  font-size: 16px;
  font-weight: 700;
  color: #212121;
}

.custom-checkbox :deep(.v-label) {
  opacity: 1;
  font-size: 16px !important;
}
</style>
