import mariadb from 'mariadb';
import dotenv from 'dotenv';

dotenv.config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    multipleStatements: true,
    bigIntAsNumber: true
});

async function resetDatabase() {
    let conn;
    
    try {
        console.log('\n🔄 Starting Database Reset...');
        console.log(`Database: ${process.env.DB_NAME}@${process.env.DB_HOST}`);
        console.log('='.repeat(60));
        
        conn = await pool.getConnection();
        
        // Disable foreign key checks temporarily
        await conn.query('SET FOREIGN_KEY_CHECKS = 0');
        console.log('✅ Foreign key checks disabled');
        
        // Drop all tables
        console.log('\n🗑️  Dropping all tables...');
        const tables = await conn.query('SHOW TABLES');
        let droppedTables = 0;
        
        for (const table of tables) {
            const tableName = Object.values(table)[0];
            try {
                await conn.query(`DROP TABLE IF EXISTS ${tableName}`);
                console.log(`  ✅ Dropped table: ${tableName}`);
                droppedTables++;
            } catch (error) {
                console.error(`  ❌ Failed to drop table ${tableName}: ${error.message}`);
            }
        }
        
        // Drop all stored procedures
        console.log('\n🗑️  Dropping all stored procedures...');
        const procedures = await conn.query(`SHOW PROCEDURE STATUS WHERE Db = '${process.env.DB_NAME}'`);
        let droppedProcedures = 0;
        
        for (const proc of procedures) {
            try {
                await conn.query(`DROP PROCEDURE IF EXISTS ${proc.Name}`);
                console.log(`  ✅ Dropped procedure: ${proc.Name}`);
                droppedProcedures++;
            } catch (error) {
                console.error(`  ❌ Failed to drop procedure ${proc.Name}: ${error.message}`);
            }
        }
        
        // Re-enable foreign key checks
        await conn.query('SET FOREIGN_KEY_CHECKS = 1');
        console.log('\n✅ Foreign key checks re-enabled');
        
        console.log('\n' + '='.repeat(60));
        console.log('📊 Reset Summary');
        console.log('='.repeat(60));
        console.log(`Tables dropped: ${droppedTables}`);
        console.log(`Procedures dropped: ${droppedProcedures}`);
        console.log('Status: ✅ DATABASE RESET COMPLETE');
        console.log('='.repeat(60));
        console.log('\n💡 Run "npm run migrate" to restore tables and procedures\n');
        
    } catch (error) {
        console.error('\n❌ Database reset failed:');
        console.error(error);
        process.exit(1);
    } finally {
        if (conn) {
            await conn.release();
        }
        await pool.end();
    }
}

// Run reset
resetDatabase().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
