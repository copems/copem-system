# Routing Structure

This application uses file-based routing with layouts via `vite-plugin-vue-layouts-next`.

## Route Organization

### Public Routes (Default Layout)
Routes that don't require authentication use the `default` layout (no header):

- `/` - Landing page
- `/auth/login` - Login page
- `/auth/forgot-pw` - Forgot password page

### Applicant Routes (ApplicantLayout)
Routes for authenticated applicants use the `ApplicantLayout` (with header):

- `/applicant/dashboard` - Applicant dashboard

## Layouts

### default.vue
- Minimal layout without header
- Used for public-facing pages (landing, login, etc.)
- Just renders `<router-view />` within `<v-main>`

### ApplicantLayout.vue
- Includes the Header component with:
  - CoPeMS branding
  - User profile with dropdown
  - Logout functionality
- Used for authenticated applicant pages

## Adding New Routes

### Public Route (No Authentication)
1. Create file in `src/pages/` or `src/pages/auth/`
2. Add route metadata in the component:
   ```vue
   <script setup>
   definePage({
     meta: {
       layout: 'default',
     },
   })
   </script>
   ```

### Applicant Route (Requires Authentication)
1. Create file in `src/pages/applicant/`
2. Add route metadata in the component:
   ```vue
   <script setup>
   definePage({
     meta: {
       layout: 'ApplicantLayout',
     },
   })
   </script>
   ```

## Authentication Guard

The router includes a navigation guard that:
- Redirects unauthenticated users from `/applicant/*` routes to `/auth/login`
- Redirects authenticated users from login pages to `/applicant/dashboard`
- Checks for `accessToken` in localStorage to determine authentication status

## File-Based Routing

The router automatically generates routes from the `src/pages` directory:
- `src/pages/index.vue` → `/`
- `src/pages/auth/login.vue` → `/auth/login`
- `src/pages/applicant/dashboard.vue` → `/applicant/dashboard`
