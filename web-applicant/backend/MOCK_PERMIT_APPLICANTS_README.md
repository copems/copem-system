# Mock Permit Applicant Data Generator

This script creates sample permit applicant records in the database for testing purposes.

## Prerequisites

1. Database is set up and running
2. The stored procedure `sp_InsertPermitApplicant` exists
3. The table `tbl_permit_applicant` exists
4. User accounts with IDs 1-5 exist in the system

## Running the Script

### From the backend directory:

```bash
cd c:\copem-system\web-applicant\backend
node create-mock-permit-applicants.js
```

## Mock Data Created

The script creates 5 permit applicant records:

1. **Juan Santos Dela Cruz**
   - User ID: 1
   - Contact: 09171234567
   - TIN: 123-456-789-000
   - Address: 123 Rizal Street, BRG001

2. **Maria Reyes Garcia**
   - User ID: 2
   - Contact: 09281234567
   - TIN: 234-567-890-000
   - Address: 456 Bonifacio Avenue, BRG002

3. **Pedro Cruz Ramos**
   - User ID: 3
   - Contact: 09391234567
   - TIN: 345-678-901-000
   - Address: 789 Mabini Street, BRG003

4. **Ana Flores Santos**
   - User ID: 4
   - Contact: 09451234567
   - TIN: 456-789-012-000
   - Address: 321 Del Pilar Street, BRG001

5. **Jose Torres Bautista**
   - User ID: 5
   - Contact: 09561234567
   - TIN: 567-890-123-000
   - Address: 654 Luna Street, BRG002

## Expected Output

```
🚀 Starting mock permit applicant creation...

✅ Created permit applicant: Juan Dela Cruz (ID: 1)
✅ Created permit applicant: Maria Garcia (ID: 2)
✅ Created permit applicant: Pedro Ramos (ID: 3)
✅ Created permit applicant: Ana Santos (ID: 4)
✅ Created permit applicant: Jose Bautista (ID: 5)

🎉 Successfully created all mock permit applicants!

📊 Total permit applicants in database: 5

🔌 Database connection closed
```

## Testing the API After Running

Once the mock data is created, you can test the API endpoints:

### Get all permit applicants:
```bash
curl http://localhost:3000/api/permit-applicant
```

### Get permit applicant by ID:
```bash
curl http://localhost:3000/api/permit-applicant/1
```

### Get permit applicant by user ID:
```bash
curl http://localhost:3000/api/permit-applicant/user/1
```

## Troubleshooting

### Error: User ID doesn't exist
Make sure you have created user accounts first. Run:
```bash
node create-test-user.js
```

### Error: Table doesn't exist
Run the database setup script:
```bash
node setup-db.js
```

### Error: Stored procedure doesn't exist
Check that `sp_InsertPermitApplicant` exists in your database.

## Customizing Mock Data

To modify the mock data, edit the `mockApplicants` array in the script:

```javascript
const mockApplicants = [
    {
        user_id: 1,
        lastname: 'Your Last Name',
        firstname: 'Your First Name',
        // ... other fields
    }
];
```
