import pool from './config/database.js';

async function testPermitApplicant() {
    let conn;
    try {
        conn = await pool.getConnection();
        
        // Check user_account table - show all users
        console.log('=== USER ACCOUNTS IN DATABASE ===');
        const users = await conn.query(`SELECT user_id, username, first_name, last_name, account_type FROM User_Account`);
        console.log('Total user accounts:', users.length);
        console.log('\nAll users:');
        users.forEach(u => {
            console.log(`  - ID: ${u.user_id}, Username: "${u.username}", Name: ${u.first_name} ${u.last_name}, Type: ${u.account_type}`);
        });

        // Check Permit_Applicant records
        console.log('\n=== PERMIT APPLICANTS IN DATABASE ===');
        const applicants = await conn.query(`SELECT * FROM Permit_Applicant`);
        console.log('Total permit applicants:', applicants.length);
        if (applicants.length > 0) {
            console.log('\nAll applicants:');
            applicants.forEach(a => {
                console.log(`  - ID: ${a.applicant_id}, Username: "${a.username}"`);
            });
        }

        // Check if sp_InsertPermitApplicant returns an error correctly
        console.log('\n=== TESTING STORED PROCEDURE ===');
        console.log('Testing insert with NON-EXISTENT username "fake_user_123"...');
        try {
            await conn.query(
                `CALL sp_InsertPermitApplicant(?, ?, ?, ?, ?, ?, @p_applicant_id)`,
                ['fake_user_123', '09123456789', '123-456-789', '051724003', '123', 'Test Street']
            );
            const result = await conn.query('SELECT @p_applicant_id as applicant_id');
            console.log('Result:', result[0]);
        } catch (e) {
            console.log('Expected FK error:', e.message);
        }

        // Test with an EXISTING username (app.permit@gmail.com should be the applicant account)
        const applicantUser = users.find(u => u.username === 'app.permit@gmail.com');
        if (applicantUser) {
            console.log(`\nTesting insert with EXISTING username "${applicantUser.username}"...`);
            try {
                await conn.query(
                    `CALL sp_InsertPermitApplicant(?, ?, ?, ?, ?, ?, @p_applicant_id)`,
                    [applicantUser.username, '09123456789', '123-456-789', '051724003', '123', 'Test Street']
                );
                const result = await conn.query('SELECT @p_applicant_id as applicant_id');
                console.log('SUCCESS! New applicant_id:', result[0].applicant_id);
            } catch (e) {
                console.log('Error:', e.message);
            }
        } else {
            console.log('\nNo applicant user found (app.permit@gmail.com)');
        }

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        if (conn) conn.release();
        process.exit(0);
    }
}

testPermitApplicant();
