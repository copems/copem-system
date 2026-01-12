import pool from './config/database.js';

async function checkBarangayTable() {
    try {
        const result = await pool.query('DESCRIBE Barangay');
        console.log('Barangay table structure:');
        if (Array.isArray(result) && result.length > 0 && Array.isArray(result[0])) {
            console.log('Columns:');
            result[0].forEach(row => console.log(`  ${row.Field} - ${row.Type}`));
        } else {
            console.log('Raw result:', result);
        }
        
        // Check sample data
        const [data] = await pool.query('SELECT * FROM Barangay LIMIT 3');
        console.log('\nSample data:');
        console.log(data);
        
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await pool.end();
        process.exit(0);
    }
}

checkBarangayTable();
