import express from 'express';
import { getUserAccountByUsername } from '../gb_controllers/UserAccountController.js';

const router = express.Router();

console.log('UserAccountRoute: Setting up routes...');

router.get('/userAccount/:username', (req, res, next) => {
    console.log('Route hit: /userAccount/' + req.params.username);
    next();
}, getUserAccountByUsername);

console.log('UserAccountRoute: Routes configured');

export default router;