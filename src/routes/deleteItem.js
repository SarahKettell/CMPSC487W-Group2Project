const db = require('../persistence');


// TODO: Customize to delete an item from the pizza-parlor menu_items
module.exports = async (req, res) => {
    await db.removeItem(req.params.id);
    res.sendStatus(200);
};
