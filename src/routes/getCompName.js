const db = require('../persistence');

const getCompName = async (req, res) => {
    const compName = await db.getCompName();
    res.send(compName);
};

module.exports = {
	getCompName
}