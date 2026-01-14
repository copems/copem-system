import pool from "../congig/database.js";

class ApplicantInformationService {
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

    static async saveOrUpdate(formData, userId) {
        try {
            const existingApplicant = await this.getByUserId(userId);
            
            if (existingApplicant) {
                return await this.update(existingApplicant.bldg_owner_id, formData);
            } else {
                return await this.create(formData, userId);
            }
        } catch (error) {
            throw new Error(`Error saving applicant information: ${error.message}`);
        }
    }

    static async create(formData, userId) {
        const {
            last_name,
            first_name,
            middle_initial,
            tin,
            is_enterprise,
            form_of_ownership,
            province,
            city_municipality,
            barangay,
            house_no,
            street,
            contact_no,
            govt_issued_id,
            date_issued,
            place_issued
        } = formData;

        try {
            const [result] = await pool.query(
                `INSERT INTO bldg_owner (
                    user_id, bo_lastname, bo_firstname, bo_middlename, 
                    bo_tin_no, is_enterprise, form_of_ownership,
                    bo_province_id, bo_citymun_id, bo_brgy_id,
                    bo_house_no, bo_street, bo_contact_no,
                    govt_issued_id, date_issued, place_issued
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    userId,
                    last_name,
                    first_name,
                    middle_initial,
                    tin,
                    is_enterprise ? 1 : 0,
                    form_of_ownership || null,
                    province,
                    city_municipality,
                    barangay,
                    house_no,
                    street,
                    contact_no,
                    govt_issued_id,
                    date_issued,
                    place_issued
                ]
            );

            return {
                success: true,
                bldg_owner_id: result.insertId,
                message: 'Applicant information saved successfully'
            };
        } catch (error) {
            throw new Error(`Error creating applicant: ${error.message}`);
        }
    }

    static async update(bldgOwnerId, formData) {
        const {
            last_name,
            first_name,
            middle_initial,
            tin,
            is_enterprise,
            form_of_ownership,
            province,
            city_municipality,
            barangay,
            house_no,
            street,
            contact_no,
            govt_issued_id,
            date_issued,
            place_issued
        } = formData;

        try {
            await pool.query(
                `UPDATE bldg_owner SET 
                    bo_lastname = ?,
                    bo_firstname = ?,
                    bo_middlename = ?,
                    bo_tin_no = ?,
                    is_enterprise = ?,
                    form_of_ownership = ?,
                    bo_province_id = ?,
                    bo_citymun_id = ?,
                    bo_brgy_id = ?,
                    bo_house_no = ?,
                    bo_street = ?,
                    bo_contact_no = ?,
                    govt_issued_id = ?,
                    date_issued = ?,
                    place_issued = ?,
                    updated_at = NOW()
                WHERE bldg_owner_id = ?`,
                [
                    last_name,
                    first_name,
                    middle_initial,
                    tin,
                    is_enterprise ? 1 : 0,
                    form_of_ownership || null,
                    province,
                    city_municipality,
                    barangay,
                    house_no,
                    street,
                    contact_no,
                    govt_issued_id,
                    date_issued,
                    place_issued,
                    bldgOwnerId
                ]
            );

            return {
                success: true,
                bldg_owner_id: bldgOwnerId,
                message: 'Applicant information updated successfully'
            };
        } catch (error) {
            throw new Error(`Error updating applicant: ${error.message}`);
        }
    }

    static async getByUserId(userId) {
        try {
            const [rows] = await pool.query(
                `SELECT * FROM bldg_owner WHERE user_id = ?`,
                [userId]
            );

            return rows[0] || null;
        } catch (error) {
            throw new Error(`Error fetching applicant: ${error.message}`);
        }
    }

    static async getById(bldgOwnerId) {
        try {
            const [rows] = await pool.query(
                `SELECT * FROM bldg_owner WHERE bldg_owner_id = ?`,
                [bldgOwnerId]
            );

            return rows[0] || null;
        } catch (error) {
            throw new Error(`Error fetching applicant: ${error.message}`);
        }
    }

    static async partialUpdate(bldgOwnerId, fieldsToUpdate) {
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
            values.push(bldgOwnerId);

            await pool.query(
                `UPDATE bldg_owner SET ${updateFields.join(', ')} WHERE bldg_owner_id = ?`,
                values
            );

            return {
                success: true,
                message: 'Applicant information partially updated'
            };
        } catch (error) {
            throw new Error(`Error partially updating applicant: ${error.message}`);
        }
    }
}

export default ApplicantInformationService;
