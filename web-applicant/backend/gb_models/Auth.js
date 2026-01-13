import pool from '../config/database.js';

class Auth {
    /**
     * Register a new user
     * @param {string} username 
     * @param {string} passwordHash 
     * @param {string} email 
     * @param {number} accountType - Numeric account_type (0-admin, 1-evaluator, 2-inspector, 3-applicant)
     * @param {string} fullName 
     * @returns {Promise<Object>}
     */
    static async registerUser(username, passwordHash, email, accountType, fullName) {
        let conn;
        try {
            conn = await pool.getConnection();
            const rows = await conn.query(
                'CALL sp_RegisterUser(?, ?, ?, ?, ?)',
                [username, passwordHash, email, accountType, fullName]
            );
            
            if (!rows || !rows[0] || rows[0].length === 0) {
                throw new Error('Failed to register user');
            }
            
            return rows[0][0];
        } catch (error) {
            console.error('Error in registerUser:', error);
            throw error;
        } finally {
            if (conn) conn.release();
        }
    }

    /**
     * Authenticate user by username
     * @param {string} username 
     * @returns {Promise<Object>}
     */
    static async authenticateUser(username) {
        let conn;
        try {
            conn = await pool.getConnection();
            const rows = await conn.query(
                'CALL sp_AuthenticateUser(?)',
                [username]
            );
            
            if (!rows || !rows[0] || rows[0].length === 0) {
                return null;
            }
            
            return rows[0][0];
        } catch (error) {
            console.error('Error in authenticateUser:', error);
            throw error;
        } finally {
            if (conn) conn.release();
        }
    }

    /**
     * Create a new session
     * @param {number} userId 
     * @param {string} tokenHash 
     * @param {string} ipAddress 
     * @param {string} userAgent 
     * @param {Date} expiresAt 
     * @returns {Promise<Object>}
     */
    static async createSession(userId, tokenHash, ipAddress, userAgent, expiresAt) {
        let conn;
        try {
            conn = await pool.getConnection();
            const rows = await conn.query(
                'CALL sp_CreateSession(?, ?, ?, ?, ?)',
                [userId, tokenHash, ipAddress, userAgent, expiresAt]
            );
            
            if (!rows || !rows[0] || rows[0].length === 0) {
                throw new Error('Failed to create session');
            }
            
            return rows[0][0];
        } catch (error) {
            console.error('Error in createSession:', error);
            throw error;
        } finally {
            if (conn) conn.release();
        }
    }

    /**
     * Create a refresh token
     * @param {number} userId 
     * @param {string} tokenHash 
     * @param {number} sessionId 
     * @param {Date} expiresAt 
     * @returns {Promise<Object>}
     */
    static async createRefreshToken(userId, tokenHash, sessionId, expiresAt) {
        let conn;
        try {
            conn = await pool.getConnection();
            const rows = await conn.query(
                'CALL sp_CreateRefreshToken(?, ?, ?, ?)',
                [userId, tokenHash, sessionId, expiresAt]
            );
            
            if (!rows || !rows[0] || rows[0].length === 0) {
                throw new Error('Failed to create refresh token');
            }
            
            return rows[0][0];
        } catch (error) {
            console.error('Error in createRefreshToken:', error);
            throw error;
        } finally {
            if (conn) conn.release();
        }
    }

    /**
     * Validate a session token
     * @param {string} tokenHash 
     * @returns {Promise<Object>}
     */
    static async validateSession(tokenHash) {
        let conn;
        try {
            conn = await pool.getConnection();
            const rows = await conn.query(
                'CALL sp_ValidateSession(?)',
                [tokenHash]
            );
            
            if (!rows || !rows[0] || rows[0].length === 0) {
                return null;
            }
            
            return rows[0][0];
        } catch (error) {
            console.error('Error in validateSession:', error);
            throw error;
        } finally {
            if (conn) conn.release();
        }
    }

    /**
     * Validate a refresh token
     * @param {string} tokenHash 
     * @returns {Promise<Object>}
     */
    static async validateRefreshToken(tokenHash) {
        let conn;
        try {
            conn = await pool.getConnection();
            const rows = await conn.query(
                'CALL sp_ValidateRefreshToken(?)',
                [tokenHash]
            );
            
            if (!rows || !rows[0] || rows[0].length === 0) {
                return null;
            }
            
            return rows[0][0];
        } catch (error) {
            console.error('Error in validateRefreshToken:', error);
            throw error;
        } finally {
            if (conn) conn.release();
        }
    }

    /**
     * Revoke a session (logout)
     * @param {string} tokenHash 
     * @returns {Promise<Object>}
     */
    static async revokeSession(tokenHash) {
        let conn;
        try {
            conn = await pool.getConnection();
            const rows = await conn.query(
                'CALL sp_RevokeSession(?)',
                [tokenHash]
            );
            
            return rows[0][0];
        } catch (error) {
            console.error('Error in revokeSession:', error);
            throw error;
        } finally {
            if (conn) conn.release();
        }
    }

    /**
     * Revoke all user sessions
     * @param {number} userId 
     * @returns {Promise<Object>}
     */
    static async revokeAllUserSessions(userId) {
        let conn;
        try {
            conn = await pool.getConnection();
            const rows = await conn.query(
                'CALL sp_RevokeAllUserSessions(?)',
                [userId]
            );
            
            return rows[0][0];
        } catch (error) {
            console.error('Error in revokeAllUserSessions:', error);
            throw error;
        } finally {
            if (conn) conn.release();
        }
    }

    /**
     * Get all sessions for a user
     * @param {number} userId 
     * @returns {Promise<Array>}
     */
    static async getUserSessions(userId) {
        let conn;
        try {
            conn = await pool.getConnection();
            const rows = await conn.query(
                'CALL sp_GetUserSessions(?)',
                [userId]
            );
            
            if (!rows || !rows[0]) {
                return [];
            }
            
            return rows[0];
        } catch (error) {
            console.error('Error in getUserSessions:', error);
            throw error;
        } finally {
            if (conn) conn.release();
        }
    }

    /**
     * Update user password
     * @param {number} userId 
     * @param {string} newPasswordHash 
     * @returns {Promise<Object>}
     */
    static async updateUserPassword(userId, newPasswordHash) {
        let conn;
        try {
            conn = await pool.getConnection();
            const rows = await conn.query(
                'CALL sp_UpdateUserPassword(?, ?)',
                [userId, newPasswordHash]
            );
            
            return rows[0][0];
        } catch (error) {
            console.error('Error in updateUserPassword:', error);
            throw error;
        } finally {
            if (conn) conn.release();
        }
    }
}

export default Auth;
