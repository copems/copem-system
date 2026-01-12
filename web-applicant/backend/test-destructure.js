import pool from './config/database.js';

async function testControllerLogic() {
    let conn;
    try {
        conn = await pool.getConnection();
        
        console.log('Testing WITH destructuring [rows]:');
        const [rows] = await conn.query('CALL sp_GetAllProvinces()');
        console.log('  rows type:', typeof rows);
        console.log('  rows is array:', Array.isArray(rows));
        console.log('  rows length:', rows.length);
        console.log('  rows[0] type:', typeof rows[0]);
        console.log('  rows[0] is array:', Array.isArray(rows[0]));
        if (Array.isArray(rows[0])) {
            console.log('  rows[0] length:', rows[0].length);
            console.log('  First province in rows[0]:', rows[0][0]);
        } else {
            console.log('  First item in rows:', rows[0]);
        }
        
        console.log('\nTesting WITHOUT destructuring:');
        const allRows = await conn.query('CALL sp_GetAllProvinces()');
        console.log('  allRows type:', typeof allRows);
        console.log('  allRows is array:', Array.isArray(allRows));
        console.log('  allRows length:', allRows.length);
        console.log('  allRows[0] type:', typeof allRows[0]);
        console.log('  allRows[0] is array:', Array.isArray(allRows[0]));
        if (Array.isArray(allRows[0])) {
            console.log('  allRows[0] length:', allRows[0].length);
            console.log('  First province in allRows[0]:', allRows[0][0]);
        }
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        if (conn) conn.release();
        process.exit(0);
    }
}

testControllerLogic();
