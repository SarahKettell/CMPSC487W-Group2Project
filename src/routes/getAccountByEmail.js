const db = require('../persistence');

//gets account info by searching through email
module.exports = async (req, res) => {
    const account = await db.getAccountByEmail();
    res.send(account);
    
};