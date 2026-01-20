-- Migration to modify BPA_Construction table
-- This makes lot owner and supervisor fields nullable and adds is_draft column

-- Step 1: Check if is_draft column exists, if not add it
-- Run this statement (will error if column exists, that's ok)
ALTER TABLE BPA_Construction ADD COLUMN is_draft BOOLEAN DEFAULT TRUE;

-- Step 2: Make foreign key columns nullable
-- First, we need to drop the foreign key constraints, modify columns, then re-add constraints

-- Drop foreign key constraints (names may vary, check your database)
-- If these fail, use SHOW CREATE TABLE BPA_Construction to find the actual constraint names
SET FOREIGN_KEY_CHECKS = 0;

-- Modify columns to be nullable
ALTER TABLE BPA_Construction MODIFY COLUMN bpacs_lot_owner_id INTEGER NULL;
ALTER TABLE BPA_Construction MODIFY COLUMN bpacs_lo_gov_id INTEGER NULL;  
ALTER TABLE BPA_Construction MODIFY COLUMN bpac_supervisor_id INTEGER NULL;
ALTER TABLE BPA_Construction MODIFY COLUMN applicant_gov_id INTEGER NULL;

-- Also make some other fields nullable/have defaults for draft saving
ALTER TABLE BPA_Construction MODIFY COLUMN workscope_remarks VARCHAR(255) NULL DEFAULT '';
ALTER TABLE BPA_Construction MODIFY COLUMN ou_type_others VARCHAR(255) NULL;
ALTER TABLE BPA_Construction MODIFY COLUMN num_units INTEGER NULL DEFAULT 0;
ALTER TABLE BPA_Construction MODIFY COLUMN num_storey INTEGER NULL DEFAULT 0;
ALTER TABLE BPA_Construction MODIFY COLUMN total_floor_area DECIMAL(15,2) NULL DEFAULT 0;
ALTER TABLE BPA_Construction MODIFY COLUMN lot_area DECIMAL(15,2) NULL DEFAULT 0;
ALTER TABLE BPA_Construction MODIFY COLUMN building_cost DECIMAL(15,2) NULL DEFAULT 0;
ALTER TABLE BPA_Construction MODIFY COLUMN electrical_cost DECIMAL(15,2) NULL DEFAULT 0;
ALTER TABLE BPA_Construction MODIFY COLUMN electrical_equipment_cost DECIMAL(15,2) NULL DEFAULT 0;
ALTER TABLE BPA_Construction MODIFY COLUMN mechanical_cost DECIMAL(15,2) NULL DEFAULT 0;
ALTER TABLE BPA_Construction MODIFY COLUMN mechanical_equipment_cost DECIMAL(15,2) NULL DEFAULT 0;
ALTER TABLE BPA_Construction MODIFY COLUMN electronic_cost DECIMAL(15,2) NULL DEFAULT 0;
ALTER TABLE BPA_Construction MODIFY COLUMN electronic_equipment_cost DECIMAL(15,2) NULL DEFAULT 0;
ALTER TABLE BPA_Construction MODIFY COLUMN plumbing_cost DECIMAL(15,2) NULL DEFAULT 0;
ALTER TABLE BPA_Construction MODIFY COLUMN plumbing_equipment_cost DECIMAL(15,2) NULL DEFAULT 0;
ALTER TABLE BPA_Construction MODIFY COLUMN construction_date DATE NULL;
ALTER TABLE BPA_Construction MODIFY COLUMN completion_date DATE NULL;

SET FOREIGN_KEY_CHECKS = 1;

-- Verify the changes
DESCRIBE BPA_Construction;
