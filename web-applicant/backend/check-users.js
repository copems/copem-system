import pool from './config/database.js';

async function checkUsers() {
    let conn;
    try {
        conn = await pool.getConnection();
        
        // Check if there are any users
        const users = await conn.query('SELECT user_id, username, account_type, is_active FROM User_Account LIMIT 5');
        console.log('Users in database:', users);
        console.log('Number of users:', users.length);
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        if (conn) conn.release();
        await pool.end();
    }
}

checkUsers();
