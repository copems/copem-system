import pool from "../congig/database.js";

/**
 * Save a new ownership type record
 * @param {Object} ownershipTypeData - The ownership type data
 * @param {string} ownershipTypeData.ot_desc - Ownership type description
 * @returns {Promise<number>} The newly created ot_id
 */
export const saveOwnershipType = async (ownershipTypeData) => {
    const { ot_desc } = ownershipTypeData;

    try {
        const [result] = await pool.query(
            `CALL sp_InsertOwnershipType(?, @p_ot_id)`,
            [ot_desc]
        );

        const [rows] = await pool.query('SELECT @p_ot_id AS ot_id');
        return rows[0].ot_id;
    } catch (error) {
        throw new Error(`Error saving ownership type: ${error.message}`);
    }
};

/**
 * Get ownership type by ID
 * @param {number} otId - The ownership type ID
 * @returns {Promise<Object|null>} The ownership type record or null if not found
 */
export const getOwnershipTypeById = async (otId) => {
    try {
        const [rows] = await pool.query(
            `CALL sp_GetOwnershipTypeById(?)`,
            [otId]
        );

        return rows[0]?.[0] || null;
    } catch (error) {
        throw new Error(`Error fetching ownership type: ${error.message}`);
    }
};

/**
 * Update ownership type record
 * @param {number} otId - The ownership type ID
 * @param {Object} ownershipTypeData - The ownership type data to update
 * @returns {Promise<boolean>} True if update was successful
 */
export const updateOwnershipType = async (otId, ownershipTypeData) => {
    const { ot_desc } = ownershipTypeData;

    try {
        await pool.query(
            `CALL sp_UpdateOwnershipType(?, ?)`,
            [otId, ot_desc]
        );

        return true;
    } catch (error) {
        throw new Error(`Error updating ownership type: ${error.message}`);
    }
};

/**
 * Get all ownership types
 * @returns {Promise<Array>} Array of ownership type records
 */
export const getAllOwnershipTypes = async () => {
    try {
        const [rows] = await pool.query(
            `CALL sp_GetAllOwnershipTypes()`
        );

        return rows[0] || [];
    } catch (error) {
        throw new Error(`Error fetching all ownership types: ${error.message}`);
    }
};