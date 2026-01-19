import pool from "../config/database.js";

/**
 * Save a new occupancy use type record
 * @param {Object} occupancyUseTypeData - The occupancy use type data
 * @param {string} occupancyUseTypeData.ou_type_id - Occupancy use type ID
 * @param {string} occupancyUseTypeData.ou_group_id - Occupancy use group ID
 * @param {string} occupancyUseTypeData.ou_type_desc - Occupancy use type description
 * @returns {Promise<string>} The newly created ou_type_id
 */
export const saveOccupancyUseType = async (occupancyUseTypeData) => {
    const { ou_type_id, ou_group_id, ou_type_desc } = occupancyUseTypeData;

    try {
        const [result] = await pool.query(
            `INSERT INTO Occupancy_Use_Type (ou_type_id, ou_group_id, ou_type_desc) VALUES (?, ?, ?)`,
            [ou_type_id, ou_group_id, ou_type_desc]
        );

        return ou_type_id;
    } catch (error) {
        throw new Error(`Error saving occupancy use type: ${error.message}`);
    }
};

/**
 * Get occupancy use type by ID
 * @param {string} ouTypeId - The occupancy use type ID
 * @returns {Promise<Object|null>} The occupancy use type record or null if not found
 */
export const getOccupancyUseTypeById = async (ouTypeId) => {
    try {
        const rows = await pool.query(
            `SELECT out.*, oug.ou_group_desc 
             FROM Occupancy_Use_Type out
             LEFT JOIN Occupancy_Use_Group oug ON out.ou_group_id = oug.ou_group_id
             WHERE out.ou_type_id = ?`,
            [ouTypeId]
        );

        return rows[0] || null;
    } catch (error) {
        throw new Error(`Error fetching occupancy use type: ${error.message}`);
    }
};

/**
 * Update occupancy use type record
 * @param {string} ouTypeId - The occupancy use type ID
 * @param {Object} occupancyUseTypeData - The occupancy use type data to update
 * @returns {Promise<boolean>} True if update was successful
 */
export const updateOccupancyUseType = async (ouTypeId, occupancyUseTypeData) => {
    const { ou_group_id, ou_type_desc } = occupancyUseTypeData;

    try {
        const [result] = await pool.query(
            `UPDATE Occupancy_Use_Type SET ou_group_id = ?, ou_type_desc = ? WHERE ou_type_id = ?`,
            [ou_group_id, ou_type_desc, ouTypeId]
        );

        return result.affectedRows > 0;
    } catch (error) {
        throw new Error(`Error updating occupancy use type: ${error.message}`);
    }
};

/**
 * Get all occupancy use types
 * @returns {Promise<Array>} Array of occupancy use type records
 */
export const getAllOccupancyUseTypes = async () => {
    try {
        const rows = await pool.query(
            `SELECT out.*, oug.ou_group_desc 
             FROM Occupancy_Use_Type out
             LEFT JOIN Occupancy_Use_Group oug ON out.ou_group_id = oug.ou_group_id
             ORDER BY out.ou_group_id, out.ou_type_id`
        );

        return rows || [];
    } catch (error) {
        throw new Error(`Error fetching all occupancy use types: ${error.message}`);
    }
};

/**
 * Get occupancy use types by group ID
 * @param {string} ouGroupId - The occupancy use group ID
 * @returns {Promise<Array>} Array of occupancy use type records for the specified group
 */
export const getOccupancyUseTypesByGroupId = async (ouGroupId) => {
    try {
        const rows = await pool.query(
            `SELECT * 
             FROM Occupancy_Use_Type 
             WHERE ou_group_id = ?
             ORDER BY ou_type_id`,
            [ouGroupId]
        );

        return rows || [];
    } catch (error) {
        throw new Error(`Error fetching occupancy use types by group: ${error.message}`);
    }
};
