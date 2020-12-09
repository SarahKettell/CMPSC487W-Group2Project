/*************************************************************************
 * Functions to deal with displaying orders for staff and client
 *************************************************************************/

// async function to retreive the json output from the database related to a order
const getOrders = async (textBox, type, orderId) => {
    // get orders
    const orderResponse = await fetch('http://localhost:3000/orders');
    const orders = await orderResponse.json();

    // get items for each order
    const orderItemsResponse = await fetch('http://localhost:3000/orderItems');
    const orderItems = await orderItemsResponse.json();

    // get topping IDs for each order item
    const orderToppingsResponse = await fetch('http://localhost:3000/orderItemToppings');
    const orderItemIDs = await orderToppingsResponse.json();

    // get list of toppings
    const toppingResponse = await fetch('http://localhost:3000/toppings');
    const toppings = await toppingResponse.json();

    if(type === "admin") {
        await displayCustomerOrders(textBox, orders, orderItems, orderItemIDs, toppings);
    } else if(type ==="admin-fullview") {
        await displayFullCustomerOrder(textBox, orderId, orders, orderItems, orderItemIDs, toppings);
    } else {
        // do a thing
    }
}

// called from webpage, gets the data and it in the location given
function getAdminOrders(elementID){
    let location = document.getElementById(elementID);
    // async call to get the data
    getOrders(location, "admin", null);
}

function getSpecificOrder(elementID, orderId){
    let location = document.getElementById(elementID);
    // async call to get the data
    getOrders(location, "admin-fullview", orderId);
}

// Displays all custmer orders in an abbreviated form, with buttons to complete, edit, view, and delete
function displayCustomerOrders(textBox, orders, orderItems, orderItemIDs, toppings){

    // create a new div element to add contents to
    const newDiv = document.createElement("div");

    // iterate over each order, getting associated items and toppings
    for(let i = 0; i < orders.length; i++) {

        const currentOrder = orders[i];

        // get items for this order
        let currentOrderItems = [];
        orderItems.map(item => {
            if(currentOrder.order_id === item.order_id){
                // finds the toppings for the current order item, add them
                let toppingList = [];
                orderItemIDs.map(toppingID => {
                   if(item.order_item_id === toppingID.order_item_id){
                       toppingList.push(toppings.find(topping => topping.topping_id === toppingID.topping_id));
                   }
                });
                currentOrderItems.push({orderItem: item, toppings: toppingList});
            }
        });
        console.log(currentOrder);

        // create the elements to display on the page
        let newOrderDiv = document.createElement("div");
        newOrderDiv.classList.add("container-fluid");
        newOrderDiv.classList.add("order-box");
        newOrderDiv.setAttribute("data-orderid", currentOrder.order_id);

        let newRow = document.createElement("div");
        newRow.classList.add("row");

        let newHeader = document.createElement("h3");
        newHeader.classList.add("col");
        newHeader.classList.add("admin-order-view-id");
        newHeader.appendChild(document.createTextNode("Order ID: " + currentOrder.order_id));
        newRow.appendChild(newHeader);

        let orderStatus = document.createElement("h3");
        orderStatus.classList.add("col-sm");
        orderStatus.classList.add("right-align");
        if(!currentOrder.completed) {
            if (!currentOrder.checked_out) {
                orderStatus.appendChild(document.createTextNode("Status: NOT FINALIZED"));
                newOrderDiv.setAttribute("data-status", "not-checked-out");
            } else {
                orderStatus.appendChild(document.createTextNode("Status: IN PROGRESS"));
                newOrderDiv.setAttribute("data-status", "current");
            }
        }
        else {
            orderStatus.appendChild(document.createTextNode("Status: COMPLETE"));
            newOrderDiv.setAttribute("data-status", "past");
        }
        newRow.appendChild(orderStatus);
        newOrderDiv.appendChild(newRow);

        newRow = document.createElement("div");
        newRow.classList.add("row");

        let orderType = document.createElement('p');
        orderType.classList.add("col");
        let dataTitle = document.createElement("span");
        dataTitle.classList.add("data-title");
        dataTitle.appendChild(document.createTextNode("Order Type: "));
        orderType.appendChild(dataTitle);
        orderType.appendChild(document.createTextNode(currentOrder.order_type));
        newRow.appendChild(orderType);

        let orderTimes = document.createElement('p');
        orderTimes.classList.add("col");
        orderTimes.classList.add("right-align");
        if(!currentOrder.completed){
            dataTitle = document.createElement("span");
            dataTitle.classList.add("data-title");
            dataTitle.appendChild(document.createTextNode("Scheduled For: "));
            orderTimes.appendChild(dataTitle);
            let date = currentOrder.date_time_scheduled.split('T')[0];
            let time = currentOrder.date_time_scheduled.split('T')[1].split('.')[0];
            orderTimes.appendChild(document.createTextNode(date + " at " + time));
            orderTimes.appendChild(document.createElement("br"));
            dataTitle = document.createElement("span");
            dataTitle.classList.add("data-title");
            dataTitle.appendChild(document.createTextNode("Checked Out At: "));
            orderTimes.appendChild(dataTitle);
            date = currentOrder.date_time_checked_out.split('T')[0];
            time = currentOrder.date_time_checked_out.split('T')[1].split('.')[0];
            orderTimes.appendChild(document.createTextNode(date + " at " + time));
        }
        else {
            dataTitle = document.createElement("span");
            dataTitle.classList.add("data-title");
            dataTitle.appendChild(document.createTextNode("Completed At: "));
            orderTimes.appendChild(dataTitle);
            let date = currentOrder.date_time_completed.split('T')[0];
            let time = currentOrder.date_time_completed.split('T')[1].split('.')[0];
            orderTimes.appendChild(document.createTextNode(date + " at " + time));
        }
        newRow.appendChild(orderTimes);
        newOrderDiv.appendChild(newRow);

        let itemCount = 1;
        currentOrderItems.map(item => {
            let itemRow = document.createElement("div");
            itemRow.classList.add("order-item");

            // item name
            newRow = document.createElement("div");
            newRow.classList.add("row");
            let orderItem = document.createElement('p');
            orderItem.classList.add("col");
            dataTitle = document.createElement("span");
            dataTitle.classList.add("data-title");
            dataTitle.appendChild(document.createTextNode(itemCount + ": " + item.orderItem.item_name.toUpperCase()));
            orderItem.appendChild(dataTitle);
            newRow.appendChild(orderItem);
            itemRow.appendChild(newRow);
            // item details
            newRow = document.createElement("div");
            newRow.classList.add("row");
            orderItem = document.createElement('p');
            orderItem.classList.add("col");
            dataTitle = document.createElement("span");
            dataTitle.classList.add("data-title");
            dataTitle.appendChild(document.createTextNode("Size: "));
            orderItem.appendChild(dataTitle);
            orderItem.appendChild(document.createTextNode(item.orderItem.size));
            newRow.appendChild(orderItem);
            orderItem = document.createElement('p');
            orderItem.classList.add("col");
            dataTitle = document.createElement("span");
            dataTitle.classList.add("data-title");
            dataTitle.appendChild(document.createTextNode("Crust Type: "));
            orderItem.appendChild(dataTitle);
            orderItem.appendChild(document.createTextNode(item.orderItem.crust));
            newRow.appendChild(orderItem);

            // sauce
            orderItem = document.createElement('p');
            orderItem.classList.add("col");
            dataTitle = document.createElement("span");
            dataTitle.classList.add("data-title");
            dataTitle.appendChild(document.createTextNode("Sauce(s): "));
            orderItem.appendChild(dataTitle);
            let hasSauce = false;
            item.toppings.map(topping => {
                if(topping.topping_category === "sauce") {
                    let sauceInfo = document.createTextNode(topping.topping_name + ", ");
                    orderItem.appendChild(sauceInfo);
                    hasSauce = true;
                }
            });
            if(!hasSauce){
                let sauceInfo = document.createTextNode("None");
                orderItem.appendChild(sauceInfo);
            }
            newRow.appendChild(orderItem);
            itemRow.appendChild(newRow);

            // cheese
            newRow = document.createElement("div");
            newRow.classList.add("row");
            orderItem = document.createElement('p');
            orderItem.classList.add("col");
            dataTitle = document.createElement("span");
            dataTitle.classList.add("data-title");
            dataTitle.appendChild(document.createTextNode("Cheese(s): "));
            orderItem.appendChild(dataTitle);
            let hasCheese = false;
            item.toppings.map(topping => {
                if(topping.topping_category === "cheese") {
                    let cheeseInfp = document.createTextNode(topping.topping_name + ", ");
                    orderItem.appendChild(cheeseInfp);
                    hasCheese = true;
                }
            });
            if(!hasCheese){
                let cheeseInfp = document.createTextNode("None");
                orderItem.appendChild(cheeseInfp);
            }
            newRow.appendChild(orderItem);
            itemRow.appendChild(newRow);

            // toppings
            newRow = document.createElement("div");
            newRow.classList.add("row");
            orderItem = document.createElement('p');
            orderItem.classList.add("col");
            dataTitle = document.createElement("span");
            dataTitle.classList.add("data-title");
            dataTitle.appendChild(document.createTextNode("Topping(s): "));
            orderItem.appendChild(dataTitle);
            let hasToppings = false;
            item.toppings.map(topping => {
                if(topping.topping_category != "cheese" && topping.topping_category != "sauce") {
                    let toppingInfo = document.createTextNode(topping.topping_name + ", ");
                    orderItem.appendChild(toppingInfo);
                    hasToppings = true;
                }
            });
            if(!hasToppings){
                let toppingInfo = document.createTextNode("None");
                orderItem.appendChild(toppingInfo);
            }
            newRow.appendChild(orderItem);
            itemRow.appendChild(newRow);

            newRow = document.createElement("div");
            newRow.classList.add("row");
            orderItem = document.createElement('p');
            orderItem.classList.add("col");
            dataTitle = document.createElement("span");
            dataTitle.classList.add("data-title");
            dataTitle.appendChild(document.createTextNode("Item Notes: "));
            orderItem.appendChild(dataTitle);
            orderItem.appendChild(document.createTextNode(item.orderItem.notes));
            newRow.appendChild(orderItem);
            itemRow.appendChild(newRow);

            newOrderDiv.appendChild(itemRow);
            itemCount++;
        });
        newRow = document.createElement('span');
        newRow.classList.add('divider-row');
        newOrderDiv.appendChild(newRow);

        // notes
        newRow = document.createElement("div");
        newRow.classList.add("row");
        let orderNotes = document.createElement('p');
        orderNotes.classList.add("col");
        dataTitle = document.createElement("span");
        dataTitle.classList.add("data-title");
        dataTitle.appendChild(document.createTextNode("Order Notes: "));
        orderNotes.appendChild(dataTitle);
        orderNotes.appendChild(document.createTextNode(currentOrder.notes));
        newRow.appendChild(orderNotes);
        newOrderDiv.appendChild(newRow);

        // customer info
        newRow = document.createElement("div");
        newRow.classList.add("row");
        let customerName = document.createElement('p');
        customerName.classList.add("col");
        dataTitle = document.createElement("span");
        dataTitle.classList.add("data-title");
        dataTitle.appendChild(document.createTextNode("Customer Name: "));
        customerName.appendChild(dataTitle);
        customerName.appendChild(document.createTextNode(currentOrder.first_name + " " + currentOrder.last_name));
        newRow.appendChild(customerName);
        let customerType = document.createElement('p');
        customerType.classList.add("col");
        dataTitle = document.createElement("span");
        dataTitle.classList.add("data-title");
        dataTitle.appendChild(document.createTextNode("Customer ID: "));
        customerType.appendChild(dataTitle);
        if(currentOrder.customer_id){
            customerType.appendChild(document.createTextNode(currentOrder.customer_id));
        }
        else {
            customerType.appendChild(document.createTextNode("Guest"));
        }
        newRow.appendChild(customerType);

        newOrderDiv.appendChild(newRow);

        // price info
        newRow = document.createElement("div");
        newRow.classList.add("row");
        let orderPrice = document.createElement('p');
        orderPrice.classList.add("col");
        dataTitle = document.createElement("span");
        dataTitle.classList.add("data-title");
        dataTitle.appendChild(document.createTextNode("Total Price: "));
        orderPrice.appendChild(dataTitle);
        orderPrice.appendChild(document.createTextNode("$" + currentOrder.total_price.toFixed(2)));
        newRow.appendChild(orderPrice);
        newOrderDiv.appendChild(newRow);

        newRow = document.createElement("div");
        newRow.classList.add("row");
        // mark order complete if in process
        if(!currentOrder.completed){
            newRow.classList.add("justify-content-between");
            let newCol = document.createElement("div");
            newCol.classList.add("col-5");
            let markComplete = document.createElement("button");
            markComplete.classList.add("btn");
            markComplete.classList.add("btn-primary");
            markComplete.setAttribute("type", "button");
            markComplete.setAttribute("name", currentOrder.order_id);
            markComplete.setAttribute("id", "mark-complete-button");
            markComplete.addEventListener("click", async function ()
                {markOrderComplete(this.name)}, false);
            markComplete.innerHTML = "Mark Order Complete";
            newCol.appendChild(markComplete);
            newRow.appendChild(newCol);
            // View Order Details
            newCol = document.createElement("div");
            newCol.classList.add("col-5");
            // create url with order id
            let orderURL = new URL('http://localhost:3000/admin-orders-view.html');
            orderURL.searchParams.append('view_order', currentOrder.order_id);
            let viewOrderDetails = document.createElement("a");
            viewOrderDetails.classList.add("btn");
            viewOrderDetails.classList.add("btn-primary");
            viewOrderDetails.classList.add("button-float-right");
            viewOrderDetails.setAttribute("name", currentOrder.order_id);
            viewOrderDetails.setAttribute("id", "view-order-details-button");
            viewOrderDetails.setAttribute("href", orderURL);
            viewOrderDetails.innerHTML = "View Full Order Details";
            newCol.appendChild(viewOrderDetails);
            newRow.appendChild(newCol);
        } else {
            // View Order Details
            newRow.classList.add("justify-content-center");
            // create url with order id
            let orderURL = new URL('http://localhost:3000/admin-orders-view.html');
            orderURL.searchParams.append('view_order', currentOrder.order_id);
            let viewOrderDetails = document.createElement("a");
            viewOrderDetails.classList.add("btn");
            viewOrderDetails.classList.add("btn-primary");
            viewOrderDetails.setAttribute("type", "button");
            viewOrderDetails.setAttribute("id", "view-order-details-button");
            viewOrderDetails.setAttribute("href", orderURL);
            viewOrderDetails.innerHTML = "View Full Order Details";
            newRow.appendChild(viewOrderDetails);
        }


        newOrderDiv.appendChild(newRow);
        textBox.appendChild(newOrderDiv);
    }

    displaySelectedOrders();
}

function displayFullCustomerOrder(textBox, orderId, orders, orderItems, orderItemIDs, toppings){
    // create a new div element to add contents to
    const newDiv = document.createElement("div");

    //get details for order
    const currentOrder = orders.find(item => item.order_id === orderId);
    let currentOrderItems = [];
    if(currentOrder){
        // get items for this order
        orderItems.map(item => {
            if (orderId === item.order_id) {
                // finds the toppings for the current order item, add them
                let toppingList = [];
                orderItemIDs.map(toppingID => {
                    if (item.order_item_id === toppingID.order_item_id) {
                        toppingList.push(toppings.find(topping => topping.topping_id === toppingID.topping_id));
                    }
                });
                currentOrderItems.push({ orderItem: item, toppings: toppingList });
            }
        });
        console.log(currentOrder);
        console.log(currentOrderItems);

        // create the elements to display on the page
        let newOrderDiv = document.createElement("div");
        newOrderDiv.classList.add("container-fluid");
        newOrderDiv.classList.add("order-box");
        newOrderDiv.setAttribute("data-orderid", currentOrder.order_id);

        let newRow = document.createElement("div");
        newRow.classList.add("row");
        newRow.classList.add("justify-content-center");

        if(!currentOrder.completed) {
            let newCol = document.createElement("div");
            newCol.classList.add("col-10");
            newCol.classList.add("btn");
            newCol.classList.add("btn-primary");
            newCol.classList.add("btn-sm");
            newCol.classList.add("top-button");
            let markComplete = document.createElement("button");
            markComplete.setAttribute("type", "button");
            markComplete.setAttribute("name", currentOrder.order_id);
            markComplete.setAttribute("id", "mark-complete-button-top");
            markComplete.addEventListener("click", async function() {
                markOrderComplete(this.name)
            }, false);
            markComplete.innerHTML = "Mark Order Complete";
            newCol.appendChild(markComplete);
            newRow.appendChild(newCol);
            textBox.insertBefore(newRow, textBox.firstChild);
        }

        newRow = document.createElement("div");
        newRow.classList.add("row");

        let newHeader = document.createElement("h4");
        newHeader.classList.add("col");
        newHeader.classList.add("admin-order-view-id");
        newHeader.appendChild(document.createTextNode("Order ID: " + currentOrder.order_id));
        newRow.appendChild(newHeader);

        let orderStatus = document.createElement("h3");
        orderStatus.classList.add("col-sm");
        orderStatus.classList.add("right-align");
        if(!currentOrder.completed) {
            if (!currentOrder.checked_out) {
                orderStatus.appendChild(document.createTextNode("Status: NOT FINALIZED"));
                newOrderDiv.setAttribute("data-status", "not-checked-out");
            } else {
                orderStatus.appendChild(document.createTextNode("Status: IN PROGRESS"));
                newOrderDiv.setAttribute("data-status", "current");
            }
        }
        else {
            orderStatus.appendChild(document.createTextNode("Status: COMPLETE"));
            newOrderDiv.setAttribute("data-status", "past");
        }
        newRow.appendChild(orderStatus);
        newOrderDiv.appendChild(newRow);

        newRow = document.createElement("div");
        newRow.classList.add("row");

        let orderType = document.createElement('p');
        orderType.classList.add("col");
        let dataTitle = document.createElement("span");
        dataTitle.classList.add("data-title");
        dataTitle.appendChild(document.createTextNode("Order Type: "));
        orderType.appendChild(dataTitle);
        orderType.appendChild(document.createTextNode(currentOrder.order_type));
        newRow.appendChild(orderType);

        let orderTimes = document.createElement('p');
        orderTimes.classList.add("col");
        orderTimes.classList.add("right-align");
        if(!currentOrder.completed){
            dataTitle = document.createElement("span");
            dataTitle.classList.add("data-title");
            dataTitle.appendChild(document.createTextNode("Scheduled: "));
            orderTimes.appendChild(dataTitle);
            let date = currentOrder.date_time_scheduled.split('T')[0];
            let time = currentOrder.date_time_scheduled.split('T')[1].split('.')[0];
            orderTimes.appendChild(document.createTextNode(date + " at " + time));
            orderTimes.appendChild(document.createElement("br"));
            dataTitle = document.createElement("span");
            dataTitle.classList.add("data-title");
            dataTitle.appendChild(document.createTextNode("Checked Out: "));
            orderTimes.appendChild(dataTitle);
            date = currentOrder.date_time_checked_out.split('T')[0];
            time = currentOrder.date_time_checked_out.split('T')[1].split('.')[0];
            orderTimes.appendChild(document.createTextNode(date + " at " + time));
        }
        else {
            dataTitle = document.createElement("span");
            dataTitle.classList.add("data-title");
            dataTitle.appendChild(document.createTextNode("Scheduled: "));
            orderTimes.appendChild(dataTitle);
            // get datetime
            let date = currentOrder.date_time_scheduled.split('T')[0];
            let time = currentOrder.date_time_scheduled.split('T')[1].split('.')[0];
            orderTimes.appendChild(document.createTextNode(date + " at " + time));
            console.log(currentOrder.date_time_scheduled.split('T'));
            orderTimes.appendChild(document.createElement("br"));
            dataTitle = document.createElement("span");
            dataTitle.classList.add("data-title");
            dataTitle.appendChild(document.createTextNode("Checked Out: "));
            orderTimes.appendChild(dataTitle);
            date = currentOrder.date_time_checked_out.split('T')[0];
            time = currentOrder.date_time_checked_out.split('T')[1].split('.')[0];
            orderTimes.appendChild(document.createTextNode(date + " at " + time));
            orderTimes.appendChild(document.createElement("br"));
            dataTitle = document.createElement("span");
            dataTitle.classList.add("data-title");
            dataTitle.appendChild(document.createTextNode("Completed: "));
            orderTimes.appendChild(dataTitle);
            if(currentOrder.date_time_completed){
                date = currentOrder.date_time_completed.split('T')[0];
                time = currentOrder.date_time_completed.split('T')[1].split('.')[0];
                orderTimes.appendChild(document.createTextNode(date + " at " + time));
            } else {
                orderTimes.appendChild(document.createTextNode( "Not completed."));
            }
        }
        newRow.appendChild(orderTimes);
        newOrderDiv.appendChild(newRow);

        let itemCount = 1;
        currentOrderItems.map(item => {
            let itemRow = document.createElement("div");
            itemRow.classList.add("order-item");

            // item name
            newRow = document.createElement("div");
            newRow.classList.add("row");
            let orderItem = document.createElement('p');
            orderItem.classList.add("col");
            dataTitle = document.createElement("span");
            dataTitle.classList.add("data-title");
            dataTitle.appendChild(document.createTextNode(itemCount + ": " + item.orderItem.item_name.toUpperCase()));
            orderItem.appendChild(dataTitle);
            let itemPrice = document.createTextNode("$" + item.orderItem.price.toFixed(2));
            newRow.appendChild(orderItem);
            newRow.appendChild(itemPrice);
            itemRow.appendChild(newRow);
            // item details
            newRow = document.createElement("div");
            newRow.classList.add("row");
            orderItem = document.createElement('p');
            orderItem.classList.add("col");
            dataTitle = document.createElement("span");
            dataTitle.classList.add("data-title");
            dataTitle.appendChild(document.createTextNode("Size: "));
            orderItem.appendChild(dataTitle);
            orderItem.appendChild(document.createTextNode(item.orderItem.size));
            newRow.appendChild(orderItem);
            orderItem = document.createElement('p');
            orderItem.classList.add("col");
            dataTitle = document.createElement("span");
            dataTitle.classList.add("data-title");
            dataTitle.appendChild(document.createTextNode("Crust Type: "));
            orderItem.appendChild(dataTitle);
            orderItem.appendChild(document.createTextNode(item.orderItem.crust));
            newRow.appendChild(orderItem);

            // sauce
            orderItem = document.createElement('p');
            orderItem.classList.add("col");
            dataTitle = document.createElement("span");
            dataTitle.classList.add("data-title");
            dataTitle.appendChild(document.createTextNode("Sauce(s): "));
            orderItem.appendChild(dataTitle);
            let hasSauce = false;
            item.toppings.map(topping => {
                if(topping.topping_category === "sauce") {
                    let sauceInfo = document.createTextNode(topping.topping_name + ", ");
                    orderItem.appendChild(sauceInfo);
                    hasSauce = true;
                }
            });
            if(!hasSauce){
                let sauceInfo = document.createTextNode("None");
                orderItem.appendChild(sauceInfo);
            }
            newRow.appendChild(orderItem);
            itemRow.appendChild(newRow);

            // cheese
            newRow = document.createElement("div");
            newRow.classList.add("row");
            orderItem = document.createElement('p');
            orderItem.classList.add("col");
            dataTitle = document.createElement("span");
            dataTitle.classList.add("data-title");
            dataTitle.appendChild(document.createTextNode("Cheese(s): "));
            orderItem.appendChild(dataTitle);
            let hasCheese = false;
            item.toppings.map(topping => {
                if(topping.topping_category === "cheese") {
                    let cheeseInfo = document.createTextNode(topping.topping_name + ", ");
                    orderItem.appendChild(cheeseInfo);
                    hasCheese = true;
                }
            });
            if(!hasCheese){
                let cheeseInfp = document.createTextNode("None");
                orderItem.appendChild(cheeseInfp);
            }
            newRow.appendChild(orderItem);
            itemRow.appendChild(newRow);

            // toppings
            newRow = document.createElement("div");
            newRow.classList.add("row");
            orderItem = document.createElement('p');
            orderItem.classList.add("col");
            dataTitle = document.createElement("span");
            dataTitle.classList.add("data-title");
            dataTitle.appendChild(document.createTextNode("Topping(s): "));
            orderItem.appendChild(dataTitle);
            let hasToppings = false;
            item.toppings.map(topping => {
                if(topping.topping_category != "cheese" && topping.topping_category != "sauce") {
                    let toppingInfo = document.createTextNode(topping.topping_name + ", ");
                    orderItem.appendChild(toppingInfo);
                    hasToppings = true;
                }
            });
            if(!hasToppings){
                let toppingInfo = document.createTextNode("None");
                orderItem.appendChild(toppingInfo);
            }
            newRow.appendChild(orderItem);
            itemRow.appendChild(newRow);

            newRow = document.createElement("div");
            newRow.classList.add("row");
            orderItem = document.createElement('p');
            orderItem.classList.add("col");
            dataTitle = document.createElement("span");
            dataTitle.classList.add("data-title");
            dataTitle.appendChild(document.createTextNode("Item Notes: "));
            orderItem.appendChild(dataTitle);
            orderItem.appendChild(document.createTextNode(item.orderItem.notes));
            newRow.appendChild(orderItem);
            itemRow.appendChild(newRow);

            newOrderDiv.appendChild(itemRow);
            itemCount++;
        });
        newRow = document.createElement('span');
        newRow.classList.add('divider-row');
        newOrderDiv.appendChild(newRow);

        // customer info
        newRow = document.createElement("div");
        newRow.classList.add("row");
        let customerName = document.createElement('p');
        customerName.classList.add("col");
        dataTitle = document.createElement("span");
        dataTitle.classList.add("data-title");
        dataTitle.appendChild(document.createTextNode("Customer Name: "));
        customerName.appendChild(dataTitle);
        customerName.appendChild(document.createTextNode(currentOrder.first_name + " " + currentOrder.last_name));
        newRow.appendChild(customerName);
        let customerType = document.createElement('p');
        customerType.classList.add("col");
        dataTitle = document.createElement("span");
        dataTitle.classList.add("data-title");
        dataTitle.appendChild(document.createTextNode("Customer ID: "));
        customerType.appendChild(dataTitle);
        if(currentOrder.customer_id){
            customerType.appendChild(document.createTextNode(currentOrder.customer_id));
        }
        else {
            customerType.appendChild(document.createTextNode("Guest"));
        }
        newRow.appendChild(customerType);
        newOrderDiv.appendChild(newRow);

        newRow = document.createElement("div");
        newRow.classList.add("row");
        customerName = document.createElement('p');
        customerName.classList.add("col");
        dataTitle = document.createElement("span");
        dataTitle.classList.add("data-title");
        dataTitle.appendChild(document.createTextNode("Address: "));
        customerName.appendChild(dataTitle);
        if(currentOrder.address1) {
            if(currentOrder.address2){
                customerName.appendChild(document.createTextNode(currentOrder.address1 + " " + currentOrder.address2));
            }
            else {
                customerName.appendChild(document.createTextNode(currentOrder.address1));
            }
        }
        else {
            customerName.appendChild(document.createTextNode("None"));
        }
        newRow.appendChild(customerName);
        customerType = document.createElement('p');
        customerType.classList.add("col");
        dataTitle = document.createElement("span");
        dataTitle.classList.add("data-title");
        dataTitle.appendChild(document.createTextNode("Email: "));
        customerType.appendChild(dataTitle);
        customerType.appendChild(document.createTextNode(currentOrder.email ? currentOrder.email : "None"));
        newRow.appendChild(customerType);
        newOrderDiv.appendChild(newRow);

        newRow = document.createElement("div");
        newRow.classList.add("row");
        customerName = document.createElement('p');
        customerName.classList.add("col");
        dataTitle = document.createElement("span");
        dataTitle.classList.add("data-title");
        dataTitle.appendChild(document.createTextNode("City: "));
        customerName.appendChild(dataTitle);
        customerName.appendChild(document.createTextNode(currentOrder.addr_city ? currentOrder.addr_city : "None"));
        newRow.appendChild(customerName);
        customerType = document.createElement('p');
        customerType.classList.add("col");
        dataTitle = document.createElement("span");
        dataTitle.classList.add("data-title");
        dataTitle.appendChild(document.createTextNode("State: "));
        customerType.appendChild(dataTitle);
        customerType.appendChild(document.createTextNode(currentOrder.addr_state ? currentOrder.addr_state : "None"));
        newRow.appendChild(customerType);
        newOrderDiv.appendChild(newRow);
        newRow = document.createElement("div");
        newRow.classList.add("row");
        customerType = document.createElement('p');
        customerType.classList.add("col");
        dataTitle = document.createElement("span");
        dataTitle.classList.add("data-title");
        dataTitle.appendChild(document.createTextNode("Zip: "));
        customerType.appendChild(dataTitle);
        customerType.appendChild(document.createTextNode(currentOrder.addr_zip ? currentOrder.addr_zip : "None"));
        newRow.appendChild(customerType);
        newOrderDiv.appendChild(newRow);

        // notes
        newRow = document.createElement("div");
        newRow.classList.add("row");
        let orderNotes = document.createElement('p');
        orderNotes.classList.add("col");
        dataTitle = document.createElement("span");
        dataTitle.classList.add("data-title");
        dataTitle.appendChild(document.createTextNode("Order Notes: "));
        orderNotes.appendChild(dataTitle);
        orderNotes.appendChild(document.createTextNode(currentOrder.notes));
        newRow.appendChild(orderNotes);
        newOrderDiv.appendChild(newRow);

        // payment info
        newRow = document.createElement("div");
        newRow.classList.add("row");
        let newCol= document.createElement("div");
        newCol.classList.add("col");
        let orderPayment = document.createElement('span');
        dataTitle = document.createElement("span");
        dataTitle.classList.add("data-title");
        dataTitle.appendChild(document.createTextNode("Payment Type: "));
        orderPayment.appendChild(dataTitle);
        orderPayment.appendChild(document.createTextNode(currentOrder.payment_type));
        newCol.appendChild(orderPayment);
        newRow.appendChild(newCol);
        // price info
        newCol= document.createElement("div");
        newCol.classList.add("col");
        newCol.classList.add("right");
        let lineBreak = document.createElement("br");
        let orderPrice = document.createElement('span');
        dataTitle = document.createElement("span");
        dataTitle.classList.add("data-title");
        dataTitle.appendChild(document.createTextNode("Subtotal: "));
        orderPrice.appendChild(dataTitle);
        orderPrice.appendChild(document.createTextNode("$" + currentOrder.sub_total_price.toFixed(2)));
        newCol.appendChild(orderPrice);
        newCol.appendChild(lineBreak);
        lineBreak = document.createElement("br");
        orderPrice = document.createElement('span');
        dataTitle = document.createElement("span");
        dataTitle.classList.add("data-title");
        dataTitle.appendChild(document.createTextNode("Tip: "));
        orderPrice.appendChild(dataTitle);
        orderPrice.appendChild(document.createTextNode("$" + currentOrder.tip_price.toFixed(2)));
        newCol.appendChild(orderPrice);
        newCol.appendChild(lineBreak);
        lineBreak = document.createElement("br");
        orderPrice = document.createElement('span');
        dataTitle = document.createElement("span");
        dataTitle.classList.add("data-title");
        dataTitle.appendChild(document.createTextNode("Tax: "));
        orderPrice.appendChild(dataTitle);
        orderPrice.appendChild(document.createTextNode("$" + currentOrder.tax_price.toFixed(2)));
        newCol.appendChild(orderPrice);
        newCol.appendChild(lineBreak);
        orderPrice = document.createElement('span');
        dataTitle = document.createElement("span");
        dataTitle.classList.add("data-title");
        dataTitle.appendChild(document.createTextNode("Total Price: "));
        orderPrice.appendChild(dataTitle);
        orderPrice.appendChild(document.createTextNode("$" + currentOrder.total_price.toFixed(2)));
        newCol.appendChild(orderPrice);
        newRow.appendChild(newCol);
        newOrderDiv.appendChild(newRow);

        newOrderDiv.appendChild(newRow);
        textBox.appendChild(newOrderDiv);
        loadOrderDataToPage(currentOrder, currentOrderItems);
    }

}

async function markOrderComplete(orderId) {
    await fetch('http://localhost:3000/orders/admin/' + orderId, {
        method: 'PUT',
        body: '',
        headers: {
            'Content-Type' : 'application/json'
        }
    });
    await refreshAdminOrders();
}

function refreshAdminOrders(){
    let currListElement = document.getElementById('admin-order-view');
    if(currListElement){
        currListElement.innerText = "";
        getOrderDetails();
    }
    else {
        let currListElement = document.getElementById('admin-order-list');
        currListElement.innerText = "";
        getAdminOrders('admin-order-list');
    }
}


// Launches a server command to delete an item.
async function deleteItemData(idDel) {
    await fetch('http://localhost:3000/items/' + idDel, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    location.reload();
    window.alert("Item has been successfully deleted!")
}