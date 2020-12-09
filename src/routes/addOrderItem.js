const db = require('../persistence');
const uuid = require('uuid/v4');

// Used to add a NEW menu item to the DB
module.exports = async (req, res) => {
    const order_item_info = {
        order_item_id: uuid(),
        order_id: req.body.order_id,
        item_name: req.body.item_name,
        crust: req.body.crust,
        size: req.body.size,
        price: req.body.price,
        item_notes: req.body.item_notes
    };
    await db.addNewOrderItem(order_item_info);

    const toppingIDs = req.body.toppings;


    for(let i = 0; i < toppingIDs.length; i++){
        let topping_info = {
            order_item_id: order_item_info.order_item_id,
            topping_id: toppingIDs[i]
        };
        await db.updateOrderItemToppings(topping_info);
    }
    res.send(order_item_info);
};