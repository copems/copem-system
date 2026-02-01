<template>
  <v-container class="d-flex justify-center bg-grey-lighten-3 py-1 no-print">
    <v-card class="a4-landscape-permit pa-5" variant="outlined">
      <div class="d-flex justify-space-between align-start">
        <div class="text-caption">NBC FORM NO. B - 01B</div>
        <div class="text-center">
          <div class="standard-font">Republic of the Philippines</div>
          <div class="standard-font">
            City/Municipality of <span class="header-underline px-4">NAGA</span>
          </div>
          <div class="standard-font">
            Province of <span class="header-underline px-4">CAMARINES SUR</span>
          </div>
          <div class="standard-font mt-1">OFFICE OF THE BUILDING OFFICIAL</div>
        </div>
        <div style="width: 130px"></div>
      </div>

      <div class="text-center mt-2">
        <h1 class="permit-main-title">BUILDING PERMIT</h1>
        <div class="d-flex justify-center ga-10 mt-1">
          <div class="d-flex align-center">
            <v-checkbox-btn
              density="compact"
              hide-details
              color="black"
            ></v-checkbox-btn>
            <span class="cb-label">NEW</span>
          </div>
          <div class="d-flex align-center">
            <v-checkbox-btn
              density="compact"
              hide-details
              color="black"
            ></v-checkbox-btn>
            <span class="cb-label">RENEWAL</span>
          </div>
          <div class="d-flex align-center">
            <v-checkbox-btn
              density="compact"
              hide-details
              color="black"
            ></v-checkbox-btn>
            <span class="cb-label">AMENDATORY</span>
          </div>
        </div>
      </div>

      <v-row no-gutters class="px-2 mt-3">
        <v-col cols="7">
          <div class="p-field">
            BUILDING PERMIT NO. <span class="bottom-line flex-grow-1"></span>
          </div>
          <div class="p-field">
            DATE ISSUED: <span class="bottom-line flex-grow-1"></span>
          </div>
          <div class="p-field">
            FSEC NO. <span class="bottom-line flex-grow-1"></span>
          </div>
          <div class="p-field">
            DATE ISSUED: <span class="bottom-line flex-grow-1"></span>
          </div>
        </v-col>
        <v-col cols="5" class="ps-10">
          <div class="p-field">
            OFFICIAL RECEIPT NO. <span class="bottom-line flex-grow-1"></span>
          </div>
          <div class="p-field">
            DATE PAID: <span class="bottom-line flex-grow-1"></span>
          </div>
        </v-col>
      </v-row>

      <div class="standard-font text-center my-4 px-10 line-height-normal">
        <div>
          This <strong>PERMIT</strong> is issued pursuant to Sections 207, 301,
          302, 303 and 304 of the National Building Code of the
        </div>
        <div>
          Philippines (PD 1096), its Revised IRR, other Referral Codes and its
          Terms and Conditions.
        </div>
      </div>

      <div class="px-2">
        <div class="p-field-full">
          Owner / Permittee : <span class="bottom-line flex-grow-1"></span>
        </div>
        <div class="p-field-full">
          Project Title : <span class="bottom-line flex-grow-1"></span>
        </div>

        <div class="d-flex ga-1 align-end">
          <div class="text-no-wrap standard-font label-width">
            Location of Construction :
          </div>
          <div class="d-flex align-end flex-grow-1 standard-font">
            Lot: <span class="bottom-line flex-grow-1"></span>
          </div>
          <div class="d-flex align-end flex-grow-1 standard-font">
            Blk.: <span class="bottom-line flex-grow-1"></span>
          </div>
          <div class="d-flex align-end flex-grow-1 standard-font">
            TCT No.: <span class="bottom-line flex-grow-1"></span>
          </div>
          <div class="d-flex align-end flex-grow-1 standard-font">
            Street: <span class="bottom-line flex-grow-1"></span>
          </div>
          <div class="d-flex align-end flex-grow-1 standard-font">
            Brgy.: <span class="bottom-line flex-grow-1"></span>
          </div>
        </div>

        <div class="d-flex align-end">
          <div class="label-width"></div>
          <div class="flex-grow-1 d-flex align-end standard-font">
            City/Municipality: <span class="bottom-line flex-grow-1"></span>
          </div>
          <div class="d-flex align-end ms-4 standard-font">
            ZIP Code: <span class="bottom-line width-100"></span>
          </div>
        </div>

        <div class="d-flex ga-2 align-end">
          <div class="flex-grow-1 d-flex align-end standard-font">
            Use or Character of Occupancy :
            <span class="bottom-line flex-grow-1"></span>
          </div>
          <div class="flex-grow-1 d-flex align-end standard-font">
            and Classified as: <span class="bottom-line flex-grow-1"></span>
          </div>
        </div>

        <div class="p-field-full">
          Scope of Work : <span class="bottom-line flex-grow-1"></span>
        </div>
        <div class="p-field-full">
          Total Project Cost : <span class="bottom-line flex-grow-1"></span>
        </div>
        <div class="p-field-full">
          Professional In Charge of Construction:
          <span class="bottom-line flex-grow-1"></span>
        </div>
      </div>

      <div class="mt-6 px-10">
        <div class="font-weight-black standard-font mb-2 ml-10">
          PERMIT ISSUED BY:
        </div>
        <div
          class="d-flex flex-column align-center mx-auto"
          style="max-width: 550px"
        >
          <div class="bottom-line w-100"></div>
          <div class="standard-font-size font-weight-black mt-0 uppercase">
            Building Official
          </div>
          <div class="text-caption mt-n1">(Signature Over Printed Name)</div>
        </div>
      </div>

      <div class="text-center bottom-warning font-weight-black mt-6">
        <div>
          THIS PERMIT MAY BE CANCELLED OR REVOKED PURSUANT TO SECTIONS 207, 305
          AND 306 OF THE NATIONAL BUILDING CODE OF THE PHILIPPINES (PD 1096)
        </div>
        <div>AND ITS REVISED IRR</div>
      </div>
    </v-card>
  </v-container>
</template>

<style scoped>
.a4-landscape-permit {
  width: 297mm;
  height: auto;
  background-color: #fff;
  color: #000;
  border: 1px solid #000 !important;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.standard-font {
  font-size: 0.85rem;
  font-weight: 400; /* Force normal weight */
}

.label-width {
  width: 185px;
}

.header-underline {
  border-bottom: 1px solid black;
  display: inline-block;
  min-width: 150px;
}

.bottom-line {
  border-bottom: 1px solid black !important;
  display: inline-block;
  min-height: 1.2rem;
}

.line-height-normal {
  line-height: 1.4;
}

.width-100 {
  width: 100px;
}

.permit-main-title {
  font-family: "Arial Black", sans-serif;
  font-size: 3.2rem;
  letter-spacing: -1px;
  font-weight: 900; /* Title remains bold/heavy per images */
  line-height: 1.1;
}

.cb-label {
  font-weight: 400;
  font-size: 0.85rem;
  margin-left: -5px;
}

.p-field,
.p-field-full {
  display: flex;
  font-size: 0.85rem;
  font-weight: 400;
  align-items: flex-end;
  margin-top: 4px;
}

.bottom-warning {
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.3;
}

.uppercase {
  text-transform: uppercase;
}

:deep(.v-selection-control) {
  width: 32px !important;
  min-height: 32px !important;
}

@media print {
  @page {
    size: A4 landscape;
    margin: 0;
  }
  .no-print {
    padding: 0 !important;
    background: none !important;
  }
}
</style>