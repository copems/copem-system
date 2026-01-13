<template>
  <nav class="navbar shadow-sm">
    <div class="logo-section">
      <img src="@/assets/copemslogo.png" alt="CoPeMS Logo" class="logo-image" />
      <div class="logo-text">
        <p class="main-title">CONSTRUCTION PERMIT</p>
        <h1 class="sub-title">MANAGEMENT SYSTEM</h1>
      </div>
    </div>
    <div class="user-profile-wrapper">
      <button class="profile-btn" @click="toggleDropdown">
        <div class="avatar">JR</div>
        <div class="user-info">
          <span class="user-name">Jose Rizal</span>
        </div>
        <span class="dropdown-icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="chevron-down-icon"
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="#222"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </button>
      <div v-if="showDropdown" class="dropdown-menu">
        <div class="dropdown-header">
          <div class="dropdown-name">Jose Rizal</div>
        </div>
        <div class="dropdown-divider"></div>
        <div class="dropdown-item logout" @click.stop="logout">
          <span class="logout-icon">↪</span>
          <span>Log Out</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const applicationNumber = ref('BP-2026-000001')
const showDropdown = ref(false)

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const logout = () => {
  console.log('Logging out...')
  // Add your logout logic here
  // For example: router.push('/login') or clear session
  showDropdown.value = false
}

// Close dropdown when clicking outside
if (typeof window !== 'undefined') {
  window.addEventListener('click', (e) => {
    if (!e.target.closest('.user-profile-wrapper')) {
      showDropdown.value = false
    }
  })
}

const services = [
  {
    title: 'Building Permit Application',
    description:
      'Submit and track your building permit applications online. Our streamlined process ensures quick review and approval for your construction projects.',
    icon: '📄',
    iconBg: '#2563eb',
  },
  {
    title: 'Occupancy Permit Application',
    description:
      'Apply for occupancy permits with ease. Get your property certified for safe occupancy with our efficient digital application system.',
    icon: '🏠',
    iconBg: '#16a34a',
  },
  {
    title: 'Compliance Monitoring',
    description:
      'Monitor and maintain compliance with building codes and regulations. Stay updated on inspection schedules and compliance requirements.',
    icon: '🛡️',
    iconBg: '#dc2626',
  },
]

const requirementsLinks = {
  'Requirements for Applying Building Permit':
    'https://www2.naga.gov.ph/wp-content/uploads/2021/07/CC-4E-CEO-Securing-Other-Building-Related-Permits.pdf',
  'Requirements for Occupancy Permit':
    'https://www2.naga.gov.ph/wp-content/uploads/2022/02/CC-5E-CEO-Securing-Certificate-of-Occupancy-Certificate-of-Use-Certificate-of-Operation.pdf',
  'Compliance Monitoring Requirements':
    'https://www2.naga.gov.ph/wp-content/uploads/2021/07/CC-4E-CEO-Securing-Other-Building-Related-Permits.pdf',
}

const viewRequirements = (category) => {
  const url = requirementsLinks[category]
  if (url) {
    window.open(url, '_blank')
  }
}

const requirementLists = [
  {
    category: 'Requirements for Applying Building Permit',
    icon: '📄',
    iconBg: '#2563eb',
    items: [
      'Completed application form with notarized signature',
      'Certified true copy of Transfer Certificate of Title (TCT) or Tax Declaration',
      'Complete architectural plans and specifications signed by licensed architect',
      'Structural plans signed and sealed by licensed civil/structural engineer',
      'Electrical plans signed and sealed by licensed electrical engineer',
      'Plumbing and sanitary plans signed by licensed master plumber',
      'Mechanical plans (if applicable) signed by licensed mechanical engineer',
      'Fire safety evaluation clearance from Bureau of Fire Protection',
      'Barangay clearance and locational clearance',
      'Environmental compliance certificate (for projects requiring ECC)',
    ],
  },
  {
    category: 'Requirements for Occupancy Permit',
    icon: '🏠',
    iconBg: '#16a34a',
    items: [
      'Two (2) copies of accomplished Unified Application form for Certificate of Occupancy, duly notarized',
      'Two (2) copies of Certificate of Completion, duly notarized',
      'Construction Logbook, signed and sealed by the Owner’s Architect or Civil Engineer who undertook full-time inspection and supervision',
      'Two (2) photocopies of the valid licenses of all involved professionals',
      'Photograph of the structure with substantial completion showing front, sides, and rear areas',
      'Two (2) sets of As-Built Plans, if there are changes in the building plans covered by the issued Building Permit',
      'Two (2) copies of Certificate of Final Electrical Inspection',
      'Two (2) copies of Fire Safety Inspection Certificate from the Bureau of Fire and Protection',
      'Sketch map indicating the location of the project',
    ],
  },
  {
    category: 'Compliance Monitoring Requirements',
    icon: '🛡️',
    iconBg: '#dc2626',
    items: [
      '2 copies Construction Safety and Health Program approved by DOLE (Original)',
      '2 copies Fire Safety Evaluation Clearance from BFP (Original)',
      '2 copies Locational Clearance from CPDO (Original)',
      '2 copies DPWH Clearance (if project is along National Highway)',
      '2 copies ECC from DENR or ENRO Clearance from CENRO (for Commercial and Industrial)',
      '2 copies Barangay Clearance',
    ],
  },
]
</script>


<style scoped>
/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 50px;
  background: white;
  height: 88px;
}
</style>