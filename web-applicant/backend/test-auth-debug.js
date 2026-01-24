import 'dotenv/config';
import pool from './config/database.js';
import bcrypt from 'bcryptjs';

async function testAuth() {
    let conn;
    try {
        conn = await pool.getConnection();
        
        // Test stored procedure directly
        console.log('Testing sp_AuthenticateUser...');
        const rows = await conn.query('CALL sp_AuthenticateUser(?)', ['app.permit@gmail.com']);
        console.log('Result:', JSON.stringify(rows[0], null, 2));
        
        if (rows[0] && rows[0].length > 0) {
            const user = rows[0][0];
            console.log('\nUser found:', user.username);
            console.log('Password hash:', user.user_password);
            
            // Test password comparison
            const isValid = await bcrypt.compare('test123', user.user_password);
            console.log('Password "test123" valid:', isValid);
        } else {
            console.log('No user found');
        }
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        if (conn) conn.release();
        await pool.end();
    }
}

testAuth();
