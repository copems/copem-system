import pool from './config/database.js';
import fs from 'fs/promises';

async function recreateStoredProc() {
    let conn;
    try {
        conn = await pool.getConnection();
        
        console.log('Recreating sp_AuthenticateUser stored procedure...');
        
        // Drop the old procedure
        await conn.query('DROP PROCEDURE IF EXISTS sp_AuthenticateUser');
        console.log('✓ Dropped old procedure');
        
        // Create new procedure
        const createProc = `
CREATE PROCEDURE sp_AuthenticateUser(
    IN p_username VARCHAR(100)
)
BEGIN
    SELECT 
        user_id,
        username,
        user_password,
        account_type
    FROM user_account
    WHERE username = p_username;
END`;
        
        await conn.query(createProc);
        console.log('✓ Created new procedure');
        
        console.log('\nStored procedure updated successfully!');
        
    } catch (error) {
        console.error('Database error:', error);
    } finally {
        if (conn) conn.release();
        await pool.end();
    }
}

recreateStoredProc();
