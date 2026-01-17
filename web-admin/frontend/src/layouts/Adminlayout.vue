<template>
  <v-app>
    <Header />
    <div>
      <Navigation />
      <v-main>
        <router-view />
      </v-main>
    </div>
  </v-app>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Navigation from "@/components/Navigation.vue";
</script>

<style scoped>
/* Additional layout styles if needed */
</style>
