<template>
  <div>
    <v-row no-gutters class="px-3">
      <v-col cols="12">
        <div class="box-border-heavy mt-4 pa-2 notary-section">
          <div class="text-uppercase box-label">BOX 5</div>
          <v-row no-gutters class="mt-2">
            <v-col cols="6">
              <div class="d-flex align-center">
                <span class="label-text">REPUBLIC OF THE PHILIPPINES</span>
                <span class="ml-4">)</span>
              </div>
              <div class="d-flex align-end mt-1">
                <span class="label-text">CITY/MUNICIPALITY OF</span>
                <div class="signature-line flex-grow-1 ml-2"></div>
                <span class="ml-1">)</span>
              </div>
            </v-col>
            <v-col cols="6" class="text-right pr-12">
              <span class="label-text">S.S</span>
            </v-col>
          </v-row>

          <div class="mt-4 acknowledge-text">
            BEFORE ME, at the City/Municipality of
            <span class="inline-line w-30"></span>, on
            <span class="inline-line w-20"></span> personally appeared the
            following:
          </div>

          <v-row no-gutters class="mt-6 text-center notary-grid">
            <v-col cols="5">
              <div class="signature-line w-90 mx-auto"></div>
              <div class="text-tiny text-uppercase">APPLICANT</div>
            </v-col>
            <v-col cols="2">
              <div class="signature-line w-90 mx-auto"></div>
              <div class="text-tiny">Gov't Issued ID No.</div>
            </v-col>
            <v-col cols="2">
              <div class="signature-line w-90 mx-auto"></div>
              <div class="text-tiny">Date Issued</div>
            </v-col>
            <v-col cols="3">
              <div class="signature-line w-90 mx-auto"></div>
              <div class="text-tiny">Place Issued</div>
            </v-col>
          </v-row>

          <v-row no-gutters class="mt-6 text-center notary-grid">
            <v-col cols="5">
              <div class="signature-line w-90 mx-auto"></div>
              <div class="text-tiny text-uppercase">
                LICENSED ARCHITECT OR CIVIL ENGINEER
              </div>
              <div class="text-tiny-caption">
                (Full-Time Inspector and Supervisor of Construction Works)
              </div>
            </v-col>
            <v-col cols="2">
              <div class="signature-line w-90 mx-auto"></div>
              <div class="text-tiny">Gov't Issued ID No.</div>
            </v-col>
            <v-col cols="2">
              <div class="signature-line w-90 mx-auto"></div>
              <div class="text-tiny">Date Issued</div>
            </v-col>
            <v-col cols="3">
              <div class="signature-line w-90 mx-auto"></div>
              <div class="text-tiny">Place Issued</div>
            </v-col>
          </v-row>

          <div class="mt-6 acknowledge-text">
            whose signatures appear hereinabove, known to me to be the same
            persons who executed this standard prescribed form and acknowledged
            to me that the same is their free and voluntary act and deed.
          </div>

          <div class="mt-4 acknowledge-text">
            WITNESS MY HAND AND SEAL on the date and place above written.
          </div>

          <v-row no-gutters class="mt-6">
            <v-col cols="4">
              <div class="d-flex mb-1">
                <span class="label-text w-30">Doc. No.</span>
                <div class="signature-line flex-grow-1"></div>
              </div>
              <div class="d-flex mb-1">
                <span class="label-text w-30">Page No.</span>
                <div class="signature-line flex-grow-1"></div>
              </div>
              <div class="d-flex mb-1">
                <span class="label-text w-30">Book No.</span>
                <div class="signature-line flex-grow-1"></div>
              </div>
              <div class="d-flex mb-1">
                <span class="label-text w-30">Series of</span>
                <div class="signature-line flex-grow-1"></div>
              </div>
            </v-col>
            <v-col cols="8" class="d-flex flex-column align-end pt-8">
              <div class="signature-line w-70"></div>
              <div class="text-caption w-70 text-center">
                NOTARY PUBLIC (Until December
                <span class="inline-line w-20"></span>)
              </div>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>

    <v-row no-gutters class="px-3">
      <v-col cols="12">
        <div class="footer-copies mt-4">
          <span>Copy 1: Owner</span><span>Copy 2: OBO</span
          ><span>Copy 3: BFP</span><span>Copy 4: PSA</span>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Box5",
});
</script>

<style scoped>
.box-label {
  font-size: 0.75rem;
}

.box-border-heavy {
  border: 1px solid black;
}
.signature-line {
  border-bottom: 1px solid black;
}
.label-text {
  font-size: 0.7rem;
  color: black;
}

/* Box 5 Specifics */
.notary-section {
  font-size: 0.75rem;
  line-height: 1.3;
}
.acknowledge-text {
  font-size: 0.8rem;
  text-align: justify;
}
.inline-line {
  border-bottom: 1px solid black;
  display: inline-block;
  height: 12px;
  vertical-align: bottom;
}
.w-20 {
  width: 20%;
}
.w-30 {
  width: 30%;
}
.w-70 {
  width: 70%;
}
.w-90 {
  width: 90%;
}
.text-tiny {
  font-size: 0.6rem;
}
.text-tiny-caption {
  font-size: 0.55rem;
  line-height: 1;
}

.footer-copies {
  display: flex;
  justify-content: space-around;
  font-size: 0.65rem;
  border-top: 1px solid black;
  padding-top: 5px;
}
</style>
