<template>
  <v-app>
    <div style="height: 64px"></div>
    <v-main class="grey-background">
      <!-- Print Form button outside and above the card -->
      <div class="print-btn-row">
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
      <v-container fluid class="pa-4" style="max-width: 1000px">
        <v-card class="pa-6 printable-form">
          <div class="text-right mb-2">
            <small>NBC FORM NO. B - 10</small>
          </div>

          <div class="text-center mb-4">
            <div class="text-subtitle-2">Republic of the Philippines</div>
            <div class="text-subtitle-2">City of Naga</div>
            <div class="text-subtitle-2">Province of Camarines Sur</div>
            <div class="text-h6 font-weight-bold mt-2">
              OFFICE OF THE BUILDING OFFICIAL
            </div>
            <div class="text-h5 font-weight-bold mt-2 underlined">
              CERTIFICATE OF COMPLETION
            </div>
          </div>

          <div class="box">
            <div class="d-flex justify-end mb-10">
              <div class="date-field">
                <div style="width: 150px; text-align: center">
                  <span>&nbsp;</span>
                </div>
                <div class="text-center mt-0"><small>DATE</small></div>
              </div>
            </div>

            <div class="form-content">
              <p class="certification-text mb-3">
                This is to certify that the building/structure covered by Building Permit
                No.
                <span class="permit-field">&nbsp;</span> issued on
                <span class="date-field">&nbsp;</span>
                has been constructed and completed under our supervision, conforms with
                the plans and specifications submitted and on file with the Office of the
                Building Official, and complies with the provisions of the National
                Building Code and Accessibility Law (BP Blg. 344).
              </p>

              <div class="form-row mb-0">
                <span class="row-label">NAME OF OWNER</span>
                <div class="field-group">
                  <span class="name-field last-name">&nbsp;</span>
                  <div class="field-label">(Last Name)</div>
                </div>
                <div class="field-group">
                  <span class="name-field given-name">&nbsp;</span>
                  <div class="field-label">(Given)</div>
                </div>
                <div class="field-group">
                  <span class="name-field mi">&nbsp;</span>
                  <div class="field-label">(M.I.)</div>
                </div>
              </div>

              <div class="form-row mb-2">
                <span class="row-label">ADDRESS OF OWNER</span>
                <span class="address-field number">&nbsp;</span>
                <span class="field-label">ZIP CODE</span>
                <span class="address-field zip">&nbsp;</span>
                <span class="field-label">TEL. NO.</span>
                <span class="address-field tel">&nbsp;</span>
              </div>

              <div class="form-row mb-2">
                <span class="row-label">LOCATION OF CONSTRUCTION: LOT NO.</span>
                <span class="location-field lot">&nbsp;</span>
                <span class="row-label-inline">BLK NO.</span>
                <span class="location-field blk">&nbsp;</span>
                <span class="row-label-inline">STREET</span>
                <span class="location-field street">&nbsp;</span>
                <span class="row-label-inline">BARANGAY</span>
                <span class="location-field barangay">&nbsp;</span>
                <span class="row-label-inline">CITY/MUNICIPALITY OF</span>
                <span class="location-field city">&nbsp;</span>
              </div>

              <div class="form-row mb-2">
                <span class="row-label">USE OR CHARACTER OF OCCUPANCY</span>
                <span class="occupancy-field main">&nbsp;</span>
                <span class="row-label-inline">GROUP</span>
                <span class="occupancy-field group">&nbsp;</span>
              </div>

              <table class="main-form-table mt-0">
                <tbody>
                  <tr>
                    <td class="label-cell" style="width: 30%"></td>
                    <td class="header-cell text-center" style="width: 35%">PLANNED</td>
                    <td class="header-cell text-center" style="width: 35%">ACTUAL</td>
                  </tr>
                  <tr>
                    <td class="label-cell">DATE OF START OF CONSTRUCTION</td>
                    <td class="field-cell"></td>
                    <td class="field-cell"></td>
                  </tr>
                  <tr>
                    <td class="label-cell">DATE OF COMPLETION</td>
                    <td class="field-cell"></td>
                    <td class="field-cell"></td>
                  </tr>
                  <tr>
                    <td class="label-cell">TOTAL FLOOR AREA (Square Meters)</td>
                    <td class="field-cell"></td>
                    <td class="field-cell"></td>
                  </tr>
                  <tr>
                    <td class="label-cell">NO. OF STOREY(S)</td>
                    <td class="field-cell"></td>
                    <td class="field-cell"></td>
                  </tr>
                  <tr>
                    <td class="label-cell">NO. OF UNITS</td>
                    <td class="field-cell"></td>
                    <td class="field-cell"></td>
                  </tr>
                </tbody>
              </table>

              <div class="cost-summary-wrapper mt-4">
                <div class="cost-summary-title">SUMMARY OF ACTUAL COSTS</div>
                <table class="cost-summary-table">
                  <tbody>
                    <tr>
                      <td class="cost-left number-col">1.</td>
                      <td class="cost-left main-col">TOTAL COST OF MATERIALS:</td>
                      <td class="cost-right currency-col">P</td>
                      <td class="cost-line"><span></span></td>
                    </tr>
                    <tr class="subrow">
                      <td></td>
                      <td class="sub-item">1.1. CEMENT (bags)</td>
                      <td></td>
                    </tr>
                    <tr class="subrow">
                      <td></td>
                      <td class="sub-item">1.2. LUMBER (bd. ft.)</td>
                      <td></td>
                    </tr>
                    <tr class="subrow">
                      <td></td>
                      <td class="sub-item">1.3. REINFORCING BARS (kg.)</td>
                      <td></td>
                    </tr>
                    <tr class="subrow">
                      <td></td>
                      <td class="sub-item">1.4. G.I. SHEETS (sheets)</td>
                      <td></td>
                    </tr>
                    <tr class="subrow">
                      <td></td>
                      <td class="sub-item">1.5. PREFAB STRUCTURAL STEEL (kg.)</td>
                      <td></td>
                    </tr>
                    <tr class="subrow">
                      <td></td>
                      <td class="sub-item">1.6. Other materials</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td class="cost-left number-col">2.</td>
                      <td class="cost-left main-col">TOTAL COST OF DIRECT LABOR:</td>
                      <td class="cost-right currency-col">P</td>
                      <td class="cost-line"><span></span></td>
                    </tr>
                    <tr class="note-row">
                      <td></td>
                      <td colspan="3" class="note-text">
                        This includes compensation whether by salary or contract for
                        project architect/engineer down to laborers.
                      </td>
                    </tr>
                    <tr>
                      <td class="cost-left number-col">3.</td>
                      <td class="cost-left main-col">
                        TOTAL COST OF EQUIPMENT UTILIZATION:
                      </td>
                      <td class="cost-right currency-col">P</td>
                      <td class="cost-line"><span></span></td>
                    </tr>
                    <tr>
                      <td class="cost-left number-col">4.</td>
                      <td class="cost-left main-col">OTHER COSTS:</td>
                      <td class="cost-right currency-col">P</td>
                      <td class="cost-line"><span></span></td>
                    </tr>
                    <tr class="note-row">
                      <td></td>
                      <td colspan="3" class="note-text">
                        This includes professional services fees, permits and other fees
                      </td>
                    </tr>
                    <tr class="total-row">
                      <td></td>
                      <td class="total-label">TOTAL COST OF BUILDING/STRUCTURE</td>
                      <td class="cost-right currency-col">P</td>
                      <td class="cost-line"><span></span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="supervisor-contract-wrapper mt-4">
                <table class="sig-two-col-table">
                  <tr>
                    <td class="sig-col left-col">
                      <div class="section-heading">
                        FULL-TIME SUPERVISOR OR INSPECTOR OF CONSTRUCTION
                      </div>
                      <div class="signature-block text-center mt-2">
                        <div class="signature-line long-line"></div>
                        <div class="role-label">
                          ARCHITECT OR CIVIL ENGINEER<br /><span class="note"
                            >(Signed And Sealed Over Printed Name)</span
                          >
                        </div>
                        <div class="date-inline">
                          Date<span class="short-line"></span>
                        </div>
                      </div>
                      <table class="mini-info-table mt-2">
                        <tr>
                          <td class="info-label">PRC No.</td>
                          <td class="info-line"></td>
                          <td class="info-label">Validity</td>
                          <td class="info-line"></td>
                        </tr>
                        <tr>
                          <td class="info-label">PTR No.</td>
                          <td class="info-line"></td>
                          <td class="info-label">Date Issued</td>
                          <td class="info-line"></td>
                        </tr>
                        <tr>
                          <td class="info-label">Issued at</td>
                          <td class="info-line"></td>
                          <td class="info-label">TIN</td>
                          <td class="info-line"></td>
                        </tr>
                      </table>
                      <table class="mini-info-table mt-1">
                        <tr>
                          <td class="info-label">CTC No.</td>
                          <td class="info-line"></td>
                          <td class="info-label">Date Issued</td>
                          <td class="info-line"></td>
                          <td class="info-label">Issued at</td>
                          <td class="info-line"></td>
                        </tr>
                      </table>
                      <table class="conforme-table mt-2">
                        <tr>
                          <td class="conforme-label-cell" colspan="6">CONFORME:</td>
                        </tr>
                        <tr>
                          <td class="owner-line-cell" colspan="6">
                            <div class="owner-line-wrapper">
                              <span class="signature-line owner-line-left"></span>
                              <span class="date-inline owner-date"
                                >Date<span class="short-line"></span
                              ></span>
                            </div>
                            <div class="owner-caption-left">
                              OWNER/APPLICANT<br /><span class="note"
                                >(Signature Over Printed Name)</span
                              >
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td class="sig-col right-col">
                      <div class="section-heading">
                        IF CONSTRUCTION WAS UNDERTAKEN BY CONTRACT
                      </div>
                      <table class="contract-info-table mt-1">
                        <tr>
                          <td class="contract-wide" colspan="2">Contractor:</td>
                          <td class="contract-narrow">PCAB Lic. No.</td>
                          <td class="info-line"></td>
                        </tr>
                        <tr>
                          <td class="contract-wide" colspan="2"></td>
                          <td class="contract-narrow">Validity</td>
                          <td class="info-line"></td>
                        </tr>
                        <tr>
                          <td class="contract-wide" colspan="2"></td>
                          <td class="contract-narrow">TIN</td>
                          <td class="info-line"></td>
                        </tr>
                        <tr>
                          <td class="contract-wide" colspan="2">Address</td>
                          <td class="contract-narrow">Tel. No.</td>
                          <td class="info-line"></td>
                        </tr>
                      </table>
                      <div class="auth-officer-block text-center mt-3">
                        <div class="signature-line officer-line"></div>
                        <div class="role-label">
                          AUTHORIZED MANAGING OFFICER<br /><span class="note"
                            >(Signature Over Printed Name)</span
                          >
                        </div>
                        <div class="date-inline">
                          Date<span class="short-line"></span>
                        </div>
                      </div>
                      <table class="mini-info-table mt-2 right-ctc-table">
                        <tr>
                          <td class="info-label">CTC No</td>
                          <td class="info-line"></td>
                          <td class="info-label">Date Issued</td>
                          <td class="info-line"></td>
                          <td class="info-label">Place Issued</td>
                          <td class="info-line"></td>
                        </tr>
                        <tr>
                          <td class="info-label"></td>
                          <td class="info-line"></td>
                          <td class="info-label">Date Issued</td>
                          <td class="info-line"></td>
                          <td class="info-label">Place Issued</td>
                          <td class="info-line"></td>
                        </tr>
                        <tr>
                          <td class="info-label"></td>
                          <td class="info-line"></td>
                          <td class="info-label">Date Issued</td>
                          <td class="info-line"></td>
                          <td class="info-label">Place Issued</td>
                          <td class="info-line"></td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <div class="notary-block mt-4">
                  <div class="jurat-heading">
                    <span class="bold">REPUBLIC OF THE PHILIPPINES</span>) S.S<br />
                    CITY/MUNICIPALITY OF <span class="long-blank"></span>)
                  </div>
                  <p class="jurat-text mt-2">
                    BEFORE ME, at the City/Municipality of
                    <span class="mid-blank"></span>, on
                    <span class="mid-blank"></span> personally appeared the persons whose
                    signatures appear herein at the front and back of this page, known to
                    me to be the same persons who executed this standard prescribed form
                    and acknowledged to me that the same is their free and voluntary act
                    and deed.
                  </p>
                  <p class="jurat-text mt-2">
                    WITNESS MY HAND AND SEAL on the date and place above written.
                  </p>
                  <div class="doc-lines mt-3">
                    <div class="doc-col left">
                      <div class="doc-item">
                        Doc. No.&nbsp;&nbsp; <span class="doc-blank"></span>
                      </div>
                      <div class="doc-item">
                        Page No.&nbsp; <span class="doc-blank"></span>
                      </div>
                      <div class="doc-item">
                        Book No.&nbsp; <span class="doc-blank"></span>
                      </div>
                      <div class="doc-item">
                        Series of <span class="doc-blank"></span>
                      </div>
                    </div>
                    <div class="doc-col right text-center">
                      <div class="signature-line notary-line"></div>
                      <div class="role-label">
                        NOTARY PUBLIC (Until December
                        <span class="short-blank"></span>)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-card>

        <!-- PAGE 2: Design Professionals and Supervisors -->
        <v-card class="pa-6 printable-form page-2 mt-8">
          <div class="text-center mb-4">
            <div class="text-subtitle-2" style="font-weight: bold; font-size: 16px">
              DESIGN PROFESSIONALS, PLANS AND SPECIFICATIONS:
            </div>
          </div>
          <div class="d-flex" style="gap: 16px">
            <!-- Architectural -->
            <div style="flex: 1; border: 2px solid #222">
              <div
                style="
                  border-bottom: 2px solid #222;
                  padding: 4px 8px;
                  font-weight: bold;
                  font-size: 15px;
                "
              >
                ARCHITECTURAL
              </div>
              <div style="padding: 8px 8px 0 8px">
                <div class="d-flex align-center" style="margin-bottom: 8px">
                  <div style="flex: 1; border-bottom: 1px solid #222; height: 18px"></div>
                  <div style="margin-left: 8px">
                    Date<span
                      style="
                        border-bottom: 1px solid #222;
                        min-width: 70px;
                        display: inline-block;
                        height: 16px;
                        vertical-align: middle;
                      "
                    ></span>
                  </div>
                </div>
                <div class="text-center" style="font-size: 13px; margin-bottom: 8px">
                  (Signature Over Printed Name)
                </div>
                <table style="width: 100%; font-size: 13px; border-collapse: collapse">
                  <tr>
                    <td style="border: 1px solid #222; width: 30%; padding: 2px 4px">
                      Address
                    </td>
                    <td style="border: 1px solid #222" colspan="2"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">PRC. No</td>
                    <td style="border: 1px solid #222; padding: 2px 4px">Validity</td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">IAPOA No.</td>
                    <td style="border: 1px solid #222; padding: 2px 4px">O.R. No.</td>
                    <td style="border: 1px solid #222; padding: 2px 4px">Date Issued:</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">PTR. No</td>
                    <td style="border: 1px solid #222; padding: 2px 4px">Date Issued</td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">Issued at</td>
                    <td style="border: 1px solid #222; padding: 2px 4px">TIN</td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                </table>
              </div>
            </div>
            <!-- Civil/Structural -->
            <div style="flex: 1; border: 2px solid #222">
              <div
                style="
                  border-bottom: 2px solid #222;
                  padding: 4px 8px;
                  font-weight: bold;
                  font-size: 15px;
                "
              >
                CIVIL / STRUCTURAL
              </div>
              <div style="padding: 8px 8px 0 8px">
                <div class="d-flex align-center" style="margin-bottom: 8px">
                  <div style="flex: 1; border-bottom: 1px solid #222; height: 18px"></div>
                  <div style="margin-left: 8px">
                    Date<span
                      style="
                        border-bottom: 1px solid #222;
                        min-width: 70px;
                        display: inline-block;
                        height: 16px;
                        vertical-align: middle;
                      "
                    ></span>
                  </div>
                </div>
                <div class="text-center" style="font-size: 13px; margin-bottom: 8px">
                  (Signature Over Printed Name)
                </div>
                <table style="width: 100%; font-size: 13px; border-collapse: collapse">
                  <tr>
                    <td style="border: 1px solid #222; width: 30%; padding: 2px 4px">
                      Address
                    </td>
                    <td style="border: 1px solid #222" colspan="2"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">PRC. No</td>
                    <td style="border: 1px solid #222; padding: 2px 4px">Validity</td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">PTR. No</td>
                    <td style="border: 1px solid #222; padding: 2px 4px">Date Issued</td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">Issued at</td>
                    <td style="border: 1px solid #222; padding: 2px 4px">TIN</td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <br />
          <div class="d-flex" style="gap: 16px">
            <!-- ELECTRICAL -->
            <div style="flex: 1; border: 2px solid #222">
              <div
                style="
                  border-bottom: 2px solid #222;
                  padding: 4px 8px;
                  font-weight: bold;
                  font-size: 15px;
                "
              >
                ELECTRICAL
              </div>
              <div style="padding: 8px 8px 0 8px">
                <div class="d-flex align-center" style="margin-bottom: 8px">
                  <div style="flex: 1; border-bottom: 1px solid #222; height: 18px"></div>
                  <div style="margin-left: 8px">
                    Date<span
                      style="
                        border-bottom: 1px solid #222;
                        min-width: 70px;
                        display: inline-block;
                        height: 16px;
                        vertical-align: middle;
                      "
                    ></span>
                  </div>
                </div>
                <div class="text-center" style="font-size: 13px; margin-bottom: 8px">
                  (Signature Over Printed Name)
                </div>
                <table style="width: 100%; font-size: 13px; border-collapse: collapse">
                  <tr>
                    <td style="border: 1px solid #222; width: 30%; padding: 2px 4px">
                      Address
                    </td>
                    <td style="border: 1px solid #222" colspan="2"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">PRC. No</td>
                    <td style="border: 1px solid #222; padding: 2px 4px">Validity</td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">PTR. No.</td>
                    <td style="border: 1px solid #222; padding: 2px 4px">O.R. No.</td>
                    <td style="border: 1px solid #222; padding: 2px 4px">Date Issued:</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">PTR. No</td>
                    <td style="border: 1px solid #222; padding: 2px 4px">Date Issued</td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">Issued at</td>
                    <td style="border: 1px solid #222; padding: 2px 4px">TIN</td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                </table>
              </div>
            </div>
            <!-- MECHANICAL -->
            <div style="flex: 1; border: 2px solid #222">
              <div
                style="
                  border-bottom: 2px solid #222;
                  padding: 4px 8px;
                  font-weight: bold;
                  font-size: 15px;
                "
              >
                MECHANICAL
              </div>
              <div style="padding: 8px 8px 0 8px">
                <div class="d-flex align-center" style="margin-bottom: 8px">
                  <div style="flex: 1; border-bottom: 1px solid #222; height: 18px"></div>
                  <div style="margin-left: 8px">
                    Date<span
                      style="
                        border-bottom: 1px solid #222;
                        min-width: 70px;
                        display: inline-block;
                        height: 16px;
                        vertical-align: middle;
                      "
                    ></span>
                  </div>
                </div>
                <div class="text-center" style="font-size: 13px; margin-bottom: 8px">
                  (Signature Over Printed Name)
                </div>
                <table style="width: 100%; font-size: 13px; border-collapse: collapse">
                  <tr>
                    <td style="border: 1px solid #222; width: 30%; padding: 2px 4px">
                      Address
                    </td>
                    <td style="border: 1px solid #222" colspan="2"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">PRC. No</td>
                    <td style="border: 1px solid #222; padding: 2px 4px">Validity</td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">PTR. No</td>
                    <td style="border: 1px solid #222; padding: 2px 4px">Date Issued</td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">Issued at</td>
                    <td style="border: 1px solid #222; padding: 2px 4px">TIN</td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <br />
          <div class="d-flex" style="gap: 16px">
            <div style="flex: 1; border: 2px solid #222">
              <div
                style="
                  border-bottom: 2px solid #222;
                  padding: 4px 8px;
                  font-weight: bold;
                  font-size: 15px;
                "
              >
                SANITARY
              </div>
              <div style="padding: 8px 8px 0 8px">
                <div class="d-flex align-center" style="margin-bottom: 8px">
                  <div style="flex: 1; border-bottom: 1px solid #222; height: 18px"></div>
                  <div style="margin-left: 8px">
                    Date<span
                      style="
                        border-bottom: 1px solid #222;
                        min-width: 70px;
                        display: inline-block;
                        height: 16px;
                        vertical-align: middle;
                      "
                    ></span>
                  </div>
                </div>
                <div class="text-center" style="font-size: 13px; margin-bottom: 8px">
                  (Signature Over Printed Name)
                </div>
                <table style="width: 100%; font-size: 13px; border-collapse: collapse">
                  <tr>
                    <td style="border: 1px solid #222; width: 30%; padding: 2px 4px">
                      Address
                    </td>
                    <td style="border: 1px solid #222" colspan="2"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">PRC. No</td>
                    <td style="border: 1px solid #222; padding: 2px 4px">Validity</td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">IAPOA No.</td>
                    <td style="border: 1px solid #222; padding: 2px 4px">O.R. No.</td>
                    <td style="border: 1px solid #222; padding: 2px 4px">Date Issued:</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">PTR. No</td>
                    <td style="border: 1px solid #222; padding: 2px 4px">Date Issued</td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">Issued at</td>
                    <td style="border: 1px solid #222; padding: 2px 4px">TIN</td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                </table>
              </div>
            </div>
            <div style="flex: 1; border: 2px solid #222">
              <div
                style="
                  border-bottom: 2px solid #222;
                  padding: 4px 8px;
                  font-weight: bold;
                  font-size: 15px;
                "
              >
                PLUMBING
              </div>
              <div style="padding: 8px 8px 0 8px">
                <div class="d-flex align-center" style="margin-bottom: 8px">
                  <div style="flex: 1; border-bottom: 1px solid #222; height: 18px"></div>
                  <div style="margin-left: 8px">
                    Date<span
                      style="
                        border-bottom: 1px solid #222;
                        min-width: 70px;
                        display: inline-block;
                        height: 16px;
                        vertical-align: middle;
                      "
                    ></span>
                  </div>
                </div>
                <div class="text-center" style="font-size: 13px; margin-bottom: 8px">
                  (Signature Over Printed Name)
                </div>
                <table style="width: 100%; font-size: 13px; border-collapse: collapse">
                  <tr>
                    <td style="border: 1px solid #222; width: 30%; padding: 2px 4px">
                      Address
                    </td>
                    <td style="border: 1px solid #222" colspan="2"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">PRC. No</td>
                    <td style="border: 1px solid #222; padding: 2px 4px">Validity</td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">PTR. No</td>
                    <td style="border: 1px solid #222; padding: 2px 4px">Date Issued</td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">Issued at</td>
                    <td style="border: 1px solid #222; padding: 2px 4px">TIN</td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <br />
          <div class="d-flex" style="gap: 16px">
            <!-- ELECTRONICS -->
            <div style="flex: 1; border: 2px solid #222">
              <div
                style="
                  border-bottom: 2px solid #222;
                  padding: 4px 8px;
                  font-weight: bold;
                  font-size: 15px;
                "
              >
                ELECTRONICS
              </div>
              <div style="padding: 8px 8px 0 8px">
                <div class="d-flex align-center" style="margin-bottom: 8px">
                  <div style="flex: 1; border-bottom: 1px solid #222; height: 18px"></div>
                  <div style="margin-left: 8px">
                    Date<span
                      style="
                        border-bottom: 1px solid #222;
                        min-width: 70px;
                        display: inline-block;
                        height: 16px;
                        vertical-align: middle;
                      "
                    ></span>
                  </div>
                </div>
                <div class="text-center" style="font-size: 13px; margin-bottom: 8px">
                  (Signature Over Printed Name)
                </div>
                <table style="width: 100%; font-size: 13px; border-collapse: collapse">
                  <tr>
                    <td style="border: 1px solid #222; width: 30%; padding: 2px 4px">
                      Address
                    </td>
                    <td style="border: 1px solid #222" colspan="2"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">PRC. No</td>
                    <td style="border: 1px solid #222; padding: 2px 4px">Validity</td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">PTR. No.</td>
                    <td style="border: 1px solid #222; padding: 2px 4px">O.R. No.</td>
                    <td style="border: 1px solid #222; padding: 2px 4px">Date Issued:</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">PTR. No</td>
                    <td style="border: 1px solid #222; padding: 2px 4px">Date Issued</td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">Issued at</td>
                    <td style="border: 1px solid #222; padding: 2px 4px">TIN</td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                </table>
              </div>
            </div>
            <!-- INTERIOR DESIGN -->
            <div style="flex: 1; border: 2px solid #222">
              <div
                style="
                  border-bottom: 2px solid #222;
                  padding: 4px 8px;
                  font-weight: bold;
                  font-size: 15px;
                "
              >
                INTERIOR DESIGN
              </div>
              <div style="padding: 8px 8px 0 8px">
                <div class="d-flex align-center" style="margin-bottom: 8px">
                  <div style="flex: 1; border-bottom: 1px solid #222; height: 18px"></div>
                  <div style="margin-left: 8px">
                    Date<span
                      style="
                        border-bottom: 1px solid #222;
                        min-width: 70px;
                        display: inline-block;
                        height: 16px;
                        vertical-align: middle;
                      "
                    ></span>
                  </div>
                </div>
                <div class="text-center" style="font-size: 13px; margin-bottom: 8px">
                  (Signature Over Printed Name)
                </div>
                <table style="width: 100%; font-size: 13px; border-collapse: collapse">
                  <tr>
                    <td style="border: 1px solid #222; width: 30%; padding: 2px 4px">
                      Address
                    </td>
                    <td style="border: 1px solid #222" colspan="2"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">PRC. No</td>
                    <td style="border: 1px solid #222; padding: 2px 4px">Validity</td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">PTR. No</td>
                    <td style="border: 1px solid #222; padding: 2px 4px">Date Issued</td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #222; padding: 2px 4px">Issued at</td>
                    <td style="border: 1px solid #222; padding: 2px 4px">TIN</td>
                    <td style="border: 1px solid #222; padding: 2px 4px"></td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div class="text-center mb-4 mt-8">
            <div class="text-subtitle-2" style="font-weight: bold; font-size: 16px">
              SUPERVISORS OF SPECIALTY WORKS:
            </div>
          </div>

          <!-- Row 1: Electrical & Mechanical -->
          <div class="d-flex" style="gap: 16px">
            <div style="flex: 1; border: 2px solid #222">
              <div
                style="
                  border-bottom: 2px solid #222;
                  padding: 4px 8px;
                  font-weight: bold;
                  font-size: 14px;
                "
              >
                ELECTRICAL WORKS
              </div>
              <div style="padding: 8px">
                <div style="margin-bottom: 20px">
                  <div style="border-bottom: 1px solid #222; height: 18px"></div>
                  <div style="text-align: right; font-size: 11px; margin-top: 2px">
                    Date_____________
                  </div>
                  <div style="text-align: center; font-size: 11px; margin-top: 4px">
                    (Signature Over Printed Name)
                  </div>
                </div>
                <table style="width: 100%; font-size: 11px; border-collapse: collapse">
                  <tr>
                    <td style="padding: 2px 0; border-bottom: 1px solid #222" colspan="2">
                      Address
                    </td>
                  </tr>
                  <tr>
                    <td
                      style="padding: 2px 4px; border-bottom: 1px solid #222; width: 50%"
                    >
                      PRC. No
                    </td>
                    <td
                      style="
                        padding: 2px 4px;
                        border-bottom: 1px solid #222;
                        border-left: 1px solid #222;
                      "
                    >
                      Validity
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 2px 4px; border-bottom: 1px solid #222">
                      PTR. No
                    </td>
                    <td
                      style="
                        padding: 2px 4px;
                        border-bottom: 1px solid #222;
                        border-left: 1px solid #222;
                      "
                    >
                      Date Issued
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 2px 4px; border-bottom: 1px solid #222">
                      Issued at
                    </td>
                    <td
                      style="
                        padding: 2px 4px;
                        border-bottom: 1px solid #222;
                        border-left: 1px solid #222;
                      "
                    >
                      TIN
                    </td>
                  </tr>
                </table>
              </div>
            </div>

            <div style="flex: 1; border: 2px solid #222">
              <div
                style="
                  border-bottom: 2px solid #222;
                  padding: 4px 8px;
                  font-weight: bold;
                  font-size: 14px;
                "
              >
                MECHANICAL WORKS
              </div>
              <div style="padding: 8px">
                <div style="margin-bottom: 20px">
                  <div style="border-bottom: 1px solid #222; height: 18px"></div>
                  <div style="text-align: right; font-size: 11px; margin-top: 2px">
                    Date_____________
                  </div>
                  <div style="text-align: center; font-size: 11px; margin-top: 4px">
                    (Signature Over Printed Name)
                  </div>
                </div>
                <table style="width: 100%; font-size: 11px; border-collapse: collapse">
                  <tr>
                    <td style="padding: 2px 0; border-bottom: 1px solid #222" colspan="2">
                      Address
                    </td>
                  </tr>
                  <tr>
                    <td
                      style="padding: 2px 4px; border-bottom: 1px solid #222; width: 50%"
                    >
                      PRC. No
                    </td>
                    <td
                      style="
                        padding: 2px 4px;
                        border-bottom: 1px solid #222;
                        border-left: 1px solid #222;
                      "
                    >
                      Validity
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 2px 4px; border-bottom: 1px solid #222">
                      PTR. No
                    </td>
                    <td
                      style="
                        padding: 2px 4px;
                        border-bottom: 1px solid #222;
                        border-left: 1px solid #222;
                      "
                    >
                      Date Issued
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 2px 4px; border-bottom: 1px solid #222">
                      Issued at
                    </td>
                    <td
                      style="
                        padding: 2px 4px;
                        border-bottom: 1px solid #222;
                        border-left: 1px solid #222;
                      "
                    >
                      TIN
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <br />

          <!-- Row 2: Sanitary & Plumbing -->
          <div class="d-flex" style="gap: 16px">
            <div style="flex: 1; border: 2px solid #222">
              <div
                style="
                  border-bottom: 2px solid #222;
                  padding: 4px 8px;
                  font-weight: bold;
                  font-size: 14px;
                "
              >
                SANITARY WORKS
              </div>
              <div style="padding: 8px">
                <div style="margin-bottom: 20px">
                  <div style="border-bottom: 1px solid #222; height: 18px"></div>
                  <div style="text-align: right; font-size: 11px; margin-top: 2px">
                    Date_____________
                  </div>
                  <div style="text-align: center; font-size: 11px; margin-top: 4px">
                    (Signature Over Printed Name)
                  </div>
                </div>
                <table style="width: 100%; font-size: 11px; border-collapse: collapse">
                  <tr>
                    <td style="padding: 2px 0; border-bottom: 1px solid #222" colspan="2">
                      Address
                    </td>
                  </tr>
                  <tr>
                    <td
                      style="padding: 2px 4px; border-bottom: 1px solid #222; width: 50%"
                    >
                      PRC. No
                    </td>
                    <td
                      style="
                        padding: 2px 4px;
                        border-bottom: 1px solid #222;
                        border-left: 1px solid #222;
                      "
                    >
                      Validity
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 2px 4px; border-bottom: 1px solid #222">
                      PTR. No
                    </td>
                    <td
                      style="
                        padding: 2px 4px;
                        border-bottom: 1px solid #222;
                        border-left: 1px solid #222;
                      "
                    >
                      Date Issued
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 2px 4px; border-bottom: 1px solid #222">
                      Issued at
                    </td>
                    <td
                      style="
                        padding: 2px 4px;
                        border-bottom: 1px solid #222;
                        border-left: 1px solid #222;
                      "
                    >
                      TIN
                    </td>
                  </tr>
                </table>
              </div>
            </div>

            <div style="flex: 1; border: 2px solid #222">
              <div
                style="
                  border-bottom: 2px solid #222;
                  padding: 4px 8px;
                  font-weight: bold;
                  font-size: 14px;
                "
              >
                PLUMBING WORKS
              </div>
              <div style="padding: 8px">
                <div style="margin-bottom: 20px">
                  <div style="border-bottom: 1px solid #222; height: 18px"></div>
                  <div style="text-align: right; font-size: 11px; margin-top: 2px">
                    Date_____________
                  </div>
                  <div style="text-align: center; font-size: 11px; margin-top: 4px">
                    (Signature Over Printed Name)
                  </div>
                </div>
                <table style="width: 100%; font-size: 11px; border-collapse: collapse">
                  <tr>
                    <td style="padding: 2px 0; border-bottom: 1px solid #222" colspan="2">
                      Address
                    </td>
                  </tr>
                  <tr>
                    <td
                      style="padding: 2px 4px; border-bottom: 1px solid #222; width: 50%"
                    >
                      PRC. No
                    </td>
                    <td
                      style="
                        padding: 2px 4px;
                        border-bottom: 1px solid #222;
                        border-left: 1px solid #222;
                      "
                    >
                      Validity
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 2px 4px; border-bottom: 1px solid #222">
                      PTR. No
                    </td>
                    <td
                      style="
                        padding: 2px 4px;
                        border-bottom: 1px solid #222;
                        border-left: 1px solid #222;
                      "
                    >
                      Date Issued
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 2px 4px; border-bottom: 1px solid #222">
                      Issued at
                    </td>
                    <td
                      style="
                        padding: 2px 4px;
                        border-bottom: 1px solid #222;
                        border-left: 1px solid #222;
                      "
                    >
                      TIN
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <br />

          <!-- Row 3: Electronics & Interior Design -->
          <div class="d-flex" style="gap: 16px">
            <div style="flex: 1; border: 2px solid #222">
              <div
                style="
                  border-bottom: 2px solid #222;
                  padding: 4px 8px;
                  font-weight: bold;
                  font-size: 14px;
                "
              >
                ELECTRONICS WORKS
              </div>
              <div style="padding: 8px">
                <div style="margin-bottom: 20px">
                  <div style="border-bottom: 1px solid #222; height: 18px"></div>
                  <div style="text-align: right; font-size: 11px; margin-top: 2px">
                    Date_____________
                  </div>
                  <div style="text-align: center; font-size: 11px; margin-top: 4px">
                    (Signature Over Printed Name)
                  </div>
                </div>
                <table style="width: 100%; font-size: 11px; border-collapse: collapse">
                  <tr>
                    <td style="padding: 2px 0; border-bottom: 1px solid #222" colspan="2">
                      Address
                    </td>
                  </tr>
                  <tr>
                    <td
                      style="padding: 2px 4px; border-bottom: 1px solid #222; width: 50%"
                    >
                      PRC. No
                    </td>
                    <td
                      style="
                        padding: 2px 4px;
                        border-bottom: 1px solid #222;
                        border-left: 1px solid #222;
                      "
                    >
                      Validity
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 2px 4px; border-bottom: 1px solid #222">
                      PTR. No
                    </td>
                    <td
                      style="
                        padding: 2px 4px;
                        border-bottom: 1px solid #222;
                        border-left: 1px solid #222;
                      "
                    >
                      Date Issued
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 2px 4px; border-bottom: 1px solid #222">
                      Issued at
                    </td>
                    <td
                      style="
                        padding: 2px 4px;
                        border-bottom: 1px solid #222;
                        border-left: 1px solid #222;
                      "
                    >
                      TIN
                    </td>
                  </tr>
                </table>
              </div>
            </div>

            <div style="flex: 1; border: 2px solid #222">
              <div
                style="
                  border-bottom: 2px solid #222;
                  padding: 4px 8px;
                  font-weight: bold;
                  font-size: 14px;
                "
              >
                INTERIOR DESIGN WORKS
              </div>
              <div style="padding: 8px">
                <div style="margin-bottom: 20px">
                  <div style="border-bottom: 1px solid #222; height: 18px"></div>
                  <div style="text-align: right; font-size: 11px; margin-top: 2px">
                    Date_____________
                  </div>
                  <div style="text-align: center; font-size: 11px; margin-top: 4px">
                    (Signature Over Printed Name)
                  </div>
                </div>
                <table style="width: 100%; font-size: 11px; border-collapse: collapse">
                  <tr>
                    <td style="padding: 2px 0; border-bottom: 1px solid #222" colspan="2">
                      Address
                    </td>
                  </tr>
                  <tr>
                    <td
                      style="padding: 2px 4px; border-bottom: 1px solid #222; width: 50%"
                    >
                      PRC. No
                    </td>
                    <td
                      style="
                        padding: 2px 4px;
                        border-bottom: 1px solid #222;
                        border-left: 1px solid #222;
                      "
                    >
                      Validity
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 2px 4px; border-bottom: 1px solid #222">
                      PTR. No
                    </td>
                    <td
                      style="
                        padding: 2px 4px;
                        border-bottom: 1px solid #222;
                        border-left: 1px solid #222;
                      "
                    >
                      Date Issued
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 2px 4px; border-bottom: 1px solid #222">
                      Issued at
                    </td>
                    <td
                      style="
                        padding: 2px 4px;
                        border-bottom: 1px solid #222;
                        border-left: 1px solid #222;
                      "
                    >
                      TIN
                    </td>
                  </tr>
                </table>
              </div>
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
/* Print button row above card */
.print-btn-row {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-top: 16px;
  margin-bottom: 0;
  padding-right: 32px;
}
.nav-links .v-btn {
  text-transform: none !important;
  font-weight: 500;
  font-size: 17px;
}

.header-fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 100;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
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
  margin-bottom: 8px;
}
.print-btn-top {
  margin-bottom: 0 !important;
}

.download-btn-custom:hover {
  background-color: #059669 !important;
}

.grey-background {
  background-color: #f5f5f5;
  padding-top: 0;
}

.printable-form {
  max-width: 1000px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  font-size: 11px;
  line-height: 1.3;
}

.box {
  border: 2px solid black;
  padding: 14px 12px 12px 12px;
}

.underlined {
  text-decoration: underline;
}

.certification-text {
  text-align: justify;
  line-height: 1.35;
  margin-bottom: 12px;
  text-indent: 4em;
}

.permit-field,
.date-field {
  display: inline-block;
  border-bottom: 1px solid black;
  min-width: 120px;
  height: 18px;
  margin: 0 5px;
}

.form-row {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  line-height: 1.6;
}

.field-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
}

.row-label {
  font-weight: bold;
  font-size: 11px;
}

.row-label-inline {
  font-weight: bold;
  font-size: 11px;
}

.name-field {
  border-bottom: 1px solid black;
  height: 18px;
}

.name-field.last-name {
  width: 350px;
}

.name-field.given-name {
  width: 350px;
}

.name-field.mi {
  width: 112px;
}

.address-field {
  border-bottom: 1px solid black;
  height: 18px;
}

.address-field.number {
  width: 530px;
}

.address-field.zip {
  width: 50px;
}

.address-field.tel {
  width: 131px;
}

.location-field {
  border-bottom: 1px solid black;
  height: 18px;
}

.location-field.lot {
  width: 30px;
}

.location-field.blk {
  width: 30px;
}

.location-field.street {
  width: 100px;
}

.location-field.barangay {
  width: 105px;
}

.location-field.city {
  width: 150px;
}

/* Occupancy Fields */
.occupancy-field {
  border-bottom: 1px solid black;
  height: 18px;
}

.occupancy-field.main {
  width: 420px;
}

.occupancy-field.group {
  width: 243px;
}

.field-label {
  font-size: 9px;
  color: #666;
}

.underlined-field {
  border-bottom: 1px solid black;
  display: inline-block;
  min-height: 16px;
  min-width: 100px;
  padding: 2px 5px;
}

.input-field {
  border-bottom: 1px solid black;
  min-height: 20px;
  width: 100%;
  padding: 2px 4px;
  margin-bottom: 2px;
}

.cost-input {
  border-bottom: 1px solid black;
  display: inline-block;
  min-width: 100px;
  min-height: 16px;
  padding: 2px 4px;
}

.cost-input-total {
  border-bottom: 1px solid black;
  display: inline-block;
  min-width: 100px;
  min-height: 16px;
  padding: 2px 4px;
  font-weight: bold;
}

.main-form-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 15px;
}

.main-form-table td {
  padding: 4px 6px;
  vertical-align: top;
  border: 1px solid black;
}

.label-cell {
  font-weight: bold;
  font-size: 11px;
  text-align: left;
  vertical-align: middle;
  background-color: #f8f8f8;
}

.field-cell {
  padding: 8px;
  vertical-align: top;
}

.header-cell {
  font-weight: bold;
  font-size: 11px;
  background-color: #f0f0f0;
  text-align: center;
}

.field-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.cost-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.cost-table td {
  padding: 4px 8px;
  border: 1px solid black;
  vertical-align: middle;
}

.cost-label {
  font-weight: bold;
  font-size: 11px;
  width: 70%;
}

.cost-sublabel {
  font-size: 11px;
  padding-left: 20px;
  width: 70%;
}

.cost-note {
  font-size: 10px;
  font-style: italic;
  padding-left: 20px;
  border: none !important;
}

.cost-total {
  font-weight: bold;
  font-size: 11px;
  width: 70%;
  text-align: center;
  background-color: #f0f0f0;
}

.cost-field {
  text-align: right;
  width: 30%;
  font-size: 11px;
}

.cost-field-total {
  text-align: right;
  width: 30%;
  font-size: 11px;
  font-weight: bold;
  background-color: #f0f0f0;
}

.form-content {
  text-align: justify;
}

.cost-summary-wrapper {
  margin-top: 6px;
  font-size: 10.5px;
  padding: 0 70px;
}

.cost-summary-title {
  font-weight: bold;
  margin-bottom: 4px;
  letter-spacing: 0.5px;
}

.cost-summary-table {
  width: 100%;
  border-collapse: collapse;
}

.cost-summary-table td {
  padding: 0 4px 2px 0;
  vertical-align: top;
  line-height: 1.2;
}

.number-col {
  width: 18px;
}
.main-col {
  width: 55%;
}
.currency-col {
  width: 18px;
  text-align: right;
  padding-right: 2px !important;
}
.cost-line {
  position: relative;
}
.cost-line span {
  display: block;
  border-bottom: 1px solid #000;
  height: 14px;
}

.sub-item {
  padding-left: 18px;
}
.subrow td {
  font-size: 10.5px;
}
.note-row td {
  padding-top: 0;
}
.note-text {
  font-size: 10px;
  font-style: italic;
  padding-left: 18px;
}

.total-row .total-label {
  font-weight: bold;
  text-align: center;
}

@media print {
  .cost-summary-table td {
    padding: 0 4px 2px 0;
  }
  .cost-line span {
    border-bottom: 1px solid #000;
  }
}

.supervisor-contract-wrapper {
  font-size: 11px;
}
.sig-two-col-table {
  width: 100%;
  border-collapse: collapse;
}
.sig-two-col-table td.sig-col {
  border: 1px solid #000;
  vertical-align: top;
  padding: 5px 5px 8px;
}
.sig-two-col-table td.left-col {
  width: 52%;
}
.sig-two-col-table td.right-col {
  width: 48%;
}
.section-heading {
  font-weight: bold;
  font-size: 11px;
  text-align: center;
  border-bottom: 1px solid #000;
  padding-bottom: 2px;
}
.signature-line {
  border-bottom: 1px solid #000;
  height: 14px;
  margin: 0 auto 2px;
}
.signature-line.long-line {
  width: 80%;
}
.officer-line {
  width: 80%;
}
.owner-line {
  width: 55%;
  margin-top: 10px;
}
.notary-line {
  width: 90%;
  margin-bottom: 2px;
}
.role-label {
  font-size: 10px;
  font-weight: bold;
  line-height: 1.2;
}
.role-label .note {
  font-weight: normal;
  font-size: 9px;
}
.date-inline {
  font-size: 10px;
  margin-top: 4px;
}
.date-inline .short-line {
  display: inline-block;
  border-bottom: 1px solid #000;
  width: 120px;
  height: 10px;
  margin-left: 4px;
}
.date-inline.small .short-line {
  width: 90px;
}
.mini-info-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 10px;
}
.mini-info-table td {
  padding: 2px 4px 0 2px;
}
.info-label {
  font-weight: bold;
  font-size: 9px;
  white-space: nowrap;
}
.info-line {
  border-bottom: 1px solid #000;
  height: 12px;
  min-width: 70px;
}
.info-line.transparent {
  border-bottom: 1px solid transparent;
}
.contract-info-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 10px;
}
.contract-info-table td {
  padding: 2px 4px 0 2px;
}
.contract-wide {
  width: 55%;
  font-weight: bold;
  font-size: 9px;
}
.contract-narrow {
  width: 20%;
  font-weight: bold;
  font-size: 9px;
  white-space: nowrap;
}
.auth-officer-block {
  margin-top: 10px;
}
.conforme-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 10px;
}
.conforme-label-cell {
  font-weight: bold;
  padding: 4px 4px 2px;
}
.owner-line-cell {
  padding: 2px 4px 4px;
}
.owner-line-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 2px 0 2px;
}
.signature-line.owner-line-left {
  flex: 1;
  min-width: 220px;
}
.owner-date .short-line {
  width: 110px;
}
.owner-caption-left {
  text-align: center;
  font-size: 9px;
  font-weight: bold;
}
.owner-caption-left .note {
  font-weight: normal;
  font-size: 8px;
}
.right-ctc-table {
  margin-top: 4px;
}
.notary-block {
  font-size: 10px;
  margin-top: 18px;
}
.jurat-heading {
  font-size: 10px;
  line-height: 1.2;
}
.bold {
  font-weight: bold;
}
.long-blank,
.mid-blank {
  display: inline-block;
  border-bottom: 1px solid #000;
  min-width: 160px;
  height: 12px;
  vertical-align: baseline;
}
.mid-blank {
  min-width: 120px;
}
.jurat-text {
  text-align: justify;
  line-height: 1.3;
  margin: 0;
}
.doc-lines {
  display: flex;
  justify-content: space-between;
  margin-top: 14px;
}
.doc-col.left {
  width: 45%;
  font-size: 10px;
}
.doc-col.right {
  width: 50%;
}
.doc-item {
  margin-bottom: 4px;
}
.doc-blank {
  display: inline-block;
  border-bottom: 1px solid #000;
  width: 120px;
  height: 10px;
}
.short-blank {
  display: inline-block;
  border-bottom: 1px solid #000;
  width: 70px;
  height: 10px;
}

@media print {
  .printable-form {
    font-size: 9px;
    line-height: 1.15;
  }
  .certification-text {
    margin-bottom: 8px;
    line-height: 1.25;
    text-indent: 3.5em;
  }
  .main-form-table td {
    padding: 3px 4px;
  }
  .sig-two-col-table td.sig-col {
    padding: 3px 4px 6px;
  }
  .cost-summary-wrapper {
    padding: 0 50px;
    font-size: 9px;
  }
  .cost-summary-table td {
    padding: 0 3px 1px 0;
  }
  .signature-line.long-line,
  .officer-line {
    width: 78%;
  }
  .signature-line.owner-line-left {
    min-width: 200px;
  }
  .owner-date .short-line {
    width: 90px;
  }
  .box {
    padding-top: 10px;
  }
  .info-line,
  .signature-line,
  .doc-blank,
  .short-blank,
  .long-blank,
  .mid-blank {
    border-bottom: 1px solid #000;
  }
}

/* PDF Export Container Styles - CRITICAL for preventing black PDF */
.pdf-export-container {
  background: #ffffff !important;
  background-color: white !important;
  font-family: Arial, sans-serif;
}

.pdf-export-container * {
  transform: none !important;
  -webkit-transform: none !important;
}

.pdf-export-container .printable-form {
  width: 210mm !important;
  max-width: 210mm !important;
  margin: 0 !important;
  padding: 10mm !important;
  box-sizing: border-box !important;
  background: #ffffff !important;
  background-color: white !important;
  box-shadow: none !important;
}

.pdf-export-container .v-card {
  border: none !important;
  box-shadow: none !important;
  background: white !important;
  transform: none !important;
}

.pdf-export-container .v-application,
.pdf-export-container .v-main,
.pdf-export-container .v-container {
  background: white !important;
  transform: none !important;
}

.pdf-export-container .no-print {
  display: none !important;
}

/* Print Media Queries - Force white backgrounds and disable transforms */
@media print {
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    transform: none !important;
    -webkit-transform: none !important;
  }

  body,
  html {
    margin: 0;
    padding: 0;
    background: white !important;
  }

  .no-print {
    display: none !important;
  }

  .printable-form {
    width: 8.5in !important;
    max-width: 8.5in !important;
    margin: 0 !important;
    padding: 0.25in !important;
    box-shadow: none !important;
    box-sizing: border-box !important;
    page-break-inside: avoid;
    background: white !important;
    background-color: #ffffff !important;
    font-size: 10px !important;
  }

  /* Force page break after first page */
  .printable-form:first-of-type {
    page-break-after: always !important;
    break-after: page !important;
  }

  .v-main,
  .v-container,
  .v-card,
  .v-application {
    padding: 0 !important;
    margin: 0 !important;
    background: white !important;
    transform: none !important;
  }

  .grey-background {
    background-color: white !important;
    padding: 0 !important;
  }

  .v-card {
    border: none !important;
    box-shadow: none !important;
    padding: 0.25in !important;
    background: white !important;
  }

  .v-card.pa-6 {
    padding: 0.25in !important;
  }

  .box {
    border: 2px solid black !important;
    padding: 8px 10px 10px 10px !important;
    page-break-inside: avoid;
    background: white !important;
  }

  /* Ensure borders are preserved in PDF */
  .main-form-table td,
  .cost-table td {
    border: 1px solid black !important;
  }

  .signature-section,
  .sig-two-col-table td.sig-col {
    border: 1px solid black !important;
  }

  .cost-note {
    border: none !important;
  }

  /* Prevent breaking inside critical sections */
  .supervisor-contract-wrapper,
  .notary-block,
  .cost-summary-wrapper,
  .main-form-table,
  .sig-two-col-table {
    page-break-inside: avoid;
  }

  /* Ensure all underlines and lines are visible */
  .permit-field,
  .date-field,
  .name-field,
  .address-field,
  .location-field,
  .occupancy-field,
  .signature-line,
  .info-line,
  .doc-blank,
  .short-blank,
  .long-blank,
  .mid-blank,
  .cost-line span {
    border-bottom: 1px solid #000 !important;
  }

  /* Adjust cost summary for print */
  .cost-summary-wrapper {
    padding: 0 40px !important;
    font-size: 9px !important;
  }

  /* Header adjustments for print */
  .text-center.mb-4 {
    margin-bottom: 8px !important;
  }

  .text-h5 {
    font-size: 16px !important;
  }

  .text-h6 {
    font-size: 12px !important;
  }

  .text-subtitle-2 {
    font-size: 11px !important;
  }

  /* Form content adjustments */
  .form-content {
    font-size: 10px !important;
  }

  .certification-text {
    font-size: 10px !important;
    line-height: 1.3 !important;
    margin-bottom: 6px !important;
    text-indent: 3em !important;
  }

  .form-row {
    font-size: 10px !important;
    line-height: 1.4 !important;
  }

  .row-label,
  .row-label-inline {
    font-size: 10px !important;
  }

  /* Table adjustments */
  .main-form-table {
    font-size: 9px !important;
    margin-bottom: 8px !important;
  }

  .main-form-table td {
    padding: 2px 4px !important;
  }

  /* Signature section adjustments */
  .sig-two-col-table td.sig-col {
    padding: 4px !important;
    font-size: 9px !important;
  }

  .signature-line {
    height: 12px !important;
  }

  .role-label {
    font-size: 9px !important;
  }

  /* Date field in header */
  .d-flex.justify-end.mb-10 {
    margin-bottom: 20px !important;
  }

  /* PAGE 2 - Design Professionals & Supervisors - Fit on single page */
  .printable-form.page-2,
  .printable-form:nth-of-type(2) {
    padding: 0.15in !important;
    font-size: 8px !important;
    min-height: auto !important;
    page-break-inside: avoid !important;
    page-break-after: auto !important;
    break-after: auto !important;
  }

  .printable-form.page-2 .text-center.mb-4,
  .printable-form:nth-of-type(2) .text-center.mb-4 {
    margin-bottom: 4px !important;
  }

  .printable-form.page-2 .text-subtitle-2,
  .printable-form:nth-of-type(2) .text-subtitle-2 {
    font-size: 11px !important;
    margin-bottom: 2px !important;
  }

  .printable-form.page-2 .mt-8,
  .printable-form:nth-of-type(2) .mt-8 {
    margin-top: 6px !important;
  }

  .printable-form.page-2 .d-flex,
  .printable-form:nth-of-type(2) .d-flex {
    gap: 6px !important;
  }

  .printable-form.page-2 br,
  .printable-form:nth-of-type(2) br {
    display: block;
    content: "";
    margin: 3px 0 !important;
    line-height: 3px !important;
  }

  /* Professional boxes - compact styling */
  .printable-form.page-2 [style*="border: 2px solid #222"],
  .printable-form:nth-of-type(2) [style*="border: 2px solid #222"] {
    border-width: 1px !important;
  }

  .printable-form.page-2 [style*="border-bottom: 2px solid #222"],
  .printable-form:nth-of-type(2) [style*="border-bottom: 2px solid #222"] {
    border-bottom-width: 1px !important;
    padding: 2px 4px !important;
    font-size: 10px !important;
  }

  .printable-form.page-2 [style*="padding: 8px 8px 0 8px"],
  .printable-form.page-2 [style*="padding: 8px"],
  .printable-form:nth-of-type(2) [style*="padding: 8px 8px 0 8px"],
  .printable-form:nth-of-type(2) [style*="padding: 8px"] {
    padding: 3px 4px 2px 4px !important;
  }

  .printable-form.page-2 [style*="margin-bottom: 8px"],
  .printable-form:nth-of-type(2) [style*="margin-bottom: 8px"] {
    margin-bottom: 2px !important;
  }

  .printable-form.page-2 [style*="font-size: 13px"],
  .printable-form:nth-of-type(2) [style*="font-size: 13px"] {
    font-size: 8px !important;
  }

  .printable-form.page-2 [style*="font-size: 15px"],
  .printable-form:nth-of-type(2) [style*="font-size: 15px"] {
    font-size: 9px !important;
  }

  .printable-form.page-2 table,
  .printable-form:nth-of-type(2) table {
    font-size: 7px !important;
  }

  .printable-form.page-2 table td,
  .printable-form:nth-of-type(2) table td {
    padding: 1px 2px !important;
    line-height: 1.1 !important;
  }

  .printable-form.page-2 [style*="height: 18px"],
  .printable-form:nth-of-type(2) [style*="height: 18px"] {
    height: 10px !important;
  }

  .printable-form.page-2 [style*="height: 16px"],
  .printable-form:nth-of-type(2) [style*="height: 16px"] {
    height: 10px !important;
  }

  .printable-form.page-2 [style*="min-width: 70px"],
  .printable-form:nth-of-type(2) [style*="min-width: 70px"] {
    min-width: 40px !important;
  }
}
</style>
