const db = require('../persistence');

const getStreetAddr = async (req, res) => {
    const streetAddr = await db.getStreetAddr();
    res.send(streetAddr);
};

module.exports = {
	getStreetAddr
}