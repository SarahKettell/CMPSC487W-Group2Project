const db = require('../persistence');
const uuid = require('uuid/v4');

// Used to add a NEW menu item to the DB
module.exports = async (req, res) => {
    const order_info = {
        order_id: uuid(),
        customer_id: req.body.customer_id,
        date_time_created: req.body.date_time_created,
        date_time_checked_out: req.body.date_time_checked_out,
        date_time_scheduled: req.body.date_time_scheduled,
        date_time_completed: req.body.date_time_completed,
        order_type: req.body.order_type,
        notes: req.body.notes,
        payment_type: req.body.payment_type,
        sub_total_price: req.body.sub_total_price,
        tax_price: req.body.tax_price,
        tip_price: req.body.tip_price,
        total_price: req.body.total_price,
        checked_out: req.body.checked_out,
        completed: req.body.completed
    };
    await db.addNewOrder(order_info);

    const order_item_info = {
        order_item_id: uuid(),
        order_id: order_info.order_id,
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
    res.send(order_info);
};
