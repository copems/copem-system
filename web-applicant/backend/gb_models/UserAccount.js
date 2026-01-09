import pool from '../config/database.js';

class UserAccount {
    constructor(user_id, username, user_password, account_type){
        this.user_id = user_id;
        this.username = username;
        this.user_password = user_password;
        this.account_type = account_type;
    }
    static async findByUsername(username){
        let conn;
        try {
            conn = await pool.getConnection();
            console.log('Finding user by username:', username);
            const rows = await conn.query('CALL sp_GetUserAccountByUsername(?)', [username]);
            console.log('Stored procedure result:', rows);
            console.log('rows type:', typeof rows);
            console.log('rows is array:', Array.isArray(rows));
            
            // MariaDB stored procedures return results differently
            // The result is an array where rows[0] contains the data
            // Check if we have results
            if (!rows || !Array.isArray(rows) || rows.length === 0) {
                console.log('No results array');
                return null;
            }
            
            const resultSet = rows[0];
            console.log('resultSet:', resultSet);
            console.log('resultSet is array:', Array.isArray(resultSet));
            console.log('resultSet length:', resultSet ? resultSet.length : 'null');
            
            if (!resultSet || !Array.isArray(resultSet) || resultSet.length === 0) {
                console.log('No data in result set');
                return null;
            }
            
            const userData = resultSet[0];
            console.log('userData:', userData);
            
            return new UserAccount(
                userData.user_id,
                userData.username,
                userData.user_password,
                userData.account_type
            );
        }
        catch (error) {
            console.error('Error in findByUsername:', error);
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
            throw error;
        }
        finally {
            if (conn) conn.release();
        }
    }
}

export default UserAccount;
