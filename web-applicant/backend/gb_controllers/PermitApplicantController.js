import pool from "../config/database.js";

/**
 * Save a new permit applicant record
 * @param {Object} applicantData - The applicant data
 * @param {number} applicantData.user_id - User ID
 * @param {string} applicantData.lastname - Last name
 * @param {string} applicantData.firstname - First name
 * @param {string} applicantData.middlename - Middle name
 * @param {string} applicantData.contact_no - Contact number
 * @param {string} applicantData.tin_no - TIN number
 * @param {string} applicantData.brgy_code - Barangay Code
 * @param {string} applicantData.house_no - House number
 * @param {string} applicantData.street - Street
 * @returns {Promise<number>} The newly created applicant_id
 */
export const savePermitApplicant = async (applicantData) => {
    const {
        user_id,
        lastname,
        firstname,
        middlename,
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
            `INSERT INTO Permit_Applicant (user_id, lastname, firstname, middlename, contact_no, tin_no, brgy_code, house_no, street)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [user_id, lastname, firstname, middlename, contact_no, tin_no, brgy_code, house_no, street]
        );

        return Number(result.insertId);
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

/**
 * Update permit applicant record
 * @param {number} applicantId - The applicant ID
 * @param {Object} applicantData - The applicant data to update
 * @returns {Promise<boolean>} True if update was successful
 */
export const updatePermitApplicant = async (applicantId, applicantData) => {
    const {
        user_id,
        lastname,
        firstname,
        middlename,
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
            `UPDATE Permit_Applicant SET user_id = ?, lastname = ?, firstname = ?, middlename = ?, contact_no = ?, tin_no = ?, brgy_code = ?, house_no = ?, street = ? WHERE applicant_id = ?`,
            [user_id, lastname, firstname, middlename, contact_no, tin_no, brgy_code, house_no, street, applicantId]
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
            `SELECT * FROM Permit_Applicant WHERE user_id = ? LIMIT 1`,
            [userId]
        );

        return rows[0] || null;
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