import { defineStore } from 'pinia';
import {
    createPermitApplicant,
    getPermitApplicantById,
    getPermitApplicantByUserId,
    updatePermitApplicant,
    getAllPermitApplicants
} from '@/services/permitApplicantService';
import { useAuthStore } from './auth';

/**
 * Permit Applicant Store
 * Similar to React Context - provides global state management for permit applicant data
 * Can be accessed from any component in the application
 */
export const usePermitApplicantStore = defineStore('permitApplicant', {
    state: () => ({
        // Current applicant data
        applicant: null,
        
        // List of all applicants (for admin views)
        applicants: [],
        
        // Loading states
        loading: false,
        creating: false,
        updating: false,
        
        // Error handling
        error: null,
        
        // Cache timestamp
        lastFetched: null
    }),

    getters: {
        /**
         * Check if applicant data is loaded
         */
        hasApplicantData: (state) => !!state.applicant,

        /**
         * Get full name of applicant
         */
        fullName: (state) => {
            if (!state.applicant) return '';
            const { firstname, middlename, lastname } = state.applicant;
            return `${firstname} ${middlename || ''} ${lastname}`.trim();
        },

        /**
         * Get full address
         */
        fullAddress: (state) => {
            if (!state.applicant) return '';
            const { house_no, street, brgy_code } = state.applicant;
            return `${house_no} ${street}, ${brgy_code}`.trim();
        },

        /**
         * Check if data needs refresh (older than 5 minutes)
         */
        needsRefresh: (state) => {
            if (!state.lastFetched) return true;
            const fiveMinutes = 5 * 60 * 1000;
            return Date.now() - state.lastFetched > fiveMinutes;
        }
    },

    actions: {
        /**
         * Fetch current user's permit applicant data
         * @param {boolean} forceRefresh - Force refresh even if data exists
         */
        async fetchCurrentApplicant(forceRefresh = false) {
            // Skip if data exists and is fresh
            if (this.applicant && !forceRefresh && !this.needsRefresh) {
                return this.applicant;
            }

            const authStore = useAuthStore();
            if (!authStore.user?.userId) {
                throw new Error('No authenticated user found');
            }

            this.loading = true;
            this.error = null;

            try {
                const response = await getPermitApplicantByUserId(authStore.user.userId);
                this.applicant = response.data;
                this.lastFetched = Date.now();
                return this.applicant;
            } catch (error) {
                this.error = error.message || 'Failed to fetch permit applicant data';
                console.error('Error fetching permit applicant:', error);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        /**
         * Fetch permit applicant by ID
         * @param {number} applicantId 
         */
        async fetchApplicantById(applicantId) {
            this.loading = true;
            this.error = null;

            try {
                const response = await getPermitApplicantById(applicantId);
                this.applicant = response.data;
                this.lastFetched = Date.now();
                return this.applicant;
            } catch (error) {
                this.error = error.message || 'Failed to fetch permit applicant';
                console.error('Error fetching permit applicant:', error);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        /**
         * Create new permit applicant
         * @param {Object} applicantData 
         */
        async createApplicant(applicantData) {
            this.creating = true;
            this.error = null;

            try {
                const response = await createPermitApplicant(applicantData);
                
                // Fetch the created applicant
                if (response.data?.applicant_id) {
                    await this.fetchApplicantById(response.data.applicant_id);
                }

                return response;
            } catch (error) {
                this.error = error.message || 'Failed to create permit applicant';
                console.error('Error creating permit applicant:', error);
                throw error;
            } finally {
                this.creating = false;
            }
        },

        /**
         * Update permit applicant
         * @param {number} applicantId 
         * @param {Object} applicantData 
         */
        async updateApplicant(applicantId, applicantData) {
            this.updating = true;
            this.error = null;

            try {
                const response = await updatePermitApplicant(applicantId, applicantData);
                
                // Refresh the applicant data
                await this.fetchApplicantById(applicantId);

                return response;
            } catch (error) {
                this.error = error.message || 'Failed to update permit applicant';
                console.error('Error updating permit applicant:', error);
                throw error;
            } finally {
                this.updating = false;
            }
        },

        /**
         * Fetch all permit applicants (for admin)
         */
        async fetchAllApplicants() {
            this.loading = true;
            this.error = null;

            try {
                const response = await getAllPermitApplicants();
                this.applicants = response.data || [];
                return this.applicants;
            } catch (error) {
                this.error = error.message || 'Failed to fetch permit applicants';
                console.error('Error fetching all permit applicants:', error);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        /**
         * Clear applicant data
         */
        clearApplicant() {
            this.applicant = null;
            this.applicants = [];
            this.lastFetched = null;
            this.error = null;
        },

        /**
         * Reset all state
         */
        $reset() {
            this.applicant = null;
            this.applicants = [];
            this.loading = false;
            this.creating = false;
            this.updating = false;
            this.error = null;
            this.lastFetched = null;
        }
    }
});
