const db = require('../persistence');
const uuid = require('uuid/v4');

// Used to add a menu item to the DB
module.exports = async (req, res) => {
    const menu_item = {
        item_id: uuid(),
        pizza_name: 'Plain Cheese',
        crust: 'thin',
        sauce: 'white',
        cheese: 'three cheese blend',
        toppings: 'none',
        sm_price: '6.00',
        med_price: '8.00',
        lg_price: '10.00',
        xlg_price: '12.00',
        description: 'It has cheese only.'
    };

    await db.storeItem(menu_item);
    res.send(menu_item);
};

// // Used to add a menu item to the DB
// module.exports = async (req, res) => {
//     const menu_item = {
//         item_id: uuid(),
//         pizza_name: req.body.name,
//         crust: req.body.crust,
//         sauce: req.body.sauce,
//         cheese: req.body.cheese,
//         toppings: req.body.toppings,
//         sm_price: req.body.sm_price,
//         med_price: req.body.med_price,
//         lg_price: req.body.lg_price,
//         xlg_price: req.body.xlg_price,
//         description: req.body.description
//     };

//     await db.storeItem(menu_item);
//     res.send(menu_item);
// };
