import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userAccountRoutes from './gb_routes/UserAccount.js';
import provinceRoutes from './gb_routes/ProvinceRoute.js';
import cityMunRoutes from './gb_routes/CityMunRoute.js';
import barangayRoutes from './gb_routes/BarangayRoute.js';
import permitApplicantRoutes from './gb_routes/PermitApplicantRoute.js';
import applicantGovIdRoutes from './gb_routes/ApplicantGovIdRoute.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Add logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});
/*
// Test endpoint
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});*/

// User account routes
app.use('/api', userAccountRoutes);

// Province routes
app.use('/api/province', provinceRoutes);

// City/Municipality routes
app.use('/api/city-mun', cityMunRoutes);

// Barangay routes
app.use('/api/barangay', barangayRoutes);

// Permit Applicant routes
app.use('/api/permit-applicant', permitApplicantRoutes);

// Applicant Gov ID routes
app.use('/api/applicant-gov-id', applicantGovIdRoutes);

const PORT = process.env.PORT || 3000;  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Registered routes:');
    console.log('  GET /api/test');
    console.log('  GET /api/userAccount/:username');
});