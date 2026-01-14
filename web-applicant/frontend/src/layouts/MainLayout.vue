<template>
  <v-app>
    <Header />

    <v-main style="padding: 0">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import Header from '@/components/Header.vue'
</script>
