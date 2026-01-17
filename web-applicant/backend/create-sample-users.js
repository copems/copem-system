import mariadb from 'mariadb';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    bigIntAsNumber: true
});

// Sample users to create
const sampleUsers = [
    {
        username: 'applicant1',
        password: 'password123',
        accountType: 3  // permit_applicant
    },
    {
        username: 'applicant2',
        password: 'password123',
        accountType: 3  // permit_applicant
    },
    {
        username: 'official1',
        password: 'admin123',
        accountType: 2  // building_official
    },
    {
        username: 'admin',
        password: 'admin123',
        accountType: 1  // super_admin
    }
];

async function createSampleUsers() {
    let conn;
    
    try {
        console.log('\n👥 Creating Sample Users...');
        console.log(`Database: ${process.env.DB_NAME}@${process.env.DB_HOST}`);
        console.log('='.repeat(60));
        
        conn = await pool.getConnection();
        
        let successCount = 0;
        let errorCount = 0;
        
        for (const user of sampleUsers) {
            try {
                // Hash the password
                const passwordHash = await bcrypt.hash(user.password, 10);
                
                // Insert user directly into user_account table
                const result = await conn.query(
                    `INSERT INTO user_account (username, user_password, account_type) VALUES (?, ?, ?)`,
                    [user.username, passwordHash, user.accountType]
                );
                
                const accountTypeLabel = user.accountType === 1 ? 'super_admin' : 
                                       user.accountType === 2 ? 'building_official' : 'permit_applicant';
                
                console.log(`✅ Created user: ${user.username} (${accountTypeLabel})`);
                console.log(`   ID: ${result.insertId}`);
                
                successCount++;
            } catch (error) {
                errorCount++;
                console.error(`❌ Failed to create user: ${user.username}`);
                console.error(`   Error: ${error.message}`);
            }
        }
        
        console.log('\n' + '='.repeat(60));
        console.log('📊 Summary');
        console.log('='.repeat(60));
        console.log(`Users created: ${successCount}`);
        console.log(`Errors: ${errorCount}`);
        console.log('='.repeat(60));
        
        if (successCount > 0) {
            console.log('\n📝 Sample User Credentials:');
            console.log('='.repeat(60));
            console.log('Permit Applicants (account_type: 3):');
            console.log('  Username: applicant1 | Password: password123');
            console.log('  Username: applicant2 | Password: password123');
            console.log('\nBuilding Official (account_type: 2):');
            console.log('  Username: official1  | Password: admin123');
            console.log('\nSuper Admin (account_type: 1):');
            console.log('  Username: admin      | Password: admin123');
            console.log('='.repeat(60));
        }
        
    } catch (error) {
        console.error('\n❌ Failed to create sample users:');
        console.error(error);
        process.exit(1);
    } finally {
        if (conn) await conn.release();
        await pool.end();
    }
}

// Run the script
createSampleUsers().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
