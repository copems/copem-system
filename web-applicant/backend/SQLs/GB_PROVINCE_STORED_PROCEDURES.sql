-- Stored Procedures for Province Table

DELIMITER $$

-- Insert a new province
CREATE PROCEDURE sp_InsertProvince(
    IN p_prov_code VARCHAR(16),
    IN p_prov_name VARCHAR(128),
    IN p_reg_code VARCHAR(16),
    OUT p_prov_id INTEGER
)
BEGIN
    INSERT INTO Province (prov_code, prov_name, reg_code)
    VALUES (p_prov_code, p_prov_name, p_reg_code);
    
    SET p_prov_id = LAST_INSERT_ID();
END$$

DELIMITER ;

DELIMITER $$

-- Get province by ID
CREATE PROCEDURE sp_GetProvinceById(
    IN p_prov_id INTEGER
)
BEGIN
    SELECT 
        prov_id,
        prov_code,
        prov_name,
        reg_code
    FROM Province
    WHERE prov_id = p_prov_id;
END$$

DELIMITER ;

DELIMITER $$

-- Update province
CREATE PROCEDURE sp_UpdateProvince(
    IN p_prov_id INTEGER,
    IN p_prov_code VARCHAR(16),
    IN p_prov_name VARCHAR(128),
    IN p_reg_code VARCHAR(16)
)
BEGIN
    UPDATE Province
    SET 
        prov_code = p_prov_code,
        prov_name = p_prov_name,
        reg_code = p_reg_code
    WHERE prov_id = p_prov_id;
END$$

DELIMITER ;

DELIMITER $$

-- Get all provinces
CREATE PROCEDURE sp_GetAllProvinces()
BEGIN
    SELECT 
        prov_id,
        prov_code,
        prov_name,
        reg_code
    FROM Province
    ORDER BY prov_name ASC;
END$$

DELIMITER ;

DELIMITER $$

-- Get provinces by region code
CREATE PROCEDURE sp_GetProvincesByRegion(
    IN p_reg_code VARCHAR(16)
)
BEGIN
    SELECT 
        prov_id,
        prov_code,
        prov_name,
        reg_code
    FROM Province
    WHERE reg_code = p_reg_code
    ORDER BY prov_name ASC;
END$$

DELIMITER ;
