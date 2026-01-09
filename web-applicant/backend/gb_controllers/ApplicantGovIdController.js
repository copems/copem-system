import pool from "../congig/database.js";

/**
 * Save a new applicant government ID record
 * @param {Object} govIdData - The government ID data
 * @param {string} govIdData.id_no - ID number
 * @param {Date} govIdData.date_issued - Date issued
 * @param {string} govIdData.place_issued - Place issued
 * @param {number} govIdData.applicant_id - Applicant ID
 * @returns {Promise<number>} The newly created agid_id
 */
export const saveApplicantGovId = async (govIdData) => {
    const { id_no, date_issued, place_issued, applicant_id } = govIdData;

    try {
        const [result] = await pool.query(
            `CALL sp_InsertApplicantGovId(?, ?, ?, ?, @p_agid_id)`,
            [id_no, date_issued, place_issued, applicant_id]
        );

        const [rows] = await pool.query('SELECT @p_agid_id AS agid_id');
        return rows[0].agid_id;
    } catch (error) {
        throw new Error(`Error saving applicant government ID: ${error.message}`);
    }
};

/**
 * Get applicant government ID by ID
 * @param {number} agidId - The government ID record ID
 * @returns {Promise<Object|null>} The government ID record or null if not found
 */
export const getApplicantGovIdById = async (agidId) => {
    try {
        const [rows] = await pool.query(
            `CALL sp_GetApplicantGovIdById(?)`,
            [agidId]
        );

        return rows[0]?.[0] || null;
    } catch (error) {
        throw new Error(`Error fetching applicant government ID: ${error.message}`);
    }
};

/**
 * Update applicant government ID record
 * @param {number} agidId - The government ID record ID
 * @param {Object} govIdData - The government ID data to update
 * @returns {Promise<boolean>} True if update was successful
 */
export const updateApplicantGovId = async (agidId, govIdData) => {
    const { id_no, date_issued, place_issued, applicant_id, is_active } = govIdData;

    try {
        await pool.query(
            `CALL sp_UpdateApplicantGovId(?, ?, ?, ?, ?, ?)`,
            [agidId, id_no, date_issued, place_issued, applicant_id, is_active]
        );

        return true;
    } catch (error) {
        throw new Error(`Error updating applicant government ID: ${error.message}`);
    }
};

/**
 * Get all government IDs for an applicant
 * @param {number} applicantId - The applicant ID
 * @returns {Promise<Array>} Array of government ID records
 */
export const getApplicantGovIdsByApplicant = async (applicantId) => {
    try {
        const [rows] = await pool.query(
            `CALL sp_GetApplicantGovIdsByApplicant(?)`,
            [applicantId]
        );

        return rows[0] || [];
    } catch (error) {
        throw new Error(`Error fetching applicant government IDs: ${error.message}`);
    }
};

/**
 * Deactivate applicant government ID
 * @param {number} agidId - The government ID record ID
 * @returns {Promise<boolean>} True if deactivation was successful
 */
export const deactivateApplicantGovId = async (agidId) => {
    try {
        await pool.query(
            `CALL sp_DeactivateApplicantGovId(?)`,
            [agidId]
        );

        return true;
    } catch (error) {
        throw new Error(`Error deactivating applicant government ID: ${error.message}`);
    }
};