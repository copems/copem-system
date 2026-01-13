import pool from './config/database.js';
import AuthService from './gb_services/AuthService.js';

async function testLogin() {
    try {
        console.log('Testing login...');
        
        const result = await AuthService.login(
            'test@example.com',
            'password123',
            '127.0.0.1',
            'Test Agent'
        );
        
        console.log('✓ Login successful!');
        console.log('Result:', JSON.stringify(result, null, 2));
        
    } catch (error) {
        console.error('✗ Login failed:', error.message);
    } finally {
        await pool.end();
    }
}

testLogin();
