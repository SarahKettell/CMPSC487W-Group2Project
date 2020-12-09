const db = require('../persistence');
const uuid = require('uuid/v4');

// Used to add a NEW account to the DB for customers
module.exports = async (req, res) => {
    const account_info = {
        id: uuid(),
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password,
        acct_type: req.body.acct_type
    };
    await db.storeNewAccount(account_info);
    res.send(account_info);
};
