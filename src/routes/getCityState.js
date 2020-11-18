const db = require('../persistence');

const getCityState = async (req, res) => {
    const cityState = await db.getCityState();
    res.send(cityState);
};

module.exports = {
	getCityState
}