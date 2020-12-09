const db = require('../persistence');

//gets account via Id
module.exports = async (req, res) => {
    const account = await db.getAccountById();
    res.send(account);
    
};