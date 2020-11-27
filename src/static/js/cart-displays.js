const getCart = async (textBox, type) => {
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

    await displayCustomerCart(textBox, orders, orderItems, orderItemIDs, toppings);
}

// called from webpage, gets the data and it in the location given
function getCustomerCart(elementID){
    let location = document.getElementById(elementID);
    // async call to get the data
    getCart(location, "customer");
}

function displayCustomerCart(textBox, orders, orderItems, orderItemIDs, toppings){
    const newDiv = document.createElement("div");

    //replace this with the logged in customer
    const tempCustomerID = '123456';
    for(let i =0; i < orders.length; i++){
        const currentOrder = orders[i];
        if(currentOrder.customer_id === tempCustomerID){
            if(!currentOrder.checked_out){
                let currentOrderItems = [];
                orderItems.map(item => {
                    if(currentOrder.order_id === item.order_id){
                        let toppingsList = [];
                        orderItemIDs.map(toppingID =>{
                            if(item.order_item_id === toppingID.order_item_id){
                                toppingsList.push(toppings.find(topping => topping.topping_id === toppingID.topping_id));                                
                            }
                        });
                        currentOrderItems.push({orderItem: item, toppings: toppingsList});
                    }
                });


                const cartDetails =  {orderInfo: currentOrder, orderItems: currentOrderItems};
                let newOrderDiv = document.createElement("div");
                newOrderDiv.classList.add("container-fluid");
                newOrderDiv.classList.add("order-box");
                newOrderDiv.setAttribute("data-orderid", currentOrder.order_id);

                let itemCount = 1;
                currentOrderItems.map(item => {
                let itemRow = document.createElement("div");
                itemRow.classList.add("order-item");

                let newRow = document.createElement("div");
                newRow.classList.add("row");


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

                newRow = document.createElement("div");
                newRow.classList.add("row");
                orderItem = document.createElement("p");
                orderItem.classList.add("col");
                dataTitle = document.createElement("span");
                dataTitle.classList.add("data-title");
                dataTitle.appendChild(document.createTextNode("Item Price: "));
                orderItem.appendChild(dataTitle);
                orderItem.appendChild(document.createTextNode("$" + item.orderItem.price.toFixed(2)));
                newRow.appendChild(orderItem);
                itemRow.appendChild(newRow);

                newOrderDiv.appendChild(itemRow);
                itemCount++;
                });
            newRow = document.createElement('span');
            newRow.classList.add('divider-row');
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

            //submit button
            let newCol = document.createElement("div");
            newCol.classList.add("col-4");
            let viewOrderDetails = document.createElement("button");
            viewOrderDetails.classList.add("btn");
            viewOrderDetails.classList.add("btn-primary");
            viewOrderDetails.setAttribute("type", "button");
            viewOrderDetails.setAttribute("id", "submit-order-button");
            viewOrderDetails.addEventListener("click", () => {/*call function here*/}, false);
            viewOrderDetails.innerHTML = "Submit order now";
            newCol.appendChild(viewOrderDetails);
            newRow.appendChild(newCol);
            newOrderDiv.appendChild(newRow);
            textBox.appendChild(newOrderDiv);
                
            }
        }
    }

}





