// Connections to the Database
// Server side functions
const waitPort = require('wait-port');
const fs = require('fs');
const mysql = require('mysql');

const {
    MYSQL_HOST: HOST,
    MYSQL_HOST_FILE: HOST_FILE,
    MYSQL_USER: USER,
    MYSQL_USER_FILE: USER_FILE,
    MYSQL_PASSWORD: PASSWORD,
    MYSQL_PASSWORD_FILE: PASSWORD_FILE,
    MYSQL_DB: DB,
    MYSQL_DB_FILE: DB_FILE,
} = process.env;

let pool;


// Initializes the menu_items table if needed
// TODO: Expand later on to more tables
async function init() {
    const host = HOST_FILE ? fs.readFileSync(HOST_FILE) : HOST;
    const user = USER_FILE ? fs.readFileSync(USER_FILE) : USER;
    const password = PASSWORD_FILE ? fs.readFileSync(PASSWORD_FILE) : PASSWORD;
    const database = DB_FILE ? fs.readFileSync(DB_FILE) : DB;

    await waitPort({ host, port : 3306});

    pool = mysql.createPool({
        connectionLimit: 5,
        host,
        user,
        password,
        database,
    });

    return new Promise((acc, rej) => {
        pool.query(
            'CREATE TABLE IF NOT EXISTS menu_items (item_id varchar(36), pizza_name varchar(250), crust varchar(250), sauce varchar(250), cheese varchar(250), toppings varchar(250), sm_price varchar(10), med_price varchar(10), lg_price varchar(250), xlg_price varchar(10), description varchar(500))',
            err => {
                if (err) return rej(err);

                console.log(`Connected to mysql db at host ${HOST}`);
                acc();
            },
        );
    });
}


// Proper disconnection from the DB
async function teardown() {
    return new Promise((acc, rej) => {
        pool.end(err => {
            if (err) rej(err);
            else acc();
        });
    });
}


// Gets the menu items
async function getItems() {
    return new Promise((acc, rej) => {
        pool.query('SELECT * FROM menu_items', (err, rows) => {
            if (err) return rej(err);
            acc(
                rows.map(item =>
                    Object.assign({}, item, {
                        completed: item.completed === 1,
                    }),
                ),
            );
        });
    });
}

// Get a specific item
// TODO: Needs to be customized to match our db. This is from a tutorial get
async function getItem(id) {
    return new Promise((acc, rej) => {
        pool.query('SELECT * FROM todo_items WHERE id=?', [id], (err, rows) => {
            if (err) return rej(err);
            acc(
                rows.map(item =>
                    Object.assign({}, item, {
                        completed: item.completed === 1,
                    }),
                )[0],
            );
        });
    });
}


// Add a NEW item to the menu_items table
async function storeItem(item) {
    return new Promise((acc, rej) => {
        pool.query(
            'INSERT INTO menu_items (item_id, pizza_name, crust, sauce, cheese, toppings, sm_price, med_price, lg_price, xlg_price, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [item.item_id, item.pizza_name, item.crust, item.sauce, item.cheese, item.toppings, item.sm_price, item.med_price, item.lg_price, item.xlg_price, item.description],
            err => {
                if (err) return rej(err);
                acc();
            },
        );
    });
}


// Update a specific item in the DB
// TODO: Needs to be changed to match our DB
async function updateItem(id, item) {
    return new Promise((acc, rej) => {
        pool.query(
            'UPDATE todo_items SET name=?, completed=? WHERE id=?',
            [item.name, item.completed ? 1 : 0, id],
            err => {
                if (err) return rej(err);
                acc();
            },
        );
    });
}


// Remove an item from the database
// TODO: Needs to be changed to match our DB
async function removeItem(id) {
    return new Promise((acc, rej) => {
        pool.query('DELETE FROM todo_items WHERE id = ?', [id], err => {
            if (err) return rej(err);
            acc();
        });
    });
}


// Defines the export functions above
// Need to change this if you create more
module.exports = {
    init,
    teardown,
    getItems,
    getItem,
    storeItem,
    updateItem,
    removeItem,
};
