const db = require('../persistence');

// Gets a list of toppings
module.exports = async (req, res) => {
    const order_items = await db.getOrderItems();
    res.send(order_items);
};
