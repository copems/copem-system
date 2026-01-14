<template>
  <div>
    <v-container fluid class="pa-0 content-area fill-height">
      <v-row no-gutters class="fill-height">
        <Navigation
          :sidebar-step="sidebarStep"
          :sidebar-steps="sidebarSteps"
          @go-to-step="goToSidebarStep"
          @logout="handleLogout"
        />

        <v-col cols="12" md="9" class="main-content-wrapper d-flex flex-column">
          <div class="stepper-fixed-header pa-6 pb-2">
            <v-container fluid class="px-4 mx-auto" style="max-width: 1300px">
              <v-stepper v-model="formStepValue" alt-labels flat class="mb-0 mt-2 stepper-elevated">
                <v-stepper-header>
                  <v-stepper-item
                    title="Applicant Information"
                    value="1"
                    :complete="parseInt(formStepValue) > 1"
                    :color="parseInt(formStepValue) >= 1 ? 'blue-darken-1' : 'grey lighten-2'"
                    class="stepper-item-custom"
                  ></v-stepper-item>
                  <v-divider
                    :thickness="3"
                    :style="{
                      'border-color': parseInt(formStepValue) > 1 ? '#1976D2' : '#e0e0e0',
                    }"
                    class="mx-2"
                  ></v-divider>
                  <v-stepper-item
                    title="Construction Information"
                    value="2"
                    :complete="parseInt(formStepValue) > 2"
                    :color="parseInt(formStepValue) >= 2 ? 'blue-darken-1' : 'grey lighten-2'"
                    class="stepper-item-custom"
                  ></v-stepper-item>
                  <v-divider
                    :thickness="3"
                    :style="{
                      'border-color': parseInt(formStepValue) > 2 ? '#1976D2' : '#e0e0e0',
                    }"
                    class="mx-2"
                  ></v-divider>
                  <v-stepper-item
                    title="Use or Character of Occupancy"
                    value="3"
                    :complete="parseInt(formStepValue) > 3"
                    :color="parseInt(formStepValue) >= 3 ? 'blue-darken-1' : 'grey lighten-2'"
                    class="stepper-item-custom"
                  ></v-stepper-item>
                  <v-divider
                    :thickness="3"
                    :style="{
                      'border-color': parseInt(formStepValue) > 3 ? '#1976D2' : '#e0e0e0',
                    }"
                    class="mx-2"
                  ></v-divider>
                  <v-stepper-item
                    title="Signatories Details"
                    value="4"
                    :complete="parseInt(formStepValue) > 4"
                    :color="parseInt(formStepValue) >= 4 ? 'blue-darken-1' : 'grey lighten-2'"
                    class="stepper-item-custom"
                  ></v-stepper-item>
                </v-stepper-header>
              </v-stepper>
            </v-container>
          </div>

          <div class="scrollable-form-area pa-6 pt-0 pb-12">
            <v-container fluid class="px-4 mx-auto" style="max-width: 1300px">
              <v-card class="my-2 pa-4 card-shadow">
                <v-card-text>
                  <v-form ref="form">
                    <v-card class="mb-4 card-section">
                      <v-card-title class="text-h6 card-title-responsive section-title">
                        <v-icon left color="blue-darken-3" class="mr-2"
                          >mdi-account-hard-hat</v-icon
                        >
                        ENGINEER'S INFORMATION
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-row dense>
                          <v-col cols="12" sm="4">
                            <div class="input-label">First Name</div>
                            <v-text-field
                              v-model="engineerFirstName"
                              variant="outlined"
                              density="comfortable"
                              :rules="[rules.required]"
                              prepend-inner-icon="mdi-account"
                              color="blue-darken-3"
                              persistent-hint
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="input-label">Last Name</div>
                            <v-text-field
                              v-model="engineerLastName"
                              variant="outlined"
                              density="comfortable"
                              :rules="[rules.required]"
                              prepend-inner-icon="mdi-account"
                              color="blue-darken-3"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="input-label">M.I.</div>
                            <v-text-field
                              v-model="engineerMiddleInitial"
                              variant="outlined"
                              density="comfortable"
                              :rules="[rules.required]"
                              prepend-inner-icon="mdi-alpha-m-box-outline"
                              color="blue-darken-3"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>

                    <v-card class="mb-4 card-section">
                      <v-card-title class="text-h6 card-title-responsive section-title">
                        <v-icon left color="blue-darken-3" class="mr-2"
                          >mdi-badge-account-outline</v-icon
                        >
                        PROFESSIONAL'S VALID ID
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-row dense>
                          <v-col cols="12" sm="6">
                            <div class="input-label">PRC No.</div>
                            <v-text-field
                              v-model="prcNo"
                              variant="outlined"
                              density="comfortable"
                              :rules="[rules.required, rules.prcNo]"
                              :maxlength="7"
                              @input="limitPrcNo"
                              prepend-inner-icon="mdi-numeric"
                              color="blue-darken-3"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6">
                            <div class="input-label">Validity</div>
                            <v-menu
                              v-model="validityMenu"
                              :close-on-content-click="false"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                            >
                              <template v-slot:activator="{ props }">
                                <v-text-field
                                  v-model="formattedValidity"
                                  placeholder="dd/mm/yyyy"
                                  variant="outlined"
                                  density="comfortable"
                                  :rules="[rules.required]"
                                  prepend-inner-icon="mdi-calendar"
                                  readonly
                                  v-bind="props"
                                  color="blue-darken-3"
                                ></v-text-field>
                              </template>
                              <div>
                                <v-date-picker
                                  v-model="validity"
                                  @update:model-value="validityMenu = false"
                                  hide-header
                                ></v-date-picker>
                                <v-card-actions>
                                  <v-btn variant="text" color="primary" @click="clearValidity">
                                    Clear
                                  </v-btn>
                                  <v-spacer></v-spacer>
                                  <v-btn variant="text" color="primary" @click="setTodayValidity">
                                    Today
                                  </v-btn>
                                </v-card-actions>
                              </div>
                            </v-menu>
                          </v-col>

                          <v-col cols="12" sm="4">
                            <div class="input-label">PTR No.</div>
                            <v-text-field
                              v-model="ptrNo"
                              variant="outlined"
                              density="comfortable"
                              :rules="[rules.required, rules.ptrNo]"
                              :maxlength="8"
                              @input="limitPtrNo"
                              prepend-inner-icon="mdi-numeric"
                              color="blue-darken-3"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="4">
                            <div class="input-label">Date Issued</div>
                            <v-text-field
                              v-model="dateIssued"
                              type="date"
                              variant="outlined"
                              density="comfortable"
                              prepend-inner-icon="mdi-calendar-check"
                              :rules="[rules.required]"
                              color="blue-darken-3"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="4">
                            <div class="input-label">Issued At</div>
                            <v-text-field
                              v-model="issuedAt"
                              variant="outlined"
                              density="comfortable"
                              :rules="[rules.required]"
                              prepend-inner-icon="mdi-map-marker"
                              color="blue-darken-3"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <div class="input-label">TIN</div>
                            <v-text-field
                              v-model="tin"
                              variant="outlined"
                              density="comfortable"
                              :rules="[rules.required, rules.tin]"
                              :maxlength="15"
                              @input="formatTin"
                              prepend-inner-icon="mdi-card-account-details"
                              color="blue-darken-3"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>

                    <v-card class="mb-4 card-section">
                      <v-card-title class="text-h6 card-title-responsive section-title">
                        <v-icon left color="blue-darken-3" class="mr-2">mdi-home-map-marker</v-icon>
                        ADDRESS
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-row dense>
                          <v-col cols="12" sm="4">
                            <div class="input-label">Province</div>
                            <v-select
                              v-model="province"
                              :items="provinces"
                              variant="outlined"
                              density="comfortable"
                              :rules="[rules.required]"
                              prepend-inner-icon="mdi-map"
                              color="blue-darken-3"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="input-label">Municipality</div>
                            <v-text-field
                              v-model="municipality"
                              variant="outlined"
                              density="comfortable"
                              :rules="[rules.required]"
                              prepend-inner-icon="mdi-home-city"
                              color="blue-darken-3"
                            ></v-text-field>
                          </v-col>
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
                              :loading="loadingBarangays"
                              prepend-inner-icon="mdi-home-group"
                              color="blue-darken-3"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="input-label">Block No.</div>
                            <v-text-field
                              v-model="blkNo"
                              variant="outlined"
                              density="comfortable"
                              :rules="[rules.required]"
                              prepend-inner-icon="mdi-numeric"
                              color="blue-darken-3"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="8">
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

                    <v-card class="card-section">
                      <v-card-title class="text-h6 card-title-responsive section-title">
                        <v-icon left color="blue-darken-3" class="mr-2">mdi-account-check</v-icon>
                        WITH CONSENT LOT OWNER/AUTHORIZED REPRESENTATIVE
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-checkbox
                          v-model="lotOwnerConsent"
                          label="Check if with consent from lot owner"
                          density="comfortable"
                          color="blue-darken-3"
                        ></v-checkbox>
                        <v-expand-transition>
                          <div v-show="lotOwnerConsent">
                            <v-row dense>
                              <v-col cols="12" sm="4">
                                <div class="input-label">Last Name</div>
                                <v-text-field
                                  v-model="lotOwnerLastName"
                                  variant="outlined"
                                  density="comfortable"
                                  :rules="lotOwnerConsent ? [rules.required] : []"
                                  prepend-inner-icon="mdi-account"
                                  color="blue-darken-3"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="4">
                                <div class="input-label">First Name</div>
                                <v-text-field
                                  v-model="lotOwnerFirstName"
                                  variant="outlined"
                                  density="comfortable"
                                  :rules="lotOwnerConsent ? [rules.required] : []"
                                  prepend-inner-icon="mdi-account"
                                  color="blue-darken-3"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="4">
                                <div class="input-label">M.I.</div>
                                <v-text-field
                                  v-model="lotOwnerMiddleInitial"
                                  variant="outlined"
                                  density="comfortable"
                                  :rules="lotOwnerConsent ? [rules.required] : []"
                                  prepend-inner-icon="mdi-alpha-m-box-outline"
                                  color="blue-darken-3"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row dense>
                              <v-col cols="12" sm="4">
                                <div class="input-label">Province</div>
                                <v-select
                                  v-model="lotOwnerProvince"
                                  :items="provinces"
                                  variant="outlined"
                                  density="comfortable"
                                  :rules="lotOwnerConsent ? [rules.required] : []"
                                  prepend-inner-icon="mdi-map"
                                  color="blue-darken-3"
                                ></v-select>
                              </v-col>
                              <v-col cols="12" sm="4">
                                <div class="input-label">City/Municipality</div>
                                <v-text-field
                                  v-model="lotOwnerMunicipality"
                                  variant="outlined"
                                  density="comfortable"
                                  :rules="lotOwnerConsent ? [rules.required] : []"
                                  prepend-inner-icon="mdi-home-city"
                                  color="blue-darken-3"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="4">
                                <div class="input-label">Barangay</div>
                                <v-select
                                  v-model="lotOwnerBarangay"
                                  :items="barangays"
                                  item-title="brgy_name"
                                  item-value="brgy_id"
                                  variant="outlined"
                                  density="comfortable"
                                  :rules="lotOwnerConsent ? [rules.required] : []"
                                  :loading="loadingBarangays"
                                  prepend-inner-icon="mdi-home-group"
                                  color="blue-darken-3"
                                ></v-select>
                              </v-col>
                              <v-col cols="12" sm="4">
                                <div class="input-label">House No.</div>
                                <v-text-field
                                  v-model="lotOwnerHouseNo"
                                  variant="outlined"
                                  density="comfortable"
                                  :rules="lotOwnerConsent ? [rules.required] : []"
                                  prepend-inner-icon="mdi-numeric"
                                  color="blue-darken-3"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="8">
                                <div class="input-label">Street</div>
                                <v-text-field
                                  v-model="lotOwnerStreet"
                                  variant="outlined"
                                  density="comfortable"
                                  :rules="lotOwnerConsent ? [rules.required] : []"
                                  prepend-inner-icon="mdi-road-variant"
                                  color="blue-darken-3"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row dense>
                              <v-col cols="12" sm="4">
                                <div class="input-label">Gov't Issued ID No.</div>
                                <v-text-field
                                  v-model="lotOwnerGovIdNo"
                                  variant="outlined"
                                  density="comfortable"
                                  :rules="lotOwnerConsent ? [rules.required] : []"
                                  prepend-inner-icon="mdi-card-account-details"
                                  color="blue-darken-3"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="4">
                                <div class="input-label">Date Issued</div>
                                <v-text-field
                                  v-model="lotOwnerIdDateIssued"
                                  variant="outlined"
                                  density="comfortable"
                                  type="date"
                                  :rules="lotOwnerConsent ? [rules.required] : []"
                                  prepend-inner-icon="mdi-calendar"
                                  color="blue-darken-3"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="4">
                                <div class="input-label">Place Issued</div>
                                <v-text-field
                                  v-model="lotOwnerIdPlaceIssued"
                                  variant="outlined"
                                  density="comfortable"
                                  :rules="lotOwnerConsent ? [rules.required] : []"
                                  prepend-inner-icon="mdi-map-marker"
                                  color="blue-darken-3"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </div>
                        </v-expand-transition>
                      </v-card-text>
                    </v-card>
                  </v-form>
                </v-card-text>
              </v-card>

              <v-alert
                v-if="showValidationError"
                type="error"
                variant="tonal"
                class="mb-4"
                closable
                @update:model-value="showValidationError = $event"
              >
                <strong>Please fill out all required fields before submitting.</strong>
                <p class="mb-0 text-caption mt-1">Check the highlighted fields above for errors.</p>
              </v-alert>

              <div class="d-flex justify-end mt-6 mb-8">
                <v-btn
                  color="blue-grey-lighten-4"
                  class="mr-2 btn-rounded"
                  elevation="2"
                  to="/applicant/bpcharacter"
                  variant="tonal"
                >
                  <v-icon left>mdi-arrow-left</v-icon>Back
                </v-btn>
                <v-btn
                  v-if="!isSaved"
                  color="blue-darken-3"
                  class="btn-rounded"
                  elevation="2"
                  variant="elevated"
                  @click="saveForm"
                >
                  Save<v-icon right>mdi-content-save</v-icon>
                </v-btn>
                <v-btn
                  v-else
                  color="blue-darken-3"
                  class="btn-rounded"
                  elevation="2"
                  variant="elevated"
                  @click="submitApplication"
                >
                  Submit<v-icon right>mdi-check</v-icon>
                </v-btn>
              </div>
            </v-container>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Application Number Dialog -->
    <v-dialog v-model="showApplicationNumberDialog" max-width="450" style="min-height: 600px">
      <v-card class="pa-6 text-center rounded-xl" elevation="10" style="min-height: 600px">
        <div class="d-flex justify-center mb-4">
          <v-icon color="green-lighten-1" size="80"> mdi-check-circle-outline </v-icon>
        </div>

        <v-card-title class="text-h5 font-weight-bold text-wrap mb-4">
          Application Submitted Successfully
        </v-card-title>

        <v-card-text class="text-subtitle-1 text-grey-darken-1 mb-6">
          Your building permit application has been submitted. Here is your application reference
          number:
        </v-card-text>

        <v-card class="pa-6 mb-6 application-number-card" outlined>
          <div class="text-h4 font-weight-bold" style="color: #0000cc; letter-spacing: 2px">
            {{ generatedApplicationNumber }}
          </div>
          <div class="text-caption text-grey-darken-2 mt-2">Application Reference Number</div>
        </v-card>

        <v-card-text class="text-body-2 text-grey mb-6">
          Please save this number for your records. You will use it to track your application
          status.
        </v-card-text>

        <v-card-actions class="justify-center pt-4">
          <v-btn
            color="#0000CC"
            class="text-none rounded-pill px-8"
            @click="closeApplicationDialog"
            elevation="2"
            variant="elevated"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import Navigation from './Navigation.vue'
import Header from '../../../components/header.vue'

export default defineComponent({
  name: 'BuildingPermitStep4',
  components: { Navigation, Header },
  setup() {
    const router = useRouter()
    return { router }
  },
  data() {
    return {
      formStepValue: '4',
      engineerFirstName: '',
      engineerLastName: '',
      engineerMiddleInitial: '',

      prcNo: '',
      validity: null,
      validityMenu: false,
      ptrNo: '',
      dateIssued: null,
      issuedAt: '',
      tin: '',

      applicantFirstName: '',
      applicantLastName: '',
      applicantMiddleInitial: '',
      applicantProvince: null,
      applicantMunicipality: '',
      applicantBarangay: null,
      applicantHouseNo: '',
      applicantStreet: '',
      applicantGovIdNo: '',
      applicantIdDateIssued: '',
      applicantIdPlaceIssued: '',

      lotOwnerConsent: false,
      lotOwnerFirstName: '',
      lotOwnerLastName: '',
      lotOwnerMiddleInitial: '',
      lotOwnerProvince: null,
      lotOwnerMunicipality: '',
      lotOwnerBarangay: null,
      lotOwnerHouseNo: '',
      lotOwnerStreet: '',
      lotOwnerGovIdNo: '',
      lotOwnerIdDateIssued: '',
      lotOwnerIdPlaceIssued: '',

      province: null,
      municipality: '',
      barangay: null,
      blkNo: '',
      street: '',

      provinces: [
        'Albay',
        'Camarines Norte',
        'Camarines Sur',
        'Catanduanes',
        'Masbate',
        'Sorsogon',
      ],
      barangays: [],
      loadingBarangays: false,
      rules: {
        required: (value) => !!value || 'This field is required.',
        prcNo: (value) => (value && /^\d{6,7}$/.test(value)) || 'PRC No. should be 6-7 digits.',
        ptrNo: (value) => (value && /^\d{6,8}$/.test(value)) || 'PTR No. should be 6-8 digits.',
        tin: (value) =>
          (value && /^\d{3}-\d{3}-\d{3}-\d{3}$/.test(value)) ||
          'TIN should be in XXX-XXX-XXX-XXX format.',
      },

      sidebarStep: 3,
      sidebarSteps: [
        'Fill up the Unified Application Form',
        'Upload Building Plans & Lot Plans',
        'Download Filled-up Unified Application Form and Required Ancillary Permits ',
      ],
      showApplicationNumberDialog: false,
      generatedApplicationNumber: '',
      showValidationError: false,
      isSaved: false,
      dataComponents: [],
    }
  },

  mounted() {
    this.fetchBarangays()
  },

  computed: {
    formattedValidity() {
      return this.formatDate(this.validity)
    },
  },

  methods: {
    async fetchBarangays() {
      this.loadingBarangays = true
      try {
        const response = await fetch('http://localhost:3000/api/barangay')
        if (response.ok) {
          const data = await response.json()
          this.barangays = data
        }
      } catch (error) {
        console.error('Error fetching barangays:', error)
      } finally {
        this.loadingBarangays = false
      }
    },
    getSelectedBrgyCode(barangayId) {
      const barangay = this.barangays.find((b) => b.brgy_id === barangayId)
      return barangay ? barangay.brgy_code : null
    },
    limitPrcNo(event) {
      let value = (event.target ? event.target.value : event).replace(/\D/g, '')
      if (value.length > 7) {
        value = value.slice(0, 7)
      }
      this.prcNo = value
    },
    limitPtrNo(event) {
      let value = (event.target ? event.target.value : event).replace(/\D/g, '')
      if (value.length > 8) {
        value = value.slice(0, 8)
      }
      this.ptrNo = value
    },
    formatTin(event) {
      let value = (event.target ? event.target.value : event).replace(/\D/g, '')
      let formattedValue = ''
      if (value.length > 0) {
        formattedValue = value.slice(0, 3)
      }
      if (value.length > 3) {
        formattedValue += '-' + value.slice(3, 6)
      }
      if (value.length > 6) {
        formattedValue += '-' + value.slice(6, 9)
      }
      if (value.length > 9) {
        formattedValue += '-' + value.slice(9, 12)
      }
      this.tin = formattedValue
    },

    formatDate(date) {
      if (!date) return null
      const d = new Date(date)
      if (isNaN(d.getTime())) return null

      const day = d.getDate().toString().padStart(2, '0')
      const month = (d.getMonth() + 1).toString().padStart(2, '0')
      const year = d.getFullYear()
      return `${day}/${month}/${year}`
    },
    clearValidity() {
      this.validity = null
      this.validityMenu = false
    },
    setTodayValidity() {
      this.validity = new Date()
      this.validityMenu = false
    },

    handleLogout() {
      console.log('User logged out')
      this.router.push('/login')
    },
    goToSidebarStep(index) {
      this.sidebarStep = index
      if (index === 0) {
        console.log('Navigating to step 1 (Applicant Details)...')
        this.router.push('/applicant/applicantdetails')
      }
    },
    async saveSupervisor() {
      try {
        const brgyCode = this.getSelectedBrgyCode(this.barangay)
        if (!brgyCode) {
          alert('Please select a valid barangay.')
          return null
        }

        const supervisorData = {
          first_name: this.engineerFirstName,
          last_name: this.engineerLastName,
          middle_initial: this.engineerMiddleInitial,
          brgy_code: brgyCode,
          block_no: this.blkNo,
          street: this.street,
          prc_no: this.prcNo,
          validity: this.validity,
          ptr_no: this.ptrNo,
          date_issued: this.dateIssued,
          issued_at: this.issuedAt,
          tin: this.tin,
        }

        const response = await fetch('http://localhost:3000/api/bpac-supervisors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(supervisorData),
        })

        if (response.ok) {
          const data = await response.json()
          return data.bpacs_id
        } else {
          const error = await response.json()
          alert(`Error saving supervisor: ${error.message}`)
          return null
        }
      } catch (error) {
        console.error('Error saving supervisor:', error)
        alert('An error occurred while saving supervisor data.')
        return null
      }
    },
    async saveLotOwner() {
      if (!this.lotOwnerConsent) {
        return null
      }

      try {
        const bpacSiteId = localStorage.getItem('bpac_site_id')
        if (!bpacSiteId) {
          alert('Construction site ID not found.')
          return null
        }

        const brgyCode = this.getSelectedBrgyCode(this.lotOwnerBarangay)
        if (!brgyCode) {
          alert('Please select a valid barangay for lot owner.')
          return null
        }

        const lotOwnerData = {
          bpac_site_id: bpacSiteId,
          first_name: this.lotOwnerFirstName,
          last_name: this.lotOwnerLastName,
          middle_initial: this.lotOwnerMiddleInitial,
          brgy_code: brgyCode,
          house_no: this.lotOwnerHouseNo,
          street: this.lotOwnerStreet,
        }

        const response = await fetch('http://localhost:3000/api/bpa-cs-lot-owner', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(lotOwnerData),
        })

        if (response.ok) {
          const data = await response.json()
          // Save lot owner gov ID if provided
          if (this.lotOwnerGovIdNo) {
            await this.saveLotOwnerGovId(data.bpac_lot_owner_id)
          }
          return data.bpac_lot_owner_id
        } else {
          const error = await response.json()
          alert(`Error saving lot owner: ${error.message}`)
          return null
        }
      } catch (error) {
        console.error('Error saving lot owner:', error)
        alert('An error occurred while saving lot owner data.')
        return null
      }
    },
    async saveLotOwnerGovId(lotOwnerId) {
      try {
        const govIdData = {
          bpac_lot_owner_id: lotOwnerId,
          gov_id_no: this.lotOwnerGovIdNo,
          date_issued: this.lotOwnerIdDateIssued,
          place_issued: this.lotOwnerIdPlaceIssued,
        }

        const response = await fetch('http://localhost:3000/api/lot-owner-gov-id', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(govIdData),
        })

        if (!response.ok) {
          const error = await response.json()
          console.error('Error saving lot owner gov ID:', error)
        }
      } catch (error) {
        console.error('Error saving lot owner gov ID:', error)
      }
    },
    async saveBpaConstructionApplication(supervisorId, applicationNumber) {
      try {
        const bpacId = localStorage.getItem('bpac_id')
        if (!bpacId) {
          alert('Construction data ID not found.')
          return false
        }

        const applicationData = {
          bpac_id: bpacId,
          bpacs_id: supervisorId,
          application_no: applicationNumber,
          bpa_status_id: 1, // Assuming 1 is for "Submitted" or "Pending"
        }

        const response = await fetch('http://localhost:3000/api/bpa-construction-application', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(applicationData),
        })

        if (response.ok) {
          return true
        } else {
          const error = await response.json()
          alert(`Error saving application: ${error.message}`)
          return false
        }
      } catch (error) {
        console.error('Error saving BPA construction application:', error)
        alert('An error occurred while submitting application.')
        return false
      }
    },
    async saveForm() {
      // Validate form before saving
      const { valid } = await this.$refs.form.validate()
      if (!valid) {
        this.showValidationError = true
        return
      }

      this.showValidationError = false

      // Save supervisor data
      const supervisorId = await this.saveSupervisor()
      if (!supervisorId) {
        return
      }

      // Save lot owner data if consent is given
      if (this.lotOwnerConsent) {
        const lotOwnerId = await this.saveLotOwner()
        if (!lotOwnerId) {
          return
        }
      }

      // Mark as saved
      this.isSaved = true
      alert('Signatory information saved successfully!')
    },

    async submitApplication() {
      // Validate form before submission
      const { valid } = await this.$refs.form.validate()
      if (!valid) {
        this.showValidationError = true
        return // Prevent submission if form is invalid
      }

      this.showValidationError = false

      // Generate application number (BP-YYYY-XXXXXX format)
      const year = new Date().getFullYear()
      const randomNum = Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, '0') // 6-digit number
      this.generatedApplicationNumber = `BP-${year}-${randomNum}`

      // Save supervisor data
      const supervisorId = await this.saveSupervisor()
      if (!supervisorId) {
        return
      }

      // Save lot owner data if consent is given
      if (this.lotOwnerConsent) {
        const lotOwnerId = await this.saveLotOwner()
        if (!lotOwnerId) {
          return
        }
      }

      // Save the final BPA construction application with application number
      const saved = await this.saveBpaConstructionApplication(
        supervisorId,
        this.generatedApplicationNumber
      )
      if (!saved) {
        return
      }

      // Store application number in localStorage
      localStorage.setItem('application_number', this.generatedApplicationNumber)

      // Show success dialog
      this.showApplicationNumberDialog = true
    },
    closeApplicationDialog() {
      this.showApplicationNumberDialog = false
      this.$router.push('/applicant/planupload')
    },
  },
})
</script>

<style scoped>
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
.content-area {
  flex: 1;
  overflow: hidden;
  display: flex;
}
.content-area .v-row {
  width: 100%;
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
  scrollbar-width: none; /* Firefox */
}

.scrollable-form-area::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}

.main-content-bg {
  background: #fafdff;
  overflow-y: auto;
  height: 100%;
  scrollbar-width: none; /* Firefox */
}

.main-content-bg::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}

.quick-guide-card {
  min-height: 100%;
  background: #fcfcff;
  border-right: 1px solid #e0e0e0;
}
.quick-guide-step {
  transition: background 0.2s, box-shadow 0.2s;
}
.quick-guide-step:hover {
  background: #e3f0ff !important;
  box-shadow: 0 2px 12px rgba(59, 130, 246, 0.08);
}
.active-step {
  background: #e7efff !important;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.12);
}
.quick-guide-avatar {
  transition: background 0.2s;
}
.step-label {
  color: #23407c;
}
.clickable-step {
  cursor: pointer;
}

.gradient-text {
  background: linear-gradient(90deg, #1976d2 20%, #1565c0 80%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.stepper-elevated {
  background: white;
  border-radius: 14px;
  box-shadow: 0 2px 6px 0 rgba(25, 118, 210, 0.06);
  padding: 20px 0;
}
.stepper-item-custom .v-stepper-item__step {
  box-shadow: 0 1px 4px 0 rgba(25, 118, 210, 0.13);
  transition: background 0.2s;
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
  margin-bottom: 18px;
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
.page-title-responsive {
  font-size: 1.4rem;
  letter-spacing: 0.02em;
}

@media (max-width: 1200px) {
  .page-title-responsive {
    font-size: 1.12rem !important;
  }
}
@media (max-width: 960px) {
  .page-title-responsive {
    font-size: 1rem !important;
  }
  .content-area {
    overflow-y: auto;
  }
  .v-main.no-scroll {
    height: auto;
  }
  .quick-guide-card {
    height: auto !important;
    min-height: auto;
  }
}
@media (max-width: 800px) {
  .card-title-responsive {
    font-size: 1.02rem !important;
  }
  .section-title {
    font-size: 0.92rem !important;
  }
}
@media (max-width: 600px) {
  .v-stepper-item .v-stepper-item__title {
    display: none;
  }
  .page-title-responsive {
    font-size: 0.95rem !important;
  }
  .card-title-responsive,
  .section-title {
    font-size: 0.98rem !important;
  }
  .card-shadow,
  .card-section {
    padding: 6px !important;
  }
  .step-label {
    font-size: 1rem !important;
  }
  .main-content-bg {
    padding: 12px !important;
  }
}
@media (max-width: 480px) {
  .v-card-title {
    font-size: 0.88rem !important;
  }
  .btn-rounded {
    min-width: 90px;
    font-size: 0.9rem;
  }
}
</style>  