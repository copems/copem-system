import pool from "../congig/database.js";

class CoOccupancyService {
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
            const existingRecord = await this.getById(bpacId);
            
            if (existingRecord && existingRecord.ou_type_id) {
                return await this.update(bpacId, formData);
            } else {
                return await this.create(bpacId, formData);
            }
        } catch (error) {
            throw new Error(`Error saving occupancy information: ${error.message}`);
        }
    }

    static async create(bpacId, formData) {
        const {
            selected_group,
            selected_category,
            occupancy_classified,
            number_of_units,
            number_of_storey,
            total_floor_area,
            lot_area,
            cost_building,
            cost_electrical,
            cost_mechanical,
            cost_electronics,
            cost_plumbing,
            cost_others,
            proposed_date,
            expected_date
        } = formData;

        try {
            await pool.query(
                `UPDATE bpa_construction SET 
                    ou_type_id = ?,
                    ou_type_others = ?,
                    num_units = ?,
                    num_storey = ?,
                    total_floor_area = ?,
                    lot_area = ?,
                    building_cost = ?,
                    electrical_cost = ?,
                    mechanical_cost = ?,
                    electronic_cost = ?,
                    plumbing_cost = ?,
                    plumbing_equipment_cost = ?,
                    construction_date = ?,
                    completion_date = ?,
                    updated_at = NOW()
                WHERE bpac_id = ?`,
                [
                    selected_category || null,
                    occupancy_classified || null,
                    number_of_units || null,
                    number_of_storey || null,
                    total_floor_area || null,
                    lot_area || null,
                    this.parseCurrency(cost_building),
                    this.parseCurrency(cost_electrical),
                    this.parseCurrency(cost_mechanical),
                    this.parseCurrency(cost_electronics),
                    this.parseCurrency(cost_plumbing),
                    this.parseCurrency(cost_others),
                    proposed_date || null,
                    expected_date || null,
                    bpacId
                ]
            );

            return {
                success: true,
                bpac_id: bpacId,
                message: 'Occupancy information saved successfully'
            };
        } catch (error) {
            throw new Error(`Error creating occupancy information: ${error.message}`);
        }
    }

    static async update(bpacId, formData) {
        const {
            selected_group,
            selected_category,
            occupancy_classified,
            number_of_units,
            number_of_storey,
            total_floor_area,
            lot_area,
            cost_building,
            cost_electrical,
            cost_mechanical,
            cost_electronics,
            cost_plumbing,
            cost_others,
            proposed_date,
            expected_date
        } = formData;

        try {
            await pool.query(
                `UPDATE bpa_construction SET 
                    ou_type_id = ?,
                    ou_type_others = ?,
                    num_units = ?,
                    num_storey = ?,
                    total_floor_area = ?,
                    lot_area = ?,
                    building_cost = ?,
                    electrical_cost = ?,
                    mechanical_cost = ?,
                    electronic_cost = ?,
                    plumbing_cost = ?,
                    plumbing_equipment_cost = ?,
                    construction_date = ?,
                    completion_date = ?,
                    updated_at = NOW()
                WHERE bpac_id = ?`,
                [
                    selected_category || null,
                    occupancy_classified || null,
                    number_of_units || null,
                    number_of_storey || null,
                    total_floor_area || null,
                    lot_area || null,
                    this.parseCurrency(cost_building),
                    this.parseCurrency(cost_electrical),
                    this.parseCurrency(cost_mechanical),
                    this.parseCurrency(cost_electronics),
                    this.parseCurrency(cost_plumbing),
                    this.parseCurrency(cost_others),
                    proposed_date || null,
                    expected_date || null,
                    bpacId
                ]
            );

            return {
                success: true,
                bpac_id: bpacId,
                message: 'Occupancy information updated successfully'
            };
        } catch (error) {
            throw new Error(`Error updating occupancy information: ${error.message}`);
        }
    }

    static async getById(bpacId) {
        try {
            const [rows] = await pool.query(
                `SELECT * FROM bpa_construction WHERE bpac_id = ?`,
                [bpacId]
            );

            return rows[0] || null;
        } catch (error) {
            throw new Error(`Error fetching occupancy information: ${error.message}`);
        }
    }

    static async partialUpdate(bpacId, fieldsToUpdate) {
        try {
            const updateFields = [];
            const values = [];

            Object.keys(fieldsToUpdate).forEach(field => {
                let value = fieldsToUpdate[field];
                
                if (field.includes('cost_')) {
                    value = this.parseCurrency(value);
                }
                
                updateFields.push(`${field} = ?`);
                values.push(value);
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
                message: 'Occupancy information partially updated'
            };
        } catch (error) {
            throw new Error(`Error partially updating occupancy: ${error.message}`);
        }
    }

    static parseCurrency(value) {
        if (!value) return null;
        if (typeof value === 'number') return value;
        
        const cleaned = value.toString().replace(/[₱,]/g, '').trim();
        const parsed = parseFloat(cleaned);
        
        return isNaN(parsed) ? null : parsed;
    }
}

export default CoOccupancyService;
