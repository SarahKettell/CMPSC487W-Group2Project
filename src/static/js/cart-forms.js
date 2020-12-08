const newOrder = {
	    customer_id: '123456',
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


        item_name: 'Meat Lovers',
        crust: 'thick-crust',
        size: 'medium',
        price: 10.00,
        item_notes: 'this is a test',

        toppings: [7, 8, 9, 16, 12]
};
function testingAdd(){
	addOrderItemtoDB(newOrder);
}

// adds an Order to the database
const addOrderItemtoDB = async (inputData) => {
	// creates a post request, which is defined in the src/index.js file to call "addOrder.js"
	const response = await fetch('http://localhost:3000/orders', {
		method: 'POST',
		body: JSON.stringify(inputData), // string or object
		headers: {
			'Content-Type': 'application/json'
		}
	});
}