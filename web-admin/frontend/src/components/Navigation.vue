<template>
  <v-navigation-drawer app permanent width="280" class="navigation-drawer">
    <div class="nav-content">
      <v-list nav class="nav-list">
        <v-list-item
          v-for="item in navItems"
          :key="item.title"
          :to="item.to"
          :class="['nav-item', { 'nav-item--active': $route.path === item.to }]"
        >
          <template #prepend>
            <v-icon :color="'#111827'" size="20">
              {{ item.icon }}
            </v-icon>
          </template>
          <v-list-item-title class="nav-item-text">
            {{ item.title }}
          </v-list-item-title>
          <template #append v-if="item.hasSubmenu">
            <v-icon :color="'#111827'" size="16"> mdi-chevron-right </v-icon>
          </template>
        </v-list-item>
      </v-list>

      <!-- nav-bottom removed: logout moved to header -->
    </div>
  </v-navigation-drawer>
</template>

<script setup>
import { useRouter } from "vue-router";

const navItems = [
  {
    title: "Building Permit",
    icon: "mdi-home-city-outline",
    to: "/bpam/testing/Administrative",
  },
  {
    title: "Compliance Monitoring",
    icon: "mdi-clipboard-check-multiple-outline",
    to: "/cmm/testing/Compliance",
    hasSubmenu: true,
  },
  {
    title: "Occupancy Permit",
    icon: "mdi-key-variant",
    to: "/opam/AA-verification/aa-dashboard",
  },
];

const router = useRouter();

const handleLogout = () => {
  console.log("Log Out clicked. User should be logged out.");
  router.push("/");
};
</script>

<style scoped>
.navigation-drawer {
  background: linear-gradient(180deg, #ffffff 0%, #ffffff 100%) !important;
  border: none !important;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15) !important;
  overflow: hidden !important;
  height: calc(100vh - 88px) !important;
  top: 88px !important;
}

.nav-content {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 88px);
  overflow: hidden;
}

.nav-list {
  padding: 8px 0 !important;
  overflow: hidden;
}

.nav-item {
  margin: 0 16px 4px 16px !important;
  border-radius: 8px !important;
  min-height: 44px !important;
  padding: 0 16px !important;
  transition: all 0.2s ease !important;
}

.nav-item:hover {
  background-color: #f5f5f5 !important;
}

.nav-item--active {
  background-color: #eff3ff !important;
  box-shadow: none !important;
}

.nav-item--active .v-icon {
  color: #000000 !important;
}

.nav-item-text {
  color: #111827 !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  letter-spacing: 0.25px !important;
}

.nav-item--active .nav-item-text {
  color: #111827 !important;
  font-weight: 600 !important;
}

.nav-bottom {
  margin-top: auto;
  border-top: 1px solid #e5e7eb;
  padding-top: 16px;
}

.logout-item {
  margin: 0 16px !important;
  border-radius: 8px !important;
  min-height: 44px !important;
  padding: 0 16px !important;
  transition: all 0.2s ease !important;
}

.logout-item:hover {
  background-color: rgba(239, 68, 68, 0.1) !important;
}

.logout-text {
  color: #111827 !important;
  font-size: 14px !important;
  font-weight: 500 !important;
}

.logout-item:hover .logout-text {
  color: #111827 !important;
}
</style>
