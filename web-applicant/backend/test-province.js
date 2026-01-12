import pool from './config/database.js';

async function testProvinceStoredProcedure() {
    let conn;
    try {
        conn = await pool.getConnection();
        
        console.log('Calling sp_GetAllProvinces...');
        const rows = await conn.query('CALL sp_GetAllProvinces()');
        console.log('\nrows type:', typeof rows);
        console.log('rows is array:', Array.isArray(rows));
        console.log('rows length:', rows.length);
        console.log('\nrows[0] type:', typeof rows[0]);
        console.log('rows[0] is array:', Array.isArray(rows[0]));
        if (rows[0]) {
            console.log('rows[0] length:', rows[0].length);
            console.log('\nFirst 3 provinces:');
            rows[0].slice(0, 3).forEach((prov, idx) => {
                console.log(`  ${idx + 1}:`, prov);
            });
        }
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        if (conn) conn.release();
        process.exit(0);
    }
}

testProvinceStoredProcedure();
