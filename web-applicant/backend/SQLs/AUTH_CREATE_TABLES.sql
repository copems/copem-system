-- =============================================
-- Authentication Tables and Stored Procedures
-- =============================================

-- Drop existing tables if they exist
DROP TABLE IF EXISTS refresh_tokens;
DROP TABLE IF EXISTS user_sessions;
DROP TABLE IF EXISTS user_roles;

-- =============================================
-- Table: user_roles
-- Description: Stores user roles (permit applicant, building official/admin)
-- =============================================
CREATE TABLE user_roles (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    role_description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- Table: user_sessions
-- Description: Tracks active user sessions
-- =============================================
CREATE TABLE user_sessions (
    session_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    token_hash VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME NOT NULL,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_account(user_id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_token_hash (token_hash),
    INDEX idx_expires_at (expires_at)
);

-- =============================================
-- Table: refresh_tokens
-- Description: Stores refresh tokens for token renewal
-- =============================================
CREATE TABLE refresh_tokens (
    token_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    token_hash VARCHAR(255) NOT NULL UNIQUE,
    session_id INT,
    is_revoked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user_account(user_id) ON DELETE CASCADE,
    FOREIGN KEY (session_id) REFERENCES user_sessions(session_id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_token_hash (token_hash)
);

-- =============================================
-- Insert default roles
-- =============================================
INSERT INTO user_roles (role_name, role_description) VALUES
('permit_applicant', 'Regular permit applicant with limited access'),
('building_official', 'Building official with administrative access'),
('super_admin', 'Super administrator with full system access');

-- =============================================
-- Stored Procedure: sp_RegisterUser
-- Description: Registers a new user with hashed password
-- =============================================
DELIMITER //
DROP PROCEDURE IF EXISTS sp_RegisterUser//
CREATE PROCEDURE sp_RegisterUser(
    IN p_username VARCHAR(100),
    IN p_password_hash VARCHAR(255),
    IN p_email VARCHAR(100),
    IN p_role_name VARCHAR(50),
    IN p_first_name VARCHAR(100),
    IN p_last_name VARCHAR(100)
)
BEGIN
    DECLARE v_role_id INT;
    DECLARE v_user_exists INT;
    DECLARE v_email_exists INT;
    
    -- Check if username already exists
    SELECT COUNT(*) INTO v_user_exists 
    FROM user_account 
    WHERE username = p_username;
    
    IF v_user_exists > 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Username already exists';
    END IF;
    
    -- Get role_id
    SELECT role_id INTO v_role_id 
    FROM user_roles 
    WHERE role_name = p_role_name;
    
    IF v_role_id IS NULL THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Invalid role';
    END IF;
    
    -- Insert new user
    INSERT INTO user_account (username, user_password, account_type, first_name, last_name)
    VALUES (p_username, p_password_hash, p_role_name, p_first_name, p_last_name);
    
    SELECT LAST_INSERT_ID() as user_id, p_username as username, p_role_name as role, p_first_name as first_name, p_last_name as last_name;
END//
DELIMITER ;

-- =============================================
-- Stored Procedure: sp_AuthenticateUser
-- Description: Authenticates user and retrieves user details
-- =============================================
DELIMITER //
DROP PROCEDURE IF EXISTS sp_AuthenticateUser//
CREATE PROCEDURE sp_AuthenticateUser(
    IN p_username VARCHAR(100)
)
BEGIN
    SELECT 
        user_id,
        username,
        user_password,
        account_type,
        first_name,
        last_name
    FROM user_account
    WHERE username = p_username;
END//
DELIMITER ;

-- =============================================
-- Stored Procedure: sp_CreateSession
-- Description: Creates a new user session
-- =============================================
DELIMITER //
DROP PROCEDURE IF EXISTS sp_CreateSession//
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
END//
DELIMITER ;

-- =============================================
-- Stored Procedure: sp_CreateRefreshToken
-- Description: Creates a new refresh token
-- =============================================
DELIMITER //
DROP PROCEDURE IF EXISTS sp_CreateRefreshToken//
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
END//
DELIMITER ;

-- =============================================
-- Stored Procedure: sp_ValidateSession
-- Description: Validates if a session is active
-- =============================================
DELIMITER //
DROP PROCEDURE IF EXISTS sp_ValidateSession//
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
        u.account_type as role
    FROM user_sessions s
    INNER JOIN user_account u ON s.user_id = u.user_id
    WHERE s.token_hash = p_token_hash
        AND s.is_active = TRUE
        AND s.expires_at > NOW();
END//
DELIMITER ;

-- =============================================
-- Stored Procedure: sp_ValidateRefreshToken
-- Description: Validates refresh token
-- =============================================
DELIMITER //
DROP PROCEDURE IF EXISTS sp_ValidateRefreshToken//
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
        u.account_type as role
    FROM refresh_tokens rt
    INNER JOIN user_account u ON rt.user_id = u.user_id
    WHERE rt.token_hash = p_token_hash
        AND rt.is_revoked = FALSE
        AND rt.expires_at > NOW();
END//
DELIMITER ;

-- =============================================
-- Stored Procedure: sp_RevokeSession
-- Description: Revokes a user session (logout)
-- =============================================
DELIMITER //
DROP PROCEDURE IF EXISTS sp_RevokeSession//
CREATE PROCEDURE sp_RevokeSession(
    IN p_token_hash VARCHAR(255)
)
BEGIN
    UPDATE user_sessions
    SET is_active = FALSE
    WHERE token_hash = p_token_hash;
    
    -- Also revoke associated refresh tokens
    UPDATE refresh_tokens rt
    INNER JOIN user_sessions s ON rt.session_id = s.session_id
    SET rt.is_revoked = TRUE
    WHERE s.token_hash = p_token_hash;
    
    SELECT ROW_COUNT() as affected_rows;
END//
DELIMITER ;

-- =============================================
-- Stored Procedure: sp_RevokeRefreshToken
-- Description: Revokes a specific refresh token
-- =============================================
DELIMITER //
DROP PROCEDURE IF EXISTS sp_RevokeRefreshToken//
CREATE PROCEDURE sp_RevokeRefreshToken(
    IN p_token_hash VARCHAR(255)
)
BEGIN
    UPDATE refresh_tokens
    SET is_revoked = TRUE
    WHERE token_hash = p_token_hash;
    
    SELECT ROW_COUNT() as affected_rows;
END//
DELIMITER ;

-- =============================================
-- Stored Procedure: sp_RevokeAllUserSessions
-- Description: Revokes all sessions for a user (logout all devices)
-- =============================================
DELIMITER //
DROP PROCEDURE IF EXISTS sp_RevokeAllUserSessions//
CREATE PROCEDURE sp_RevokeAllUserSessions(
    IN p_user_id INT
)
BEGIN
    -- Revoke all sessions
    UPDATE user_sessions
    SET is_active = FALSE
    WHERE user_id = p_user_id;
    
    -- Revoke all refresh tokens
    UPDATE refresh_tokens
    SET is_revoked = TRUE
    WHERE user_id = p_user_id;
    
    SELECT ROW_COUNT() as affected_rows;
END//
DELIMITER ;

-- =============================================
-- Stored Procedure: sp_CleanupExpiredSessions
-- Description: Cleans up expired sessions and tokens
-- =============================================
DELIMITER //
DROP PROCEDURE IF EXISTS sp_CleanupExpiredSessions//
CREATE PROCEDURE sp_CleanupExpiredSessions()
BEGIN
    -- Deactivate expired sessions
    UPDATE user_sessions
    SET is_active = FALSE
    WHERE expires_at < NOW() AND is_active = TRUE;
    
    -- Mark expired refresh tokens as revoked
    UPDATE refresh_tokens
    SET is_revoked = TRUE
    WHERE expires_at < NOW() AND is_revoked = FALSE;
    
    SELECT ROW_COUNT() as cleaned_count;
END//
DELIMITER ;

-- =============================================
-- Stored Procedure: sp_GetUserSessions
-- Description: Gets all active sessions for a user
-- =============================================
DELIMITER //
DROP PROCEDURE IF EXISTS sp_GetUserSessions//
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
END//
DELIMITER ;

-- =============================================
-- Stored Procedure: sp_UpdateUserPassword
-- Description: Updates user password
-- =============================================
DELIMITER //
DROP PROCEDURE IF EXISTS sp_UpdateUserPassword//
CREATE PROCEDURE sp_UpdateUserPassword(
    IN p_user_id INT,
    IN p_new_password_hash VARCHAR(255)
)
BEGIN
    UPDATE user_account
    SET user_password = p_new_password_hash
    WHERE user_id = p_user_id;
    
    -- Revoke all existing sessions to force re-login
    CALL sp_RevokeAllUserSessions(p_user_id);
    
    SELECT ROW_COUNT() as updated_rows;
END//
DELIMITER ;
