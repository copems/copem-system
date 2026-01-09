import pool from "../congig/database.js";

/**
 * Save a new lot owner government ID record
 * @param {Object} govIdData - The government ID data
 * @param {string} govIdData.id_no - ID number
 * @param {Date} govIdData.date_issued - Date issued
 * @param {string} govIdData.place_issued - Place issued
 * @param {number} govIdData.bpacs_lot_owner_id - BPA Construction Site Lot Owner ID
 * @returns {Promise<number>} The newly created log_id
 */
export const saveLotOwnerGovId = async (govIdData) => {
    const { id_no, date_issued, place_issued, bpacs_lot_owner_id } = govIdData;

    try {
        const [result] = await pool.query(
            `CALL sp_InsertLotOwnerGovId(?, ?, ?, ?, @p_log_id)`,
            [id_no, date_issued, place_issued, bpacs_lot_owner_id]
        );

        const [rows] = await pool.query('SELECT @p_log_id AS log_id');
        return rows[0].log_id;
    } catch (error) {
        throw new Error(`Error saving lot owner government ID: ${error.message}`);
    }
};

/**
 * Get lot owner government ID by ID
 * @param {number} logId - The government ID record ID
 * @returns {Promise<Object|null>} The government ID record or null if not found
 */
export const getLotOwnerGovIdById = async (logId) => {
    try {
        const [rows] = await pool.query(
            `CALL sp_GetLotOwnerGovIdById(?)`,
            [logId]
        );

        return rows[0]?.[0] || null;
    } catch (error) {
        throw new Error(`Error fetching lot owner government ID: ${error.message}`);
    }
};

/**
 * Update lot owner government ID record
 * @param {number} logId - The government ID record ID
 * @param {Object} govIdData - The government ID data to update
 * @returns {Promise<boolean>} True if update was successful
 */
export const updateLotOwnerGovId = async (logId, govIdData) => {
    const { id_no, date_issued, place_issued, bpacs_lot_owner_id, is_active } = govIdData;

    try {
        await pool.query(
            `CALL sp_UpdateLotOwnerGovId(?, ?, ?, ?, ?, ?)`,
            [logId, id_no, date_issued, place_issued, bpacs_lot_owner_id, is_active]
        );

        return true;
    } catch (error) {
        throw new Error(`Error updating lot owner government ID: ${error.message}`);
    }
};

/**
 * Get all government IDs for a lot owner
 * @param {number} bpacsLotOwnerId - The lot owner ID
 * @returns {Promise<Array>} Array of government ID records
 */
export const getLotOwnerGovIdsByLotOwner = async (bpacsLotOwnerId) => {
    try {
        const [rows] = await pool.query(
            `CALL sp_GetLotOwnerGovIdsByLotOwner(?)`,
            [bpacsLotOwnerId]
        );

        return rows[0] || [];
    } catch (error) {
        throw new Error(`Error fetching lot owner government IDs: ${error.message}`);
    }
};

/**
 * Deactivate lot owner government ID
 * @param {number} logId - The government ID record ID
 * @returns {Promise<boolean>} True if deactivation was successful
 */
export const deactivateLotOwnerGovId = async (logId) => {
    try {
        await pool.query(
            `CALL sp_DeactivateLotOwnerGovId(?)`,
            [logId]
        );

        return true;
    } catch (error) {
        throw new Error(`Error deactivating lot owner government ID: ${error.message}`);
    }
};