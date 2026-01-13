/**
 * Role utilities for account_type management
 * Account type mapping:
 * 0 - admin
 * 1 - evaluator
 * 2 - inspector
 * 3 - applicant
 */

// Role constants
export const ROLES = {
    ADMIN: 0,
    EVALUATOR: 1,
    INSPECTOR: 2,
    APPLICANT: 3
};

// Role names (for display purposes)
export const ROLE_NAMES = {
    0: 'admin',
    1: 'evaluator',
    2: 'inspector',
    3: 'applicant'
};

// Legacy role name mapping (for backward compatibility)
const LEGACY_ROLE_MAP = {
    'admin': 0,
    'super_admin': 0,
    'building_official': 0,
    'evaluator': 1,
    'inspector': 2,
    'applicant': 3,
    'permit_applicant': 3
};

/**
 * Convert legacy role name to numeric account_type
 * @param {string} roleName - Legacy role name
 * @returns {number} - Numeric account_type
 */
export function roleNameToType(roleName) {
    if (typeof roleName === 'number') {
        return roleName; // Already numeric
    }
    
    const normalizedRole = roleName.toLowerCase().trim();
    const accountType = LEGACY_ROLE_MAP[normalizedRole];
    
    if (accountType === undefined) {
        throw new Error(`Invalid role name: ${roleName}`);
    }
    
    return accountType;
}

/**
 * Convert numeric account_type to role name
 * @param {number} accountType - Numeric account_type
 * @returns {string} - Role name
 */
export function roleTypeToName(accountType) {
    const roleName = ROLE_NAMES[accountType];
    
    if (!roleName) {
        throw new Error(`Invalid account type: ${accountType}`);
    }
    
    return roleName;
}

/**
 * Check if account_type is valid
 * @param {number} accountType - Numeric account_type
 * @returns {boolean}
 */
export function isValidAccountType(accountType) {
    return accountType === 0 || accountType === 1 || accountType === 2 || accountType === 3;
}

/**
 * Check if user has admin privileges
 * @param {number} accountType - Numeric account_type
 * @returns {boolean}
 */
export function isAdmin(accountType) {
    return accountType === ROLES.ADMIN;
}

/**
 * Check if user has evaluator privileges
 * @param {number} accountType - Numeric account_type
 * @returns {boolean}
 */
export function isEvaluator(accountType) {
    return accountType === ROLES.EVALUATOR;
}

/**
 * Check if user has inspector privileges
 * @param {number} accountType - Numeric account_type
 * @returns {boolean}
 */
export function isInspector(accountType) {
    return accountType === ROLES.INSPECTOR;
}

/**
 * Check if user is an applicant
 * @param {number} accountType - Numeric account_type
 * @returns {boolean}
 */
export function isApplicant(accountType) {
    return accountType === ROLES.APPLICANT;
}

/**
 * Check if user has staff privileges (admin, evaluator, or inspector)
 * @param {number} accountType - Numeric account_type
 * @returns {boolean}
 */
export function isStaff(accountType) {
    return accountType === ROLES.ADMIN || 
           accountType === ROLES.EVALUATOR || 
           accountType === ROLES.INSPECTOR;
}

export default {
    ROLES,
    ROLE_NAMES,
    roleNameToType,
    roleTypeToName,
    isValidAccountType,
    isAdmin,
    isEvaluator,
    isInspector,
    isApplicant,
    isStaff
};
