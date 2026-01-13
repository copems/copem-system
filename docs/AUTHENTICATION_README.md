# Authentication System Documentation

## Overview

This is a comprehensive, secured authentication system for the COPEM System with JWT token-based authentication. The system supports two user roles:
- **Permit Applicants** - Regular users applying for permits
- **Building Officials** - Administrative users with elevated permissions

## Features

✅ **Secure Authentication**
- JWT (JSON Web Token) based authentication
- Access tokens (15 minutes expiry)
- Refresh tokens (7 days expiry)
- Password hashing with bcryptjs
- Token validation and refresh mechanism

✅ **User Management**
- User registration with role selection
- User login with credentials validation
- Password change functionality
- Session management
- Logout from current device
- Logout from all devices

✅ **Security Features**
- Token-based session tracking
- IP address and user agent logging
- Automatic token refresh
- Protected routes with authentication guards
- Role-based access control (RBAC)
- Secure password requirements (minimum 8 characters)

✅ **Session Management**
- Multiple concurrent sessions support
- Session expiration tracking
- Active session monitoring
- Session revocation

## Installation & Setup

### Backend Setup

1. **Install Dependencies**
   ```bash
   cd backend
   npm install bcryptjs jsonwebtoken
   ```

2. **Configure Environment Variables**
   
   Add the following to your `.env` file:
   ```env
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
   JWT_REFRESH_SECRET=your-super-secret-refresh-token-key-change-this-in-production-min-32-chars
   
   # Server Configuration
   PORT=3000
   ```

   ⚠️ **IMPORTANT**: Change the JWT secrets to strong, random strings in production!

3. **Create Database Tables**
   
   Run the SQL script to create authentication tables and stored procedures:
   ```bash
   mysql -u root -p copems < backend/SQLs/AUTH_CREATE_TABLES.sql
   ```

   This will create:
   - `user_roles` - User role definitions
   - `user_sessions` - Active user sessions
   - `refresh_tokens` - Refresh token storage
   - All necessary stored procedures

4. **Start the Server**
   ```bash
   cd backend
   node index.js
   ```

   Server will run on `http://localhost:3000`

### Frontend Setup

1. **Install Dependencies**
   
   Dependencies are already included in package.json (axios, pinia)

2. **Configure API URL** (Optional)
   
   Create/update `.env` file in frontend:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

3. **Start Development Server**
   ```bash
   cd frontend
   npm run dev
   ```

## API Endpoints

### Public Endpoints (No Authentication Required)

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "password": "SecurePass123",
  "email": "john@example.com",
  "role": "permit_applicant",
  "fullName": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "userId": 1,
    "username": "john_doe",
    "role": "permit_applicant"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "userId": 1,
      "username": "john_doe",
      "role": "permit_applicant"
    }
  }
}
```

#### Refresh Token
```http
POST /api/auth/refresh-token
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Validate Token
```http
POST /api/auth/validate-token
Authorization: Bearer <access_token>
```

### Protected Endpoints (Authentication Required)

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <access_token>
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer <access_token>
```

#### Logout All Devices
```http
POST /api/auth/logout-all
Authorization: Bearer <access_token>
```

#### Change Password
```http
POST /api/auth/change-password
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "currentPassword": "OldPass123",
  "newPassword": "NewSecurePass456"
}
```

#### Get User Sessions
```http
GET /api/auth/sessions
Authorization: Bearer <access_token>
```

## Usage Guide

### Backend Usage

#### Protecting Routes with Middleware

```javascript
import { authenticate, buildingOfficialOnly } from './gb_middlewares/authMiddleware.js';

// Protect route with authentication
app.get('/api/protected', authenticate, (req, res) => {
  res.json({ user: req.user });
});

// Protect route for building officials only
app.get('/api/admin/dashboard', authenticate, buildingOfficialOnly, (req, res) => {
  res.json({ message: 'Admin dashboard' });
});
```

#### Using Authorization Middleware

Available middleware functions:
- `authenticate` - Requires valid JWT token
- `permitApplicantOnly` - Permit applicants only
- `buildingOfficialOnly` - Building officials and super admins only
- `adminOnly` - Same as buildingOfficialOnly
- `optionalAuth` - Attaches user data if token provided, but doesn't require it

### Frontend Usage

#### Using Auth Store in Components

```vue
<script setup>
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

// Login
const login = async () => {
  try {
    await authStore.login('username', 'password');
    router.push('/dashboard');
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Register
const register = async () => {
  try {
    await authStore.register({
      username: 'john_doe',
      password: 'SecurePass123',
      email: 'john@example.com',
      role: 'permit_applicant',
      fullName: 'John Doe'
    });
    router.push('/login');
  } catch (error) {
    console.error('Registration failed:', error);
  }
};

// Logout
const logout = async () => {
  await authStore.logout();
  router.push('/login');
};

// Check authentication status
const isLoggedIn = authStore.isLoggedIn;
const currentUser = authStore.currentUser;
const userRole = authStore.userRole;
</script>
```

#### Using Axios Interceptor

The axios interceptor automatically:
- Adds authentication token to requests
- Refreshes expired tokens
- Redirects to login on authentication failure

```javascript
import apiClient from '@/plugins/axios';

// Make authenticated request
const response = await apiClient.get('/api/protected');
```

#### Using Router Guards

```javascript
import { authGuard, buildingOfficialGuard } from '@/router/guards';

const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
    beforeEnter: authGuard
  },
  {
    path: '/admin',
    component: AdminPanel,
    beforeEnter: buildingOfficialGuard
  }
];
```

## Database Schema

### user_roles
```sql
- role_id (INT, PRIMARY KEY)
- role_name (VARCHAR(50), UNIQUE)
- role_description (VARCHAR(255))
- created_at (TIMESTAMP)
```

### user_sessions
```sql
- session_id (INT, PRIMARY KEY)
- user_id (INT, FOREIGN KEY)
- token_hash (VARCHAR(255))
- ip_address (VARCHAR(45))
- user_agent (TEXT)
- is_active (BOOLEAN)
- created_at (TIMESTAMP)
- expires_at (TIMESTAMP)
- last_activity (TIMESTAMP)
```

### refresh_tokens
```sql
- token_id (INT, PRIMARY KEY)
- user_id (INT, FOREIGN KEY)
- token_hash (VARCHAR(255), UNIQUE)
- session_id (INT, FOREIGN KEY)
- is_revoked (BOOLEAN)
- created_at (TIMESTAMP)
- expires_at (TIMESTAMP)
```

## Security Best Practices

1. **Strong JWT Secrets**: Always use strong, random strings for JWT secrets in production
2. **HTTPS**: Use HTTPS in production to encrypt token transmission
3. **Token Storage**: Frontend stores tokens in localStorage - consider using httpOnly cookies for enhanced security
4. **Password Requirements**: Enforce strong password policies (minimum 8 characters)
5. **Token Expiry**: Access tokens expire after 15 minutes, refresh tokens after 7 days
6. **Session Tracking**: All sessions are tracked with IP and user agent for security auditing

## Troubleshooting

### Common Issues

**Issue**: "Invalid or expired token"
- **Solution**: Token may have expired. The system should automatically refresh it. If not, logout and login again.

**Issue**: "Username already exists"
- **Solution**: Choose a different username during registration.

**Issue**: "CORS errors"
- **Solution**: Ensure CORS is properly configured in backend index.js

**Issue**: "Database connection error"
- **Solution**: Check database credentials in .env file

## File Structure

```
backend/
├── SQLs/
│   └── AUTH_CREATE_TABLES.sql          # Database schema and stored procedures
├── gb_models/
│   └── Auth.js                         # Authentication model
├── gb_services/
│   └── AuthService.js                  # Authentication business logic
├── gb_controllers/
│   └── AuthController.js               # Authentication controllers
├── gb_middlewares/
│   └── authMiddleware.js               # Authentication middleware
├── gb_routes/
│   └── AuthRoute.js                    # Authentication routes
└── index.js                            # Main server file

frontend/
├── src/
│   ├── stores/
│   │   └── auth.js                     # Pinia authentication store
│   ├── plugins/
│   │   └── axios.js                    # Axios interceptor
│   ├── router/
│   │   └── guards.js                   # Router guards
│   ├── pages/
│   │   ├── LoginAuth.vue               # Login page
│   │   └── Register.vue                # Registration page
│   └── components/
│       └── UserProfile.vue             # User profile component
```

## Support

For issues or questions, please contact the development team.

## License

Copyright © 2026 COPEM System. All rights reserved.
