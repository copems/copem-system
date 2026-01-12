import pool from './config/database.js';

async function updateStoredProcedure() {
    try {
        // Drop the existing procedure
        console.log('Dropping old stored procedure...');
        await pool.query('DROP PROCEDURE IF EXISTS sp_GetCityMunsByProvince');
        
        // Create the new procedure
        console.log('Creating new stored procedure...');
        const createProcedure = `
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
END`;
        
        await pool.query(createProcedure);
        console.log('Stored procedure created successfully!');
        
        // Test it
        console.log('\nTesting with prov_id=1 (Ilocos Norte):');
        const result = await pool.query('CALL sp_GetCityMunsByProvince(?)', [1]);
        console.log('Result type:', typeof result);
        console.log('Result is array:', Array.isArray(result));
        console.log('Result length:', result.length);
        if (Array.isArray(result) && result.length > 0) {
            console.log('result[0] type:', typeof result[0]);
            console.log('result[0] is array:', Array.isArray(result[0]));
            if (Array.isArray(result[0])) {
                const [cities] = result;
                console.log('Found', cities.length, 'cities/municipalities:');
                cities.slice(0, 3).forEach(city => {
                    console.log(`  - ${city.citymun_name} (${city.citymun_code})`);
                });
            }
        }
        
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await pool.end();
        process.exit(0);
    }
}

updateStoredProcedure();
