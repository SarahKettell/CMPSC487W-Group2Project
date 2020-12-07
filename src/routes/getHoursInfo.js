const db = require('../persistence');

//gets a list of address information for the restaurant
module.exports = async (req, res) => {
    const hoursInfo = await db.getHoursInfo();
    res.send(hoursInfo);
    
};