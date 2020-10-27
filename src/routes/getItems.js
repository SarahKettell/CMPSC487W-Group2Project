const db = require('../persistence');

// Gets a list of menu items
module.exports = async (req, res) => {
    const menu_items = await db.getItems();
    res.send(menu_items);
};
