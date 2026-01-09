import pool from "../congig/database.js";

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

    try {
        const [result] = await pool.query(
            `CALL sp_InsertPermitApplicant(?, ?, ?, ?, ?, ?, ?, ?, ?, @p_applicant_id)`,
            [user_id, lastname, firstname, middlename, contact_no, tin_no, brgy_code, house_no, street]
        );

        const [rows] = await pool.query('SELECT @p_applicant_id AS applicant_id');
        return rows[0].applicant_id;
    } catch (error) {
        throw new Error(`Error saving permit applicant: ${error.message}`);
    }
};

/**
 * Get permit applicant by ID
 * @param {number} applicantId - The applicant ID
 * @returns {Promise<Object|null>} The applicant record or null if not found
 */
export const getPermitApplicantById = async (applicantId) => {
    try {
        const [rows] = await pool.query(
            `CALL sp_GetPermitApplicantById(?)`,
            [applicantId]
        );

        return rows[0]?.[0] || null;
    } catch (error) {
        throw new Error(`Error fetching permit applicant: ${error.message}`);
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

    try {
        await pool.query(
            `CALL sp_UpdatePermitApplicant(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [applicantId, user_id, lastname, firstname, middlename, contact_no, tin_no, brgy_code, house_no, street]
        );

        return true;
    } catch (error) {
        throw new Error(`Error updating permit applicant: ${error.message}`);
    }
};