const db = require('../persistence');

const getPhone = async (req, res) => {
    const phone = await db.getPhone();
    res.send(phone);
};

module.exports = {
	getPhone
}