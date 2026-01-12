<template>
  <v-app>
    <Header />
    <v-main class="no-scroll">
      <v-container fluid class="pa-0 content-area fill-height">
        <v-row no-gutters class="fill-height">
          <Navigation
            :sidebar-step="sidebarStep"
            :sidebar-steps="sidebarSteps"
            @go-to-step="goToStep"
            @logout="handleLogout"
          />

          <v-col cols="12" md="9" class="main-content-wrapper d-flex flex-column">
            <div class="stepper-fixed-header pa-6 pb-2">
              <v-container fluid class="px-4 mx-auto" style="max-width: 1300px">
                <v-stepper v-model="formStepValue" alt-labels flat class="stepper-elevated">
                  <v-stepper-header>
                    <v-stepper-item
                      v-for="(step, index) in formSteps"
                      :key="`step-${index}`"
                      :title="step.title"
                      :value="step.value"
                      :complete="formStepValue > step.value"
                      :color="formStepValue >= step.value ? 'blue-darken-1' : 'grey-lighten-2'"
                      class="stepper-item-custom"
                    >
                      <template v-if="index < formSteps.length - 1" #divider>
                        <v-divider
                          :thickness="3"
                          :style="{
                            'border-color': formStepValue > step.value ? '#1976D2' : '#e0e0e0',
                          }"
                          class="mx-2"
                        ></v-divider>
                      </template>
                    </v-stepper-item>
                  </v-stepper-header>
                </v-stepper>
              </v-container>
            </div>

            <div class="scrollable-form-area pa-6 pt-0">
              <v-container fluid class="px-4 mx-auto" style="max-width: 1300px">
                <v-card class="my-2 pa-4 card-shadow">
                  <v-card-title class="text-h6 card-title-responsive mb-2">
                    APPLICATION DETAILS
                  </v-card-title>
                  <v-divider class="mb-4"></v-divider>
                  <v-card-text>
                    <v-form ref="entryForm" @submit.prevent="validateAndProceed">
                      <v-card class="mb-4 card-section">
                        <v-card-title class="text-h6 card-title-responsive section-title">
                          <v-icon left color="blue-darken-3" class="mr-2">mdi-account</v-icon>
                          Full Name
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                          <v-row dense>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="formData.last_name"
                                label="Last Name"
                                variant="outlined"
                                density="comfortable"
                                :rules="[rules.required]"
                                prepend-inner-icon="mdi-account"
                                color="blue-darken-3"
                                hide-details="auto"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="formData.first_name"
                                label="First Name"
                                variant="outlined"
                                density="comfortable"
                                :rules="[rules.required]"
                                color="blue-darken-3"
                                prepend-inner-icon="mdi-account"
                                hide-details="auto"
                                required
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="formData.middle_initial"
                                label="Middle Initial"
                                variant="outlined"
                                density="comfortable"
                                maxlength="2"
                                counter
                                :rules="[rules.required]"
                                color="blue-darken-3"
                                prepend-inner-icon="mdi-alpha-m-box-outline"
                                hide-details="auto"
                                required
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-card>

                      <v-card class="mb-4 card-section">
                        <v-card-title class="text-h6 card-title-responsive section-title">
                          <v-icon left color="blue-darken-3" class="mr-2">mdi-map-marker</v-icon>
                          ADDRESS
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                          <v-row dense>
                            <v-col cols="12" sm="6" md="2">
                              <v-select
                                v-model="formData.province"
                                :items="provinces"
                                item-title="prov_name"
                                item-value="prov_id"
                                label="Province"
                                variant="outlined"
                                density="comfortable"
                                :rules="[rules.required]"
                                color="blue-darken-3"
                                prepend-inner-icon="mdi-map"
                                hide-details="auto"
                                :loading="loadingProvinces"
                                required
                              ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="2">
                              <v-select
                                v-model="formData.city_municipality"
                                :items="cityMunicipalities"
                                item-title="citymun_name"
                                item-value="citymun_id"
                                label="City/Municipality"
                                variant="outlined"
                                density="comfortable"
                                :rules="[rules.required]"
                                color="blue-darken-3"
                                prepend-inner-icon="mdi-home-city"
                                hide-details="auto"
                                :loading="loadingCities"
                                :disabled="!formData.province"
                                required
                              ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="2">
                              <v-select
                                v-model="formData.barangay"
                                :items="barangays"
                                item-title="brgy_name"
                                item-value="brgy_id"
                                label="Barangay"
                                variant="outlined"
                                density="comfortable"
                                :rules="[rules.required]"
                                color="blue-darken-3"
                                prepend-inner-icon="mdi-home-group"
                                hide-details="auto"
                                :loading="loadingBarangays"
                                :disabled="!formData.city_municipality"
                                required
                              ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="2">
                              <v-text-field
                                v-model="formData.house_no"
                                label="House No."
                                variant="outlined"
                                density="comfortable"
                                :rules="[rules.required]"
                                color="blue-darken-3"
                                prepend-inner-icon="mdi-home-outline"
                                hide-details="auto"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="2">
                              <v-text-field
                                v-model="formData.street"
                                label="Street"
                                variant="outlined"
                                density="comfortable"
                                :rules="[rules.required]"
                                color="blue-darken-3"
                                prepend-inner-icon="mdi-road-variant"
                                hide-details="auto"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="2">
                              <v-text-field
                                v-model="formData.contact_no"
                                label="Contact No."
                                variant="outlined"
                                density="comfortable"
                                :rules="[rules.required]"
                                color="blue-darken-3"
                                prepend-inner-icon="mdi-phone"
                                hide-details="auto"
                                required
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-card>

                      <v-card class="mb-4 card-section">
                        <v-card-title class="text-h6 card-title-responsive section-title">
                          <v-icon left color="blue-darken-3" class="mr-2"
                            >mdi-card-account-details</v-icon
                          >
                          GOVERNMENT ISSUED ID
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                          <v-row dense>
                            <v-col cols="12" sm="6" md="3">
                              <v-text-field
                                v-model="formData.tin"
                                label="TIN"
                                variant="outlined"
                                density="comfortable"
                                :rules="[rules.required]"
                                color="blue-darken-3"
                                prepend-inner-icon="mdi-numeric"
                                hide-details="auto"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                              <v-text-field
                                v-model="formData.govt_issued_id"
                                label="Gov't Issued ID"
                                variant="outlined"
                                density="comfortable"
                                :rules="[rules.required]"
                                color="blue-darken-3"
                                prepend-inner-icon="mdi-card-account-details-outline"
                                hide-details="auto"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                              <v-text-field
                                v-model="formData.date_issued"
                                label="Date Issued"
                                variant="outlined"
                                density="comfortable"
                                type="date"
                                :rules="[rules.required]"
                                color="blue-darken-3"
                                prepend-inner-icon="mdi-calendar"
                                hide-details="auto"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                              <v-text-field
                                v-model="formData.place_issued"
                                label="Place Issued"
                                variant="outlined"
                                density="comfortable"
                                :rules="[rules.required]"
                                color="blue-darken-3"
                                prepend-inner-icon="mdi-map-marker"
                                hide-details="auto"
                                required
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-card>
                    </v-form>
                  </v-card-text>
                </v-card>

                <div class="d-flex justify-end mt-6 mb-8">
                  <v-btn
                    v-if="!isSaved"
                    color="blue-darken-3"
                    class="btn-rounded"
                    elevation="2"
                    @click="saveForm"
                    variant="elevated"
                    :loading="saving"
                    :disabled="saving"
                  >
                    {{ saving ? 'Saving...' : 'Save' }}
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

            <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="3000" top right>
              {{ snackbarMessage }}
              <template v-slot:actions>
                <v-btn color="white" variant="text" @click="snackbar = false">Close</v-btn>
              </template>
            </v-snackbar>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios'
import Navigation from './Navigation.vue'
import Header from './header.vue'

export default defineComponent({
  components: { Navigation, Header },
  name: 'BuildingPermitPage',
  data() {
    return {
      formStepValue: 1,
      formSteps: [
        { title: 'Applicant Information', value: 1 },
        { title: 'Construction Information', value: 2 },
        { title: 'Use or Character of Occupancy', value: 3 },
        { title: 'Signatories Details', value: 4 },
      ],
      sidebarStep: 0,
      sidebarSteps: [
        'Fill up the Unified Application Form',
        'Upload Building Plans & Lot Plans',
        'Download Filled-up Unified Application Form and Required Ancillary Permits ',
      ],

      formData: {
        bldg_owner_id: '',
        last_name: '',
        first_name: '',
        middle_initial: '',
        tin: '',
        is_enterprise: false,
        form_of_ownership: '',
        province: '',
        city_municipality: '',
        barangay: '',
        house_no: '',
        street: '',
        contact_no: '',
        govt_issued_id: '',
        date_issued: '',
        place_issued: '',
      },

      provinces: [],
      cityMunicipalities: [],
      barangays: [],
      loadingProvinces: false,
      loadingCities: false,
      loadingBarangays: false,

      saving: false,
      isSaved: false,
      snackbar: false,
      snackbarMessage: '',
      snackbarColor: 'success',
      rules: {
        required: (value) => !!value || 'This field is required.',
      },
    }
  },
  mounted() {
    this.fetchProvinces()
  },
  methods: {
    async fetchProvinces() {
      this.loadingProvinces = true
      try {
        const response = await axios.get('http://localhost:3000/api/province')
        if (response.data.success) {
          console.log('Provinces fetched:', response.data)
          this.provinces = response.data.data
        }
      } catch (error) {
        console.error('Error fetching provinces:', error)
        this.snackbarMessage = 'Failed to load provinces'
        this.snackbarColor = 'error'
        this.snackbar = true
      } finally {
        this.loadingProvinces = false
      }
    },

    async fetchCityMunicipalities(provinceId) {
      this.loadingCities = true
      this.cityMunicipalities = []
      this.formData.city_municipality = ''
      this.barangays = []
      this.formData.barangay = ''

      try {
        const response = await axios.get(
          `http://localhost:3000/api/city-mun/province/${provinceId}`
        )
        if (response.data.success) {
          this.cityMunicipalities = response.data.data
        }
      } catch (error) {
        console.error('Error fetching cities/municipalities:', error)
        this.snackbarMessage = 'Failed to load cities/municipalities'
        this.snackbarColor = 'error'
        this.snackbar = true
      } finally {
        this.loadingCities = false
      }
    },

    async fetchBarangays(cityMunId) {
      this.loadingBarangays = true
      this.barangays = []
      this.formData.barangay = ''

      try {
        const response = await axios.get(`http://localhost:3000/api/barangay/city-mun/${cityMunId}`)
        if (response.data.success) {
          this.barangays = response.data.data
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
      const selectedBarangay = this.barangays.find(
        (brgy) => brgy.brgy_id === this.formData.barangay
      )
      return selectedBarangay ? selectedBarangay.brgy_code : null
    },

    async saveApplicantInformation() {
      this.saving = true
      try {
        // Get user_id from localStorage or session
        const userId = localStorage.getItem('user_id')
        if (!userId) {
          this.snackbarMessage = 'User session not found. Please login again.'
          this.snackbarColor = 'error'
          this.snackbar = true
          this.saving = false
          return false
        }

        // Get brgy_code from selected barangay
        const brgyCode = this.getSelectedBrgyCode()
        if (!brgyCode) {
          this.snackbarMessage = 'Invalid barangay selection'
          this.snackbarColor = 'error'
          this.snackbar = true
          this.saving = false
          return false
        }

        // Prepare permit applicant data
        const applicantData = {
          user_id: parseInt(userId),
          lastname: this.formData.last_name,
          firstname: this.formData.first_name,
          middlename: this.formData.middle_initial,
          contact_no: this.formData.contact_no,
          tin_no: this.formData.tin,
          brgy_code: brgyCode,
          house_no: this.formData.house_no,
          street: this.formData.street,
        }

        // Save permit applicant
        const applicantResponse = await fetch('http://localhost:3000/api/permit-applicant', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(applicantData),
        })

        const applicantResult = await applicantResponse.json()

        if (!applicantResult.success) {
          throw new Error(applicantResult.message || 'Failed to save applicant information')
        }

        const applicantId = applicantResult.data.applicant_id

        // Save government ID information
        const govIdData = {
          applicant_id: applicantId,
          id_no: this.formData.govt_issued_id,
          date_issued: this.formData.date_issued,
          place_issued: this.formData.place_issued,
        }

        const govIdResponse = await fetch('http://localhost:3000/api/applicant-gov-id', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(govIdData),
        })

        const govIdResult = await govIdResponse.json()

        if (!govIdResult.success) {
          throw new Error(govIdResult.message || 'Failed to save government ID information')
        }

        // Store applicant_id and gov_id for next steps
        localStorage.setItem('applicant_id', applicantId)
        localStorage.setItem('applicant_gov_id', govIdResult.data.agid_id)

        this.snackbarMessage = 'Applicant information saved successfully!'
        this.snackbarColor = 'success'
        this.snackbar = true
        this.isSaved = true

        return true
      } catch (error) {
        console.error('Error saving applicant information:', error)
        this.snackbarMessage = error.message || 'Failed to save applicant information'
        this.snackbarColor = 'error'
        this.snackbar = true
        return false
      } finally {
        this.saving = false
      }
    },

    async saveForm() {
      const { valid } = await this.$refs.entryForm.validate()
      if (valid) {
        await this.saveApplicantInformation()
      } else {
        this.snackbarMessage = 'Please fill in all required fields'
        this.snackbarColor = 'warning'
        this.snackbar = true
      }
    },

    proceedToNext() {
      this.$router.push('/applicant/constructioninformation')
    },

    async validateAndProceed() {
      const { valid } = await this.$refs.entryForm.validate()
      if (valid) {
        const saved = await this.saveApplicantInformation()
        if (saved) {
          // Delay navigation slightly to show success message
          setTimeout(() => {
            this.$router.push('/applicant/constructioninformation')
          }, 1000)
        }
      } else {
        this.snackbarMessage = 'Please fill in all required fields'
        this.snackbarColor = 'warning'
        this.snackbar = true
      }
    },

    handleLogout() {
      this.$router.push('/login')
    },

    goToStep(index) {
      this.sidebarStep = index
    },
  },
  watch: {
    'formData.is_enterprise'(newVal) {
      if (!newVal) this.formData.form_of_ownership = null
    },
    'formData.province'(newVal) {
      if (newVal) {
        this.fetchCityMunicipalities(newVal)
      } else {
        this.cityMunicipalities = []
        this.formData.city_municipality = ''
        this.barangays = []
        this.formData.barangay = ''
      }
    },
    'formData.city_municipality'(newVal) {
      if (newVal) {
        this.fetchBarangays(newVal)
      } else {
        this.barangays = []
        this.formData.barangay = ''
      }
    },
  },
})
</script>

<style scoped>
.no-scroll {
  height: 100vh;
  overflow: hidden !important;
  padding-top: 88px;
}

.main-content-wrapper {
  height: 100vh;
  overflow: hidden;
  background: #fafdff;
}

.stepper-fixed-header {
  flex-shrink: 0;
  background: #fafdff;
  z-index: 50;
}

.scrollable-form-area {
  flex-grow: 1;
  overflow-y: auto;
  scrollbar-width: thin;
}

.scrollable-form-area::-webkit-scrollbar {
  width: 6px;
}
.scrollable-form-area::-webkit-scrollbar-thumb {
  background: #cfd8dc;
  border-radius: 10px;
}

.stepper-elevated {
  background: white;
  border-radius: 14px;
  box-shadow: 0 2px 6px 0 rgba(25, 118, 210, 0.06);
  padding: 10px 0;
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
  font-weight: 600;
}

@media (max-width: 600px) {
  .v-stepper-item :deep(.v-stepper-item__title) {
    display: none;
  }
}
</style>