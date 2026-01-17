<template>
  <v-app-bar flat color="#ffffff" dark height="88" app class="elevation-4">
    <v-container
      fluid
      class="d-flex align-center py-0 justify-space-between"
      style="max-width: 100%"
    >
      <div class="d-flex align-center">
        <v-img
          src="https://www2.naga.gov.ph/wp-content/uploads/2022/05/Naga_City_Official_Seal-1.png"
          alt="LGU Seal"
          width="85"
          height="75"
          contain
          class="me-4"
        />
        <div>
          <div class="header-subtitle">REPUBLIC OF THE PHILIPPINES</div>
          <div class="header-title">CITY GOVERNMENT OF NAGA</div>
        </div>
      </div>

      <!-- Profile section -->
      <div class="d-flex align-center">
        <v-menu :close-on-content-click="true" location="bottom end">
          <template #activator="{ props }">
            <v-btn variant="text" class="profile-btn" v-bind="props">
              <v-avatar size="36" class="mx-2 text-white" :color="avatarColor">
                {{ userInitials }}
              </v-avatar>
              <div class="d-flex flex-column text-left">
                <span class="text-caption font-weight-bold profile-name">
                  {{ userName }}
                </span>
                <span class="text-caption font-weight-medium profile-role">
                  {{ userRole }}
                </span>
              </div>
              <v-icon class="ml-1" size="small">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-card min-width="250" class="mt-1">
            <v-list density="compact" nav>
              <v-list-item>
                <v-list-item-title class="font-weight-bold">
                  {{ userName }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ userEmail }}
                </v-list-item-subtitle>
              </v-list-item>
              <v-divider class="my-1"></v-divider>

              <v-list-item link @click="handleLogout" class="text-red-darken-1">
                <template #prepend>
                  <v-icon>mdi-logout</v-icon>
                </template>
                <v-list-item-title>Log Out</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  userName: {
    type: String,
    default: "User Name",
  },
  userEmail: {
    type: String,
    default: "user@nagacity.gov.ph",
  },
  userRole: {
    type: String,
    default: "Engineer",
  },
  avatarColor: {
    type: String,
    default: "#5B21B6",
  },
});

const router = useRouter();

const userInitials = computed(() => {
  return props.userName
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
});

const handleLogout = () => {
  // Log out and redirect to root
  console.log("Log Out clicked");
  router.push("/");
};
</script>

<style scoped>
.header-subtitle {
  font-size: 12px;
  font-weight: 400;
  color: #111827;
  line-height: 1.2;
}

.header-title {
  font-size: 15px;
  font-weight: 700;
  color: #111827;
  line-height: 1.2;
}

.profile-btn {
  background-color: transparent !important;
  box-shadow: none !important;
  padding: 0 !important;
  min-width: unset !important;
}

.profile-name {
  color: #555 !important;
}

.profile-role {
  color: #888 !important;
}
</style>
