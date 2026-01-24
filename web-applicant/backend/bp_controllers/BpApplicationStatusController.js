import pool from "../config/database.js";

/**
 * Save a new BP application status record
 * @param {Object} statusData - The application status data
 * @param {number} statusData.bpac_id - BPA Construction ID
 * @param {number} statusData.status_desc - Status description (0->Submitted, 1->In Review, 2->Approved, 3->Rejected)
 * @param {string} statusData.remarks - Remarks (optional)
 * @param {Date} statusData.date_conducted - Date conducted
 * @returns {Promise<number>} The newly created bpa_status_id
 */
export const saveBpApplicationStatus = async (statusData) => {
    const { bpac_id, status_desc, remarks, date_conducted } = statusData;

    try {
        const result = await pool.query(
            `CALL sp_InsertBpApplicationStatus(?, ?, ?, ?, @p_bpa_status_id)`,
            [bpac_id, status_desc, remarks, date_conducted]
        );

        // For stored procedures with mysql2/promise, result is [rows, fields]
        let rows = result[0];
        
        console.log("DB Result structure (BpApplicationStatus):", { rows, rowsType: Array.isArray(rows), rowsLength: rows?.length });
        
        if (!Array.isArray(rows) || rows.length === 0) {
            if (rows && typeof rows === 'object' && !Array.isArray(rows)) {
                const bpaStatusId = rows.bpa_status_id;
                if (bpaStatusId) return bpaStatusId;
            }
            throw new Error("Failed to retrieve BP application status ID from database. Ensure stored procedure returns the ID.");
        }
        
        const firstRow = rows[0];
        if (!firstRow || !firstRow.bpa_status_id) {
            throw new Error("Failed to retrieve BP application status ID from database. Returned data is invalid.");
        }
        return firstRow.bpa_status_id;
    } catch (error) {
        throw new Error(`Error saving BP application status: ${error.message}`);
    }
};

/**
 * Get BP application status by ID
 * @param {number} bpaStatusId - The application status ID
 * @returns {Promise<Object|null>} The application status record or null if not found
 */
export const getBpApplicationStatusById = async (bpaStatusId) => {
    try {
        const [rows] = await pool.query(
            `CALL sp_GetBpApplicationStatusById(?)`,
            [bpaStatusId]
        );

        return rows[0]?.[0] || null;
    } catch (error) {
        throw new Error(`Error fetching BP application status: ${error.message}`);
    }
};

/**
 * Update BP application status record
 * @param {number} bpaStatusId - The application status ID
 * @param {Object} statusData - The application status data to update
 * @returns {Promise<boolean>} True if update was successful
 */
export const updateBpApplicationStatus = async (bpaStatusId, statusData) => {
    const { bpac_id, status_desc, remarks, date_conducted } = statusData;

    try {
        await pool.query(
            `CALL sp_UpdateBpApplicationStatus(?, ?, ?, ?, ?)`,
            [bpaStatusId, bpac_id, status_desc, remarks, date_conducted]
        );

        return true;
    } catch (error) {
        throw new Error(`Error updating BP application status: ${error.message}`);
    }
};

/**
 * Get all BP application statuses by BPA Construction ID
 * @param {number} bpacId - The BPA Construction ID
 * @returns {Promise<Array>} Array of application status records
 */
export const getBpApplicationStatusesByBpac = async (bpacId) => {
    try {
        const [rows] = await pool.query(
            `CALL sp_GetBpApplicationStatusesByBpac(?)`,
            [bpacId]
        );

        return rows[0] || [];
    } catch (error) {
        throw new Error(`Error fetching BP application statuses by BPAC: ${error.message}`);
    }
};

/**
 * Get latest BP application status by BPA Construction ID
 * @param {number} bpacId - The BPA Construction ID
 * @returns {Promise<Object|null>} The latest application status record or null if not found
 */
export const getLatestBpApplicationStatusByBpac = async (bpacId) => {
    try {
        const [rows] = await pool.query(
            `CALL sp_GetLatestBpApplicationStatusByBpac(?)`,
            [bpacId]
        );

        return rows[0]?.[0] || null;
    } catch (error) {
        throw new Error(`Error fetching latest BP application status: ${error.message}`);
    }
};

/**
 * Get all BP applications by status
 * @param {number} statusDesc - The status description (0->Submitted, 1->In Review, 2->Approved, 3->Rejected)
 * @returns {Promise<Array>} Array of application status records
 */
export const getBpApplicationStatusesByStatus = async (statusDesc) => {
    try {
        const [rows] = await pool.query(
            `CALL sp_GetBpApplicationStatusesByStatus(?)`,
            [statusDesc]
        );

        return rows[0] || [];
    } catch (error) {
        throw new Error(`Error fetching BP application statuses by status: ${error.message}`);
    }
};