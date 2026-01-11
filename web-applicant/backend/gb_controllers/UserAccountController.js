import UserAccount from '../gb_models/UserAccount.js';

export const getUserAccountByUsername = async (req, res) => {
    try{
        console.log('UserAccountController: Received request for username:', req.params.username);
        const {username} = req.params;
        const userAccount = await UserAccount.findByUsername(username);
        console.log('UserAccountController: Found user account:', userAccount);
        
        if (!userAccount){
            console.log('UserAccountController: User not found');
            return res.status(404).json({message: 'User account not found'});
        }
        
        console.log('UserAccountController: Sending response');
        res.json(userAccount);
    }
    catch (error){
        console.error('UserAccountController Error:', error);
        console.error('Error stack:', error.stack);
        console.error('Error message:', error.message);
        res.status(500).json({error: 'Server error fetching user account', details: error.message});
    }
};