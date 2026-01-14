<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex align-center">
            <v-icon class="mr-2">mdi-account-circle</v-icon>
            User Profile
            <v-spacer></v-spacer>
            <v-chip :color="userRoleColor" text-color="white" size="small">
              {{ userRoleLabel }}
            </v-chip>
          </v-card-title>

          <v-divider></v-divider>

          <v-card-text>
            <v-alert
              v-if="successMessage"
              type="success"
              closable
              @click:close="successMessage = null"
              class="mb-4"
            >
              {{ successMessage }}
            </v-alert>

            <v-alert v-if="error" type="error" closable @click:close="error = null" class="mb-4">
              {{ error }}
            </v-alert>

            <v-row>
              <v-col cols="12" md="6">
                <h3 class="text-h6 mb-4">Account Information</h3>
                <v-list lines="two">
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon>mdi-account</v-icon>
                    </template>
                    <v-list-item-title>Username</v-list-item-title>
                    <v-list-item-subtitle>{{ user?.username || 'N/A' }}</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon>mdi-identifier</v-icon>
                    </template>
                    <v-list-item-title>User ID</v-list-item-title>
                    <v-list-item-subtitle>{{ user?.userId || 'N/A' }}</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon>mdi-shield-account</v-icon>
                    </template>
                    <v-list-item-title>Role</v-list-item-title>
                    <v-list-item-subtitle>{{ userRoleLabel }}</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-col>

              <v-col cols="12" md="6">
                <h3 class="text-h6 mb-4">Change Password</h3>
                <v-form
                  ref="passwordForm"
                  v-model="passwordFormValid"
                  @submit.prevent="handleChangePassword"
                >
                  <v-text-field
                    v-model="passwordData.currentPassword"
                    :rules="currentPasswordRules"
                    type="password"
                    label="Current Password"
                    variant="outlined"
                    class="mb-2"
                  ></v-text-field>

                  <v-text-field
                    v-model="passwordData.newPassword"
                    :rules="newPasswordRules"
                    type="password"
                    label="New Password"
                    variant="outlined"
                    class="mb-2"
                  ></v-text-field>

                  <v-text-field
                    v-model="passwordData.confirmNewPassword"
                    :rules="confirmNewPasswordRules"
                    type="password"
                    label="Confirm New Password"
                    variant="outlined"
                    class="mb-4"
                  ></v-text-field>

                  <v-btn
                    type="submit"
                    color="primary"
                    :loading="changingPassword"
                    :disabled="!passwordFormValid || changingPassword"
                  >
                    Change Password
                  </v-btn>
                </v-form>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Active Sessions -->
    <v-row class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex align-center">
            <v-icon class="mr-2">mdi-devices</v-icon>
            Active Sessions
            <v-spacer></v-spacer>
            <v-btn
              color="error"
              variant="outlined"
              size="small"
              @click="logoutAllDevices"
              :loading="loggingOutAll"
            >
              Logout All Devices
            </v-btn>
          </v-card-title>

          <v-divider></v-divider>

          <v-card-text>
            <v-progress-linear
              v-if="loadingSessions"
              indeterminate
              color="primary"
            ></v-progress-linear>

            <v-list v-else-if="sessions.length > 0" lines="three">
              <v-list-item v-for="(session, index) in sessions" :key="index">
                <template v-slot:prepend>
                  <v-icon :color="session.is_active ? 'success' : 'grey'">
                    mdi-{{ session.is_active ? 'check-circle' : 'close-circle' }}
                  </v-icon>
                </template>

                <v-list-item-title>{{ session.user_agent || 'Unknown Device' }}</v-list-item-title>
                <v-list-item-subtitle>
                  IP: {{ session.ip_address || 'Unknown' }}<br />
                  Last Activity: {{ formatDate(session.last_activity) }}<br />
                  Expires: {{ formatDate(session.expires_at) }}
                </v-list-item-subtitle>

                <template v-slot:append>
                  <v-chip
                    :color="session.is_active ? 'success' : 'grey'"
                    text-color="white"
                    size="small"
                  >
                    {{ session.is_active ? 'Active' : 'Inactive' }}
                  </v-chip>
                </template>
              </v-list-item>
            </v-list>

            <v-alert v-else type="info" variant="outlined"> No active sessions found. </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const passwordForm = ref(null)
const passwordFormValid = ref(false)
const successMessage = ref(null)
const error = ref(null)
const changingPassword = ref(false)
const loadingSessions = ref(false)
const loggingOutAll = ref(false)
const sessions = ref([])

const user = computed(() => authStore.currentUser)

const userRoleLabel = computed(() => {
  const role = authStore.userRole
  const roleMap = {
    permit_applicant: 'Permit Applicant',
    building_official: 'Building Official',
    super_admin: 'Super Administrator',
  }
  return roleMap[role] || role
})

const userRoleColor = computed(() => {
  const role = authStore.userRole
  const colorMap = {
    permit_applicant: 'primary',
    building_official: 'success',
    super_admin: 'error',
  }
  return colorMap[role] || 'grey'
})

const passwordData = reactive({
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
})

const currentPasswordRules = [(v) => !!v || 'Current password is required']

const newPasswordRules = [
  (v) => !!v || 'New password is required',
  (v) => (v && v.length >= 8) || 'Password must be at least 8 characters',
]

const confirmNewPasswordRules = [
  (v) => !!v || 'Please confirm your new password',
  (v) => v === passwordData.newPassword || 'Passwords do not match',
]

const handleChangePassword = async () => {
  if (!passwordFormValid.value) return

  changingPassword.value = true
  error.value = null
  successMessage.value = null

  try {
    await authStore.changePassword(passwordData.currentPassword, passwordData.newPassword)

    successMessage.value = 'Password changed successfully. Please login again.'

    // Redirect to login after a delay
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } catch (err) {
    error.value = err || 'Failed to change password'
  } finally {
    changingPassword.value = false
  }
}

const loadSessions = async () => {
  loadingSessions.value = true
  try {
    sessions.value = await authStore.getSessions()
  } catch (err) {
    console.error('Failed to load sessions:', err)
  } finally {
    loadingSessions.value = false
  }
}

const logoutAllDevices = async () => {
  if (!confirm('Are you sure you want to logout from all devices? You will need to login again.')) {
    return
  }

  loggingOutAll.value = true
  try {
    await authStore.logoutAll()
    router.push('/login')
  } catch (err) {
    error.value = 'Failed to logout from all devices'
  } finally {
    loggingOutAll.value = false
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleString()
}

onMounted(() => {
  loadSessions()
})
</script>
