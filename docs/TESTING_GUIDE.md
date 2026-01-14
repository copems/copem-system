# Authentication System Testing Guide

## Quick Start Testing

### 1. Database Setup

First, create the database tables and stored procedures:

```bash
# Login to MySQL
mysql -u root -p

# Use the copems database
USE copems;

# Run the authentication SQL script
SOURCE backend/SQLs/AUTH_CREATE_TABLES.sql;

# Verify tables were created
SHOW TABLES;
# Should show: user_roles, user_sessions, refresh_tokens

# Verify roles were inserted
SELECT * FROM user_roles;
```

### 2. Start Backend Server

```bash
cd backend
node index.js
```

Expected output:
```
Server is running on port 3000
http://localhost:3000
```

### 3. Start Frontend Server

```bash
cd frontend
npm run dev
```

## API Testing with cURL/Postman

### Test 1: Register a Permit Applicant

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_applicant",
    "password": "TestPass123",
    "email": "john@example.com",
    "role": "permit_applicant",
    "fullName": "John Applicant"
  }'
```

Expected Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "userId": 1,
    "username": "john_applicant",
    "role": "permit_applicant"
  }
}
```

### Test 2: Register a Building Official

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin_official",
    "password": "AdminPass123",
    "email": "admin@copems.gov",
    "role": "building_official",
    "fullName": "Admin Official"
  }'
```

### Test 3: Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_applicant",
    "password": "TestPass123"
  }'
```

Expected Response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "userId": 1,
      "username": "john_applicant",
      "role": "permit_applicant"
    }
  }
}
```

**IMPORTANT**: Save the `accessToken` for the next tests!

### Test 4: Get Current User (Protected Route)

```bash
# Replace <ACCESS_TOKEN> with the token from login response
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

Expected Response:
```json
{
  "success": true,
  "data": {
    "userId": 1,
    "username": "john_applicant",
    "role": "permit_applicant"
  }
}
```

### Test 5: Validate Token

```bash
curl -X POST http://localhost:3000/api/auth/validate-token \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### Test 6: Get Active Sessions

```bash
curl -X GET http://localhost:3000/api/auth/sessions \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### Test 7: Change Password

```bash
curl -X POST http://localhost:3000/api/auth/change-password \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "currentPassword": "TestPass123",
    "newPassword": "NewTestPass456"
  }'
```

### Test 8: Refresh Token

```bash
# Replace <REFRESH_TOKEN> with the refreshToken from login response
curl -X POST http://localhost:3000/api/auth/refresh-token \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "<REFRESH_TOKEN>"
  }'
```

### Test 9: Logout

```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### Test 10: Logout All Devices

```bash
curl -X POST http://localhost:3000/api/auth/logout-all \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

## Frontend Testing

### 1. Registration Flow

1. Navigate to `http://localhost:5173/register` (or your frontend port)
2. Fill in the registration form:
   - Username: `test_user1`
   - Full Name: `Test User One`
   - Email: `test1@example.com`
   - Account Type: `Permit Applicant`
   - Password: `TestPass123`
   - Confirm Password: `TestPass123`
3. Check "I agree to the terms and conditions"
4. Click "Register"
5. You should be redirected to login page with success message

### 2. Login Flow

1. Navigate to `http://localhost:5173/login-auth`
2. Enter credentials:
   - Username: `test_user1`
   - Password: `TestPass123`
3. Click "Login"
4. You should be redirected to the dashboard

### 3. Profile Management

1. After login, navigate to `/profile` (if route exists)
2. View your user information
3. Test password change:
   - Enter current password
   - Enter new password (min 8 chars)
   - Confirm new password
   - Click "Change Password"
4. You should be logged out and redirected to login

### 4. Session Management

1. Login from multiple browsers/devices
2. View active sessions in your profile
3. Test "Logout All Devices" functionality

## Error Testing

### Test Invalid Credentials

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_applicant",
    "password": "WrongPassword"
  }'
```

Expected Response:
```json
{
  "success": false,
  "message": "Invalid username or password"
}
```

### Test Duplicate Username

```bash
# Try to register with existing username
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_applicant",
    "password": "TestPass123",
    "role": "permit_applicant"
  }'
```

Expected Response:
```json
{
  "success": false,
  "message": "Username already exists"
}
```

### Test Invalid Token

```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer invalid-token-here"
```

Expected Response:
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

### Test Unauthorized Access

```bash
# Try to access protected route without token
curl -X GET http://localhost:3000/api/auth/me
```

Expected Response:
```json
{
  "success": false,
  "message": "Access token is required"
}
```

## Database Verification

### Check User Creation

```sql
SELECT * FROM user_account WHERE username = 'john_applicant';
```

### Check Session Creation

```sql
SELECT * FROM user_sessions WHERE user_id = 1;
```

### Check Refresh Tokens

```sql
SELECT * FROM refresh_tokens WHERE user_id = 1;
```

### Check Active Sessions

```sql
SELECT s.*, u.username 
FROM user_sessions s
JOIN user_account u ON s.user_id = u.user_id
WHERE s.is_active = TRUE 
AND s.expires_at > NOW();
```

## Security Testing

### Test 1: Password Strength

Try to register with weak password:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "weak_user",
    "password": "123",
    "role": "permit_applicant"
  }'
```

Should fail with: "Password must be at least 8 characters long"

### Test 2: SQL Injection Protection

Try SQL injection in username:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{
    \"username\": \"admin' OR '1'='1\",
    \"password\": \"anything\"
  }"
```

Should fail with invalid credentials (not SQL error)

### Test 3: Token Expiration

1. Login and get access token
2. Wait 16 minutes (token expires after 15 minutes)
3. Try to use expired token
4. Should receive "Invalid or expired token" error
5. Use refresh token to get new access token

## Performance Testing

### Test Concurrent Logins

Create a simple script to test multiple simultaneous logins:

```javascript
// test-concurrent-logins.js
const axios = require('axios');

async function testConcurrentLogins() {
  const promises = [];
  
  for (let i = 0; i < 10; i++) {
    promises.push(
      axios.post('http://localhost:3000/api/auth/login', {
        username: 'john_applicant',
        password: 'TestPass123'
      })
    );
  }
  
  const results = await Promise.all(promises);
  console.log(`${results.length} concurrent logins successful`);
}

testConcurrentLogins();
```

## Troubleshooting

### Issue: "Cannot find module"

**Solution**: Make sure all dependencies are installed:
```bash
cd backend
npm install
```

### Issue: "Database connection error"

**Solution**: 
1. Check MySQL is running
2. Verify credentials in `.env` file
3. Ensure database `copems` exists

### Issue: "JWT_SECRET is not defined"

**Solution**: Make sure `.env` file has JWT secrets:
```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
JWT_REFRESH_SECRET=your-super-secret-refresh-token-key-change-this-in-production-min-32-chars
```

### Issue: Token not being sent with requests

**Solution**: Check axios interceptor is imported in your frontend

### Issue: CORS errors

**Solution**: Make sure CORS is configured in `backend/index.js`:
```javascript
app.use(cors());
```

## Test Checklist

- [ ] Database tables created successfully
- [ ] Backend server starts without errors
- [ ] Frontend server starts without errors
- [ ] User registration works for permit applicants
- [ ] User registration works for building officials
- [ ] Login returns valid tokens
- [ ] Protected routes require authentication
- [ ] Token refresh works correctly
- [ ] Password change works and logs out user
- [ ] Logout invalidates session
- [ ] Logout all devices works
- [ ] Invalid credentials are rejected
- [ ] Duplicate usernames are rejected
- [ ] Weak passwords are rejected
- [ ] Expired tokens are handled correctly
- [ ] Multiple sessions can be tracked
- [ ] Frontend login redirects correctly
- [ ] Frontend registration redirects to login
- [ ] Router guards protect routes
- [ ] Role-based access control works

## Next Steps

After testing, consider:

1. **Add rate limiting** to prevent brute force attacks
2. **Implement password reset** functionality
3. **Add email verification** for new registrations
4. **Set up 2FA** (Two-Factor Authentication)
5. **Add audit logging** for security events
6. **Implement account lockout** after failed login attempts
7. **Add CAPTCHA** to prevent bot attacks
8. **Set up monitoring** for suspicious activities
