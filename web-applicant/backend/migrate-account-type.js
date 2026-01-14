import mariadb from 'mariadb';
import dotenv from 'dotenv';

dotenv.config();

async function migrateAccountType() {
    const pool = mariadb.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME || 'copems'
    });

    let conn;
    try {
        conn = await pool.getConnection();
        
        console.log('Altering user_account table to use VARCHAR for account_type...');
        
        // Alter the account_type column to VARCHAR
        await conn.query(`
            ALTER TABLE user_account 
            MODIFY COLUMN account_type VARCHAR(50) DEFAULT 'permit_applicant'
        `);
        
        console.log('✓ Table altered successfully');
        
        // Update existing users - map old int values to role names
        console.log('Updating existing user roles...');
        await conn.query(`
            UPDATE user_account 
            SET account_type = 'permit_applicant' 
            WHERE account_type = '1' OR account_type = 1
        `);
        
        await conn.query(`
            UPDATE user_account 
            SET account_type = 'building_official' 
            WHERE account_type = '2' OR account_type = 2
        `);
        
        console.log('✓ Migration completed successfully!');
        
    } catch (error) {
        console.error('Error:', error.message);
        console.error(error);
    } finally {
        if (conn) conn.release();
        await pool.end();
    }
}

migrateAccountType();
