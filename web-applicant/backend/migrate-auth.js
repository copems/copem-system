import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import pool from './config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function migratAuthTables() {
    console.log('🚀 Starting authentication tables migration...\n');
    
    let conn;
    try {
        // Read SQL file
        const sqlPath = join(__dirname, 'SQLs', 'AUTH_CREATE_TABLES.sql');
        console.log(`📄 Reading SQL file: ${sqlPath}`);
        const sql = readFileSync(sqlPath, 'utf8');
        
        // Get connection
        conn = await pool.getConnection();
        console.log('✅ Database connection established\n');
        
        // Split SQL into individual statements
        // Remove comments and split by semicolons
        const statements = sql
            .split('\n')
            .filter(line => !line.trim().startsWith('--'))
            .join('\n')
            .split(';')
            .map(stmt => stmt.trim())
            .filter(stmt => stmt.length > 0 && !stmt.match(/^(DELIMITER|delimiter)/i));
        
        console.log(`📝 Found ${statements.length} SQL statements to execute\n`);
        
        // Execute each statement
        let successCount = 0;
        let errorCount = 0;
        
        for (let i = 0; i < statements.length; i++) {
            const statement = statements[i];
            
            // Skip DELIMITER statements
            if (statement.match(/^(DELIMITER|delimiter)/i)) {
                continue;
            }
            
            try {
                // Show progress
                const preview = statement.substring(0, 60).replace(/\s+/g, ' ');
                console.log(`[${i + 1}/${statements.length}] Executing: ${preview}...`);
                
                await conn.query(statement);
                successCount++;
                console.log(`✅ Success\n`);
            } catch (error) {
                errorCount++;
                console.error(`❌ Error executing statement ${i + 1}:`);
                console.error(`   ${error.message}\n`);
                
                // Continue with next statement instead of stopping
                if (error.message.includes('already exists') || 
                    error.message.includes('Unknown table')) {
                    console.log('   (Skipping - likely already exists)\n');
                } else {
                    console.log('   Statement:', statement.substring(0, 100), '...\n');
                }
            }
        }
        
        console.log('\n' + '='.repeat(60));
        console.log('📊 Migration Summary:');
        console.log('='.repeat(60));
        console.log(`✅ Successful: ${successCount}`);
        console.log(`❌ Errors: ${errorCount}`);
        console.log(`📝 Total: ${statements.length}`);
        console.log('='.repeat(60));
        
        // Verify tables were created
        console.log('\n🔍 Verifying created tables...\n');
        
        const tables = await conn.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'copems' 
            AND table_name IN ('user_roles', 'user_sessions', 'refresh_tokens')
        `);
        
        if (tables && tables.length > 0) {
            console.log('✅ Authentication tables created:');
            tables.forEach(table => {
                console.log(`   - ${table.table_name || table.TABLE_NAME}`);
            });
        }
        
        // Verify roles were inserted
        console.log('\n🔍 Verifying user roles...\n');
        const roles = await conn.query('SELECT * FROM user_roles');
        
        if (roles && roles.length > 0) {
            console.log('✅ User roles created:');
            roles.forEach(role => {
                console.log(`   - ${role.role_name}: ${role.role_description}`);
            });
        }
        
        // Verify stored procedures
        console.log('\n🔍 Verifying stored procedures...\n');
        const procedures = await conn.query(`
            SELECT routine_name 
            FROM information_schema.routines 
            WHERE routine_schema = 'copems' 
            AND routine_type = 'PROCEDURE'
            AND routine_name LIKE 'sp_%Auth%'
            OR routine_name LIKE 'sp_%User%'
            OR routine_name LIKE 'sp_%Session%'
            OR routine_name LIKE 'sp_%Token%'
            OR routine_name LIKE 'sp_Register%'
        `);
        
        if (procedures && procedures.length > 0) {
            console.log('✅ Authentication stored procedures created:');
            procedures.forEach(proc => {
                console.log(`   - ${proc.routine_name || proc.ROUTINE_NAME}`);
            });
        }
        
        console.log('\n✨ Migration completed successfully!\n');
        
    } catch (error) {
        console.error('\n❌ Migration failed:');
        console.error(error);
        process.exit(1);
    } finally {
        if (conn) {
            await conn.release();
            console.log('🔌 Database connection closed');
        }
        process.exit(0);
    }
}

// Run migration
migratAuthTables();
