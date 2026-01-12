# BPAM Module - Building Permit Application Management

## Structure

```
BPAM/
├── routes.js                    # Module route definitions
├── AncillaryPermits/           # Ancillary permits related components
└── UnifiedForm/                # Unified application form components
    ├── BPADetails.vue          # Building permit application portal/dashboard
    ├── ApplicantInformation.vue # Step 1: Applicant/Owner information
    ├── ConstructionInformation.vue # Step 2: Construction details
    ├── CoOccupancy.vue         # Step 3: Character of Occupancy
    ├── Signatories.vue         # Step 4: Required signatories
    ├── PlanUpload.vue          # Step 5: Upload construction plans
    ├── AncillaryForms.vue      # Step 6: Additional/ancillary forms
    └── Navigation.vue          # Navigation wrapper for application steps
```

## Routes

### Main Portal
- `/bpam` - Redirects to portal
- `/bpam/portal` - Building Permit Application Portal (BPADetails)

### Application Form Steps
- `/bpam/application` - Application navigation wrapper
  - `/bpam/application/applicant-information` - Step 1
  - `/bpam/application/construction-information` - Step 2
  - `/bpam/application/co-occupancy` - Step 3
  - `/bpam/application/signatories` - Step 4
  - `/bpam/application/plan-upload` - Step 5
  - `/bpam/application/ancillary-forms` - Step 6

## File Naming Convention

All Vue files follow PascalCase naming:
- **Before**: `bpowner.vue`, `bpconstruction.vue`, etc.
- **After**: `ApplicantInformation.vue`, `ConstructionInformation.vue`, etc.

## Folder Naming Convention

- **BuildingPermit** → **BPAM**
- **BPAncillaryPermit** → **AncillaryPermits**
- **BuildingPermitApplication** → **UnifiedForm**

## Usage

To navigate to the BPAM module in your components:

```javascript
// Navigate to portal
this.$router.push({ name: 'BPAMPortal' })

// Navigate to specific step
this.$router.push({ name: 'ApplicantInformation' })

// Or using path
this.$router.push('/bpam/application/construction-information')
```

## Meta Information

Each route includes meta information:
- `title` - Page title
- `step` - Step number (for application form routes)
- `requiresAuth` - Requires authentication (portal and application routes)
