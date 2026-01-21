import mariadb from 'mariadb';
import dotenv from 'dotenv';

dotenv.config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    bigIntAsNumber: true
});

async function verify() {
    let conn;
    
    try {
        conn = await pool.getConnection();
        
        // Check tables
        console.log('\n📋 Database Tables:');
        console.log('='.repeat(60));
        const tables = await conn.query('SHOW TABLES');
        tables.forEach((table, index) => {
            console.log(`${index + 1}. ${Object.values(table)[0]}`);
        });
        
        // Check stored procedures
        console.log('\n⚙️  Stored Procedures:');
        console.log('='.repeat(60));
        const procedures = await conn.query(`SHOW PROCEDURE STATUS WHERE Db = '${process.env.DB_NAME}'`);
        procedures.forEach((proc, index) => {
            console.log(`${index + 1}. ${proc.Name}`);
        });
        
        // Check user roles
        console.log('\n👥 User Roles:');
        console.log('='.repeat(60));
        const roles = await conn.query('SELECT * FROM user_roles');
        roles.forEach(role => {
            console.log(`- ${role.role_name}: ${role.role_description}`);
        });
        
        console.log('\n✅ Migration verification complete!\n');
        
    } catch (error) {
        console.error('\n❌ Verification failed:');
        console.error(error);
    } finally {
        if (conn) await conn.release();
        await pool.end();
    }
}

verify();
