// loads the menu items to place in the order create form
const getMenuItems = async (textBox) => {
    // get menu items
    const menuResponse = await fetch('http://localhost:3000/menuItems');
    const menuItems = await menuResponse.json();

    // get menu item topping list
    const toppingIDResponse = await fetch('http://localhost:3000/menuItemToppings');
    const toppingIDs = await toppingIDResponse.json();

    //get toppings
    const toppingResponse = await fetch('http://localhost:3000/toppings');
    const toppings = await toppingResponse.json();

    await generateNewAdminOrderForm(textBox, menuItems, toppingIDs, toppings);
}

function loadCreateOrderForm(formElement){
    getMenuItems(formElement);
}


function generateNewAdminOrderForm(textBox, menuItems, toppingIDs, toppings){

    // sort all the menu items and related details for easy access later
    let fullMenuDetails = [];
    for(let i = 0; i < menuItems.length; i++) {
        let currToppings = [];                        // empty array
        toppingIDs.map(item => {   // iterates over toppingIDs
            if(menuItems[i].menu_item_id === item.menu_item_id){   // if the menu item ids match
                // finds the topping with the specific topping_id and adds to array
                currToppings.push(toppings.find(topping => topping.topping_id === item.topping_id));
            }
        });
        fullMenuDetails.push({ menuItem: menuItems[i], toppings: currToppings });
    }
    console.log(fullMenuDetails);

    // create new form element
    const newForm = document.createElement("form");
    newForm.id = "admin-new-order-form";

    let newRow = document.createElement("div");
    newRow.classList.add("row");

    // TYPE OF ORDER ----------------------------------------------
    let newFieldset = document.createElement("fieldset");
    newFieldset.classList.add("col");
    newFieldset.setAttribute("id", "order_type");
    let newLegend = document.createElement("legend");
    newLegend.appendChild(document.createTextNode("Type of Order"));
    let newFormRow = document.createElement("div");
    newFormRow.classList.add("form-row");
    let newInputGroup = document.createElement("div");
    newInputGroup.classList.add("input-group");

    let newFormCheckOption = document.createElement("div");
    newFormCheckOption.classList.add("form-check");
    newFormCheckOption.classList.add("form-check-inline");
    let newInput = document.createElement("input");
    newInput.classList.add("form-check-input");
    newInput.setAttribute("type", "radio");
    newInput.setAttribute("id", "type_delivery");
    newInput.setAttribute("value", "delivery");
    newInput.setAttribute("name", "type");
    let newLabel = document.createElement("label");
    newLabel.classList.add("form-check-label");
    newLabel.setAttribute("for", "type_delivery");
    newLabel.innerHTML = "Delivery";
    newFormCheckOption.appendChild(newInput);
    newFormCheckOption.appendChild(newLabel);
    newInputGroup.appendChild(newFormCheckOption);

    newFormCheckOption = document.createElement("div");
    newFormCheckOption.classList.add("form-check");
    newFormCheckOption.classList.add("form-check-inline");
    newInput = document.createElement("input");
    newInput.classList.add("form-check-input");
    newInput.setAttribute("type", "radio");
    newInput.setAttribute("id", "type_takeout");
    newInput.setAttribute("value", "takeout");
    newInput.setAttribute("name", "type");
    newLabel = document.createElement("label");
    newLabel.classList.add("form-check-label");
    newLabel.setAttribute("for", "type_takeout");
    newLabel.innerHTML = "Take-Out";
    newFormCheckOption.appendChild(newInput);
    newFormCheckOption.appendChild(newLabel);
    newInputGroup.appendChild(newFormCheckOption);

    newFormCheckOption = document.createElement("div");
    newFormCheckOption.classList.add("form-check");
    newFormCheckOption.classList.add("form-check-inline");
    newInput = document.createElement("input");
    newInput.classList.add("form-check-input");
    newInput.setAttribute("type", "radio");
    newInput.setAttribute("id", "type_eatin");
    newInput.setAttribute("value", "eat-in");
    newInput.setAttribute("name", "type");
    newInput.setAttribute("checked", true);
    newLabel = document.createElement("label");
    newLabel.classList.add("form-check-label");
    newLabel.setAttribute("for", "type_eatin");
    newLabel.innerHTML = "Eat-In";
    newFormCheckOption.appendChild(newInput);
    newFormCheckOption.appendChild(newLabel);
    newInputGroup.appendChild(newFormCheckOption);
    newFormRow.appendChild(newInputGroup);
    newFieldset.appendChild(newLegend);
    newFieldset.appendChild(newFormRow);

    newRow.appendChild(newFieldset);

    // MODE OF PAYMENT ----------------------------------------------
    newFieldset = document.createElement("fieldset");
    newFieldset.classList.add("col");
    newFieldset.setAttribute("id", "payment");
    newLegend = document.createElement("legend");
    newLegend.appendChild(document.createTextNode("Mode of Payment"));
    newFormRow = document.createElement("div");
    newFormRow.classList.add("form-row");
    newInputGroup = document.createElement("div");
    newInputGroup.classList.add("input-group");

    newFormCheckOption = document.createElement("div");
    newFormCheckOption.classList.add("form-check");
    newFormCheckOption.classList.add("form-check-inline");
    newInput = document.createElement("input");
    newInput.classList.add("form-check-input");
    newInput.setAttribute("type", "radio");
    newInput.setAttribute("id", "payment_cash");
    newInput.setAttribute("value", "cash");
    newInput.setAttribute("name", "payment");
    newInput.setAttribute("checked", true);
    newLabel = document.createElement("label");
    newLabel.classList.add("form-check-label");
    newLabel.setAttribute("for", "payment_cash");
    newLabel.innerHTML = "Cash";
    newFormCheckOption.appendChild(newInput);
    newFormCheckOption.appendChild(newLabel);
    newInputGroup.appendChild(newFormCheckOption);

    newFormCheckOption = document.createElement("div");
    newFormCheckOption.classList.add("form-check");
    newFormCheckOption.classList.add("form-check-inline");
    newInput = document.createElement("input");
    newInput.classList.add("form-check-input");
    newInput.setAttribute("type", "radio");
    newInput.setAttribute("id", "payment_credit");
    newInput.setAttribute("value", "credit");
    newInput.setAttribute("name", "payment");
    newLabel = document.createElement("label");
    newLabel.classList.add("form-check-label");
    newLabel.setAttribute("for", "payment_credit");
    newLabel.innerHTML = "Credit Card";
    newFormCheckOption.appendChild(newInput);
    newFormCheckOption.appendChild(newLabel);
    newInputGroup.appendChild(newFormCheckOption);
    newFormRow.appendChild(newInputGroup);
    newFieldset.appendChild(newLegend);
    newFieldset.appendChild(newFormRow);

    newRow.appendChild(newFieldset);
    newForm.appendChild(newRow);

    // Scheduled For Time ----------------------------------------------
    newFieldset = document.createElement("fieldset");
    newFieldset.classList.add("col");
    newFieldset.setAttribute("id", "schedule");
    newLegend = document.createElement("legend");
    newLegend.appendChild(document.createTextNode("Schedule Date & Time"));
    newFormRow = document.createElement("div");
    newFormRow.classList.add("form-row");
    newInputGroup = document.createElement("div");
    newInputGroup.classList.add("input-group");

    let date = new Date();
    let month = date.getMonth() < 9 ? "0" + (date.getMonth()+1) : date.getMonth()+1;
    let day = date.getDate() < 9 ? "0" + (date.getDate()) : date.getDate();
    let hour = date.getHours() < 9 ? "0" + (date.getHours()) : date.getHours();
    let minutes = date.getMinutes() < 9 ? "0" + (date.getMinutes()) : date.getMinutes();
    console.log(date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate());
    newFormCheckOption = document.createElement("div");
    newFormCheckOption.classList.add("row");
    newInput = document.createElement("input");
    newInput.setAttribute("type", "date");
    newInput.setAttribute("id", "scheduled_date");
    newInput.setAttribute("name", "scheduled_date");
    newInput.setAttribute("value", date.getFullYear() + "-" + month + "-" + day);
    newInput.setAttribute("min", date.getFullYear() + "-" + month + "-" + day);
    newInput.setAttribute("max", date.getFullYear()+1 + "-" + month + "-" + day);
    newInput.classList.add("form-control");
    newInput.classList.add("col");
    newFormCheckOption.appendChild(newInput);
    newInput = document.createElement("input");
    newInput.setAttribute("type", "time");
    newInput.setAttribute("id", "scheduled_time");
    newInput.setAttribute("name", "scheduled_time");
    newInput.setAttribute("value", hour + ":" + minutes);
    newInput.setAttribute("min", "08:00");
    newInput.setAttribute("max", "21:00");
    newInput.classList.add("form-control");
    newInput.classList.add("col");
    newFormCheckOption.appendChild(newInput);

    newFieldset.appendChild(newLegend);
    newFieldset.appendChild(newFormCheckOption);

    newRow.appendChild(newFieldset);
    newForm.appendChild(newRow);


    // CUSTOMER INFORMATION ----------------------------------------------
    newFieldset = document.createElement("fieldset");
    newFieldset.setAttribute("id", "customer_info");
    newLegend = document.createElement("legend");
    newLegend.appendChild(document.createTextNode("Customer Information"));

    newFormRow = document.createElement("div");
    newFormRow.classList.add("form-row");

    newInputGroup = document.createElement("div");
    newInputGroup.classList.add("form-group");
    newInputGroup.classList.add("col");
    newLabel = document.createElement("label");
    newLabel.setAttribute("for", "customer_fname");
    newLabel.innerHTML = "Customer First Name *";
    newInput = document.createElement("input");
    newInput.classList.add("form-control");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("id", "customer_fname");
    newInput.setAttribute("name", "customer_fname")
    newInput.setAttribute("placeholder", "John");
    newInput.setAttribute("required", true);
    newInputGroup.appendChild(newLabel);
    newInputGroup.appendChild(newInput);
    newFormRow.appendChild(newInputGroup);

    newInputGroup = document.createElement("div");
    newInputGroup.classList.add("form-group");
    newInputGroup.classList.add("col");
    newLabel = document.createElement("label");
    newLabel.setAttribute("for", "customer_lname");
    newLabel.innerHTML = "Customer Last Name *";
    newInput = document.createElement("input");
    newInput.classList.add("form-control");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("id", "customer_lname");
    newInput.setAttribute("name", "customer_lname");
    newInput.setAttribute("placeholder", "Smith");
    newInput.setAttribute("required", true);
    newInputGroup.appendChild(newLabel);
    newInputGroup.appendChild(newInput);

    newFormRow.appendChild(newInputGroup);
    newFieldset.appendChild(newLegend);
    newFieldset.appendChild(newFormRow);

    newFormRow = document.createElement("div");
    newFormRow.classList.add("form-row");

    newInputGroup = document.createElement("div");
    newInputGroup.classList.add("form-group");
    newInputGroup.classList.add("col");
    newLabel = document.createElement("label");
    newLabel.setAttribute("for", "customer_id");
    newLabel.innerHTML = "Customer ID";
    newInput = document.createElement("input");
    newInput.classList.add("form-control");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("id", "customer_id");
    newInput.setAttribute("name", "customer_id");
    newInput.setAttribute("placeholder", "optional");
    newInputGroup.appendChild(newLabel);
    newInputGroup.appendChild(newInput);
    newFormRow.appendChild(newInputGroup);

    newInputGroup = document.createElement("div");
    newInputGroup.classList.add("form-group");
    newInputGroup.classList.add("col");
    newLabel = document.createElement("label");
    newLabel.setAttribute("for", "customer_email");
    newLabel.innerHTML = "Email";
    newInput = document.createElement("input");
    newInput.classList.add("form-control");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("id", "customer_email");
    newInput.setAttribute("name", "customer_email");
    newInput.setAttribute("placeholder", "email@domain.com");
    newInputGroup.appendChild(newLabel);
    newInputGroup.appendChild(newInput);
    newFormRow.appendChild(newInputGroup);
    newFieldset.appendChild(newFormRow);

    newFormRow = document.createElement("div");
    newFormRow.classList.add("form-row");

    newInputGroup = document.createElement("div");
    newInputGroup.classList.add("form-group");
    newInputGroup.classList.add("col");
    newLabel = document.createElement("label");
    newLabel.setAttribute("for", "customer_addr");
    newLabel.innerHTML = "Address";
    newInput = document.createElement("input");
    newInput.classList.add("form-control");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("id", "customer_addr");
    newInput.setAttribute("name", "customer_addr");
    newInput.setAttribute("placeholder", "1234 Main St");
    newInputGroup.appendChild(newLabel);
    newInputGroup.appendChild(newInput);
    newFormRow.appendChild(newInputGroup);

    newInputGroup = document.createElement("div");
    newInputGroup.classList.add("form-group");
    newInputGroup.classList.add("col");
    newLabel = document.createElement("label");
    newLabel.setAttribute("for", "customer_addr2");
    newLabel.innerHTML = "Address 2";
    newInput = document.createElement("input");
    newInput.classList.add("form-control");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("id", "customer_addr2");
    newInput.setAttribute("name", "customer_addr2");
    newInput.setAttribute("placeholder", "Apartment, studio, or floor");
    newInputGroup.appendChild(newLabel);
    newInputGroup.appendChild(newInput);
    newFormRow.appendChild(newInputGroup);
    newFieldset.appendChild(newFormRow);

    newFormRow = document.createElement("div");
    newFormRow.classList.add("form-row");

    newInputGroup = document.createElement("div");
    newInputGroup.classList.add("form-group");
    newInputGroup.classList.add("col-md-6");
    newLabel = document.createElement("label");
    newLabel.setAttribute("for", "customer_city");
    newLabel.innerHTML = "City";
    newInput = document.createElement("input");
    newInput.classList.add("form-control");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("id", "customer_city");
    newInput.setAttribute("name", "customer_city");
    newInput.setAttribute("placeholder", "Harrisburg");
    newInputGroup.appendChild(newLabel);
    newInputGroup.appendChild(newInput);
    newFormRow.appendChild(newInputGroup);

    newInputGroup = document.createElement("div");
    newInputGroup.classList.add("form-group");
    newInputGroup.classList.add("col-md-4");
    newLabel = document.createElement("label");
    newLabel.setAttribute("for", "customer_state");
    newLabel.innerHTML = "State";
    newInput = document.createElement("input");
    newInput.classList.add("form-control");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("id", "customer_state");
    newInput.setAttribute("name", "customer_state");
    newInput.setAttribute("placeholder", "Pennsylvania");
    newInputGroup.appendChild(newLabel);
    newInputGroup.appendChild(newInput);
    newFormRow.appendChild(newInputGroup);

    newInputGroup = document.createElement("div");
    newInputGroup.classList.add("form-group");
    newInputGroup.classList.add("col-md-2");
    newLabel = document.createElement("label");
    newLabel.setAttribute("for", "customer_zip");
    newLabel.innerHTML = "Zip";
    newInput = document.createElement("input");
    newInput.classList.add("form-control");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("id", "customer_zip");
    newInput.setAttribute("name", "customer_zip");
    newInput.setAttribute("placeholder", "12345");
    newInputGroup.appendChild(newLabel);
    newInputGroup.appendChild(newInput);
    newFormRow.appendChild(newInputGroup);
    newFieldset.appendChild(newFormRow);
    newForm.appendChild(newFieldset);


    // MENU ITEMS ----------------------------------------------
    newFieldset = document.createElement("fieldset");
    newFieldset.setAttribute("id", "order-menu-options");

    newLegend = document.createElement("legend");
    newLegend.appendChild(document.createTextNode("Menu Items"));
    newFieldset.appendChild(newLegend);

    newFormRow = document.createElement("div");
    newFormRow.classList.add("form-row");
    newFormRow.classList.add("form-group");

    newInputGroup = document.createElement("div");
    newInputGroup.classList.add("col-10");
    let newSelect = document.createElement("select");
    newSelect.classList.add("form-control");
    newSelect.setAttribute("id", "menuItemOptions");
    // add each menu item as an option
    fullMenuDetails.map(item => {
        newInput = document.createElement("option");
        newInput.setAttribute("value", item.menuItem.menu_item_id);
        newInput.innerHTML = item.menuItem.item_name;
        newSelect.appendChild(newInput);
    });
    newInputGroup.appendChild(newSelect);
    newInput = document.createElement("button");
    newInput.classList.add("btn");
    newInput.classList.add("btn-primary");
    newInput.classList.add("col-1");
    newInput.setAttribute("type", "button");
    newInput.setAttribute("id", "add-menu-item-to-order");
    newInput.innerHTML = "Add";

    newFormRow.appendChild(newInputGroup);
    newFormRow.appendChild(newInput);
    newFieldset.appendChild(newFormRow);

    // where the items will be added
    let newDiv = document.createElement("div");
    newDiv.setAttribute("id", "add-item-location");
    newFieldset.appendChild(newDiv);

    newForm.appendChild(newFieldset);


    // ORDER INFORMATION ----------------------------------------------
    newFieldset = document.createElement("fieldset");
    newFieldset.setAttribute("id", "order_info");
    newLegend = document.createElement("legend");
    newLegend.appendChild(document.createTextNode("Order Information"));
    newFieldset.appendChild(newLegend);

    newFormRow = document.createElement("div");
    newFormRow.classList.add("form-row");

    newInputGroup = document.createElement("div");
    newInputGroup.classList.add("form-group");
    newInputGroup.classList.add("col-6");
    newLabel = document.createElement("label");
    newLabel.setAttribute("for", "order_notes");
    newLabel.innerHTML = "Order Notes";
    newInput = document.createElement("textarea");
    newInput.classList.add("form-control");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("id", "order_notes");
    newInput.setAttribute("name", "order_notes");
    newInput.setAttribute("rows", "3");
    newInputGroup.appendChild(newLabel);
    newInputGroup.appendChild(newInput);
    newFormRow.appendChild(newInputGroup);

    newInputGroup = document.createElement("div");
    newInputGroup.classList.add("order-prices");
    newInputGroup.classList.add("col-6");
    newLabel = document.createElement("p");
    newLabel.setAttribute("id", "order-subtotal");
    newLabel.setAttribute("name", "order-subtotal");
    newLabel.setAttribute("data-price", "0.00");
    newLabel.innerHTML = "Subtotal: $0.00";
    newInputGroup.appendChild(newLabel);
    newLabel = document.createElement("p");
    newLabel.setAttribute("id", "order-tip");
    newLabel.setAttribute("name", "order-tip");
    newLabel.setAttribute("data-price", "0.00");
    newLabel.innerHTML = "Tip: $0.00";
    newInputGroup.appendChild(newLabel);
    newLabel = document.createElement("p");
    newLabel.setAttribute("id", "order-tax");
    newLabel.setAttribute("name", "order-tax");
    newLabel.setAttribute("data-price", "0.00");
    newLabel.innerHTML = "Tax: $0.00";
    newInputGroup.appendChild(newLabel);
    newLabel = document.createElement("p");
    newLabel.setAttribute("id", "order-total");
    newLabel.setAttribute("name", "order-total");
    newLabel.setAttribute("data-price", "0.00");
    newLabel.innerHTML = "Total: $0.00";
    newInputGroup.appendChild(newLabel);
    newFormRow.appendChild(newInputGroup);

    newFieldset.appendChild(newFormRow);
    newForm.appendChild(newFieldset);

    // BUTTONS ----------------------------------------------
    newFormRow = document.createElement("div");
    newFormRow.classList.add("button-row");

    newInput = document.createElement("a");
    newInput.classList.add("btn");
    newInput.classList.add("btn-primary");
    newInput.setAttribute("href", "admin-orders.html");
    newInput.setAttribute("id", "admin-cancel-new-order");
    newInput.innerHTML = "Cancel";
    newFormRow.appendChild(newInput);
    newFormRow.appendChild(document.createTextNode(" "));
    newInput = document.createElement("button");
    newInput.classList.add("btn");
    newInput.classList.add("btn-primary");
    newInput.setAttribute("type", "button");
    newInput.innerHTML = "Save Order";
    newInput.addEventListener('click', () => processFormContents(), false);
    newFormRow.appendChild(newInput);

    newForm.appendChild(newFormRow);

    textBox.appendChild(newForm);
    setupMenuItemSelect(fullMenuDetails, toppings);
}

function addAdminOrderToDB(orderInfo, orderItems, customerInfo){
    saveAdminOrder(orderInfo, orderItems, customerInfo);
}

const saveAdminOrder = async (orderInfo, orderItems) => {
    const combinedOrder = {order: orderInfo, items: orderItems};
    const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        body: JSON.stringify(combinedOrder), // string or object
        headers: {
            'Content-Type': 'application/json'
        }
    });

    await document.getElementById("admin-new-order-form").reset();
    if(orderInfo.payment_type === "cash"){
        alert("Your order has been saved.");
        window.location.replace("admin-orders.html");
    }
    else {
        alert("Your order has been saved. To accept payment, click here.");
        window.location.replace("admin-orders.html");
    }
}


