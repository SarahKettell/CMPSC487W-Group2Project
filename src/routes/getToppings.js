const db = require('../persistence');

// Gets a JSON-structured list of all toppings in the DB
const getAllToppings = async (req, res) => {
    const toppings = await db.getToppings();
    res.send(toppings);
};

// Gets a JSON-structured list toppings for a menu item
const getMenuToppings = async (req, res) => {
    const toppings = await db.getMenuItemToppings(req.params.id);
    res.send(toppings);
};


module.exports = {
	getAllToppings,
	getMenuToppings
};
