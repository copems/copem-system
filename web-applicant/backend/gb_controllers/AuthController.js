import AuthService from '../gb_services/AuthService.js';

class AuthController {
    /**
     * Register a new user
     * @param {Object} req 
     * @param {Object} res 
     */
    static async register(req, res) {
        try {
            const { username, password, email, role, fullName } = req.body;

            // Validate required fields
            if (!username || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Username and password are required'
                });
            }

            const userData = {
                username,
                password,
                email,
                role: role || 3, // Default to applicant (account_type = 3)
                fullName
            };

            const result = await AuthService.register(userData);

            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: result
            });
        } catch (error) {
            console.error('Register error:', error);
            
            if (error.message.includes('already exists')) {
                return res.status(409).json({
                    success: false,
                    message: error.message
                });
            }

            if (error.message.includes('Invalid role') || error.message.includes('at least 8 characters')) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                });
            }

            res.status(500).json({
                success: false,
                message: 'Failed to register user',
                error: error.message
            });
        }
    }

    /**
     * Login user
     * @param {Object} req 
     * @param {Object} res 
     */
    static async login(req, res) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Username and password are required'
                });
            }

            // Get client IP and user agent
            const ipAddress = req.ip || req.connection.remoteAddress;
            const userAgent = req.get('user-agent') || 'Unknown';

            const result = await AuthService.login(username, password, ipAddress, userAgent);

            res.json({
                success: true,
                message: 'Login successful',
                data: result
            });
        } catch (error) {
            console.error('Login error:', error);

            if (error.message === 'Invalid credentials') {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid username or password'
                });
            }

            res.status(500).json({
                success: false,
                message: 'Login failed',
                error: error.message
            });
        }
    }

    /**
     * Refresh access token
     * @param {Object} req 
     * @param {Object} res 
     */
    static async refreshToken(req, res) {
        try {
            const { refreshToken } = req.body;

            if (!refreshToken) {
                return res.status(400).json({
                    success: false,
                    message: 'Refresh token is required'
                });
            }

            const ipAddress = req.ip || req.connection.remoteAddress;
            const userAgent = req.get('user-agent') || 'Unknown';

            const result = await AuthService.refreshAccessToken(refreshToken, ipAddress, userAgent);

            res.json({
                success: true,
                message: 'Token refreshed successfully',
                data: result
            });
        } catch (error) {
            console.error('Refresh token error:', error);

            if (error.message.includes('Invalid') || error.message.includes('expired')) {
                return res.status(401).json({
                    success: false,
                    message: error.message
                });
            }

            res.status(500).json({
                success: false,
                message: 'Failed to refresh token',
                error: error.message
            });
        }
    }

    /**
     * Logout user
     * @param {Object} req 
     * @param {Object} res 
     */
    static async logout(req, res) {
        try {
            const token = req.headers.authorization?.split(' ')[1];

            if (!token) {
                return res.status(400).json({
                    success: false,
                    message: 'Token is required'
                });
            }

            await AuthService.logout(token);

            res.json({
                success: true,
                message: 'Logged out successfully'
            });
        } catch (error) {
            console.error('Logout error:', error);
            res.status(500).json({
                success: false,
                message: 'Logout failed',
                error: error.message
            });
        }
    }

    /**
     * Logout from all devices
     * @param {Object} req 
     * @param {Object} res 
     */
    static async logoutAll(req, res) {
        try {
            const userId = req.user.userId;

            await AuthService.logoutAll(userId);

            res.json({
                success: true,
                message: 'Logged out from all devices successfully'
            });
        } catch (error) {
            console.error('Logout all error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to logout from all devices',
                error: error.message
            });
        }
    }

    /**
     * Get current user info
     * @param {Object} req 
     * @param {Object} res 
     */
    static async getCurrentUser(req, res) {
        try {
            res.json({
                success: true,
                data: {
                    userId: req.user.userId,
                    username: req.user.username,
                    role: req.user.role
                }
            });
        } catch (error) {
            console.error('Get current user error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to get user info',
                error: error.message
            });
        }
    }

    /**
     * Validate token
     * @param {Object} req 
     * @param {Object} res 
     */
    static async validateToken(req, res) {
        try {
            const token = req.headers.authorization?.split(' ')[1];

            if (!token) {
                return res.status(400).json({
                    success: false,
                    message: 'Token is required'
                });
            }

            const result = await AuthService.validateToken(token);

            res.json({
                success: true,
                message: 'Token is valid',
                data: result
            });
        } catch (error) {
            console.error('Validate token error:', error);
            res.status(401).json({
                success: false,
                message: 'Invalid or expired token',
                error: error.message
            });
        }
    }

    /**
     * Change password
     * @param {Object} req 
     * @param {Object} res 
     */
    static async changePassword(req, res) {
        try {
            const { currentPassword, newPassword } = req.body;
            const userId = req.user.userId;

            if (!currentPassword || !newPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'Current password and new password are required'
                });
            }

            await AuthService.changePassword(userId, currentPassword, newPassword);

            res.json({
                success: true,
                message: 'Password changed successfully. Please login again.'
            });
        } catch (error) {
            console.error('Change password error:', error);

            if (error.message.includes('incorrect') || error.message.includes('at least 8 characters')) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                });
            }

            res.status(500).json({
                success: false,
                message: 'Failed to change password',
                error: error.message
            });
        }
    }

    /**
     * Get user sessions
     * @param {Object} req 
     * @param {Object} res 
     */
    static async getSessions(req, res) {
        try {
            const userId = req.user.userId;
            const sessions = await AuthService.getUserSessions(userId);

            res.json({
                success: true,
                data: sessions
            });
        } catch (error) {
            console.error('Get sessions error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to get sessions',
                error: error.message
            });
        }
    }
}

export default AuthController;
