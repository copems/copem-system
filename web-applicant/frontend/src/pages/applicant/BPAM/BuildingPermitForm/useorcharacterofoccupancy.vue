<template>
  <div class="occupancy-container">
    <div class="header-label">USE OR CHARACTER OF OCCUPANCY</div>

    <v-row no-gutters class="main-content">
      <v-col cols="4" class="column-border pa-1 pb-4">
        <div class="group-wrap">
          <v-checkbox
            label="GROUP A : RESIDENTIAL (DWELLINGS)"
            hide-details
            density="compact"
            class="group-title"
          ></v-checkbox>
          <div class="sub-group pl-5">
            <v-row no-gutters>
              <v-col cols="4">
                <v-checkbox
                  label="SINGLE"
                  hide-details
                  density="compact"
                ></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  label="DUPLEX"
                  hide-details
                  density="compact"
                ></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  label="RESIDENTIAL R-1, R-2"
                  hide-details
                  density="compact"
                ></v-checkbox>
              </v-col>
            </v-row>
            <div class="d-flex align-end">
              <v-checkbox
                label="OTHERS"
                hide-details
                density="compact"
              ></v-checkbox>
              <div class="underline-flex"></div>
            </div>
          </div>
        </div>

        <div class="group-wrap">
          <v-checkbox
            label="GROUP B : RESIDENTIAL"
            hide-details
            density="compact"
            class="group-title"
          ></v-checkbox>
          <div class="sub-group pl-5">
            <v-row no-gutters>
              <v-col cols="4">
                <v-checkbox
                  label="HOTEL"
                  hide-details
                  density="compact"
                ></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  label="MOTEL"
                  hide-details
                  density="compact"
                ></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  label="TOWNHOUSE"
                  hide-details
                  density="compact"
                ></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  label="DORMITORY"
                  hide-details
                  density="compact"
                ></v-checkbox>
              </v-col>
              <v-col cols="8">
                <v-checkbox
                  label="BOARDINGHOUSE, LODGING HOUSE"
                  hide-details
                  density="compact"
                ></v-checkbox>
              </v-col>
              <v-col cols="12">
                <v-checkbox
                  label="RESIDENTIAL R-3, R-4, R-5"
                  hide-details
                  density="compact"
                ></v-checkbox>
              </v-col>
            </v-row>
            <div class="d-flex align-end">
              <v-checkbox
                label="OTHERS"
                hide-details
                density="compact"
              ></v-checkbox>
              <div class="underline-flex"></div>
            </div>
          </div>
        </div>

        <div class="group-wrap">
          <v-checkbox
            label="GROUP C : EDUCATIONAL & RECREATIONAL"
            hide-details
            density="compact"
            class="group-title"
          ></v-checkbox>
          <div class="sub-group pl-5">
            <v-row no-gutters>
              <v-col cols="6">
                <v-checkbox
                  label="SCHOOL BUILDING"
                  hide-details
                  density="compact"
                ></v-checkbox>
              </v-col>
              <v-col cols="6">
                <v-checkbox
                  label="SCHOOL AUDITORIUM, GYMNASIUM"
                  hide-details
                  density="compact"
                ></v-checkbox>
              </v-col>
              <v-col cols="12">
                <v-checkbox
                  label="CIVIC CENTER"
                  hide-details
                  density="compact"
                ></v-checkbox>
              </v-col>
              <v-col cols="6">
                <v-checkbox
                  label="CLUBHOUSE"
                  hide-details
                  density="compact"
                ></v-checkbox>
              </v-col>
              <v-col cols="6">
                <v-checkbox
                  label="CHURCH, MOSQUE, TEMPLE, CHAPEL"
                  hide-details
                  density="compact"
                ></v-checkbox>
              </v-col>
            </v-row>
            <div class="d-flex align-end">
              <v-checkbox
                label="OTHERS"
                hide-details
                density="compact"
              ></v-checkbox>
              <div class="underline-flex"></div>
            </div>
          </div>
        </div>

        <div class="group-wrap">
          <v-checkbox
            label="GROUP D : INSTITUTIONAL"
            hide-details
            density="compact"
            class="group-title"
          ></v-checkbox>
          <div class="sub-group pl-5">
            <v-checkbox
              label="HOSPITAL OR SIMILAR STRUCTURE"
              hide-details
              density="compact"
            ></v-checkbox>
            <v-checkbox
              label="HOME FOR THE AGED"
              hide-details
              density="compact"
            ></v-checkbox>
            <v-checkbox
              label="GOVERNMENT OFFICE"
              hide-details
              density="compact"
            ></v-checkbox>
            <div class="d-flex align-end">
              <v-checkbox
                label="OTHERS"
                hide-details
                density="compact"
              ></v-checkbox>
              <div class="underline-flex"></div>
            </div>
          </div>
        </div>
      </v-col>

      <v-col cols="4" class="column-border pa-1 pb-4">
        <div class="group-wrap">
          <v-checkbox
            label="GROUP E : COMMERCIAL"
            hide-details
            density="compact"
            class="group-title"
          ></v-checkbox>
          <div class="sub-group pl-5">
            <v-row no-gutters>
              <v-col cols="4">
                <v-checkbox
                  label="BANK"
                  hide-details
                  density="compact"
                ></v-checkbox>
              </v-col>
              <v-col cols="3">
                <v-checkbox
                  label="STORE"
                  hide-details
                  density="compact"
                ></v-checkbox>
              </v-col>
              <v-col cols="5">
                <v-checkbox
                  label="SHOPPING CENTER / MALL"
                  hide-details
                  density="compact"
                ></v-checkbox>
              </v-col>
            </v-row>
            <v-checkbox
              label="DRINKING / DINING ESTABLISHMENT"
              hide-details
              density="compact"
            ></v-checkbox>
            <v-checkbox
              label="SHOP (i.e. DRESS SHOP, TAILORING, BARBERSHOP, etc.)"
              hide-details
              density="compact"
            ></v-checkbox>
            <div class="d-flex align-end">
              <v-checkbox
                label="OTHERS"
                hide-details
                density="compact"
              ></v-checkbox>
              <div class="underline-flex"></div>
            </div>
          </div>
        </div>

        <div class="group-wrap">
          <v-checkbox
            label="GROUP F : LIGHT INDUSTRIAL"
            hide-details
            density="compact"
            class="group-title"
          ></v-checkbox>
          <div class="sub-group pl-5">
            <v-checkbox
              label="FACTORY / PLANT (USING INCOMBUSTIBLE / NON-EXPLOSIVE MATERIALS)"
              hide-details
              density="compact"
            ></v-checkbox>
            <div class="d-flex align-end">
              <v-checkbox
                label="OTHERS"
                hide-details
                density="compact"
              ></v-checkbox>
              <div class="underline-flex"></div>
            </div>
          </div>
        </div>

        <div class="group-wrap">
          <v-checkbox
            label="GROUP G : MEDIUM INDUSTRIAL"
            hide-details
            density="compact"
            class="group-title"
          ></v-checkbox>
          <div class="sub-group pl-5">
            <v-checkbox
              label="STORAGE / WAREHOUSE (FOR HAZARDOUS / HIGHLY FLAMMABLE MATERIALS)"
              hide-details
              density="compact"
            ></v-checkbox>
            <v-checkbox
              label="FACTORY (FOR HAZARDOUS / HIGHLY FLAMMABLE MATERIALS)"
              hide-details
              density="compact"
            ></v-checkbox>
            <div class="d-flex align-end">
              <v-checkbox
                label="OTHERS"
                hide-details
                density="compact"
              ></v-checkbox>
              <div class="underline-flex"></div>
            </div>
          </div>
        </div>
      </v-col>

      <v-col cols="4" class="pa-1 pb-4">
        <div class="group-wrap">
          <v-checkbox
            label="GROUP H : ASSEMBLY (OCCUPANT LOAD LESS THAN 1,000)"
            hide-details
            density="compact"
            class="group-title"
          ></v-checkbox>
          <div class="sub-group pl-5">
            <v-checkbox
              label="THEATER, AUDITORIUM, CONVENTION HALL, GRANDSTAND / BLEACHER"
              hide-details
              density="compact"
            ></v-checkbox>
            <div class="d-flex align-end">
              <v-checkbox
                label="OTHERS"
                hide-details
                density="compact"
              ></v-checkbox>
              <div class="underline-flex"></div>
            </div>
          </div>
        </div>

        <div class="group-wrap">
          <v-checkbox
            label="GROUP I : ASSEMBLY (OCCUPANT LOAD 1,000 OR MORE)"
            hide-details
            density="compact"
            class="group-title"
          ></v-checkbox>
          <div class="sub-group pl-5">
            <v-checkbox
              label="COLISEUM, SPORTS COMPLEX, CONVENTION CENTER AND SIMILAR STRUCTURE"
              hide-details
              density="compact"
            ></v-checkbox>
            <div class="d-flex align-end">
              <v-checkbox
                label="OTHERS"
                hide-details
                density="compact"
              ></v-checkbox>
              <div class="underline-flex"></div>
            </div>
          </div>
        </div>

        <div class="group-wrap">
          <v-checkbox
            label="GROUP J : (J-1) AGRICULTURAL"
            hide-details
            density="compact"
            class="group-title"
          ></v-checkbox>
          <div class="sub-group pl-5">
            <v-checkbox
              label="BARN, GRANARY, POULTRY HOUSE, PIGGERY, GRAIN MILL, GRAIN SILO"
              hide-details
              density="compact"
            ></v-checkbox>
            <div class="d-flex align-end">
              <v-checkbox
                label="OTHERS"
                hide-details
                density="compact"
              ></v-checkbox>
              <div class="underline-flex"></div>
            </div>
          </div>
        </div>

        <div class="group-wrap">
          <v-checkbox
            label="GROUP J : (J-2) ACCESSORIES"
            hide-details
            density="compact"
            class="group-title"
          ></v-checkbox>
          <div class="sub-group pl-5">
            <v-checkbox
              label="PRIVATE CARPORT/GARAGE, TOWER, SWIMMING POOL, FENCE OVER 1.80m, STEEL / CONCRETE TANK"
              hide-details
              density="compact"
            ></v-checkbox>
            <div class="d-flex align-end">
              <v-checkbox
                label="OTHERS"
                hide-details
                density="compact"
              ></v-checkbox>
              <div class="underline-flex"></div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>

    <div class="separator-bar"></div>

    <div class="data-box-container pa-4">
      <v-row no-gutters>
        <v-col cols="5" class="pr-6">
          <div class="fill-line">
            OCCUPANCY CLASSIFIED <span class="line-dot"></span>
          </div>
          <div class="fill-line">
            NUMBER OF UNITS <span class="line-dot"></span>
          </div>
          <div class="fill-line">
            NUMBER OF STOREY <span class="line-dot"></span>
          </div>
          <div class="fill-line">
            TOTAL FLOOR AREA <span class="line-dot"></span>
            <span class="unit">SQ. M.</span>
          </div>
          <div class="fill-line">
            LOT AREA <span class="line-dot"></span>
            <span class="unit">SQ. M.</span>
          </div>
        </v-col>

        <v-col cols="7">
          <div class="fill-line">
            TOTAL ESTIMATED COST: P <span class="line-dot"></span>
          </div>
          <v-row no-gutters class="mt-1">
            <v-col cols="6">
              <div class="fill-line">
                BUILDING <span class="line-dot"></span>
              </div>
              <div class="fill-line">
                ELECTRICAL <span class="line-dot"></span>
              </div>
              <div class="fill-line">
                MECHANICAL <span class="line-dot"></span>
              </div>
              <div class="fill-line">
                ELECTRONICS <span class="line-dot"></span>
              </div>
              <div class="fill-line">
                PLUMBING <span class="line-dot"></span>
              </div>
            </v-col>
            <v-col cols="6" class="pl-4">
              <div class="cost-header">COST OF EQUIPMENT INSTALLED:</div>
              <div class="fill-line">P <span class="line-dot"></span></div>
              <div class="fill-line">P <span class="line-dot"></span></div>
              <div class="fill-line">P <span class="line-dot"></span></div>
              <div class="fill-line">P <span class="line-dot"></span></div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row no-gutters class="mt-2">
        <v-col cols="5" class="pr-6">
          <div class="fill-line">
            PROPOSED DATE OF CONSTRUCTION: <span class="line-dot"></span>
          </div>
        </v-col>
        <v-col cols="7">
          <div class="fill-line">
            EXPECTED DATE OF COMPLETION: <span class="line-dot"></span>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<style scoped>
.occupancy-container {
  border: 1px solid black;
  font-family: "Arial Narrow", Arial, sans-serif;
  background-color: white;
  width: 100%;
  color: black;
}

.header-label {
  padding: 4px 8px;
  font-size: 14px;

  text-align: left;
}

.main-content {
  border-bottom: 1px solid black; /* Bottom line of the checkbox area */
}

.column-border {
  border-right: 1px;
}

.group-wrap {
  margin-bottom: 4px;
}

/* Group Titles */
.group-title :deep(.v-label) {
  text-decoration: underline;
  font-size: 11px !important;
  opacity: 1;
  color: black !important;
}

/* Standard Checkbox Labels */
:deep(.v-checkbox .v-label) {
  font-size: 9.5px !important;
  color: black !important;
  opacity: 1;
  line-height: 1.1;
  padding-inline-start: 4px;
}

:deep(.v-selection-control) {
  min-height: 20px !important;
}

:deep(.v-selection-control__wrapper) {
  height: 20px !important;
  width: 20px !important;
}

:deep(.v-icon) {
  font-size: 16px;
}

.underline-flex {
  border-bottom: 1px solid black;
  flex-grow: 1;
  margin-bottom: 5px;
  margin-left: 4px;
}

.sub-group {
  margin-top: -4px;
}

/* Horizontal Separator Bar between sections */
.separator-bar {
  border-bottom: 1px;
}

/* Data Box Section Styles */
.data-box-container {
  background-color: white;
  color: black;
  font-family: "Arial Narrow", Arial, sans-serif;
  text-transform: uppercase;
  font-size: 11px;
}

.fill-line {
  display: flex;
  align-items: baseline;
  margin-bottom: 4px;
  white-space: nowrap;
}

.line-dot {
  border-bottom: 1px solid black;
  flex-grow: 1;
  margin-left: 5px;
  height: 12px;
}

.cost-header {
  font-size: 10px;
  margin-bottom: 4px;
}

.unit {
  margin-left: 6px;
  min-width: 40px;
}
</style>