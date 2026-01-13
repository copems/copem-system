import mariadb from 'mariadb';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Migration script to refactor account_type to use numeric values:
 * 0 - admin
 * 1 - evaluator
 * 2 - inspector
 * 3 - applicant
 */
async function migrateAccountTypeToNumeric() {
    const pool = mariadb.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME || 'copems'
    });

    let conn;
    try {
        conn = await pool.getConnection();
        console.log('🚀 Starting account_type migration to numeric values...\n');
        
        // Step 1: Alter the account_type column to INTEGER
        console.log('📋 Step 1: Altering user_account table to use INTEGER for account_type...');
        
        await conn.query(`
            ALTER TABLE user_account 
            MODIFY COLUMN account_type INTEGER DEFAULT 3
        `);
        
        console.log('✅ Table altered successfully\n');
        
        // Step 2: Update existing users - map old role names to numeric values
        console.log('📋 Step 2: Updating existing user account types...\n');
        
        // Map 'super_admin' or 'admin' -> 0
        const adminResult = await conn.query(`
            UPDATE user_account 
            SET account_type = 0 
            WHERE account_type = 'super_admin' 
               OR account_type = 'admin'
               OR account_type = 'building_official'
        `);
        console.log(`✅ Updated ${adminResult.affectedRows} admin accounts (account_type = 0)`);
        
        // Map 'evaluator' -> 1
        const evaluatorResult = await conn.query(`
            UPDATE user_account 
            SET account_type = 1 
            WHERE account_type = 'evaluator'
        `);
        console.log(`✅ Updated ${evaluatorResult.affectedRows} evaluator accounts (account_type = 1)`);
        
        // Map 'inspector' -> 2
        const inspectorResult = await conn.query(`
            UPDATE user_account 
            SET account_type = 2 
            WHERE account_type = 'inspector'
        `);
        console.log(`✅ Updated ${inspectorResult.affectedRows} inspector accounts (account_type = 2)`);
        
        // Map 'permit_applicant' or 'applicant' -> 3
        const applicantResult = await conn.query(`
            UPDATE user_account 
            SET account_type = 3 
            WHERE account_type = 'permit_applicant' 
               OR account_type = 'applicant'
               OR account_type = '1'
               OR account_type = '2'
        `);
        console.log(`✅ Updated ${applicantResult.affectedRows} applicant accounts (account_type = 3)`);
        
        // Step 3: Verify migration
        console.log('\n📋 Step 3: Verifying migration...\n');
        const counts = await conn.query(`
            SELECT 
                account_type,
                COUNT(*) as count,
                CASE 
                    WHEN account_type = 0 THEN 'admin'
                    WHEN account_type = 1 THEN 'evaluator'
                    WHEN account_type = 2 THEN 'inspector'
                    WHEN account_type = 3 THEN 'applicant'
                    ELSE 'unknown'
                END as role_name
            FROM user_account
            GROUP BY account_type
            ORDER BY account_type
        `);
        
        console.log('Current account type distribution:');
        counts.forEach(row => {
            console.log(`  ${row.account_type} (${row.role_name}): ${row.count} users`);
        });
        
        console.log('\n✅ Migration completed successfully!');
        console.log('\n📝 Account type mapping:');
        console.log('  0 - admin');
        console.log('  1 - evaluator');
        console.log('  2 - inspector');
        console.log('  3 - applicant');
        
    } catch (error) {
        console.error('❌ Error during migration:', error.message);
        console.error(error);
        throw error;
    } finally {
        if (conn) conn.release();
        await pool.end();
    }
}

// Run migration
migrateAccountTypeToNumeric().catch(err => {
    console.error('Migration failed:', err);
    process.exit(1);
});
