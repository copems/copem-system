# Account Type Refactoring

## Overview
The `account_type` field in the `User_Account` table has been refactored from string-based roles to numeric values for better performance and consistency.

## Account Type Mapping

| Value | Role Name  | Description                           |
|-------|-----------|---------------------------------------|
| 0     | admin     | System administrator with full access |
| 1     | evaluator | Evaluates permit applications         |
| 2     | inspector | Inspects construction sites           |
| 3     | applicant | Permit applicant (default)            |

## Migration

### Running the Migration

To migrate your existing database:

```bash
cd web-applicant/backend
node migrate-account-type-to-numeric.js
```

This script will:
1. Convert the `account_type` column to INTEGER
2. Map existing string roles to numeric values:
   - `'super_admin'`, `'admin'`, `'building_official'` → `0`
   - `'evaluator'` → `1`
   - `'inspector'` → `2`
   - `'permit_applicant'`, `'applicant'` → `3`
3. Verify the migration

### Database Schema Changes

**Before:**
```sql
account_type VARCHAR(50) DEFAULT 'permit_applicant'
```

**After:**
```sql
account_type INTEGER DEFAULT 3
```

## Code Changes

### Role Utilities

A new utility module has been created at [`gb_services/roleUtils.js`](gb_services/roleUtils.js):

```javascript
import { ROLES, roleTypeToName, roleNameToType, isAdmin, isStaff } from './gb_services/roleUtils.js';

// Constants
ROLES.ADMIN      // 0
ROLES.EVALUATOR  // 1
ROLES.INSPECTOR  // 2
ROLES.APPLICANT  // 3

// Convert between formats
roleNameToType('admin')  // Returns: 0
roleTypeToName(3)        // Returns: 'applicant'

// Role checking
isAdmin(0)        // true
isStaff(1)        // true (evaluator is staff)
isApplicant(3)    // true
```

### Authentication Service

The `AuthService` now:
- Accepts both numeric and legacy string role values
- Returns both `accountType` (numeric) and `role` (string) for backward compatibility
- Validates account types using `isValidAccountType()`

**Example:**
```javascript
// Register with numeric type
await AuthService.register({
    username: 'user@example.com',
    password: 'SecurePass123!',
    role: 3  // or ROLES.APPLICANT
});

// Register with legacy string (still supported)
await AuthService.register({
    username: 'user@example.com',
    password: 'SecurePass123!',
    role: 'permit_applicant'  // Automatically converted to 3
});
```

### Middleware Updates

New middleware functions are available:

```javascript
import { 
    authenticate,
    authorize,
    adminOnly,
    evaluatorOnly,
    inspectorOnly,
    staffOnly,
    permitApplicantOnly
} from './gb_middlewares/authMiddleware.js';

// Specific role
router.post('/evaluate', authenticate, evaluatorOnly, handleEvaluate);

// Multiple roles
router.get('/reports', authenticate, authorize(ROLES.ADMIN, ROLES.EVALUATOR), getReports);

// Staff only (admin, evaluator, or inspector)
router.get('/staff-dashboard', authenticate, staffOnly, getDashboard);
```

### Stored Procedures

All stored procedures have been updated:

**`sp_RegisterUser`:**
```sql
CALL sp_RegisterUser(
    'user@example.com',     -- username
    'hashed_password',      -- password_hash
    'user@example.com',     -- email
    3,                      -- account_type (numeric)
    'John Doe'              -- full_name
);
```

**`sp_AuthenticateUser`:**
```sql
CALL sp_AuthenticateUser('user@example.com');
-- Returns: user_id, username, user_password, account_type (numeric)
```

## Backward Compatibility

The system maintains backward compatibility:

1. **Legacy string roles are accepted** in registration and will be converted automatically
2. **JWT tokens include both formats:**
   ```json
   {
     "userId": 123,
     "username": "user@example.com",
     "accountType": 3,
     "role": "applicant"
   }
   ```
3. **Middleware supports both:**
   ```javascript
   // Both work
   authorize(ROLES.ADMIN)          // Numeric
   authorize('admin')              // Legacy string
   ```

## Testing

### Test Scripts Updated

All test and setup scripts have been updated:

- `create-test-user.js` - Creates users with numeric account types
- `create-applicant-accounts.js` - Creates applicants with `account_type = 3`
- `setup-db.js` - Uses numeric account types
- `update-test-user.js` - Updates to numeric format

### Creating Test Users

```bash
# Create test applicant accounts
node create-applicant-accounts.js

# Create general test user
node create-test-user.js
```

## API Changes

### Registration Endpoint

**Request:**
```json
POST /api/auth/register
{
  "username": "user@example.com",
  "password": "SecurePass123!",
  "email": "user@example.com",
  "role": 3,  // Can be numeric or string
  "fullName": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "userId": 123,
    "username": "user@example.com",
    "accountType": 3,
    "role": "applicant"
  }
}
```

### Login Endpoint

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJ...",
    "refreshToken": "eyJ...",
    "user": {
      "userId": 123,
      "username": "user@example.com",
      "accountType": 3,
      "role": "applicant"
    }
  }
}
```

## Best Practices

1. **Use numeric values** for new code:
   ```javascript
   import { ROLES } from './gb_services/roleUtils.js';
   
   // Good
   if (user.accountType === ROLES.ADMIN) { ... }
   
   // Avoid (legacy support only)
   if (user.role === 'admin') { ... }
   ```

2. **Use role utility functions:**
   ```javascript
   import { isAdmin, isStaff } from './gb_services/roleUtils.js';
   
   if (isAdmin(user.accountType)) { ... }
   if (isStaff(user.accountType)) { ... }
   ```

3. **Leverage middleware helpers:**
   ```javascript
   // Instead of authorize(0, 1, 2)
   router.get('/staff-only', authenticate, staffOnly, handler);
   ```

## Troubleshooting

### Migration Issues

If you encounter issues after migration:

1. **Check existing data:**
   ```sql
   SELECT account_type, COUNT(*) 
   FROM user_account 
   GROUP BY account_type;
   ```

2. **Verify column type:**
   ```sql
   DESCRIBE user_account;
   ```

3. **Re-run migration if needed:**
   ```bash
   node migrate-account-type-to-numeric.js
   ```

### Authentication Issues

If users can't log in after migration:

1. Ensure stored procedures are updated (run `migrate-auth-v2.js`)
2. Check that JWT tokens include `accountType`
3. Verify middleware is using the updated version

## Related Files

- **Migration:** `migrate-account-type-to-numeric.js`
- **Utilities:** `gb_services/roleUtils.js`
- **Service:** `gb_services/authService.js`
- **Model:** `gb_models/Auth.js`
- **Middleware:** `gb_middlewares/authMiddleware.js`
- **Controller:** `gb_controllers/AuthController.js`
- **SQL:** `SQLs/BPA_CREATE_TABLES.sql`, `migrate-auth-v2.js`

## Summary

This refactoring:
- ✅ Improves performance (INTEGER vs VARCHAR comparison)
- ✅ Reduces storage requirements
- ✅ Simplifies role management
- ✅ Maintains backward compatibility
- ✅ Adds new role types (evaluator, inspector)
- ✅ Provides better type safety
