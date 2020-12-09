var newOrder = {
	    customer_id: '123456',
	    first_name: 'bob',
        last_name: 'barker',
        email: 'email@email.com',
        address1: '123 The street',
        address2: null,
        addr_city: 'Harrisburg',
        addr_state: 'PA',
        addr_zip: '12345',
        date_time_created: '2020-11-25 13:00:01',
        date_time_checked_out: null,
        date_time_scheduled: null,
        date_time_completed: null,
        order_type: 'eat-in',
        notes: 'this unsubmitted order was created by the cart-forms.js',
        payment_type: 'cc',
        sub_total_price: 10.00,
        tax_price: 1.00,
        tip_price: 1.00,
        total_price: 12.00,
        checked_out: false,
        completed: false,
        //item_name: 'Meat Lovers',
        //crust: 'thick-crust',
        //size: 'medium',
        //price: 10.00,
        //item_notes: 'this is a test',

        //toppings: [7, 8, 9, 16, 12]
};

var newOrderItem = {
	order_id: 'test',
	item_name: 'test',
	crust: 'thick-crust',
	size: 'medium',
	price: 10.00,
	item_notes: 'this is another test',
	toppings: [7, 12, 16]
};
const getCurrentCart = async (type) => {
    // get orders
    const orderResponse = await fetch('http://localhost:3000/orders');
    const orders = await orderResponse.json();
    await findCustomerCart(orders)
}

function findCustomerCart(orders){
	const tempCustomerID = '123456';
    for(let i =0; i < orders.length; i++){
        const currentOrder = orders[i];
        if(currentOrder.customer_id === tempCustomerID){
            if(!currentOrder.checked_out){
            	console.log(currentOrder.order_id);
            	newOrderItem.order_id = currentOrder.order_id;
            	addOrderItemtoDB(newOrderItem);
            	return;
            }
        }
    }
    let toAdd = {
    	...newOrder,
    	...newOrderItem
    };
    addOrdertoDB(toAdd);
}




function testingAdd(){
	    let toAdd = {
    	...newOrder,
    	...newOrderItem
    };
    console.log(toAdd);
}
function getshitTest(item_name, crust, size, price, toppings) {
	console.log(item_name);
	newOrderItem.item_name = item_name;
	console.log(crust);
	newOrderItem.crust = crust;
	console.log(size);
	newOrderItem.size = size;
	console.log(price);
	newOrderItem.price = price;
	console.log(toppings);
	let test = toppings.map(({topping_id}) => parseInt(topping_id));
	console.log(test);
	getCurrentCart('');

}

// adds an Order to the database
const addOrdertoDB = async (inputData) => {
	// creates a post request, which is defined in the src/index.js file to call "addOrder.js"
	const response = await fetch('http://localhost:3000/orders', {
		method: 'POST',
		body: JSON.stringify(inputData), // string or object
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

const addOrderItemtoDB = async (inputData) => {
	// creates a post request, which is defined in the src/index.js file to call "addOrder.js"
	const response = await fetch('http://localhost:3000/orderItems', {
		method: 'POST',
		body: JSON.stringify(inputData), // string or object
		headers: {
			'Content-Type': 'application/json'
		}
	});
}