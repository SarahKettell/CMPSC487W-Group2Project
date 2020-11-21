const db = require('../persistence');

// Gets a list of menu items
const getAllMenuItems = async (req, res) => {
    const menu_items = await db.getMenuItems();
    res.send(menu_items);
};

// Gets a JSON-structured list toppings for a menu item
const getMenuItemToppingIds = async (req, res) => {
    const toppings = await db.getMenuItemToppingIDs();
    res.send(toppings);
};

module.exports = {
    getAllMenuItems,
    getMenuItemToppingIds
};
