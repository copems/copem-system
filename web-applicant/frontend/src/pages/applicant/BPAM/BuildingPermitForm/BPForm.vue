<template>
  <v-app>
    <v-main class="bg-grey-lighten-3">
      <v-container fluid class="px-4 mx-auto a4-container print-content">
        <v-card class="my-2 pa-4 print-form-card">
          <v-card-text>
            <div class="review-section" id="form-to-download">
              <!-- Box 1: Header, Application Info, Scope of Work, Use or Character of Occupancy -->
              <Box1 :reviewData="reviewData" />

              <!-- Box 2: Full-Time Inspector and Supervisor -->
              <Box2 />

              <!-- Box 3 & 4: Applicant and Lot Owner Consent -->
              <Box3 />

              <!-- Box 5: Notary Section -->
              <Box5 />
            </div>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent, reactive } from "vue";
import Box1 from "./box1.vue";
import Box2 from "./box2.vue";
import Box3 from "./box3.vue";
import Box5 from "./box5.vue";

export default defineComponent({
  name: "UnifiedApplicationForm",
  components: {
    Box1,
    Box2,
    Box3,
    Box5,
  },
  setup() {
    const reviewData = reactive({
      applicationNo: Array(8).fill(""),
      areaNo: Array(10).fill(""),
      lastName: "",
      firstName: "",
      mi: "",
      tin: "",
      houseNo: "",
      street: "",
      barangay: "",
      city: "NAGA",
      zipCode: "",
      contactNo: "",
      isSimple: false,
      isNew: false,
      isRenewal: false,
      isComplex: false,
      isAmendatory: false,
    });
    return { reviewData };
  },
});
</script>

<style scoped>
.a4-container {
  max-width: 1050px;
  color: black;
  font-family: Arial, sans-serif;
}
</style>