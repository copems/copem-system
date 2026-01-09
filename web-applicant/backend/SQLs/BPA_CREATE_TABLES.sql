
DROP TABLE IF EXISTS User_Account;
CREATE TABLE IF NOT EXISTS User_Account
(
    user_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
	user_password VARCHAR(255) NOT NULL,
    account_type INTEGER DEFAULT(0),  #0 -> LGU STAFF, 1 -> Applicant
	is_active BOOLEAN DEFAULT(TRUE)
);

DROP TABLE IF EXISTS Barangay;
DROP TABLE IF EXISTS City_Mun;
DROP TABLE IF EXISTS Province;

CREATE TABLE IF NOT EXISTS Province
(
	prov_id INTEGER PRIMARY KEY,
    prov_code VARCHAR(16) NOT NULL,
    prov_name VARCHAR(255) NOT NULL,
	reg_code VARCHAR(16) NOT NULL
);


CREATE TABLE IF NOT EXISTS City_Mun
(
	citymun_id INTEGER PRIMARY KEY,
    citymun_code VARCHAR(16) NOT NULL,
    citymun_name VARCHAR(255) NOT NULL,
	prov_code VARCHAR(16) NOT NULL,
	zip_code VARCHAR(10) NOT NULL
);


CREATE TABLE IF NOT EXISTS Barangay
(
    brgy_id INTEGER PRIMARY KEY,
    brgy_code VARCHAR (16) NOT NULL,
    brgy_name VARCHAR (255) NOT NULL,
    citymun_code VARCHAR(16) NOT NULL
);

CREATE TABLE IF NOT EXISTS Gov_ID_Type
(
	git_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	git_desc VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Permit_Applicant
(
    applicant_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_id INTEGER NOT NULL,
    	FOREIGN KEY(user_id) REFERENCES User_Account(user_id),
    lastname VARCHAR(50) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
	middlename VARCHAR(50) NOT NULL,
	contact_no VARCHAR (50) NOT NULL,
	tin_no VARCHAR(12) NOT NULL,
	brgy_code VARCHAR(16) NOT NULL,
	house_no VARCHAR(255) NOT NULL,
	street VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Applicant_Gov_ID
(
	agid_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	id_no VARCHAR(255) NOT NULL,
	date_issued DATETIME NOT NULL,
	place_issued VARCHAR(255) NOT NULL,
	applicant_id INTEGER NOT NULL,
		FOREIGN KEY (applicant_id) REFERENCES Permit_Applicant(applicant_id),
	is_active BOOLEAN DEFAULT(TRUE)
);

CREATE TABLE IF NOT EXISTS Work_Scope_Type
(
	ws_type_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	scope_desc VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Ownership_Type
(
	ot_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	ot_desc VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Occupancy_Use_Group
(
	ou_group_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	ou_group_code VARCHAR(10) NOT NULL,
	ou_group_desc VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Occupancy_Use_Type
(
	ou_type_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	ou_group_id INTEGER NOT NULL,
		FOREIGN KEY (ou_group_id) REFERENCES Occupancy_Use_Group(ou_group_id),
	ou_type_desc VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS Construction_Site;
CREATE TABLE IF NOT EXISTS BPA_Construction_Site
(
	bpac_site_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	applicant_id INTEGER NOT NULL,
		FOREIGN KEY (applicant_id) REFERENCES Permit_Applicant(applicant_id),
	lot_no VARCHAR(255) NOT NULL,
	block_no VARCHAR(255) NOT NULL,
	tct_no VARCHAR(255) NOT NULL,
	street VARCHAR(100) NOT NULL,
	brgy_code VARCHAR(16) NOT NULL,
	applicant_owned BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS BPA_CS_Lot_Owner
(
	bpacs_lot_owner_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	bpac_site_id INTEGER NOT NULL,
		FOREIGN KEY (bpac_site_id) REFERENCES BPA_Construction_Site(bpac_site_id),
	lastname VARCHAR(50) NOT NULL,
	firstname VARCHAR(50) NOT NULL,
	middlename VARCHAR(50) NOT NULL,
	address_details VARCHAR(255) NOT NULL,
	brgy_code VARCHAR(16) NOT NULL
);

CREATE TABLE IF NOT EXISTS Lot_Owner_Gov_ID
(
	log_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	id_no VARCHAR(255) NOT NULL,
	date_issued DATETIME NOT NULL,
	place_issued VARCHAR(255) NOT NULL,
	bpacs_lot_owner_id INTEGER NOT NULL,
		FOREIGN KEY (bpacs_lot_owner_id) REFERENCES BPA_CS_Lot_Owner(bpacs_lot_owner_id),
	is_active BOOLEAN DEFAULT(TRUE)
);

CREATE TABLE IF NOT EXISTS BPAC_Supervisors
(
	bpac_supervisor_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	lastname VARCHAR(50) NOT NULL,
	firstname VARCHAR(50) NOT NULL,
	middlename VARCHAR(50) NOT NULL,
	address_details VARCHAR(255) NOT NULL,
	brgy_code VARCHAR(16) NOT NULL,
	prc_no VARCHAR(255) NOT NULL,
	validity DATETIME NOT NULL,
	ptr_no VARCHAR(255) NOT NULL,
	issued_date DATETIME NOT NULL,
	issued_at VARCHAR(255) NOT NULL,
	tin_no VARCHAR(12) NOT NULL
);

DROP TABLE IF EXISTS BP_Construction;
CREATE TABLE IF NOT EXISTS BPA_Construction
(
	bpac_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	application_no VARCHAR(10) NOT NULL,
	applicant_id INTEGER NOT NULL,
		FOREIGN KEY (applicant_id) REFERENCES Permit_Applicant(applicant_id),
	area_no VARCHAR(10) NOT NULL,
	ownership_type_id INTEGER,
		FOREIGN KEY (ownership_type_id) REFERENCES Ownership_Type(ot_id),
	bpac_site_id INTEGER NOT NULL,
		FOREIGN KEY (bpac_site_id) REFERENCES BPA_Construction_Site(bpac_site_id),
	work_scope_type_id INTEGER NOT NULL,
		FOREIGN KEY (work_scope_type_id) REFERENCES Work_Scope_Type(ws_type_id),
	workscope_remarks VARCHAR(255) NOT NULL,
	ou_type_id INTEGER NOT NULL,
		FOREIGN KEY (ou_type_id) REFERENCES Occupancy_Use_Type(ou_type_id),
	ou_type_others VARCHAR(255),
	num_units INTEGER NOT NULL,
	num_storey INTEGER NOT NULL,
	total_floor_area DECIMAL(15,2) NOT NULL,
	lot_area DECIMAL(15,2) NOT NULL,
	building_cost DECIMAL(15,2) NOT NULL,
	electrical_cost DECIMAL(15,2) NOT NULL,
	electrical_equipment_cost DECIMAL(15,2) NOT NULL,
	mechanical_cost DECIMAL(15,2) NOT NULL,
	mechanical_equipment_cost DECIMAL(15,2) NOT NULL,
	electronic_cost DECIMAL(15,2) NOT NULL,
	electronic_equipment_cost DECIMAL(15,2) NOT NULL,
	plumbing_cost DECIMAL(15,2) NOT NULL,
	plumbing_equipment_cost DECIMAL(15,2) NOT NULL,
	construction_date DATETIME NOT NULL,
	completion_date DATETIME NOT NULL,
	applicant_gov_id INTEGER NOT NULL,
		FOREIGN KEY (applicant_gov_id) REFERENCES Applicant_Gov_ID(agid_id),
	bpacs_lot_owner_id INTEGER NOT NULL,
		FOREIGN KEY (bpacs_lot_owner_id) REFERENCES BPA_CS_Lot_Owner(bpacs_lot_owner_id),
	bpacs_lo_gov_id INTEGER NOT NULL,
		FOREIGN KEY (bpacs_lo_gov_id) REFERENCES Lot_Owner_Gov_ID(log_id),
	bpac_supervisor_id INTEGER NOT NULL,
		FOREIGN KEY (bpac_supervisor_id) REFERENCES BPAC_Supervisors(bpac_supervisor_id)
);

CREATE TABLE IF NOT EXISTS BP_Application_Status
(
	bpa_status_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	bpac_id INTEGER NOT NULL,
		FOREIGN KEY (bpac_id) REFERENCES BPA_Construction(bpac_id),
	status_desc INTEGER NOT NULL,  # 0 -> Submitted, 1 -> In Review, 2 -> Approved, 3 -> Rejected
	remarks VARCHAR(255),
	date_conducted DATETIME NOT NULL
);
