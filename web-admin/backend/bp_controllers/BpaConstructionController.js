import pool from "../congig/database.js";

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
 * @returns {Promise<number>} The newly created bpac_id
 */
export const saveBpaConstruction = async (bpaConstructionData) => {
    const {
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
        bpac_supervisor_id
    } = bpaConstructionData;

    try {
        const [result] = await pool.query(
            `CALL sp_InsertBpaConstruction(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @p_bpac_id)`,
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
                bpac_supervisor_id
            ]
        );

        const [rows] = await pool.query('SELECT @p_bpac_id AS bpac_id');
        return rows[0].bpac_id;
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
        const [rows] = await pool.query(
            `CALL sp_GetBpaConstructionById(?)`,
            [bpacId]
        );

        return rows[0]?.[0] || null;
    } catch (error) {
        throw new Error(`Error fetching BPA construction: ${error.message}`);
    }
};

/**
 * Update BPA construction record
 * @param {number} bpacId - The BPA construction ID
 * @param {Object} bpaConstructionData - The BPA construction data to update
 * @returns {Promise<boolean>} True if update was successful
 */
export const updateBpaConstruction = async (bpacId, bpaConstructionData) => {
    const {
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
        bpac_supervisor_id
    } = bpaConstructionData;

    try {
        await pool.query(
            `CALL sp_UpdateBpaConstruction(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                bpacId,
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
                bpac_supervisor_id
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
        const [rows] = await pool.query(
            `CALL sp_GetBpaConstructionsByApplicant(?)`,
            [applicantId]
        );

        return rows[0] || [];
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
        const [rows] = await pool.query(
            `CALL sp_GetBpaConstructionByApplicationNo(?)`,
            [applicationNo]
        );

        return rows[0]?.[0] || null;
    } catch (error) {
        throw new Error(`Error fetching BPA construction by application number: ${error.message}`);
    }
};