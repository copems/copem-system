/**
 * BPAM (Building Permit Application Management) Module Routes
 * 
 * This file defines the routes for the Building Permit Application Management module.
 * All routes are prefixed with '/bpam' for module organization.
 */

// UnifiedForm Components
import BPADetails from './UnifiedForm/BPADetails.vue'
import ApplicantInformation from './UnifiedForm/ApplicantInformation.vue'
import ConstructionInformation from './UnifiedForm/ConstructionInformation.vue'
import CoOccupancy from './UnifiedForm/CoOccupancy.vue'
import Signatories from './UnifiedForm/Signatories.vue'
import PlanUpload from './UnifiedForm/PlanUpload.vue'
import AncillaryForms from './UnifiedForm/AncillaryForms.vue'
import Navigation from './UnifiedForm/Navigation.vue'

// AncillaryPermits Components
import Architectural from './AncillaryPermits/architectural.vue'
import CivilStructural from './AncillaryPermits/civilstructural.vue'
import Electrical from './AncillaryPermits/electrical.vue'
import Sanitary from './AncillaryPermits/sanitary.vue'
import Mechanical from './AncillaryPermits/mechanical.vue'
import Electronics from './AncillaryPermits/electronics.vue'

// Layout
import ApplicantLayout from '@/layouts/ApplicantLayout.vue'

/**
 * BPAM Module Routes Configuration
 */
export const bpamRoutes = [
  {
    path: '/bpam',
    name: 'BPAM',
    component: ApplicantLayout,
    redirect: '/bpam/portal',
    children: [
      {
        path: 'portal',
        name: 'BPAMPortal',
        component: BPADetails,
        meta: {
          title: 'Building Permit Application Portal',
          requiresAuth: true,
        },
      },
      {
        path: 'applicantinformation',
        name: 'ApplicantInformation',
        component: ApplicantInformation,
        meta: {
          title: 'Applicant Information',
          step: 1,
          requiresAuth: true,
        },
      },
      {
        path: 'constructioninformation',
        name: 'ConstructionInformation',
        component: ConstructionInformation,
        meta: {
          title: 'Construction Information',
          step: 2,
          requiresAuth: true,
        },
      },
      {
        path: 'cooccupancy',
        name: 'CoOccupancy',
        component: CoOccupancy,
        meta: {
          title: 'Character of Occupancy',
          step: 3,
          requiresAuth: true,
        },
      },
      {
        path: 'signatories',
        name: 'Signatories',
        component: Signatories,
        meta: {
          title: 'Signatories',
          step: 4,
          requiresAuth: true,
        },
      },
      {
        path: 'planupload',
        name: 'PlanUpload',
        component: PlanUpload,
        meta: {
          title: 'Plan Upload',
          step: 5,
          requiresAuth: true,
        },
      },
      {
        path: 'ancillaryforms',
        name: 'AncillaryForms',
        component: AncillaryForms,
        meta: {
          title: 'Ancillary Forms',
          step: 6,
          requiresAuth: true,
        },
      },
      {
        path: 'ancillarypermits/architectural',
        name: 'ArchitecturalPermit',
        component: Architectural,
        meta: {
          title: 'Architectural Permit',
          requiresAuth: true,
        },
      },
      {
        path: 'ancillarypermits/civilstructural',
        name: 'CivilStructuralPermit',
        component: CivilStructural,
        meta: {
          title: 'Civil/Structural Permit',
          requiresAuth: true,
        },
      },
      {
        path: 'ancillarypermits/electrical',
        name: 'ElectricalPermit',
        component: Electrical,
        meta: {
          title: 'Electrical Permit',
          requiresAuth: true,
        },
      },
      {
        path: 'ancillarypermits/sanitary',
        name: 'SanitaryPermit',
        component: Sanitary,
        meta: {
          title: 'Sanitary Permit',
          requiresAuth: true,
        },
      },
      {
        path: 'ancillarypermits/mechanical',
        name: 'MechanicalPermit',
        component: Mechanical,
        meta: {
          title: 'Mechanical Permit',
          requiresAuth: true,
        },
      },
      {
        path: 'ancillarypermits/electronics',
        name: 'ElectronicsPermit',
        component: Electronics,
        meta: {
          title: 'Electronics Permit',
          requiresAuth: true,
        },
      },
    ],
  },
]

export default bpamRoutes
