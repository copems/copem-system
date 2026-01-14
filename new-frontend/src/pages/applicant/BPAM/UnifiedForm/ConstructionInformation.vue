<template>
  <v-container fluid class="pa-0 content-area fill-height">
    <v-row no-gutters class="fill-height">
      <Navigation
        :sidebar-step="sidebarStep"
        :sidebar-steps="sidebarSteps"
        @go-to-step="goToStep"
        @logout="handleLogout"
      />

      <v-col cols="12" md="9" class="main-content-bg d-flex flex-column pa-0">
        <div class="stepper-fixed-container pa-6 pb-2">
          <v-container fluid class="px-4 mx-auto" style="max-width: 1300px">
            <v-stepper v-model="formStepValue" alt-labels flat class="mb-0 mt-2 stepper-elevated">
              <v-stepper-header>
                <v-stepper-item
                  v-for="n in 4"
                  :key="`step-${n}`"
                  :title="getStepTitle(n)"
                  :value="n.toString()"
                  :complete="parseInt(formStepValue) > n"
                  :color="parseInt(formStepValue) >= n ? 'blue-darken-1' : 'grey-lighten-2'"
                  class="stepper-item-custom"
                >
                  <template v-if="n < 4" #divider>
                    <v-divider
                      :thickness="3"
                      :style="{
                        'border-color': parseInt(formStepValue) > n ? '#1976D2' : '#e0e0e0',
                      }"
                      class="mx-2"
                    ></v-divider>
                  </template>
                </v-stepper-item>
              </v-stepper-header>
            </v-stepper>
          </v-container>
        </div>

        <div class="scrollable-content pa-6 pt-0">
          <v-container fluid class="px-4 mx-auto" style="max-width: 1300px">
            <v-card class="my-2 pa-4 card-shadow">
              <v-alert
                v-if="successMessage"
                type="success"
                closable
                @click:close="successMessage = ''"
                class="mb-4"
              >
                {{ successMessage }}
              </v-alert>
              <v-alert
                v-if="errorMessage"
                type="error"
                closable
                @click:close="errorMessage = ''"
                class="mb-4"
              >
                {{ errorMessage }}
              </v-alert>

              <v-card-text>
                <v-form ref="form" v-model="formValid">
                  <div v-if="formStepValue === '2'">
                    <v-card class="mb-4 card-section">
                      <v-card-title class="text-h6 card-title-responsive section-title">
                        <v-icon left color="blue-darken-3" class="mr-2">mdi-domain</v-icon>
                        FOR CONSTRUCTION OWNED BY AN ENTERPRISE
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-row dense class="d-flex align-center">
                          <v-col cols="12" md="6">
                            <v-checkbox
                              v-model="is_enterprise"
                              label="Owned by an Enterprise"
                              hide-details
                              color="blue-darken-3"
                              density="comfortable"
                            ></v-checkbox>
                          </v-col>
                          <v-col cols="12" md="6">
                            <v-text-field
                              v-model="form_of_ownership"
                              label="Form of Ownership"
                              variant="outlined"
                              density="comfortable"
                              :disabled="!is_enterprise"
                              :rules="[is_enterprise ? rules.required : true]"
                              color="blue-darken-3"
                              prepend-inner-icon="mdi-account-group-outline"
                              hide-details="auto"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>

                    <v-card class="mb-4 card-section">
                      <v-card-title class="text-h6 section-title">
                        <v-icon left color="blue-darken-3" class="mr-2">mdi-map-marker</v-icon>
                        PROJECT LOCATION
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-row dense>
                          <v-col cols="12" sm="4">
                            <div class="input-label">Barangay</div>
                            <v-select
                              v-model="barangay"
                              :items="barangays"
                              item-title="brgy_name"
                              item-value="brgy_id"
                              variant="outlined"
                              density="comfortable"
                              :rules="[rules.required]"
                              prepend-inner-icon="mdi-home-group"
                              color="blue-darken-3"
                              :loading="loadingBarangays"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="input-label">BLK. No.</div>
                            <v-text-field
                              v-model="blkNo"
                              variant="outlined"
                              density="comfortable"
                              :rules="[rules.required]"
                              prepend-inner-icon="mdi-numeric"
                              color="blue-darken-3"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="input-label">Street</div>
                            <v-text-field
                              v-model="street"
                              variant="outlined"
                              density="comfortable"
                              :rules="[rules.required]"
                              prepend-inner-icon="mdi-road-variant"
                              color="blue-darken-3"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>

                    <v-card class="mb-4 card-section">
                      <v-card-title class="text-h6 section-title">
                        <v-icon left color="blue-darken-3" class="mr-2"
                          >mdi-file-document-outline</v-icon
                        >
                        LOT INFORMATION
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-row dense>
                          <v-col cols="12" sm="6">
                            <div class="input-label">TCT No.</div>
                            <v-text-field
                              v-model="tctNo"
                              variant="outlined"
                              density="comfortable"
                              :rules="[rules.required]"
                              prepend-inner-icon="mdi-numeric"
                              color="blue-darken-3"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <div class="input-label">Current Tax Dec No.</div>
                            <v-text-field
                              v-model="taxDecNo"
                              variant="outlined"
                              density="comfortable"
                              :rules="[rules.required]"
                              prepend-inner-icon="mdi-numeric"
                              color="blue-darken-3"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>

                    <v-card class="mb-4 card-section">
                      <v-card-title class="text-h6 section-title">
                        <v-icon left color="blue-darken-3" class="mr-2">mdi-hammer-wrench</v-icon>
                        SCOPE OF WORK
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-row dense>
                          <v-col cols="12">
                            <div class="input-label">Select Scope of Work</div>
                            <v-select
                              v-model="selectedScope"
                              :items="scopeOfWork"
                              variant="outlined"
                              density="comfortable"
                              multiple
                              :rules="[rules.requiredScope]"
                              chips
                              prepend-inner-icon="mdi-format-list-bulleted"
                              color="blue-darken-3"
                            ></v-select>
                          </v-col>
                          <v-col v-if="selectedScope.includes('Other (Specify)')" cols="12">
                            <v-text-field
                              v-model="otherDetails"
                              label="Please specify"
                              variant="outlined"
                              density="comfortable"
                              :rules="[rules.requiredOther]"
                              color="blue-darken-3"
                              prepend-inner-icon="mdi-pencil"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </div>

                  <div v-if="formStepValue === '3'">
                    <v-card class="mb-4 card-section">
                      <v-card-title class="text-h6 section-title">
                        <v-icon left color="blue-darken-3" class="mr-2">mdi-domain</v-icon>
                        USE OR CHARACTER OF OCCUPANCY
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-row dense>
                          <v-col cols="12" md="6">
                            <v-select
                              v-model="selectedGroup"
                              :items="groups"
                              label="Groups"
                              variant="outlined"
                              prepend-inner-icon="mdi-format-list-bulleted"
                              color="blue-darken-3"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" md="6">
                            <v-select
                              v-model="selectedCategory"
                              :items="categories"
                              label="Category"
                              variant="outlined"
                              :disabled="!selectedGroup"
                              prepend-inner-icon="mdi-shape"
                              color="blue-darken-3"
                            ></v-select>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </div>
                </v-form>
              </v-card-text>
            </v-card>

            <div class="d-flex justify-end mt-6 mb-8">
              <v-btn
                color="blue-grey-lighten-4"
                class="mr-2 btn-rounded"
                elevation="2"
                variant="tonal"
                @click="$router.push('/applicant/applicantinformation')"
              >
                <v-icon left>mdi-arrow-left</v-icon>Back
              </v-btn>
              <v-btn
                v-if="!isSaved"
                color="blue-darken-3"
                class="btn-rounded"
                elevation="2"
                @click="saveForm"
                variant="elevated"
              >
                Save
                <v-icon right>mdi-content-save</v-icon>
              </v-btn>
              <v-btn
                v-else
                color="blue-darken-3"
                class="btn-rounded"
                elevation="2"
                @click="proceedToNext"
                variant="elevated"
              >
                Next
                <v-icon right>mdi-arrow-right</v-icon>
              </v-btn>
            </div>
          </v-container>
        </div>

        <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="3000" location="top right">
          {{ snackbarMessage }}
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/**
 * Building Permit Application System - Step 2
 * Follows ACM citation style for software component documentation.
 */

import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import Navigation from './Navigation.vue'
import Header from '@/components/Header.vue'

export default defineComponent({
  name: 'BuildingPermitStep2',
  components: { Navigation, Header },

  setup() {
    const router = useRouter()
    return { router }
  },

  data() {
    return {
      // Form State
      formStepValue: '2',
      formValid: false,

      // Enterprise Information
      is_enterprise: false,
      form_of_ownership: '',

      // Location Data
      barangay: null,
      blkNo: '',
      street: '',
      cityMunicipality: 'Naga City',

      // Lot Information
      tctNo: '',
      taxDecNo: '',

      // Feedback UI
      errorMessage: '',
      successMessage: '',
      isSaved: false,
      snackbar: false,
      snackbarMessage: '',
      snackbarColor: 'success',

      // Scope of Work Logic
      selectedScope: [],
      otherDetails: '',
      scopeOfWork: [
        'New Construction',
        'Erection',
        'Addition',
        'Alteration',
        'Renovation',
        'Conversion',
        'Repair',
        'Moving',
        'Raising',
        'Accessory Building/Structure',
        'Legalization of Existing Building',
        'Other (Specify)',
      ],

      // Location Reference
      barangays: [],
      loadingBarangays: false,

      // Validation Rules
      rules: {
        required: (value) => !!value || 'This field is required.',
        requiredScope: (value) => value.length > 0 || 'Please select at least one scope of work.',
        requiredOther: (value) => {
          if (this.selectedScope.includes('Other (Specify)')) {
            return !!value || "Please specify details for 'Other'."
          }
          return true
        },
      },

      // Occupancy Groupings
      selectedGroup: null,
      selectedCategory: null,
      groupCategoryData: {
        'GROUP A: RESIDENTIAL (DWELLINGS)': ['SINGLE', 'DUPLEX', 'RESIDENTIAL R-1, R-2', 'OTHERS'],
        'GROUP B: RESIDENTIAL': ['HOTEL', 'MOTEL', 'TOWNHOUSE', 'DORMITORY', 'OTHERS'],
        'GROUP C: EDUCATIONAL & RECREATIONAL': [
          'SCHOOL BUILDING',
          'SCHOOL AUDITORIUM, GYMNASIUM',
          'OTHERS',
        ],
        'GROUP E: COMMERCIAL': ['BANK', 'STORE', 'SHOPPING CENTER/MALL', 'OTHERS'],
        'GROUP F: LIGHT INDUSTRIAL': ['FACTORY/PLANT', 'OTHERS'],
        'GROUP G: MEDIUM INDUSTRIAL': ['STORAGE/WAREHOUSE', 'FACTORY', 'OTHERS'],
        'GROUP H: ASSEMBLY': ['THEATER, AUDITORIUM', 'OTHERS'],
        'GROUP I: ASSEMBLY': ['COLISEUM, SPORTS COMPLEX', 'OTHERS'],
        'GROUP J: AGRICULTURAL & ACCESSORIES': ['AGRICULTURAL STRUCTURES', 'ACCESSORIES', 'OTHERS'],
      },

      // Sidebar Progress
      sidebarStep: 0,
      sidebarSteps: [
        'Fill up the Unified Application Form',
        'Upload Building Plans & Lot Plans',
        'Download Filled-up Unified Application Form and Required Ancillary Permits ',
      ],
    }
  },

  computed: {
    groups() {
      return Object.keys(this.groupCategoryData)
    },
    categories() {
      return this.selectedGroup ? this.groupCategoryData[this.selectedGroup] : []
    },
  },

  watch: {
    selectedGroup() {
      this.selectedCategory = null
    },
    is_enterprise(newVal) {
      if (!newVal) this.form_of_ownership = ''
    },
  },

  mounted() {
    this.fetchBarangays()
  },

  methods: {
    async fetchBarangays() {
      this.loadingBarangays = true
      try {
        // Assuming Naga City has a specific citymun_id, adjust as needed
        // You may need to get this from the previous form or configuration
        const nagaCityId = 1 // Replace with actual citymun_id for Naga City

        const response = await fetch(`http://localhost:3000/api/barangay/city-mun/${nagaCityId}`)
        const result = await response.json()

        if (result.success) {
          this.barangays = result.data
        } else {
          this.snackbarMessage = 'Failed to load barangays'
          this.snackbarColor = 'error'
          this.snackbar = true
        }
      } catch (error) {
        console.error('Error fetching barangays:', error)
        this.snackbarMessage = 'Failed to load barangays'
        this.snackbarColor = 'error'
        this.snackbar = true
      } finally {
        this.loadingBarangays = false
      }
    },

    getSelectedBrgyCode() {
      const selectedBarangay = this.barangays.find((brgy) => brgy.brgy_id === this.barangay)
      return selectedBarangay ? selectedBarangay.brgy_code : null
    },

    async saveConstructionSite() {
      try {
        const applicantId = localStorage.getItem('applicant_id')
        if (!applicantId) {
          throw new Error('Applicant ID not found. Please complete Step 1 first.')
        }

        const brgyCode = this.getSelectedBrgyCode()
        if (!brgyCode) {
          throw new Error('Invalid barangay selection')
        }

        const constructionSiteData = {
          applicant_id: parseInt(applicantId),
          lot_no: this.tctNo, // Using TCT No as lot number
          block_no: this.blkNo,
          tct_no: this.tctNo,
          street: this.street,
          brgy_code: brgyCode,
          applicant_owned: !this.is_enterprise, // If not enterprise, owned by applicant
        }

        const response = await fetch('http://localhost:3000/api/bpa-construction-site', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(constructionSiteData),
        })

        const result = await response.json()

        if (!result.success) {
          throw new Error(result.message || 'Failed to save construction site information')
        }

        // Store construction site ID for later use
        localStorage.setItem('bpac_site_id', result.data.bpac_site_id)

        return result.data.bpac_site_id
      } catch (error) {
        console.error('Error saving construction site:', error)
        throw error
      }
    },

    async saveConstructionInformation() {
      try {
        const { valid } = await this.$refs.form.validate()
        if (!valid) {
          this.snackbarMessage = 'Please fill in all required fields'
          this.snackbarColor = 'warning'
          this.snackbar = true
          return false
        }

        // Save construction site first
        const siteId = await this.saveConstructionSite()

        // Store additional construction information in localStorage for next steps
        const constructionData = {
          bpac_site_id: siteId,
          is_enterprise: this.is_enterprise,
          form_of_ownership: this.form_of_ownership,
          scope_of_work: this.selectedScope,
          scope_other_details: this.selectedScope.includes('Other (Specify)')
            ? this.otherDetails
            : null,
          tax_declaration_no: this.taxDecNo,
        }

        localStorage.setItem('construction_info', JSON.stringify(constructionData))

        this.successMessage = 'Construction information saved successfully!'
        this.snackbarMessage = 'Construction information saved successfully!'
        this.snackbarColor = 'success'
        this.snackbar = true
        this.isSaved = true

        return true
      } catch (error) {
        console.error('Error saving construction information:', error)
        this.errorMessage = error.message || 'Failed to save construction information'
        this.snackbarMessage = error.message || 'Failed to save construction information'
        this.snackbarColor = 'error'
        this.snackbar = true
        return false
      }
    },

    getStepTitle(n) {
      const titles = [
        'Applicant Information',
        'Construction Information',
        'Use or Character of Occupancy',
        'Signatories Details',
      ]
      return titles[n - 1]
    },

    async saveForm() {
      await this.saveConstructionInformation()
    },

    proceedToNext() {
      this.$router.push('/applicant/occupancycharacter')
    },

    async nextStep() {
      const saved = await this.saveConstructionInformation()
      if (saved) {
        // Delay navigation slightly to show success message
        setTimeout(() => {
          const nextStep = parseInt(this.formStepValue) + 1
          if (nextStep === 3) this.$router.push('/applicant/occupancycharacter')
        }, 1000)
      }
    },

    handleLogout() {
      this.$router.push('/login')
    },

    goToStep(index) {
      if (index === 0) this.$router.push('/applicant/applicantdetails')
    },
  },
})
</script>

<style scoped>
/* Scoped Layout Styles */
.no-scroll {
  overflow: hidden !important;
  padding-top: 88px;
}

.v-main.no-scroll {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f6fafd;
}

.main-content-bg {
  background: #fafdff;
  height: 100%;
  overflow: hidden;
}

.stepper-fixed-container {
  flex: 0 0 auto;
  z-index: 50;
  background: #fafdff;
}

.scrollable-content {
  flex: 1 1 auto;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
}

.scrollable-content::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}

/* UI Component Refinement */
.stepper-elevated {
  background: white;
  border-radius: 14px;
  box-shadow: 0 2px 6px 0 rgba(25, 118, 210, 0.06);
  padding: 15px 0;
}

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
}

.btn-rounded {
  border-radius: 30px !important;
  min-width: 110px;
}

.input-label {
  font-weight: 500;
  color: #455a64;
  margin-bottom: 4px;
  font-size: 0.875rem;
}

/* Responsive Overrides */
@media (max-width: 600px) {
  :deep(.v-stepper-item__title) {
    display: none !important;
  }
}
</style>