// This file controls the communication between server and client
// side of the app
const express = require('express');
const app = express();
const db = require('./persistence');
// defines the paths through routes
const menuItems = require('./routes/getMenuItems');
const toppings = require('./routes/getToppings');
const getOrders = require('./routes/getOrders');
const getOrderItems = require('./routes/getOrderItems');
const addMenuItem = require('./routes/addMenuItem');
const updateItem = require('./routes/updateItem');
const updateMenuItemByID = require('./routes/updateMenuItem');
const deleteItem = require('./routes/deleteItem');

const getAddrInfo = require('./routes/getAddrInfo');
const updateAddrInfo = require('./routes/updateAddrInfo');

const getContactInfo = require('./routes/getContactInfo');
const updateContactInfo = require('./routes/updateContactInfo');

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
app.get('/orders', getOrders);
app.get('/orderItems', getOrderItems);

app.get('/address', getAddrInfo);

app.get('/contact', getContactInfo);

// Add new menu item into the db
app.post('/menuItems', addMenuItem);

// Updates contents based the id parameter given
//app.put('/items/:id', updateItem);

app.put('/address/:id', updateAddrInfo);

app.put('/contact/:id', updateContactInfo);

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
