<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card elevation="12" class="mx-auto">
          <v-card-title class="text-h4 font-weight-bold text-center py-6">
            <v-icon size="large" color="primary" class="mr-2">mdi-account-plus</v-icon>
            Register
          </v-card-title>

          <v-card-text>
            <v-alert v-if="error" type="error" closable @click:close="error = null" class="mb-4">
              {{ error }}
            </v-alert>

            <v-form ref="registerForm" v-model="valid" @submit.prevent="handleRegister">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="formData.username"
                    :rules="usernameRules"
                    label="Username *"
                    prepend-icon="mdi-account"
                    required
                    variant="outlined"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="formData.fullName"
                    :rules="fullNameRules"
                    label="Full Name *"
                    prepend-icon="mdi-account-circle"
                    required
                    variant="outlined"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="formData.email"
                    :rules="emailRules"
                    label="Email"
                    prepend-icon="mdi-email"
                    type="email"
                    variant="outlined"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-select
                    v-model="formData.role"
                    :items="roleOptions"
                    :rules="roleRules"
                    label="Account Type *"
                    prepend-icon="mdi-shield-account"
                    required
                    variant="outlined"
                  ></v-select>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="formData.password"
                    :rules="passwordRules"
                    :type="showPassword ? 'text' : 'password'"
                    label="Password *"
                    prepend-icon="mdi-lock"
                    :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append-inner="showPassword = !showPassword"
                    required
                    variant="outlined"
                    hint="Minimum 8 characters"
                    persistent-hint
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="formData.confirmPassword"
                    :rules="confirmPasswordRules"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    label="Confirm Password *"
                    prepend-icon="mdi-lock-check"
                    :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append-inner="showConfirmPassword = !showConfirmPassword"
                    required
                    variant="outlined"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-checkbox
                    v-model="agreeToTerms"
                    :rules="[(v) => !!v || 'You must agree to the terms and conditions']"
                    required
                  >
                    <template v-slot:label>
                      <span class="text-body-2">
                        I agree to the
                        <a href="#" @click.prevent="showTerms">Terms and Conditions</a>
                      </span>
                    </template>
                  </v-checkbox>
                </v-col>
              </v-row>

              <v-btn
                type="submit"
                block
                color="primary"
                size="large"
                :loading="loading"
                :disabled="!valid || !agreeToTerms || loading"
                class="mt-4"
              >
                Register
              </v-btn>

              <v-divider class="my-6"></v-divider>

              <v-row>
                <v-col cols="12" class="text-center">
                  <span class="text-body-2">Already have an account?</span>
                  <v-btn variant="text" color="primary" @click="goToLogin"> Login </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const registerForm = ref(null)
const valid = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const agreeToTerms = ref(false)
const error = ref(null)
const loading = ref(false)

const formData = reactive({
  username: '',
  fullName: '',
  email: '',
  role: 'permit_applicant',
  password: '',
  confirmPassword: '',
})

const roleOptions = [
  { title: 'Permit Applicant', value: 'permit_applicant' },
  { title: 'Building Official', value: 'building_official' },
]

const usernameRules = [
  (v) => !!v || 'Username is required',
  (v) => (v && v.length >= 3) || 'Username must be at least 3 characters',
  (v) => (v && v.length <= 50) || 'Username must be less than 50 characters',
  (v) => /^[a-zA-Z0-9_]+$/.test(v) || 'Username can only contain letters, numbers, and underscores',
]

const fullNameRules = [
  (v) => !!v || 'Full name is required',
  (v) => (v && v.length >= 3) || 'Full name must be at least 3 characters',
]

const emailRules = [(v) => !v || /.+@.+\..+/.test(v) || 'Email must be valid']

const roleRules = [(v) => !!v || 'Account type is required']

const passwordRules = [
  (v) => !!v || 'Password is required',
  (v) => (v && v.length >= 8) || 'Password must be at least 8 characters',
  (v) => /[A-Z]/.test(v) || 'Password must contain at least one uppercase letter',
  (v) => /[a-z]/.test(v) || 'Password must contain at least one lowercase letter',
  (v) => /[0-9]/.test(v) || 'Password must contain at least one number',
]

const confirmPasswordRules = [
  (v) => !!v || 'Please confirm your password',
  (v) => v === formData.password || 'Passwords do not match',
]

const handleRegister = async () => {
  if (!valid.value || !agreeToTerms.value) return

  loading.value = true
  error.value = null

  try {
    await authStore.register({
      username: formData.username,
      fullName: formData.fullName,
      email: formData.email || null,
      role: formData.role,
      password: formData.password,
    })

    // Registration successful, redirect to login
    router.push({
      path: '/login',
      query: { registered: 'true' },
    })
  } catch (err) {
    error.value = err || 'Registration failed. Please try again.'
  } finally {
    loading.value = false
  }
}

const goToLogin = () => {
  router.push('/login')
}

const showTerms = () => {
  // Implement terms and conditions display
  console.log('Show terms and conditions')
  // Could open a dialog with terms
}
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.v-card {
  border-radius: 16px;
}

a {
  text-decoration: none;
  color: rgb(var(--v-theme-primary));
}

a:hover {
  text-decoration: underline;
}
</style>
