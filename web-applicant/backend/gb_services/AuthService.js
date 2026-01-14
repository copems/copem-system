import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import Auth from '../gb_models/Auth.js';
import { ROLES, roleNameToType, roleTypeToName, isValidAccountType } from './roleUtils.js';

class AuthService {
    /**
     * Generate JWT access token
     * @param {Object} payload 
     * @param {string} expiresIn 
     * @returns {string}
     */
    static generateAccessToken(payload, expiresIn = '15m') {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
    }

    /**
     * Generate refresh token
     * @param {Object} payload 
     * @param {string} expiresIn 
     * @returns {string}
     */
    static generateRefreshToken(payload, expiresIn = '7d') {
        return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn });
    }

    /**
     * Verify JWT access token
     * @param {string} token 
     * @returns {Object}
     */
    static verifyAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            throw new Error('Invalid or expired access token');
        }
    }

    /**
     * Verify refresh token
     * @param {string} token 
     * @returns {Object}
     */
    static verifyRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        } catch (error) {
            throw new Error('Invalid or expired refresh token');
        }
    }

    /**
     * Hash a password
     * @param {string} password 
     * @returns {Promise<string>}
     */
    static async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    /**
     * Compare password with hash
     * @param {string} password 
     * @param {string} hash 
     * @returns {Promise<boolean>}
     */
    static async comparePassword(password, hash) {
        return await bcrypt.compare(password, hash);
    }

    /**
     * Create SHA256 hash of a token
     * @param {string} token 
     * @returns {string}
     */
    static hashToken(token) {
        return crypto.createHash('sha256').update(token).digest('hex');
    }

    /**
     * Register a new user
     * @param {Object} userData 
     * @returns {Promise<Object>}
     */
    static async register(userData) {
        const { username, password, email, role, first_name, last_name } = userData;

        // Validate input
        if (!username || !password) {
            throw new Error('Username and password are required');
        }

        if (password.length < 8) {
            throw new Error('Password must be at least 8 characters long');
        }

        // Convert role to numeric account_type
        let accountType;
        if (role === undefined || role === null) {
            accountType = ROLES.APPLICANT; // Default to applicant
        } else if (typeof role === 'string') {
            accountType = roleNameToType(role); // Convert legacy string role
        } else {
            accountType = role; // Already numeric
        }
        
        if (!isValidAccountType(accountType)) {
            throw new Error('Invalid account type');
        }

        // Hash password
        const passwordHash = await this.hashPassword(password);
        try {
            // Register user in database
            const user = await Auth.registerUser(
                username,
                passwordHash,
                email || null,
                role || 'permit_applicant',
                first_name,
                last_name
            );

            return {
                userId: user.user_id,
                username: user.username,
                accountType: user.account_type,
                role: user.role,
                first_name: user.first_name,
                last_name: user.last_name
            };
        } catch (error) {
            if (error.message.includes('already exists')) {
                throw new Error('Username already exists');
            }
            throw error;
        }
    }

    /**
     * Login user and generate tokens
     * @param {string} username 
     * @param {string} password 
     * @param {string} ipAddress 
     * @param {string} userAgent 
     * @returns {Promise<Object>}
     */
    static async login(username, password, ipAddress, userAgent) {
        // Get user from database
        const user = await Auth.authenticateUser(username);

        if (!user) {
            throw new Error('Invalid credentials');
        }

        // Verify password
        const isValidPassword = await this.comparePassword(password, user.user_password);

        if (!isValidPassword) {
            throw new Error('Invalid credentials');
        }

        // Generate tokens
        const accessToken = this.generateAccessToken({
            userId: user.user_id,
            username: user.username,
            accountType: user.account_type,
            role: user.role,
            first_name: user.first_name,
            last_name: user.last_name
        });

        const refreshToken = this.generateRefreshToken({
            userId: user.user_id,
            username: user.username
        });

        // Hash tokens for storage
        const accessTokenHash = this.hashToken(accessToken);
        const refreshTokenHash = this.hashToken(refreshToken);

        // Calculate expiration times
        const accessTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
        const refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

        // Create session
        const session = await Auth.createSession(
            user.user_id,
            accessTokenHash,
            ipAddress,
            userAgent,
            accessTokenExpiry
        );

        // Create refresh token
        await Auth.createRefreshToken(
            user.user_id,
            refreshTokenHash,
            session.session_id,
            refreshTokenExpiry
        );

        return {
            accessToken,
            refreshToken,
            user: {
                userId: user.user_id,
                username: user.username,
                accountType: user.account_type,
                role: user.role,
                first_name: user.first_name,
                last_name: user.last_name
            }
        };
    }

    /**
     * Refresh access token
     * @param {string} refreshToken 
     * @param {string} ipAddress 
     * @param {string} userAgent 
     * @returns {Promise<Object>}
     */
    static async refreshAccessToken(refreshToken, ipAddress, userAgent) {
        // Verify refresh token
        let decoded;
        try {
            decoded = this.verifyRefreshToken(refreshToken);
        } catch (error) {
            throw new Error('Invalid or expired refresh token');
        }

        // Hash refresh token
        const refreshTokenHash = this.hashToken(refreshToken);

        // Validate refresh token in database
        const tokenData = await Auth.validateRefreshToken(refreshTokenHash);

        if (!tokenData) {
            throw new Error('Invalid or revoked refresh token');
        }

        // Generate new access token
        const newAccessToken = this.generateAccessToken({
            userId: tokenData.user_id,
            username: tokenData.username,
            role: tokenData.role
        });

        // Hash new access token
        const newAccessTokenHash = this.hashToken(newAccessToken);

        // Calculate expiration time
        const accessTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

        // Create new session
        await Auth.createSession(
            tokenData.user_id,
            newAccessTokenHash,
            ipAddress,
            userAgent,
            accessTokenExpiry
        );

        return {
            accessToken: newAccessToken,
            user: {
                userId: tokenData.user_id,
                username: tokenData.username,
                role: tokenData.role
            }
        };
    }

    /**
     * Logout user
     * @param {string} accessToken 
     * @returns {Promise<void>}
     */
    static async logout(accessToken) {
        const tokenHash = this.hashToken(accessToken);
        await Auth.revokeSession(tokenHash);
    }

    /**
     * Logout from all devices
     * @param {number} userId 
     * @returns {Promise<void>}
     */
    static async logoutAll(userId) {
        await Auth.revokeAllUserSessions(userId);
    }

    /**
     * Validate access token
     * @param {string} token 
     * @returns {Promise<Object>}
     */
    static async validateToken(token) {
        // Verify JWT
        const decoded = this.verifyAccessToken(token);

        // Hash token and validate in database
        const tokenHash = this.hashToken(token);
        const session = await Auth.validateSession(tokenHash);

        if (!session) {
            throw new Error('Invalid or expired session');
        }

        return {
            userId: session.user_id,
            username: session.username,
            role: session.role,
            sessionId: session.session_id
        };
    }

    /**
     * Change user password
     * @param {number} userId 
     * @param {string} currentPassword 
     * @param {string} newPassword 
     * @returns {Promise<void>}
     */
    static async changePassword(userId, currentPassword, newPassword) {
        // Get user
        const user = await Auth.authenticateUser(userId);

        if (!user) {
            throw new Error('User not found');
        }

        // Verify current password
        const isValidPassword = await this.comparePassword(currentPassword, user.user_password);

        if (!isValidPassword) {
            throw new Error('Current password is incorrect');
        }

        // Validate new password
        if (newPassword.length < 8) {
            throw new Error('New password must be at least 8 characters long');
        }

        // Hash new password
        const newPasswordHash = await this.hashPassword(newPassword);

        // Update password (this also revokes all sessions)
        await Auth.updateUserPassword(userId, newPasswordHash);
    }

    /**
     * Get user active sessions
     * @param {number} userId 
     * @returns {Promise<Array>}
     */
    static async getUserSessions(userId) {
        return await Auth.getUserSessions(userId);
    }
}

export default AuthService;
