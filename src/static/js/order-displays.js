/*************************************************************************
 * Functions to deal with displaying orders for staff and client
 *************************************************************************/

// async function to retreive the json output from the database related to a order
const getOrders = async (textBox, type) => {
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
    } else {
        await displayMenuItems(textBox, menuItems, toppingIDs, toppings);
    }
}

// called from webpage, gets the data and it in the location given
function getAdminOrders(elementID){
    let location = document.getElementById(elementID);
    // async call to get the data
    getOrders(location, "admin");
}

// called from webpage, gets the data and it in the location given
function getCustomerMenu(elementID){
    let location = document.getElementById(elementID);
    // async call to get the data
    getMenuItems(location, "customer");
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

        // create object with combined data to store
        const orderDetails = {orderInfo: currentOrder, orderItems: currentOrderItems};

        // create the elements to display on the page
        let newOrderDiv = document.createElement("div");
        newOrderDiv.classList.add("container-fluid");
        newOrderDiv.classList.add("order-box");
        newOrderDiv.setAttribute("data-orderid", currentOrder.order_id);

        let newRow = document.createElement("div");
        newRow.classList.add("row");

        let newHeader = document.createElement("h3");
        newHeader.classList.add("col");
        newHeader.appendChild(document.createTextNode("Order ID: " + currentOrder.order_id));
        newRow.appendChild(newHeader);

        let orderStatus = document.createElement("h3");
        orderStatus.classList.add("col-sm");
        orderStatus.classList.add("right-align");
        if(!currentOrder.completed){
            orderStatus.appendChild(document.createTextNode("Status: IN PROGRESS"));
            newOrderDiv.setAttribute("data-status", "current");
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
        orderType.appendChild(document.createTextNode(currentOrder.type));
        newRow.appendChild(orderType);

        let orderTimes = document.createElement('p');
        orderTimes.classList.add("col");
        orderTimes.classList.add("right-align");
        if(currentOrder.completed === false){
            dataTitle = document.createElement("span");
            dataTitle.classList.add("data-title");
            dataTitle.appendChild(document.createTextNode("Scheduled For: "));
            orderTimes.appendChild(dataTitle);
            orderTimes.appendChild(document.createTextNode(currentOrder.date_time_scheduled));
            orderTimes.appendChild(document.createElement("br"));
            dataTitle = document.createElement("span");
            dataTitle.classList.add("data-title");
            dataTitle.appendChild(document.createTextNode("Checked Out At: "));
            orderTimes.appendChild(dataTitle);
            orderTimes.appendChild(document.createTextNode(currentOrder.date_time_checked_out));
        }
        else {
            dataTitle = document.createElement("span");
            dataTitle.classList.add("data-title");
            dataTitle.appendChild(document.createTextNode("Completed At: "));
            orderTimes.appendChild(dataTitle);
            orderTimes.appendChild(document.createTextNode(currentOrder.date_time_completed));
        }
        newRow.appendChild(orderTimes);
        newOrderDiv.appendChild(newRow);

        let itemCount = 1;
        currentOrderItems.map(item => {
            let itemRow = document.createElement("div");
            itemRow.classList.add("order-item");

            console.log(item);
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
        customerName.appendChild(document.createTextNode("To be Added Later"));
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
        newRow.classList.add("justify-content-between");
        // mark order complete if in process
        if(!currentOrder.completed){
            let newCol = document.createElement("div");
            newCol.classList.add("col-4");
            let markComplete = document.createElement("button");
            markComplete.classList.add("btn");
            markComplete.classList.add("btn-primary");
            markComplete.setAttribute("type", "button");
            markComplete.setAttribute("id", "mark-complete-button");
            markComplete.addEventListener("click", () => {/*call function here*/}, false);
            markComplete.innerHTML = "Mark Order Complete";
            newCol.appendChild(markComplete);
            newRow.appendChild(newCol);
        }
        // View Order Details
        let newCol = document.createElement("div");
        newCol.classList.add("col-4");
        let viewOrderDetails = document.createElement("button");
        viewOrderDetails.classList.add("btn");
        viewOrderDetails.classList.add("btn-primary");
        viewOrderDetails.setAttribute("type", "button");
        viewOrderDetails.setAttribute("id", "view-order-details-button");
        viewOrderDetails.addEventListener("click", () => {/*call function here*/}, false);
        viewOrderDetails.innerHTML = "View Full Order Details";
        newCol.appendChild(viewOrderDetails);
        newRow.appendChild(newCol);
        newOrderDiv.appendChild(newRow);
        textBox.appendChild(newOrderDiv);
    }

    displaySelectedOrders();
}

/***************************************************************************
 * Display menu items to the customer on menu.html
 ***************************************************************************/
// Converts the jsonData into menu item text
// appends it to the element referenced
function displayMenuItems(textBox, menuItems, toppingIDs, toppings){

    /// create a new div element to add contents to
    const newDiv = document.createElement("div");

    // iterate over the menu items to output the data for each
    for(let i = 0; i < menuItems.length; i++){
        // get toppings associated with menu item
        let currToppings = [];                        // empty array
        let itemToppings = toppingIDs.map(item => {   // iterates over toppingIDs
            if(menuItems[i].menu_item_id === item.menu_item_id){   // if the menu item ids match
                // finds the topping with the specific topping_id and adds to array
                currToppings.push(toppings.find(topping => topping.topping_id === item.topping_id));
            }
        })

        // create a div for the item
        let newItem = document.createElement("div");
        newItem.classList.add("row");
        newItem.classList.add("main-menu-item");

        // default menu item image
        let imageDiv = document.createElement("div");
        imageDiv.classList.add("image-div");
        newItem.appendChild(imageDiv);

        // div to hold contents
        let contentDiv = document.createElement("div");
        contentDiv.classList.add("content-div");

        // title
        let newTitle = document.createElement("h2");
        newTitle.appendChild(document.createTextNode(menuItems[i].item_name));
        contentDiv.appendChild(newTitle);

        // description
        let descriptionElement = document.createElement("p");
        descriptionElement.appendChild(document.createTextNode(menuItems[i].description));
        contentDiv.appendChild(descriptionElement);

        // list of prices for item
        let priceDiv = document.createElement("form");
        priceDiv.classList.add("form-group");

        // small
        let smallDiv = document.createElement("div");
        smallDiv.classList.add("form-check");
        let smallOption = document.createElement("input");
        smallOption.classList.add("form-check-input");
        smallOption.setAttribute("type", "radio");
        smallOption.setAttribute("name", "pizzaSize");
        smallOption.setAttribute("id", "smallPizza");
        smallOption.setAttribute("value", "small");
        smallOption.checked = true;
        let smallLabel = document.createElement("label");
        smallLabel.classList.add("form-check-label");
        smallLabel.setAttribute("for", "smallPizza");
        smallLabel.appendChild(document.createTextNode("Small: $" + menuItems[i].sm_price.toFixed(2)));
        smallDiv.appendChild(smallOption);
        smallDiv.appendChild(smallLabel);

        // medium
        let medDiv = document.createElement("div");
        medDiv.classList.add("form-check");
        let mediumOption = document.createElement("input");
        mediumOption.classList.add("form-check-input");
        mediumOption.setAttribute("type", "radio");
        mediumOption.setAttribute("name", "pizzaSize");
        mediumOption.setAttribute("id", "mediumPizza");
        mediumOption.setAttribute("value", "medium");
        let mediumLabel = document.createElement("label");
        mediumLabel.classList.add("form-check-label");
        mediumLabel.setAttribute("for", "mediumPizza");
        mediumLabel.appendChild(document.createTextNode("Medium: $" + menuItems[i].med_price.toFixed(2)));
        medDiv.appendChild(mediumOption);
        medDiv.appendChild(mediumLabel);

        // large
        let lgDiv = document.createElement("div");
        lgDiv.classList.add("form-check");
        let largeOption = document.createElement("input");
        largeOption.classList.add("form-check-input");
        largeOption.setAttribute("type", "radio");
        largeOption.setAttribute("name", "pizzaSize");
        largeOption.setAttribute("id", "largePizza");
        largeOption.setAttribute("value", "large");
        let largeLabel = document.createElement("label");
        largeLabel.classList.add("form-check-label");
        largeLabel.setAttribute("for", "largePizza");
        largeLabel.appendChild(document.createTextNode("Large: $" + menuItems[i].lg_price.toFixed(2)));
        lgDiv.appendChild(largeOption);
        lgDiv.appendChild(largeLabel);

        // extra large
        let xlgDiv = document.createElement("div");
        xlgDiv.classList.add("form-check");
        let xlargeOption = document.createElement("input");
        xlargeOption.classList.add("form-check-input");
        xlargeOption.setAttribute("type", "radio");
        xlargeOption.setAttribute("name", "pizzaSize");
        xlargeOption.setAttribute("id", "xlargePizza");
        xlargeOption.setAttribute("value", "xlarge");
        let xlargeLabel = document.createElement("label");
        xlargeLabel.classList.add("form-check-label");
        xlargeLabel.setAttribute("for", "xlargePizza");
        xlargeLabel.appendChild(document.createTextNode("Extra Large: $" + menuItems[i].xlg_price.toFixed(2)));
        xlgDiv.appendChild(xlargeOption);
        xlgDiv.appendChild(xlargeLabel);

        priceDiv.appendChild(smallDiv);
        priceDiv.appendChild(medDiv);
        priceDiv.appendChild(lgDiv);
        priceDiv.appendChild(xlgDiv);
        contentDiv.appendChild(priceDiv);


        let buttonRow = document.createElement("div");
        buttonRow.classList.add("button-row");

        // Customize Button
        let customizeButton = document.createElement("button");
        customizeButton.classList.add("btn");
        customizeButton.classList.add("btn-primary");
        customizeButton.setAttribute("type", "button");
        customizeButton.setAttribute("id", "customize-button");
        customizeButton.addEventListener("click", () => {/*call function here*/}, false);
        customizeButton.innerHTML = "Customize";
        buttonRow.appendChild(customizeButton);

        // Add to Cart Button
        let addPizzaButton = document.createElement("button");
        addPizzaButton.classList.add("btn");
        addPizzaButton.classList.add("btn-primary");
        addPizzaButton.setAttribute("type", "button");
        addPizzaButton.setAttribute("id", "add-to-cart-button");
        addPizzaButton.addEventListener("click", () => {/*call function here*/}, false);
        addPizzaButton.innerHTML = "Add to Cart";
        buttonRow.appendChild(addPizzaButton);

        contentDiv.appendChild(buttonRow);
        newItem.appendChild(contentDiv);
        textBox.appendChild(newItem);
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