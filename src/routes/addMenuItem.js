const db = require('../persistence');
const uuid = require('uuid/v4');

// Used to add a NEW menu item to the DB
module.exports = async (req, res) => {
    const menu_item_info = {
        menu_item_id: uuid(),
        item_name: req.body.item_name,
        crust: req.body.crust,
        sm_price: req.body.sm_price,
        med_price: req.body.med_price,
        lg_price: req.body.lg_price,
        xlg_price: req.body.xlg_price,
        description: req.body.description
    };
    const toppingIDs = req.body.toppings;
    await db.storeNewItem(menu_item_info);
    for(let i = 0; i < toppingIDs.length; i++){
        let topping_info = {
            menu_item_id: menu_item_info.menu_item_id,
            topping_id: toppingIDs[i]
        };
        await db.updateMenuItemToppings(topping_info);
    }
    res.send(menu_item_info);
};
