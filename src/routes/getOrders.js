const db = require('../persistence');

// Gets the orders themselves, not including associated
// menu items and toppings
const getOrders = async (req, res) => {
    const orders = await db.getOrders();
    res.send(orders);
};

// Get the individual items from an order
const getOrderItems = async (req, res) => {
    const order_items = await db.getOrderItems();
    res.send(order_items);
};

// Get the topping IDS associated with an order
const getOrderItemToppingIds = async (req, res) => {
    const topping_ids = await db.getOrderItemToppings();
    res.send(topping_ids);
};

module.exports = {
    getOrders,
    getOrderItems,
    getOrderItemToppingIds
};
