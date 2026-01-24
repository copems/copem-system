<template>
  <v-app>
    <Header />
    <v-main class="main-content">
      <div class="scrollable-content">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import Header from "@/components/Header.vue";
</script>

<style scoped>
.main-content {
  height: 100vh;
  overflow: hidden;
}

.scrollable-content {
  height: calc(100vh - 88px);
  overflow-y: auto;
  background-color: #f5f6fa;
}
</style>
