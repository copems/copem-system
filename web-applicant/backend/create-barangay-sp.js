import pool from './config/database.js';

async function createBarangayStoredProcedure() {
    try {
        // Drop if exists
        console.log('Dropping old stored procedure if exists...');
        await pool.query('DROP PROCEDURE IF EXISTS sp_GetBarangaysByCityMun');
        
        // Create the new procedure
        console.log('Creating new stored procedure...');
        const createProcedure = `
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
END`;
        
        await pool.query(createProcedure);
        console.log('Stored procedure created successfully!');
        
        // Test it
        console.log('\nTesting with citymun_id=1 (ADAMS):');
        const result = await pool.query('CALL sp_GetBarangaysByCityMun(?)', [1]);
        console.log('Result type:', typeof result);
        console.log('Result is array:', Array.isArray(result));
        if (Array.isArray(result) && result.length > 0 && Array.isArray(result[0])) {
            const [barangays] = result;
            console.log('Found', barangays.length, 'barangays:');
            barangays.slice(0, 5).forEach(brgy => {
                console.log(`  - ${brgy.brgy_name} (${brgy.brgy_code})`);
            });
        }
        
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await pool.end();
        process.exit(0);
    }
}

createBarangayStoredProcedure();
