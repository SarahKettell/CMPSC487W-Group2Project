const db = require('../persistence');

const getEmail = async (req, res) => {
    const email = await db.getEmail();
    res.send(email);
};

module.exports = {
	getEmail
}