import pool from "../congig/database.js";

/**
 * Save a new occupancy use group record
 * @param {Object} ouGroupData - The occupancy use group data
 * @param {string} ouGroupData.ou_group_code - Occupancy use group code
 * @param {string} ouGroupData.ou_group_desc - Occupancy use group description
 * @returns {Promise<number>} The newly created ou_group_id
 */
export const saveOccupancyUseGroup = async (ouGroupData) => {
    const { ou_group_code, ou_group_desc } = ouGroupData;

    try {
        const [result] = await pool.query(
            `CALL sp_InsertOccupancyUseGroup(?, ?, @p_ou_group_id)`,
            [ou_group_code, ou_group_desc]
        );

        const [rows] = await pool.query('SELECT @p_ou_group_id AS ou_group_id');
        return rows[0].ou_group_id;
    } catch (error) {
        throw new Error(`Error saving occupancy use group: ${error.message}`);
    }
};

/**
 * Get occupancy use group by ID
 * @param {number} ouGroupId - The occupancy use group ID
 * @returns {Promise<Object|null>} The occupancy use group record or null if not found
 */
export const getOccupancyUseGroupById = async (ouGroupId) => {
    try {
        const [rows] = await pool.query(
            `CALL sp_GetOccupancyUseGroupById(?)`,
            [ouGroupId]
        );

        return rows[0]?.[0] || null;
    } catch (error) {
        throw new Error(`Error fetching occupancy use group: ${error.message}`);
    }
};

/**
 * Update occupancy use group record
 * @param {number} ouGroupId - The occupancy use group ID
 * @param {Object} ouGroupData - The occupancy use group data to update
 * @returns {Promise<boolean>} True if update was successful
 */
export const updateOccupancyUseGroup = async (ouGroupId, ouGroupData) => {
    const { ou_group_code, ou_group_desc } = ouGroupData;

    try {
        await pool.query(
            `CALL sp_UpdateOccupancyUseGroup(?, ?, ?)`,
            [ouGroupId, ou_group_code, ou_group_desc]
        );

        return true;
    } catch (error) {
        throw new Error(`Error updating occupancy use group: ${error.message}`);
    }
};

/**
 * Get all occupancy use groups
 * @returns {Promise<Array>} Array of occupancy use group records
 */
export const getAllOccupancyUseGroups = async () => {
    try {
        const [rows] = await pool.query(
            `CALL sp_GetAllOccupancyUseGroups()`
        );

        return rows[0] || [];
    } catch (error) {
        throw new Error(`Error fetching all occupancy use groups: ${error.message}`);
    }
};