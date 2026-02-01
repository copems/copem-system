<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters class="px-3">
      <v-col cols="12">
        <p class="box-label text-uppercase mb-0">BOX 2</p>

        <div class="main-border">
          <v-row no-gutters class="border-bottom-black">
            <v-col cols="12" class="px-2 py-1 title-text">
              FULL-TIME INSPECTOR AND SUPERVISOR OF CONSTRUCTION WORKS
              (REPRESENTING THE OWNER)
            </v-col>
          </v-row>

          <v-row no-gutters>
            <v-col
              cols="6"
              class="border-right-black d-flex flex-column justify-end pb-4"
            >
              <div class="signature-line-container mx-auto">
                <div class="signature-line"></div>
                <div class="text-center mt-1">
                  <div class="name-label">ARCHITECT OR CIVIL ENGINEER</div>
                  <div class="instruction-text">
                    (Signed and Sealed Over Printed Name)
                  </div>
                </div>
                <div class="date-container mt-2">
                  <span class="label-text">Date</span>
                  <span class="date-underline ml-2"></span>
                </div>
              </div>
            </v-col>

            <v-col cols="6">
              <v-row no-gutters>
                <v-col
                  cols="12"
                  class="border-bottom-black address-box px-1 py-1"
                >
                  <div class="label-text">Address</div>
                </v-col>

                <v-col
                  cols="7"
                  class="border-bottom-black border-right-black px-1 py-1 field-box"
                >
                  <div class="label-text">PRC No.</div>
                </v-col>
                <v-col cols="5" class="border-bottom-black px-1 py-1 field-box">
                  <div class="label-text">Validity</div>
                </v-col>

                <v-col
                  cols="7"
                  class="border-bottom-black border-right-black px-1 py-1 field-box"
                >
                  <div class="label-text">PTR No.</div>
                </v-col>
                <v-col cols="5" class="border-bottom-black px-1 py-1 field-box">
                  <div class="label-text">Date Issued</div>
                </v-col>

                <v-col cols="7" class="border-right-black px-1 py-1 field-box">
                  <div class="label-text">Issued at</div>
                </v-col>
                <v-col cols="5" class="px-1 py-1 field-box">
                  <div class="label-text">TIN</div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Box2Form",
});
</script>

<style scoped>
.box-label {
  font-size: 0.75rem;
}

/* Main Structural Borders */
.main-border {
  border: 1px solid black;
}

.border-bottom-black {
  border-bottom: 1px solid black;
}

.border-right-black {
  border-right: 1px solid black;
}

/* Typography and Sizing */
.title-text {
  font-size: 0.75rem;
  letter-spacing: -0.2px;
}

.label-text {
  font-size: 0.7rem;
}

.name-label {
  font-size: 0.85rem;
  line-height: 1;
}

.instruction-text {
  font-size: 0.65rem;
  line-height: 1;
}

/* Signature & Date Area */
.signature-line-container {
  width: 85%;
}

.signature-line {
  border-bottom: 1px solid black;
  width: 100%;
}

.date-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.date-underline {
  border-bottom: 1px solid black;
  width: 160px; /* Specific length for the underline */
  display: inline-block;
}

/* Grid Cell Sizing */
.address-box {
  min-height: 50px;
}

.field-box {
  min-height: 28px;
}
</style>