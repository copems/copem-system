<template>
  <v-app>
    <Header />

    <v-main class="applicant-main">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import Header from '@/components/Header.vue'
</script>

<style scoped>
.applicant-main {
  padding: 0 !important;
  overflow: hidden;
  height: calc(100vh - 88px);
}

:deep(.v-main__wrap) {
  height: 100%;
  overflow: auto;
}
</style>
