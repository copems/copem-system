import pool from './config/database.js';

async function setup() {
    let conn;
    try {
        conn = await pool.getConnection();
        
        // Create test user
        console.log('Creating test user...');
        try {
            await conn.query(
                `INSERT INTO User_Account (username, user_password, account_type, is_active) 
                 VALUES ('test@example.com', 'password123', 3, 1)` // 3 = applicant
            );
            console.log('✓ Test user created');
            console.log('  Username: test@example.com');
            console.log('  Password: password123');
        } catch (e) {
            if (e.code === 'ER_DUP_ENTRY') {
                console.log('✓ Test user already exists');
            } else {
                throw e;
            }
        }
        
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        if (conn) conn.release();
        await pool.end();
    }
}

setup();
