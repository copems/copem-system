import pool from './config/database.js';

async function recreateAuthStoredProcs() {
    let conn;
    try {
        conn = await pool.getConnection();
        
        console.log('Recreating authentication stored procedures...');
        
        // Drop old procedures
        await conn.query('DROP PROCEDURE IF EXISTS sp_AuthenticateUser');
        await conn.query('DROP PROCEDURE IF EXISTS sp_RegisterUser');
        console.log('✓ Dropped old procedures');
        
        // Create sp_AuthenticateUser
        const createAuthProc = `
CREATE PROCEDURE sp_AuthenticateUser(
    IN p_username VARCHAR(100)
)
BEGIN
    SELECT 
        user_id,
        username,
        user_password,
        account_type,
        first_name,
        last_name
    FROM user_account
    WHERE username = p_username;
END`;
        
        await conn.query(createAuthProc);
        console.log('✓ Created sp_AuthenticateUser');
        
        // Create sp_RegisterUser
        const createRegisterProc = `
CREATE PROCEDURE sp_RegisterUser(
    IN p_username VARCHAR(100),
    IN p_password_hash VARCHAR(255),
    IN p_email VARCHAR(100),
    IN p_account_type VARCHAR(50),
    IN p_first_name VARCHAR(100),
    IN p_last_name VARCHAR(100)
)
BEGIN
    DECLARE v_user_exists INT;
    
    SELECT COUNT(*) INTO v_user_exists 
    FROM user_account 
    WHERE username = p_username;
    
    IF v_user_exists > 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Username already exists';
    END IF;
    
    INSERT INTO user_account (username, user_password, account_type, first_name, last_name)
    VALUES (p_username, p_password_hash, p_account_type, p_first_name, p_last_name);
    
    SELECT LAST_INSERT_ID() as user_id, p_username as username, p_account_type as account_type, p_first_name as first_name, p_last_name as last_name;
END`;
        
        await conn.query(createRegisterProc);
        console.log('✓ Created sp_RegisterUser');
        
        console.log('\n✅ Stored procedures recreated successfully!');
        
    } catch (error) {
        console.error('Database error:', error);
    } finally {
        if (conn) conn.release();
        await pool.end();
    }
}

recreateAuthStoredProcs();
