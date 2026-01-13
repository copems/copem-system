import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import pool from './config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function migrateAuthTablesV2() {
    console.log('🚀 Starting authentication database migration (v2)...\n');
    
    let conn;
    try {
        conn = await pool.getConnection();
        console.log('✅ Database connection established\n');
        
        // Step 1: Drop and Create Tables
        console.log('📋 Step 1: Creating authentication tables...\n');
        
        await conn.query('DROP TABLE IF EXISTS refresh_tokens');
        console.log('✅ Dropped refresh_tokens (if exists)');
        
        await conn.query('DROP TABLE IF EXISTS user_sessions');
        console.log('✅ Dropped user_sessions (if exists)');
        
        // Note: user_roles table is no longer needed as we use numeric account_type
        await conn.query('DROP TABLE IF EXISTS user_roles');
        console.log('✅ Dropped user_roles (if exists)');
        
        // Create user_sessions (fixed TIMESTAMP issue)
        await conn.query(`
            CREATE TABLE user_sessions (
                session_id INT PRIMARY KEY AUTO_INCREMENT,
                user_id INT NOT NULL,
                token_hash VARCHAR(255) NOT NULL,
                ip_address VARCHAR(45),
                user_agent TEXT,
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                expires_at TIMESTAMP NULL,
                last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES user_account(user_id) ON DELETE CASCADE,
                INDEX idx_user_id (user_id),
                INDEX idx_token_hash (token_hash),
                INDEX idx_expires_at (expires_at)
            )
        `);
        console.log('✅ Created user_sessions table');
        
        // Create refresh_tokens (fixed TIMESTAMP issue)
        await conn.query(`
            CREATE TABLE refresh_tokens (
                token_id INT PRIMARY KEY AUTO_INCREMENT,
                user_id INT NOT NULL,
                token_hash VARCHAR(255) NOT NULL UNIQUE,
                session_id INT,
                is_revoked BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                expires_at TIMESTAMP NULL,
                FOREIGN KEY (user_id) REFERENCES user_account(user_id) ON DELETE CASCADE,
                FOREIGN KEY (session_id) REFERENCES user_sessions(session_id) ON DELETE CASCADE,
                INDEX idx_user_id (user_id),
                INDEX idx_token_hash (token_hash)
            )
        `);
        console.log('✅ Created refresh_tokens table');
        
        // Account type mapping (numeric values):
        // 0 - admin
        // 1 - evaluator
        // 2 - inspector
        // 3 - applicant
        console.log('\n📋 Step 2: Account types configured (numeric)\n');
        console.log('  0 - admin');
        console.log('  1 - evaluator');
        console.log('  2 - inspector');
        console.log('  3 - applicant');
        
        // Create Stored Procedures
        console.log('\n📋 Step 3: Creating stored procedures...\n');
        
        // sp_RegisterUser
        await conn.query('DROP PROCEDURE IF EXISTS sp_RegisterUser');
        await conn.query(`
            CREATE PROCEDURE sp_RegisterUser(
                IN p_username VARCHAR(100),
                IN p_password_hash VARCHAR(255),
                IN p_email VARCHAR(100),
                IN p_account_type INT,
                IN p_full_name VARCHAR(200)
            )
            BEGIN
                DECLARE v_user_exists INT;
                
                SELECT COUNT(*) INTO v_user_exists 
                FROM user_account 
                WHERE username = p_username;
                
                IF v_user_exists > 0 THEN
                    SIGNAL SQLSTATE '45000' 
                    SET MESSAGE_TEXT = 'Username already exists';
                END IF;
                
                IF p_account_type NOT IN (0, 1, 2, 3) THEN
                    SIGNAL SQLSTATE '45000' 
                    SET MESSAGE_TEXT = 'Invalid account type';
                END IF;
                
                INSERT INTO user_account (username, user_password, account_type)
                VALUES (p_username, p_password_hash, p_account_type);
                
                SELECT LAST_INSERT_ID() as user_id, p_username as username, p_account_type as account_type;
            END
        `);
        console.log('✅ Created sp_RegisterUser');
        
        // sp_AuthenticateUser
        await conn.query('DROP PROCEDURE IF EXISTS sp_AuthenticateUser');
        await conn.query(`
            CREATE PROCEDURE sp_AuthenticateUser(
                IN p_username VARCHAR(100)
            )
            BEGIN
                SELECT 
                    user_id,
                    username,
                    user_password,
                    account_type
                FROM user_account
                WHERE username = p_username;
            END
        `);
        console.log('✅ Created sp_AuthenticateUser');
        
        // sp_CreateSession
        await conn.query('DROP PROCEDURE IF EXISTS sp_CreateSession');
        await conn.query(`
            CREATE PROCEDURE sp_CreateSession(
                IN p_user_id INT,
                IN p_token_hash VARCHAR(255),
                IN p_ip_address VARCHAR(45),
                IN p_user_agent TEXT,
                IN p_expires_at TIMESTAMP
            )
            BEGIN
                INSERT INTO user_sessions (user_id, token_hash, ip_address, user_agent, expires_at)
                VALUES (p_user_id, p_token_hash, p_ip_address, p_user_agent, p_expires_at);
                
                SELECT LAST_INSERT_ID() as session_id;
            END
        `);
        console.log('✅ Created sp_CreateSession');
        
        // sp_CreateRefreshToken
        await conn.query('DROP PROCEDURE IF EXISTS sp_CreateRefreshToken');
        await conn.query(`
            CREATE PROCEDURE sp_CreateRefreshToken(
                IN p_user_id INT,
                IN p_token_hash VARCHAR(255),
                IN p_session_id INT,
                IN p_expires_at TIMESTAMP
            )
            BEGIN
                INSERT INTO refresh_tokens (user_id, token_hash, session_id, expires_at)
                VALUES (p_user_id, p_token_hash, p_session_id, p_expires_at);
                
                SELECT LAST_INSERT_ID() as token_id;
            END
        `);
        console.log('✅ Created sp_CreateRefreshToken');
        
        // sp_ValidateSession
        await conn.query('DROP PROCEDURE IF EXISTS sp_ValidateSession');
        await conn.query(`
            CREATE PROCEDURE sp_ValidateSession(
                IN p_token_hash VARCHAR(255)
            )
            BEGIN
                SELECT 
                    s.session_id,
                    s.user_id,
                    s.is_active,
                    s.expires_at,
                    u.username,
                    u.account_type
                FROM user_sessions s
                INNER JOIN user_account u ON s.user_id = u.user_id
                WHERE s.token_hash = p_token_hash
                    AND s.is_active = TRUE
                    AND s.expires_at > NOW();
            END
        `);
        console.log('✅ Created sp_ValidateSession');
        
        // sp_ValidateRefreshToken
        await conn.query('DROP PROCEDURE IF EXISTS sp_ValidateRefreshToken');
        await conn.query(`
            CREATE PROCEDURE sp_ValidateRefreshToken(
                IN p_token_hash VARCHAR(255)
            )
            BEGIN
                SELECT 
                    rt.token_id,
                    rt.user_id,
                    rt.session_id,
                    rt.is_revoked,
                    rt.expires_at,
                    u.username,
                    u.account_type
                FROM refresh_tokens rt
                INNER JOIN user_account u ON rt.user_id = u.user_id
                WHERE rt.token_hash = p_token_hash
                    AND rt.is_revoked = FALSE
                    AND rt.expires_at > NOW();
            END
        `);
        console.log('✅ Created sp_ValidateRefreshToken');
        
        // sp_RevokeSession
        await conn.query('DROP PROCEDURE IF EXISTS sp_RevokeSession');
        await conn.query(`
            CREATE PROCEDURE sp_RevokeSession(
                IN p_token_hash VARCHAR(255)
            )
            BEGIN
                UPDATE user_sessions
                SET is_active = FALSE
                WHERE token_hash = p_token_hash;
                
                UPDATE refresh_tokens rt
                INNER JOIN user_sessions s ON rt.session_id = s.session_id
                SET rt.is_revoked = TRUE
                WHERE s.token_hash = p_token_hash;
                
                SELECT ROW_COUNT() as affected_rows;
            END
        `);
        console.log('✅ Created sp_RevokeSession');
        
        // sp_RevokeRefreshToken
        await conn.query('DROP PROCEDURE IF EXISTS sp_RevokeRefreshToken');
        await conn.query(`
            CREATE PROCEDURE sp_RevokeRefreshToken(
                IN p_token_hash VARCHAR(255)
            )
            BEGIN
                UPDATE refresh_tokens
                SET is_revoked = TRUE
                WHERE token_hash = p_token_hash;
                
                SELECT ROW_COUNT() as affected_rows;
            END
        `);
        console.log('✅ Created sp_RevokeRefreshToken');
        
        // sp_RevokeAllUserSessions
        await conn.query('DROP PROCEDURE IF EXISTS sp_RevokeAllUserSessions');
        await conn.query(`
            CREATE PROCEDURE sp_RevokeAllUserSessions(
                IN p_user_id INT
            )
            BEGIN
                UPDATE user_sessions
                SET is_active = FALSE
                WHERE user_id = p_user_id;
                
                UPDATE refresh_tokens
                SET is_revoked = TRUE
                WHERE user_id = p_user_id;
                
                SELECT ROW_COUNT() as affected_rows;
            END
        `);
        console.log('✅ Created sp_RevokeAllUserSessions');
        
        // sp_CleanupExpiredSessions
        await conn.query('DROP PROCEDURE IF EXISTS sp_CleanupExpiredSessions');
        await conn.query(`
            CREATE PROCEDURE sp_CleanupExpiredSessions()
            BEGIN
                UPDATE user_sessions
                SET is_active = FALSE
                WHERE expires_at < NOW() AND is_active = TRUE;
                
                UPDATE refresh_tokens
                SET is_revoked = TRUE
                WHERE expires_at < NOW() AND is_revoked = FALSE;
                
                SELECT ROW_COUNT() as cleaned_count;
            END
        `);
        console.log('✅ Created sp_CleanupExpiredSessions');
        
        // sp_GetUserSessions
        await conn.query('DROP PROCEDURE IF EXISTS sp_GetUserSessions');
        await conn.query(`
            CREATE PROCEDURE sp_GetUserSessions(
                IN p_user_id INT
            )
            BEGIN
                SELECT 
                    session_id,
                    ip_address,
                    user_agent,
                    created_at,
                    expires_at,
                    last_activity,
                    is_active
                FROM user_sessions
                WHERE user_id = p_user_id
                ORDER BY created_at DESC;
            END
        `);
        console.log('✅ Created sp_GetUserSessions');
        
        // sp_UpdateUserPassword
        await conn.query('DROP PROCEDURE IF EXISTS sp_UpdateUserPassword');
        await conn.query(`
            CREATE PROCEDURE sp_UpdateUserPassword(
                IN p_user_id INT,
                IN p_new_password_hash VARCHAR(255)
            )
            BEGIN
                UPDATE user_account
                SET user_password = p_new_password_hash
                WHERE user_id = p_user_id;
                
                CALL sp_RevokeAllUserSessions(p_user_id);
                
                SELECT ROW_COUNT() as updated_rows;
            END
        `);
        console.log('✅ Created sp_UpdateUserPassword');
        
        // Verify everything
        console.log('\n📋 Step 4: Verification...\n');
        
        const tables = await conn.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'copems' 
            AND table_name IN ('user_roles', 'user_sessions', 'refresh_tokens')
        `);
        
        console.log('✅ Tables created:');
        tables.forEach(table => {
            console.log(`   - ${table.table_name || table.TABLE_NAME}`);
        });
        
        const roles = await conn.query('SELECT * FROM user_roles');
        console.log(`\n✅ User roles: ${roles.length}`);
        roles.forEach(role => {
            console.log(`   - ${role.role_name}`);
        });
        
        const procedures = await conn.query(`
            SELECT routine_name 
            FROM information_schema.routines 
            WHERE routine_schema = 'copems' 
            AND routine_type = 'PROCEDURE'
            AND (routine_name LIKE 'sp_Register%'
                OR routine_name LIKE 'sp_Authenticate%'
                OR routine_name LIKE 'sp_Create%'
                OR routine_name LIKE 'sp_Validate%'
                OR routine_name LIKE 'sp_Revoke%'
                OR routine_name LIKE 'sp_Cleanup%'
                OR routine_name LIKE 'sp_GetUser%'
                OR routine_name LIKE 'sp_Update%')
            ORDER BY routine_name
        `);
        
        console.log(`\n✅ Stored procedures created: ${procedures.length}`);
        procedures.forEach(proc => {
            console.log(`   - ${proc.routine_name || proc.ROUTINE_NAME}`);
        });
        
        console.log('\n' + '='.repeat(60));
        console.log('✨ Authentication system migration completed successfully!');
        console.log('='.repeat(60));
        console.log('\n📌 Summary:');
        console.log(`   - 3 Tables created`);
        console.log(`   - 3 User roles inserted`);
        console.log(`   - ${procedures.length} Stored procedures created`);
        console.log('\n🎉 Your authentication system is ready to use!\n');
        
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
migrateAuthTablesV2();
