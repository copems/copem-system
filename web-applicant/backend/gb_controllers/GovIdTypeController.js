import pool from "../congig/database.js";

/**
 * Save a new government ID type record
 * @param {Object} govIdTypeData - The government ID type data
 * @param {string} govIdTypeData.git_desc - Government ID type description
 * @returns {Promise<number>} The newly created git_id
 */
export const saveGovIdType = async (govIdTypeData) => {
    const { git_desc } = govIdTypeData;

    try {
        const [result] = await pool.query(
            `CALL sp_InsertGovIdType(?, @p_git_id)`,
            [git_desc]
        );

        const [rows] = await pool.query('SELECT @p_git_id AS git_id');
        return rows[0].git_id;
    } catch (error) {
        throw new Error(`Error saving government ID type: ${error.message}`);
    }
};

/**
 * Get government ID type by ID
 * @param {number} gitId - The government ID type ID
 * @returns {Promise<Object|null>} The government ID type record or null if not found
 */
export const getGovIdTypeById = async (gitId) => {
    try {
        const [rows] = await pool.query(
            `CALL sp_GetGovIdTypeById(?)`,
            [gitId]
        );

        return rows[0]?.[0] || null;
    } catch (error) {
        throw new Error(`Error fetching government ID type: ${error.message}`);
    }
};

/**
 * Update government ID type record
 * @param {number} gitId - The government ID type ID
 * @param {Object} govIdTypeData - The government ID type data to update
 * @returns {Promise<boolean>} True if update was successful
 */
export const updateGovIdType = async (gitId, govIdTypeData) => {
    const { git_desc } = govIdTypeData;

    try {
        await pool.query(
            `CALL sp_UpdateGovIdType(?, ?)`,
            [gitId, git_desc]
        );

        return true;
    } catch (error) {
        throw new Error(`Error updating government ID type: ${error.message}`);
    }
};

/**
 * Get all government ID types
 * @returns {Promise<Array>} Array of government ID type records
 */
export const getAllGovIdTypes = async () => {
    try {
        const [rows] = await pool.query(
            `CALL sp_GetAllGovIdTypes()`
        );

        return rows[0] || [];
    } catch (error) {
        throw new Error(`Error fetching all government ID types: ${error.message}`);
    }
};