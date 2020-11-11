const express = require('express');
const app = express();
const db = require('./persistence');
const getItems = require('./routes/getItems');
const getToppings = require('./routes/getToppings');
const getOrders = require('./routes/getOrders');
const getOrderItems = require('./routes/getOrderItems');
const getMenuItemToppings = require('./routes/getMenuItemToppings');
const getOrderItemToppings = require('./routes/getOrderItemToppings');
const addItem = require('./routes/addItem');
const updateItem = require('./routes/updateItem');
const deleteItem = require('./routes/deleteItem');

app.use(require('body-parser').json());
app.use(express.static(__dirname + '/static'));

// get the JSON data from each table
// NOTE: May not want to actually display the database info like this
// in final build. Good for troubleshooting now though.
app.get('/items', getItems);
app.get('/toppings', getToppings);
app.get('/orders', getOrders);
app.get('/orderItems', getOrderItems);
app.get('/menuItemToppings', getMenuItemToppings);
app.get('/orderItemToppings', getOrderItemToppings);


app.post('/items', addItem);
app.put('/items/:id', updateItem);
app.delete('/items/:id', deleteItem);

db.init().then(() => {
    app.listen(3000, () => console.log('Listening on port 3000'));
}).catch((err) => {
    console.error(err);
    process.exit(1);
});

const gracefulShutdown = () => {
    db.teardown()
        .catch(() => {})
        .then(() => process.exit());
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown); // Sent by nodemon
