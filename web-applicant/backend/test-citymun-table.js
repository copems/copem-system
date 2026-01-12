import pool from './config/database.js';

async function checkTable() {
    try {
        const result = await pool.query('DESCRIBE City_Mun');
        console.log('City_Mun table structure:');
        console.log('Result type:', typeof result);
        console.log('Result is array:', Array.isArray(result));
        console.log('Result length:', result.length);
        console.log('\nFull result:');
        if (Array.isArray(result) && result.length > 0) {
            if (Array.isArray(result[0])) {
                result[0].forEach(row => console.log(row));
            } else {
                result.forEach(row => console.log(row));
            }
        }
        
        // Also check if there's data
        const [data] = await pool.query('SELECT * FROM City_Mun LIMIT 3');
        console.log('\nSample data (prov_id=1):');
        console.log(data);
        
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        process.exit(0);
    }
}

checkTable();
