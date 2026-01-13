/**
 * APP INITIALIZATION WITH STORES
 * This composable handles initializing all stores at app startup
 * Similar to React's App-level context providers
 */

import { useAuthStore } from '@/stores/auth';
import { usePermitApplicantStore } from '@/stores/permitApplicant';

/**
 * Initialize all application stores
 * Call this in main.js or App.vue to set up global state
 */
export async function initializeStores() {
    console.log('🚀 Initializing application stores...');

    try {
        // 1. Initialize Auth Store
        const authStore = useAuthStore();
        await authStore.initAuth();
        console.log('✅ Auth store initialized');

        // 2. If user is authenticated, initialize Permit Applicant Store
        if (authStore.isLoggedIn && authStore.isPermitApplicant) {
            const permitApplicantStore = usePermitApplicantStore();
            
            try {
                await permitApplicantStore.fetchCurrentApplicant();
                console.log('✅ Permit applicant data loaded');
            } catch (error) {
                console.warn('⚠️ Could not load permit applicant data:', error.message);
                // Don't throw - user might not have completed profile yet
            }
        }

        console.log('✨ All stores initialized successfully');
        return true;

    } catch (error) {
        console.error('❌ Error initializing stores:', error);
        throw error;
    }
}

/**
 * Clear all store data (use on logout)
 */
export function clearAllStores() {
    console.log('🧹 Clearing all store data...');

    const authStore = useAuthStore();
    const permitApplicantStore = usePermitApplicantStore();

    authStore.$reset();
    permitApplicantStore.$reset();

    console.log('✅ All stores cleared');
}

/**
 * Refresh all store data
 */
export async function refreshAllStores() {
    console.log('🔄 Refreshing all store data...');

    const authStore = useAuthStore();
    const permitApplicantStore = usePermitApplicantStore();

    if (authStore.isLoggedIn) {
        await authStore.validateToken();

        if (authStore.isPermitApplicant) {
            await permitApplicantStore.fetchCurrentApplicant(true); // Force refresh
        }
    }

    console.log('✅ All stores refreshed');
}
