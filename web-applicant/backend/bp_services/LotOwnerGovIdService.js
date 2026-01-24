import pool from "../config/database.js";

/**
 * Create a lot owner government ID record
 * @param {Object} lotOwnerGovIdData - The lot owner government ID data
 * @param {string} lotOwnerGovIdData.id_no - ID number
 * @param {Date|string} lotOwnerGovIdData.date_issued - Date issued
 * @param {string} lotOwnerGovIdData.place_issued - Place issued
 * @param {number} lotOwnerGovIdData.bpacs_lot_owner_id - Lot owner ID
 * @returns {Promise<number>} The newly created log_id
 */
export const createLotOwnerGovId = async (lotOwnerGovIdData) => {
    const {
        id_no,
        date_issued,
        place_issued,
        bpacs_lot_owner_id
    } = lotOwnerGovIdData;

    try {
        const result = await pool.query(
            `INSERT INTO Lot_Owner_Gov_ID (id_no, date_issued, place_issued, bpacs_lot_owner_id, is_active) 
             VALUES (?, ?, ?, ?, TRUE)`,
            [id_no, date_issued, place_issued, bpacs_lot_owner_id]
        );

        return result[0].insertId;
    } catch (error) {
        console.error("Error in createLotOwnerGovId:", error);
        throw new Error(`Error creating lot owner government ID: ${error.message}`);
    }
};

/**
 * Get lot owner government ID by lot owner ID
 * @param {number} bpacs_lot_owner_id - The lot owner ID
 * @returns {Promise<Object>} The lot owner government ID record
 */
export const getLotOwnerGovIdByLotOwnerId = async (bpacs_lot_owner_id) => {
    try {
        const result = await pool.query(
            `SELECT * FROM Lot_Owner_Gov_ID WHERE bpacs_lot_owner_id = ? AND is_active = TRUE ORDER BY log_id DESC LIMIT 1`,
            [bpacs_lot_owner_id]
        );

        return result[0][0] || null;
    } catch (error) {
        console.error("Error in getLotOwnerGovIdByLotOwnerId:", error);
        throw new Error(`Error fetching lot owner government ID: ${error.message}`);
    }
};

/**
 * Copy applicant government ID to lot owner government ID
 * This is used when the applicant owns the property
 * @param {number} applicant_gov_id - The applicant government ID (agid_id)
 * @param {number} bpacs_lot_owner_id - The lot owner ID
 * @returns {Promise<number>} The newly created log_id
 */
export const copyApplicantGovIdToLotOwner = async (applicant_gov_id, bpacs_lot_owner_id) => {
    try {
        // First, get the applicant government ID details
        const applicantGovIdResult = await pool.query(
            `SELECT id_no, date_issued, place_issued FROM Applicant_Gov_ID WHERE agid_id = ? AND is_active = TRUE`,
            [applicant_gov_id]
        );

        if (!applicantGovIdResult[0] || applicantGovIdResult[0].length === 0) {
            throw new Error(`Applicant government ID not found: ${applicant_gov_id}`);
        }

        const { id_no, date_issued, place_issued } = applicantGovIdResult[0][0];

        // Create the lot owner government ID with the same details
        const log_id = await createLotOwnerGovId({
            id_no,
            date_issued,
            place_issued,
            bpacs_lot_owner_id
        });

        return log_id;
    } catch (error) {
        console.error("Error in copyApplicantGovIdToLotOwner:", error);
        throw new Error(`Error copying applicant government ID to lot owner: ${error.message}`);
    }
};
