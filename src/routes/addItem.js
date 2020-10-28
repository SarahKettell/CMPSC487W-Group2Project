const db = require('../persistence');
const uuid = require('uuid/v4');

// Used to add a NEW menu item to the DB
module.exports = async (req, res) => {
    const menu_item = {
        item_id: uuid(),
        pizza_name: req.body.name,
        crust: req.body.crust,
        sauce: req.body.sauce,
        cheese: req.body.cheese,
        toppings: req.body.toppings,
        sm_price: req.body.sm_price,
        med_price: req.body.med_price,
        lg_price: req.body.lg_price,
        xlg_price: req.body.xlg_price,
        description: req.body.description
    };

    await db.storeItem(menu_item);
    res.send(menu_item);
};
