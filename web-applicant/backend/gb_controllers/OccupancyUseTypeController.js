import pool from "../congig/database.js";

/**
 * Save a new occupancy use type record
 * @param {Object} ouTypeData - The occupancy use type data
 * @param {number} ouTypeData.ou_group_id - Occupancy use group ID
 * @param {string} ouTypeData.ou_type_desc - Occupancy use type description
 * @returns {Promise<number>} The newly created ou_type_id
 */
export const saveOccupancyUseType = async (ouTypeData) => {
    const { ou_group_id, ou_type_desc } = ouTypeData;

    try {
        const [result] = await pool.query(
            `CALL sp_InsertOccupancyUseType(?, ?, @p_ou_type_id)`,
            [ou_group_id, ou_type_desc]
        );

        const [rows] = await pool.query('SELECT @p_ou_type_id AS ou_type_id');
        return rows[0].ou_type_id;
    } catch (error) {
        throw new Error(`Error saving occupancy use type: ${error.message}`);
    }
};

/**
 * Get occupancy use type by ID
 * @param {number} ouTypeId - The occupancy use type ID
 * @returns {Promise<Object|null>} The occupancy use type record or null if not found
 */
export const getOccupancyUseTypeById = async (ouTypeId) => {
    try {
        const [rows] = await pool.query(
            `CALL sp_GetOccupancyUseTypeById(?)`,
            [ouTypeId]
        );

        return rows[0]?.[0] || null;
    } catch (error) {
        throw new Error(`Error fetching occupancy use type: ${error.message}`);
    }
};

/**
 * Update occupancy use type record
 * @param {number} ouTypeId - The occupancy use type ID
 * @param {Object} ouTypeData - The occupancy use type data to update
 * @returns {Promise<boolean>} True if update was successful
 */
export const updateOccupancyUseType = async (ouTypeId, ouTypeData) => {
    const { ou_group_id, ou_type_desc } = ouTypeData;

    try {
        await pool.query(
            `CALL sp_UpdateOccupancyUseType(?, ?, ?)`,
            [ouTypeId, ou_group_id, ou_type_desc]
        );

        return true;
    } catch (error) {
        throw new Error(`Error updating occupancy use type: ${error.message}`);
    }
};

/**
 * Get all occupancy use types by group ID
 * @param {number} ouGroupId - The occupancy use group ID
 * @returns {Promise<Array>} Array of occupancy use type records
 */
export const getOccupancyUseTypesByGroup = async (ouGroupId) => {
    try {
        const [rows] = await pool.query(
            `CALL sp_GetOccupancyUseTypesByGroup(?)`,
            [ouGroupId]
        );

        return rows[0] || [];
    } catch (error) {
        throw new Error(`Error fetching occupancy use types by group: ${error.message}`);
    }
};

/**
 * Get all occupancy use types
 * @returns {Promise<Array>} Array of occupancy use type records
 */
export const getAllOccupancyUseTypes = async () => {
    try {
        const [rows] = await pool.query(
            `CALL sp_GetAllOccupancyUseTypes()`
        );

        return rows[0] || [];
    } catch (error) {
        throw new Error(`Error fetching all occupancy use types: ${error.message}`);
    }
};