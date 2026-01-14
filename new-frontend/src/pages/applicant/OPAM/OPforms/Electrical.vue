<template>
  <v-app>
    <v-main class="grey-background main-content-padded">
      <v-container fluid class="pa-4" style="max-width: 1000px; min-height: 700px">
        <div class="card-header-row">
          <v-spacer></v-spacer>
          <v-btn
            rounded="pill"
            elevation="3"
            size="large"
            class="download-btn-custom print-btn-top"
            @click="printForm"
          >
            PRINT FORM
          </v-btn>
        </div>
        <v-card class="pa-6 printable-form">
          <!-- Header -->
          <div class="text-left mb-2">
            <small>NBC Form No. 96006-E</small>
          </div>

          <div class="text-center mb-4">
            <div class="text-subtitle-2">Republic of the Philippines</div>
            <div class="text-subtitle-2">Municipality/City of Naga</div>
            <div class="text-subtitle-2">Province of Camarines Sur</div>
            <div class="text-h6 font-weight-bold mt-2">
              OFFICE OF THE BUILDING OFFICIAL
            </div>
            <br />
            <div class="text-h5 font-weight-bold mt-2">
              CERTIFICATE OF FINAL ELECTRICAL INSPECTION/COMPLETION
            </div>
          </div>

          <div>
            <!-- Main Content -->
            <div class="form-content">
              <p class="certification-text mb-3">
                THIS IS TO CERTIFY THAT FINAL ELECTRICAL INSTALLATION HAS BEEN CONDUCTED
                ON THE BUILDING AND/OR PREMISES COVERED BY BUILDING PERMIT NO
                <span
                  style="
                    display: inline-block;
                    border-bottom: 1px solid #000;
                    min-width: 120px;
                    height: 18px;
                    margin: 0 5px;
                  "
                  >&nbsp;</span
                >
                ISSUED ON
                <span
                  style="
                    display: inline-block;
                    border-bottom: 1px solid #000;
                    min-width: 120px;
                    height: 18px;
                    margin: 0 5px;
                  "
                  >&nbsp;</span
                >
                AND THE SAME WERE FOUND COMPLETED IN ACCORDANCE WITH THE APPROVED PLANS
                AND SPECIFICATIONS ON FILE WITH THE OFFICE OF THE BUILDING OFFICIAL AND IN
                ACCORDANCE WITH PHILIPPINE ELECTRICAL CODE PROVISIONS.
              </p>
              <!-- Applicant Name Box -->
              <table class="main-form-table mt-0">
                <tbody>
                  <tr>
                    <td colspan="3" style="padding: 0; border: none">
                      <div class="applicant-box">
                        <table class="applicant-table" cellspacing="0" cellpadding="0">
                          <tr>
                            <td class="app-label-cell">NAME OF APPLICANT</td>
                            <td class="app-header-cell">LAST NAME</td>
                            <td class="app-header-cell">FIRST NAME</td>
                            <td class="app-header-cell">MIDDLE NAME</td>
                          </tr>
                        </table>
                      </div>
                      <!-- Address Box -->
                      <div class="applicant-box">
                        <table class="applicant-table" cellspacing="0" cellpadding="0">
                          <tr>
                            <td class="app-label-cell">ADDRESS</td>
                            <td class="app-header-cell">NO.</td>
                            <td class="app-header-cell">STREET</td>
                            <td class="app-header-cell">BARANGAY</td>
                            <td class="app-header-cell">CITY/MUNICIPALITY</td>
                          </tr>
                        </table>
                      </div>
                      <div class="applicant-box">
                        <table class="applicant-table" cellspacing="0" cellpadding="0">
                          <tr>
                            <td class="app-header-cell">LOCATION OF INSTALLATION: NO.</td>
                            <td class="app-header-cell">STREET</td>
                            <td class="app-header-cell">BARANGAY</td>
                            <td class="app-header-cell">CITY/MUNICIPALITY</td>
                          </tr>
                        </table>
                      </div>
                      <div class="applicant-box">
                        <table class="applicant-table" cellspacing="0" cellpadding="0">
                          <tr>
                            <td class="app-header-cell">TYPE OF OCCUPANCY OR USE</td>
                          </tr>
                        </table>
                      </div>
                      <div class="applicant-box">
                        <table class="applicant-table" cellspacing="0" cellpadding="0">
                          <tr>
                            <td class="app-header-cell">START OF INSTALLATION</td>
                            <td class="app-header-cell">DATE OF COMPLETION</td>
                          </tr>
                        </table>
                      </div>
                      <br />
                      <!-- Outlets/Devices/Equipments Section -->
                      <div
                        style="
                          border: 1px solid #444;
                          margin: 0;
                          padding: 0;
                          width: 100%;
                          box-sizing: border-box;
                        "
                      >
                        <div
                          style="
                            text-align: center;
                            font-weight: bold;
                            border-bottom: 1px solid #444;
                            padding: 3px 0;
                            letter-spacing: 0.5px;
                          "
                        >
                          OUTLETS/DEVICES/EQUIPMENTS
                        </div>
                        <table
                          cellspacing="0"
                          cellpadding="0"
                          style="width: 100%; border-collapse: collapse; font-size: 10px"
                        >
                          <tr>
                            <td
                              colspan="2"
                              style="
                                font-weight: bold;
                                padding: 4px 8px;
                                vertical-align: top;
                              "
                            >
                              NUMBER OF OUTLETS
                            </td>
                            <td
                              rowspan="5"
                              style="border-left: 1px solid #444; width: 1px"
                            ></td>
                            <td
                              colspan="3"
                              style="
                                font-weight: bold;
                                padding: 4px 8px;
                                vertical-align: top;
                              "
                            >
                              NO. OF EQUIPMENT/WIRING DEVICES:
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 4px 8px; vertical-align: top">
                              <span
                                style="
                                  display: inline-block;
                                  border-bottom: 1px solid #000;
                                  height: 12px;
                                  vertical-align: bottom;
                                  margin-right: 6px;
                                  min-width: 40px;
                                "
                              ></span
                              >LIGHT
                            </td>
                            <td style="padding: 4px 8px 4px 32px; vertical-align: top">
                              <span
                                style="
                                  display: inline-block;
                                  border-bottom: 1px solid #000;
                                  height: 12px;
                                  vertical-align: bottom;
                                  margin-right: 6px;
                                  min-width: 40px;
                                "
                              ></span
                              >SPO. COOKING UNIT
                            </td>
                            <td style="padding: 4px 8px; vertical-align: top">
                              <span
                                style="
                                  display: inline-block;
                                  border-bottom: 1px solid #000;
                                  height: 12px;
                                  vertical-align: bottom;
                                  margin-right: 6px;
                                  min-width: 40px;
                                "
                              ></span
                              >TOGGLE SWITCH
                            </td>
                            <td style="padding: 4px 8px 4px 32px; vertical-align: top">
                              <span
                                style="
                                  display: inline-block;
                                  border-bottom: 1px solid #000;
                                  height: 12px;
                                  vertical-align: bottom;
                                  margin-right: 6px;
                                  min-width: 40px;
                                "
                              ></span
                              >FA DETECTORS
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 4px 8px; vertical-align: top">
                              <span
                                style="
                                  display: inline-block;
                                  border-bottom: 1px solid #000;
                                  height: 12px;
                                  vertical-align: bottom;
                                  margin-right: 6px;
                                  min-width: 40px;
                                "
                              ></span
                              >CONVENIENCE/RECEPTCLE
                            </td>
                            <td style="padding: 4px 8px 4px 32px; vertical-align: top">
                              <span
                                style="
                                  display: inline-block;
                                  border-bottom: 1px solid #000;
                                  height: 12px;
                                  vertical-align: bottom;
                                  margin-right: 6px;
                                  min-width: 40px;
                                "
                              ></span
                              >SPO. WATER HEATER
                            </td>
                            <td style="padding: 4px 8px; vertical-align: top">
                              <span
                                style="
                                  display: inline-block;
                                  border-bottom: 1px solid #000;
                                  height: 12px;
                                  vertical-align: bottom;
                                  margin-right: 6px;
                                  min-width: 40px;
                                "
                              ></span
                              >BELLS/BUZZLES
                            </td>
                            <td style="padding: 4px 8px 4px 32px; vertical-align: top">
                              <span
                                style="
                                  display: inline-block;
                                  border-bottom: 1px solid #000;
                                  height: 12px;
                                  vertical-align: bottom;
                                  margin-right: 6px;
                                  min-width: 40px;
                                "
                              ></span
                              >OTHERS (See attached list)
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 4px 8px; vertical-align: top">
                              <span
                                style="
                                  display: inline-block;
                                  border-bottom: 1px solid #000;
                                  height: 12px;
                                  vertical-align: bottom;
                                  margin-right: 6px;
                                  min-width: 40px;
                                "
                              ></span
                              >SPO. AIRCON
                            </td>
                            <td style="padding: 4px 8px 4px 32px; vertical-align: top">
                              <span
                                style="
                                  display: inline-block;
                                  border-bottom: 1px solid #000;
                                  height: 12px;
                                  vertical-align: bottom;
                                  margin-right: 6px;
                                  min-width: 40px;
                                "
                              ></span
                              >SPO. WATER PUMP
                            </td>
                            <td style="padding: 4px 8px; vertical-align: top">
                              <span
                                style="
                                  display: inline-block;
                                  border-bottom: 1px solid #000;
                                  height: 12px;
                                  vertical-align: bottom;
                                  margin-right: 6px;
                                  min-width: 40px;
                                "
                              ></span
                              >PUSH BUTTONS
                            </td>
                            <td style="padding: 4px 8px 4px 32px; vertical-align: top">
                              <span
                                style="
                                  display: inline-block;
                                  border-bottom: 1px solid #000;
                                  height: 12px;
                                  vertical-align: bottom;
                                  margin-right: 6px;
                                  min-width: 160px;
                                "
                              ></span>
                            </td>
                          </tr>
                        </table>
                      </div>
                      <br />
                      <!-- Loads to be Connected + Nature of Works + Type of Service + Remarks -->
                      <div
                        style="
                          border: 1px solid #444;
                          width: 100%;
                          box-sizing: border-box;
                        "
                      >
                        <table
                          cellspacing="0"
                          cellpadding="0"
                          style="width: 100%; border-collapse: collapse; font-size: 10px"
                        >
                          <!-- Header for Loads -->
                          <tr>
                            <td
                              colspan="5"
                              style="
                                padding: 6px 8px;
                                border-bottom: 1px solid #444;
                                font-weight: bold;
                              "
                            >
                              1. Loads to be Connected:
                            </td>
                          </tr>
                          <!-- Three-column loads list with two vertical dividers -->
                          <tr>
                            <!-- Left group -->
                            <td
                              style="
                                padding: 6px 14px 8px 16px;
                                vertical-align: top;
                                width: 33%;
                              "
                            >
                              <div style="margin: 2px 0">_____ LIGHT</div>
                              <div style="margin: 2px 0">
                                _____ CONVENIENCE/RECEPTACLE
                              </div>
                              <div style="margin: 2px 0">_____ SPO, AIRCON</div>
                            </td>
                            <!-- Vertical divider -->
                            <td
                              style="
                                width: 1px;
                                border-left: 1px solid #444;
                                border-right: 1px solid #444;
                              "
                            ></td>
                            <!-- Middle group -->
                            <td
                              style="
                                padding: 6px 14px 8px 16px;
                                vertical-align: top;
                                width: 33%;
                              "
                            >
                              <div style="margin: 2px 0">_____ SPO, COOKING UNIT</div>
                              <div style="margin: 2px 0">_____ SPO, WATER HEATER</div>
                              <div style="margin: 2px 0">_____ SPO, WATER PUMP</div>
                            </td>
                            <!-- Vertical divider -->
                            <td
                              style="
                                width: 1px;
                                border-left: 1px solid #444;
                                border-right: 1px solid #444;
                              "
                            ></td>
                            <!-- Right group -->
                            <td
                              style="
                                padding: 6px 14px 8px 16px;
                                vertical-align: top;
                                width: 34%;
                              "
                            >
                              <div style="margin: 2px 0">_____ TOGGLE SWITCH</div>
                              <div style="margin: 2px 0">_____ BELLS/BUZZERS</div>
                              <div style="margin: 2px 0">_____ PUSH BUTTONS</div>
                              <div style="margin: 2px 0">_____ FA DETECTORS</div>
                              <div style="margin: 2px 0">
                                _____ OTHERS (See attached List)
                                <div
                                  style="
                                    height: 12px;
                                    border-bottom: 1px solid #000;
                                    margin-top: 2px;
                                  "
                                ></div>
                              </div>
                            </td>
                          </tr>
                          <!-- Nature of works -->
                          <tr>
                            <td
                              colspan="5"
                              style="border-top: 1px solid #444; padding: 6px 8px"
                            >
                              <div
                                style="display: flex; align-items: flex-end; gap: 10px"
                              >
                                <div style="min-width: 140px">2. Nature of works</div>
                                <div
                                  style="
                                    flex: 1;
                                    height: 14px;
                                    border-bottom: 1px solid #000;
                                  "
                                ></div>
                              </div>
                            </td>
                          </tr>
                          <!-- Type of Service line with three underlines -->
                          <tr>
                            <td colspan="5" style="padding: 4px 8px">
                              <div
                                style="
                                  display: flex;
                                  align-items: flex-end;
                                  flex-wrap: wrap;
                                  gap: 14px;
                                "
                              >
                                <div>Type of Service:</div>
                                <div>
                                  Voltage
                                  <span
                                    style="
                                      display: inline-block;
                                      height: 14px;
                                      min-width: 160px;
                                      border-bottom: 1px solid #000;
                                      margin-left: 6px;
                                      vertical-align: bottom;
                                    "
                                  ></span>
                                </div>
                                <div>
                                  Size of Wires
                                  <span
                                    style="
                                      display: inline-block;
                                      height: 14px;
                                      min-width: 160px;
                                      border-bottom: 1px solid #000;
                                      margin-left: 6px;
                                      vertical-align: bottom;
                                    "
                                  ></span>
                                </div>
                                <div>
                                  Phase
                                  <span
                                    style="
                                      display: inline-block;
                                      height: 14px;
                                      min-width: 160px;
                                      border-bottom: 1px solid #000;
                                      margin-left: 6px;
                                      vertical-align: bottom;
                                    "
                                  ></span>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <!-- Remarks with two lines -->
                          <tr>
                            <td colspan="5" style="padding: 6px 8px">
                              <div
                                style="
                                  display: flex;
                                  align-items: flex-end;
                                  gap: 10px;
                                  margin-bottom: 8px;
                                "
                              >
                                <div>4. Remarks</div>
                                <div
                                  style="
                                    flex: 1;
                                    height: 14px;
                                    border-bottom: 1px solid #000;
                                  "
                                ></div>
                              </div>
                              <div
                                style="
                                  height: 14px;
                                  border-bottom: 1px solid #000;
                                  margin-left: 70px;
                                "
                              ></div>
                            </td>
                          </tr>
                        </table>
                      </div>
                      <br />
                      <!-- Outlets/Devices/Equipments Section -->
                      <div
                        style="
                          border: 1px solid #444;
                          margin: 0;
                          padding: 0;
                          width: 100%;
                          box-sizing: border-box;
                        "
                      >
                        <div
                          style="
                            text-align: center;
                            font-weight: bold;
                            border-bottom: 1px solid #444;
                            padding: 3px 0;
                            letter-spacing: 0.5px;
                          "
                        >
                          OUTLETS/DEVICES/EQUIPMENTS
                        </div>
                        <table
                          cellspacing="0"
                          cellpadding="0"
                          style="width: 100%; border-collapse: collapse; font-size: 10px"
                        >
                          <tr>
                            <td
                              colspan="2"
                              style="
                                font-weight: bold;
                                padding: 4px 8px;
                                vertical-align: top;
                              "
                            >
                              NUMBER OF OUTLETS
                            </td>
                            <td
                              rowspan="5"
                              style="border-left: 1px solid #444; width: 1px"
                            ></td>
                            <td
                              colspan="3"
                              style="
                                font-weight: bold;
                                padding: 4px 8px;
                                vertical-align: top;
                              "
                            >
                              NO. OF EQUIPMENT/WIRING DEVICES:
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 4px 8px; vertical-align: top">
                              <span
                                style="
                                  display: inline-block;
                                  border-bottom: 1px solid #000;
                                  height: 12px;
                                  vertical-align: bottom;
                                  margin-right: 6px;
                                  min-width: 40px;
                                "
                              ></span
                              >LIGHT
                            </td>
                            <td style="padding: 4px 8px 4px 32px; vertical-align: top">
                              <span
                                style="
                                  display: inline-block;
                                  border-bottom: 1px solid #000;
                                  height: 12px;
                                  vertical-align: bottom;
                                  margin-right: 6px;
                                  min-width: 40px;
                                "
                              ></span
                              >SPO. COOKING UNIT
                            </td>
                            <td style="padding: 4px 8px; vertical-align: top">
                              <span
                                style="
                                  display: inline-block;
                                  border-bottom: 1px solid #000;
                                  height: 12px;
                                  vertical-align: bottom;
                                  margin-right: 6px;
                                  min-width: 40px;
                                "
                              ></span
                              >TOGGLE SWITCH
                            </td>
                            <td style="padding: 4px 8px 4px 32px; vertical-align: top">
                              <span
                                style="
                                  display: inline-block;
                                  border-bottom: 1px solid #000;
                                  height: 12px;
                                  vertical-align: bottom;
                                  margin-right: 6px;
                                  min-width: 40px;
                                "
                              ></span
                              >FA DETECTORS
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 4px 8px; vertical-align: top">
                              <span
                                style="
                                  display: inline-block;
                                  border-bottom: 1px solid #000;
                                  height: 12px;
                                  vertical-align: bottom;
                                  margin-right: 6px;
                                  min-width: 40px;
                                "
                              ></span
                              >CONVENIENCE/RECEPTCLE
                            </td>
                            <td style="padding: 4px 8px 4px 32px; vertical-align: top">
                              <span
                                style="
                                  display: inline-block;
                                  border-bottom: 1px solid #000;
                                  height: 12px;
                                  vertical-align: bottom;
                                  margin-right: 6px;
                                  min-width: 40px;
                                "
                              ></span
                              >SPO. WATER HEATER
                            </td>
                            <td style="padding: 4px 8px; vertical-align: top">
                              <span
                                style="
                                  display: inline-block;
                                  border-bottom: 1px solid #000;
                                  height: 12px;
                                  vertical-align: bottom;
                                  margin-right: 6px;
                                  min-width: 40px;
                                "
                              ></span
                              >BELLS/BUZZLES
                            </td>
                            <td style="padding: 4px 8px 4px 32px; vertical-align: top">
                              <span
                                style="
                                  display: inline-block;
                                  border-bottom: 1px solid #000;
                                  height: 12px;
                                  vertical-align: bottom;
                                  margin-right: 6px;
                                  min-width: 40px;
                                "
                              ></span
                              >OTHERS (See attached list)
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 4px 8px; vertical-align: top">
                              <span
                                style="
                                  display: inline-block;
                                  border-bottom: 1px solid #000;
                                  height: 12px;
                                  vertical-align: bottom;
                                  margin-right: 6px;
                                  min-width: 40px;
                                "
                              ></span
                              >SPO. AIRCON
                            </td>
                            <td style="padding: 4px 8px 4px 32px; vertical-align: top">
                              <span
                                style="
                                  display: inline-block;
                                  border-bottom: 1px solid #000;
                                  height: 12px;
                                  vertical-align: bottom;
                                  margin-right: 6px;
                                  min-width: 40px;
                                "
                              ></span
                              >SPO. WATER PUMP
                            </td>
                            <td style="padding: 4px 8px; vertical-align: top">
                              <span
                                style="
                                  display: inline-block;
                                  border-bottom: 1px solid #000;
                                  height: 12px;
                                  vertical-align: bottom;
                                  margin-right: 6px;
                                  min-width: 40px;
                                "
                              ></span
                              >PUSH BUTTONS
                            </td>
                            <td style="padding: 4px 8px 4px 32px; vertical-align: top">
                              <span
                                style="
                                  display: inline-block;
                                  border-bottom: 1px solid #000;
                                  height: 12px;
                                  vertical-align: bottom;
                                  margin-right: 6px;
                                  min-width: 160px;
                                "
                              ></span>
                            </td>
                          </tr>
                        </table>
                      </div>
                      <br />
                      <!-- Persons in Charge of Installation Section -->
                      <div
                        style="
                          border: 1px solid #444;
                          width: 100%;
                          box-sizing: border-box;
                        "
                      >
                        <div
                          style="
                            text-align: center;
                            font-weight: bold;
                            border-bottom: 1px solid #444;
                            padding: 3px 0;
                            letter-spacing: 0.5px;
                          "
                        >
                          PERSONS IN CHARGE OF INSTALLATION
                        </div>
                        <table
                          cellspacing="0"
                          cellpadding="0"
                          style="width: 100%; border-collapse: collapse; font-size: 10px"
                        >
                          <!-- Row of three role checkboxes -->
                          <tr>
                            <td
                              style="
                                width: 33%;
                                padding: 4px 8px;
                                border-right: 1px solid #444;
                              "
                            >
                              <span
                                style="
                                  width: 12px;
                                  height: 12px;
                                  border: 1px solid #000;
                                  margin-right: 6px;
                                  vertical-align: middle;
                                "
                              ></span>
                              PROFESSIONAL. ELECTRICAL ENGINEER
                            </td>
                            <td
                              style="
                                width: 33%;
                                padding: 4px 8px;
                                border-right: 1px solid #444;
                              "
                            >
                              <span
                                style="
                                  width: 12px;
                                  height: 12px;
                                  border: 1px solid #000;
                                  margin-right: 6px;
                                  vertical-align: middle;
                                "
                              ></span>
                              REGISTERED ELECTRICAL ENGINEER
                            </td>
                            <td style="width: 34%; padding: 4px 8px">
                              <span
                                style="
                                  width: 12px;
                                  height: 12px;
                                  border: 1px solid #000;
                                  margin-right: 6px;
                                  vertical-align: middle;
                                "
                              ></span>
                              REGISTERED MASTER ELECTRICIAN<br />
                              <span style="margin-left: 20px"
                                >(Not exceeding 600 Volts &amp; 500 kVA)</span
                              >
                            </td>
                          </tr>
                          <!-- Name / PRC Reg No. -->
                          <tr>
                            <td
                              colspan="2"
                              style="
                                padding: 6px 8px;
                                border-top: 1px solid #444;
                                border-right: 1px solid #444;
                              "
                            >
                              NAME:<span
                                style="
                                  border-bottom: 1px solid #000;
                                  height: 14px;
                                  min-width: 420px;
                                  margin-left: 6px;
                                  vertical-align: bottom;
                                "
                              ></span>
                            </td>
                            <td style="padding: 6px 8px; border-top: 1px solid #444">
                              PRC REG. NO.<span
                                style="
                                  border-bottom: 1px solid #000;
                                  height: 14px;
                                  min-width: 180px;
                                  margin-left: 6px;
                                  vertical-align: bottom;
                                "
                              ></span>
                            </td>
                          </tr>
                          <!-- Signature / Validity -->
                          <tr>
                            <td
                              colspan="2"
                              style="
                                padding: 6px 8px;
                                border-top: 1px solid #444;
                                border-right: 1px solid #444;
                              "
                            >
                              SIGNATURE:<span
                                style="
                                  border-bottom: 1px solid #000;
                                  height: 14px;
                                  min-width: 420px;
                                  margin-left: 6px;
                                  vertical-align: bottom;
                                "
                              ></span>
                            </td>
                            <td style="padding: 6px 8px; border-top: 1px solid #444">
                              VALIDITY<span
                                style="
                                  border-bottom: 1px solid #000;
                                  height: 14px;
                                  min-width: 180px;
                                  margin-left: 6px;
                                  vertical-align: bottom;
                                "
                              ></span>
                            </td>
                          </tr>
                          <!-- Address full width -->
                          <tr>
                            <td
                              colspan="3"
                              style="padding: 6px 8px; border-top: 1px solid #444"
                            >
                              ADDRESS:<span
                                style="
                                  border-bottom: 1px solid #000;
                                  height: 14px;
                                  width: 76%;
                                  margin-left: 6px;
                                  vertical-align: bottom;
                                "
                              ></span>
                            </td>
                          </tr>
                          <!-- PTR No. / Date Issued / Place Issued -->
                          <tr>
                            <td
                              style="
                                padding: 6px 8px;
                                border-top: 1px solid #444;
                                border-right: 1px solid #444;
                              "
                            >
                              PTR NO.<span
                                style="
                                  border-bottom: 1px solid #000;
                                  height: 14px;
                                  min-width: 140px;
                                  margin-left: 6px;
                                  vertical-align: bottom;
                                "
                              ></span>
                            </td>
                            <td
                              style="
                                padding: 6px 8px;
                                border-top: 1px solid #444;
                                border-right: 1px solid #444;
                              "
                            >
                              DATE ISSUED<span
                                style="
                                  border-bottom: 1px solid #000;
                                  height: 14px;
                                  min-width: 160px;
                                  margin-left: 6px;
                                  vertical-align: bottom;
                                "
                              ></span>
                            </td>
                            <td style="padding: 6px 8px; border-top: 1px solid #444">
                              PLACE ISSUED<span
                                style="
                                  border-bottom: 1px solid #000;
                                  height: 14px;
                                  min-width: 160px;
                                  margin-left: 6px;
                                  vertical-align: bottom;
                                "
                              ></span>
                            </td>
                          </tr>
                          <!-- CTC No. / Date of Issued / TIN -->
                          <tr>
                            <td
                              style="
                                padding: 6px 8px;
                                border-top: 1px solid #444;
                                border-right: 1px solid #444;
                              "
                            >
                              CTC NO.<span
                                style="
                                  border-bottom: 1px solid #000;
                                  height: 14px;
                                  min-width: 140px;
                                  margin-left: 6px;
                                  vertical-align: bottom;
                                "
                              ></span>
                            </td>
                            <td
                              style="
                                padding: 6px 8px;
                                border-top: 1px solid #444;
                                border-right: 1px solid #444;
                              "
                            >
                              DATE OF ISSUED<span
                                style="
                                  border-bottom: 1px solid #000;
                                  height: 14px;
                                  min-width: 160px;
                                  margin-left: 6px;
                                  vertical-align: bottom;
                                "
                              ></span>
                            </td>
                            <td style="padding: 6px 8px; border-top: 1px solid #444">
                              TIN<span
                                style="
                                  border-bottom: 1px solid #000;
                                  height: 14px;
                                  min-width: 160px;
                                  margin-left: 6px;
                                  vertical-align: bottom;
                                "
                              ></span>
                            </td>
                          </tr>
                        </table>
                      </div>
                      <br />
                      <!-- Inspection/Approval Signatures Section (no outer box) -->
                      <div style="width: 100%; box-sizing: border-box">
                        <table
                          cellspacing="0"
                          cellpadding="0"
                          style="width: 100%; border-collapse: collapse; font-size: 10px"
                        >
                          <tr>
                            <!-- INSPECTED BY -->
                            <td
                              style="
                                width: 33.33%;
                                padding: 8px 10px;
                                vertical-align: top;
                              "
                            >
                              <div style="font-weight: bold; margin-bottom: 8px">
                                INSPECTED BY:
                              </div>
                              <div
                                style="
                                  width: 90%;
                                  margin: 2px auto;
                                  height: 14px;
                                  border-bottom: 1px solid #000;
                                "
                              ></div>
                              <div style="text-align: center; margin-top: 2px">
                                ELECTRICAL INSPECTOR
                              </div>
                              <div
                                style="
                                  width: 90%;
                                  margin: 8px auto 2px;
                                  height: 14px;
                                  border-bottom: 1px solid #000;
                                "
                              ></div>
                              <div style="text-align: center">
                                PRC. REG. NO. &amp; VALIDITY
                              </div>
                              <div style="margin-top: 10px">
                                AMOUNT PAID Php
                                <span
                                  style="
                                    display: inline-block;
                                    height: 14px;
                                    min-width: 120px;
                                    border-bottom: 1px solid #000;
                                    vertical-align: bottom;
                                    margin-left: 6px;
                                  "
                                ></span>
                              </div>
                            </td>
                            <!-- RECOMMENDING APPROVAL -->
                            <td
                              style="
                                width: 33.33%;
                                padding: 8px 10px;
                                vertical-align: top;
                              "
                            >
                              <div
                                style="
                                  font-weight: bold;
                                  margin-bottom: 8px;
                                  text-align: center;
                                "
                              >
                                RECOMMENDING APPROVAL:
                              </div>
                              <div style="text-align: center; font-weight: bold">
                                GREGORY DL. MORENO
                              </div>
                              <div
                                style="
                                  width: 90%;
                                  margin: 6px auto 2px;
                                  height: 14px;
                                  border-bottom: 1px solid #000;
                                "
                              ></div>
                              <div style="text-align: center">
                                ELECTRICAL ENGINEER OF THE BUILDING OFFICE
                              </div>
                              <div
                                style="
                                  width: 90%;
                                  margin: 10px auto 2px;
                                  height: 14px;
                                  border-bottom: 1px solid #000;
                                "
                              ></div>
                              <div style="text-align: center">
                                PRC. REG. NO. &amp; VALIDITY
                              </div>
                              <div style="margin-top: 10px">
                                O. R No.
                                <span
                                  style="
                                    display: inline-block;
                                    height: 14px;
                                    min-width: 160px;
                                    border-bottom: 1px solid #000;
                                    vertical-align: bottom;
                                    margin-left: 6px;
                                  "
                                ></span>
                              </div>
                            </td>
                            <!-- APPROVED BY -->
                            <td
                              style="
                                width: 33.34%;
                                padding: 8px 10px;
                                vertical-align: top;
                              "
                            >
                              <div style="font-weight: bold; margin-bottom: 8px">
                                APPROVED BY:
                              </div>
                              <div style="text-align: center; font-weight: bold">
                                ALEXANDER N. CANING
                              </div>
                              <div
                                style="
                                  width: 90%;
                                  margin: 6px auto 2px;
                                  height: 14px;
                                  border-bottom: 1px solid #000;
                                "
                              ></div>
                              <div style="text-align: center">
                                ACTING BUILDING OFFICIAL
                              </div>
                              <div style="margin-top: 18px">
                                DATE
                                <span
                                  style="
                                    display: inline-block;
                                    height: 14px;
                                    min-width: 160px;
                                    border-bottom: 1px solid #000;
                                    vertical-align: bottom;
                                    margin-left: 6px;
                                  "
                                ></span>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </v-card>

        <!-- Page 2 -->
        <v-card
          class="pa-6 printable-form mt-8"
          style="page-break-before: always; break-before: page"
        >
          <div>
            <!-- Number of Stories / Costs Section -->
            <div style="border: 1px solid #444; width: 100%; box-sizing: border-box">
              <table
                cellspacing="0"
                cellpadding="0"
                style="width: 100%; border-collapse: collapse; font-size: 10px"
              >
                <tr>
                  <td
                    style="
                      padding: 6px 8px;
                      border-bottom: 1px solid #444;
                      font-weight: bold;
                    "
                  >
                    NUMBER OF STORIES
                  </td>
                </tr>
                <tr>
                  <td
                    style="
                      padding: 6px 8px;
                      border-bottom: 1px solid #444;
                      font-weight: bold;
                    "
                  >
                    ESTIMATED COST
                  </td>
                </tr>
                <tr>
                  <td
                    style="
                      padding: 6px 8px;
                      border-bottom: 1px solid #444;
                      font-weight: bold;
                    "
                  >
                    ACTUAL
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 8px; border-bottom: 1px solid #444">
                    <div style="display: flex; align-items: flex-end; gap: 10px">
                      <div style="min-width: 60px">COST</div>
                      <div
                        style="flex: 1; height: 14px; border-bottom: 1px solid #000"
                      ></div>
                    </div>
                  </td>
                </tr>
              </table>
              <div style="padding: 8px 10px; font-size: 10px">
                <div style="margin: 4px 0">a.) Materials (Total Cost) &#8369;</div>
                <div style="margin: 6px 0">
                  1. Electrical wires
                  <span
                    style="
                      display: inline-block;
                      border-bottom: 1px solid #000;
                      height: 14px;
                      width: 65%;
                      margin-left: 8px;
                      vertical-align: bottom;
                    "
                  ></span>
                </div>
                <div style="margin: 6px 0">
                  2. Lighting outlets
                  <span
                    style="
                      display: inline-block;
                      border-bottom: 1px solid #000;
                      height: 14px;
                      width: 65%;
                      margin-left: 8px;
                      vertical-align: bottom;
                    "
                  ></span>
                </div>
                <div style="margin: 6px 0">
                  3. Convenience outlets
                  <span
                    style="
                      display: inline-block;
                      border-bottom: 1px solid #000;
                      height: 14px;
                      width: 65%;
                      margin-left: 8px;
                      vertical-align: bottom;
                    "
                  ></span>
                </div>
                <div style="margin: 6px 0">
                  4. Switches
                  <span
                    style="
                      display: inline-block;
                      border-bottom: 1px solid #000;
                      height: 14px;
                      width: 65%;
                      margin-left: 8px;
                      vertical-align: bottom;
                    "
                  ></span>
                </div>
                <div style="margin: 10px 0 6px 40px">
                  Others (specify)
                  <span
                    style="
                      display: inline-block;
                      border-bottom: 1px solid #000;
                      height: 14px;
                      width: 70%;
                      margin-left: 8px;
                      vertical-align: bottom;
                    "
                  ></span>
                </div>
                <div style="margin: 8px 0">b.) Other</div>
                <div
                  style="
                    display: flex;
                    align-items: flex-end;
                    gap: 12px;
                    margin-top: 16px;
                  "
                >
                  <div>
                    Cost
                    <span
                      style="
                        display: inline-block;
                        border-bottom: 1px solid #000;
                        height: 14px;
                        width: 60%;
                        margin-left: 6px;
                        vertical-align: bottom;
                      "
                    ></span>
                  </div>
                  <div style="flex: 1; text-align: right; font-size: 9px">
                    This includes professional fees, permits and other fees.
                  </div>
                </div>
              </div>
            </div>

            <br />
            <!-- Loads to be Connected + Nature of Works + Type of Service + Remarks -->
            <div style="border: 1px solid #444; width: 100%; box-sizing: border-box">
              <table
                cellspacing="0"
                cellpadding="0"
                style="width: 100%; border-collapse: collapse; font-size: 10px"
              >
                <!-- Header for Loads -->
                <tr>
                  <td
                    colspan="5"
                    style="
                      padding: 6px 8px;
                      border-bottom: 1px solid #444;
                      font-weight: bold;
                    "
                  >
                    1. Loads to be Connected:
                  </td>
                </tr>
                <!-- Three-column loads list with two vertical dividers -->
                <tr>
                  <!-- Left group -->
                  <td style="padding: 6px 14px 8px 16px; vertical-align: top; width: 33%">
                    <div style="margin: 2px 0">_____ LIGHT</div>
                    <div style="margin: 2px 0">_____ CONVENIENCE/RECEPTACLE</div>
                    <div style="margin: 2px 0">_____ SPO, AIRCON</div>
                  </td>
                  <!-- Vertical divider -->
                  <td
                    style="
                      width: 1px;
                      border-left: 1px solid #444;
                      border-right: 1px solid #444;
                    "
                  ></td>
                  <!-- Middle group -->
                  <td style="padding: 6px 14px 8px 16px; vertical-align: top; width: 33%">
                    <div style="margin: 2px 0">_____ SPO, COOKING UNIT</div>
                    <div style="margin: 2px 0">_____ SPO, WATER HEATER</div>
                    <div style="margin: 2px 0">_____ SPO, WATER PUMP</div>
                  </td>
                  <!-- Vertical divider -->
                  <td
                    style="
                      width: 1px;
                      border-left: 1px solid #444;
                      border-right: 1px solid #444;
                    "
                  ></td>
                  <!-- Right group -->
                  <td style="padding: 6px 14px 8px 16px; vertical-align: top; width: 34%">
                    <div style="margin: 2px 0">_____ TOGGLE SWITCH</div>
                    <div style="margin: 2px 0">_____ BELLS/BUZZERS</div>
                    <div style="margin: 2px 0">_____ PUSH BUTTONS</div>
                    <div style="margin: 2px 0">_____ FA DETECTORS</div>
                    <div style="margin: 2px 0">
                      _____ OTHERS (See attached List)
                      <div
                        style="
                          height: 12px;
                          border-bottom: 1px solid #000;
                          margin-top: 2px;
                        "
                      ></div>
                    </div>
                  </td>
                </tr>
                <!-- Nature of works -->
                <tr>
                  <td colspan="5" style="border-top: 1px solid #444; padding: 6px 8px">
                    <div style="display: flex; align-items: flex-end; gap: 10px">
                      <div style="min-width: 140px">2. Nature of works</div>
                      <div
                        style="flex: 1; height: 14px; border-bottom: 1px solid #000"
                      ></div>
                    </div>
                  </td>
                </tr>
                <!-- Type of Service line with three underlines -->
                <tr>
                  <td colspan="5" style="padding: 4px 8px">
                    <div
                      style="
                        display: flex;
                        align-items: flex-end;
                        flex-wrap: wrap;
                        gap: 14px;
                      "
                    >
                      <div>Type of Service:</div>
                      <div>
                        Voltage
                        <span
                          style="
                            display: inline-block;
                            height: 14px;
                            min-width: 160px;
                            border-bottom: 1px solid #000;
                            margin-left: 6px;
                            vertical-align: bottom;
                          "
                        ></span>
                      </div>
                      <div>
                        Size of Wires
                        <span
                          style="
                            display: inline-block;
                            height: 14px;
                            min-width: 160px;
                            border-bottom: 1px solid #000;
                            margin-left: 6px;
                            vertical-align: bottom;
                          "
                        ></span>
                      </div>
                      <div>
                        Phase
                        <span
                          style="
                            display: inline-block;
                            height: 14px;
                            min-width: 160px;
                            border-bottom: 1px solid #000;
                            margin-left: 6px;
                            vertical-align: bottom;
                          "
                        ></span>
                      </div>
                    </div>
                  </td>
                </tr>
                <!-- Remarks with two lines -->
                <tr>
                  <td colspan="5" style="padding: 6px 8px">
                    <div
                      style="
                        display: flex;
                        align-items: flex-end;
                        gap: 10px;
                        margin-bottom: 8px;
                      "
                    >
                      <div>4. Remarks</div>
                      <div
                        style="flex: 1; height: 14px; border-bottom: 1px solid #000"
                      ></div>
                    </div>
                    <div
                      style="
                        height: 14px;
                        border-bottom: 1px solid #000;
                        margin-left: 70px;
                      "
                    ></div>
                  </td>
                </tr>
              </table>
            </div>

            <br />
            <!-- Certification Statement -->
            <div style="text-align: center; margin-bottom: 8px; font-size: 10px">
              I hereby certify that the above data and information are true and correct to
              the best of my knowledge and belief.
            </div>

            <!-- Electrical Fees and PEE/REE/RME Section -->
            <div style="border: 1px solid #444; width: 100%; box-sizing: border-box">
              <table
                cellspacing="0"
                cellpadding="0"
                style="width: 100%; border-collapse: collapse; font-size: 10px"
              >
                <tr>
                  <td
                    style="
                      padding: 6px 8px;
                      border-bottom: 1px solid #444;
                      border-right: 1px solid #444;
                      font-weight: bold;
                      width: 50%;
                    "
                  >
                    ELECTRICAL FEES
                  </td>
                  <td
                    style="
                      padding: 6px 8px;
                      border-bottom: 1px solid #444;
                      font-weight: bold;
                      width: 50%;
                    "
                  >
                    PEE/REE/RME
                  </td>
                </tr>
                <tr>
                  <td
                    style="
                      padding: 8px;
                      border-right: 1px solid #444;
                      vertical-align: top;
                    "
                  >
                    <div style="margin: 4px 0">
                      Fee
                      <span
                        style="display: inline-block; margin-left: 30px; min-width: 30px"
                        >P</span
                      >
                      <span
                        style="
                          display: inline-block;
                          border-bottom: 1px solid #000;
                          height: 14px;
                          width: calc(100% - 80px);
                          margin-left: 8px;
                          vertical-align: bottom;
                        "
                      ></span>
                    </div>
                    <div style="margin: 4px 0">
                      Surcharge
                      <span
                        style="display: inline-block; margin-left: 2px; min-width: 30px"
                        >P</span
                      >
                      <span
                        style="
                          display: inline-block;
                          border-bottom: 1px solid #000;
                          height: 14px;
                          width: calc(100% - 100px);
                          margin-left: 8px;
                          vertical-align: bottom;
                        "
                      ></span>
                    </div>
                    <div style="margin: 4px 0">
                      Total
                      <span
                        style="display: inline-block; margin-left: 32px; min-width: 30px"
                        >P</span
                      >
                      <span
                        style="
                          display: inline-block;
                          border-bottom: 1px solid #000;
                          height: 14px;
                          width: calc(100% - 80px);
                          margin-left: 8px;
                          vertical-align: bottom;
                        "
                      ></span>
                    </div>
                    <div style="margin-top: 16px">
                      Computed by:
                      <span
                        style="
                          display: inline-block;
                          border-bottom: 1px solid #000;
                          height: 14px;
                          width: calc(100% - 110px);
                          margin-left: 8px;
                          vertical-align: bottom;
                        "
                      ></span>
                      <div style="text-align: center; font-size: 9px; margin-top: 2px">
                        Signature Over Printed Name
                      </div>
                    </div>
                  </td>
                  <td style="padding: 8px; vertical-align: top">
                    <div
                      style="
                        margin: 4px 0;
                        border-bottom: 1px solid #444;
                        padding-bottom: 4px;
                      "
                    >
                      ADDRESS
                      <span
                        style="
                          display: inline-block;
                          border-bottom: 1px solid #000;
                          height: 14px;
                          width: calc(100% - 80px);
                          margin-left: 8px;
                          vertical-align: bottom;
                        "
                      ></span>
                    </div>
                    <div
                      style="display: flex; border-bottom: 1px solid #444; padding: 4px 0"
                    >
                      <div style="flex: 1">
                        PRC REG. NO.
                        <span
                          style="
                            display: inline-block;
                            border-bottom: 1px solid #000;
                            height: 14px;
                            width: 100px;
                            margin-left: 8px;
                            vertical-align: bottom;
                          "
                        ></span>
                      </div>
                      <div style="flex: 1; padding-left: 8px">
                        VALIDITY
                        <span
                          style="
                            display: inline-block;
                            border-bottom: 1px solid #000;
                            height: 14px;
                            width: 100px;
                            margin-left: 8px;
                            vertical-align: bottom;
                          "
                        ></span>
                      </div>
                    </div>
                    <div
                      style="display: flex; border-bottom: 1px solid #444; padding: 4px 0"
                    >
                      <div style="flex: 1">
                        PTR NO.
                        <span
                          style="
                            display: inline-block;
                            border-bottom: 1px solid #000;
                            height: 14px;
                            width: 120px;
                            margin-left: 8px;
                            vertical-align: bottom;
                          "
                        ></span>
                      </div>
                      <div style="flex: 1; padding-left: 8px">
                        TIN
                        <span
                          style="
                            display: inline-block;
                            border-bottom: 1px solid #000;
                            height: 14px;
                            width: 130px;
                            margin-left: 8px;
                            vertical-align: bottom;
                          "
                        ></span>
                      </div>
                    </div>
                    <div style="margin: 4px 0">
                      CTC NO.
                      <span
                        style="
                          display: inline-block;
                          border-bottom: 1px solid #000;
                          height: 14px;
                          width: calc(100% - 80px);
                          margin-left: 8px;
                          vertical-align: bottom;
                        "
                      ></span>
                    </div>
                    <div style="margin: 4px 0">
                      DATE ISSUED
                      <span
                        style="
                          display: inline-block;
                          border-bottom: 1px solid #000;
                          height: 14px;
                          width: calc(100% - 110px);
                          margin-left: 8px;
                          vertical-align: bottom;
                        "
                      ></span>
                    </div>
                    <div style="margin: 4px 0">
                      PLACE ISUED
                      <span
                        style="
                          display: inline-block;
                          border-bottom: 1px solid #000;
                          height: 14px;
                          width: calc(100% - 110px);
                          margin-left: 8px;
                          vertical-align: bottom;
                        "
                      ></span>
                    </div>
                  </td>
                </tr>
              </table>
            </div>

            <br />
            <!-- LOAD Table -->
            <div style="border: 1px solid #444; width: 100%; box-sizing: border-box">
              <div
                style="
                  text-align: center;
                  font-weight: bold;
                  border-bottom: 1px solid #444;
                  padding: 6px 0;
                  font-size: 10px;
                "
              >
                LOAD
              </div>
              <table
                cellspacing="0"
                cellpadding="0"
                style="width: 100%; border-collapse: collapse; font-size: 10px"
              >
                <tr style="height: 30px">
                  <td style="width: 50%; border-right: 1px solid #444"></td>
                  <td style="width: 50%"></td>
                </tr>
                <tr style="height: 30px; border-top: 1px solid #444">
                  <td style="border-right: 1px solid #444"></td>
                  <td></td>
                </tr>
                <tr style="height: 30px; border-top: 1px solid #444">
                  <td style="border-right: 1px solid #444"></td>
                  <td></td>
                </tr>
                <tr style="height: 30px; border-top: 1px solid #444">
                  <td style="border-right: 1px solid #444"></td>
                  <td></td>
                </tr>
                <tr style="height: 30px; border-top: 1px solid #444">
                  <td style="border-right: 1px solid #444"></td>
                  <td></td>
                </tr>
              </table>
            </div>

            <br />
            <!-- Nature of Work Section -->
            <div style="border: 1px solid #444; width: 100%; box-sizing: border-box">
              <div
                style="
                  font-weight: bold;
                  border-bottom: 1px solid #444;
                  padding: 6px 8px;
                  font-size: 10px;
                "
              >
                NATURE OF WORK
              </div>
              <table
                cellspacing="0"
                cellpadding="0"
                style="width: 100%; border-collapse: collapse; font-size: 10px"
              >
                <tr>
                  <td
                    style="
                      padding: 6px 8px;
                      border-right: 1px solid #444;
                      border-bottom: 1px solid #444;
                      width: 50%;
                    "
                  >
                    Inspector
                    <span
                      style="
                        display: inline-block;
                        border-bottom: 1px solid #000;
                        height: 14px;
                        width: calc(100% - 80px);
                        margin-left: 8px;
                        vertical-align: bottom;
                      "
                    ></span>
                  </td>
                  <td style="padding: 6px 8px; border-bottom: 1px solid #444; width: 50%">
                    Contractor
                    <span
                      style="
                        display: inline-block;
                        border-bottom: 1px solid #000;
                        height: 14px;
                        width: calc(100% - 90px);
                        margin-left: 8px;
                        vertical-align: bottom;
                      "
                    ></span>
                  </td>
                </tr>
                <tr>
                  <td
                    style="
                      padding: 6px 8px;
                      border-right: 1px solid #444;
                      border-bottom: 1px solid #444;
                    "
                  >
                    Fee: P
                    <span
                      style="
                        display: inline-block;
                        border-bottom: 1px solid #000;
                        height: 14px;
                        width: calc(100% - 60px);
                        margin-left: 8px;
                        vertical-align: bottom;
                      "
                    ></span>
                  </td>
                  <td style="padding: 6px 8px; border-bottom: 1px solid #444"></td>
                </tr>
                <tr>
                  <td style="padding: 6px 8px; border-right: 1px solid #444">
                    <div style="margin-bottom: 4px">
                      Paid Under Official Receipt No.
                      <span
                        style="
                          display: inline-block;
                          border-bottom: 1px solid #000;
                          height: 14px;
                          width: calc(100% - 200px);
                          margin-left: 8px;
                          vertical-align: bottom;
                        "
                      ></span>
                    </div>
                    <div>
                      Date
                      <span
                        style="
                          display: inline-block;
                          border-bottom: 1px solid #000;
                          height: 14px;
                          width: calc(100% - 50px);
                          margin-left: 8px;
                          vertical-align: bottom;
                        "
                      ></span>
                    </div>
                  </td>
                  <td style="padding: 6px 8px">
                    Owner/Occupant
                    <span
                      style="
                        display: inline-block;
                        border-bottom: 1px solid #000;
                        height: 14px;
                        width: calc(100% - 130px);
                        margin-left: 8px;
                        vertical-align: bottom;
                      "
                    ></span>
                  </td>
                </tr>
              </table>
            </div>

            <br />
            <!-- Recommending Approval and Approved By Section -->
            <div style="display: flex; gap: 20px; margin-top: 20px">
              <div style="flex: 1">
                <div style="font-size: 10px; margin-bottom: 16px">
                  RECOMMENDING APPROVAL:
                </div>
                <div style="text-align: center; margin-top: 30px">
                  <div
                    style="
                      border-bottom: 1px solid #000;
                      margin: 0 auto 4px;
                      width: 80%;
                      height: 20px;
                    "
                  ></div>
                  <div style="font-weight: bold; font-size: 10px">GREGORY DL. MORENO</div>
                  <div style="font-size: 9px">
                    ELECTRICAL ENGINEER OF THE BUILDING OFFICE
                  </div>
                  <div style="font-size: 9px">(Signature Over Printed Name)</div>
                  <div
                    style="
                      border-bottom: 1px solid #000;
                      margin: 20px auto 4px;
                      width: 80%;
                      height: 14px;
                    "
                  ></div>
                  <div style="font-size: 9px">PRC. REG. NO. & VALIDITY</div>
                </div>
              </div>

              <div style="flex: 1">
                <div style="font-size: 10px; margin-bottom: 16px">APPROVED BY:</div>
                <div style="text-align: center; margin-top: 30px">
                  <div
                    style="
                      border-bottom: 1px solid #000;
                      margin: 0 auto 4px;
                      width: 80%;
                      height: 20px;
                    "
                  ></div>
                  <div style="font-weight: bold; font-size: 10px">
                    ALEXANDER N. CANING
                  </div>
                  <div style="font-size: 9px">ACTING BUILDING OFFICAL</div>
                  <div style="font-size: 9px">(Signature Over Printed Name)</div>
                </div>
              </div>
            </div>

            <br />
            <!-- NOTE Section -->
            <div style="font-size: 9px; margin-top: 20px; line-height: 1.4">
              <div style="font-style: italic; display: inline">NOTE:</div>
              <span style="margin-left: 10px">
                Renewals or extension of this permit and/or final certification of the
                electrical installation are subject to inspection and payment of
                corresponding fees in conformity with pertinent provisions of the "
                National Building Code" (PD 1096) and its Implementing Rules and
                Regulations.
              </span>
            </div>
          </div>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "BuildingPermitPDF",
  methods: {
    printForm() {
      window.print();
    },
  },
};
</script>

<style scoped>
.grey-background {
  background-color: #f5f5f5;
  padding-top: 0;
}

.main-content-padded {
  padding-top: 88px; /* Height of the header */
}

.save-btn-custom {
  background-color: #0000cd !important;
  color: white !important;
  font-weight: bold;
  letter-spacing: 1px;
  padding: 0 32px !important;
  min-width: 120px;
}

.save-btn-custom:hover {
  background-color: #0000aa !important;
}

.download-btn-custom {
  background-color: #10b981 !important;
  color: white !important;
  font-weight: bold;
  letter-spacing: 1px;
  padding: 0 32px !important;
  min-width: 160px;
}

.card-header-row {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 16px;
}

.print-btn-top {
  margin-bottom: 0 !important;
}

.print-btn-top {
  margin-bottom: 0 !important;
}

.download-btn-custom:hover {
  background-color: #059669 !important;
}

.printable-form {
  max-width: 1000px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  font-size: 11px;
  line-height: 1.3;
  min-height: 500px;
  box-sizing: border-box;
}

.certification-text {
  text-align: justify;
  line-height: 1.35;
  margin-bottom: 12px;
  text-indent: 4em;
}

.main-form-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 12px;
}

.applicant-box {
  border: 1px solid #444;
  margin: 0;
  padding: 0;
  width: 100%;
  box-sizing: border-box;
  height: 32px;
  min-height: 28px;
  display: flex;
  align-items: flex-start;
}
.applicant-box + .applicant-box {
  border-top: 0;
}
.applicant-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 10px;
}
.applicant-table td {
  border: none;
  padding: 0 6px 0 3px;
  vertical-align: top;
  font-size: 10px;
}
.app-label-cell {
  font-weight: bold;
  min-width: 120px;
  text-align: left;
}
.app-header-cell {
  font-weight: normal;
  min-width: 90px;
  text-align: left;
}
@media print {
  .printable-form {
    font-size: 9px;
    line-height: 1.15;
    margin: 0;
    padding: 0;
  }
  .no-print {
    display: none !important;
  }
  .grey-background {
    background-color: #fff;
  }
  .v-main {
    padding: 0 !important;
  }
  .v-card {
    border: none !important;
    box-shadow: none !important;
    padding: 20px !important;
  }
}
</style>
