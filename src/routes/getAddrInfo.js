const db = require('../persistence');

//gets a list of address information for the restaurant
module.exports = async (req, res) => {
    const addrInfo = await db.getAddrInfo();
    res.send(addrInfo);
    
};