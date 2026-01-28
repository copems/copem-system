
DROP TABLE IF EXISTS User_Account;
CREATE TABLE IF NOT EXISTS User_Account
(
    user_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    account_type INTEGER NOT NULL DEFAULT 3,  -- 0 -> admin, 1 -> evaluator, 2 -> inspector, 3 -> applicant
    is_active BOOLEAN NOT NULL DEFAULT true,
    first_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50) NOT NULL DEFAULT '',
    last_name VARCHAR(50) NOT NULL
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

DROP TABLE IF EXISTS Gov_ID_Type;
CREATE TABLE IF NOT EXISTS Gov_ID_Type
(
	git_id VARCHAR(2) PRIMARY KEY,
	git_desc VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS Permit_Applicant;
CREATE TABLE IF NOT EXISTS Permit_Applicant
(
    applicant_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    	FOREIGN KEY(username) REFERENCES User_Account(username),
	contact_no VARCHAR (50) NOT NULL,
	tin_no VARCHAR(12) NOT NULL,
	brgy_code VARCHAR(16) NOT NULL,
	house_no VARCHAR(255) NOT NULL,
	street VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS Applicant_Gov_ID;
CREATE TABLE IF NOT EXISTS Applicant_Gov_ID
(
	agid_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	git_id VARCHAR(2) NOT NULL,
		FOREIGN KEY (git_id) REFERENCES Gov_ID_Type(git_id),
	id_no VARCHAR(255) NOT NULL,
	date_issued DATETIME NOT NULL,
	place_issued VARCHAR(255) NOT NULL,
	applicant_id INTEGER NOT NULL,
		FOREIGN KEY (applicant_id) REFERENCES Permit_Applicant(applicant_id),
	is_active BOOLEAN DEFAULT(TRUE)
);

CREATE TABLE IF NOT EXISTS Work_Scope_Type
(
	ws_type_id VARCHAR(2) PRIMARY KEY ,
	scope_desc VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Ownership_Type
(
	ot_id VARCHAR(2) PRIMARY KEY,
	ot_desc VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Occupancy_Use_Group
(
	ou_group_id VARCHAR(2) PRIMARY KEY,
	ou_group_desc VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Occupancy_Use_Type
(
	ou_type_id VARCHAR(2) PRIMARY KEY,
	ou_group_id VARCHAR(2) NOT NULL,
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

CREATE TABLE IF NOT EXISTS BPA_Construction
(
	bpac_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	application_no VARCHAR(10) NOT NULL,
	applicant_id INTEGER NOT NULL,
		FOREIGN KEY (applicant_id) REFERENCES Permit_Applicant(applicant_id),
	area_no VARCHAR(10) NOT NULL,
	ownership_type_id VARCHAR(2) NOT NULL,
		FOREIGN KEY (ownership_type_id) REFERENCES Ownership_Type(ot_id),
	bpac_site_id INTEGER NOT NULL,
		FOREIGN KEY (bpac_site_id) REFERENCES BPA_Construction_Site(bpac_site_id),
	work_scope_type_id VARCHAR(2) NOT NULL,
		FOREIGN KEY (work_scope_type_id) REFERENCES Work_Scope_Type(ws_type_id),
	workscope_remarks VARCHAR(255) NOT NULL,
	ou_type_id VARCHAR(2) NOT NULL,
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

CREATE TABLE IF NOT EXISTS Release_BP_Certificate
(
	release_bp_certificate_no INTEGER PRIMARY KEY AUTO_INCREMENT,
	application_no VARCHAR(10) NOT NULL,
	building_permit_no VARCHAR(50),
	FSEC_no VARCHAR(50),
	date_issued DATETIME,
	release_date DATETIME,
	official_receipt_no VARCHAR(50),
	date_paid DATETIME,
	bpac_id INTEGER,
		FOREIGN KEY (bpac_id) REFERENCES BPA_Construction(bpac_id),
	bpac_site_id INTEGER,
		FOREIGN KEY (bpac_site_id) REFERENCES BPA_Construction_Site(bpac_site_id)
);

CREATE TABLE IF NOT EXISTS BPA_Doc_Req
(
	bpa_dr_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	bpa_dr_description VARCHAR(255) NOT NULL,
	num_copy TINYINT NOT NULL
);

CREATE TABLE IF NOT EXISTS BPA_Doc_Req_Submission
(
	bpa_drs_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	bpa_dr_id INTEGER NOT NULL,
		FOREIGN KEY (bpa_dr_id) REFERENCES BPA_Doc_Req(bpa_dr_id),
	bpac_id INTEGER NOT NULL,
		FOREIGN KEY (bpac_id) REFERENCES BPA_Construction(bpac_id),
	date_submitted DATETIME NOT NULL,
	document_no VARCHAR(255),
	issued_at VARCHAR(255),
	issued_date DATETIME
);

CREATE TABLE IF NOT EXISTS Bldg_Plan_File
(
	bldg_plan_file_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	file_path VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Bldg_Official
(
	bldg_official_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	user_id INTEGER NOT NULL,
		FOREIGN KEY (user_id) REFERENCES User_Account(user_id),
	is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS Bldg_Plan_Type
(
	bldg_plan_type_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	bldg_plan_desc VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Bldg_Plan_Checklist
(
	bldg_plan_checklist_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	bldg_plan_checklist_desc VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Bldg_Plan_Evaluator
(
	bldg_plan_evaluator_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	bldg_official_id INTEGER NOT NULL,
		FOREIGN KEY (bldg_official_id) REFERENCES Bldg_Official(bldg_official_id),
	bldg_plan_type_id INTEGER NOT NULL,
		FOREIGN KEY (bldg_plan_type_id) REFERENCES Bldg_Plan_Type(bldg_plan_type_id),
	is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS Bldg_Plan_Evaluation
(
	bldg_plan_eval_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	bldg_plan_checklist_id INTEGER NOT NULL,
		FOREIGN KEY (bldg_plan_checklist_id) REFERENCES Bldg_Plan_Checklist(bldg_plan_checklist_id),
	is_compliant BOOLEAN NOT NULL,
	no_compliant_remarks VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Bldg_Plan_Submission
(
	bldg_plan_submission_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	bldg_plan_evaluator_id INTEGER NOT NULL,
		FOREIGN KEY (bldg_plan_evaluator_id) REFERENCES Bldg_Plan_Evaluator(bldg_plan_evaluator_id),
	bldg_plan_file_id INTEGER NOT NULL,
		FOREIGN KEY (bldg_plan_file_id) REFERENCES Bldg_Plan_File(bldg_plan_file_id),
	date_submitted DATETIME NOT NULL,
	status TINYINT NOT NULL
);
