import pool from "../congig/database.js";

class ConstructionInformationService {
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

    static async saveOrUpdate(formData, applicantId) {
        try {
            const existingConstruction = await this.getByApplicantId(applicantId);
            
            if (existingConstruction) {
                return await this.update(existingConstruction.bpac_id, formData);
            } else {
                const applicationNo = await this.generateApplicationNumber();
                return await this.create(formData, applicantId, applicationNo);
            }
        } catch (error) {
            throw new Error(`Error saving construction information: ${error.message}`);
        }
    }

    static async create(formData, applicantId, applicationNo) {
        const {
            is_enterprise,
            form_of_ownership,
            barangay,
            blk_no,
            street,
            city_municipality,
            tct_no,
            tax_dec_no,
            selected_scope,
            other_details
        } = formData;

        try {
            const siteId = await this.createConstructionSite({
                barangay,
                blk_no,
                street,
                city_municipality,
                tct_no,
                tax_dec_no
            });

            const [result] = await pool.query(
                `INSERT INTO bpa_construction (
                    application_no, applicant_id, bpac_site_id,
                    is_enterprise, form_of_ownership, work_scope_type_id, workscope_remarks
                ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                    applicationNo,
                    applicantId,
                    siteId,
                    is_enterprise ? 1 : 0,
                    form_of_ownership || null,
                    selected_scope ? JSON.stringify(selected_scope) : null,
                    other_details || null
                ]
            );

            return {
                success: true,
                bpac_id: result.insertId,
                application_no: applicationNo,
                message: 'Construction information saved successfully'
            };
        } catch (error) {
            throw new Error(`Error creating construction information: ${error.message}`);
        }
    }

    static async createConstructionSite(siteData) {
        const { barangay, blk_no, street, city_municipality, tct_no, tax_dec_no } = siteData;

        try {
            const [result] = await pool.query(
                `INSERT INTO bpa_construction_site (
                    bpacs_brgy_id, bpacs_blk_no, bpacs_street, 
                    bpacs_citymun, bpacs_tct_no, bpacs_tax_dec_no
                ) VALUES (?, ?, ?, ?, ?, ?)`,
                [barangay, blk_no, street, city_municipality, tct_no, tax_dec_no]
            );

            return result.insertId;
        } catch (error) {
            throw new Error(`Error creating construction site: ${error.message}`);
        }
    }

    static async update(bpacId, formData) {
        const {
            is_enterprise,
            form_of_ownership,
            barangay,
            blk_no,
            street,
            city_municipality,
            tct_no,
            tax_dec_no,
            selected_scope,
            other_details
        } = formData;

        try {
            const [construction] = await pool.query(
                'SELECT bpac_site_id FROM bpa_construction WHERE bpac_id = ?',
                [bpacId]
            );

            if (construction.length === 0) {
                throw new Error('Construction record not found');
            }

            const siteId = construction[0].bpac_site_id;

            await pool.query(
                `UPDATE bpa_construction_site SET 
                    bpacs_brgy_id = ?,
                    bpacs_blk_no = ?,
                    bpacs_street = ?,
                    bpacs_citymun = ?,
                    bpacs_tct_no = ?,
                    bpacs_tax_dec_no = ?
                WHERE bpac_site_id = ?`,
                [barangay, blk_no, street, city_municipality, tct_no, tax_dec_no, siteId]
            );

            await pool.query(
                `UPDATE bpa_construction SET 
                    is_enterprise = ?,
                    form_of_ownership = ?,
                    work_scope_type_id = ?,
                    workscope_remarks = ?,
                    updated_at = NOW()
                WHERE bpac_id = ?`,
                [
                    is_enterprise ? 1 : 0,
                    form_of_ownership || null,
                    selected_scope ? JSON.stringify(selected_scope) : null,
                    other_details || null,
                    bpacId
                ]
            );

            return {
                success: true,
                bpac_id: bpacId,
                message: 'Construction information updated successfully'
            };
        } catch (error) {
            throw new Error(`Error updating construction information: ${error.message}`);
        }
    }

    static async getByApplicantId(applicantId) {
        try {
            const [rows] = await pool.query(
                `SELECT bc.*, bcs.* 
                FROM bpa_construction bc
                LEFT JOIN bpa_construction_site bcs ON bc.bpac_site_id = bcs.bpac_site_id
                WHERE bc.applicant_id = ?`,
                [applicantId]
            );

            return rows[0] || null;
        } catch (error) {
            throw new Error(`Error fetching construction information: ${error.message}`);
        }
    }

    static async getById(bpacId) {
        try {
            const [rows] = await pool.query(
                `SELECT bc.*, bcs.* 
                FROM bpa_construction bc
                LEFT JOIN bpa_construction_site bcs ON bc.bpac_site_id = bcs.bpac_site_id
                WHERE bc.bpac_id = ?`,
                [bpacId]
            );

            return rows[0] || null;
        } catch (error) {
            throw new Error(`Error fetching construction information: ${error.message}`);
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
                message: 'Construction information partially updated'
            };
        } catch (error) {
            throw new Error(`Error partially updating construction: ${error.message}`);
        }
    }
}

export default ConstructionInformationService;
