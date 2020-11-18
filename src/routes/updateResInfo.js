const db = require('../persistence');

//Used to update the current restaurant information
module.exports = async (req, res) => {
    const rest_info = {
        company_name: req.body.company_name,
        street_address: req.body.street_address,
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code,
    };
    console.log(rest_info);
    await db.updateResInfo(rest_info);
    res.send(rest_info);
};
