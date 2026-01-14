<template>
  <v-container class="fill-height pa-8" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="5">
        <v-card elevation="8" class="auth-card">
          <v-card-title class="text-h4 font-weight-bold text-center py-6 bg-primary text-white">
            <v-icon size="large" class="mr-2">mdi-shield-account</v-icon>
            Secure Login
          </v-card-title>

          <v-card-text class="pa-8">
            <v-alert v-if="error" type="error" closable @click:close="error = null" class="mb-4">
              {{ error }}
            </v-alert>

            <v-alert
              v-if="successMessage"
              type="success"
              closable
              @click:close="successMessage = null"
              class="mb-4"
            >
              {{ successMessage }}
            </v-alert>

            <v-form ref="loginForm" v-model="valid" @submit.prevent="handleLogin">
              <v-text-field
                v-model="username"
                :rules="usernameRules"
                label="Username"
                prepend-icon="mdi-account"
                required
                variant="outlined"
                class="mb-2"
                autofocus
              ></v-text-field>

              <v-text-field
                v-model="password"
                :rules="passwordRules"
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                prepend-icon="mdi-lock"
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="showPassword = !showPassword"
                required
                variant="outlined"
                class="mb-4"
              ></v-text-field>

              <v-btn
                type="submit"
                block
                color="primary"
                size="large"
                :loading="loading"
                :disabled="!valid || loading"
                class="mb-4"
              >
                <v-icon left class="mr-2">mdi-login</v-icon>
                Login
              </v-btn>

              <v-divider class="my-4"></v-divider>

              <v-row>
                <v-col cols="12" class="text-center">
                  <span class="text-body-2">Don't have an account?</span>
                  <v-btn variant="text" color="primary" @click="goToRegister"> Register Now </v-btn>
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
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const loginForm = ref(null)
const valid = ref(false)
const username = ref('')
const password = ref('')
const showPassword = ref(false)
const error = ref(null)
const successMessage = ref(null)
const loading = ref(false)

// Check for success message from registration
if (route.query.registered === 'true') {
  successMessage.value = 'Registration successful! Please login.'
}

const usernameRules = [
  (v) => !!v || 'Username is required',
  (v) => (v && v.length >= 3) || 'Username must be at least 3 characters',
]

const passwordRules = [(v) => !!v || 'Password is required']

const handleLogin = async () => {
  if (!valid.value) return

  loading.value = true
  error.value = null

  try {
    await authStore.login(username.value, password.value)

    // Get redirect path or default to dashboard
    const redirectPath =
      route.query.redirect || (authStore.isBuildingOfficial ? '/admin/dashboard' : '/dashboard')

    router.push(redirectPath)
  } catch (err) {
    error.value = err || 'Login failed. Please check your credentials.'
  } finally {
    loading.value = false
  }
}

const goToRegister = () => {
  router.push('/register')
}
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.auth-card {
  border-radius: 16px;
  overflow: hidden;
}
</style>
