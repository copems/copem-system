// Example: Protecting an existing route with authentication
import { authenticate, buildingOfficialOnly } from '../gb_middlewares/authMiddleware.js';

// Example 1: Protect a route that requires any authenticated user
router.get('/api/my-applications', authenticate, async (req, res) => {
  try {
    // req.user contains: { userId, username, role, sessionId }
    const userId = req.user.userId;
    
    // Fetch user's applications
    const applications = await getApplicationsByUserId(userId);
    
    res.json({
      success: true,
      data: applications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications',
      error: error.message
    });
  }
});

// Example 2: Protect a route for building officials only
router.post('/api/admin/approve-application', authenticate, buildingOfficialOnly, async (req, res) => {
  try {
    const { applicationId, decision } = req.body;
    const officialId = req.user.userId;
    
    // Process application approval
    await approveApplication(applicationId, decision, officialId);
    
    res.json({
      success: true,
      message: 'Application processed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to process application',
      error: error.message
    });
  }
});

// Example 3: Using role-based authorization with custom roles
import { authorize } from '../gb_middlewares/authMiddleware.js';

router.get('/api/reports', authenticate, authorize('building_official', 'super_admin'), async (req, res) => {
  try {
    const reports = await generateReports();
    res.json({ success: true, data: reports });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Example 4: Optional authentication (user data attached if logged in, but not required)
import { optionalAuth } from '../gb_middlewares/authMiddleware.js';

router.get('/api/public-permits', optionalAuth, async (req, res) => {
  try {
    // Get public permits
    const permits = await getPublicPermits();
    
    // If user is logged in, show additional details
    if (req.user) {
      // Add user-specific information
      permits.forEach(permit => {
        permit.canApply = true;
        permit.isFavorite = checkIfFavorite(req.user.userId, permit.id);
      });
    }
    
    res.json({ success: true, data: permits });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
