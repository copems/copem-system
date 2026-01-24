import pool from "../config/database.js";

/**
 * Save a new occupancy use group record
 * @param {Object} occupancyUseGroupData - The occupancy use group data
 * @param {string} occupancyUseGroupData.ou_group_id - Occupancy use group ID
 * @param {string} occupancyUseGroupData.ou_group_desc - Occupancy use group description
 * @returns {Promise<string>} The newly created ou_group_id
 */
export const saveOccupancyUseGroup = async (occupancyUseGroupData) => {
    const { ou_group_id, ou_group_desc } = occupancyUseGroupData;

    try {
        const result = await pool.query(
            `INSERT INTO Occupancy_Use_Group (ou_group_id, ou_group_desc) VALUES (?, ?)`,
            [ou_group_id, ou_group_desc]
        );

        return ou_group_id;
    } catch (error) {
        throw new Error(`Error saving occupancy use group: ${error.message}`);
    }
};

/**
 * Get occupancy use group by ID
 * @param {string} ouGroupId - The occupancy use group ID
 * @returns {Promise<Object|null>} The occupancy use group record or null if not found
 */
export const getOccupancyUseGroupById = async (ouGroupId) => {
    try {
        const rows = await pool.query(
            `SELECT * FROM Occupancy_Use_Group WHERE ou_group_id = ?`,
            [ouGroupId]
        );

        return rows[0] || null;
    } catch (error) {
        throw new Error(`Error fetching occupancy use group: ${error.message}`);
    }
};

/**
 * Update occupancy use group record
 * @param {string} ouGroupId - The occupancy use group ID
 * @param {Object} occupancyUseGroupData - The occupancy use group data to update
 * @returns {Promise<boolean>} True if update was successful
 */
export const updateOccupancyUseGroup = async (ouGroupId, occupancyUseGroupData) => {
    const { ou_group_desc } = occupancyUseGroupData;

    try {
        const result = await pool.query(
            `UPDATE Occupancy_Use_Group SET ou_group_desc = ? WHERE ou_group_id = ?`,
            [ou_group_desc, ouGroupId]
        );

        return result.affectedRows > 0;
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
        const rows = await pool.query(
            `SELECT * FROM Occupancy_Use_Group ORDER BY ou_group_id`
        );

        return rows;
    } catch (error) {
        throw new Error(`Error fetching all occupancy use groups: ${error.message}`);
    }
};
