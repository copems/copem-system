import express from 'express';
import AuthController from '../gb_controllers/AuthController.js';
import { authenticate } from '../gb_middlewares/authMiddleware.js';

const router = express.Router();

// Public routes (no authentication required)
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/refresh-token', AuthController.refreshToken);
router.post('/validate-token', AuthController.validateToken);

// Protected routes (authentication required)
router.post('/logout', authenticate, AuthController.logout);
router.post('/logout-all', authenticate, AuthController.logoutAll);
router.get('/me', authenticate, AuthController.getCurrentUser);
router.post('/change-password', authenticate, AuthController.changePassword);
router.get('/sessions', authenticate, AuthController.getSessions);

export default router;
