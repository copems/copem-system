import { defineStore } from "pinia";
import axios from "axios";

// Backend API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
  }),

  getters: {
    isLoggedIn: (state) => state.isAuthenticated && !!state.accessToken,
    currentUser: (state) => state.user,
    userRole: (state) => state.user?.role || null,
    isPermitApplicant: (state) => state.user?.role === 'permit_applicant',
    isBuildingOfficial: (state) => ['building_official', 'super_admin'].includes(state.user?.role),
    getAuthHeader: (state) => state.accessToken ? { Authorization: `Bearer ${state.accessToken}` } : {},
  },

  actions: {
    /**
     * Initialize auth state from localStorage
     */
    async initAuth() {
      if (this.accessToken) {
        try {
          await this.validateToken();
        } catch (error) {
          console.error('Token validation failed:', error);
          this.clearAuth();
        }
      }
    },

    /**
     * Login user
     * @param {string} username 
     * @param {string} password 
     * @returns {Promise<Object>}
     */
    async login(username, password) {
      this.loading = true;

      try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, {
          username,
          password,
        });

        const { data } = response.data;

        if (data && data.accessToken && data.refreshToken) {
          this.accessToken = data.accessToken;
          this.refreshToken = data.refreshToken;
          this.user = data.user;
          this.isAuthenticated = true;

          // Save to localStorage
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          localStorage.setItem('user', JSON.stringify(data.user));

          return { success: true, user: data.user };
        } else {
          throw new Error('Invalid response from server');
        }
      } catch (error) {
        console.error('Login error:', error);
        this.clearAuth();
        throw error.response?.data?.message || error.message || 'Login failed';
      } finally {
        this.loading = false;
      }
    },

    /**
     * Register new user
     * @param {Object} userData 
     * @returns {Promise<Object>}
     */
    async register(userData) {
      this.loading = true;

      try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, {
          username: userData.username,
          password: userData.password,
          email: userData.email,
          role: userData.role || 'permit_applicant',
          first_name: userData.first_name,
          last_name: userData.last_name,
        });

        const { data } = response.data;

        return { success: true, data };
      } catch (error) {
        console.error('Register error:', error);
        throw error.response?.data?.message || error.message || 'Registration failed';
      } finally {
        this.loading = false;
      }
    },

    /**
     * Logout user
     * @returns {Promise<void>}
     */
    async logout() {
      this.loading = true;

      try {
        if (this.accessToken) {
          await axios.post(
            `${API_BASE_URL}/auth/logout`,
            {},
            {
              headers: this.getAuthHeader,
            }
          );
        }
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        this.clearAuth();
        this.loading = false;
      }
    },

    /**
     * Logout from all devices
     * @returns {Promise<void>}
     */
    async logoutAll() {
      this.loading = true;

      try {
        if (this.accessToken) {
          await axios.post(
            `${API_BASE_URL}/auth/logout-all`,
            {},
            {
              headers: this.getAuthHeader,
            }
          );
        }
      } catch (error) {
        console.error('Logout all error:', error);
      } finally {
        this.clearAuth();
        this.loading = false;
      }
    },

    /**
     * Refresh access token
     * @returns {Promise<string>}
     */
    async refreshAccessToken() {
      if (!this.refreshToken) {
        throw new Error('No refresh token available');
      }

      try {
        const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
          refreshToken: this.refreshToken,
        });

        const { data } = response.data;

        if (data && data.accessToken) {
          this.accessToken = data.accessToken;
          localStorage.setItem('accessToken', data.accessToken);

          if (data.user) {
            this.user = data.user;
            localStorage.setItem('user', JSON.stringify(data.user));
          }

          return data.accessToken;
        } else {
          throw new Error('Invalid refresh token response');
        }
      } catch (error) {
        console.error('Refresh token error:', error);
        this.clearAuth();
        throw error;
      }
    },

    /**
     * Validate current token
     * @returns {Promise<void>}
     */
    async validateToken() {
      if (!this.accessToken) {
        throw new Error('No access token available');
      }

      try {
        const response = await axios.post(
          `${API_BASE_URL}/auth/validate-token`,
          {},
          {
            headers: this.getAuthHeader,
          }
        );

        const { data } = response.data;

        if (data) {
          this.user = {
            userId: data.userId,
            username: data.username,
            role: data.role,
          };
          this.isAuthenticated = true;
          localStorage.setItem('user', JSON.stringify(this.user));
        }
      } catch (error) {
        console.error('Token validation error:', error);
        throw error;
      }
    },

    /**
     * Get current user info
     * @returns {Promise<Object>}
     */
    async getCurrentUser() {
      try {
        const response = await axios.get(`${API_BASE_URL}/auth/me`, {
          headers: this.getAuthHeader,
        });

        const { data } = response.data;

        if (data) {
          this.user = data;
          localStorage.setItem('user', JSON.stringify(data));
        }

        return data;
      } catch (error) {
        console.error('Get current user error:', error);
        throw error;
      }
    },

    /**
     * Change password
     * @param {string} currentPassword 
     * @param {string} newPassword 
     * @returns {Promise<void>}
     */
    async changePassword(currentPassword, newPassword) {
      try {
        await axios.post(
          `${API_BASE_URL}/auth/change-password`,
          {
            currentPassword,
            newPassword,
          },
          {
            headers: this.getAuthHeader,
          }
        );

        // Logout after password change
        await this.clearAuth();
      } catch (error) {
        console.error('Change password error:', error);
        throw error.response?.data?.message || error.message || 'Failed to change password';
      }
    },

    /**
     * Get user sessions
     * @returns {Promise<Array>}
     */
    async getSessions() {
      try {
        const response = await axios.get(`${API_BASE_URL}/auth/sessions`, {
          headers: this.getAuthHeader,
        });

        return response.data.data || [];
      } catch (error) {
        console.error('Get sessions error:', error);
        throw error;
      }
    },

    /**
     * Clear authentication state
     */
    clearAuth() {
      this.user = null;
      this.isAuthenticated = false;
      this.accessToken = null;
      this.refreshToken = null;

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    },
  },
});
