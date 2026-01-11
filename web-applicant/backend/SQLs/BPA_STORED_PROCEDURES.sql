DELIMITER $$

CREATE PROCEDURE sp_GetUserAccountByUsername(
    IN p_username VARCHAR(100)
)
BEGIN
    SELECT 
        user_id,
        username,
        user_password,
        account_type,
        is_active
    FROM User_Account
    WHERE username = p_username;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_InsertUserAccount(
    IN p_username VARCHAR(100),
    IN p_user_password VARCHAR(255),
    IN p_account_type INTEGER,
    OUT p_user_id INTEGER
)
BEGIN
    INSERT INTO User_Account (username, user_password, account_type, is_active)
    VALUES (p_username, p_user_password, p_account_type, TRUE);
    
    SET p_user_id = LAST_INSERT_ID();
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_InsertPermitApplicant(
    IN p_user_id INTEGER,
    IN p_lastname VARCHAR(50),
    IN p_firstname VARCHAR(50),
    IN p_middlename VARCHAR(50),
    IN p_contact_no VARCHAR(50),
    IN p_tin_no VARCHAR(12),
    IN p_brgy_code VARCHAR(16),
    IN p_house_no VARCHAR(255),
    IN p_street VARCHAR(255),
    OUT p_applicant_id INTEGER
)
BEGIN
    INSERT INTO Permit_Applicant (
        user_id,
        lastname,
        firstname,
        middlename,
        contact_no,
        tin_no,
        brgy_code,
        house_no,
        street
    )
    VALUES (
        p_user_id,
        p_lastname,
        p_firstname,
        p_middlename,
        p_contact_no,
        p_tin_no,
        p_brgy_code,
        p_house_no,
        p_street
    );
    
    SET p_applicant_id = LAST_INSERT_ID();
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_GetPermitApplicantById(
    IN p_applicant_id INTEGER
)
BEGIN
    SELECT 
        applicant_id,
        user_id,
        lastname,
        firstname,
        middlename,
        contact_no,
        tin_no,
        brgy_code,
        house_no,
        street
    FROM Permit_Applicant
    WHERE applicant_id = p_applicant_id;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_UpdatePermitApplicant(
    IN p_applicant_id INTEGER,
    IN p_user_id INTEGER,
    IN p_lastname VARCHAR(50),
    IN p_firstname VARCHAR(50),
    IN p_middlename VARCHAR(50),
    IN p_contact_no VARCHAR(50),
    IN p_tin_no VARCHAR(12),
    IN p_brgy_code VARCHAR(16),
    IN p_house_no VARCHAR(255),
    IN p_street VARCHAR(255)
)
BEGIN
    UPDATE Permit_Applicant
    SET
        user_id = p_user_id,
        lastname = p_lastname,
        firstname = p_firstname,
        middlename = p_middlename,
        contact_no = p_contact_no,
        tin_no = p_tin_no,
        brgy_code = p_brgy_code,
        house_no = p_house_no,
        street = p_street
    WHERE applicant_id = p_applicant_id;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_InsertBpaConstructionSite(
    IN p_applicant_id INTEGER,
    IN p_lot_no VARCHAR(255),
    IN p_block_no VARCHAR(255),
    IN p_tct_no VARCHAR(255),
    IN p_street VARCHAR(100),
    IN p_brgy_code VARCHAR(16),
    IN p_applicant_owned BOOLEAN,
    OUT p_bpac_site_id INTEGER
)
BEGIN
    INSERT INTO BPA_Construction_Site (
        applicant_id,
        lot_no,
        block_no,
        tct_no,
        street,
        brgy_code,
        applicant_owned
    )
    VALUES (
        p_applicant_id,
        p_lot_no,
        p_block_no,
        p_tct_no,
        p_street,
        p_brgy_code,
        p_applicant_owned
    );
    
    SET p_bpac_site_id = LAST_INSERT_ID();
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_GetBpaConstructionSiteById(
    IN p_bpac_site_id INTEGER
)
BEGIN
    SELECT 
        bpac_site_id,
        applicant_id,
        lot_no,
        block_no,
        tct_no,
        street,
        brgy_code,
        applicant_owned
    FROM BPA_Construction_Site
    WHERE bpac_site_id = p_bpac_site_id;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_UpdateBpaConstructionSite(
    IN p_bpac_site_id INTEGER,
    IN p_applicant_id INTEGER,
    IN p_lot_no VARCHAR(255),
    IN p_block_no VARCHAR(255),
    IN p_tct_no VARCHAR(255),
    IN p_street VARCHAR(100),
    IN p_brgy_code VARCHAR(16),
    IN p_applicant_owned BOOLEAN
)
BEGIN
    UPDATE BPA_Construction_Site
    SET
        applicant_id = p_applicant_id,
        lot_no = p_lot_no,
        block_no = p_block_no,
        tct_no = p_tct_no,
        street = p_street,
        brgy_code = p_brgy_code,
        applicant_owned = p_applicant_owned
    WHERE bpac_site_id = p_bpac_site_id;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_GetBpaConstructionSitesByApplicant(
    IN p_applicant_id INTEGER
)
BEGIN
    SELECT 
        bpac_site_id,
        applicant_id,
        lot_no,
        block_no,
        tct_no,
        street,
        brgy_code,
        applicant_owned
    FROM BPA_Construction_Site
    WHERE applicant_id = p_applicant_id;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_GetBpaConstructionSitesByBarangay(
    IN p_brgy_code VARCHAR(16)
)
BEGIN
    SELECT 
        bpac_site_id,
        applicant_id,
        lot_no,
        block_no,
        tct_no,
        street,
        brgy_code,
        applicant_owned
    FROM BPA_Construction_Site
    WHERE brgy_code = p_brgy_code;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_InsertBpaCsLotOwner(
    IN p_bpac_site_id INTEGER,
    IN p_lastname VARCHAR(50),
    IN p_firstname VARCHAR(50),
    IN p_middlename VARCHAR(50),
    IN p_address_details VARCHAR(255),
    IN p_brgy_code VARCHAR(16),
    OUT p_bpacs_lot_owner_id INTEGER
)
BEGIN
    INSERT INTO BPA_CS_Lot_Owner (
        bpac_site_id,
        lastname,
        firstname,
        middlename,
        address_details,
        brgy_code
    )
    VALUES (
        p_bpac_site_id,
        p_lastname,
        p_firstname,
        p_middlename,
        p_address_details,
        p_brgy_code
    );
    
    SET p_bpacs_lot_owner_id = LAST_INSERT_ID();
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_GetBpaCsLotOwnerById(
    IN p_bpacs_lot_owner_id INTEGER
)
BEGIN
    SELECT 
        bpacs_lot_owner_id,
        bpac_site_id,
        lastname,
        firstname,
        middlename,
        address_details,
        brgy_code
    FROM BPA_CS_Lot_Owner
    WHERE bpacs_lot_owner_id = p_bpacs_lot_owner_id;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_UpdateBpaCsLotOwner(
    IN p_bpacs_lot_owner_id INTEGER,
    IN p_bpac_site_id INTEGER,
    IN p_lastname VARCHAR(50),
    IN p_firstname VARCHAR(50),
    IN p_middlename VARCHAR(50),
    IN p_address_details VARCHAR(255),
    IN p_brgy_code VARCHAR(16)
)
BEGIN
    UPDATE BPA_CS_Lot_Owner
    SET
        bpac_site_id = p_bpac_site_id,
        lastname = p_lastname,
        firstname = p_firstname,
        middlename = p_middlename,
        address_details = p_address_details,
        brgy_code = p_brgy_code
    WHERE bpacs_lot_owner_id = p_bpacs_lot_owner_id;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_GetBpaCsLotOwnersBySite(
    IN p_bpac_site_id INTEGER
)
BEGIN
    SELECT 
        bpacs_lot_owner_id,
        bpac_site_id,
        lastname,
        firstname,
        middlename,
        address_details,
        brgy_code
    FROM BPA_CS_Lot_Owner
    WHERE bpac_site_id = p_bpac_site_id;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_GetBpaCsLotOwnersByBarangay(
    IN p_brgy_code VARCHAR(16)
)
BEGIN
    SELECT 
        bpacs_lot_owner_id,
        bpac_site_id,
        lastname,
        firstname,
        middlename,
        address_details,
        brgy_code
    FROM BPA_CS_Lot_Owner
    WHERE brgy_code = p_brgy_code;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_InsertBpacSupervisor(
    IN p_lastname VARCHAR(50),
    IN p_firstname VARCHAR(50),
    IN p_middlename VARCHAR(50),
    IN p_address_details VARCHAR(255),
    IN p_brgy_code VARCHAR(16),
    IN p_prc_no VARCHAR(255),
    IN p_validity DATETIME,
    IN p_ptr_no VARCHAR(255),
    IN p_issued_date DATETIME,
    IN p_issued_at VARCHAR(255),
    IN p_tin_no VARCHAR(12),
    OUT p_bpac_supervisor_id INTEGER
)
BEGIN
    INSERT INTO BPAC_Supervisors (
        lastname,
        firstname,
        middlename,
        address_details,
        brgy_code,
        prc_no,
        validity,
        ptr_no,
        issued_date,
        issued_at,
        tin_no
    )
    VALUES (
        p_lastname,
        p_firstname,
        p_middlename,
        p_address_details,
        p_brgy_code,
        p_prc_no,
        p_validity,
        p_ptr_no,
        p_issued_date,
        p_issued_at,
        p_tin_no
    );
    
    SET p_bpac_supervisor_id = LAST_INSERT_ID();
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_GetBpacSupervisorById(
    IN p_bpac_supervisor_id INTEGER
)
BEGIN
    SELECT 
        bpac_supervisor_id,
        lastname,
        firstname,
        middlename,
        address_details,
        brgy_code,
        prc_no,
        validity,
        ptr_no,
        issued_date,
        issued_at,
        tin_no
    FROM BPAC_Supervisors
    WHERE bpac_supervisor_id = p_bpac_supervisor_id;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_UpdateBpacSupervisor(
    IN p_bpac_supervisor_id INTEGER,
    IN p_lastname VARCHAR(50),
    IN p_firstname VARCHAR(50),
    IN p_middlename VARCHAR(50),
    IN p_address_details VARCHAR(255),
    IN p_brgy_code VARCHAR(16),
    IN p_prc_no VARCHAR(255),
    IN p_validity DATETIME,
    IN p_ptr_no VARCHAR(255),
    IN p_issued_date DATETIME,
    IN p_issued_at VARCHAR(255),
    IN p_tin_no VARCHAR(12)
)
BEGIN
    UPDATE BPAC_Supervisors
    SET
        lastname = p_lastname,
        firstname = p_firstname,
        middlename = p_middlename,
        address_details = p_address_details,
        brgy_code = p_brgy_code,
        prc_no = p_prc_no,
        validity = p_validity,
        ptr_no = p_ptr_no,
        issued_date = p_issued_date,
        issued_at = p_issued_at,
        tin_no = p_tin_no
    WHERE bpac_supervisor_id = p_bpac_supervisor_id;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_GetBpacSupervisorsByBarangay(
    IN p_brgy_code VARCHAR(16)
)
BEGIN
    SELECT 
        bpac_supervisor_id,
        lastname,
        firstname,
        middlename,
        address_details,
        brgy_code,
        prc_no,
        validity,
        ptr_no,
        issued_date,
        issued_at,
        tin_no
    FROM BPAC_Supervisors
    WHERE brgy_code = p_brgy_code;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_GetAllBpacSupervisors()
BEGIN
    SELECT 
        bpac_supervisor_id,
        lastname,
        firstname,
        middlename,
        address_details,
        brgy_code,
        prc_no,
        validity,
        ptr_no,
        issued_date,
        issued_at,
        tin_no
    FROM BPAC_Supervisors;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_SearchBpacSupervisorByPrcNo(
    IN p_prc_no VARCHAR(255)
)
BEGIN
    SELECT 
        bpac_supervisor_id,
        lastname,
        firstname,
        middlename,
        address_details,
        brgy_code,
        prc_no,
        validity,
        ptr_no,
        issued_date,
        issued_at,
        tin_no
    FROM BPAC_Supervisors
    WHERE prc_no LIKE CONCAT('%', p_prc_no, '%');
END$$

DELIMITER ;
