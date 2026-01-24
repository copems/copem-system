import pool from "../config/database.js";

/**
 * Save a new permit applicant record
 * @param {Object} applicantData - The applicant data
 * @param {string} applicantData.username - Username
 * @param {string} applicantData.contact_no - Contact number
 * @param {string} applicantData.tin_no - TIN number
 * @param {string} applicantData.brgy_code - Barangay Code
 * @param {string} applicantData.house_no - House number
 * @param {string} applicantData.street - Street
 * @returns {Promise<number>} The newly created applicant_id
 */
export const savePermitApplicant = async (applicantData) => {
    const {
        username,
        contact_no,
        tin_no,
        brgy_code,
        house_no,
        street
    } = applicantData;

    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(
            `CALL sp_InsertPermitApplicant(?, ?, ?, ?, ?, ?, @p_applicant_id)`,
            [username, contact_no, tin_no, brgy_code, house_no, street]
        );

        // Get the output parameter
        const outputResult = await conn.query('SELECT @p_applicant_id as applicant_id');
        const applicantId = outputResult[0].applicant_id;

        return Number(applicantId);
    } catch (error) {
        throw new Error(`Error saving permit applicant: ${error.message}`);
    } finally {
        if (conn) conn.release();
    }
};

/**
 * Get permit applicant by ID
 * @param {number} applicantId - The applicant ID
 * @returns {Promise<Object|null>} The applicant record or null if not found
 */
export const getPermitApplicantById = async (applicantId) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(
            `SELECT * FROM Permit_Applicant WHERE applicant_id = ?`,
            [applicantId]
        );

        return rows[0] || null;
    } catch (error) {
        throw new Error(`Error fetching permit applicant: ${error.message}`);
    } finally {
        if (conn) conn.release();
    }
};

export const getPermitApplicantDetails = async (username) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(
            `CALL sp_GetPermitApplicantDetailsByUsername(?)`,
            [username]
        );

        return rows[0] || null;
    } catch (error) {
        throw new Error(`Error fetching permit applicant: ${error.message}`);
    } finally {
        if (conn) conn.release();
    }
};

/**
 * Get permit applicant by username (returns existing applicant if found)
 * @param {string} username - The username
 * @returns {Promise<Object|null>} The applicant record or null if not found
 */
export const getPermitApplicantByUsername = async (username) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(
            `SELECT pa.*, b.brgy_name 
             FROM Permit_Applicant pa
             LEFT JOIN Barangay b ON pa.brgy_code = b.brgy_code
             WHERE pa.username = ?
             ORDER BY pa.applicant_id DESC
             LIMIT 1`,
            [username]
        );

        return rows[0] || null;
    } catch (error) {
        throw new Error(`Error fetching permit applicant by username: ${error.message}`);
    } finally {
        if (conn) conn.release();
    }
};

/**
 * Update permit applicant record
 * @param {number} applicantId - The applicant ID
 * @param {Object} applicantData - The applicant data to update
 * @returns {Promise<boolean>} True if update was successful
 */
export const updatePermitApplicant = async (applicantId, applicantData) => {
    const {
        username,
        contact_no,
        tin_no,
        brgy_code,
        house_no,
        street
    } = applicantData;

    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query(
            `CALL sp_UpdatePermitApplicant(?, ?, ?, ?, ?, ?, ?)`,
            [applicantId, username, contact_no, tin_no, brgy_code, house_no, street]
        );

        return true;
    } catch (error) {
        throw new Error(`Error updating permit applicant: ${error.message}`);
    } finally {
        if (conn) conn.release();
    }
};

/**
 * Get permit applicant by user ID
 * @param {number} userId - The user ID
 * @returns {Promise<Object|null>} The applicant record or null if not found
 */
export const getPermitApplicantByUserId = async (userId) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(
            `CALL sp_get_applicant_details_by_user_id(?)`,
            [userId]
        );

        return rows[0][0] || null;
    } catch (error) {
        throw new Error(`Error fetching permit applicant by user ID: ${error.message}`);
    } finally {
        if (conn) conn.release();
    }
};

/**
 * Get all permit applicants
 * @returns {Promise<Array>} Array of all applicant records
 */
export const getAllPermitApplicants = async () => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(
            `SELECT * FROM Permit_Applicant ORDER BY applicant_id DESC`
        );

        return rows;
    } catch (error) {
        throw new Error(`Error fetching all permit applicants: ${error.message}`);
    } finally {
        if (conn) conn.release();
    }
};