import mariadb from 'mariadb';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runAuthSetup() {
    const pool = mariadb.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME || 'copems',
        multipleStatements: false
    });

    let conn;
    try {
        console.log('Connecting to database...');
        conn = await pool.getConnection();
        console.log('Connected!');

        const sqlFile = path.join(__dirname, 'SQLs', 'AUTH_CREATE_TABLES.sql');
        console.log('Reading SQL file:', sqlFile);
        
        let sql = fs.readFileSync(sqlFile, 'utf8');
        
        // Remove DELIMITER commands
        sql = sql.replace(/DELIMITER \/\//g, '');
        sql = sql.replace(/DELIMITER ;/g, '');
        // Replace // at end of DROP PROCEDURE lines
        sql = sql.replace(/(DROP PROCEDURE IF EXISTS \w+)\/\//g, '$1;');
        
        // Parse statements carefully
        const statements = [];
        let currentStatement = '';
        let inProcedure = false;
        
        const lines = sql.split('\n');
        for (const line of lines) {
            const trimmed = line.trim();
            
            // Skip empty lines and comments
            if (!trimmed || trimmed.startsWith('--')) {
                continue;
            }
            
            // Check if we're starting a procedure
            if (trimmed.match(/^CREATE\s+PROCEDURE/i)) {
                inProcedure = true;
            }
            
            currentStatement += line + '\n';
            
            // Check for statement end
            if (inProcedure) {
                // Look for END; or END// for procedures
                if (trimmed.match(/^END[;\/]/i)) {
                    // Remove trailing // if present
                    statements.push(currentStatement.trim().replace(/\/\/\s*$/, ';'));
                    currentStatement = '';
                    inProcedure = false;
                }
            } else {
                // Regular statement ends with ;
                if (trimmed.endsWith(';') || trimmed.endsWith('//')) {
                    // Remove trailing // if present
                    statements.push(currentStatement.trim().replace(/\/\/\s*$/, ';'));
                    currentStatement = '';
                }
            }
        }
        
        if (currentStatement.trim()) {
            statements.push(currentStatement.trim());
        }
        
        console.log(`Executing ${statements.length} SQL statements...`);
        
        // Disable foreign key checks temporarily
        await conn.query('SET FOREIGN_KEY_CHECKS = 0');
        
        for (let i = 0; i < statements.length; i++) {
            const stmt = statements[i];
            if (stmt) {
                try {
                    await conn.query(stmt);
                    if (stmt.includes('CREATE PROCEDURE')) {
                        const procName = stmt.match(/CREATE PROCEDURE\s+(\w+)/i)?.[1];
                        console.log(`✓ Created procedure: ${procName || 'unknown'}`);
                    } else if (stmt.includes('CREATE TABLE')) {
                        const tableName = stmt.match(/CREATE TABLE\s+(\w+)/i)?.[1];
                        console.log(`✓ Created table: ${tableName || 'unknown'}`);
                    }
                } catch (error) {
                    if (stmt.length > 100) {
                        console.error(`Error executing statement ${i + 1}: ${stmt.substring(0, 100)}...`);
                    } else {
                        console.error(`Error executing statement ${i + 1}: ${stmt}`);
                    }
                    throw error;
                }
            }
        }
        
        // Re-enable foreign key checks
        await conn.query('SET FOREIGN_KEY_CHECKS = 1');
        
        console.log('\n✅ Authentication tables and stored procedures created successfully!');
    } catch (error) {
        console.error('\n❌ Error:', error.message);
    } finally {
        if (conn) {
            conn.release();
            console.log('Connection released');
        }
        await pool.end();
    }
}

runAuthSetup();
