<!-- Example Component: Using Permit Applicant Store (Vue Context Alternative) -->
<template>
  <div class="permit-applicant-info">
    <!-- Loading State -->
    <v-progress-circular v-if="permitApplicantStore.loading" indeterminate color="primary" />

    <!-- Error State -->
    <v-alert v-else-if="permitApplicantStore.error" type="error" closable>
      {{ permitApplicantStore.error }}
    </v-alert>

    <!-- Applicant Data -->
    <v-card v-else-if="permitApplicantStore.hasApplicantData" class="pa-4">
      <v-card-title>Permit Applicant Information</v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <div class="info-item">
              <label>Full Name:</label>
              <div class="value">{{ permitApplicantStore.fullName }}</div>
            </div>
          </v-col>

          <v-col cols="12" md="6">
            <div class="info-item">
              <label>Contact Number:</label>
              <div class="value">{{ applicant.contact_no }}</div>
            </div>
          </v-col>

          <v-col cols="12" md="6">
            <div class="info-item">
              <label>TIN:</label>
              <div class="value">{{ applicant.tin_no }}</div>
            </div>
          </v-col>

          <v-col cols="12" md="6">
            <div class="info-item">
              <label>Address:</label>
              <div class="value">{{ permitApplicantStore.fullAddress }}</div>
            </div>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="refreshData" color="primary"> Refresh Data </v-btn>
      </v-card-actions>
    </v-card>

    <!-- No Data State -->
    <v-alert v-else type="info">
      No permit applicant data found. Please complete your profile.
    </v-alert>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { usePermitApplicantStore } from '@/stores/permitApplicant'

// Access the store (similar to React's useContext)
const permitApplicantStore = usePermitApplicantStore()

// Computed property to access applicant data
const applicant = computed(() => permitApplicantStore.applicant)

// Fetch data on component mount
onMounted(async () => {
  try {
    await permitApplicantStore.fetchCurrentApplicant()
  } catch (error) {
    console.error('Failed to load permit applicant data:', error)
  }
})

// Method to refresh data
const refreshData = async () => {
  try {
    await permitApplicantStore.fetchCurrentApplicant(true) // Force refresh
  } catch (error) {
    console.error('Failed to refresh data:', error)
  }
}
</script>

<style scoped>
.permit-applicant-info {
  padding: 16px;
}

.info-item {
  margin-bottom: 16px;
}

.info-item label {
  font-weight: 600;
  color: #666;
  display: block;
  margin-bottom: 4px;
}

.info-item .value {
  font-size: 1.1em;
  color: #333;
}
</style>
