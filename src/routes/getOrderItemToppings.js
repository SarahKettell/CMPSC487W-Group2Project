const db = require('../persistence');

// Gets a list of toppings
module.exports = async (req, res) => {
    const order_item_toppings = await db.getOrderItemToppings();
    res.send(order_item_toppings);
};
