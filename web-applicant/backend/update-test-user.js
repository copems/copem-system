import mariadb from 'mariadb';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

async function updateTestUser() {
    const pool = mariadb.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME || 'copems'
    });

    let conn;
    try {
        conn = await pool.getConnection();
        
        // Hash the password
        const password = 'password123';
        const hashedPassword = await bcrypt.hash(password, 10);
        
        console.log('Updating test user with hashed password and role...');
        
        // Update the existing test user
        await conn.query(
            'UPDATE user_account SET user_password = ?, account_type = ? WHERE username = ?',
            [hashedPassword, 3, 'test@example.com'] // 3 = applicant
        );
        
        console.log('✓ Updated test@example.com');
        console.log('  Username: test@example.com');
        console.log('  Password: password123');
        console.log('  Role: applicant (account_type: 3)');
        
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        if (conn) conn.release();
        await pool.end();
    }
}

updateTestUser();
