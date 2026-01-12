-- Stored Procedures for city_mun Table

DELIMITER $$

-- Insert a new city/municipality
CREATE PROCEDURE sp_InsertCityMun(
    IN p_citymun_code VARCHAR(16),
    IN p_zipcode VARCHAR(16),
    IN p_citymun_name VARCHAR(255),
    IN p_prov_id INTEGER,
    OUT p_citymun_id INTEGER
)
BEGIN
    INSERT INTO city_mun (citymun_code, zipcode, citymun_name, prov_id)
    VALUES (p_citymun_code, p_zipcode, p_citymun_name, p_prov_id);
    
    SET p_citymun_id = LAST_INSERT_ID();
END$$

DELIMITER ;

DELIMITER $$

-- Get city/municipality by ID
CREATE PROCEDURE sp_GetCityMunById(
    IN p_citymun_id INTEGER
)
BEGIN
    SELECT 
        citymun_id,
        citymun_code,
        zipcode,
        citymun_name,
        prov_id
    FROM city_mun
    WHERE citymun_id = p_citymun_id;
END$$

DELIMITER ;

DELIMITER $$

-- Update city/municipality
CREATE PROCEDURE sp_UpdateCityMun(
    IN p_citymun_id INTEGER,
    IN p_citymun_code VARCHAR(16),
    IN p_zipcode VARCHAR(16),
    IN p_citymun_name VARCHAR(255),
    IN p_prov_id INTEGER
)
BEGIN
    UPDATE city_mun
    SET 
        citymun_code = p_citymun_code,
        zipcode = p_zipcode,
        citymun_name = p_citymun_name,
        prov_id = p_prov_id
    WHERE citymun_id = p_citymun_id;
END$$

DELIMITER ;

DELIMITER $$

-- Get all cities/municipalities by province ID
CREATE PROCEDURE sp_GetCityMunsByProvince(
    IN p_prov_id INTEGER
)
BEGIN
    SELECT 
        c.citymun_id,
        c.citymun_code,
        c.zip_code,
        c.citymun_name,
        c.prov_code
    FROM City_Mun c
    INNER JOIN Province p ON c.prov_code = p.prov_code
    WHERE p.prov_id = p_prov_id
    ORDER BY c.citymun_name ASC;
END$$

DELIMITER ;

DELIMITER $$

-- Get all cities/municipalities by province code
CREATE PROCEDURE sp_GetCityMunsByProvCode(
    IN p_prov_code VARCHAR(16)
)
BEGIN
    SELECT 
        c.citymun_id,
        c.citymun_code,
        c.zipcode,
        c.citymun_name,
        c.prov_id,
        p.prov_code,
        p.prov_name
    FROM city_mun c
    INNER JOIN Province p ON c.prov_id = p.prov_id
    WHERE p.prov_code = p_prov_code
    ORDER BY c.citymun_name ASC;
END$$

DELIMITER ;

DELIMITER $$

-- Get all cities/municipalities
CREATE PROCEDURE sp_GetAllCityMuns()
BEGIN
    SELECT 
        citymun_id,
        citymun_code,
        zipcode,
        citymun_name,
        prov_id
    FROM city_mun
    ORDER BY citymun_name ASC;
END$$

DELIMITER ;
