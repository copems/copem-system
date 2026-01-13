import pool from './config/database.js';
import bcrypt from 'bcryptjs';

async function fixExistingUsers() {
    let conn;
    try {
        conn = await pool.getConnection();
        
        console.log('Updating existing users with hashed passwords...');
        
        const users = [
            { username: 'test@example.com', password: 'password123' },
            { username: 'applicant.name@email.com', password: 'password' }
        ];
        
        for (const user of users) {
            try {
                // Hash the password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(user.password, salt);
                
                // Update the user's password
                const result = await conn.query(
                    "UPDATE User_Account SET user_password = ? WHERE username = ?",
                    [hashedPassword, user.username]
                );
                
                if (result.affectedRows > 0) {
                    console.log(`✓ Updated password for: ${user.username}`);
                } else {
                    console.log(`✗ User not found: ${user.username}`);
                }
            } catch (error) {
                console.error(`✗ Error updating ${user.username}:`, error.message);
            }
        }
        
        console.log('\nPassword update complete!');
        
    } catch (error) {
        console.error('Database error:', error);
    } finally {
        if (conn) conn.release();
        await pool.end();
    }
}

fixExistingUsers();
