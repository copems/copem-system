/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useAuthUserStore } from "@/stores/authUser";

// Styles
import "unfonts.css";

const app = createApp(App);

registerPlugins(app);

app.mount("#app");

// Initialize auth stores and check for existing authentication after mount
try {
  const authStore = useAuthStore();
  const authUserStore = useAuthUserStore();
  authStore.checkAuth();
  authUserStore.loadAuth();
} catch (error) {
  console.warn("Auth store initialization warning:", error);
}
