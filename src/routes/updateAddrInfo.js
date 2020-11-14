const db = require('../persistence');

// TODO: Needs to be customized to work with the pizza-parlor DB
module.exports = async (req, res) => {
    const addr_info = (req.params.id, {
        company_name: req.body.company_name,
        street_address: req.body.street_address,
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code,
    });
    console.log(addr_info);
    await db.updateAddrInfo(addr_info);
    res.send(addr_info);
};



