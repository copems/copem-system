import pool from './config/database.js';

async function checkStoredProcedure() {
    try {
        // Check if stored procedure exists
        const [procs] = await pool.query(
            "SHOW PROCEDURE STATUS WHERE Name = 'sp_GetBarangaysByCityMun'"
        );
        console.log('Stored procedure exists:', procs.length > 0);
        
        if (procs.length > 0) {
            console.log('\nTrying to call it with citymun_id=1:');
            try {
                const result = await pool.query('CALL sp_GetBarangaysByCityMun(?)', [1]);
                console.log('Success! Result:', result);
            } catch (error) {
                console.log('Error calling SP:', error.message);
            }
        } else {
            console.log('\nStored procedure does not exist. Need to create it.');
        }
        
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await pool.end();
        process.exit(0);
    }
}

checkStoredProcedure();
