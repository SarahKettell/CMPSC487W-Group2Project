const db = require('../persistence');

const getZip = async (req, res) => {
    const zip = await db.getZip();
    res.send(zip);
};

module.exports = {
	getZip
}