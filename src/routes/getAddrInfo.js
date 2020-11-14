const db = require('../persistence');


module.exports = async (req, res) => {
    console.log('bryan test');
    const addrInfo = await db.getAddrInfo();
    res.send(addrInfo);
    
};