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

// loads the menu items to place in the order create form
const getMenuItemsForEdit = async (textBox, currentOrder, currentOrderItems) => {
    // get menu items
    const menuResponse = await fetch('http://localhost:3000/menuItems');
    const menuItems = await menuResponse.json();

    // get menu item topping list
    const toppingIDResponse = await fetch('http://localhost:3000/menuItemToppings');
    const toppingIDs = await toppingIDResponse.json();

    //get toppings
    const toppingResponse = await fetch('http://localhost:3000/toppings');
    const toppings = await toppingResponse.json();

    await generateEditAdminOrderForm(textBox, menuItems, toppingIDs, toppings, currentOrder, currentOrderItems);
}

function loadCreateOrderForm(formElement){
    getMenuItems(formElement);
}

function loadCreateOrderForm(formElement, currentOrder, currentOrderItems){
    getMenuItemsForEdit(formElement, currentOrder, currentOrderItems);
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
    let day = date.getDate() <= 9 ? "0" + (date.getDate()) : date.getDate();
    let hour = date.getHours() <= 9 ? "0" + (date.getHours()) : date.getHours();
    let minutes = date.getMinutes() <= 9 ? "0" + (date.getMinutes()) : date.getMinutes();
    console.log(date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate());
    console.log(date.getFullYear() + "-" + month + "-" + day);
    newFormCheckOption = document.createElement("div");
    newFormCheckOption.classList.add("row");
    newInput = document.createElement("input");
    newInput.setAttribute("type", "date");
    newInput.setAttribute("id", "scheduled_date");
    newInput.setAttribute("name", "scheduled_date");
    newInput.setAttribute("value", date.getFullYear() + "-" + month + "-" + day);
    //newInput.setAttribute("min", date.getFullYear() + "-" + month + "-" + day);
    //newInput.setAttribute("max", date.getFullYear()+1 + "-" + month + "-" + day);
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

function generateEditAdminOrderForm(textBox, menuItems, toppingIDs, toppings, currentOrder, currentOrderItems){

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
    console.log("----------------------------");
    console.log(fullMenuDetails);
    console.log(currentOrder);
    console.log(currentOrderItems);
    console.log("----------------------------");

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
    if(orderDetails.order_type === "delivery") {newInput.setAttribute("checked", true);}
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
    if(orderDetails.order_type === "takeout") {newInput.setAttribute("checked", true);}
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
    if(orderDetails.order_type === "eat-in") {newInput.setAttribute("checked", true);}
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
    if(orderDetails.payment_type === "cash") {newInput.setAttribute("checked", true);}
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
    if(orderDetails.payment_type === "credit") {newInput.setAttribute("checked", true);}
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
    let day = date.getDate() <= 9 ? "0" + (date.getDate()) : date.getDate();
    let hour = date.getHours() <= 9 ? "0" + (date.getHours()) : date.getHours();
    let minutes = date.getMinutes() <= 9 ? "0" + (date.getMinutes()) : date.getMinutes();
    let sched_date = orderDetails.date_time_scheduled.split("T")[0];
    let sched_time = orderDetails.date_time_scheduled.split("T")[1].split('.')[0];
    newFormCheckOption = document.createElement("div");
    newFormCheckOption.classList.add("row");
    newInput = document.createElement("input");
    newInput.setAttribute("type", "date");
    newInput.setAttribute("id", "scheduled_date");
    newInput.setAttribute("name", "scheduled_date");
    newInput.setAttribute("value", sched_date);
    newInput.classList.add("form-control");
    newInput.classList.add("col");
    newFormCheckOption.appendChild(newInput);
    newInput = document.createElement("input");
    newInput.setAttribute("type", "time");
    newInput.setAttribute("id", "scheduled_time");
    newInput.setAttribute("name", "scheduled_time");
    newInput.setAttribute("value", sched_time);
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
    if(orderDetails.first_name) {newInput.setAttribute("value", orderDetails.first_name);}
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
    if(orderDetails.last_name) {newInput.setAttribute("value", orderDetails.last_name);}
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
    if(orderDetails.customer_id) {newInput.setAttribute("value", orderDetails.customer_id);}
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
    if(orderDetails.email) {newInput.setAttribute("value", orderDetails.email);}
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
    if(orderDetails.address1) {newInput.setAttribute("value", orderDetails.address1);}
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
    if(orderDetails.address2) {newInput.setAttribute("value", orderDetails.address2);}
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
    if(orderDetails.addr_city) {newInput.setAttribute("value", orderDetails.addr_city);}
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
    if(orderDetails.addr_state) {newInput.setAttribute("value", orderDetails.addr_state);}
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
    if(orderDetails.addr_zip) {newInput.setAttribute("value", orderDetails.addr_zip);}
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
    let itemLocationDiv = document.createElement("div");
    itemLocationDiv.setAttribute("id", "add-item-location");

    // add existing menu items to order
    for(let i = 0; i < orderItems.length; i++) {
        const currMenuItem = fullMenuDetails.find(item => item.menuItem.item_name === orderItems[i].orderItem.item_name);

        let newItemRow = document.createElement("div");
        newItemRow.classList.add("item-row");
        newItemRow.setAttribute("id", "menu-item-" + menuItemCount);
        let newRow = document.createElement("div");
        newRow.classList.add("row");
        newRow.classList.add("item-row-title");
        newRow.setAttribute("data-name", currMenuItem.menuItem.item_name);
        newRow.setAttribute("id", "menu-item-" + menuItemCount);
        newRow.appendChild(document.createTextNode(currMenuItem.menuItem.item_name));
        let removeButton = document.createElement("button");
        removeButton.setAttribute("type", "button");
        removeButton.setAttribute("id", "menu-item-" + menuItemCount);
        removeButton.classList.add("remove-button");
        removeButton.innerHTML = "Remove";
        newRow.appendChild(removeButton);
        newItemRow.appendChild(newRow);

        // sizeRow = Size:
        let sizeRow = document.createElement("div");
        sizeRow.classList.add("form-row");
        let sizeLabel = document.createElement("label");
        sizeLabel.innerHTML = "Crust Type:";
        let sizeInputGroup = document.createElement("div");
        sizeInputGroup.classList.add("input-group");

        let newFormCheckOption = document.createElement("div");
        newFormCheckOption.classList.add("form-check");
        newFormCheckOption.classList.add("form-check-inline");
        let newInput = document.createElement("input");
        newInput.classList.add("form-check-input");
        newInput.classList.add("order-item-price");
        newInput.setAttribute("type", "radio");
        newInput.setAttribute("id", "size_sm_" + menuItemCount);
        newInput.setAttribute("name", "size_" + menuItemCount);
        newInput.setAttribute("value", "small");
        newInput.setAttribute("data-sizeprice", currMenuItem.menuItem.sm_price);
        newInput.setAttribute("checked", true);
        newInput.addEventListener("change", () => updatePrices(), false);
        let newLabel = document.createElement("label");
        newLabel.classList.add("form-check-label");
        newLabel.setAttribute("for", "size_sm");
        newLabel.innerHTML = "Small: $" + currMenuItem.menuItem.sm_price.toFixed(2);
        newFormCheckOption.appendChild(newInput);
        newFormCheckOption.appendChild(newLabel);
        sizeInputGroup.appendChild(newFormCheckOption);

        newFormCheckOption = document.createElement("div");
        newFormCheckOption.classList.add("form-check");
        newFormCheckOption.classList.add("form-check-inline");
        newInput = document.createElement("input");
        newInput.classList.add("form-check-input");
        newInput.classList.add("order-item-price");
        newInput.setAttribute("type", "radio");
        newInput.setAttribute("id", "size_med_" + menuItemCount);
        newInput.setAttribute("name", "size_" + menuItemCount);
        newInput.setAttribute("value", "medium");
        newInput.setAttribute("data-sizeprice", currMenuItem.menuItem.med_price);
        newInput.addEventListener("change", () => updatePrices(), false);
        newLabel = document.createElement("label");
        newLabel.classList.add("form-check-label");
        newLabel.setAttribute("for", "size_med");
        newLabel.innerHTML = "Medium: $" + currMenuItem.menuItem.med_price.toFixed(2);
        newFormCheckOption.appendChild(newInput);
        newFormCheckOption.appendChild(newLabel);
        sizeInputGroup.appendChild(newFormCheckOption);

        newFormCheckOption = document.createElement("div");
        newFormCheckOption.classList.add("form-check");
        newFormCheckOption.classList.add("form-check-inline");
        newInput = document.createElement("input");
        newInput.classList.add("form-check-input");
        newInput.classList.add("order-item-price");
        newInput.setAttribute("type", "radio");
        newInput.setAttribute("id", "size_lg_" + menuItemCount);
        newInput.setAttribute("name", "size_" + menuItemCount);
        newInput.setAttribute("value", "large");
        newInput.setAttribute("data-sizeprice", currMenuItem.menuItem.lg_price);
        newInput.addEventListener("change", () => updatePrices(), false);
        newLabel = document.createElement("label");
        newLabel.classList.add("form-check-label");
        newLabel.setAttribute("for", "size_lg");
        newLabel.innerHTML = "Large: $" + currMenuItem.menuItem.lg_price.toFixed(2);
        newFormCheckOption.appendChild(newInput);
        newFormCheckOption.appendChild(newLabel);
        sizeInputGroup.appendChild(newFormCheckOption);

        newFormCheckOption = document.createElement("div");
        newFormCheckOption.classList.add("form-check");
        newFormCheckOption.classList.add("form-check-inline");
        newInput = document.createElement("input");
        newInput.classList.add("form-check-input");
        newInput.classList.add("order-item-price");
        newInput.setAttribute("type", "radio");
        newInput.setAttribute("id", "size_xlg_" + menuItemCount);
        newInput.setAttribute("value", "large");
        newInput.setAttribute("name", "size_" + menuItemCount);
        newInput.setAttribute("data-sizeprice", currMenuItem.menuItem.xlg_price);
        newInput.addEventListener("change", () => updatePrices(), false);
        newLabel = document.createElement("label");
        newLabel.classList.add("form-check-label");
        newLabel.setAttribute("for", "size_xlg");
        newLabel.innerHTML = "Extra Large: $" + currMenuItem.menuItem.xlg_price.toFixed(2);
        newFormCheckOption.appendChild(newInput);
        newFormCheckOption.appendChild(newLabel);
        sizeInputGroup.appendChild(newFormCheckOption);

        sizeRow.appendChild(sizeLabel);
        sizeRow.appendChild(sizeInputGroup);
        newItemRow.appendChild(sizeRow);


        // crustRow = Crust Type
        let crustRow = document.createElement("div");
        crustRow.classList.add("form-row");
        let crustLabel = document.createElement("label");
        crustLabel.innerHTML = "Crust Type:";
        let crustInputGroup = document.createElement("div");
        crustInputGroup.classList.add("input-group");

        newFormCheckOption = document.createElement("div");
        newFormCheckOption.classList.add("form-check");
        newFormCheckOption.classList.add("form-check-inline");
        newInput = document.createElement("input");
        newInput.classList.add("form-check-input");
        newInput.classList.add("crust-type");
        newInput.setAttribute("type", "radio");
        newInput.setAttribute("id", "crust_thin_" + menuItemCount);
        newInput.setAttribute("value", "thin-crust");
        newInput.setAttribute("name", "crust_" + menuItemCount);
        if(currMenuItem.menuItem.crust === "thin-crust"){
            newInput.setAttribute("checked", true);
        }
        newLabel = document.createElement("label");
        newLabel.classList.add("form-check-label");
        newLabel.setAttribute("for", "crust_thin");
        newLabel.innerHTML = "Thin-Crust";
        newFormCheckOption.appendChild(newInput);
        newFormCheckOption.appendChild(newLabel);
        crustInputGroup.appendChild(newFormCheckOption);

        newFormCheckOption = document.createElement("div");
        newFormCheckOption.classList.add("form-check");
        newFormCheckOption.classList.add("form-check-inline");
        newInput = document.createElement("input");
        newInput.classList.add("form-check-input");
        newInput.classList.add("crust-type");
        newInput.setAttribute("type", "radio");
        newInput.setAttribute("id", "crust_thick_" + menuItemCount);
        newInput.setAttribute("value", "thick-crust");
        newInput.setAttribute("name", "crust_" + menuItemCount);
        if(currMenuItem.menuItem.crust === "thick-crust"){
            newInput.setAttribute("checked", true);
        }
        newLabel = document.createElement("label");
        newLabel.classList.add("form-check-label");
        newLabel.setAttribute("for", "crust_thick");
        newLabel.innerHTML = "Thick-Crust";
        newFormCheckOption.appendChild(newInput);
        newFormCheckOption.appendChild(newLabel);
        crustInputGroup.appendChild(newFormCheckOption);

        newFormCheckOption = document.createElement("div");
        newFormCheckOption.classList.add("form-check");
        newFormCheckOption.classList.add("form-check-inline");
        newInput = document.createElement("input");
        newInput.classList.add("form-check-input");
        newInput.classList.add("crust-type");
        newInput.setAttribute("type", "radio");
        newInput.setAttribute("id", "crust_wholewheat_" + menuItemCount);
        newInput.setAttribute("value", "whole-wheat-crust");
        newInput.setAttribute("name", "crust_" + menuItemCount);
        if(currMenuItem.menuItem.crust === "whole-wheat-crust"){
            newInput.setAttribute("checked", true);
        }
        newLabel = document.createElement("label");
        newLabel.classList.add("form-check-label");
        newLabel.setAttribute("for", "crust_wholewheat");
        newLabel.innerHTML = "Whole Wheat";
        newFormCheckOption.appendChild(newInput);
        newFormCheckOption.appendChild(newLabel);
        crustInputGroup.appendChild(newFormCheckOption);

        newFormCheckOption = document.createElement("div");
        newFormCheckOption.classList.add("form-check");
        newFormCheckOption.classList.add("form-check-inline");
        newInput = document.createElement("input");
        newInput.classList.add("form-check-input");
        newInput.classList.add("crust-type");
        newInput.setAttribute("type", "radio");
        newInput.setAttribute("id", "crust_glutenfree_" + menuItemCount);
        newInput.setAttribute("value", "gluten-free-crust");
        newInput.setAttribute("name", "crust_" + menuItemCount);
        if(currMenuItem.menuItem.crust === "gluten-free-crust"){
            newInput.setAttribute("checked", true);
        }
        newLabel = document.createElement("label");
        newLabel.classList.add("form-check-label");
        newLabel.setAttribute("for", "crust_glutenfree");
        newLabel.innerHTML = "Gluten Free";
        newFormCheckOption.appendChild(newInput);
        newFormCheckOption.appendChild(newLabel);
        crustInputGroup.appendChild(newFormCheckOption);

        crustRow.appendChild(crustLabel);
        crustRow.appendChild(crustInputGroup);
        newItemRow.appendChild(crustRow);

        let toppingOptions = document.createElement("div");
        toppingOptions.classList.add("topping-options-div");
        // sauceRow = Sauce(s)
        let sauceRow = document.createElement("div");
        sauceRow.classList.add("form-row");
        let sauceLabel = document.createElement("label");
        sauceLabel.innerHTML = "Sauce(s):";
        let sauceInputGroup = document.createElement("div");
        sauceInputGroup.classList.add("input-group");

        // cheeseRow = Cheese(s)
        let cheeseRow = document.createElement("div");
        cheeseRow.classList.add("form-row");
        let cheeseLabel = document.createElement("label");
        cheeseLabel.innerHTML = "Cheese(s):";
        let cheeseInputGroup = document.createElement("div");
        cheeseInputGroup.classList.add("input-group");

        // toppingRow = Topping(s)
        let toppingRow = document.createElement("div");
        toppingRow.classList.add("form-row");
        let toppingLabel = document.createElement("label");
        toppingLabel.innerHTML = "Topping(s):";
        let toppingInputGroup = document.createElement("div");
        toppingInputGroup.classList.add("input-group");

        for(let i = 0; i < toppings.length; i++){
            let formCheck = document.createElement("div");
            formCheck.classList.add("form-check");
            formCheck.classList.add("form-check-inline");
            let checkLabel = document.createElement("label");
            checkLabel.classList.add("form-check-label");

            if(toppings[i].topping_category === "sauce"){
                checkLabel.setAttribute("for", "topping_id-" + toppings[i].topping_id);
                checkLabel.innerHTML = toppings[i].topping_name;
                let checkInput = document.createElement("input");
                checkInput.setAttribute("type", "checkbox");
                checkInput.setAttribute("name", "topping");
                checkInput.setAttribute("id", toppings[i].topping_id);
                checkInput.setAttribute("value", toppings[i].topping_name);
                if(currMenuItem.toppings.map(item => item.topping_id).includes(toppings[i].topping_id)){
                    checkInput.setAttribute("checked", true);
                }
                formCheck.appendChild(checkInput);
                formCheck.appendChild(checkLabel);
                sauceInputGroup.appendChild(formCheck);
            }
            else if(toppings[i].topping_category === "cheese"){
                checkLabel.setAttribute("for", "topping_id-" + toppings[i].topping_id);
                checkLabel.innerHTML = toppings[i].topping_name;
                let checkInput = document.createElement("input");
                checkInput.setAttribute("type", "checkbox");
                checkInput.setAttribute("name", "topping");
                checkInput.setAttribute("id", toppings[i].topping_id);
                checkInput.setAttribute("value", toppings[i].topping_name);
                if(currMenuItem.toppings.map(item => item.topping_id).includes(toppings[i].topping_id)){
                    checkInput.setAttribute("checked", true);
                }
                formCheck.appendChild(checkInput);
                formCheck.appendChild(checkLabel);
                cheeseInputGroup.appendChild(formCheck);
            }
            else {
                checkLabel.setAttribute("for", "toppingid_" + toppings[i].topping_id);
                checkLabel.innerHTML = toppings[i].topping_name;
                let checkInput = document.createElement("input");
                checkInput.setAttribute("type", "checkbox");
                checkInput.setAttribute("name", "topping");
                checkInput.setAttribute("id", toppings[i].topping_id);
                checkInput.setAttribute("value", toppings[i].topping_name);
                if(currMenuItem.toppings.map(item => item.topping_id).includes(toppings[i].topping_id)){
                    checkInput.setAttribute("checked", true);
                }
                formCheck.appendChild(checkInput);
                formCheck.appendChild(checkLabel);
                toppingInputGroup.appendChild(formCheck);
            }
        }
        sauceRow.appendChild(sauceLabel);
        sauceRow.appendChild(sauceInputGroup);
        cheeseRow.appendChild(cheeseLabel);
        cheeseRow.appendChild(cheeseInputGroup);
        toppingRow.appendChild(toppingLabel);
        toppingRow.appendChild(toppingInputGroup);
        toppingOptions.appendChild(sauceRow);
        toppingOptions.appendChild(cheeseRow);
        toppingOptions.appendChild(toppingRow);
        newItemRow.appendChild(toppingOptions);

        newRow = document.createElement("div");
        newRow.classList.add("form-row");
        let noteLabel = document.createElement("label");
        noteLabel.setAttribute("for", "description");
        noteLabel.innerHTML = "Item Notes:";
        let noteInput = document.createElement("textarea");
        noteInput.setAttribute("rows", "2");
        noteInput.setAttribute("name", "notes");
        noteInput.setAttribute("id", "notes");
        noteInput.classList.add("form-control");
        newRow.appendChild(noteLabel);
        newRow.appendChild(noteInput);
        newItemRow.appendChild(newRow);


        itemLocationDiv.appendChild(newItemRow);
        menuItemCount++;
    }
    newFieldset.appendChild(itemLocationDiv);

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
    if(orderDetails.notes) {newInput.value = orderDetails.notes;}
    newInputGroup.appendChild(newLabel);
    newInputGroup.appendChild(newInput);
    newFormRow.appendChild(newInputGroup);

    newInputGroup = document.createElement("div");
    newInputGroup.classList.add("order-prices");
    newInputGroup.classList.add("col-6");
    newLabel = document.createElement("p");
    newLabel.setAttribute("id", "order-subtotal");
    newLabel.setAttribute("name", "order-subtotal");
    newLabel.setAttribute("data-price", orderDetails.sub_total_price);
    newLabel.innerHTML = "Subtotal: $" + orderDetails.sub_total_price.toFixed(2);
    newInputGroup.appendChild(newLabel);
    newLabel = document.createElement("p");
    newLabel.setAttribute("id", "order-tip");
    newLabel.setAttribute("name", "order-tip");
    newLabel.setAttribute("data-price", orderDetails.tip_price);
    newLabel.innerHTML = "Tip: $"  + orderDetails.tip_price.toFixed(2);
    newInputGroup.appendChild(newLabel);
    newLabel = document.createElement("p");
    newLabel.setAttribute("id", "order-tax");
    newLabel.setAttribute("name", "order-tax");
    newLabel.setAttribute("data-price", orderDetails.tax_price);
    newLabel.innerHTML = "Tax: $"  + orderDetails.tax_price.toFixed(2);
    newInputGroup.appendChild(newLabel);
    newLabel = document.createElement("p");
    newLabel.setAttribute("id", "order-total");
    newLabel.setAttribute("name", "order-total");
    newLabel.setAttribute("data-price", orderDetails.total_price);
    newLabel.innerHTML = "Total: $"  + orderDetails.total_price.toFixed(2);
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
    setupMenuItemSelect(fullMenuDetails, toppings, menuItemCount);
}

function addAdminOrderToDB(orderInfo, orderItems, customerInfo){
    saveAdminOrder(orderInfo, orderItems, customerInfo);
}

const saveAdminOrder = async (orderInfo, orderItems) => {
    const combinedOrder = {order: orderInfo, items: orderItems};
    const response = await fetch('http://localhost:3000/orders/admin', {
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

const updateAdminOrder = async (orderInfo, orderItems) => {
    const combinedOrder = {order: orderInfo, items: orderItems};
    const response = await fetch('http://localhost:3000/orders/admin/' + orderInfo.order_id, {
        method: 'PUT',
        body: JSON.stringify(combinedOrder), // string or object
        headers: {
            'Content-Type': 'application/json'
        }
    });

    await document.getElementById("admin-new-order-form").reset();
    if(orderInfo.payment_type === "cash"){
        alert("Your order has been updated.");
        window.location.replace("admin-orders.html");
    }
    else {
        alert("Your order has been updated. To accept payment, click here.");
        window.location.replace("admin-orders.html");
    }
}


