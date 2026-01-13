import mariadb from 'mariadb';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

async function createApplicantAccounts() {
    const pool = mariadb.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME || 'copems'
    });

    let conn;
    try {
        conn = await pool.getConnection();
        
        console.log('Creating test applicant accounts...\n');
        
        // Define test applicants
        const applicants = [
            {
                username: 'applicant1@test.com',
                password: 'Test123!',
                accountType: 3 // 3 = applicant
            },
            {
                username: 'applicant2@test.com',
                password: 'Test123!',
                accountType: 3 // 3 = applicant
            },
            {
                username: 'applicant3@test.com',
                password: 'Test123!',
                accountType: 3 // 3 = applicant
            },
            {
                username: 'john.doe@example.com',
                password: 'Password123!',
                accountType: 3 // 3 = applicant
            },
            {
                username: 'jane.smith@example.com',
                password: 'Password123!',
                accountType: 3 // 3 = applicant
            }
        ];
        
        for (const applicant of applicants) {
            try {
                // Hash the password
                const hashedPassword = await bcrypt.hash(applicant.password, 10);
                
                // Check if user already exists
                const existing = await conn.query(
                    'SELECT user_id FROM user_account WHERE username = ?',
                    [applicant.username]
                );
                
                if (existing.length > 0) {
                    // Update existing user
                    await conn.query(
                        'UPDATE user_account SET user_password = ?, account_type = ?, is_active = 1 WHERE username = ?',
                        [hashedPassword, applicant.accountType, applicant.username]
                    );
                    console.log(`✓ Updated existing account: ${applicant.username}`);
                } else {
                    // Create new user
                    await conn.query(
                        'INSERT INTO user_account (username, user_password, account_type, is_active) VALUES (?, ?, ?, 1)',
                        [applicant.username, hashedPassword, applicant.accountType]
                    );
                    console.log(`✓ Created new account: ${applicant.username}`);
                }
                
                console.log(`  Password: ${applicant.password}`);
                console.log(`  Account Type: ${applicant.accountType} (applicant)\n`);
                
            } catch (error) {
                console.error(`✗ Error processing ${applicant.username}:`, error.message);
            }
        }
        
        console.log('\n=== Test Applicant Accounts Summary ===');
        console.log('All accounts use account_type: 3 (applicant)');
        console.log('\nCredentials:');
        console.log('1. applicant1@test.com / Test123!');
        console.log('2. applicant2@test.com / Test123!');
        console.log('3. applicant3@test.com / Test123!');
        console.log('4. john.doe@example.com / Password123!');
        console.log('5. jane.smith@example.com / Password123!');
        console.log('\n✅ All test applicant accounts are ready!');
        
    } catch (error) {
        console.error('Database error:', error.message);
    } finally {
        if (conn) conn.release();
        await pool.end();
    }
}

createApplicantAccounts();
