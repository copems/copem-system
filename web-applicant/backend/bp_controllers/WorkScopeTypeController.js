import pool from "../congig/database.js";

/**
 * Save a new work scope type record
 * @param {Object} workScopeTypeData - The work scope type data
 * @param {string} workScopeTypeData.scope_desc - Work scope type description
 * @returns {Promise<number>} The newly created ws_type_id
 */
export const saveWorkScopeType = async (workScopeTypeData) => {
    const { scope_desc } = workScopeTypeData;

    try {
        const [result] = await pool.query(
            `CALL sp_InsertWorkScopeType(?, @p_ws_type_id)`,
            [scope_desc]
        );

        const [rows] = await pool.query('SELECT @p_ws_type_id AS ws_type_id');
        return rows[0].ws_type_id;
    } catch (error) {
        throw new Error(`Error saving work scope type: ${error.message}`);
    }
};

/**
 * Get work scope type by ID
 * @param {number} wsTypeId - The work scope type ID
 * @returns {Promise<Object|null>} The work scope type record or null if not found
 */
export const getWorkScopeTypeById = async (wsTypeId) => {
    try {
        const [rows] = await pool.query(
            `CALL sp_GetWorkScopeTypeById(?)`,
            [wsTypeId]
        );

        return rows[0]?.[0] || null;
    } catch (error) {
        throw new Error(`Error fetching work scope type: ${error.message}`);
    }
};

/**
 * Update work scope type record
 * @param {number} wsTypeId - The work scope type ID
 * @param {Object} workScopeTypeData - The work scope type data to update
 * @returns {Promise<boolean>} True if update was successful
 */
export const updateWorkScopeType = async (wsTypeId, workScopeTypeData) => {
    const { scope_desc } = workScopeTypeData;

    try {
        await pool.query(
            `CALL sp_UpdateWorkScopeType(?, ?)`,
            [wsTypeId, scope_desc]
        );

        return true;
    } catch (error) {
        throw new Error(`Error updating work scope type: ${error.message}`);
    }
};

/**
 * Get all work scope types
 * @returns {Promise<Array>} Array of work scope type records
 */
export const getAllWorkScopeTypes = async () => {
    try {
        const [rows] = await pool.query(
            `CALL sp_GetAllWorkScopeTypes()`
        );

        return rows[0] || [];
    } catch (error) {
        throw new Error(`Error fetching all work scope types: ${error.message}`);
    }
};