-- Stored Procedures for Barangay Table

DELIMITER $$

-- Get all barangays by city/municipality ID
CREATE PROCEDURE sp_GetBarangaysByCityMun(
    IN p_citymun_id INTEGER
)
BEGIN
    SELECT 
        b.brgy_id,
        b.brgy_code,
        b.brgy_name,
        b.citymun_code
    FROM Barangay b
    INNER JOIN City_Mun c ON b.citymun_code = c.citymun_code
    WHERE c.citymun_id = p_citymun_id
    ORDER BY b.brgy_name ASC;
END$$

DELIMITER ;
