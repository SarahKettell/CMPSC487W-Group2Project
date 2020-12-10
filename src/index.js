// This file controls the communication between server and client
// side of the app
const express = require('express');
const app = express();
const db = require('./persistence');

// defines the paths through routes
const menuItems = require('./routes/getMenuItems');
const toppings = require('./routes/getToppings');
const addMenuItem = require('./routes/addMenuItem');
const updateItem = require('./routes/updateItem');
const updateMenuItemByID = require('./routes/updateMenuItem');
const deleteItem = require('./routes/deleteItem');

const getOrders = require('./routes/getOrders');
const updateOrder = require('./routes/updateOrder');
const addOrder = require('./routes/addAdminOrder');

const getAddrInfo = require('./routes/getAddrInfo');
const updateAddrInfo = require('./routes/updateAddrInfo');

const getContactInfo = require('./routes/getContactInfo');
const updateContactInfo = require('./routes/updateContactInfo');

const getHoursInfo = require('./routes/getHoursInfo');
const updateHoursInfo = require('./routes/updateHoursInfo');

const addAccount = require('./routes/addAccount');
const getAllAccounts = require('./routes/getAllAccounts');
const getAccountByEmail = require('./routes/getAccountByEmail');
const getAccountById = require('./routes/getAccountById');
const updateCustAccountInfo = require('./routes/updateCustAccountInfo');

// Converts into JSON format
app.use(require('body-parser').json());
app.use(express.static(__dirname + '/static'));

// Retrieves contents from the backend to a retrieveable location
// to the client side
app.get('/menuItems', menuItems.getAllMenuItems);
app.get('/menuItemToppings', menuItems.getMenuItemToppingIds);
app.put('/menuItems/:id', updateMenuItemByID);
app.get('/toppings', toppings.getAllToppings);
app.get('/toppings/:id', toppings.getMenuToppings);

// handling order db calls
app.get('/orders', getOrders.getOrders);
app.get('/orderItems', getOrders.getOrderItems);
app.get('/orderItemToppings', getOrders.getOrderItemToppingIds);
app.put('/orders/admin/:id', updateOrder.completeOrder);
app.post('/orders/admin', addOrder.addNewOrder);
app.put('/orders/admin', addOrder.updateOrder);

// handling restaurant info calls
app.get('/address', getAddrInfo);
app.get('/contact', getContactInfo);
app.get('/hours', getHoursInfo);

// handling account info calls
app.get('/accountByEmail', getAccountByEmail);
app.get('/accountById', getAccountById);
app.get('/account', getAllAccounts);

// Add new menu item into the db
app.post('/menuItems', addMenuItem);

// Add account into the db
app.post('/account', addAccount);

// Updates contents based the id parameter given
//app.put('/items/:id', updateItem);

//updates Restaurant information
app.put('/address/:id', updateAddrInfo);
app.put('/contact/:id', updateContactInfo);
app.put('/hours/:id', updateHoursInfo);

//update Account information
app.put('/account/:id', updateCustAccountInfo);

// Deletes contents based on the id paramter given
app.delete('/items/:id', deleteItem);

// Initializes the database connection, creates tables if needed
db.init().then(() => {
    app.listen(3000, () => console.log('Listening on port 3000'));
}).catch((err) => {
    console.error(err);
    process.exit(1);
});

// Shuts down the connection
const gracefulShutdown = () => {
    db.teardown()
        .catch(() => {})
        .then(() => process.exit());
};
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown); // Sent by nodemon
