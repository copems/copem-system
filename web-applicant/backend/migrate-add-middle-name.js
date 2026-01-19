import mariadb from 'mariadb';
import dotenv from 'dotenv';
dotenv.config();

async function migrateAddMiddleName() {
  const pool = mariadb.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'copems'
  });

  let conn;
  try {
    conn = await pool.getConnection();
    console.log('Adding middle_name column to user_account...');
    
    // Add middle_name column after first_name
    await conn.query(`ALTER TABLE user_account ADD COLUMN middle_name VARCHAR(100) NOT NULL DEFAULT '' AFTER first_name`);
    console.log('✓ middle_name column added successfully!');
    
  } catch (error) {
    if (error.message.includes("Duplicate column name 'middle_name'")) {
      console.log('ℹ middle_name column already exists, skipping...');
    } else {
      console.error('Migration error:', error.message);
    }
  } finally {
    if (conn) conn.release();
    await pool.end();
  }
}

migrateAddMiddleName();
