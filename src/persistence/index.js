// Connections to the Database
// Server side functions
const waitPort = require('wait-port');
const fs = require('fs');
const mysql = require('mysql');

// define all required tables here for ease of reading/editing
const CREATE_MENU_ITEMS = `CREATE TABLE IF NOT EXISTS menu_items(
                        menu_item_id varchar(36),
                        item_name varchar(250) not null,
                        crust varchar(100) not null,
                        sauce varchar(100) not null,
                        sm_price decimal(10,2) not null,
                        med_price decimal(10,2) not null,
                        lg_price decimal(10,2) not null,
                        xlg_price decimal(10,2) not null,
                        description varchar(500) not null,
                        primary key(menu_item_id)
                    )`;

const CREATE_ORDERS = `CREATE TABLE IF NOT EXISTS orders(
                        order_id varchar(36),
                        customer_id varchar(36),
                        date_time_created datetime not null,
                        date_time_checked_out datetime,
                        date_time_scheduled datetime,
                        date_time_completed datetime,
                        type varchar(36),
                        notes varchar(500),
                        payment_type varchar(36),
                        sub_total_price decimal(10,2) not null,
                        tax_price decimal(10,2) not null,
                        tip_price decimal(10,2) not null,
                        total_price decimal(10,2) not null,
                        checked_out boolean not null,
                        completed boolean not null,
                        primary key(order_id)
                    )`;

const CREATE_TOPPINGS = `CREATE TABLE IF NOT EXISTS toppings(
                        topping_id varchar(36),
                        topping_name varchar(100) not null,
                        topping_category varchar(100) not null,
                        in_stock boolean,
                        current_topping boolean,
                        primary key (topping_id)
                    )`;

const CREATE_ORDER_ITEMS = `CREATE TABLE IF NOT EXISTS order_items(
                            order_item_id varchar(36),
                            order_id varchar(36) not null,
                            item_name varchar(100) not null,
                            crust varchar(100) not null,
                            size varchar(36) not null,
                            price decimal(10,2) not null,
                            notes varchar(500),
                            primary key (order_item_id)
                        )`;

const CREATE_ORDER_ITEM_TOPPINGS = `CREATE TABLE IF NOT EXISTS order_item_toppings(
                                    order_item_id varchar(36),
                                    topping_id varchar(36) not null,
                                    primary key (order_item_id)
                                )`;

const CREATE_MENU_ITEM_TOPPINGS = `CREATE TABLE IF NOT EXISTS menu_item_toppings(
                                    menu_item_id varchar(36),
                                    topping_id varchar(36) not null,
                                    primary key (menu_item_id)
                                )`;

const CREATE_ADDRESS_INFO = `CREATE TABLE IF NOT EXISTS address_info(
                                id integer,
                                company_name varchar(50),
                                street_address varchar(100),
                                city varchar(50),
                                state_name varchar(50),
                                zip_code integer(5)
                            )`;

const CREATE_CONTACT_INFO = `CREATE TABLE IF NOT EXISTS contact_info(
                                id integer,
                                phone integer(10),
                                email varchar(100)
                            )`;                           


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

    // Allows up to connectionLimit connections in one pool
    pool = mysql.createPool({
        connectionLimit: 10,
        host,
        user,
        password,
        database,
    });

    // a Promise object represents the eventual completion/failure of an asynch
    // operation and it's resulting value
    let promise = new Promise((acc, rej) => {
        pool.query(
            CREATE_MENU_ITEMS,
            err => {
                if (err) return rej(err);

                console.log(`Connected to mysql db at host ${HOST}`);
                acc();
            },
        );
    })
    .then(() => {
        pool.query(CREATE_ORDERS);
    })
    .then(() => {
        pool.query(CREATE_TOPPINGS);
    })
    .then(() => {
        pool.query(CREATE_ORDER_ITEMS);
    })
    .then(() => {
        pool.query(CREATE_ORDER_ITEM_TOPPINGS);
    })
    .then(() => {
        pool.query(CREATE_MENU_ITEM_TOPPINGS);
    })
    .then(() => {
        pool.query(CREATE_ADDRESS_INFO);
    })
    .then(() => {
        pool.query(CREATE_CONTACT_INFO);
    });
    
    return promise;
}


// Proper disconnection from the DB
// pool.end(err, function)finishes all remaining queries and 
// then closes the connection to the DB
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

// Gets all of the toppings, used for displaying toppings in
// menu/order item customization forms
async function getToppings() {
    return new Promise((acc, rej) => {
        pool.query('SELECT * FROM toppings', (err, rows) => {
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

// Gets toppings for a specific menu item
async function getMenuItemToppings(id) {
    return new Promise((acc, rej) => {
        pool.query('SELECT topping_id, topping_name, topping_category, in_stock, current_topping FROM menu_items NATURAL JOIN menu_item_toppings NATURAL JOIN toppings WHERE menu_item_id=?',
         [id], (err, rows) => {
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

//Get address for restaurant information
async function getAddrInfo() {
    return new Promise((acc, rej) => {
        pool.query('SELECT * FROM address_info', (err, rows) => {
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

//Get contact info for restaurant information
async function getContactInfo() {
    return new Promise((acc, rej) => {
        pool.query('SELECT * FROM contact_info', (err, rows) => {
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

// Gets all orders
async function getOrders() {
    return new Promise((acc, rej) => {
        pool.query('SELECT * FROM orders', (err, rows) => {
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

// Gets all order items
async function getOrderItems() {
    return new Promise((acc, rej) => {
        pool.query('SELECT * FROM order_items', (err, rows) => {
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

// Gets all menu item toppings
async function getOrderItemToppings() {
    return new Promise((acc, rej) => {
        pool.query('SELECT * FROM order_item_toppings', (err, rows) => {
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

// Update a restaurant info in the DB (SURI)
async function updateAddrInfo(arg) {
    console.log(arg);
    
    return new Promise((acc, rej) => {
        pool.query(
            'UPDATE address_info SET company_name=?, street_address=?, city=?, state_name=?, zip_code =? WHERE id=?',
            [arg.company_name, arg.street_address, arg.city, arg.state_name, arg.zip_code, 1],
            err => {
                if (err) return rej(err);
                acc();
            },
        );
    });
}

// Update a restaurant info in the DB (SURI)
async function updateContactInfo(arg) {
    console.log(arg);
    
    return new Promise((acc, rej) => {
        pool.query(
            'UPDATE contact_info SET phone=?, email=? WHERE id=?',
            [arg.phone, arg.email, 1],
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
    getToppings,
    getOrders,
    getOrderItems,
    getMenuItemToppings,
    getOrderItemToppings,
    getAddrInfo,
    getContactInfo,
    getItem,
    storeItem,
    updateItem,
    updateAddrInfo,
    updateContactInfo,
    removeItem,
};
