const db = require('../persistence');

// TODO: Needs to be customized to work with the pizza-parlor DB
module.exports = async (req, res) => {
    const account_info = (req.params.id, {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
    });
    console.log("updateCustAccountInfo.js from routes: " + account_info);
    await db.updateCustAccountInfo(account_info);
    res.send(account_info);
};



