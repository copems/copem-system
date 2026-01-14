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
        <div class="avatar">{{ userInitials }}</div>
        <div class="user-info">
          <span class="user-name">{{ userName }}</span>
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
          <div class="dropdown-name">{{ userName }}</div>
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
import { ref, computed } from 'vue'

const showDropdown = ref(false)

// Get user data from localStorage or session
const userData = ref({
  firstName: localStorage.getItem('userFirstName') || 'User',
  lastName: localStorage.getItem('userLastName') || 'Name',
})

const userName = computed(() => `${userData.value.firstName} ${userData.value.lastName}`)
const userInitials = computed(() => {
  const first = userData.value.firstName.charAt(0).toUpperCase()
  const last = userData.value.lastName.charAt(0).toUpperCase()
  return `${first}${last}`
})

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const logout = () => {
  console.log('Logging out...')
  // Clear user data
  localStorage.clear()
  sessionStorage.clear()
  showDropdown.value = false
  // Redirect to login
  window.location.href = '/login'
}

// Close dropdown when clicking outside
if (typeof window !== 'undefined') {
  window.addEventListener('click', (e) => {
    if (!e.target.closest('.user-profile-wrapper')) {
      showDropdown.value = false
    }
  })
}
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
  position: sticky;
  top: 0;
  z-index: 1000;
}

.shadow-sm {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
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

/* Responsive */
@media (max-width: 900px) {
  .navbar {
    padding: 15px 20px;
  }
}
</style>
