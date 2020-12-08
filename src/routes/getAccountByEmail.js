const db = require('../persistence');

//gets account info by searching through email
module.exports = async (req, res) => {
    console.log("routes account test: ");
    const account = await db.getAccountByEmail(req.params.id);
    res.send(account);
    
};