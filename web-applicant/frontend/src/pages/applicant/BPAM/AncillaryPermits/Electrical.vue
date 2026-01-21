<template>
  <v-app>
    <v-main class="bg-grey-lighten-3 scrollable-main">
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
          <div id="electrical-permit-form-page-1">
            <div class="header-section">
              <div class="form-no">NBC FORM NO. A - 03</div>
              <div class="office-details">
                <div>Republic of the Philippines</div>
                <div>City/Municipality of Naga</div>
                <div>Province of Camarines Sur</div>
                <div class="bold-text">OFFICE OF THE BUILDING OFFICIAL</div>
              </div>
              <div class="form-no" style="visibility: hidden">NBC FORM NO. A - 03</div>
            </div>

            <div class="permit-title-section">
              <div class="permit-title">ELECTRICAL PERMIT</div>
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
                <label>EP NO</label>
                <div class="input-boxes">
                  <input
                    type="text"
                    maxlength="1"
                    v-for="n in 8"
                    :key="'ep-no-' + n"
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
              </div>

              <div class="attached-section-wrapper">
                <p class="box-label">SCOPE OF WORK</p>
                <div class="scope-of-work-grid">
                  <div class="scope-col-item">
                    <v-checkbox dense hide-details label="NEW INSTALLATION"></v-checkbox>
                  </div>
                  <div class="scope-col-item">
                    <v-checkbox
                      dense
                      hide-details
                      label="RECONNECTION OF SERVICE ENTRANCE"
                    ></v-checkbox>
                  </div>
                  <div class="scope-col-item">
                    <v-checkbox
                      dense
                      hide-details
                      label="RELOCATION OF SERVICE ENTRANCE"
                    ></v-checkbox>
                  </div>
                  <div class="scope-col-item">
                    <v-checkbox dense hide-details label="ANNUAL INSPECTION"></v-checkbox>
                  </div>
                  <div class="scope-col-item">
                    <v-checkbox
                      dense
                      hide-details
                      label="SEPARATION OF SERVICE ENTRANCE"
                    ></v-checkbox>
                  </div>
                  <div class="scope-col-item other-specify">
                    <v-checkbox dense hide-details label="OTHERS (Specify)"></v-checkbox>
                    <span class="underline flex-fill"></span>
                  </div>
                  <div class="scope-col-item">
                    <v-checkbox dense hide-details label="TEMPORARY"></v-checkbox>
                  </div>
                  <div class="scope-col-item">
                    <v-checkbox
                      dense
                      hide-details
                      label="UPGRADING OF SERVICE ENTRANCE"
                    ></v-checkbox>
                  </div>
                  <div class="scope-col-item"></div>
                </div>
              </div>

              <div class="attached-section-wrapper no-padding">
                <p class="section-title-center-underline">
                  SUMMARY OF ELECTRICAL LOADS/CAPACITIES APPLIED FOR
                </p>
                <div class="summary-grid">
                  <div class="summary-item">
                    TOTAL CONNECTED LOAD
                    <span class="underline flex-fill"></span> kVA
                  </div>
                  <div class="summary-item">
                    TOTAL TRANSFORMER CAPACITY
                    <span class="underline flex-fill"></span> kVA
                  </div>
                  <div class="summary-item">
                    TOTAL GENERATOR/UPS CAPACITY
                    <span class="underline flex-fill"></span> kVA
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-2">
              <p class="box-label-outer">
                BOX 2 (TO BE ACCOMPLISHED IN PRINT BY THE DESIGN PROFESSIONAL)
              </p>
              <div class="box-container">
                <div class="box-content-box2">
                  <div class="design-professional-section">
                    <p class="section-title-box2">DESIGN PROFESSIONAL, PLANS AND SPECIFICATIONS</p>
                    <div class="signature-details-box2">
                      <div class="signature-block-box2">
                        <div class="signature-line-main-box2"></div>
                        <p class="design-prof-label">PROFESSIONAL ELECTRICAL ENGINEER</p>
                        <p class="design-prof-caption">(Signed and Sealed Over Printed Name)</p>
                      </div>
                      <div class="date-block-box2">
                        <span class="date-label">Date</span>
                        <span class="underline date-underline-box2"></span>
                      </div>
                    </div>
                  </div>
                  <div class="details-table-box2">
                    <div class="detail-row-box2 full-width">
                      <span class="detail-label-box2">Address</span>
                    </div>
                    <div class="detail-row-box2">
                      <span class="detail-label-box2">PRC No.</span>
                    </div>
                    <div class="detail-row-box2">
                      <span class="detail-label-box2">Validity</span>
                    </div>
                    <div class="detail-row-box2">
                      <span class="detail-label-box2">PTR. No</span>
                    </div>
                    <div class="detail-row-box2">
                      <span class="detail-label-box2">Date Issued</span>
                    </div>
                    <div class="detail-row-box2">
                      <span class="detail-label-box2">Issued at</span>
                    </div>
                    <div class="detail-row-box2">
                      <span class="detail-label-box2">TIN</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-2">
              <p class="box-label-outer">BOX 3</p>
              <div class="box-3-container">
                <p class="box-3-title">SUPERVISOR / IN-CHARGE OF ELECTRICAL WORKS</p>
                <div class="box-3-checkboxes">
                  <v-checkbox
                    dense
                    hide-details
                    label="PROFESSIONAL ELECTRICAL ENGINEER"
                  ></v-checkbox>
                  <v-checkbox
                    dense
                    hide-details
                    label="REGISTERED ELECTRICAL ENGINEER"
                  ></v-checkbox>
                  <v-checkbox dense hide-details label="REGISTERED MASTER ELECTRICIAN"></v-checkbox>
                </div>
                <div class="box-3-signature-area">
                  <div class="signature-line"></div>
                  <div class="date-line">Date</div>
                </div>
                <p class="signature-caption">(Signed and Sealed Over Printed Name)</p>
                <div class="box-3-details-table">
                  <div class="detail-item">PRC. No</div>
                  <div class="detail-item">Validity</div>
                  <div class="detail-item">PTR. No</div>
                  <div class="detail-item">Date Issued</div>
                  <div class="detail-item">Issued at</div>
                  <div class="detail-item">TIN</div>
                  <div class="detail-item full-width">Address</div>
                </div>
              </div>
            </div>

            <div class="box-4-5-wrapper mt-2">
              <div class="info-box-wrapper">
                <p class="box-label-outer">BOX 4</p>
                <div class="owner-consent-box">
                  <p class="title">BUILDING OWNER</p>
                  <div class="signature-area">
                    <div class="line"></div>
                    <div class="date">Date</div>
                  </div>
                  <p class="caption">(Signature Over Printed Name)</p>
                  <div class="details-table">
                    <div class="detail-cell full-width">Address</div>
                    <div class="detail-cell">C.T.C. No.</div>
                    <div class="detail-cell">Date Issued</div>
                    <div class="detail-cell">Place Issued</div>
                  </div>
                </div>
              </div>

              <div class="info-box-wrapper">
                <p class="box-label-outer">BOX 5</p>
                <div class="owner-consent-box">
                  <p class="title">WITH MY CONSENT: <strong>LOT OWNER</strong></p>
                  <div class="signature-area">
                    <div class="line"></div>
                    <div class="date">Date</div>
                  </div>
                  <p class="caption">(Signature Over Printed Name)</p>
                  <div class="details-table">
                    <div class="detail-cell full-width">Address</div>
                    <div class="detail-cell">C.T.C. No.</div>
                    <div class="detail-cell">Date Issued</div>
                    <div class="detail-cell">Place Issued</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="electrical-permit-form-page-2" class="page-break">
            <p class="processing-division-header">
              TO BE ACCOMPLISHED BY THE PROCESSING AND EVALUATION DIVISION
            </p>

            <p class="box-label-outer">BOX 6</p>
            <div class="box-7-container">
              <div class="received-date-header">
                <div class="received-by">RECEIVED BY</div>
                <div class="date-field">DATE</div>
              </div>
              <div class="architectural-documents-section">
                <p class="documents-title">FIVE (5) SETS OF CIVIL/STRUCTURAL DOCUMENTS</p>
                <div class="documents-grid">
                  <div class="documents-col">
                    <v-checkbox
                      dense
                      hide-details
                      label="1. ELECTRICAL PLANS AND SPECIFICATIONS"
                    ></v-checkbox>
                    <v-checkbox
                      dense
                      hide-details
                      label="2. SPECIAL FIXTURES AND EQUIPMENT "
                    ></v-checkbox>
                    <v-checkbox
                      dense
                      hide-details
                      label="3. PROPOSED STARTING DATE OF INSTALLATION/CONSTRUCTION "
                    ></v-checkbox>
                  </div>
                  <div class="documents-col">
                    <v-checkbox
                      dense
                      hide-details
                      label="4. EXPECTED DATE OF COMPLETION/INSTALLATION/CONSTRUCTION"
                    ></v-checkbox>

                    <div class="other-docs-item">
                      <v-checkbox dense hide-details label="5. OTHERS (Specify)"></v-checkbox>
                      <span class="underline" style="width: 100%"></span>
                      <span class="underline mt-1" style="width: 100%"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p class="box-label-outer mt-4">BOX 7</p>
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
              <div class="box-8-cell label-cell">CIVIL/STRUCTURAL</div>
              <div class="box-8-cell"></div>
              <div class="box-8-cell"></div>
              <div class="box-8-cell"></div>
              <div class="box-8-cell"></div>
              <div class="box-8-cell"></div>

              <div class="box-8-cell label-cell">OTHERS (Specify)</div>
              <div class="box-8-cell"></div>
              <div class="box-8-cell"></div>
              <div class="box-8-cell"></div>
              <div class="box-8-cell"></div>
              <div class="box-8-cell"></div>
              <div class="box-8-cell label-cell no-bottom"></div>
              <div class="box-8-cell no-bottom"></div>
              <div class="box-8-cell no-bottom"></div>
              <div class="box-8-cell no-bottom"></div>
              <div class="box-8-cell no-bottom"></div>
              <div class="box-8-cell no-bottom"></div>
            </div>

            <p class="box-label-outer mt-4">BOX 8</p>
            <div class="box-9-container">
              <p class="box-9-title">ACTION TAKEN:</p>
              <p class="box-9-subtitle">PERMIT IS HEREBY ISSUED SUBJECT TO THE FOLLOWING:</p>
              <ol class="conditions-list">
                <li>
                  That under Article 1723 of the Civil Code of the Philippines, the
                  engineer/architect who drew up the plans and specifications for the
                  building/structure is responsible for damages if within fifteen (15) years from
                  the completion of the building/structure, the same should collapse due to defect
                  in the plans or specifications or defects in the ground. The engineer or architect
                  who supervises the construction shall be solidarily liable with the contractor
                  should the edifice collapse due to defect in the construction or the use of
                  inferior materials.
                </li>
                <li>
                  That the proposed civil/structural works shall be in accordance with the
                  structural plans filed with this Office and in conformity with the latest
                  Structural Code of the Philippines, the National Building Code and its IRR.
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
                  documents, and shall also accomplish the Certificate of Completion stating that
                  the civil/structural works conform to the provision of the Structural Code, the
                  National Building Code and its IRR.
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
  name: 'ElectricalPermitForm',
  data() {
    return {
      isFormComplete: true, // Set to false if you want to add validation
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
.scrollable-main {
  overflow-y: auto;
  height: 100vh;
}
.a4-container {
  max-width: 1100px;
}
.permit-form-wrapper {
  background: white;
  padding: 20px;
}
@media print {
  .v-app {
    background: white !important;
  }
  .scrollable-main {
    overflow: visible;
    height: auto;
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
  .bg-grey-lighten-3 {
    background: white !important;
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
#electrical-permit-form-page-1,
#electrical-permit-form-page-2 {
  font-family: Arial, sans-serif;
  font-size: 10pt;
  color: #000;
}
.mt-1 {
  margin-top: 4px !important;
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
.pa-3 {
  padding: 12px;
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
.section-title {
  font-weight: bold;
  font-size: 9pt;
  margin-bottom: 8px;
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
  text-transform: uppercase;
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

.attached-section-wrapper {
  border-top: 2px solid black;
  padding: 8px;
}
.attached-section-wrapper .box-label {
  padding-bottom: 8px;
}
.attached-section-wrapper.no-padding {
  padding: 0;
}
.section-title-center-underline {
  font-weight: bold;
  font-size: 9pt;
  text-align: center;
  margin-bottom: 0;
  border-bottom: 1px solid black;
  padding: 8px;
}
.scope-of-work-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px 16px;
}
.scope-col-item {
  display: flex;
  align-items: center;
  font-size: 9pt;
}
.scope-col-item .v-checkbox {
  flex-shrink: 0;
  margin: -8px 0;
  padding-top: 0;
  padding-bottom: 0;
}
.scope-col-item :deep(label) {
  font-size: 9pt !important;
  white-space: nowrap;
}
.other-specify {
  align-items: flex-end;
}
.other-specify .underline {
  margin-bottom: 2px;
}
.summary-grid {
  display: flex;
  padding: 8px;
}
.summary-item {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 9pt;
  font-weight: bold;
  white-space: nowrap;
}
.summary-item:not(:last-child) {
  border-right: 1px solid black;
  padding-right: 8px;
  margin-right: 8px;
}
.summary-item .underline {
  flex-grow: 1;
  margin-top: 4px;
  margin-left: 4px;
  margin-right: 4px;
}

.box-content-box2 {
  display: flex;
  width: 100%;
}
.design-professional-section {
  flex: 1;
  border-right: 1px solid black;
  padding: 8px;
  display: flex;
  flex-direction: column;
}
.section-title-box2 {
  font-weight: bold;
  font-size: 9pt;
  margin-bottom: 16px;
}
.signature-details-box2 {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding-bottom: 8px;
}
.signature-block-box2 {
  text-align: center;
  width: 100%;
}
.signature-line-main-box2 {
  border-bottom: 1px solid black;
  height: 1px;
  margin-bottom: 4px;
}
.design-prof-label {
  font-weight: bold;
  font-size: 9pt;
  margin-bottom: 0;
}
.design-prof-caption {
  font-size: 8pt;
  margin-bottom: 0;
}
.date-block-box2 {
  display: flex;
  align-items: center;
  margin-top: 16px;
  width: 100%;
}
.date-label {
  font-size: 9pt;
  white-space: nowrap;
  font-weight: bold;
}
.date-underline-box2 {
  flex-grow: 1;
  margin-left: 8px;
  margin-top: 2px;
}
.details-table-box2 {
  flex: 0 0 35%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-left: 1px solid black;
}
.detail-row-box2 {
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  padding: 4px;
  font-size: 9pt;
  display: flex;
  align-items: center;
}
.detail-row-box2:nth-child(even) {
  border-left: none;
}
.detail-row-box2.full-width {
  grid-column: 1 / -1;
  border-top: none;
}
.detail-row-box2:last-child {
  border-bottom: none;
}
.detail-label-box2 {
  font-weight: bold;
}

.box-3-container {
  border: 2px solid black;
}
.box-3-title {
  font-size: 9pt;
  font-weight: bold;
  padding: 4px 8px;
}
.box-3-checkboxes {
  display: flex;
  justify-content: space-around;
  padding: 4px 8px 8px 8px;
  border-bottom: 1px solid black;
}
.box-3-checkboxes .v-checkbox {
  margin: -8px 0;
}
.box-3-checkboxes :deep(label) {
  font-size: 9pt !important;
}
.box-3-signature-area {
  display: flex;
  align-items: flex-end;
  margin: 24px 8px 0 8px;
}
.box-3-signature-area .signature-line {
  flex-grow: 1;
  border-bottom: 1px solid black;
}
.box-3-signature-area .date-line {
  width: 25%;
  border-bottom: 1px solid black;
  margin-left: 16px;
  text-align: center;
  font-size: 9pt;
  color: #333;
}
.signature-caption {
  font-size: 8pt;
  text-align: center;
  margin-top: 4px;
}
.box-3-details-table {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid black;
  margin: 8px;
}
.box-3-details-table .detail-item {
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  padding: 4px 8px;
  min-height: 28px;
  font-size: 9pt;
}
.box-3-details-table .detail-item:nth-child(2n) {
  border-right: none;
}
.box-3-details-table .detail-item.full-width {
  grid-column: 1 / -1;
  border-bottom: none;
}
.box-3-details-table .detail-item:nth-last-child(2),
.box-3-details-table .detail-item:nth-last-child(3) {
  border-bottom: 1px solid black;
}

.box-4-5-wrapper {
  display: flex;
  gap: 8px;
}
.box-4-5-wrapper .info-box-wrapper {
  flex: 1;
}
.owner-consent-box {
  border: 2px solid black;
  width: 100%;
}
.owner-consent-box .title {
  font-size: 9pt;
  text-transform: uppercase;
  padding: 8px;
  line-height: 1.4;
  font-weight: bold;
}
.owner-consent-box .signature-area {
  padding: 16px 8px 0 8px;
  display: flex;
  align-items: flex-end;
}
.owner-consent-box .signature-area .line {
  flex-grow: 1;
  border-bottom: 1px solid black;
}
.owner-consent-box .signature-area .date {
  width: 35%;
  margin-left: 16px;
  border-bottom: 1px solid black;
  text-align: center;
  font-size: 9pt;
  color: #333;
}
.owner-consent-box .caption {
  font-size: 8pt;
  padding: 4px 8px;
  text-align: center;
}
.owner-consent-box .details-table {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-top: 2px solid black;
  font-size: 9pt;
}
.owner-consent-box .details-table .detail-cell {
  padding: 8px;
  border-right: 1px solid black;
}
.owner-consent-box .details-table .detail-cell:last-child {
  border-right: none;
}
.owner-consent-box .details-table .detail-cell.full-width {
  grid-column: 1 / -1;
  border-bottom: 1px solid black;
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
.caption-text {
  font-size: 8pt;
}
</style>