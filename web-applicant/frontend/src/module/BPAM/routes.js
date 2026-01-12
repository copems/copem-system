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

/**
 * BPAM Module Routes Configuration
 */
export const bpamRoutes = [
  {
    path: '/bpam',
    name: 'BPAM',
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
        path: 'application',
        name: 'BPAMApplication',
        component: Navigation,
        meta: {
          title: 'Building Permit Application',
          requiresAuth: true,
        },
        children: [
          {
            path: 'applicant-information',
            name: 'ApplicantInformation',
            component: ApplicantInformation,
            meta: {
              title: 'Applicant Information',
              step: 1,
            },
          },
          {
            path: 'construction-information',
            name: 'ConstructionInformation',
            component: ConstructionInformation,
            meta: {
              title: 'Construction Information',
              step: 2,
            },
          },
          {
            path: 'co-occupancy',
            name: 'CoOccupancy',
            component: CoOccupancy,
            meta: {
              title: 'Character of Occupancy',
              step: 3,
            },
          },
          {
            path: 'signatories',
            name: 'Signatories',
            component: Signatories,
            meta: {
              title: 'Signatories',
              step: 4,
            },
          },
          {
            path: 'plan-upload',
            name: 'PlanUpload',
            component: PlanUpload,
            meta: {
              title: 'Plan Upload',
              step: 5,
            },
          },
          {
            path: 'ancillary-forms',
            name: 'AncillaryForms',
            component: AncillaryForms,
            meta: {
              title: 'Ancillary Forms',
              step: 6,
            },
          },
        ],
      },
    ],
  },
]

export default bpamRoutes
