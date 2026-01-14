import pool from "../congig/database.js";

class SignatoriesService {
    static async generateApplicationNumber() {
        const year = new Date().getFullYear();
        const prefix = `BP-${year}-`;
        
        try {
            const [rows] = await pool.query(
                `SELECT application_no FROM bpa_construction 
                WHERE application_no LIKE ? 
                ORDER BY application_no DESC LIMIT 1`,
                [`${prefix}%`]
            );
            
            if (rows.length === 0) {
                return `${prefix}00001`;
            }
            
            const lastNumber = parseInt(rows[0].application_no.split('-')[2]);
            const nextNumber = (lastNumber + 1).toString().padStart(5, '0');
            return `${prefix}${nextNumber}`;
        } catch (error) {
            throw new Error(`Error generating application number: ${error.message}`);
        }
    }

    static async saveOrUpdate(formData, bpacId) {
        try {
            const supervisorId = await this.saveSupervisor(formData.supervisor);
            
            let lotOwnerId = null;
            if (formData.lot_owner_consent && formData.lot_owner) {
                lotOwnerId = await this.saveLotOwner(formData.lot_owner);
            }

            await pool.query(
                `UPDATE bpa_construction SET 
                    bpac_supervisor_id = ?,
                    bpacs_lot_owner_id = ?,
                    updated_at = NOW()
                WHERE bpac_id = ?`,
                [supervisorId, lotOwnerId, bpacId]
            );

            return {
                success: true,
                bpac_id: bpacId,
                supervisor_id: supervisorId,
                lot_owner_id: lotOwnerId,
                message: 'Signatories information saved successfully'
            };
        } catch (error) {
            throw new Error(`Error saving signatories: ${error.message}`);
        }
    }

    static async saveSupervisor(supervisorData) {
        const {
            engineer_first_name,
            engineer_last_name,
            engineer_middle_name,
            prc_no,
            ptr_no,
            date_issued,
            issued_at,
            tin,
            province,
            municipality,
            barangay,
            blk_no,
            street
        } = supervisorData;

        try {
            const [existingSupervisor] = await pool.query(
                `SELECT bpac_supervisor_id FROM bpac_supervisors 
                WHERE bpacs_prc_no = ? AND bpacs_ptr_no = ?`,
                [prc_no, ptr_no]
            );

            if (existingSupervisor.length > 0) {
                const supervisorId = existingSupervisor[0].bpac_supervisor_id;
                
                await pool.query(
                    `UPDATE bpac_supervisors SET 
                        bpacs_firstname = ?,
                        bpacs_lastname = ?,
                        bpacs_middlename = ?,
                        bpacs_date_issued = ?,
                        bpacs_issued_at = ?,
                        bpacs_tin_no = ?,
                        bpacs_province_id = ?,
                        bpacs_citymun = ?,
                        bpacs_brgy_id = ?,
                        bpacs_blk_no = ?,
                        bpacs_street = ?
                    WHERE bpac_supervisor_id = ?`,
                    [
                        engineer_first_name,
                        engineer_last_name,
                        engineer_middle_name,
                        date_issued,
                        issued_at,
                        tin,
                        province,
                        municipality,
                        barangay,
                        blk_no,
                        street,
                        supervisorId
                    ]
                );

                return supervisorId;
            } else {
                const [result] = await pool.query(
                    `INSERT INTO bpac_supervisors (
                        bpacs_firstname, bpacs_lastname, bpacs_middlename,
                        bpacs_prc_no, bpacs_ptr_no, bpacs_date_issued,
                        bpacs_issued_at, bpacs_tin_no, bpacs_province_id,
                        bpacs_citymun, bpacs_brgy_id, bpacs_blk_no, bpacs_street
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        engineer_first_name,
                        engineer_last_name,
                        engineer_middle_name,
                        prc_no,
                        ptr_no,
                        date_issued,
                        issued_at,
                        tin,
                        province,
                        municipality,
                        barangay,
                        blk_no,
                        street
                    ]
                );

                return result.insertId;
            }
        } catch (error) {
            throw new Error(`Error saving supervisor: ${error.message}`);
        }
    }

    static async saveLotOwner(lotOwnerData) {
        const {
            lot_owner_last_name,
            lot_owner_first_name,
            lot_owner_middle_initial,
            lot_owner_province,
            lot_owner_municipality,
            lot_owner_barangay,
            lot_owner_blk_no,
            lot_owner_street
        } = lotOwnerData;

        try {
            const [result] = await pool.query(
                `INSERT INTO bpa_cs_lot_owner (
                    bpacs_lo_lastname, bpacs_lo_firstname, bpacs_lo_middlename,
                    bpacs_lo_province_id, bpacs_lo_citymun, bpacs_lo_brgy_id,
                    bpacs_lo_blk_no, bpacs_lo_street
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    lot_owner_last_name,
                    lot_owner_first_name,
                    lot_owner_middle_initial,
                    lot_owner_province,
                    lot_owner_municipality,
                    lot_owner_barangay,
                    lot_owner_blk_no,
                    lot_owner_street
                ]
            );

            return result.insertId;
        } catch (error) {
            throw new Error(`Error saving lot owner: ${error.message}`);
        }
    }

    static async getById(bpacId) {
        try {
            const [rows] = await pool.query(
                `SELECT bc.*, bs.*, lo.*
                FROM bpa_construction bc
                LEFT JOIN bpac_supervisors bs ON bc.bpac_supervisor_id = bs.bpac_supervisor_id
                LEFT JOIN bpa_cs_lot_owner lo ON bc.bpacs_lot_owner_id = lo.bpacs_lot_owner_id
                WHERE bc.bpac_id = ?`,
                [bpacId]
            );

            return rows[0] || null;
        } catch (error) {
            throw new Error(`Error fetching signatories: ${error.message}`);
        }
    }

    static async partialUpdate(bpacId, fieldsToUpdate) {
        try {
            const updateFields = [];
            const values = [];

            Object.keys(fieldsToUpdate).forEach(field => {
                updateFields.push(`${field} = ?`);
                values.push(fieldsToUpdate[field]);
            });

            if (updateFields.length === 0) {
                throw new Error('No fields to update');
            }

            updateFields.push('updated_at = NOW()');
            values.push(bpacId);

            await pool.query(
                `UPDATE bpa_construction SET ${updateFields.join(', ')} WHERE bpac_id = ?`,
                values
            );

            return {
                success: true,
                message: 'Signatories information partially updated'
            };
        } catch (error) {
            throw new Error(`Error partially updating signatories: ${error.message}`);
        }
    }

    static async updateSupervisor(supervisorId, supervisorData) {
        const {
            engineer_first_name,
            engineer_last_name,
            engineer_middle_name,
            prc_no,
            ptr_no,
            date_issued,
            issued_at,
            tin,
            province,
            municipality,
            barangay,
            blk_no,
            street
        } = supervisorData;

        try {
            await pool.query(
                `UPDATE bpac_supervisors SET 
                    bpacs_firstname = ?,
                    bpacs_lastname = ?,
                    bpacs_middlename = ?,
                    bpacs_prc_no = ?,
                    bpacs_ptr_no = ?,
                    bpacs_date_issued = ?,
                    bpacs_issued_at = ?,
                    bpacs_tin_no = ?,
                    bpacs_province_id = ?,
                    bpacs_citymun = ?,
                    bpacs_brgy_id = ?,
                    bpacs_blk_no = ?,
                    bpacs_street = ?
                WHERE bpac_supervisor_id = ?`,
                [
                    engineer_first_name,
                    engineer_last_name,
                    engineer_middle_name,
                    prc_no,
                    ptr_no,
                    date_issued,
                    issued_at,
                    tin,
                    province,
                    municipality,
                    barangay,
                    blk_no,
                    street,
                    supervisorId
                ]
            );

            return {
                success: true,
                message: 'Supervisor updated successfully'
            };
        } catch (error) {
            throw new Error(`Error updating supervisor: ${error.message}`);
        }
    }

    static async updateLotOwner(lotOwnerId, lotOwnerData) {
        const {
            lot_owner_last_name,
            lot_owner_first_name,
            lot_owner_middle_initial,
            lot_owner_province,
            lot_owner_municipality,
            lot_owner_barangay,
            lot_owner_blk_no,
            lot_owner_street
        } = lotOwnerData;

        try {
            await pool.query(
                `UPDATE bpa_cs_lot_owner SET 
                    bpacs_lo_lastname = ?,
                    bpacs_lo_firstname = ?,
                    bpacs_lo_middlename = ?,
                    bpacs_lo_province_id = ?,
                    bpacs_lo_citymun = ?,
                    bpacs_lo_brgy_id = ?,
                    bpacs_lo_blk_no = ?,
                    bpacs_lo_street = ?
                WHERE bpacs_lot_owner_id = ?`,
                [
                    lot_owner_last_name,
                    lot_owner_first_name,
                    lot_owner_middle_initial,
                    lot_owner_province,
                    lot_owner_municipality,
                    lot_owner_barangay,
                    lot_owner_blk_no,
                    lot_owner_street,
                    lotOwnerId
                ]
            );

            return {
                success: true,
                message: 'Lot owner updated successfully'
            };
        } catch (error) {
            throw new Error(`Error updating lot owner: ${error.message}`);
        }
    }
}

export default SignatoriesService;
