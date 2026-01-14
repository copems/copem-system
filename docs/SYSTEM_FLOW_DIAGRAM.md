# Authentication System Flow Diagram

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                          COPEM Authentication System                  │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────────┐           ┌──────────────────┐          ┌──────────────────┐
│                  │           │                  │          │                  │
│    Frontend      │◄─────────►│     Backend      │◄────────►│    Database      │
│   (Vue.js)       │   HTTP    │   (Express.js)   │   SQL    │   (MariaDB)      │
│                  │           │                  │          │                  │
└──────────────────┘           └──────────────────┘          └──────────────────┘
```

## Registration Flow

```
┌─────────┐        ┌──────────┐       ┌────────────┐      ┌──────────┐
│  User   │        │ Register │       │   Auth     │      │ Database │
│         │        │Component │       │Controller  │      │          │
└────┬────┘        └────┬─────┘       └─────┬──────┘      └────┬─────┘
     │                  │                    │                  │
     │ 1. Fill Form     │                    │                  │
     ├─────────────────>│                    │                  │
     │                  │                    │                  │
     │                  │ 2. POST /register  │                  │
     │                  ├───────────────────>│                  │
     │                  │                    │                  │
     │                  │                    │ 3. Hash Password │
     │                  │                    ├───┐              │
     │                  │                    │   │              │
     │                  │                    │<──┘              │
     │                  │                    │                  │
     │                  │                    │ 4. sp_RegisterUser()
     │                  │                    ├─────────────────>│
     │                  │                    │                  │
     │                  │                    │ 5. User Created  │
     │                  │                    │<─────────────────┤
     │                  │                    │                  │
     │                  │ 6. Success         │                  │
     │                  │<───────────────────┤                  │
     │                  │                    │                  │
     │ 7. Redirect to   │                    │                  │
     │    Login         │                    │                  │
     │<─────────────────┤                    │                  │
     │                  │                    │                  │
```

## Login & Token Flow

```
┌─────────┐     ┌──────────┐    ┌────────────┐   ┌──────────┐   ┌──────────┐
│  User   │     │  Login   │    │   Auth     │   │   Auth   │   │ Database │
│         │     │Component │    │Controller  │   │ Service  │   │          │
└────┬────┘     └────┬─────┘    └─────┬──────┘   └────┬─────┘   └────┬─────┘
     │               │                 │               │              │
     │ 1. Submit     │                 │               │              │
     │    Credentials│                 │               │              │
     ├──────────────>│                 │               │              │
     │               │                 │               │              │
     │               │ 2. POST /login  │               │              │
     │               ├────────────────>│               │              │
     │               │                 │               │              │
     │               │                 │ 3. Validate   │              │
     │               │                 ├──────────────>│              │
     │               │                 │               │              │
     │               │                 │               │4.Get User    │
     │               │                 │               ├─────────────>│
     │               │                 │               │              │
     │               │                 │               │5.User Data   │
     │               │                 │               │<─────────────┤
     │               │                 │               │              │
     │               │                 │               │6.Compare PWD │
     │               │                 │               ├──┐           │
     │               │                 │               │  │           │
     │               │                 │               │<─┘           │
     │               │                 │               │              │
     │               │                 │               │7.Generate    │
     │               │                 │               │  Tokens      │
     │               │                 │               ├──┐           │
     │               │                 │               │  │           │
     │               │                 │               │<─┘           │
     │               │                 │               │              │
     │               │                 │               │8.Save Session│
     │               │                 │               ├─────────────>│
     │               │                 │               │              │
     │               │                 │9.Return Tokens│              │
     │               │                 │<──────────────┤              │
     │               │                 │               │              │
     │               │10.Tokens & User │               │              │
     │               │<────────────────┤               │              │
     │               │                 │               │              │
     │               │11.Store Tokens  │               │              │
     │               │   in localStorage                              │
     │               ├──┐              │               │              │
     │               │  │              │               │              │
     │               │<─┘              │               │              │
     │               │                 │               │              │
     │12.Navigate to │                 │               │              │
     │   Dashboard   │                 │               │              │
     │<──────────────┤                 │               │              │
     │               │                 │               │              │
```

## Protected Route Access

```
┌─────────┐    ┌──────────┐    ┌─────────┐    ┌────────────┐   ┌──────────┐
│  User   │    │  Axios   │    │ Router  │    │   Auth     │   │ Database │
│         │    │Interceptor    │  Guard  │    │Middleware  │   │          │
└────┬────┘    └────┬─────┘    └────┬────┘    └─────┬──────┘   └────┬─────┘
     │              │               │               │              │
     │1.Navigate to │               │               │              │
     │  /dashboard  │               │               │              │
     ├─────────────>│               │               │              │
     │              │               │               │              │
     │              │2.Check Auth   │               │              │
     │              ├──────────────>│               │              │
     │              │               │               │              │
     │              │               │3.Has Token?   │              │
     │              │               ├──┐            │              │
     │              │               │  │            │              │
     │              │               │<─┘            │              │
     │              │               │               │              │
     │              │4.Allow        │               │              │
     │              │<──────────────┤               │              │
     │              │               │               │              │
     │              │5.GET /api/data│               │              │
     │              │   + Bearer Token              │              │
     │              ├──────────────────────────────>│              │
     │              │               │               │              │
     │              │               │               │6.Validate    │
     │              │               │               │  Token       │
     │              │               │               ├─────────────>│
     │              │               │               │              │
     │              │               │               │7.Valid       │
     │              │               │               │<─────────────┤
     │              │               │               │              │
     │              │               │8.Data         │              │
     │              │<──────────────────────────────┤              │
     │              │               │               │              │
     │9.Display Data│               │               │              │
     │<─────────────┤               │               │              │
     │              │               │               │              │
```

## Token Refresh Flow

```
┌─────────┐    ┌──────────┐    ┌────────────┐   ┌──────────┐
│  User   │    │  Axios   │    │   Auth     │   │ Database │
│         │    │Interceptor    │Controller  │   │          │
└────┬────┘    └────┬─────┘    └─────┬──────┘   └────┬─────┘
     │              │                 │              │
     │1.API Request │                 │              │
     ├─────────────>│                 │              │
     │              │                 │              │
     │              │2.401 Unauthorized              │
     │              │<────────────────┴──────────────┤
     │              │                 │              │
     │              │3.POST /refresh-token           │
     │              │   + Refresh Token              │
     │              ├────────────────>│              │
     │              │                 │              │
     │              │                 │4.Validate    │
     │              │                 │  Refresh Token
     │              │                 ├─────────────>│
     │              │                 │              │
     │              │                 │5.Token Valid │
     │              │                 │<─────────────┤
     │              │                 │              │
     │              │                 │6.Generate New│
     │              │                 │  Access Token│
     │              │                 ├──┐           │
     │              │                 │  │           │
     │              │                 │<─┘           │
     │              │                 │              │
     │              │7.New Token      │              │
     │              │<────────────────┤              │
     │              │                 │              │
     │              │8.Store New Token│              │
     │              ├──┐              │              │
     │              │  │              │              │
     │              │<─┘              │              │
     │              │                 │              │
     │              │9.Retry Original │              │
     │              │  Request        │              │
     │              ├─────────────────────────────────>
     │              │                 │              │
     │              │10.Success       │              │
     │              │<─────────────────────────────────
     │              │                 │              │
     │11.Data       │                 │              │
     │<─────────────┤                 │              │
     │              │                 │              │
```

## Role-Based Access Control

```
┌─────────────────────────────────────────────────────────────┐
│                    User Roles Hierarchy                      │
└─────────────────────────────────────────────────────────────┘

                    ┌──────────────┐
                    │ Super Admin  │
                    │  (Full Access)
                    └──────┬───────┘
                           │
                           │
            ┌──────────────┴──────────────┐
            │                             │
    ┌───────▼────────┐          ┌────────▼────────┐
    │Building Official          │ Permit Applicant│
    │ (Admin Access) │          │ (User Access)   │
    └───────┬────────┘          └────────┬────────┘
            │                             │
            │                             │
    ┌───────▼────────┐          ┌────────▼────────┐
    │ Can:           │          │ Can:            │
    │ - Approve      │          │ - Apply         │
    │ - Reject       │          │ - View own      │
    │ - View all     │          │ - Update own    │
    │ - Manage users │          │ - Submit docs   │
    │ - Reports      │          │                 │
    └────────────────┘          └─────────────────┘
```

## Database Schema Relationships

```
┌──────────────┐
│ user_account │
│              │
│ - user_id PK │◄──────────┐
│ - username   │            │
│ - password   │            │
│ - role       │            │
└──────────────┘            │
                            │
                            │
                   ┌────────┴────────┐
                   │                 │
          ┌────────▼──────┐  ┌───────▼────────┐
          │user_sessions  │  │refresh_tokens  │
          │               │  │                │
          │- session_id PK│  │- token_id PK   │
          │- user_id FK   │◄─┤- user_id FK    │
          │- token_hash   │  │- session_id FK │
          │- ip_address   │  │- token_hash    │
          │- user_agent   │  │- is_revoked    │
          │- is_active    │  │- expires_at    │
          │- expires_at   │  └────────────────┘
          └───────────────┘
```

## Token Lifecycle

```
┌────────────────────────────────────────────────────────┐
│              Token Lifecycle Timeline                   │
└────────────────────────────────────────────────────────┘

Login
  │
  ├── Access Token Generated (15 min expiry)
  │   │
  │   ├── [0-14 min] Valid, can access protected routes
  │   │
  │   └── [15 min] Expires
  │       │
  │       └── Auto-refresh via interceptor
  │           │
  │           └── New Access Token (15 min)
  │
  └── Refresh Token Generated (7 days expiry)
      │
      ├── [0-6 days] Valid, can refresh access token
      │
      └── [7 days] Expires
          │
          └── User must login again
```

## Security Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    Security Layers                           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Layer 1: Password Security              │
│ - bcryptjs hashing (10 salt rounds)     │
│ - Minimum 8 characters                  │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│ Layer 2: JWT Tokens                     │
│ - Access token (15 min)                 │
│ - Refresh token (7 days)                │
│ - SHA256 token hashing for storage      │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│ Layer 3: Session Management             │
│ - Session tracking                      │
│ - IP address logging                    │
│ - User agent logging                    │
│ - Session expiration                    │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│ Layer 4: Authorization                  │
│ - Role-based access control (RBAC)      │
│ - Route-level protection                │
│ - Endpoint-level protection             │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│ Layer 5: Database Security              │
│ - Stored procedures                     │
│ - Parameterized queries                 │
│ - Foreign key constraints               │
└─────────────────────────────────────────┘
```

## File Structure Map

```
web-applicant/
├── backend/
│   ├── SQLs/
│   │   └── AUTH_CREATE_TABLES.sql ─────┐
│   ├── gb_models/                       │ Database
│   │   └── Auth.js ─────────────────────┤ Layer
│   ├── gb_services/                     │
│   │   └── AuthService.js ──────────────┘
│   ├── gb_controllers/
│   │   └── AuthController.js ───────────┐
│   ├── gb_middlewares/                  │ Business
│   │   └── authMiddleware.js ───────────┤ Logic
│   ├── gb_routes/                       │ Layer
│   │   └── AuthRoute.js ────────────────┘
│   └── index.js ────────────────────────── Entry Point
│
└── frontend/
    └── src/
        ├── stores/
        │   └── auth.js ─────────────────┐
        ├── plugins/                     │ State
        │   └── axios.js ────────────────┤ Management
        ├── router/                      │
        │   └── guards.js ───────────────┘
        ├── pages/
        │   ├── LoginAuth.vue ───────────┐
        │   └── Register.vue ────────────┤ UI
        └── components/                  │ Components
            └── UserProfile.vue ─────────┘
```

---

**Legend:**
- `─>` : Flow direction
- `◄─►` : Bidirectional communication
- `PK`  : Primary Key
- `FK`  : Foreign Key
- `┌─┐` : Component/Layer boundary
