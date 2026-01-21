import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './gb_routes/AuthRoute.js';
import userAccountRoutes from './gb_routes/UserAccount.js';
import provinceRoutes from './gb_routes/ProvinceRoute.js';
import cityMunRoutes from './gb_routes/CityMunRoute.js';
import barangayRoutes from './gb_routes/BarangayRoute.js';
import permitApplicantRoutes from './gb_routes/PermitApplicantRoute.js';
import applicantGovIdRoutes from './gb_routes/ApplicantGovIdRoute.js';
import bpaConstructionRoutes from './bp_routes/BpaConstructionRoute.js';
import bpaConstructionSiteRoutes from './bp_routes/BpaConstructionSiteRoute.js';
import bpaCsLotOwnerRoutes from './bp_routes/BpaCsLotOwnerRoute.js';
import bpacSupervisorsRoutes from './bp_routes/BpacSupervisorsRoute.js';
import bpApplicationStatusRoutes from './bp_routes/BpApplicationStatusRoute.js';
import ownershipTypeRoutes from './bp_routes/OwnershipTypeRoute.js';
import workScopeTypeRoutes from './bp_routes/WorkScopeTypeRoute.js';

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

// Authentication routes
app.use('/api/auth', authRoutes);

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

// BPA Construction routes
app.use('/api/bpa-construction', bpaConstructionRoutes);

// BPA Construction Site routes
app.use('/api/bpa-construction-site', bpaConstructionSiteRoutes);

// BPA CS Lot Owner routes
app.use('/api/bpa-cs-lot-owner', bpaCsLotOwnerRoutes);

// BPAC Supervisors routes
app.use('/api/bpac-supervisors', bpacSupervisorsRoutes);

// BP Application Status routes
app.use('/api/bp-application-status', bpApplicationStatusRoutes);

// Ownership Type routes
app.use('/api/ownership-type', ownershipTypeRoutes);

// Work Scope Type routes
app.use('/api/work-scope-type', workScopeTypeRoutes);

const PORT = process.env.PORT || 3000;  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
        console.log(`http://localhost:${PORT}`);

    console.log('Registered routes:');
    console.log('  GET /api/test');
    console.log('  GET /api/userAccount/:username');
});