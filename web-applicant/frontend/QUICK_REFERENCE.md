# 🚀 Quick Reference - Permit Applicant Store

## Import
```javascript
import { usePermitApplicantStore } from '@/stores/permitApplicant';
```

## Basic Setup
```vue
<script setup>
const permitApplicantStore = usePermitApplicantStore();

// Fetch data on mount
onMounted(async () => {
  await permitApplicantStore.fetchCurrentApplicant();
});
</script>
```

## Common Operations

### Fetch Current User's Data
```javascript
await permitApplicantStore.fetchCurrentApplicant();
```

### Force Refresh (Bypass Cache)
```javascript
await permitApplicantStore.fetchCurrentApplicant(true);
```

### Create New Applicant
```javascript
await permitApplicantStore.createApplicant({
  user_id: 1,
  lastname: 'Doe',
  firstname: 'John',
  middlename: 'M',
  contact_no: '09171234567',
  tin_no: '123-456-789-000',
  brgy_code: 'BRG001',
  house_no: '123',
  street: 'Main Street'
});
```

### Update Applicant
```javascript
await permitApplicantStore.updateApplicant(applicantId, {
  contact_no: '09999999999',
  street: 'New Street'
});
```

## Accessing Data

### In Template
```vue
<template>
  <div>
    <h2>{{ permitApplicantStore.fullName }}</h2>
    <p>{{ permitApplicantStore.fullAddress }}</p>
    <p>{{ permitApplicantStore.applicant.contact_no }}</p>
  </div>
</template>
```

### In Script
```javascript
const applicant = permitApplicantStore.applicant;
const fullName = permitApplicantStore.fullName;
const isLoaded = permitApplicantStore.hasApplicantData;
```

## State Checks

```javascript
// Loading state
if (permitApplicantStore.loading) { /* show spinner */ }

// Error state
if (permitApplicantStore.error) { /* show error */ }

// Has data
if (permitApplicantStore.hasApplicantData) { /* show data */ }

// Needs refresh (5+ minutes old)
if (permitApplicantStore.needsRefresh) { /* refresh */ }
```

## Complete Component Example

```vue
<template>
  <div>
    <v-progress-circular v-if="store.loading" indeterminate />
    <v-alert v-else-if="store.error" type="error">{{ store.error }}</v-alert>
    <div v-else-if="store.hasApplicantData">
      <h1>{{ store.fullName }}</h1>
      <p>{{ store.fullAddress }}</p>
      <p>{{ store.applicant.contact_no }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { usePermitApplicantStore } from '@/stores/permitApplicant';

const store = usePermitApplicantStore();

onMounted(async () => {
  await store.fetchCurrentApplicant();
});
</script>
```

## API Endpoints Created

```
GET    /api/permit-applicant              - Get all applicants
GET    /api/permit-applicant/:id          - Get by applicant ID
GET    /api/permit-applicant/user/:userId - Get by user ID
POST   /api/permit-applicant              - Create new applicant
PUT    /api/permit-applicant/:id          - Update applicant
```

## Mock Data Script

```bash
cd c:\copem-system\web-applicant\backend
node create-mock-permit-applicants.js
```

## Test API

```bash
# Get all
curl http://localhost:3000/api/permit-applicant

# Get by ID
curl http://localhost:3000/api/permit-applicant/1

# Get by user ID
curl http://localhost:3000/api/permit-applicant/user/1
```

## React Context Equivalent

**React:**
```jsx
const applicantData = useContext(ApplicantContext);
```

**Vue (Pinia):**
```javascript
const permitApplicantStore = usePermitApplicantStore();
```

✨ **That's it! Much simpler than React Context!** ✨
