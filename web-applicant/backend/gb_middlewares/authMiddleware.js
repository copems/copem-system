import AuthService from '../gb_services/AuthService.js';
import { ROLES, roleTypeToName } from '../gb_services/roleUtils.js';

/**
 * Middleware to authenticate JWT token
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
export const authenticate = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Access token is required'
            });
        }

        const token = authHeader.split(' ')[1];

        // Validate token
        const userData = await AuthService.validateToken(token);

        // Attach user data to request
        req.user = userData;

        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token',
            error: error.message
        });
    }
};

/**
 * Middleware to authorize based on user roles
 * @param {Array<string|number>} allowedRoles - Can be numeric (0-3) or legacy string roles
 * @returns {Function}
 */
export const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }

        const userAccountType = req.user.accountType;
        const userRole = req.user.role; // Legacy string role for backward compatibility

        // Check if user's account type or role matches any of the allowed roles
        const isAuthorized = allowedRoles.some(allowedRole => {
            if (typeof allowedRole === 'number') {
                return userAccountType === allowedRole;
            } else {
                // Support legacy string roles
                return userRole === allowedRole;
            }
        });

        if (!isAuthorized) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Insufficient permissions.'
            });
        }

        next();
    };
};

/**
 * Middleware for permit applicants only
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
export const permitApplicantOnly = (req, res, next) => {
    return authorize(ROLES.APPLICANT)(req, res, next);
};

/**
 * Middleware for building officials only (now maps to admin)
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
export const buildingOfficialOnly = (req, res, next) => {
    return authorize(ROLES.ADMIN)(req, res, next);
};

/**
 * Middleware for admin only
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
export const adminOnly = (req, res, next) => {
    return authorize(ROLES.ADMIN)(req, res, next);
};

/**
 * Middleware for evaluators only
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
export const evaluatorOnly = (req, res, next) => {
    return authorize(ROLES.EVALUATOR)(req, res, next);
};

/**
 * Middleware for inspectors only
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
export const inspectorOnly = (req, res, next) => {
    return authorize(ROLES.INSPECTOR)(req, res, next);
};

/**
 * Middleware for staff only (admin, evaluator, or inspector)
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
export const staffOnly = (req, res, next) => {
    return authorize(ROLES.ADMIN, ROLES.EVALUATOR, ROLES.INSPECTOR)(req, res, next);
};

/**
 * Optional authentication middleware
 * Attaches user data if token is valid, but doesn't require it
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
export const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            const userData = await AuthService.validateToken(token);
            req.user = userData;
        }

        next();
    } catch (error) {
        // If token is invalid, just continue without user data
        next();
    }
};

export default {
    authenticate,
    authorize,
    permitApplicantOnly,
    buildingOfficialOnly,
    adminOnly,
    optionalAuth
};
