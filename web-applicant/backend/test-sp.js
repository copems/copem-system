import pool from './config/database.js';

async function testStoredProcedure() {
    let conn;
    try {
        conn = await pool.getConnection();
        
        // First, insert a test user
        console.log('Inserting test user...');
        await conn.query(
            "INSERT INTO User_Account (username, user_password, account_type, is_active) VALUES (?, ?, ?, ?)",
            ['test@example.com', 'password123', 3, true] // 3 = applicant
        );
        console.log('Test user inserted');
        
        // Now call the stored procedure
        console.log('\nCalling stored procedure...');
        const rows = await conn.query('CALL sp_GetUserAccountByUsername(?)', ['test@example.com']);
        console.log('Raw result:', rows);
        console.log('rows type:', typeof rows);
        console.log('rows is array:', Array.isArray(rows));
        console.log('rows[0]:', rows[0]);
        console.log('rows[0] is array:', Array.isArray(rows[0]));
        if (rows[0]) {
            console.log('rows[0] length:', rows[0].length);
            console.log('rows[0][0]:', rows[0][0]);
        }
        
        // Clean up
        await conn.query("DELETE FROM User_Account WHERE username = 'test@example.com'");
        console.log('\nTest user deleted');
        
    } catch (error) {
        console.error('Error:', error);
        console.error('Error stack:', error.stack);
    } finally {
        if (conn) conn.release();
        await pool.end();
    }
}

testStoredProcedure();
