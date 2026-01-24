-- Migration to add BPA Construction stored procedures
-- Run this script to add the missing stored procedures

DELIMITER $$

-- Drop existing procedures if they exist
DROP PROCEDURE IF EXISTS sp_InsertBpaConstruction$$
DROP PROCEDURE IF EXISTS sp_UpdateBpaConstruction$$
DROP PROCEDURE IF EXISTS sp_GetBpaConstructionById$$
DROP PROCEDURE IF EXISTS sp_GetBpaConstructionsByApplicant$$
DROP PROCEDURE IF EXISTS sp_GetLatestDraftByApplicant$$
DROP PROCEDURE IF EXISTS sp_GetBpaConstructionByApplicationNo$$

DELIMITER ;

-- Add is_draft column to BPA_Construction if it doesn't exist
-- Note: Run this ALTER TABLE statement separately if needed
-- ALTER TABLE BPA_Construction ADD COLUMN is_draft BOOLEAN DEFAULT TRUE;

-- Modify nullable columns (run separately if needed)
-- ALTER TABLE BPA_Construction MODIFY COLUMN bpacs_lot_owner_id INTEGER NULL;
-- ALTER TABLE BPA_Construction MODIFY COLUMN bpacs_lo_gov_id INTEGER NULL;
-- ALTER TABLE BPA_Construction MODIFY COLUMN bpac_supervisor_id INTEGER NULL;

DELIMITER $$

CREATE PROCEDURE sp_InsertBpaConstruction(
    IN p_application_no VARCHAR(50),
    IN p_applicant_id INTEGER,
    IN p_area_no VARCHAR(50),
    IN p_ownership_type_id VARCHAR(2),
    IN p_bpac_site_id INTEGER,
    IN p_work_scope_type_id VARCHAR(2),
    IN p_workscope_remarks VARCHAR(255),
    IN p_ou_type_id VARCHAR(2),
    IN p_ou_type_others VARCHAR(255),
    IN p_num_units INTEGER,
    IN p_num_storey INTEGER,
    IN p_total_floor_area DECIMAL(15,2),
    IN p_lot_area DECIMAL(15,2),
    IN p_building_cost DECIMAL(15,2),
    IN p_electrical_cost DECIMAL(15,2),
    IN p_electrical_equipment_cost DECIMAL(15,2),
    IN p_mechanical_cost DECIMAL(15,2),
    IN p_mechanical_equipment_cost DECIMAL(15,2),
    IN p_electronic_cost DECIMAL(15,2),
    IN p_electronic_equipment_cost DECIMAL(15,2),
    IN p_plumbing_cost DECIMAL(15,2),
    IN p_plumbing_equipment_cost DECIMAL(15,2),
    IN p_construction_date DATE,
    IN p_completion_date DATE,
    IN p_applicant_gov_id INTEGER,
    IN p_bpacs_lot_owner_id INTEGER,
    IN p_bpacs_lo_gov_id INTEGER,
    IN p_bpac_supervisor_id INTEGER,
    IN p_is_draft BOOLEAN,
    OUT p_bpac_id INTEGER
)
BEGIN
    INSERT INTO BPA_Construction (
        application_no,
        applicant_id,
        area_no,
        ownership_type_id,
        bpac_site_id,
        work_scope_type_id,
        workscope_remarks,
        ou_type_id,
        ou_type_others,
        num_units,
        num_storey,
        total_floor_area,
        lot_area,
        building_cost,
        electrical_cost,
        electrical_equipment_cost,
        mechanical_cost,
        mechanical_equipment_cost,
        electronic_cost,
        electronic_equipment_cost,
        plumbing_cost,
        plumbing_equipment_cost,
        construction_date,
        completion_date,
        applicant_gov_id,
        bpacs_lot_owner_id,
        bpacs_lo_gov_id,
        bpac_supervisor_id,
        is_draft
    )
    VALUES (
        p_application_no,
        p_applicant_id,
        p_area_no,
        p_ownership_type_id,
        p_bpac_site_id,
        p_work_scope_type_id,
        COALESCE(p_workscope_remarks, ''),
        p_ou_type_id,
        p_ou_type_others,
        COALESCE(p_num_units, 0),
        COALESCE(p_num_storey, 0),
        COALESCE(p_total_floor_area, 0),
        COALESCE(p_lot_area, 0),
        COALESCE(p_building_cost, 0),
        COALESCE(p_electrical_cost, 0),
        COALESCE(p_electrical_equipment_cost, 0),
        COALESCE(p_mechanical_cost, 0),
        COALESCE(p_mechanical_equipment_cost, 0),
        COALESCE(p_electronic_cost, 0),
        COALESCE(p_electronic_equipment_cost, 0),
        COALESCE(p_plumbing_cost, 0),
        COALESCE(p_plumbing_equipment_cost, 0),
        COALESCE(p_construction_date, CURRENT_DATE),
        COALESCE(p_completion_date, CURRENT_DATE),
        p_applicant_gov_id,
        p_bpacs_lot_owner_id,
        p_bpacs_lo_gov_id,
        p_bpac_supervisor_id,
        COALESCE(p_is_draft, TRUE)
    );
    
    SET p_bpac_id = LAST_INSERT_ID();
    SELECT p_bpac_id AS bpac_id;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_UpdateBpaConstruction(
    IN p_bpac_id INTEGER,
    IN p_application_no VARCHAR(50),
    IN p_applicant_id INTEGER,
    IN p_area_no VARCHAR(50),
    IN p_ownership_type_id VARCHAR(2),
    IN p_bpac_site_id INTEGER,
    IN p_work_scope_type_id VARCHAR(2),
    IN p_workscope_remarks VARCHAR(255),
    IN p_ou_type_id VARCHAR(2),
    IN p_ou_type_others VARCHAR(255),
    IN p_num_units INTEGER,
    IN p_num_storey INTEGER,
    IN p_total_floor_area DECIMAL(15,2),
    IN p_lot_area DECIMAL(15,2),
    IN p_building_cost DECIMAL(15,2),
    IN p_electrical_cost DECIMAL(15,2),
    IN p_electrical_equipment_cost DECIMAL(15,2),
    IN p_mechanical_cost DECIMAL(15,2),
    IN p_mechanical_equipment_cost DECIMAL(15,2),
    IN p_electronic_cost DECIMAL(15,2),
    IN p_electronic_equipment_cost DECIMAL(15,2),
    IN p_plumbing_cost DECIMAL(15,2),
    IN p_plumbing_equipment_cost DECIMAL(15,2),
    IN p_construction_date DATE,
    IN p_completion_date DATE,
    IN p_applicant_gov_id INTEGER,
    IN p_bpacs_lot_owner_id INTEGER,
    IN p_bpacs_lo_gov_id INTEGER,
    IN p_bpac_supervisor_id INTEGER,
    IN p_is_draft BOOLEAN
)
BEGIN
    UPDATE BPA_Construction
    SET
        application_no = p_application_no,
        applicant_id = p_applicant_id,
        area_no = p_area_no,
        ownership_type_id = p_ownership_type_id,
        bpac_site_id = p_bpac_site_id,
        work_scope_type_id = p_work_scope_type_id,
        workscope_remarks = COALESCE(p_workscope_remarks, workscope_remarks),
        ou_type_id = p_ou_type_id,
        ou_type_others = p_ou_type_others,
        num_units = COALESCE(p_num_units, num_units),
        num_storey = COALESCE(p_num_storey, num_storey),
        total_floor_area = COALESCE(p_total_floor_area, total_floor_area),
        lot_area = COALESCE(p_lot_area, lot_area),
        building_cost = COALESCE(p_building_cost, building_cost),
        electrical_cost = COALESCE(p_electrical_cost, electrical_cost),
        electrical_equipment_cost = COALESCE(p_electrical_equipment_cost, electrical_equipment_cost),
        mechanical_cost = COALESCE(p_mechanical_cost, mechanical_cost),
        mechanical_equipment_cost = COALESCE(p_mechanical_equipment_cost, mechanical_equipment_cost),
        electronic_cost = COALESCE(p_electronic_cost, electronic_cost),
        electronic_equipment_cost = COALESCE(p_electronic_equipment_cost, electronic_equipment_cost),
        plumbing_cost = COALESCE(p_plumbing_cost, plumbing_cost),
        plumbing_equipment_cost = COALESCE(p_plumbing_equipment_cost, plumbing_equipment_cost),
        construction_date = COALESCE(p_construction_date, construction_date),
        completion_date = COALESCE(p_completion_date, completion_date),
        applicant_gov_id = p_applicant_gov_id,
        bpacs_lot_owner_id = p_bpacs_lot_owner_id,
        bpacs_lo_gov_id = p_bpacs_lo_gov_id,
        bpac_supervisor_id = p_bpac_supervisor_id,
        is_draft = COALESCE(p_is_draft, is_draft)
    WHERE bpac_id = p_bpac_id;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_GetBpaConstructionById(
    IN p_bpac_id INTEGER
)
BEGIN
    SELECT 
        bpac_id,
        application_no,
        applicant_id,
        area_no,
        ownership_type_id,
        bpac_site_id,
        work_scope_type_id,
        workscope_remarks,
        ou_type_id,
        ou_type_others,
        num_units,
        num_storey,
        total_floor_area,
        lot_area,
        building_cost,
        electrical_cost,
        electrical_equipment_cost,
        mechanical_cost,
        mechanical_equipment_cost,
        electronic_cost,
        electronic_equipment_cost,
        plumbing_cost,
        plumbing_equipment_cost,
        construction_date,
        completion_date,
        applicant_gov_id,
        bpacs_lot_owner_id,
        bpacs_lo_gov_id,
        bpac_supervisor_id,
        is_draft
    FROM BPA_Construction
    WHERE bpac_id = p_bpac_id;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_GetBpaConstructionsByApplicant(
    IN p_applicant_id INTEGER
)
BEGIN
    SELECT 
        bpac_id,
        application_no,
        applicant_id,
        area_no,
        ownership_type_id,
        bpac_site_id,
        work_scope_type_id,
        workscope_remarks,
        ou_type_id,
        ou_type_others,
        num_units,
        num_storey,
        total_floor_area,
        lot_area,
        building_cost,
        electrical_cost,
        electrical_equipment_cost,
        mechanical_cost,
        mechanical_equipment_cost,
        electronic_cost,
        electronic_equipment_cost,
        plumbing_cost,
        plumbing_equipment_cost,
        construction_date,
        completion_date,
        applicant_gov_id,
        bpacs_lot_owner_id,
        bpacs_lo_gov_id,
        bpac_supervisor_id,
        is_draft
    FROM BPA_Construction
    WHERE applicant_id = p_applicant_id
    ORDER BY bpac_id DESC;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_GetLatestDraftByApplicant(
    IN p_applicant_id INTEGER
)
BEGIN
    SELECT 
        bpac_id,
        application_no,
        applicant_id,
        area_no,
        ownership_type_id,
        bpac_site_id,
        work_scope_type_id,
        workscope_remarks,
        ou_type_id,
        ou_type_others,
        num_units,
        num_storey,
        total_floor_area,
        lot_area,
        building_cost,
        electrical_cost,
        electrical_equipment_cost,
        mechanical_cost,
        mechanical_equipment_cost,
        electronic_cost,
        electronic_equipment_cost,
        plumbing_cost,
        plumbing_equipment_cost,
        construction_date,
        completion_date,
        applicant_gov_id,
        bpacs_lot_owner_id,
        bpacs_lo_gov_id,
        bpac_supervisor_id,
        is_draft
    FROM BPA_Construction
    WHERE applicant_id = p_applicant_id 
      AND is_draft = TRUE
    ORDER BY bpac_id DESC
    LIMIT 1;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_GetBpaConstructionByApplicationNo(
    IN p_application_no VARCHAR(50)
)
BEGIN
    SELECT 
        bpac_id,
        application_no,
        applicant_id,
        area_no,
        ownership_type_id,
        bpac_site_id,
        work_scope_type_id,
        workscope_remarks,
        ou_type_id,
        ou_type_others,
        num_units,
        num_storey,
        total_floor_area,
        lot_area,
        building_cost,
        electrical_cost,
        electrical_equipment_cost,
        mechanical_cost,
        mechanical_equipment_cost,
        electronic_cost,
        electronic_equipment_cost,
        plumbing_cost,
        plumbing_equipment_cost,
        construction_date,
        completion_date,
        applicant_gov_id,
        bpacs_lot_owner_id,
        bpacs_lo_gov_id,
        bpac_supervisor_id,
        is_draft
    FROM BPA_Construction
    WHERE application_no = p_application_no;
END$$

DELIMITER ;
