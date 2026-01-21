import pool from "../config/database.js";

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

    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(
            `INSERT INTO Applicant_Gov_ID (id_no, date_issued, place_issued, applicant_id, is_active)
             VALUES (?, ?, ?, ?, TRUE)`,
            [id_no, date_issued, place_issued, applicant_id]
        );

        return Number(result.insertId);
    } catch (error) {
        throw new Error(`Error saving applicant government ID: ${error.message}`);
    } finally {
        if (conn) conn.release();
    }
};

/**
 * Get applicant government ID by ID
 * @param {number} agidId - The government ID record ID
 * @returns {Promise<Object|null>} The government ID record or null if not found
 */
export const getApplicantGovIdById = async (agidId) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(
            `SELECT * FROM Applicant_Gov_ID WHERE agid_id = ?`,
            [agidId]
        );

        return rows[0] || null;
    } catch (error) {
        throw new Error(`Error fetching applicant government ID: ${error.message}`);
    } finally {
        if (conn) conn.release();
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

    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query(
            `UPDATE Applicant_Gov_ID SET id_no = ?, date_issued = ?, place_issued = ?, applicant_id = ?, is_active = ? WHERE agid_id = ?`,
            [id_no, date_issued, place_issued, applicant_id, is_active, agidId]
        );

        return true;
    } catch (error) {
        throw new Error(`Error updating applicant government ID: ${error.message}`);
    } finally {
        if (conn) conn.release();
    }
};

/**
 * Get all government IDs for an applicant
 * @param {number} applicantId - The applicant ID
 * @returns {Promise<Array>} Array of government ID records
 */
export const getApplicantGovIdsByApplicant = async (applicantId) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(
            `SELECT * FROM Applicant_Gov_ID WHERE applicant_id = ? AND is_active = TRUE`,
            [applicantId]
        );

        return rows;
    } catch (error) {
        throw new Error(`Error fetching applicant government IDs: ${error.message}`);
    } finally {
        if (conn) conn.release();
    }
};

/**
 * Deactivate applicant government ID
 * @param {number} agidId - The government ID record ID
 * @returns {Promise<boolean>} True if deactivation was successful
 */
export const deactivateApplicantGovId = async (agidId) => {
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query(
            `UPDATE Applicant_Gov_ID SET is_active = FALSE WHERE agid_id = ?`,
            [agidId]
        );

        return true;
    } catch (error) {
        throw new Error(`Error deactivating applicant government ID: ${error.message}`);
    } finally {
        if (conn) conn.release();
    }
};