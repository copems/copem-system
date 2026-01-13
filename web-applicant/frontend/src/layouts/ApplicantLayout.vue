<template>
  <v-app>
    <!-- <ApplicantHeader /> -->
    <Header />

    <v-main style="padding: 0">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'ApplicantLayout',
}
</script>
