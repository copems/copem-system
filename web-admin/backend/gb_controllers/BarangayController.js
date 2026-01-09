import pool from "../congig/database.js";

/**
 * Save a new barangay record
 * @param {Object} barangayData - The barangay data
 * @param {string} barangayData.brgy_code - Barangay code
 * @param {string} barangayData.brgy_name - Barangay name
 * @param {number} barangayData.citymun_id - City/Municipality ID
 * @returns {Promise<number>} The newly created brgy_id
 */
export const saveBarangay = async (barangayData) => {
    const { brgy_code, brgy_name, citymun_id } = barangayData;

    try {
        const [result] = await pool.query(
            `CALL sp_InsertBarangay(?, ?, ?, @p_brgy_id)`,
            [brgy_code, brgy_name, citymun_id]
        );

        const [rows] = await pool.query('SELECT @p_brgy_id AS brgy_id');
        return rows[0].brgy_id;
    } catch (error) {
        throw new Error(`Error saving barangay: ${error.message}`);
    }
};

/**
 * Get barangay by ID
 * @param {number} brgyId - The barangay ID
 * @returns {Promise<Object|null>} The barangay record or null if not found
 */
export const getBarangayById = async (brgyId) => {
    try {
        const [rows] = await pool.query(
            `CALL sp_GetBarangayById(?)`,
            [brgyId]
        );

        return rows[0]?.[0] || null;
    } catch (error) {
        throw new Error(`Error fetching barangay: ${error.message}`);
    }
};

/**
 * Update barangay record
 * @param {number} brgyId - The barangay ID
 * @param {Object} barangayData - The barangay data to update
 * @returns {Promise<boolean>} True if update was successful
 */
export const updateBarangay = async (brgyId, barangayData) => {
    const { brgy_code, brgy_name, citymun_id } = barangayData;

    try {
        await pool.query(
            `CALL sp_UpdateBarangay(?, ?, ?, ?)`,
            [brgyId, brgy_code, brgy_name, citymun_id]
        );

        return true;
    } catch (error) {
        throw new Error(`Error updating barangay: ${error.message}`);
    }
};

/**
 * Get all barangays by city/municipality ID
 * @param {number} citymunId - The city/municipality ID
 * @returns {Promise<Array>} Array of barangay records
 */
export const getBarangaysByCityMun = async (citymunId) => {
    try {
        const [rows] = await pool.query(
            `CALL sp_GetBarangaysByCityMun(?)`,
            [citymunId]
        );

        return rows[0] || [];
    } catch (error) {
        throw new Error(`Error fetching barangays by city/municipality: ${error.message}`);
    }
};