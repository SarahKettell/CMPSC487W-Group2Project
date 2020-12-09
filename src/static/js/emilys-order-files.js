//to keep in mind, this is the SQL for

//async function orderForm(order) {
//    return new Promise(acc, rej);
//    {
//        pool.query(
//            'insert into orders (order_id, first_name, last_name, address1, address2, addr_city, addr_state, addr_zip, order_type, date_time_created, date_time_scheduled) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
//            [order.order_id, order.first_name, order.last_name, order.address1, order.address2, order.addr_city, order.addr_state, order.addr_zip, order.order_type, order.date_time_created, order.date_time_scheduled],
//            err => {
//                if (err) return rej(err);
//                acc();
//            },
//        );
//    }
//}

//read it into js instead of adding it to database
const updateOrdertoDB = async (inputData) => {
    const response = await fetch('http://localhost:3000/order-form.html/1', { //url needs to match in src/index
        method: 'PUT',
        body: JSON.stringify(inputData),
        headers: {
            'Content-Type' : 'application/json'
        }
    });

    const myJson = await response.json();
}

const updateSurveytoDB = async (inputData) => {
    const response = await fetch('http://localhost:3000/customer-survey.html/1', { //url needs to match in src/index
        method: 'PUT',
        body: JSON.stringify(inputData),
        headers: {
            'Content-Type' : 'application/json'
        }
    });

    const myJson = await response.json();
}