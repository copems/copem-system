import pool from "../config/database.js";
import { copyApplicantGovIdToLotOwner } from "../bp_services/LotOwnerGovIdService.js";

/**
 * Save a new BPA construction record
 * @param {Object} bpaConstructionData - The BPA construction data
 * @param {string} bpaConstructionData.application_no - Application number
 * @param {number} bpaConstructionData.applicant_id - Applicant ID
 * @param {string} bpaConstructionData.area_no - Area number
 * @param {number} bpaConstructionData.ownership_type_id - Ownership type ID
 * @param {number} bpaConstructionData.bpac_site_id - Construction site ID
 * @param {number} bpaConstructionData.work_scope_type_id - Work scope type ID
 * @param {string} bpaConstructionData.workscope_remarks - Work scope remarks
 * @param {number} bpaConstructionData.ou_type_id - Occupancy use type ID
 * @param {string} bpaConstructionData.ou_type_others - Other occupancy use type
 * @param {number} bpaConstructionData.num_units - Number of units
 * @param {number} bpaConstructionData.num_storey - Number of storeys
 * @param {number} bpaConstructionData.total_floor_area - Total floor area
 * @param {number} bpaConstructionData.lot_area - Lot area
 * @param {number} bpaConstructionData.building_cost - Building cost
 * @param {number} bpaConstructionData.electrical_cost - Electrical cost
 * @param {number} bpaConstructionData.electrical_equipment_cost - Electrical equipment cost
 * @param {number} bpaConstructionData.mechanical_cost - Mechanical cost
 * @param {number} bpaConstructionData.mechanical_equipment_cost - Mechanical equipment cost
 * @param {number} bpaConstructionData.electronic_cost - Electronic cost
 * @param {number} bpaConstructionData.electronic_equipment_cost - Electronic equipment cost
 * @param {number} bpaConstructionData.plumbing_cost - Plumbing cost
 * @param {number} bpaConstructionData.plumbing_equipment_cost - Plumbing equipment cost
 * @param {Date} bpaConstructionData.construction_date - Construction date
 * @param {Date} bpaConstructionData.completion_date - Completion date
 * @param {number} bpaConstructionData.applicant_gov_id - Applicant government ID
 * @param {number} bpaConstructionData.bpacs_lot_owner_id - Lot owner ID
 * @param {number} bpaConstructionData.bpacs_lo_gov_id - Lot owner government ID
 * @param {number} bpaConstructionData.bpac_supervisor_id - Supervisor ID
 * @param {boolean} bpaConstructionData.applicant_owned - Whether the applicant owns the property
 * @returns {Promise<number>} The newly created bpac_id
 */
export const saveBpaConstruction = async (bpaConstructionData) => {
    let {
        application_no,
        applicant_id,
        area_no,
        ownership_type_id,
        bpac_site_id,
        work_scope_type_id,
        workscope_remarks,
        ou_type_id,
        ou_type_others,
        num_units,
        num_storey,
        total_floor_area,
        lot_area,
        building_cost,
        electrical_cost,
        electrical_equipment_cost,
        mechanical_cost,
        mechanical_equipment_cost,
        electronic_cost,
        electronic_equipment_cost,
        plumbing_cost,
        plumbing_equipment_cost,
        construction_date,
        completion_date,
        applicant_gov_id,
        bpacs_lot_owner_id,
        bpacs_lo_gov_id,
        bpac_supervisor_id,
        applicant_owned
    } = bpaConstructionData;

    try {
        // Lot owner, lot owner gov ID, and supervisor ID are nullable
        // They will be set in the Signatories step
        // Set to null if not provided
        if (!bpacs_lot_owner_id) {
            bpacs_lot_owner_id = null;
        }
        if (!bpacs_lo_gov_id) {
            bpacs_lo_gov_id = null;
        }
        if (!bpac_supervisor_id) {
            bpac_supervisor_id = null;
        }

        // Call the stored procedure with output parameter (now includes is_draft)
        const isDraft = bpaConstructionData.is_draft !== undefined ? bpaConstructionData.is_draft : true;
        
        const result = await pool.query(
            `CALL sp_InsertBpaConstruction(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @p_bpac_id)`,
            [
                application_no,
                applicant_id,
                area_no,
                ownership_type_id,
                bpac_site_id,
                work_scope_type_id,
                workscope_remarks,
                ou_type_id,
                ou_type_others,
                num_units,
                num_storey,
                total_floor_area,
                lot_area,
                building_cost,
                electrical_cost,
                electrical_equipment_cost,
                mechanical_cost,
                mechanical_equipment_cost,
                electronic_cost,
                electronic_equipment_cost,
                plumbing_cost,
                plumbing_equipment_cost,
                construction_date,
                completion_date,
                applicant_gov_id,
                bpacs_lot_owner_id,
                bpacs_lo_gov_id,
                bpac_supervisor_id,
                isDraft
            ]
        );

        // For stored procedures with mysql2/promise, result is [rows, fields]
        let rows = result[0];
        
        console.log("DB Result structure (BpaConstruction):", { rows, rowsType: Array.isArray(rows), rowsLength: rows?.length });
        
        if (!Array.isArray(rows) || rows.length === 0) {
            if (rows && typeof rows === 'object' && !Array.isArray(rows)) {
                const bpacId = rows.bpac_id;
                if (bpacId) return bpacId;
            }
            throw new Error('Failed to retrieve inserted construction ID from database. Ensure stored procedure returns the ID.');
        }
        
        const firstRow = rows[0];
        if (!firstRow || !firstRow.bpac_id) {
            throw new Error('Failed to retrieve inserted construction ID from database. Returned data is invalid.');
        }
        
        return firstRow.bpac_id;
    } catch (error) {
        throw new Error(`Error saving BPA construction: ${error.message}`);
    }
};

/**
 * Get BPA construction by ID
 * @param {number} bpacId - The BPA construction ID
 * @returns {Promise<Object|null>} The BPA construction record or null if not found
 */
export const getBpaConstructionById = async (bpacId) => {
    try {
        const result = await pool.query(
            `CALL sp_GetBpaConstructionById(?)`,
            [bpacId]
        );

        // MariaDB returns: result[0] = array of rows, result[1] = metadata
        const rows = result[0];
        return rows?.[0] || null;
    } catch (error) {
        throw new Error(`Error fetching BPA construction: ${error.message}`);
    }
};

/**
 * Update BPA construction record (supports partial updates)
 * @param {number} bpacId - The BPA construction ID
 * @param {Object} bpaConstructionData - The BPA construction data to update (can be partial)
 * @returns {Promise<boolean>} True if update was successful
 */
export const updateBpaConstruction = async (bpacId, bpaConstructionData) => {
    try {
        // First, get the existing record
        const existingRecord = await getBpaConstructionById(bpacId);
        
        if (!existingRecord) {
            throw new Error('BPA construction record not found');
        }

        // Merge existing data with new data (new data takes precedence)
        const mergedData = {
            application_no: bpaConstructionData.application_no ?? existingRecord.application_no,
            applicant_id: bpaConstructionData.applicant_id ?? existingRecord.applicant_id,
            area_no: bpaConstructionData.area_no ?? existingRecord.area_no,
            ownership_type_id: bpaConstructionData.ownership_type_id ?? existingRecord.ownership_type_id,
            bpac_site_id: bpaConstructionData.bpac_site_id ?? existingRecord.bpac_site_id,
            work_scope_type_id: bpaConstructionData.work_scope_type_id ?? existingRecord.work_scope_type_id,
            workscope_remarks: bpaConstructionData.workscope_remarks ?? existingRecord.workscope_remarks,
            ou_type_id: bpaConstructionData.ou_type_id ?? existingRecord.ou_type_id,
            ou_type_others: bpaConstructionData.ou_type_others ?? existingRecord.ou_type_others,
            num_units: bpaConstructionData.num_units ?? existingRecord.num_units,
            num_storey: bpaConstructionData.num_storey ?? existingRecord.num_storey,
            total_floor_area: bpaConstructionData.total_floor_area ?? existingRecord.total_floor_area,
            lot_area: bpaConstructionData.lot_area ?? existingRecord.lot_area,
            building_cost: bpaConstructionData.building_cost ?? existingRecord.building_cost,
            electrical_cost: bpaConstructionData.electrical_cost ?? existingRecord.electrical_cost,
            electrical_equipment_cost: bpaConstructionData.electrical_equipment_cost ?? existingRecord.electrical_equipment_cost,
            mechanical_cost: bpaConstructionData.mechanical_cost ?? existingRecord.mechanical_cost,
            mechanical_equipment_cost: bpaConstructionData.mechanical_equipment_cost ?? existingRecord.mechanical_equipment_cost,
            electronic_cost: bpaConstructionData.electronic_cost ?? existingRecord.electronic_cost,
            electronic_equipment_cost: bpaConstructionData.electronic_equipment_cost ?? existingRecord.electronic_equipment_cost,
            plumbing_cost: bpaConstructionData.plumbing_cost ?? existingRecord.plumbing_cost,
            plumbing_equipment_cost: bpaConstructionData.plumbing_equipment_cost ?? existingRecord.plumbing_equipment_cost,
            construction_date: bpaConstructionData.construction_date ?? existingRecord.construction_date,
            completion_date: bpaConstructionData.completion_date ?? existingRecord.completion_date,
            applicant_gov_id: bpaConstructionData.applicant_gov_id ?? existingRecord.applicant_gov_id,
            bpacs_lot_owner_id: bpaConstructionData.bpacs_lot_owner_id ?? existingRecord.bpacs_lot_owner_id,
            bpacs_lo_gov_id: bpaConstructionData.bpacs_lo_gov_id ?? existingRecord.bpacs_lo_gov_id,
            bpac_supervisor_id: bpaConstructionData.bpac_supervisor_id ?? existingRecord.bpac_supervisor_id,
            is_draft: bpaConstructionData.is_draft !== undefined ? bpaConstructionData.is_draft : existingRecord.is_draft
        };

        await pool.query(
            `CALL sp_UpdateBpaConstruction(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                bpacId,
                mergedData.application_no,
                mergedData.applicant_id,
                mergedData.area_no,
                mergedData.ownership_type_id,
                mergedData.bpac_site_id,
                mergedData.work_scope_type_id,
                mergedData.workscope_remarks,
                mergedData.ou_type_id,
                mergedData.ou_type_others,
                mergedData.num_units,
                mergedData.num_storey,
                mergedData.total_floor_area,
                mergedData.lot_area,
                mergedData.building_cost,
                mergedData.electrical_cost,
                mergedData.electrical_equipment_cost,
                mergedData.mechanical_cost,
                mergedData.mechanical_equipment_cost,
                mergedData.electronic_cost,
                mergedData.electronic_equipment_cost,
                mergedData.plumbing_cost,
                mergedData.plumbing_equipment_cost,
                mergedData.construction_date,
                mergedData.completion_date,
                mergedData.applicant_gov_id,
                mergedData.bpacs_lot_owner_id,
                mergedData.bpacs_lo_gov_id,
                mergedData.bpac_supervisor_id,
                mergedData.is_draft
            ]
        );

        return true;
    } catch (error) {
        throw new Error(`Error updating BPA construction: ${error.message}`);
    }
};

/**
 * Get all BPA constructions by applicant ID
 * @param {number} applicantId - The applicant ID
 * @returns {Promise<Array>} Array of BPA construction records
 */
export const getBpaConstructionsByApplicant = async (applicantId) => {
    try {
        const result = await pool.query(
            `CALL sp_GetBpaConstructionsByApplicant(?)`,
            [applicantId]
        );

        // MariaDB returns: result[0] = array of rows, result[1] = metadata
        return result[0] || [];
    } catch (error) {
        throw new Error(`Error fetching BPA constructions by applicant: ${error.message}`);
    }
};

/**
 * Get BPA construction by application number
 * @param {string} applicationNo - The application number
 * @returns {Promise<Object|null>} The BPA construction record or null if not found
 */
export const getBpaConstructionByApplicationNo = async (applicationNo) => {
    try {
        const result = await pool.query(
            `CALL sp_GetBpaConstructionByApplicationNo(?)`,
            [applicationNo]
        );

        // MariaDB returns: result[0] = array of rows, result[1] = metadata
        const rows = result[0];
        return rows?.[0] || null;
    } catch (error) {
        throw new Error(`Error fetching BPA construction by application number: ${error.message}`);
    }
};

/**
 * Get the latest draft for an applicant
 * @param {number} applicantId - The applicant ID
 * @returns {Promise<Object|null>} The latest draft BPA construction record or null if not found
 */
export const getLatestDraftByApplicant = async (applicantId) => {
    try {
        const result = await pool.query(
            `CALL sp_GetLatestDraftByApplicant(?)`,
            [applicantId]
        );

        // MariaDB returns: result[0] = array of rows, result[1] = metadata
        const rows = result[0];
        return rows?.[0] || null;
    } catch (error) {
        throw new Error(`Error fetching latest draft: ${error.message}`);
    }
};