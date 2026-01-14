import mariadb from 'mariadb';
import dotenv from 'dotenv';
dotenv.config();

async function migrateAddNames() {
  const pool = mariadb.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'copems'
  });

  let conn;
  try {
    conn = await pool.getConnection();
    console.log('Adding first_name and last_name columns to user_account...');
    await conn.query(`ALTER TABLE user_account ADD COLUMN first_name VARCHAR(100) NOT NULL DEFAULT ''`);
    await conn.query(`ALTER TABLE user_account ADD COLUMN last_name VARCHAR(100) NOT NULL DEFAULT ''`);
    console.log('✓ Columns added successfully!');
    // Optionally, update existing users with placeholder names
    await conn.query(`UPDATE user_account SET first_name = 'Test', last_name = 'User' WHERE first_name = '' OR last_name = ''`);
    console.log('✓ Existing users updated with placeholder names.');
  } catch (error) {
    console.error('Migration error:', error.message);
  } finally {
    if (conn) conn.release();
    await pool.end();
  }
}

migrateAddNames();
