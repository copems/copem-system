<template>
  <v-app>
    <v-main class="bg-grey-lighten-3 scrollable-main">
      <v-container fluid class="px-4 mx-auto a4-container">
        <div class="permit-form-wrapper">
          <div id="architectural-permit-form-page-1">
            <div class="header-section">
              <div class="form-no">NBC FORM NO. A-01</div>
              <div class="office-details">
                <div>Republic of the Philippines</div>
                <div>City/Municipality of Naga</div>
                <div>Province of Camarines Sur</div>
                <div class="bold-text">OFFICE OF THE BUILDING OFFICIAL</div>
              </div>
              <div class="form-no" style="visibility: hidden">NBC FORM NO. A-01</div>
            </div>

            <div class="permit-title-section">
              <div class="permit-title">ARCHITECTURAL PERMIT</div>
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
                <label>AP NO</label>
                <div class="input-boxes">
                  <input
                    type="text"
                    maxlength="1"
                    v-for="n in 8"
                    :key="'ap-no-' + n"
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
              <div class="scope-section-wrapper">
                <p class="box-label">SCOPE OF WORK</p>
                <div class="scope-grid">
                  <div class="scope-col">
                    <div class="scope-item">
                      <v-checkbox dense hide-details label="NEW CONSTRUCTION"></v-checkbox
                      ><span class="underline scope-line"></span>
                    </div>
                    <div class="scope-item">
                      <v-checkbox dense hide-details label="ERECTION"></v-checkbox
                      ><span class="underline scope-line"></span>
                    </div>
                    <div class="scope-item">
                      <v-checkbox dense hide-details label="ADDITION"></v-checkbox
                      ><span class="underline scope-line"></span>
                    </div>
                    <div class="scope-item">
                      <v-checkbox dense hide-details label="ALTERATION"></v-checkbox
                      ><span class="underline scope-line"></span>
                    </div>
                  </div>
                  <div class="scope-col">
                    <div class="scope-item">
                      <v-checkbox dense hide-details label="RENOVATION"></v-checkbox
                      ><span class="underline scope-line"></span>
                    </div>
                    <div class="scope-item">
                      <v-checkbox dense hide-details label="CONVERSION"></v-checkbox
                      ><span class="underline scope-line"></span>
                    </div>
                    <div class="scope-item">
                      <v-checkbox dense hide-details label="REPAIR"></v-checkbox
                      ><span class="underline scope-line"></span>
                    </div>
                    <div class="scope-item">
                      <v-checkbox dense hide-details label="MOVING"></v-checkbox
                      ><span class="underline scope-line"></span>
                    </div>
                  </div>
                  <div class="scope-col">
                    <div class="scope-item">
                      <v-checkbox dense hide-details label="RAISING"></v-checkbox
                      ><span class="underline scope-line"></span>
                    </div>
                    <div class="scope-item">
                      <v-checkbox
                        dense
                        hide-details
                        label="ACCESSORY BUILDING/STRUCTURE"
                      ></v-checkbox
                      ><span class="underline scope-line-long"></span>
                    </div>
                    <div class="scope-item">
                      <v-checkbox dense hide-details label="OTHERS (Specify)"></v-checkbox
                      ><span class="underline scope-line-long"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="box-container mt-2">
              <p class="box-label">BOX 2 (TO BE ACCOMPLISHED BY THE DESIGN PROFESSIONAL)</p>
              <div class="box-content">
                <div class="facilities-section">
                  <p class="section-title">1. ARCHITECTURAL FACILITIES AND OTHER FEATURES...</p>
                  <div class="facilities-grid">
                    <v-checkbox dense hide-details label="STAIRS"></v-checkbox>
                    <v-checkbox dense hide-details label="WASH ROOMS AND TOILETS"></v-checkbox>
                    <v-checkbox dense hide-details label="SWITCHES, CONTROLS, BUZZERS"></v-checkbox>
                    <v-checkbox dense hide-details label="DRINKING FOUNTAINS"></v-checkbox>
                    <v-checkbox dense hide-details label="WALKWAYS"></v-checkbox>
                    <v-checkbox dense hide-details label="LIFTS/ELEVATORS"></v-checkbox>
                    <v-checkbox dense hide-details label="HANDRAILS"></v-checkbox>
                    <v-checkbox dense hide-details label="PUBLIC TELEPHONES"></v-checkbox>
                    <v-checkbox dense hide-details label="CORRIDORS"></v-checkbox>
                    <v-checkbox dense hide-details label="RAMPS"></v-checkbox>
                    <v-checkbox dense hide-details label="THRESHOLDS"></v-checkbox>
                    <v-checkbox dense hide-details label="SEATING ACCOMMODATIONS"></v-checkbox>
                    <v-checkbox
                      dense
                      hide-details
                      label="DOORS, ENTRANCES & THRESHOLDS"
                    ></v-checkbox>
                    <v-checkbox dense hide-details label="PARKING AREAS"></v-checkbox>
                    <v-checkbox dense hide-details label="FLOOR FINISHES"></v-checkbox>
                    <div class="scope-item">
                      <v-checkbox dense hide-details label="OTHERS (Specify)"></v-checkbox
                      ><span class="underline scope-line-long"></span>
                    </div>
                  </div>
                </div>
                <div class="bottom-sections-wrapper">
                  <div class="percentage-section">
                    <p class="section-title">2. PERCENTAGE OF SITE OCCUPANCY</p>
                    <div class="percentage-field">
                      <span>PERCENTAGE OF BUILDING FOOTPRINT</span
                      ><span class="underline flex-fill"></span><span>%</span>
                    </div>
                    <div class="percentage-field">
                      <span>PERCENTAGE OF IMPERVIOUS SURFACE AREA</span
                      ><span class="underline flex-fill"></span><span>%</span>
                    </div>
                    <div class="percentage-field">
                      <span>PERCENTAGE OF UNPAVED SURFACE AREA</span
                      ><span class="underline flex-fill"></span><span>%</span>
                    </div>
                  </div>
                  <div class="fire-code-section">
                    <p class="section-title">
                      3. CONFORMANCE TO FIRE CODE OF THE PHILIPPINES (P.D. 1185)
                    </p>
                    <div class="fire-code-grid">
                      <v-checkbox
                        dense
                        hide-details
                        label="NUMBER AND WIDTH OF EXIT DOORS"
                      ></v-checkbox>
                      <v-checkbox dense hide-details label="FIRE WALLS"></v-checkbox>
                      <div class="scope-item">
                        <v-checkbox dense hide-details label="OTHERS (Specify)"></v-checkbox
                        ><span class="underline scope-line-long"></span>
                      </div>
                      <v-checkbox dense hide-details label="WIDTH OF CORRIDORS"></v-checkbox>
                      <v-checkbox
                        dense
                        hide-details
                        label="FIRE FIGHTING AND SAFETY FACILITIES"
                      ></v-checkbox>
                      <div></div>
                      <v-checkbox dense hide-details label="DISTANCE TO FIRE EXITS"></v-checkbox>
                      <v-checkbox dense hide-details label="SMOKE DETECTORS"></v-checkbox>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="box-3-4-wrapper mt-2">
              <div class="info-box-wrapper">
                <p class="box-label-outer">BOX 3</p>
                <div class="info-box">
                  <p class="info-box-title">DESIGN PROFESSIONAL, PLANS AND SPECIFICATIONS</p>
                  <div class="signature-area">
                    <div class="signature-line-main"></div>
                    <div class="signature-line-date">Date</div>
                  </div>
                  <div class="signature-caption-area">
                    <p class="font-weight-bold mb-0">ARCHITECT</p>
                    <p class="caption-text">(Signed and Sealed Over Printed Name)</p>
                  </div>
                  <div class="details-table">
                    <div class="detail-row full-width">
                      <span class="detail-label">Address</span>
                    </div>
                    <div class="detail-row">
                      <span class="detail-label">IAPOA No.</span>
                    </div>
                    <div class="detail-row">
                      <span class="detail-label">Validity</span>
                    </div>
                    <div class="detail-row">
                      <span class="detail-label">PRC No.</span>
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
                  <p class="info-box-title">SUPERVISOR / IN-CHARGEOFF ARCHITECTURAL WORKS</p>
                  <div class="signature-area">
                    <div class="signature-line-main"></div>
                    <div class="signature-line-date">Date</div>
                  </div>
                  <div class="signature-caption-area">
                    <p class="font-weight-bold mb-0">ARCHITECT</p>
                    <p class="caption-text">(Signed and Sealed Over Printed Name)</p>
                  </div>
                  <div class="details-table">
                    <div class="detail-row full-width">
                      <span class="detail-label">Address</span>
                    </div>
                    <div class="detail-row">
                      <span class="detail-label">IAPOA No.</span>
                    </div>
                    <div class="detail-row">
                      <span class="detail-label">Validity</span>
                    </div>
                    <div class="detail-row">
                      <span class="detail-label">PRC No.</span>
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
            </div>

            <div class="box-5-6-wrapper mt-2">
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

          <div id="architectural-permit-form-page-2" class="page-break">
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
                <p class="documents-title">FIVE (5) SETS OF ARCHITECTURAL DOCUMENTS</p>
                <div class="documents-grid">
                  <div class="documents-col">
                    <v-checkbox
                      dense
                      hide-details
                      label="1. VICINITY MAP/LOCATION PLAN WITHIN A TWO-KILOMETER RADIUS"
                    ></v-checkbox>
                    <v-checkbox dense hide-details label="2. SITE DEVELOPMENT PLAN"></v-checkbox>
                    <v-checkbox dense hide-details label="3. PERSPECTIVE"></v-checkbox>
                    <v-checkbox dense hide-details label="4. FLOOR PLANS"></v-checkbox>
                    <v-checkbox
                      dense
                      hide-details
                      label="5. ELEVATIONS, AT LEAST FOUR (4)"
                    ></v-checkbox>
                    <v-checkbox
                      dense
                      hide-details
                      label="6. SECTIONS, AT LEAST TWO (2)"
                    ></v-checkbox>
                    <v-checkbox
                      dense
                      hide-details
                      label="7. CEILING PLANS SHOWING LIGHTING FIXTURES AND DIFFUSERS"
                    ></v-checkbox>
                  </div>
                  <div class="documents-col">
                    <v-checkbox
                      dense
                      hide-details
                      label="8. DETAILS OF RAMPS, PARKING FOR THE DISABLED, STAIRS, FIRE ESCAPES, CABINETS AND PARTITIONS"
                    ></v-checkbox>
                    <v-checkbox
                      dense
                      hide-details
                      label="9. SCHEDULE OF DOORS AND WINDOWS"
                    ></v-checkbox>
                    <v-checkbox
                      dense
                      hide-details
                      label="10. SCHEDULE OF FINISHES FOR FLOORS, CEILINGS AND WALLS"
                    ></v-checkbox>
                    <v-checkbox dense hide-details label="11. ARCHITECTURAL INTERIOR"></v-checkbox>
                    <v-checkbox dense hide-details label="12. SPECIFICATIONS"></v-checkbox>
                    <v-checkbox dense hide-details label="13. COST ESTIMATE"></v-checkbox>
                    <div class="other-docs-item">
                      <v-checkbox dense hide-details label="14. OTHERS (Specify)"></v-checkbox>
                      <span class="underline" style="width: 100%"></span>
                      <span class="underline mt-1" style="width: 100%"></span>
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
              <div class="box-8-cell label-cell">ARCHITECTURAL DRAWINGS</div>
              <div class="box-8-cell"></div>
              <div class="box-8-cell"></div>
              <div class="box-8-cell"></div>
              <div class="box-8-cell"></div>
              <div class="box-8-cell"></div>
              <div class="box-8-cell label-cell">SPECIFICATIONS</div>
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

            <p class="box-label-outer mt-4">BOX 9</p>
            <div class="box-9-container">
              <p class="box-9-title">ACTION TAKEN:</p>
              <p class="box-9-subtitle">PERMIT IS HEREBY ISSUED SUBJECT TO THE FOLLOWING:</p>
              <ol class="conditions-list">
                <li>
                  That under Article 1723 of the Civil Code of the Philippines, the architect (and
                  engineer) who drew up the plans and specifications for the building/structure is
                  responsible for damages if within fifteen (15) years from the completion of the
                  building/structure, the same should collapse due to defect in the plans or
                  specifications or defects in the ground. The engineer or architect who supervises
                  the construction shall be solidarily liable with the contractor should the edifice
                  collapse due to defect in the construction or the use of inferior materials.
                </li>
                <li>
                  That the proposed architectural works shall be in accordance with the
                  architectural plans filed with this Office and in conformity with the latest
                  Architectural Code of the Philippines, the National Building Code and its IRR.
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
                  the architectural works conform to the provision of the Architectural Code, the
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
  name: 'BuildingPermitForm',
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
  .scrollable-main {
    overflow: visible;
    height: auto;
  }
  .v-app-bar,
  .v-toolbar,
  .v-navigation-drawer,
  .v-footer,
  .v-system-bar,
  header,
  .header-section,
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
#architectural-permit-form-page-1,
#architectural-permit-form-page-2 {
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
.scope-grid {
  padding: 8px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.scope-col {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.scope-item {
  display: flex;
  align-items: center;
}
.scope-item .v-checkbox {
  flex-shrink: 0;
  margin: -8px 0;
}
.scope-item :deep(label) {
  font-size: 9pt !important;
  white-space: nowrap;
}
.scope-line,
.scope-line-long {
  flex-grow: 1;
}

.facilities-section {
  padding: 8px;
  border-bottom: 1px solid black;
}
.facilities-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0 16px;
}
.facilities-grid .v-checkbox,
.fire-code-grid .v-checkbox {
  margin: -8px 0;
}
.facilities-grid :deep(label),
.fire-code-grid :deep(label) {
  font-size: 9pt !important;
}
.bottom-sections-wrapper {
  display: flex;
}
.percentage-section {
  width: 50%;
  padding: 8px;
}
.fire-code-section {
  width: 50%;
  padding: 8px;
  border-left: 1px solid black;
}
.percentage-field {
  display: flex;
  align-items: center;
  font-size: 9pt;
  margin-bottom: 12px;
}
.fire-code-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0 8px;
}

.box-3-4-wrapper {
  display: flex;
  gap: 8px;
}
.info-box-wrapper {
  flex: 1;
}
.info-box {
  border: 2px solid black;
  padding: 8px;
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

.box-5-6-wrapper {
  display: flex;
  gap: 8px;
}
.owner-box {
  border: 2px solid black;
  width: 100%;
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
  padding: 16px 8px 8px 8px;
  text-align: center;
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