const db = require('../persistence');

// Gets a list of toppings
module.exports = async (req, res) => {
    const menu_item_toppings = await db.getMenuItemToppings();
    res.send(menu_item_toppings);
};
