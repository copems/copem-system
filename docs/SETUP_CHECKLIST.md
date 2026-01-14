# Authentication System - Quick Setup Checklist

## ✅ Pre-Installation Checklist

- [ ] MySQL/MariaDB is installed and running
- [ ] Node.js is installed (v14 or higher)
- [ ] npm or yarn is available
- [ ] Database `copems` exists
- [ ] Backend and frontend folders are accessible

## 📦 Installation Steps

### Backend Installation

- [ ] Navigate to backend folder: `cd backend`
- [ ] Install new dependencies: `npm install bcryptjs jsonwebtoken`
- [ ] Verify all files are created:
  - [ ] `SQLs/AUTH_CREATE_TABLES.sql`
  - [ ] `gb_models/Auth.js`
  - [ ] `gb_services/AuthService.js`
  - [ ] `gb_controllers/AuthController.js`
  - [ ] `gb_middlewares/authMiddleware.js`
  - [ ] `gb_routes/AuthRoute.js`
- [ ] Update `.env` file with JWT secrets
- [ ] Update `index.js` to import auth routes

### Database Setup

- [ ] Login to MySQL: `mysql -u root -p`
- [ ] Select database: `USE copems;`
- [ ] Run SQL script: `SOURCE backend/SQLs/AUTH_CREATE_TABLES.sql;`
- [ ] Verify tables created:
  - [ ] `user_roles`
  - [ ] `user_sessions`
  - [ ] `refresh_tokens`
- [ ] Verify roles inserted: `SELECT * FROM user_roles;`
  - [ ] permit_applicant
  - [ ] building_official
  - [ ] super_admin

### Frontend Installation

- [ ] Navigate to frontend folder: `cd frontend`
- [ ] Verify files are created:
  - [ ] `src/stores/auth.js` (updated)
  - [ ] `src/plugins/axios.js`
  - [ ] `src/router/guards.js`
  - [ ] `src/pages/LoginAuth.vue`
  - [ ] `src/pages/Register.vue`
  - [ ] `src/components/UserProfile.vue`

## 🔧 Configuration

- [ ] Update `backend/.env`:
  ```
  JWT_SECRET=<your-secret-here>
  JWT_REFRESH_SECRET=<your-refresh-secret-here>
  ```
- [ ] Generate strong random strings for JWT secrets (min 32 chars)
- [ ] Set PORT if needed (default: 3000)
- [ ] Update frontend API URL if needed (default: http://localhost:3000/api)

## 🧪 Testing

### Backend Testing

- [ ] Start backend server: `node index.js`
- [ ] Server starts without errors
- [ ] Server displays: "Server is running on port 3000"
- [ ] Test registration endpoint:
  ```bash
  curl -X POST http://localhost:3000/api/auth/register \
    -H "Content-Type: application/json" \
    -d '{"username":"testuser","password":"TestPass123","role":"permit_applicant"}'
  ```
- [ ] Test login endpoint:
  ```bash
  curl -X POST http://localhost:3000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"username":"testuser","password":"TestPass123"}'
  ```
- [ ] Receive access token and refresh token
- [ ] Test protected endpoint with token

### Frontend Testing

- [ ] Start frontend server: `npm run dev`
- [ ] Navigate to registration page
- [ ] Register a test user
- [ ] Redirected to login page with success message
- [ ] Login with test credentials
- [ ] Redirected to dashboard after successful login
- [ ] Access token stored in localStorage
- [ ] User data available in auth store
- [ ] Protected routes require authentication
- [ ] Logout clears tokens and redirects

### Security Testing

- [ ] Try login with wrong password (should fail)
- [ ] Try registering duplicate username (should fail)
- [ ] Try accessing protected route without token (should fail)
- [ ] Try weak password (should fail)
- [ ] Token refresh works automatically
- [ ] Session tracking works (check database)
- [ ] Logout invalidates session

## 🎯 Integration

### Backend Integration

- [ ] Import auth middleware in existing routes:
  ```javascript
  import { authenticate, buildingOfficialOnly } from './gb_middlewares/authMiddleware.js';
  ```
- [ ] Add authentication to protected routes:
  ```javascript
  router.get('/api/my-route', authenticate, handler);
  ```
- [ ] Add role-based protection where needed:
  ```javascript
  router.get('/api/admin-route', authenticate, buildingOfficialOnly, handler);
  ```

### Frontend Integration

- [ ] Import auth store in components:
  ```javascript
  import { useAuthStore } from '@/stores/auth';
  ```
- [ ] Use auth guards in router:
  ```javascript
  import { authGuard } from '@/router/guards';
  ```
- [ ] Update axios to use interceptor:
  ```javascript
  import apiClient from '@/plugins/axios';
  ```
- [ ] Add login/register links to navigation
- [ ] Show user info when logged in
- [ ] Hide/show features based on role

## 📋 Post-Installation

- [ ] Review AUTHENTICATION_README.md
- [ ] Review TESTING_GUIDE.md
- [ ] Review IMPLEMENTATION_SUMMARY.md
- [ ] Test all authentication flows
- [ ] Update existing routes to use authentication
- [ ] Train team on new authentication system
- [ ] Document any custom changes
- [ ] Plan for additional security features

## 🚨 Security Checklist

- [ ] JWT secrets are strong and random (32+ characters)
- [ ] JWT secrets are NOT committed to version control
- [ ] .env file is in .gitignore
- [ ] Default secrets are changed in production
- [ ] HTTPS is enabled in production
- [ ] CORS is properly configured
- [ ] Password requirements are enforced (min 8 chars)
- [ ] SQL injection protection is in place (parameterized queries)
- [ ] Rate limiting is planned/implemented
- [ ] Session expiration is appropriate (15 min access, 7 days refresh)

## 📝 Documentation Review

- [ ] Read AUTHENTICATION_README.md
- [ ] Understand all API endpoints
- [ ] Review security best practices
- [ ] Understand token flow
- [ ] Review error handling
- [ ] Understand session management
- [ ] Know how to protect routes
- [ ] Understand role-based access control

## 🎓 Training

- [ ] Team understands JWT authentication
- [ ] Team knows how to use auth middleware
- [ ] Team knows how to use auth store in frontend
- [ ] Team understands role-based access control
- [ ] Team knows troubleshooting steps
- [ ] Team can test authentication manually
- [ ] Team understands security implications

## 🔍 Monitoring & Maintenance

- [ ] Set up logging for authentication events
- [ ] Monitor failed login attempts
- [ ] Track active sessions
- [ ] Monitor token refresh rates
- [ ] Plan for token secret rotation
- [ ] Set up alerts for suspicious activity
- [ ] Regular security audits scheduled
- [ ] Keep dependencies updated

## ✨ Optional Enhancements (Future)

- [ ] Email verification
- [ ] Password reset functionality
- [ ] Two-factor authentication (2FA)
- [ ] Account lockout after failed attempts
- [ ] CAPTCHA on registration/login
- [ ] Password strength meter
- [ ] Remember me functionality
- [ ] Social login integration
- [ ] Audit trail/logging
- [ ] Admin user management panel

## 🎉 Completion

Once all items are checked:

- [ ] System is fully functional
- [ ] All tests pass
- [ ] Documentation is complete
- [ ] Team is trained
- [ ] Security measures in place
- [ ] Ready for production (with additional security review)

---

**Status**: ⬜ Not Started | 🔄 In Progress | ✅ Complete

**Last Updated**: January 2026
