<template>
  <div class="app-container">
    <Header />

    <header class="hero">
      <div class="hero-content">
        <h2 class="welcome-title">Welcome to the One-Stop Shop System</h2>
        <p class="hero-description">
          The <strong>Construction Permit Management System</strong> is a comprehensive digital
          platform designed to streamline and simplify the entire
          <strong>building permit application</strong> process. Our
          <strong>one-stop shop system</strong> provides citizens, contractors, and developers with
          convenient access to essential services including
          <strong>building permit applications</strong>,
          <strong>occupancy permit processing</strong>, and <strong>compliance monitoring</strong>.
          By centralizing permit-related services in one efficient online portal, we eliminate the
          need for multiple office visits, reduce processing time, and ensure transparency
          throughout the entire permit lifecycle. Our system is committed to delivering fast,
          reliable, and user-friendly services that support safe and compliant construction
          practices in our community.
        </p>
      </div>
    </header>

    <section class="services-section">
      <div class="section-header">
        <h2 class="section-title">ONE STOP SHOP SERVICES</h2>
      </div>

      <div class="services-grid">
        <div v-for="service in services" :key="service.title" class="service-card">
          <div class="service-icon" :style="{ backgroundColor: service.iconBg }">
            <span class="icon-text">{{ service.icon }}</span>
          </div>
          <div class="service-body">
            <h3 class="service-name">{{ service.title }}</h3>
            <p class="service-desc">{{ service.description }}</p>
            <button class="apply-now-btn" @click="handleApplyNow(service.title)">Apply Now</button>
          </div>
        </div>
      </div>
    </section>

    <section class="requirements-section">
      <div class="section-header">
        <h2 class="section-title">Requirements & Documentation</h2>
      </div>
      <div class="requirements-grid">
        <div v-for="list in requirementLists" :key="list.category" class="requirement-card">
          <div class="requirement-icon" :style="{ backgroundColor: list.iconBg }">
            <span class="icon-text">{{ list.icon }}</span>
          </div>
          <h3 class="category-title">{{ list.category }}</h3>
          <ul class="item-list">
            <li v-for="item in list.items" :key="item" class="requirement-item">
              <span class="check-icon">✓</span>
              {{ item }}
            </li>
          </ul>
          <button class="view-req-btn" @click="viewRequirements(list.category)">
            View Full Requirements
          </button>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="footer-main">
        <div class="footer-col">
          <h3 class="footer-title">About Us</h3>
          <p class="footer-desc">
            The Construction Permit Management System is dedicated to providing efficient and
            transparent permit services to support safe and compliant construction in our community.
          </p>
        </div>
        <div class="footer-col">
          <h3 class="footer-title">Quick Links</h3>
          <ul class="footer-links">
            <li><a href="#services">Services</a></li>
            <li><a href="#requirements">Requirements</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="#faqs">FAQs</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h3 class="footer-title">Contact Information</h3>
          <ul class="footer-contact">
            <li>
              <span class="footer-icon">📍</span> City Hall Building, Main Street, Philippines
            </li>
            <li><span class="footer-icon">📞</span> +63 (2) 1234-5678</li>
            <li><span class="footer-icon">✉️</span> permits@construction.gov.ph</li>
          </ul>
        </div>
      </div>
      <hr class="footer-divider" />
      <div class="footer-bottom">
        © 2026 Construction Permit Management System. All rights reserved Builder
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/Header.vue'

const router = useRouter()
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

const handleApplyNow = (serviceTitle) => {
  if (serviceTitle === 'Building Permit Application') {
    router.push('/bpam/applicantinformation')
  } else {
    // Handle other services in the future
    console.log(`Apply for: ${serviceTitle}`)
  }
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
/* Layout Resets */
.app-container {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.7;
  color: #333;
  margin: 0;
  padding: 0;
  background-color: #f9f9f9;
}

/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 50px;
  background: white;
  height: 88px;
}

.shadow-sm {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logo-image {
  height: 60px;
  width: auto;
  object-fit: contain;
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.main-title {
  font-size: 0.875rem; /* 14px */
  font-weight: 400;
  line-height: 1.5;
  color: black;
  margin: 0;
  letter-spacing: 0.5px;
}

.sub-title {
  font-size: 1.125rem; /* 18px */
  font-weight: 700;
  line-height: 1.25;
  color: black;
  margin: 0;
  letter-spacing: 0.5px;
}

.user-profile-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.profile-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px 10px 4px 4px;
  border-radius: 8px;
  transition: background-color 0.2s;
  min-width: 0;
}

.profile-btn:hover {
  background-color: #f5f5f5;
}

.avatar {
  width: 40px;
  height: 40px;
  background-color: #1565c0;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  flex-shrink: 0;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  min-width: 0;
}

.user-name {
  font-size: 0.875rem; /* 14px */
  font-weight: 600;
  line-height: 1.5;
  color: #222;
  white-space: nowrap;
}

.user-role {
  font-size: 13px;
  font-weight: 400;
  line-height: 1.6;
  color: #888;
  white-space: nowrap;
}

.dropdown-icon {
  display: flex;
  align-items: center;
  margin-left: 8px;
  align-self: center;
}

.chevron-down-icon {
  width: 24px;
  height: 24px;
  display: block;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  z-index: 1000;
  overflow: hidden;
}

.dropdown-header {
  padding: 12px 16px;
}

.dropdown-name {
  font-size: 14px;
  font-weight: 700;
  color: #222;
}

.dropdown-subtitle {
  font-size: 12px;
  color: #666;
}

.dropdown-divider {
  height: 1px;
  background-color: #e0e0e0;
  margin: 4px 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 14px;
}

.dropdown-item.logout {
  color: #c62828;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}

.logout-icon {
  font-size: 16px;
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%);
  padding: 80px 50px;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.welcome-title {
  font-size: 2.25rem; /* 36px */
  line-height: 1.25;
  margin-bottom: 30px;
  font-weight: 700;
  color: #1e293b;
}

.hero-description {
  font-size: 1rem; /* 16px */
  font-weight: 400;
  line-height: 1.7;
  color: #475569;
  max-width: 1000px;
  margin: 0 auto;
  text-align: justify;
}

/* Services */
.services-section {
  padding: 80px 50px;
  max-width: 1200px;
  margin: 0 auto;
  background: white;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  color: #1e293b;
  font-size: 1.5rem; /* 24px */
  font-weight: 600;
  line-height: 1.35;
  margin-bottom: 10px;
  letter-spacing: 1px;
}

.section-subtitle {
  color: #64748b;
  font-size: 16px;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.service-card {
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  padding: 45px 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.service-card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  transform: translateY(-3px);
}

.service-icon {
  width: 70px;
  height: 70px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 36px;
}

.service-body {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
}

.service-name {
  color: #1e293b;
  margin: 0 0 15px 0;
  font-size: 1.125rem; /* 18px */
  font-weight: 600;
  line-height: 1.5;
}

.service-desc {
  color: #64748b;
  font-size: 0.875rem; /* 14px */
  font-weight: 400;
  line-height: 1.6;
  margin-bottom: 25px;
  flex-grow: 1;
}

.apply-now-btn {
  background-color: #1e293b;
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.875rem; /* 14px */
  line-height: 1.5;
  transition: all 0.3s ease;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.apply-now-btn:hover {
  background-color: #0f172a;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Requirements */
.requirements-section {
  padding: 60px 50px;
  max-width: 1200px;
  margin: 0 auto;
  background: #f8fafc;
}

.requirements-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
}

.requirement-card {
  background: white;
  padding: 35px 30px;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.requirement-card:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.view-req-btn {
  margin-top: 18px;
  width: 100%;
  padding: 12px 0;
  border: 2px solid #222;
  border-radius: 8px;
  background: #fff;
  color: #222;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  box-shadow: none;
}
.view-req-btn:hover {
  background: #f1f5f9;
  color: #1565c0;
  border-color: #1565c0;
}

.requirement-icon {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 32px;
}

.category-title {
  font-size: 0.875rem; /* 14px */
  font-weight: 600;
  line-height: 1.5;
  color: #1e293b;
  margin-bottom: 18px;
}

.item-list {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  text-align: left;
}

.requirement-item {
  display: flex;
  gap: 10px;
  padding: 8px 0;
  color: #475569;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.6;
  border-bottom: 1px solid #f1f5f9;
}

.requirement-item:last-child {
  border-bottom: none;
}

.check-icon {
  color: #16a34a;
  font-weight: bold;
  font-size: 14px;
  flex-shrink: 0;
}

.footer {
  background: #1e2630;
  color: #e5e7eb;
  padding: 0;
  margin-top: 60px;
  font-size: 15px;
}

.footer-main {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 32px 24px 32px;
  gap: 32px;
}

.footer-col {
  flex: 1 1 0;
  min-width: 220px;
}

.footer-title {
  font-size: 0.875rem; /* 14px */
  font-weight: 600;
  line-height: 1.5;
  margin-bottom: 18px;
  color: #fff;
}

.footer-desc {
  color: #cbd5e1;
  font-size: 1rem; /* 16px */
  font-weight: 400;
  line-height: 1.7;
  margin-bottom: 0;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}
.footer-links li {
  margin-bottom: 10px;
}
.footer-links a {
  color: #e5e7eb;
  text-decoration: none;
  transition: color 0.2s;
}
.footer-links a:hover {
  color: #38bdf8;
}

.footer-contact {
  list-style: none;
  padding: 0;
  margin: 0;
}
.footer-contact li {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #cbd5e1;
}
.footer-icon {
  font-size: 18px;
  color: #38bdf8;
}

.footer-divider {
  border: none;
  border-top: 1px solid #374151;
  margin: 0 0 0 0;
}

.footer-bottom {
  text-align: center;
  color: #cbd5e1;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.6;
  padding: 18px 0 18px 0;
  background: #1a202c;
}

/* Responsive */
@media (max-width: 900px) {
  .hero-content,
  .services-grid,
  .requirements-grid {
    flex-direction: column;
    grid-template-columns: 1fr;
  }
  .navbar {
    padding: 15px 20px;
  }
}
</style>