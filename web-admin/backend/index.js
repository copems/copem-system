import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userAccountRoutes from './gb_routes/UserAccountRoute.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Add logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Test endpoint
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

// User account routes
app.use('/api', userAccountRoutes);

const PORT = process.env.PORT || 3000;  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Registered routes:');
    console.log('  GET /api/test');
    console.log('  GET /api/userAccount/:username');
});