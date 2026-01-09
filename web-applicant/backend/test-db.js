import pool from './config/database.js';

async function testDatabase() {
    let conn;
    try {
        console.log('Getting connection...');
        conn = await pool.getConnection();
        console.log('Connected!');
        
        // Test if stored procedure exists
        console.log('\nChecking if stored procedure exists...');
        const procedures = await conn.query(
            "SHOW PROCEDURE STATUS WHERE Db = 'copems' AND Name = 'sp_GetUserAccountByUsername'"
        );
        console.log('Procedures found:', procedures);
        
        // Try to call the stored procedure with a test username
        console.log('\nTrying to call stored procedure...');
        try {
            const result = await conn.query('CALL sp_GetUserAccountByUsername(?)', ['test@example.com']);
            console.log('Result:', result);
        } catch (procError) {
            console.error('Error calling procedure:', procError.message);
        }
        
    } catch (error) {
        console.error('Database error:', error);
        console.error('Error details:', error.message);
    } finally {
        if (conn) {
            conn.release();
            console.log('Connection released');
        }
        await pool.end();
    }
}

testDatabase();
