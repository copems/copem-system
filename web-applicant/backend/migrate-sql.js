import mariadb from 'mariadb';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    multipleStatements: true,  // Allow multiple SQL statements
    bigIntAsNumber: true
});

// SQL files in the correct execution order
const sqlFiles = [
    'GB_PROVINCE_STORED_PROCEDURES.sql',
    'GB_CITYMUN_STORED_PROCEDURES.sql',
    'GB_BARANGAY_STORED_PROCEDURES.sql',
    'BPA_CREATE_TABLES.sql',
    'AUTH_CREATE_TABLES.sql',
    'BPA_STORED_PROCEDURES.sql'
];

async function executeSqlFile(conn, filePath) {
    const fileName = path.basename(filePath);
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Executing: ${fileName}`);
    console.log('='.repeat(60));
    
    try {
        let sqlContent = fs.readFileSync(filePath, 'utf8');
        
        // Remove comments
        sqlContent = sqlContent.replace(/--.*$/gm, '');
        
        // Handle DELIMITER changes for stored procedures
        let currentDelimiter = ';';
        const statements = [];
        let buffer = '';
        
        const lines = sqlContent.split('\n');
        
        for (let line of lines) {
            line = line.trim();
            
            // Check for DELIMITER change
            if (line.match(/^DELIMITER\s+(.+)$/i)) {
                const match = line.match(/^DELIMITER\s+(.+)$/i);
                currentDelimiter = match[1].trim();
                continue;
            }
            
            buffer += line + '\n';
            
            // Check if we hit the current delimiter
            if (line.endsWith(currentDelimiter)) {
                // Remove the delimiter from the end
                buffer = buffer.substring(0, buffer.length - currentDelimiter.length - 1).trim();
                
                if (buffer.length > 0) {
                    statements.push(buffer);
                }
                buffer = '';
            }
        }
        
        // Add any remaining buffer
        if (buffer.trim().length > 0) {
            statements.push(buffer.trim());
        }

        let successCount = 0;
        let errorCount = 0;

        for (const statement of statements) {
            const trimmed = statement.trim();
            if (!trimmed) continue;
            
            try {
                await conn.query(trimmed);
                successCount++;
                
                // Show what was executed (truncated)
                const preview = trimmed.substring(0, 80).replace(/\n/g, ' ');
                console.log(`  ✅ ${preview}...`);
            } catch (error) {
                errorCount++;
                const preview = trimmed.substring(0, 100).replace(/\n/g, ' ');
                console.error(`  ❌ Error: ${error.message}`);
                console.error(`     Statement: ${preview}...`);
                
                // For debugging - show full statement if needed
                // console.error(`     Full statement:\n${trimmed}`);
            }
        }

        console.log(`\n  📊 ${fileName}: ${successCount} succeeded, ${errorCount} failed`);
        
        return { success: successCount, errors: errorCount };
    } catch (error) {
        console.error(`  ❌ Failed to read or execute ${fileName}:`);
        console.error(`     ${error.message}`);
        return { success: 0, errors: 1 };
    }
}

async function migrate() {
    let conn;
    
    try {
        console.log('\n🚀 Starting SQL Migration...');
        console.log(`Database: ${process.env.DB_NAME}@${process.env.DB_HOST}`);
        
        conn = await pool.getConnection();
        console.log('✅ Database connection established\n');

        let totalSuccess = 0;
        let totalErrors = 0;

        for (const sqlFile of sqlFiles) {
            const filePath = path.join(__dirname, 'SQLs', sqlFile);
            
            if (!fs.existsSync(filePath)) {
                console.log(`⚠️  File not found: ${sqlFile} - Skipping...`);
                continue;
            }

            const result = await executeSqlFile(conn, filePath);
            totalSuccess += result.success;
            totalErrors += result.errors;
        }

        console.log(`\n${'='.repeat(60)}`);
        console.log('📊 Migration Summary');
        console.log('='.repeat(60));
        console.log(`Total statements executed: ${totalSuccess}`);
        console.log(`Total errors: ${totalErrors}`);
        console.log(`Status: ${totalErrors === 0 ? '✅ SUCCESS' : '⚠️  COMPLETED WITH ERRORS'}`);
        console.log('='.repeat(60));

    } catch (error) {
        console.error('\n❌ Migration failed:');
        console.error(error);
        process.exit(1);
    } finally {
        if (conn) {
            await conn.release();
        }
        await pool.end();
    }
}

// Run migration
migrate().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
