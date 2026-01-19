import pool from "../config/database.js";

/**
 * Save a new BPA construction site lot owner record
 * @param {Object} lotOwnerData - The lot owner data
 * @param {number} lotOwnerData.bpac_site_id - Construction site ID
 * @param {string} lotOwnerData.lastname - Last name
 * @param {string} lotOwnerData.firstname - First name
 * @param {string} lotOwnerData.middlename - Middle name
 * @param {string} lotOwnerData.address_details - Address details
 * @param {string} lotOwnerData.brgy_code - Barangay Code
 * @returns {Promise<number>} The newly created bpacs_lot_owner_id
 */
export const saveBpaCsLotOwner = async (lotOwnerData) => {
    const { bpac_site_id, lastname, firstname, middlename, address_details, brgy_code } = lotOwnerData;

    try {
        const result = await pool.query(
            `CALL sp_InsertBpaCsLotOwner(?, ?, ?, ?, ?, ?, @p_bpacs_lot_owner_id)`,
            [bpac_site_id, lastname, firstname, middlename, address_details, brgy_code]
        );

        // For stored procedures with mysql2/promise, result is [rows, fields]
        let rows = result[0];
        
        console.log("DB Result structure (BpaCsLotOwner):", { rows, rowsType: Array.isArray(rows), rowsLength: rows?.length });
        
        if (!Array.isArray(rows) || rows.length === 0) {
            if (rows && typeof rows === 'object' && !Array.isArray(rows)) {
                const bpacLotOwnerId = rows.bpacs_lot_owner_id;
                if (bpacLotOwnerId) return bpacLotOwnerId;
            }
            throw new Error("Failed to retrieve lot owner ID from database. Ensure stored procedure returns the ID.");
        }
        
        const firstRow = rows[0];
        if (!firstRow || !firstRow.bpacs_lot_owner_id) {
            throw new Error("Failed to retrieve lot owner ID from database. Returned data is invalid.");
        }
        return firstRow.bpacs_lot_owner_id;
    } catch (error) {
        throw new Error(`Error saving BPA CS lot owner: ${error.message}`);
    }
};

/**
 * Get BPA construction site lot owner by ID
 * @param {number} bpacsLotOwnerId - The lot owner ID
 * @returns {Promise<Object|null>} The lot owner record or null if not found
 */
export const getBpaCsLotOwnerById = async (bpacsLotOwnerId) => {
    try {
        const [rows] = await pool.query(
            `CALL sp_GetBpaCsLotOwnerById(?)`,
            [bpacsLotOwnerId]
        );

        return rows[0]?.[0] || null;
    } catch (error) {
        throw new Error(`Error fetching BPA CS lot owner: ${error.message}`);
    }
};

/**
 * Update BPA construction site lot owner record
 * @param {number} bpacsLotOwnerId - The lot owner ID
 * @param {Object} lotOwnerData - The lot owner data to update
 * @returns {Promise<boolean>} True if update was successful
 */
export const updateBpaCsLotOwner = async (bpacsLotOwnerId, lotOwnerData) => {
    const { bpac_site_id, lastname, firstname, middlename, address_details, brgy_code } = lotOwnerData;

    try {
        await pool.query(
            `CALL sp_UpdateBpaCsLotOwner(?, ?, ?, ?, ?, ?, ?)`,
            [bpacsLotOwnerId, bpac_site_id, lastname, firstname, middlename, address_details, brgy_code]
        );

        return true;
    } catch (error) {
        throw new Error(`Error updating BPA CS lot owner: ${error.message}`);
    }
};

/**
 * Get all lot owners by construction site ID
 * @param {number} bpacSiteId - The construction site ID
 * @returns {Promise<Array>} Array of lot owner records
 */
export const getBpaCsLotOwnersBySite = async (bpacSiteId) => {
    try {
        const [rows] = await pool.query(
            `CALL sp_GetBpaCsLotOwnersBySite(?)`,
            [bpacSiteId]
        );

        return rows[0] || [];
    } catch (error) {
        throw new Error(`Error fetching BPA CS lot owners by site: ${error.message}`);
    }
};

/**
 * Get all lot owners by barangay code
 * @param {string} brgyCode - The barangay code
 * @returns {Promise<Array>} Array of lot owner records
 */
export const getBpaCsLotOwnersByBarangay = async (brgyCode) => {
    try {
        const [rows] = await pool.query(
            `CALL sp_GetBpaCsLotOwnersByBarangay(?)`,
            [brgyCode]
        );

        return rows[0] || [];
    } catch (error) {
        throw new Error(`Error fetching BPA CS lot owners by barangay: ${error.message}`);
    }
};