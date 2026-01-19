-- ============================================
-- DATA SEEDER FOR BPAM SYSTEM
-- ============================================

INSERT INTO Ownership_Type (ot_id, ot_desc) VALUES
('01', 'SOLE PROPRIETORSHIP'),
('02', 'PARTNERSHIP'),
('03', 'CORPORATION'),
('04', 'COOPERATIVE'),
('05', 'GOVERNMENT OWNED/CONTROLLED CORPORATION'),
('06', 'JOINT VENTURE'),

-- ============================================
-- Work_Scope_Type Table Seeder
-- ============================================
INSERT INTO Work_Scope_Type (ws_type_id, scope_desc) VALUES
('01', 'NEW CONSTRUCTION'),
('02', 'ERECTION'),
('03', 'ADDITION'),
('04', 'ALTERATION'),
('05', 'RENOVATION'),
('06', 'CONVERSION'),
('07', 'REPAIR'),
('08', 'DEMOLITION'),
('09', 'RAISING'),
('10', 'ACCESSORY BUILDING/STRUCTURE'),
('11', 'LEGALIZATION OF EXISTING BUILDING'),
('12', 'MOVING OF BUILDING/SIGN'),
('13', 'OTHERS (Specify)');

-- ============================================
-- Occupancy_Use_Group Table Seeder
-- ============================================
INSERT INTO Occupancy_Use_Group (ou_group_id, ou_group_desc) VALUES
('A', 'RESIDENTIAL (DWELLING UNITS)'),
('B', 'RESIDENTIAL'),
('C', 'EDUCATIONAL & RECREATIONAL'),
('D', 'INSTITUTIONAL'),
('E', 'COMMERCIAL'),
('F', 'LIGHT INDUSTRIAL'),
('G', 'MEDIUM INDUSTRIAL'),
('H', 'ASSEMBLY (OCCUPANT LOAD LESS THAN 1,000)'),
('I', 'ASSEMBLY (OCCUPANT LOAD 1,000 OR MORE)'),
('J1', 'AGRICULTURAL'),
('J2', 'ACCESSORIES');

-- ============================================
-- Occupancy_Use_Type Table Seeder
-- ============================================
INSERT INTO Occupancy_Use_Type (ou_type_id, ou_group_id, ou_type_desc) VALUES
-- GROUP A - RESIDENTIAL (DWELLING UNITS)
('A1', 'A', 'SINGLE'),
('A2', 'A', 'DUPLEX'),
('A3', 'A', 'RESIDENTIAL R1, R2'),
('AO', 'A', 'OTHERS'),

-- GROUP B - RESIDENTIAL
('B1', 'B', 'HOTEL'),
('B2', 'B', 'DORMITORY'),
('B3', 'B', 'TOWNHOUSE'),
('B4', 'B', 'MOTEL'),
('B5', 'B', 'BOARDING HOUSE/LODGING HOUSE'),
('B6', 'B', 'RESIDENTIAL R3, R4, R5'),
('BO', 'B', 'OTHERS'),

-- GROUP C - EDUCATIONAL
('C1', 'C', 'SCHOOL BUILDING'),
('C2', 'C', 'SCHOOL AUDITORIUM/GYMNASIUM'),
('C3', 'C', 'CIVIC CENTER'),
('C4', 'C', 'CLUBHOUSE'),
('C5', 'C', 'CHURCH/MOSQUE/TEMPLE CHAPEL'),
('CO', 'C', 'OTHERS'),

-- GROUP D - INSTITUTIONAL
('D1', 'D', 'HOSPITAL OR SIMILAR STRUCTURE'),
('D2', 'D', 'HOME FOR THE AGED/ORPHANAGE'),
('D3', 'D', 'GOVERNMENT OFFICE'),
('DO', 'D', 'OTHERS'),

-- GROUP E - COMMERCIAL
('E1', 'E', 'BANK'),
('E2', 'E', 'STORE'),
('E3', 'E', 'SHOPPING CENTER, MALL'),
('E4', 'E', 'DRINKING/DINING ESTABLISHMENT'),
('E5', 'E', 'SHOP (i.e. DRESS SHOP, TAILORING, BARBER SHOP, etc)'),
('EO', 'E', 'OTHERS'),

-- GROUP F - LIGHT INDUSTRIAL
('F1', 'F', 'FACTORY/PLANT (USING INCOMBUSTIBLE/NON-EXPLOSIVE MATERIALS)'),
('FO', 'F', 'OTHERS'),

-- GROUP G - MEDIUM INDUSTRIAL
('G1', 'G', 'STORAGE/WAREHOUSE (FOR HAZARDOUS/HIGHLY FLAMMABLE MATERIALS)'),
('G2', 'G', 'FACTORY (FOR HAZARDOUS/HIGHLY FLAMMABLE MATERIALS)'),
('GO', 'G', 'OTHERS'),

-- GROUP H - ASSEMBLY (OCCUPANT LOAD LESS THAN 1,000)
('H1', 'H', 'THEATER, AUDITORIUM, CONVENTION HALL, GRANDSTAND, BLEACHER'),
('HO', 'H', 'OTHERS'),

-- GROUP I - ASSEMBLY (OCCUPANT LOAD 1,000 OR MORE)
('I1', 'I', 'COLISEUM, SPORT COMPLEX, CONVENTION CENTER, AND SIMILAR STRUCTURE'),
('IO', 'I', 'OTHERS'),

-- GROUP J - AGRICULTURAL
('J1', 'J1', 'BARN, GRANARY, POULTRY HOUSE, PIGGERY, GRAIN MILL, GRAIN SILO'),
('JO', 'J1', 'OTHERS'),

-- GROUP K - (J-2) ACCESSORIES
('K1', 'J2', 'PRIVATE CAR PORT/GARAGE, TOWER, SWIMMING POOL, FENCE OVER 1.80M, STEEL/CONCRETE TANK'),
('KO', 'J2', 'OTHERS');