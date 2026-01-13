import mariadb from 'mariadb';
import dotenv from 'dotenv';

dotenv.config();

async function testAuth() {
    const pool = mariadb.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME || 'copems'
    });

    let conn;
    try {
        conn = await pool.getConnection();
        
        console.log('Testing sp_AuthenticateUser with test@example.com:');
        const result = await conn.query('CALL sp_AuthenticateUser(?)', ['test@example.com']);
        console.log('Result:', result[0]);
        
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        if (conn) conn.release();
        await pool.end();
    }
}

testAuth();
