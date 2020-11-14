// This file controls the communication between server and client
// side of the app
const express = require('express');
const app = express();
const db = require('./persistence');
// defines the paths through routes
const getItems = require('./routes/getItems');
const toppings = require('./routes/getToppings');
const getOrders = require('./routes/getOrders');
const getOrderItems = require('./routes/getOrderItems');
const addItem = require('./routes/addItem');
const updateItem = require('./routes/updateItem');
const deleteItem = require('./routes/deleteItem');

/*const getCompName = require('./routes/getCompName');
const getStreetAddr = require('./routes/getStreetAddr');
const getCityState = require('./routes/getCityState');
const getZip = require('./routes/getZip');
const getPhone = require('./routes/getPhone');
const getEmail = require('./routes/getEmail'); */

const getAddrInfo = require('./routes/getAddrInfo');
const updateAddrInfo = require('./routes/updateAddrInfo');
//const getContactInfo = require('./routes/getContactInfo');

// Converts into JSON format
app.use(require('body-parser').json());
app.use(express.static(__dirname + '/static'));

// Retrieves contents from the backend to a retrieveable location
// to the client side
app.get('/items', getItems);
app.get('/toppings', toppings.getAllToppings);
app.get('/toppings/:id', toppings.getMenuToppings);
app.get('/orders', getOrders);
app.get('/orderItems', getOrderItems);

/*app.get('/compName', getCompName);
app.get('/streetAddr', getStreetAddr);
app.get('/cityState', getCityState);
app.get('/zip', getZip);
app.get('/phone', getPhone);
app.get('/email', getEmail); */

app.get('/address', getAddrInfo);
//app.get('/contact', getContactInfo);

// Add contents into the server from the client-side
app.post('/items', addItem);

// Updates contents based the id parameter given
app.put('/items/:id', updateItem);
//app.put('/compName/:id', updateResInfo);
app.put('/address/:id', updateAddrInfo);

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
