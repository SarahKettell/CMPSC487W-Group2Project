const db = require('../persistence');

//gets a list of all accounts for the restaurant including both customer and staff
module.exports = async (req, res) => {
    const accounts = await db.getAllAccounts();
    res.send(accounts);
    
};