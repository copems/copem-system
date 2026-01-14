# Permit Applicant System - Complete Implementation Guide

This guide covers the complete implementation of permit applicant data management with mock data, API integration, and global state management (Vue's equivalent to React Context).

## 📁 Files Created

### Backend Files
1. **`backend/create-mock-permit-applicants.js`** - Mock data generator script
2. **`backend/MOCK_PERMIT_APPLICANTS_README.md`** - Documentation for mock data

### Backend Updates
3. **`backend/gb_controllers/PermitApplicantController.js`** - Added:
   - `getPermitApplicantByUserId()` - Get applicant by user ID
   - `getAllPermitApplicants()` - Get all applicants

4. **`backend/gb_routes/PermitApplicantRoute.js`** - Added routes:
   - `GET /api/permit-applicant` - Get all permit applicants
   - `GET /api/permit-applicant/user/:userId` - Get by user ID
   - `GET /api/permit-applicant/:id` - Get by applicant ID
   - `POST /api/permit-applicant` - Create new applicant
   - `PUT /api/permit-applicant/:id` - Update applicant

### Frontend Files
5. **`frontend/src/services/permitApplicantService.js`** - API service for permit applicants
6. **`frontend/src/stores/permitApplicant.js`** - Pinia store (Vue Context equivalent)
7. **`frontend/src/composables/useStoreInit.js`** - Store initialization helper
8. **`frontend/src/components/PermitApplicantInfo.vue`** - Example component
9. **`frontend/src/stores/PERMITAPPLICANT_STORE_USAGE.md`** - Usage documentation
10. **`frontend/src/stores/USAGE_EXAMPLES.js`** - Comprehensive examples

---

## 🚀 Quick Start Guide

### Step 1: Create Mock Data

```bash
# Navigate to backend directory
cd c:\copem-system\web-applicant\backend

# Run the mock data generator
node create-mock-permit-applicants.js
```

**Expected Output:**
```
🚀 Starting mock permit applicant creation...
✅ Created permit applicant: Juan Dela Cruz (ID: 1)
✅ Created permit applicant: Maria Garcia (ID: 2)
...
🎉 Successfully created all mock permit applicants!
```

### Step 2: Test API Endpoints

```bash
# Get all permit applicants
curl http://localhost:3000/api/permit-applicant

# Get by applicant ID
curl http://localhost:3000/api/permit-applicant/1

# Get by user ID
curl http://localhost:3000/api/permit-applicant/user/1
```

### Step 3: Use in Frontend Components

```vue
<script setup>
import { onMounted } from 'vue';
import { usePermitApplicantStore } from '@/stores/permitApplicant';

const permitApplicantStore = usePermitApplicantStore();

onMounted(async () => {
  // Fetch current user's applicant data
  await permitApplicantStore.fetchCurrentApplicant();
});
</script>

<template>
  <div>
    <h2>{{ permitApplicantStore.fullName }}</h2>
    <p>{{ permitApplicantStore.fullAddress }}</p>
  </div>
</template>
```

---

## 🏗️ Architecture Overview

### Backend Structure
```
backend/
├── gb_controllers/
│   └── PermitApplicantController.js   # Business logic
├── gb_routes/
│   └── PermitApplicantRoute.js        # API routes
└── create-mock-permit-applicants.js   # Mock data script
```

### Frontend Structure
```
frontend/src/
├── services/
│   └── permitApplicantService.js      # API calls
├── stores/
│   └── permitApplicant.js             # Global state (Context)
├── composables/
│   └── useStoreInit.js                # Store initialization
└── components/
    └── PermitApplicantInfo.vue        # Example component
```

---

## 🎯 Key Features

### 1. **Mock Data Generator**
- Creates 5 sample permit applicants
- Uses stored procedure: `sp_InsertPermitApplicant`
- Easy to customize with more data

### 2. **Complete API Coverage**
- ✅ Create permit applicant
- ✅ Get by applicant ID
- ✅ Get by user ID
- ✅ Update applicant
- ✅ Get all applicants

### 3. **Global State Management (Vue Context)**
The Pinia store provides React Context-like functionality:

**React Context:**
```jsx
const ApplicantContext = createContext();
const applicantData = useContext(ApplicantContext);
```

**Vue Pinia (Simpler!):**
```javascript
const permitApplicantStore = usePermitApplicantStore();
```

### 4. **Built-in Features**
- ✅ Auto-caching (5-minute cache)
- ✅ Loading states
- ✅ Error handling
- ✅ Computed properties (fullName, fullAddress)
- ✅ Force refresh capability
- ✅ Integration with Auth store

---

## 📚 Common Use Cases

### Use Case 1: Display User Profile
```vue
<script setup>
import { usePermitApplicantStore } from '@/stores/permitApplicant';

const store = usePermitApplicantStore();
await store.fetchCurrentApplicant();
</script>

<template>
  <div>
    <h1>{{ store.fullName }}</h1>
    <p>Contact: {{ store.applicant.contact_no }}</p>
    <p>TIN: {{ store.applicant.tin_no }}</p>
    <p>Address: {{ store.fullAddress }}</p>
  </div>
</template>
```

### Use Case 2: Update Profile
```javascript
const store = usePermitApplicantStore();

await store.updateApplicant(applicantId, {
  contact_no: '09123456789',
  street: 'New Street Address'
});

// Data automatically refreshed!
```

### Use Case 3: Create New Applicant
```javascript
const authStore = useAuthStore();
const permitStore = usePermitApplicantStore();

await permitStore.createApplicant({
  user_id: authStore.user.userId,
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

### Use Case 4: Router Guard
```javascript
// Ensure user has completed profile before accessing page
import { usePermitApplicantStore } from '@/stores/permitApplicant';

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresProfile) {
    const store = usePermitApplicantStore();
    await store.fetchCurrentApplicant();
    
    if (!store.hasApplicantData) {
      return next('/complete-profile');
    }
  }
  next();
});
```

---

## 🔧 API Reference

### Store Actions

| Action | Description | Parameters |
|--------|-------------|------------|
| `fetchCurrentApplicant(forceRefresh)` | Get current user's data | `forceRefresh: boolean` |
| `fetchApplicantById(id)` | Get by applicant ID | `id: number` |
| `createApplicant(data)` | Create new applicant | `data: Object` |
| `updateApplicant(id, data)` | Update applicant | `id: number, data: Object` |
| `fetchAllApplicants()` | Get all applicants | - |
| `clearApplicant()` | Clear store data | - |

### Store Getters

| Getter | Description | Returns |
|--------|-------------|---------|
| `hasApplicantData` | Check if data loaded | `boolean` |
| `fullName` | Get full name | `string` |
| `fullAddress` | Get full address | `string` |
| `needsRefresh` | Check if cache expired | `boolean` |

### Store State

| State | Description | Type |
|-------|-------------|------|
| `applicant` | Current applicant data | `Object \| null` |
| `applicants` | List of all applicants | `Array` |
| `loading` | Loading state | `boolean` |
| `creating` | Creating state | `boolean` |
| `updating` | Updating state | `boolean` |
| `error` | Error message | `string \| null` |

---

## 🎨 React vs Vue Comparison

### React Context Pattern
```jsx
// 1. Create context
const ApplicantContext = createContext();

// 2. Create provider component
function ApplicantProvider({ children }) {
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const fetchApplicant = async () => {
    setLoading(true);
    const data = await api.getApplicant();
    setApplicant(data);
    setLoading(false);
  };
  
  return (
    <ApplicantContext.Provider value={{ applicant, loading, fetchApplicant }}>
      {children}
    </ApplicantContext.Provider>
  );
}

// 3. Wrap app with provider
<ApplicantProvider>
  <App />
</ApplicantProvider>

// 4. Use in components
function MyComponent() {
  const { applicant, loading, fetchApplicant } = useContext(ApplicantContext);
  
  useEffect(() => {
    fetchApplicant();
  }, []);
  
  return <div>{applicant.name}</div>;
}
```

### Vue Pinia Pattern (SIMPLER!)
```vue
<!-- 1. Create store (done once in stores/permitApplicant.js) -->

<!-- 2. NO PROVIDER NEEDED! -->

<!-- 3. Use in any component -->
<script setup>
import { onMounted } from 'vue';
import { usePermitApplicantStore } from '@/stores/permitApplicant';

const permitStore = usePermitApplicantStore();

onMounted(() => {
  permitStore.fetchCurrentApplicant();
});
</script>

<template>
  <div>{{ permitStore.fullName }}</div>
</template>
```

**Key Differences:**
- ❌ React: Requires Provider wrapper
- ✅ Vue: No provider needed
- ❌ React: More boilerplate code
- ✅ Vue: Less code, simpler setup
- ❌ React: Manual state management
- ✅ Vue: Built-in reactivity

---

## 🧪 Testing Checklist

- [ ] Mock data script runs successfully
- [ ] API endpoints return correct data
- [ ] Frontend service connects to API
- [ ] Store fetches data correctly
- [ ] Store caching works (5 minutes)
- [ ] Force refresh bypasses cache
- [ ] Error handling works
- [ ] Loading states display correctly
- [ ] Integration with auth store works
- [ ] Components display applicant data

---

## 📖 Additional Resources

1. **`PERMITAPPLICANT_STORE_USAGE.md`** - Detailed usage guide
2. **`USAGE_EXAMPLES.js`** - 10+ code examples
3. **`PermitApplicantInfo.vue`** - Working component example
4. **`MOCK_PERMIT_APPLICANTS_README.md`** - Mock data documentation

---

## 🐛 Troubleshooting

### Issue: "Cannot find module"
**Solution:** Make sure all imports use correct paths with `@/` alias

### Issue: "Store not initialized"
**Solution:** Call `initializeStores()` in App.vue or main.js

### Issue: "No applicant data found"
**Solution:** Run mock data script or ensure user has completed profile

### Issue: "API not responding"
**Solution:** Ensure backend server is running on port 3000

---

## 🎓 Next Steps

1. ✅ Run mock data script
2. ✅ Test API endpoints
3. ✅ Integrate store in your components
4. ✅ Add router guards for protected routes
5. ✅ Create profile completion form
6. ✅ Add data validation
7. ✅ Implement error boundaries
8. ✅ Add loading skeletons
9. ✅ Create admin dashboard for all applicants
10. ✅ Add real-time updates (optional)

---

## 📞 Support

For questions or issues:
1. Check the documentation files
2. Review the example component
3. Check the usage examples file
4. Verify API endpoints with curl/Postman

**Happy coding! 🚀**
