import pool from './config/database.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigration() {
    let conn;
    
    try {
        conn = await pool.getConnection();
        console.log('✓ Connected to database');

        // Step 1: Check if is_draft column exists
        console.log('\nStep 1: Checking if is_draft column exists...');
        try {
            const [columns] = await conn.query("SHOW COLUMNS FROM BPA_Construction LIKE 'is_draft'");
            if (columns.length === 0) {
                console.log('  Adding is_draft column...');
                await conn.query('ALTER TABLE BPA_Construction ADD COLUMN is_draft BOOLEAN DEFAULT TRUE');
                console.log('  ✓ is_draft column added');
            } else {
                console.log('  ✓ is_draft column already exists');
            }
        } catch (error) {
            console.log('  Note:', error.message);
        }

        // Step 2: Make columns nullable
        console.log('\nStep 2: Making foreign key columns nullable...');
        
        await conn.query('SET FOREIGN_KEY_CHECKS = 0');
        
        const alterStatements = [
            'ALTER TABLE BPA_Construction MODIFY COLUMN bpacs_lot_owner_id INTEGER NULL',
            'ALTER TABLE BPA_Construction MODIFY COLUMN bpacs_lo_gov_id INTEGER NULL',
            'ALTER TABLE BPA_Construction MODIFY COLUMN bpac_supervisor_id INTEGER NULL',
            'ALTER TABLE BPA_Construction MODIFY COLUMN applicant_gov_id INTEGER NULL',
            "ALTER TABLE BPA_Construction MODIFY COLUMN workscope_remarks VARCHAR(255) NULL DEFAULT ''",
            'ALTER TABLE BPA_Construction MODIFY COLUMN ou_type_others VARCHAR(255) NULL',
            'ALTER TABLE BPA_Construction MODIFY COLUMN num_units INTEGER NULL DEFAULT 0',
            'ALTER TABLE BPA_Construction MODIFY COLUMN num_storey INTEGER NULL DEFAULT 0',
            'ALTER TABLE BPA_Construction MODIFY COLUMN total_floor_area DECIMAL(15,2) NULL DEFAULT 0',
            'ALTER TABLE BPA_Construction MODIFY COLUMN lot_area DECIMAL(15,2) NULL DEFAULT 0',
            'ALTER TABLE BPA_Construction MODIFY COLUMN building_cost DECIMAL(15,2) NULL DEFAULT 0',
            'ALTER TABLE BPA_Construction MODIFY COLUMN electrical_cost DECIMAL(15,2) NULL DEFAULT 0',
            'ALTER TABLE BPA_Construction MODIFY COLUMN electrical_equipment_cost DECIMAL(15,2) NULL DEFAULT 0',
            'ALTER TABLE BPA_Construction MODIFY COLUMN mechanical_cost DECIMAL(15,2) NULL DEFAULT 0',
            'ALTER TABLE BPA_Construction MODIFY COLUMN mechanical_equipment_cost DECIMAL(15,2) NULL DEFAULT 0',
            'ALTER TABLE BPA_Construction MODIFY COLUMN electronic_cost DECIMAL(15,2) NULL DEFAULT 0',
            'ALTER TABLE BPA_Construction MODIFY COLUMN electronic_equipment_cost DECIMAL(15,2) NULL DEFAULT 0',
            'ALTER TABLE BPA_Construction MODIFY COLUMN plumbing_cost DECIMAL(15,2) NULL DEFAULT 0',
            'ALTER TABLE BPA_Construction MODIFY COLUMN plumbing_equipment_cost DECIMAL(15,2) NULL DEFAULT 0',
            'ALTER TABLE BPA_Construction MODIFY COLUMN construction_date DATE NULL',
            'ALTER TABLE BPA_Construction MODIFY COLUMN completion_date DATE NULL',
        ];

        for (const stmt of alterStatements) {
            try {
                await conn.query(stmt);
                console.log(`  ✓ ${stmt.substring(0, 60)}...`);
            } catch (error) {
                console.log(`  Note: ${error.message}`);
            }
        }

        await conn.query('SET FOREIGN_KEY_CHECKS = 1');
        console.log('  ✓ Foreign key checks re-enabled');

        // Step 3: Create/update stored procedures
        console.log('\nStep 3: Creating stored procedures...');
        
        const procedures = [
            'sp_InsertBpaConstruction',
            'sp_UpdateBpaConstruction', 
            'sp_GetBpaConstructionById',
            'sp_GetBpaConstructionsByApplicant',
            'sp_GetLatestDraftByApplicant',
            'sp_GetBpaConstructionByApplicationNo'
        ];

        // Drop existing procedures
        for (const proc of procedures) {
            try {
                await conn.query(`DROP PROCEDURE IF EXISTS ${proc}`);
                console.log(`  ✓ Dropped ${proc}`);
            } catch (error) {
                console.log(`  Note: ${error.message}`);
            }
        }

        // Create sp_InsertBpaConstruction
        await conn.query(`
            CREATE PROCEDURE sp_InsertBpaConstruction(
                IN p_application_no VARCHAR(50),
                IN p_applicant_id INTEGER,
                IN p_area_no VARCHAR(50),
                IN p_ownership_type_id VARCHAR(2),
                IN p_bpac_site_id INTEGER,
                IN p_work_scope_type_id VARCHAR(2),
                IN p_workscope_remarks VARCHAR(255),
                IN p_ou_type_id VARCHAR(2),
                IN p_ou_type_others VARCHAR(255),
                IN p_num_units INTEGER,
                IN p_num_storey INTEGER,
                IN p_total_floor_area DECIMAL(15,2),
                IN p_lot_area DECIMAL(15,2),
                IN p_building_cost DECIMAL(15,2),
                IN p_electrical_cost DECIMAL(15,2),
                IN p_electrical_equipment_cost DECIMAL(15,2),
                IN p_mechanical_cost DECIMAL(15,2),
                IN p_mechanical_equipment_cost DECIMAL(15,2),
                IN p_electronic_cost DECIMAL(15,2),
                IN p_electronic_equipment_cost DECIMAL(15,2),
                IN p_plumbing_cost DECIMAL(15,2),
                IN p_plumbing_equipment_cost DECIMAL(15,2),
                IN p_construction_date DATE,
                IN p_completion_date DATE,
                IN p_applicant_gov_id INTEGER,
                IN p_bpacs_lot_owner_id INTEGER,
                IN p_bpacs_lo_gov_id INTEGER,
                IN p_bpac_supervisor_id INTEGER,
                IN p_is_draft BOOLEAN,
                OUT p_bpac_id INTEGER
            )
            BEGIN
                INSERT INTO BPA_Construction (
                    application_no, applicant_id, area_no, ownership_type_id, bpac_site_id,
                    work_scope_type_id, workscope_remarks, ou_type_id, ou_type_others,
                    num_units, num_storey, total_floor_area, lot_area,
                    building_cost, electrical_cost, electrical_equipment_cost,
                    mechanical_cost, mechanical_equipment_cost, electronic_cost, electronic_equipment_cost,
                    plumbing_cost, plumbing_equipment_cost, construction_date, completion_date,
                    applicant_gov_id, bpacs_lot_owner_id, bpacs_lo_gov_id, bpac_supervisor_id, is_draft
                )
                VALUES (
                    p_application_no, p_applicant_id, p_area_no, p_ownership_type_id, p_bpac_site_id,
                    p_work_scope_type_id, COALESCE(p_workscope_remarks, ''), p_ou_type_id, p_ou_type_others,
                    COALESCE(p_num_units, 0), COALESCE(p_num_storey, 0), 
                    COALESCE(p_total_floor_area, 0), COALESCE(p_lot_area, 0),
                    COALESCE(p_building_cost, 0), COALESCE(p_electrical_cost, 0), COALESCE(p_electrical_equipment_cost, 0),
                    COALESCE(p_mechanical_cost, 0), COALESCE(p_mechanical_equipment_cost, 0),
                    COALESCE(p_electronic_cost, 0), COALESCE(p_electronic_equipment_cost, 0),
                    COALESCE(p_plumbing_cost, 0), COALESCE(p_plumbing_equipment_cost, 0),
                    COALESCE(p_construction_date, CURRENT_DATE), COALESCE(p_completion_date, CURRENT_DATE),
                    p_applicant_gov_id, p_bpacs_lot_owner_id, p_bpacs_lo_gov_id, p_bpac_supervisor_id,
                    COALESCE(p_is_draft, TRUE)
                );
                SET p_bpac_id = LAST_INSERT_ID();
                SELECT p_bpac_id AS bpac_id;
            END
        `);
        console.log('  ✓ Created sp_InsertBpaConstruction');

        // Create sp_UpdateBpaConstruction
        await conn.query(`
            CREATE PROCEDURE sp_UpdateBpaConstruction(
                IN p_bpac_id INTEGER,
                IN p_application_no VARCHAR(50),
                IN p_applicant_id INTEGER,
                IN p_area_no VARCHAR(50),
                IN p_ownership_type_id VARCHAR(2),
                IN p_bpac_site_id INTEGER,
                IN p_work_scope_type_id VARCHAR(2),
                IN p_workscope_remarks VARCHAR(255),
                IN p_ou_type_id VARCHAR(2),
                IN p_ou_type_others VARCHAR(255),
                IN p_num_units INTEGER,
                IN p_num_storey INTEGER,
                IN p_total_floor_area DECIMAL(15,2),
                IN p_lot_area DECIMAL(15,2),
                IN p_building_cost DECIMAL(15,2),
                IN p_electrical_cost DECIMAL(15,2),
                IN p_electrical_equipment_cost DECIMAL(15,2),
                IN p_mechanical_cost DECIMAL(15,2),
                IN p_mechanical_equipment_cost DECIMAL(15,2),
                IN p_electronic_cost DECIMAL(15,2),
                IN p_electronic_equipment_cost DECIMAL(15,2),
                IN p_plumbing_cost DECIMAL(15,2),
                IN p_plumbing_equipment_cost DECIMAL(15,2),
                IN p_construction_date DATE,
                IN p_completion_date DATE,
                IN p_applicant_gov_id INTEGER,
                IN p_bpacs_lot_owner_id INTEGER,
                IN p_bpacs_lo_gov_id INTEGER,
                IN p_bpac_supervisor_id INTEGER,
                IN p_is_draft BOOLEAN
            )
            BEGIN
                UPDATE BPA_Construction SET
                    application_no = p_application_no,
                    applicant_id = p_applicant_id,
                    area_no = p_area_no,
                    ownership_type_id = p_ownership_type_id,
                    bpac_site_id = p_bpac_site_id,
                    work_scope_type_id = p_work_scope_type_id,
                    workscope_remarks = COALESCE(p_workscope_remarks, workscope_remarks),
                    ou_type_id = p_ou_type_id,
                    ou_type_others = p_ou_type_others,
                    num_units = COALESCE(p_num_units, num_units),
                    num_storey = COALESCE(p_num_storey, num_storey),
                    total_floor_area = COALESCE(p_total_floor_area, total_floor_area),
                    lot_area = COALESCE(p_lot_area, lot_area),
                    building_cost = COALESCE(p_building_cost, building_cost),
                    electrical_cost = COALESCE(p_electrical_cost, electrical_cost),
                    electrical_equipment_cost = COALESCE(p_electrical_equipment_cost, electrical_equipment_cost),
                    mechanical_cost = COALESCE(p_mechanical_cost, mechanical_cost),
                    mechanical_equipment_cost = COALESCE(p_mechanical_equipment_cost, mechanical_equipment_cost),
                    electronic_cost = COALESCE(p_electronic_cost, electronic_cost),
                    electronic_equipment_cost = COALESCE(p_electronic_equipment_cost, electronic_equipment_cost),
                    plumbing_cost = COALESCE(p_plumbing_cost, plumbing_cost),
                    plumbing_equipment_cost = COALESCE(p_plumbing_equipment_cost, plumbing_equipment_cost),
                    construction_date = COALESCE(p_construction_date, construction_date),
                    completion_date = COALESCE(p_completion_date, completion_date),
                    applicant_gov_id = p_applicant_gov_id,
                    bpacs_lot_owner_id = p_bpacs_lot_owner_id,
                    bpacs_lo_gov_id = p_bpacs_lo_gov_id,
                    bpac_supervisor_id = p_bpac_supervisor_id,
                    is_draft = COALESCE(p_is_draft, is_draft)
                WHERE bpac_id = p_bpac_id;
            END
        `);
        console.log('  ✓ Created sp_UpdateBpaConstruction');

        // Create sp_GetBpaConstructionById
        await conn.query(`
            CREATE PROCEDURE sp_GetBpaConstructionById(IN p_bpac_id INTEGER)
            BEGIN
                SELECT * FROM BPA_Construction WHERE bpac_id = p_bpac_id;
            END
        `);
        console.log('  ✓ Created sp_GetBpaConstructionById');

        // Create sp_GetBpaConstructionsByApplicant
        await conn.query(`
            CREATE PROCEDURE sp_GetBpaConstructionsByApplicant(IN p_applicant_id INTEGER)
            BEGIN
                SELECT * FROM BPA_Construction WHERE applicant_id = p_applicant_id ORDER BY bpac_id DESC;
            END
        `);
        console.log('  ✓ Created sp_GetBpaConstructionsByApplicant');

        // Create sp_GetLatestDraftByApplicant
        await conn.query(`
            CREATE PROCEDURE sp_GetLatestDraftByApplicant(IN p_applicant_id INTEGER)
            BEGIN
                SELECT * FROM BPA_Construction 
                WHERE applicant_id = p_applicant_id AND is_draft = TRUE
                ORDER BY bpac_id DESC LIMIT 1;
            END
        `);
        console.log('  ✓ Created sp_GetLatestDraftByApplicant');

        // Create sp_GetBpaConstructionByApplicationNo
        await conn.query(`
            CREATE PROCEDURE sp_GetBpaConstructionByApplicationNo(IN p_application_no VARCHAR(50))
            BEGIN
                SELECT * FROM BPA_Construction WHERE application_no = p_application_no;
            END
        `);
        console.log('  ✓ Created sp_GetBpaConstructionByApplicationNo');

        console.log('\n✓ Migration completed successfully!');
        console.log('\nYou can now save construction information with nullable lot owner fields.');

    } catch (error) {
        console.error('\n✗ Migration failed:', error.message);
        process.exit(1);
    } finally {
        if (conn) {
            conn.release();
            console.log('\n✓ Database connection released');
        }
        process.exit(0);
    }
}

runMigration();
