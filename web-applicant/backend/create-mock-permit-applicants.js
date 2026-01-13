import pool from './config/database.js';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Mock Permit Applicant Data Generator
 * Creates sample permit applicant records for testing
 */

const mockApplicants = [
    {
        user_id: 1,
        lastname: 'Dela Cruz',
        firstname: 'Juan',
        middlename: 'Santos',
        contact_no: '09171234567',
        tin_no: '123-456-789-000',
        brgy_code: 'BRG001',
        house_no: '123',
        street: 'Rizal Street'
    },
    {
        user_id: 2,
        lastname: 'Garcia',
        firstname: 'Maria',
        middlename: 'Reyes',
        contact_no: '09281234567',
        tin_no: '234-567-890-000',
        brgy_code: 'BRG002',
        house_no: '456',
        street: 'Bonifacio Avenue'
    },
    {
        user_id: 3,
        lastname: 'Ramos',
        firstname: 'Pedro',
        middlename: 'Cruz',
        contact_no: '09391234567',
        tin_no: '345-678-901-000',
        brgy_code: 'BRG003',
        house_no: '789',
        street: 'Mabini Street'
    },
    {
        user_id: 4,
        lastname: 'Santos',
        firstname: 'Ana',
        middlename: 'Flores',
        contact_no: '09451234567',
        tin_no: '456-789-012-000',
        brgy_code: 'BRG001',
        house_no: '321',
        street: 'Del Pilar Street'
    },
    {
        user_id: 5,
        lastname: 'Bautista',
        firstname: 'Jose',
        middlename: 'Torres',
        contact_no: '09561234567',
        tin_no: '567-890-123-000',
        brgy_code: 'BRG002',
        house_no: '654',
        street: 'Luna Street'
    }
];

/**
 * Insert mock permit applicants into database
 */
async function createMockPermitApplicants() {
    console.log('🚀 Starting mock permit applicant creation...\n');

    try {
        for (const applicant of mockApplicants) {
            const {
                user_id,
                lastname,
                firstname,
                middlename,
                contact_no,
                tin_no,
                brgy_code,
                house_no,
                street
            } = applicant;

            // Call the stored procedure
            await pool.query(
                `CALL sp_InsertPermitApplicant(?, ?, ?, ?, ?, ?, ?, ?, ?, @p_applicant_id)`,
                [user_id, lastname, firstname, middlename, contact_no, tin_no, brgy_code, house_no, street]
            );

            // Get the generated applicant_id
            const [rows] = await pool.query('SELECT @p_applicant_id AS applicant_id');
            const applicantId = rows[0].applicant_id;

            console.log(`✅ Created permit applicant: ${firstname} ${lastname} (ID: ${applicantId})`);
        }

        console.log('\n🎉 Successfully created all mock permit applicants!');

        // Display summary
        const [count] = await pool.query('SELECT COUNT(*) as total FROM tbl_permit_applicant');
        console.log(`\n📊 Total permit applicants in database: ${count[0].total}`);

    } catch (error) {
        console.error('❌ Error creating mock permit applicants:', error.message);
        throw error;
    } finally {
        await pool.end();
        console.log('\n🔌 Database connection closed');
    }
}

// Run the script
createMockPermitApplicants().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
