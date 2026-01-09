import pool from "../congig/database.js";

/**
 * Save a new BPA construction site record
 * @param {Object} siteData - The construction site data
 * @param {number} siteData.applicant_id - Applicant ID
 * @param {string} siteData.lot_no - Lot number
 * @param {string} siteData.block_no - Block number
 * @param {string} siteData.tct_no - TCT number
 * @param {string} siteData.street - Street
 * @param {string} siteData.brgy_code - Barangay Code
 * @param {boolean} siteData.applicant_owned - Whether owned by applicant
 * @returns {Promise<number>} The newly created bpac_site_id
 */
export const saveBpaConstructionSite = async (siteData) => {
    const { applicant_id, lot_no, block_no, tct_no, street, brgy_code, applicant_owned } = siteData;

    try {
        const [result] = await pool.query(
            `CALL sp_InsertBpaConstructionSite(?, ?, ?, ?, ?, ?, ?, @p_bpac_site_id)`,
            [applicant_id, lot_no, block_no, tct_no, street, brgy_code, applicant_owned]
        );

        const [rows] = await pool.query('SELECT @p_bpac_site_id AS bpac_site_id');
        return rows[0].bpac_site_id;
    } catch (error) {
        throw new Error(`Error saving BPA construction site: ${error.message}`);
    }
};

/**
 * Get BPA construction site by ID
 * @param {number} bpacSiteId - The construction site ID
 * @returns {Promise<Object|null>} The construction site record or null if not found
 */
export const getBpaConstructionSiteById = async (bpacSiteId) => {
    try {
        const [rows] = await pool.query(
            `CALL sp_GetBpaConstructionSiteById(?)`,
            [bpacSiteId]
        );

        return rows[0]?.[0] || null;
    } catch (error) {
        throw new Error(`Error fetching BPA construction site: ${error.message}`);
    }
};

/**
 * Update BPA construction site record
 * @param {number} bpacSiteId - The construction site ID
 * @param {Object} siteData - The construction site data to update
 * @returns {Promise<boolean>} True if update was successful
 */
export const updateBpaConstructionSite = async (bpacSiteId, siteData) => {
    const { applicant_id, lot_no, block_no, tct_no, street, brgy_code, applicant_owned } = siteData;

    try {
        await pool.query(
            `CALL sp_UpdateBpaConstructionSite(?, ?, ?, ?, ?, ?, ?, ?)`,
            [bpacSiteId, applicant_id, lot_no, block_no, tct_no, street, brgy_code, applicant_owned]
        );

        return true;
    } catch (error) {
        throw new Error(`Error updating BPA construction site: ${error.message}`);
    }
};

/**
 * Get all BPA construction sites by applicant ID
 * @param {number} applicantId - The applicant ID
 * @returns {Promise<Array>} Array of construction site records
 */
export const getBpaConstructionSitesByApplicant = async (applicantId) => {
    try {
        const [rows] = await pool.query(
            `CALL sp_GetBpaConstructionSitesByApplicant(?)`,
            [applicantId]
        );

        return rows[0] || [];
    } catch (error) {
        throw new Error(`Error fetching BPA construction sites by applicant: ${error.message}`);
    }
};

/**
 * Get all BPA construction sites by barangay code
 * @param {string} brgyCode - The barangay code
 * @returns {Promise<Array>} Array of construction site records
 */
export const getBpaConstructionSitesByBarangay = async (brgyCode) => {
    try {
        const [rows] = await pool.query(
            `CALL sp_GetBpaConstructionSitesByBarangay(?)`,
            [brgyCode]
        );

        return rows[0] || [];
    } catch (error) {
        throw new Error(`Error fetching BPA construction sites by barangay: ${error.message}`);
    }
};