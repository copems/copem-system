import pool from './config/database.js';
import bcrypt from 'bcryptjs';

async function createTestUser() {
    let conn;
    try {
        conn = await pool.getConnection();
        
        // Insert test users
        console.log('Creating test users...');
        
        const users = [
            { username: 'test@example.com', password: 'password123', accountType: 3 }, // 3 = applicant
            { username: 'applicant.name@email.com', password: 'password', accountType: 3 } // 3 = applicant
        ];
        
        for (const user of users) {
            try {
                // Hash the password before storing
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(user.password, salt);
                
                const result = await conn.query(
                    "INSERT INTO User_Account (username, user_password, account_type, is_active) VALUES (?, ?, ?, ?)",
                    [user.username, hashedPassword, user.accountType, true]
                );
                console.log(`✓ Created user: ${user.username} with password: ${user.password}`);
            } catch (error) {
                if (error.code === 'ER_DUP_ENTRY') {
                    console.log(`✓ User already exists: ${user.username}`);
                } else {
                    console.error(`✗ Error creating ${user.username}:`, error.message);
                }
            }
        }
        
        console.log('\nTest users ready!');
        
    } catch (error) {
        console.error('Database error:', error);
    } finally {
        if (conn) conn.release();
        await pool.end();
    }
}

createTestUser();
