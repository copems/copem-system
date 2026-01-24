import pool from "../config/database.js";

/**
 * Save a new BPAC supervisor record
 * @param {Object} supervisorData - The supervisor data
 * @param {string} supervisorData.lastname - Last name
 * @param {string} supervisorData.firstname - First name
 * @param {string} supervisorData.middlename - Middle name
 * @param {string} supervisorData.address_details - Address details
 * @param {string} supervisorData.brgy_code - Barangay Code
 * @param {string} supervisorData.prc_no - PRC number
 * @param {Date} supervisorData.validity - Validity date
 * @param {string} supervisorData.ptr_no - PTR number
 * @param {Date} supervisorData.issued_date - Issued date
 * @param {string} supervisorData.issued_at - Place issued
 * @param {string} supervisorData.tin_no - TIN number
 * @returns {Promise<number>} The newly created bpac_supervisor_id
 */
export const saveBpacSupervisor = async (supervisorData) => {
    const {
        lastname,
        firstname,
        middlename,
        address_details,
        brgy_code,
        prc_no,
        validity,
        ptr_no,
        issued_date,
        issued_at,
        tin_no
    } = supervisorData;

    try {
        const result = await pool.query(
            "CALL sp_InsertBpacSupervisor(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @p_bpac_supervisor_id)",
            [lastname, firstname, middlename, address_details, brgy_code, prc_no, validity, ptr_no, issued_date, issued_at, tin_no]
        );

        // For stored procedures with mysql2/promise, result is [rows, fields]
        // rows contains array of result sets from the procedure
        let rows = result[0];
        
        console.log("DB Result structure (BpacSupervisors):", { result, rows, rowsType: Array.isArray(rows), rowsLength: rows?.length });
        
        // Handle case where stored procedure returns output parameter without SELECT
        // In that case, rows might be the metadata object or empty array
        if (!Array.isArray(rows) || rows.length === 0) {
            // Try to get the value from rows directly if it's an object
            if (rows && typeof rows === 'object' && !Array.isArray(rows)) {
                const bpacSupervisorId = rows.bpac_supervisor_id;
                if (bpacSupervisorId) return bpacSupervisorId;
            }
            throw new Error("Failed to retrieve supervisor ID from database. Ensure stored procedure returns the ID as SELECT statement.");
        }
        
        // If rows is an array, get first element
        const firstRow = rows[0];
        if (!firstRow || !firstRow.bpac_supervisor_id) {
            throw new Error("Failed to retrieve supervisor ID from database. Returned data is invalid.");
        }
        
        return firstRow.bpac_supervisor_id;
    } catch (error) {
        throw new Error(`Error saving BPAC supervisor: ${error.message}`);
    }
};

/**
 * Get BPAC supervisor by ID
 * @param {number} bpacSupervisorId - The supervisor ID
 * @returns {Promise<Object|null>} The supervisor record or null if not found
 */
export const getBpacSupervisorById = async (bpacSupervisorId) => {
    try {
        const [rows] = await pool.query(
            `CALL sp_GetBpacSupervisorById(?)`,
            [bpacSupervisorId]
        );

        return rows[0]?.[0] || null;
    } catch (error) {
        throw new Error(`Error fetching BPAC supervisor: ${error.message}`);
    }
};

/**
 * Update BPAC supervisor record
 * @param {number} bpacSupervisorId - The supervisor ID
 * @param {Object} supervisorData - The supervisor data to update
 * @returns {Promise<boolean>} True if update was successful
 */
export const updateBpacSupervisor = async (bpacSupervisorId, supervisorData) => {
    const {
        lastname,
        firstname,
        middlename,
        address_details,
        brgy_code,
        prc_no,
        validity,
        ptr_no,
        issued_date,
        issued_at,
        tin_no
    } = supervisorData;

    try {
        await pool.query(
            `CALL sp_UpdateBpacSupervisor(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [bpacSupervisorId, lastname, firstname, middlename, address_details, brgy_code, prc_no, validity, ptr_no, issued_date, issued_at, tin_no]
        );

        return true;
    } catch (error) {
        throw new Error(`Error updating BPAC supervisor: ${error.message}`);
    }
};

/**
 * Get all BPAC supervisors by barangay code
 * @param {string} brgyCode - The barangay code
 * @returns {Promise<Array>} Array of supervisor records
 */
export const getBpacSupervisorsByBarangay = async (brgyCode) => {
    try {
        const [rows] = await pool.query(
            `CALL sp_GetBpacSupervisorsByBarangay(?)`,
            [brgyCode]
        );

        return rows[0] || [];
    } catch (error) {
        throw new Error(`Error fetching BPAC supervisors by barangay: ${error.message}`);
    }
};

/**
 * Get all BPAC supervisors
 * @returns {Promise<Array>} Array of supervisor records
 */
export const getAllBpacSupervisors = async () => {
    try {
        const [rows] = await pool.query(
            `CALL sp_GetAllBpacSupervisors()`
        );

        return rows[0] || [];
    } catch (error) {
        throw new Error(`Error fetching all BPAC supervisors: ${error.message}`);
    }
};

/**
 * Search BPAC supervisors by PRC number
 * @param {string} prcNo - The PRC number to search
 * @returns {Promise<Array>} Array of supervisor records
 */
export const searchBpacSupervisorByPrcNo = async (prcNo) => {
    try {
        const [rows] = await pool.query(
            `CALL sp_SearchBpacSupervisorByPrcNo(?)`,
            [prcNo]
        );

        return rows[0] || [];
    } catch (error) {
        throw new Error(`Error searching BPAC supervisor by PRC number: ${error.message}`);
    }
};