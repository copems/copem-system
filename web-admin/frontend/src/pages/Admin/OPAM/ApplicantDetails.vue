<template>
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

          <div class="text-subtitle-1 font-weight-bold text-blue-darken-3 mb-4">
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
</template>

<script setup lang="ts">
interface PermitInfo {
  bpNo: string;
  bpIssuedOn: string;
  opNo: string;
  opIssuedOn: string;
  applicationType: string;
}

interface ApplicantDetails {
  applicantName: string;
  address: string;
  projectName: string;
  location: string;
  tctNo: string;
  enterpriseName: string;
  formOfOwnership: string;
  tdNo: string;
}

interface ProjectDetails {
  occupancyUse: string;
  totalFloorArea: string;
  noOfUnits: string;
  startOfConstruction: string;
  scopeOfWork: string;
  noOfStoreys: string;
  completionDate: string;
}

interface ActualCost {
  materials: string;
  equipment: string;
  directLabor: string;
  totalCost: string;
  otherCost: string;
}

interface SupervisingProf {
  name: string;
  prcNo: string;
  prcValidity: string;
  ptrNo: string;
  ptrValidity: string;
}

defineProps<{
  permitInfo: PermitInfo;
  applicantDetails: ApplicantDetails;
  projectDetails: ProjectDetails;
  actualCost: ActualCost;
  supervisingProf: SupervisingProf;
}>();
</script>

<style scoped>
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
</style>
