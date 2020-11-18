const db = require('../persistence');

// TODO: Needs to be customized to work with the pizza-parlor DB
module.exports = async (req, res) => {
    const contact_info = (req.params.id, {
        phone: req.body.phone,
        email: req.body.email,
    });
    console.log(contact_info);
    await db.updateContactInfo(contact_info);
    res.send(contact_info);
};



