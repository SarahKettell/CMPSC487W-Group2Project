const db = require('../persistence');

// Updates a menu item in the DB along with all associated toppings
module.exports = async (req, res) => {
    const menu_item_info = (req.params.id, {
        menu_item_id: req.body.menu_item_id,
        item_name: req.body.item_name,
        crust: req.body.crust,
        sm_price: req.body.sm_price,
        med_price: req.body.med_price,
        lg_price: req.body.lg_price,
        xlg_price: req.body.xlg_price,
        description: req.body.description
    });
    const toppingIDs = req.body.toppings;
    await db.updateMenuItem(menu_item_info);
    for(let i = 0; i < toppingIDs.length; i++){
        let topping_info = (req.params.id, {
            menu_item_id: req.body.menu_item_id,
            topping_id: toppingIDs[i]
        });
        await db.updateMenuItemToppings(topping_info);
    }
    res.send(menu_item_info);
};