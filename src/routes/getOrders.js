const db = require('../persistence');

// Gets a list of toppings
module.exports = async (req, res) => {
    const orders = await db.getOrders();
    res.send(orders);
};
