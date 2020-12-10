const db = require('../persistence');
const uuid = require('uuid/v4');

// Gets the orders themselves, not including associated
// menu items and toppings
const addNewOrder = async (req, res) => {
    const cust_id = req.body.order.customer_id ? req.body.order.customer_id : uuid();
    const orderID = uuid();
    const order = {
        order_id: orderID,
        customer_id: cust_id,
        first_name: req.body.order.first_name,
        last_name: req.body.order.last_name,
        email: req.body.order.email,
        address1: req.body.order.addr,
        address2: req.body.order.addr2,
        addr_city: req.body.order.city,
        addr_state: req.body.order.state,
        addr_zip: req.body.order.zip,
        date_time_created: req.body.order.date_time_created,
        date_time_checked_out: req.body.order.date_time_checked_out,
        date_time_scheduled: req.body.order.date_time_scheduled,
        date_time_completed: req.body.order.date_time_completed,
        order_type: req.body.order.order_type,
        notes: req.body.order.notes,
        payment_type: req.body.order.payment_type,
        sub_total_price: req.body.order.sub_total_price,
        tax_price: req.body.order.tax_price,
        tip_price: req.body.order.tip_price,
        total_price: req.body.order.total_price,
        checked_out: req.body.order.checked_out,
        completed: req.body.order.completed,
    }
    await db.addNewAdminOrder(order);
    // send the order to be saved here
    for(let i = 0; i < req.body.items.length; i++){
        // create a new order item for each in this order
        let currItem = req.body.items[i];
        let newItemID =  uuid();
        const newItem = {
            order_item_id: newItemID,
            order_id: orderID,
            item_name: currItem.orderItem.item_name,
            crust: currItem.orderItem.crust,
            size: currItem.orderItem.size,
            price: currItem.orderItem.price,
            notes: currItem.orderItem.notes
        }
        await db.addNewAdminOrderItem(newItem);
        // send the item to be saved here
        for(let j = 0; j < req.body.items[i].toppings.length; j++){
            let topping_info = {
                order_item_id: newItemID,
                topping_id: currItem.toppings[j]
            };
            await db.updateOrderItemToppings(topping_info);
        }
    }
    res.send(order);
};

const updateOrder = async (req, res) => {
    console.log("Got to update order");
    const cust_id = req.body.order.customer_id;
    const orderID = req.body.order.order_id;

    //await db.deleteAdminOrder(orderID);
    const order = {
        order_id: 1234,
        customer_id: cust_id,
        first_name: req.body.order.first_name,
        last_name: req.body.order.last_name,
        email: req.body.order.email,
        address1: req.body.order.addr,
        address2: req.body.order.addr2,
        addr_city: req.body.order.city,
        addr_state: req.body.order.state,
        addr_zip: req.body.order.zip,
        date_time_created: req.body.order.date_time_created,
        date_time_checked_out: req.body.order.date_time_checked_out,
        date_time_scheduled: req.body.order.date_time_scheduled,
        date_time_completed: req.body.order.date_time_completed,
        order_type: req.body.order.order_type,
        notes: req.body.order.notes,
        payment_type: req.body.order.payment_type,
        sub_total_price: req.body.order.sub_total_price,
        tax_price: req.body.order.tax_price,
        tip_price: req.body.order.tip_price,
        total_price: req.body.order.total_price,
        checked_out: req.body.order.checked_out,
        completed: req.body.order.completed,
    }
    //await db.addNewAdminOrder(order);
    // // send the order to be saved here
    // for(let i = 0; i < req.body.items.length; i++){
    //     // create a new order item for each in this order
    //     let currItem = req.body.items[i];
    //     let newItemID =  uuid();
    //     const newItem = {
    //         order_item_id: newItemID,
    //         order_id: orderID,
    //         item_name: currItem.orderItem.item_name,
    //         crust: currItem.orderItem.crust,
    //         size: currItem.orderItem.size,
    //         price: currItem.orderItem.price,
    //         notes: currItem.orderItem.notes
    //     }
    //     await db.addNewAdminOrderItem(newItem);
    //     // send the item to be saved here
    //     for(let j = 0; j < req.body.items[i].toppings.length; j++){
    //         let topping_info = {
    //             order_item_id: newItemID,
    //             topping_id: currItem.toppings[j]
    //         };
    //         await db.updateOrderItemToppings(topping_info);
    //     }
    // }
    res.send(order);
};

module.exports = {
    addNewOrder,
    updateOrder
};