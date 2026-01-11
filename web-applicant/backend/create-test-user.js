import pool from './config/database.js';

async function createTestUser() {
    let conn;
    try {
        conn = await pool.getConnection();
        
        // Insert test users
        console.log('Creating test users...');
        
        const users = [
            { username: 'test@example.com', password: 'password123', accountType: 1 },
            { username: 'applicant.name@email.com', password: 'password', accountType: 1 }
        ];
        
        for (const user of users) {
            try {
                const result = await conn.query(
                    "INSERT INTO User_Account (username, user_password, account_type, is_active) VALUES (?, ?, ?, ?)",
                    [user.username, user.password, user.accountType, true]
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
