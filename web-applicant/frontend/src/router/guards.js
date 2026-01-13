import { useAuthStore } from '@/stores/auth';

/**
 * Navigation guard to protect routes that require authentication
 * @param {Object} to - Target route
 * @param {Object} from - Current route
 * @param {Function} next - Navigation callback
 */
export const authGuard = async (to, from, next) => {
  const authStore = useAuthStore();

  // Check if route requires authentication
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth) {
    if (!authStore.isLoggedIn) {
      // Not authenticated, redirect to login
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      // Authenticated, proceed
      next();
    }
  } else {
    // Route doesn't require auth
    next();
  }
};

/**
 * Navigation guard to restrict access based on user roles
 * @param {Array<string>} allowedRoles - Allowed user roles
 * @returns {Function}
 */
export const roleGuard = (allowedRoles) => {
  return async (to, from, next) => {
    const authStore = useAuthStore();

    if (!authStore.isLoggedIn) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
      return;
    }

    if (!allowedRoles.includes(authStore.userRole)) {
      // User doesn't have required role
      next({
        path: '/unauthorized',
        query: { from: to.fullPath }
      });
    } else {
      next();
    }
  };
};

/**
 * Guard for permit applicant routes only
 */
export const permitApplicantGuard = roleGuard(['permit_applicant']);

/**
 * Guard for building official routes only
 */
export const buildingOfficialGuard = roleGuard(['building_official', 'super_admin']);

/**
 * Guard for guest routes (redirect if already authenticated)
 */
export const guestGuard = async (to, from, next) => {
  const authStore = useAuthStore();

  if (authStore.isLoggedIn) {
    // Already authenticated, redirect to dashboard
    const dashboardPath = authStore.isBuildingOfficial ? '/admin/dashboard' : '/dashboard';
    next({ path: dashboardPath });
  } else {
    next();
  }
};
