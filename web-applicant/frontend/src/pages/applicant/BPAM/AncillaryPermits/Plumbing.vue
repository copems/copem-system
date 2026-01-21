<template>
  <v-app>
    <v-main class="bg-grey-lighten-3">
      <v-container fluid class="px-4 mx-auto a4-container">
        <div class="d-flex justify-space-between align-center mb-4">
          <v-btn color="primary" variant="text" @click="$router.back()">
            <v-icon left>mdi-arrow-left</v-icon>
            Back
          </v-btn>
          <v-btn
            color="success"
            variant="elevated"
            :disabled="!isFormComplete"
            @click="downloadForm"
          >
            <v-icon left>mdi-download</v-icon>
            Download
          </v-btn>
        </div>
        <div class="permit-form-wrapper">
          <div id="plumbing-permit-form-page-1">
            <div class="header-section">
              <div class="form-no">NBC FORM NO. A -06</div>
              <div class="office-details">
                <div>Republic of the Philippines</div>
                <div>City/Municipality of Naga</div>
                <div>Province of Camarines Sur</div>
                <div class="bold-text">OFFICE OF THE BUILDING OFFICIAL</div>
              </div>
              <div class="form-no" style="visibility: hidden">NBC FORM NO. A -06</div>
            </div>

            <div class="permit-title-section">
              <div class="permit-title">PLUMBING PERMIT</div>
            </div>

            <div class="permit-numbers-section">
              <div class="permit-number-group">
                <label>APPLICATION NO.</label>
                <div class="input-boxes">
                  <input
                    type="text"
                    maxlength="1"
                    v-for="n in 8"
                    :key="'app-no-' + n"
                    class="box-input"
                  />
                </div>
              </div>
              <div class="permit-number-group">
                <label>PP NO</label>
                <div class="input-boxes">
                  <input
                    type="text"
                    maxlength="1"
                    v-for="n in 6"
                    :key="'pp-no-' + n"
                    class="box-input"
                  />
                </div>
              </div>
              <div class="permit-number-group">
                <label>BUILDING PERMIT NO.</label>
                <div class="input-boxes">
                  <input
                    type="text"
                    maxlength="1"
                    v-for="n in 8"
                    :key="'bp-no-' + n"
                    class="box-input"
                  />
                </div>
              </div>
            </div>

            <div class="box-container">
              <p class="box-label">BOX 1 (TO BE ACCOMPLISHED IN PRINT BY THE OWNER/APPLICANT)</p>
              <div class="box-content">
                <div class="box-row">
                  <div class="cell owner-label">OWNER/APPLICANT</div>
                  <div class="cell name-field">
                    <span class="sub-label">LAST NAME</span>
                  </div>
                  <div class="cell name-field">
                    <span class="sub-label">FIRST NAME</span>
                  </div>
                  <div class="cell mi-field">
                    <span class="sub-label">M.I.</span>
                  </div>
                  <div class="cell tin-field">
                    <span class="sub-label">TIN</span>
                  </div>
                </div>
                <div class="box-row">
                  <div class="cell enterprise-label">FOR CONSTRUCTION OWNED BY AN ENTERPRISE</div>
                  <div class="cell ownership-field">
                    <span class="sub-label">FORM OF OWNERSHIP</span>
                  </div>
                  <div class="cell occupancy-field">
                    <span class="sub-label">USE OR CHARACTER OF OCCUPANCY</span>
                  </div>
                </div>
                <div class="box-row">
                  <div class="cell address-label">ADDRESS:</div>
                  <div class="cell address-no-street">
                    <span class="sub-label">NO., STREET,</span>
                  </div>
                  <div class="cell address-barangay">
                    <span class="sub-label">BARANGAY,</span>
                  </div>
                  <div class="cell address-city">
                    <span class="sub-label">CITY/MUNICIPALITY</span>
                  </div>
                  <div class="cell address-zip">
                    <span class="sub-label">ZIP CODE</span>
                  </div>
                  <div class="cell address-tel">
                    <span class="sub-label">TELEPHONE NO</span>
                  </div>
                </div>
                <div class="box-row no-bottom-border">
                  <div class="cell location-label">LOCATION OF CONSTRUCTION:</div>
                  <div class="cell location-details">
                    <div class="location-line">
                      <div class="field-group">
                        LOT NO.<span class="underline loc-short"></span>
                      </div>
                      <div class="field-group">
                        BLK NO.<span class="underline loc-short"></span>
                      </div>
                      <div class="field-group">
                        TCT NO.<span class="underline loc-medium"></span>
                      </div>
                      <div class="field-group">
                        TAX DEC. NO.<span class="underline loc-medium"></span>
                      </div>
                    </div>
                    <div class="location-line">
                      <div class="field-group flex-1">
                        STREET<span class="underline flex-fill"></span>
                      </div>
                      <div class="field-group flex-1">
                        BARANGAY<span class="underline flex-fill"></span>
                      </div>
                      <div class="field-group flex-1">
                        CITY/ MUNICIPALITY OF<span class="underline flex-fill"></span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="scope-section-wrapper">
                  <p class="box-label">SCOPE OF WORK</p>
                  <div class="scope-grid-building">
                    <div class="scope-col">
                      <v-checkbox dense hide-details label="NEW CONSTRUCTION"></v-checkbox>
                      <v-checkbox dense hide-details label="ERECTION"></v-checkbox>
                      <v-checkbox dense hide-details label="ADDITION"></v-checkbox>
                      <v-checkbox dense hide-details label="ALTERATION"></v-checkbox>
                    </div>
                    <div class="scope-col">
                      <v-checkbox dense hide-details label="RENOVATION"></v-checkbox>
                      <v-checkbox dense hide-details label="CONVERSION"></v-checkbox>
                      <v-checkbox dense hide-details label="REPAIR"></v-checkbox>
                      <v-checkbox dense hide-details label="MOVING"></v-checkbox>
                    </div>
                    <div class="scope-col">
                      <v-checkbox dense hide-details label="RAISING"></v-checkbox>
                      <v-checkbox dense hide-details label="DEMOLITION"></v-checkbox>
                      <div class="scope-item-with-input">
                        <v-checkbox
                          dense
                          hide-details
                          label="ACCESSORY BUILDING/STRUCTURE"
                        ></v-checkbox>
                      </div>
                      <div class="scope-item-with-input">
                        <v-checkbox dense hide-details label="OTHERS (Specify)"></v-checkbox>
                        <span class="underline"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-2">
              <p class="box-label-outer">BOX 2 (TO BE ACCOMPLISHED BY THE DESIGN PROFESSIONAL)</p>
              <div class="box-2-container">
                <p class="box-2-title">FIXTURES TO BE INSTALLED</p>
                <div class="fixtures-main-container">
                  <div class="fixtures-column">
                    <div class="fixture-row header">
                      <span class="qty-header">QTY.</span>
                      <span class="check-header">NEW FIXTURES</span>
                      <span class="check-header">EXISTING FIXTURES</span>
                      <span class="kind-header">KIND OF FIXTURES</span>
                    </div>

                    <div class="fixture-row" v-for="fixture in leftFixtures" :key="fixture">
                      <div class="qty-cell"></div>
                      <div class="check-cell">
                        <v-checkbox dense hide-details class="fixture-check"></v-checkbox>
                      </div>
                      <div class="check-cell">
                        <v-checkbox dense hide-details class="fixture-check"></v-checkbox>
                      </div>
                      <div class="kind-cell">
                        <v-checkbox
                          dense
                          hide-details
                          :label="fixture"
                          class="fixture-check"
                        ></v-checkbox>
                      </div>
                    </div>
                  </div>

                  <div class="fixtures-column">
                    <div class="fixture-row header">
                      <span class="qty-header">QTY.</span>
                      <span class="check-header">NEW FIXTURES</span>
                      <span class="check-header">EXISTING FIXTURES</span>
                      <span class="kind-header">KIND OF FIXTURES</span>
                    </div>

                    <div class="fixture-row" v-for="fixture in rightFixtures" :key="fixture">
                      <div class="qty-cell"></div>
                      <div class="check-cell">
                        <v-checkbox dense hide-details class="fixture-check"></v-checkbox>
                      </div>
                      <div class="check-cell">
                        <v-checkbox dense hide-details class="fixture-check"></v-checkbox>
                      </div>
                      <div class="kind-cell">
                        <v-checkbox
                          dense
                          hide-details
                          :label="fixture"
                          class="fixture-check"
                        ></v-checkbox>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="box-2-footer">
                  <div class="system-checks">
                    <v-checkbox dense hide-details label="WATER DISTRIBUTION SYSTEM"></v-checkbox>
                    <v-checkbox dense hide-details label="SEWAGE SYSTEM"></v-checkbox>
                    <v-checkbox dense hide-details label="SEPTIC TANK"></v-checkbox>
                    <v-checkbox dense hide-details label="STORM DRAINAGE SYSTEM"></v-checkbox>
                  </div>
                  <div class="prepared-by">
                    PREPARED BY:
                    <span class="underline" style="flex-grow: 1; margin-left: 8px"></span>
                  </div>
                </div>
              </div>
            </div>

            <div class="multi-box-grid mt-2">
              <div class="info-box-wrapper">
                <p class="box-label-outer">BOX 3</p>
                <div class="info-box">
                  <p class="info-box-title">DESIGN PROFESSIONAL, PLANS AND SPECIFICATIONS</p>
                  <div class="signature-area">
                    <div class="signature-line-main"></div>
                    <div class="signature-line-date">Date</div>
                  </div>
                  <div class="signature-caption-area">
                    <p class="font-weight-bold mb-0">PLUMBING ENGINEER / MASTER PLUMBER</p>
                    <p class="caption-text">(Signed and Sealed Over Printed Name)</p>
                  </div>
                  <div class="details-table">
                    <div class="detail-row full-width">
                      <span class="detail-label">Address</span>
                    </div>
                    <div class="detail-row">
                      <span class="detail-label">PRC Reg. No</span>
                    </div>
                    <div class="detail-row">
                      <span class="detail-label">Validity</span>
                    </div>
                    <div class="detail-row">
                      <span class="detail-label">PTR. No</span>
                    </div>
                    <div class="detail-row">
                      <span class="detail-label">Date Issued</span>
                    </div>
                    <div class="detail-row">
                      <span class="detail-label">Issued at</span>
                    </div>
                    <div class="detail-row">
                      <span class="detail-label">TIN</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="info-box-wrapper">
                <p class="box-label-outer">BOX 4</p>
                <div class="info-box">
                  <p class="info-box-title">SUPERVISOR / IN-CHARGE OF PLUMBING WORKS</p>
                  <div class="signature-area">
                    <div class="signature-line-main"></div>
                    <div class="signature-line-date">Date</div>
                  </div>
                  <div class="signature-caption-area">
                    <p class="font-weight-bold mb-0">PLUMBING ENGINEER / MASTER PLUMBER</p>
                    <p class="caption-text">(Signed and Sealed Over Printed Name)</p>
                  </div>
                  <div class="details-table">
                    <div class="detail-row full-width">
                      <span class="detail-label">Address</span>
                    </div>
                    <div class="detail-row">
                      <span class="detail-label">PRC Reg. No</span>
                    </div>
                    <div class="detail-row">
                      <span class="detail-label">Validity</span>
                    </div>
                    <div class="detail-row">
                      <span class="detail-label">PTR. No</span>
                    </div>
                    <div class="detail-row">
                      <span class="detail-label">Date Issued</span>
                    </div>
                    <div class="detail-row">
                      <span class="detail-label">Issued at</span>
                    </div>
                    <div class="detail-row">
                      <span class="detail-label">TIN</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="info-box-wrapper">
                <p class="box-label-outer">BOX 5</p>
                <div class="owner-box">
                  <p class="owner-box-title">BUILDING OWNER</p>
                  <div class="owner-signature-area">
                    <div class="owner-signature-line"></div>
                    <p class="owner-signature-caption">(Signature Over Printed Name)</p>
                    <p class="owner-date-line">
                      Date
                      <span class="underline" style="width: 150px"></span>
                    </p>
                  </div>
                  <div class="owner-details">
                    <div class="owner-detail-row full-width">Address</div>
                    <div class="owner-detail-row">
                      <div class="owner-detail-col">C.T.C. No.</div>
                      <div class="owner-detail-col">Date Issued</div>
                      <div class="owner-detail-col">Place Issued</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="info-box-wrapper">
                <p class="box-label-outer">BOX 6</p>
                <div class="owner-box">
                  <p class="owner-box-title">WITH MY CONSENT: LOT OWNER</p>
                  <div class="owner-signature-area">
                    <div class="owner-signature-line"></div>
                    <p class="owner-signature-caption">(Signature Over Printed Name)</p>
                    <p class="owner-date-line">
                      Date
                      <span class="underline" style="width: 150px"></span>
                    </p>
                  </div>
                  <div class="owner-details">
                    <div class="owner-detail-row full-width">Address</div>
                    <div class="owner-detail-row">
                      <div class="owner-detail-col">C.T.C. No.</div>
                      <div class="owner-detail-col">Date Issued</div>
                      <div class="owner-detail-col">Place Issued</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="plumbing-permit-form-page-2" class="page-break">
            <p class="processing-division-header">
              TO BE ACCOMPLISHED BY THE PROCESSING AND EVALUATION DIVISION
            </p>

            <p class="box-label-outer">BOX 7</p>
            <div class="box-7-container">
              <div class="received-date-header">
                <div class="received-by">RECEIVED BY</div>
                <div class="date-field">DATE</div>
              </div>
              <div class="architectural-documents-section">
                <p class="documents-title">FIVE (5) SETS OF PLUMBING DOCUMENTS</p>
                <div class="documents-grid">
                  <div class="documents-col">
                    <v-checkbox
                      dense
                      hide-details
                      label="1. PLUMBING PLANS AND LAYOUTS"
                    ></v-checkbox>
                    <v-checkbox
                      dense
                      hide-details
                      label="2. LOCATION PLAN AND SITE PLAN"
                    ></v-checkbox>
                    <v-checkbox
                      dense
                      hide-details
                      label="3. ISOMETRIC RISER DIAGRAM, SCHEMATICS"
                    ></v-checkbox>
                  </div>
                  <div class="documents-col">
                    <v-checkbox dense hide-details label="4. SPECIFICATIONS"></v-checkbox>
                    <v-checkbox
                      dense
                      hide-details
                      label="5. BILL OF MATERIALS AND COST ESTIMATES"
                    ></v-checkbox>
                    <div class="other-docs-item">
                      <v-checkbox dense hide-details label="6. OTHERS (Specify)"></v-checkbox>
                      <span class="underline" style="width: 100%"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p class="box-label-outer mt-4">BOX 8</p>
            <div class="box-8-container">
              <div class="box-8-cell header-main">PROGRESS FLOW</div>
              <div class="box-8-cell empty-header"></div>
              <div class="box-8-cell header-span-in">IN</div>
              <div class="box-8-cell header-span-out">OUT</div>
              <div class="box-8-cell header-proc">PROCESSED BY:</div>
              <div class="box-8-cell empty-header"></div>
              <div class="box-8-cell subheader">DATE</div>
              <div class="box-8-cell subheader">TIME</div>
              <div class="box-8-cell subheader">DATE</div>
              <div class="box-8-cell subheader">TIME</div>
              <div class="box-8-cell"></div>
              <div class="box-8-cell label-cell">PLUMBING PLANS & SPECS.</div>
              <div class="box-8-cell"></div>
              <div class="box-8-cell"></div>
              <div class="box-8-cell"></div>
              <div class="box-8-cell"></div>
              <div class="box-8-cell"></div>
              <div class="box-8-cell label-cell">LINE AND GRADE</div>
              <div class="box-8-cell"></div>
              <div class="box-8-cell"></div>
              <div class="box-8-cell"></div>
              <div class="box-8-cell"></div>
              <div class="box-8-cell"></div>
              <div class="box-8-cell label-cell no-bottom">OTHERS (Specify)</div>
              <div class="box-8-cell no-bottom"></div>
              <div class="box-8-cell no-bottom"></div>
              <div class="box-8-cell no-bottom"></div>
              <div class="box-8-cell no-bottom"></div>
              <div class="box-8-cell no-bottom"></div>
            </div>

            <p class="box-label-outer mt-4">BOX 9</p>
            <div class="box-9-container">
              <p class="box-9-title">ACTION TAKEN:</p>
              <p class="box-9-subtitle">PERMIT IS HEREBY ISSUED SUBJECT TO THE FOLLOWING:</p>
              <ol class="conditions-list">
                <li>
                  That under Article 1723 of the Civil Code of the Philippines, the engineer or
                  architect who drew up the plans and specifications for a building/structure is
                  liable for damages if within fifteen (15) years from the completion of the
                  structure, the same should collapse due to defect in the plans or specifications,
                  or defects in the ground.
                </li>
                <li>
                  That the proposed plumbing works shall be in accordance with the plumbing plans
                  filed with this Office and in conformity with the provisions of the latest Revised
                  National Plumbing Code of the Philippines, the National Building Code and its IRR.
                </li>
                <li>
                  That prior to any construction activity, a duly accomplished prescribed "<strong
                    >Notice of Construction</strong
                  >" shall be submitted to the Office of the Building Official.
                </li>
                <li>
                  That upon completion of the construction, the licensed full-time inspector and
                  supervisor/in-charge of construction works shall submit the entry to the logbook
                  duly signed and sealed to the building official including as-built plans and other
                  documents.
                </li>
                <li>
                  That this permit is null and void unless accompanied by the building permit.
                </li>
              </ol>
              <div class="permit-issued-by-section">
                <p class="box-9-subtitle">PERMIT ISSUED BY:</p>
                <div class="signature-area-9">
                  <div class="signature-line-main"></div>
                  <p class="font-weight-bold mb-0">ELMER T. ALBO</p>
                  <p class="font-weight-bold mb-1">BUILDING OFFICIAL</p>
                  <p class="caption-text mb-2">(Signature Over Printed Name)</p>
                  <p class="date-line-9">
                    Date<span class="underline" style="flex-grow: 1"></span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'PlumbingPermitForm',
  data() {
    return {
      isFormComplete: true, // Set to false if you want to add validation
      leftFixtures: [
        'WATER CLOSET',
        'FLOOR DRAIN',
        'LAVATORY',
        'KITCHEN SINK',
        'FAUCET',
        'SHOWER HEAD',
        'WATER METER',
        'GREASE TRAP',
      ],
      rightFixtures: [
        'BIDETTE',
        'LAUNDRY TRAYS',
        'DENTAL CUSPIDOR',
        'DRINKING FOUNTAIN',
        'BAR SINK',
        'SODA FOUNTAIN SINK',
        'LABORATORY SINK',
        'STERILIZER',
      ],
    }
  },
  methods: {
    downloadForm() {
      // Hide buttons before printing
      const buttons = document.querySelectorAll('.v-btn')
      buttons.forEach((btn) => (btn.style.display = 'none'))

      // Trigger browser print dialog which can save as PDF
      window.print()

      // Restore buttons after print dialog
      setTimeout(() => {
        buttons.forEach((btn) => (btn.style.display = ''))
      }, 100)
    },
  },
}
</script>

<style scoped>
.permit-form-wrapper {
  background: white;
  padding: 20px;
}

@media print {
  .v-app {
    background: white !important;
  }
  .v-btn,
  .v-app-bar,
  .v-toolbar,
  .v-navigation-drawer,
  .v-footer,
  .v-system-bar,
  .v-application__wrap > header,
  .v-application > header,
  header,
  .navbar,
  nav {
    display: none !important;
  }

  .permit-form-wrapper {
    padding: 0;
    box-shadow: none !important;
  }

  .page-break {
    page-break-before: always;
    padding-top: 20px;
  }

  .v-main,
  .v-container {
    padding: 0 !important;
    margin: 0 !important;
  }

  body {
    background: white !important;
  }
}

.a4-container {
  max-width: 1100px;
}
#plumbing-permit-form-page-1,
#plumbing-permit-form-page-2 {
  font-family: Arial, sans-serif;
  font-size: 10pt;
  color: #000;
}
.mt-2 {
  margin-top: 8px !important;
}
.my-4 {
  margin-top: 16px !important;
  margin-bottom: 16px !important;
}
.mb-0 {
  margin-bottom: 0 !important;
}
.mb-1 {
  margin-bottom: 4px !important;
}
.mb-2 {
  margin-bottom: 8px !important;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}
.form-no {
  font-size: 8pt;
  font-weight: bold;
}
.office-details {
  text-align: center;
  font-size: 9pt;
  line-height: 1.3;
}
.bold-text {
  font-weight: bold;
}
.permit-title-section {
  text-align: center;
  margin-bottom: 20px;
}
.permit-title {
  font-size: 16pt;
  font-weight: bold;
  letter-spacing: 1px;
}
.permit-numbers-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.permit-number-group {
  display: flex;
  flex-direction: column;
}
.permit-number-group label {
  font-size: 8pt;
  margin-bottom: 2px;
  font-weight: bold;
}
.input-boxes {
  display: flex;
}
.box-input {
  width: 28px;
  height: 28px;
  border: 1px solid black;
  text-align: center;
  margin-right: -1px;
}

.box-container {
  border: 2px solid black;
  width: 100%;
}
.box-label {
  font-size: 9pt;
  font-weight: bold;
  padding: 4px 8px;
  text-transform: uppercase;
}
.box-content {
  border-top: 2px solid black;
}
.box-row {
  display: flex;
  width: 100%;
  border-bottom: 1px solid black;
}
.box-row.no-bottom-border {
  border-bottom: none;
}
.cell {
  padding: 4px 8px;
  border-left: 1px solid black;
  display: flex;
  align-items: flex-end;
  font-size: 8pt;
  font-weight: bold;
}
.cell:first-child {
  border-left: none;
}
.sub-label {
  font-size: 8pt;
  text-transform: uppercase;
  color: #333;
  font-weight: normal;
}
.underline {
  display: inline-block;
  border-bottom: 1px solid #333;
  margin-left: 6px;
}
.box-label-outer {
  font-size: 9pt;
  font-weight: bold;
  margin-bottom: 2px;
}

.owner-label {
  flex: 0 0 12%;
}
.name-field {
  flex: 1 1 27%;
}
.mi-field {
  flex: 0 0 7%;
}
.tin-field {
  flex: 0 0 15%;
}
.enterprise-label {
  flex: 0 0 35%;
}
.ownership-field {
  flex: 1 1 25%;
}
.occupancy-field {
  flex: 1 1 40%;
}
.address-label {
  flex: 0 0 8%;
}
.address-no-street {
  flex: 1 1 25%;
}
.address-barangay {
  flex: 1 1 20%;
}
.address-city {
  flex: 1 1 22%;
}
.address-zip {
  flex: 0 0 8%;
}
.address-tel {
  flex: 1 1 17%;
}
.location-label {
  flex: 0 0 12%;
}
.location-details {
  flex: 1 1 88%;
  flex-direction: column;
  padding: 4px 8px;
}
.location-line {
  display: flex;
  width: 100%;
  margin-bottom: 4px;
}
.field-group {
  display: flex;
  align-items: center;
  margin-right: 16px;
  white-space: nowrap;
  font-weight: normal;
}
.loc-short {
  width: 80px;
}
.loc-medium {
  width: 120px;
}
.flex-1 {
  flex: 1;
}
.flex-fill {
  width: 100%;
}

.scope-section-wrapper {
  border-top: 2px solid black;
}
.scope-grid-building {
  padding: 4px 16px 12px 16px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0 16px;
}
.scope-grid-building .v-checkbox {
  margin: 0;
  padding: 0;
  height: 19px;
}
.scope-grid-building :deep(label) {
  font-size: 9pt !important;
}
.scope-col {
  display: flex;
  flex-direction: column;
}
.scope-item-with-input {
  display: flex;
  align-items: center;
  height: 24px;
}
.scope-item-with-input .v-checkbox {
  flex-shrink: 0;
}
.scope-underline {
  flex-grow: 1;
  margin-left: 4px;
}

.box-2-container {
  border: 2px solid black;
}
.box-2-title {
  font-size: 9pt;
  font-weight: bold;
  text-align: left;
  padding: 4px 8px;
  text-transform: uppercase;
  border-bottom: 2px solid black;
}
.fixtures-main-container {
  display: flex;
}
.fixtures-column {
  flex: 1;
}
.fixtures-column:first-child {
  border-right: 2px solid black;
}
.fixture-row {
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
}
.fixtures-column .fixture-row:last-child {
  border-bottom: none;
}
.fixture-row.header {
  font-weight: bold;
  font-size: 8pt;
  text-align: center;
  height: auto;
  padding: 2px 0;
  border-bottom: 2px solid black;
}
.qty-header {
  width: 50px;
  border-right: 1px solid black;
}
.check-header {
  flex: 0 0 100px;
  border-right: 1px solid black;
  font-size: 7.5pt;
  display: flex;
  align-items: left;
  justify-content: center;
  line-height: 1.1;
}
.kind-header {
  flex-grow: 1;
  text-align: left;
  padding-left: 20px;
}
.qty-cell {
  width: 50px;
  border-right: 1px solid black;
  align-self: stretch;
}
.check-cell {
  flex: 0 0 100px;
  border-right: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
}
.kind-cell {
  flex-grow: 1;
}
.fixture-check {
  margin: 0;
  padding: 0;
}
.fixture-check :deep(.v-input__slot) {
  margin-bottom: 0 !important;
}
.fixture-check :deep(label) {
  font-size: 9pt !important;
  color: black;
}
.box-2-footer {
  border-top: 2px solid black;
  padding: 4px 8px;
}
.system-checks {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.system-checks .v-checkbox {
  margin: 0;
  padding: 0;
}
.system-checks :deep(label) {
  font-size: 9pt !important;
}
.prepared-by {
  margin-top: 8px;
  font-size: 9pt;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.multi-box-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.info-box-wrapper {
  flex: 1;
}

.info-box {
  border: 2px solid black;
  padding: 8px;
  height: 100%;
}

.owner-box {
  border: 2px solid black;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.info-box-title {
  font-size: 9pt;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid black;
  padding-bottom: 8px;
  margin-bottom: 8px;
}
.signature-area {
  display: flex;
  align-items: flex-end;
  margin-top: 20px;
  margin-bottom: 4px;
}
.signature-line-main {
  border-bottom: 1px solid black;
  flex-grow: 1;
}
.signature-line-date {
  border-bottom: 1px solid black;
  width: 25%;
  margin-left: 8px;
  font-size: 9pt;
  color: #333;
  padding-bottom: 2px;
}
.signature-caption-area {
  text-align: center;
  font-size: 9pt;
  line-height: 1.2;
}
.caption-text {
  font-size: 8pt;
}
.details-table {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid black;
  margin-top: 8px;
}
.detail-row {
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  padding: 4px;
  font-size: 9pt;
}
.detail-row:nth-child(2n) {
  border-right: none;
}
.detail-row:nth-child(1) {
  grid-column: 1 / -1;
}
.detail-row:nth-last-child(-n + 2) {
  border-bottom: none;
}

.owner-box-title {
  font-size: 9pt;
  text-transform: uppercase;
  padding: 8px;
  text-align: center;
  line-height: 1.4;
  font-weight: bold;
}
.owner-signature-area {
  padding: 8px;
  text-align: center;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.owner-signature-line {
  border-bottom: 1px solid black;
  height: 1px;
  margin: 0 auto 4px auto;
  width: 80%;
}
.owner-signature-caption {
  font-size: 8pt;
}
.owner-date-line {
  font-size: 9pt;
  margin-top: 8px;
}
.owner-details {
  border-top: 1px solid black;
  font-size: 9pt;
  flex-shrink: 0;
}
.owner-detail-row {
  display: flex;
}
.owner-detail-row.full-width {
  padding: 8px;
  border-bottom: 1px solid black;
}
.owner-detail-col {
  flex: 1;
  padding: 8px;
  border-right: 1px solid black;
}
.owner-detail-col:last-child {
  border-right: none;
}

.processing-division-header {
  font-weight: bold;
  font-size: 10pt;
  margin-bottom: 4px;
}
.box-7-container {
  border: 2px solid black;
}
.received-date-header {
  display: flex;
  border-bottom: 1px solid black;
}
.received-by,
.date-field {
  flex: 1;
  padding: 4px 8px;
  font-weight: bold;
  font-size: 9pt;
}
.received-by {
  border-right: 1px solid black;
}
.architectural-documents-section {
  padding: 8px;
}
.documents-title {
  font-weight: bold;
  font-size: 9pt;
  text-align: center;
  margin-bottom: 8px;
}
.documents-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 20px;
}
.documents-col {
  display: flex;
  flex-direction: column;
}
.documents-col .v-checkbox {
  margin: -8px 0;
}
.documents-col :deep(label) {
  font-size: 9pt !important;
}
.other-docs-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 8px;
}
.box-8-container {
  display: grid;
  grid-template-columns: 2.5fr 1fr 1fr 1fr 1fr 1.5fr;
  border: 2px solid black;
  text-align: center;
  font-size: 9pt;
}
.box-8-cell {
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.box-8-container .box-8-cell:nth-child(6n) {
  border-right: none;
}
.box-8-cell.no-bottom {
  border-bottom: none;
}
.box-8-cell.header-main {
  grid-column: 1 / -1;
  font-weight: bold;
}
.box-8-cell.empty-header {
  border-bottom: none;
}
.box-8-cell.header-span-in {
  grid-column: 2 / 4;
  border-bottom: none;
  font-weight: bold;
}
.box-8-cell.header-span-out {
  grid-column: 4 / 6;
  border-bottom: none;
  font-weight: bold;
}
.box-8-cell.header-proc {
  border-bottom: none;
  font-weight: bold;
}
.box-8-cell.subheader {
  font-weight: bold;
}
.box-8-cell.label-cell {
  justify-content: flex-start;
  text-align: left;
  font-weight: bold;
}
.box-9-container {
  border: 2px solid black;
  padding: 12px;
}
.box-9-title {
  font-weight: bold;
  font-size: 10pt;
}
.box-9-subtitle {
  font-weight: bold;
  font-size: 9pt;
  margin-top: 12px;
}
.conditions-list {
  margin-top: 8px;
  padding-left: 20px;
  font-size: 9pt;
  line-height: 1.6;
}
.conditions-list li {
  margin-bottom: 8px;
}
.permit-issued-by-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 16px;
}
.signature-area-9 {
  width: 40%;
  text-align: center;
}
.date-line-9 {
  display: flex;
  align-items: center;
  font-size: 9pt;
}
</style>