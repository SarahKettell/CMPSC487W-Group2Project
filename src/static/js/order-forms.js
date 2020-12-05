// loads the menu items to place in the order create form
const getMenuItems = async (textBox, type) => {
    // get menu items
    const menuResponse = await fetch('http://localhost:3000/menuItems');
    const menuItems = await menuResponse.json();

    // get menu item topping list
    const toppingIDResponse = await fetch('http://localhost:3000/menuItemToppings');
    const toppingIDs = await toppingIDResponse.json();

    //get toppings
    const toppingResponse = await fetch('http://localhost:3000/toppings');
    const toppings = await toppingResponse.json();

    if(type === "admin") {
        await displayAdminMenuItems(textBox, menuItems, toppingIDs, toppings);
    } else {
        await displayMenuItems(textBox, menuItems, toppingIDs, toppings);
    }
}


function generateNewAdminOrderForm(formLocation){
    // create new form element
    const newForm = document.createElement("form");
    newForm.id = "admin-new-order-form";

    let newRow = document.createElement("div");
    newRow.classList.add("row");

    // TYPE OF ORDER ----------------------------------------------
    let newFieldset = document.createElement("fieldset");
    newFieldset.classList.add("col");
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
    newInput.setAttribute("value", "eatin");
    newInput.setAttribute("name", "type");
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


    // CUSTOMER INFORMATION ----------------------------------------------
    newFieldset = document.createElement("fieldset");
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
    newInput.setAttribute("placeholder", "John");
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
    newInput.setAttribute("placeholder", "Smith");
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
    newLabel.setAttribute("for", "customer_id");
    newLabel.innerHTML = "Customer ID";
    newInput = document.createElement("input");
    newInput.classList.add("form-control");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("id", "customer_id");
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
    newInput = document.createElement("option");
    newInput.innerHTML = "The Cheese";
    newSelect.appendChild(newInput);
    newInput = document.createElement("option");
    newInput.innerHTML = "The Veggie";
    newSelect.appendChild(newInput);
    newInput = document.createElement("option");
    newInput.innerHTML = "The Meat";
    newSelect.appendChild(newInput);
    newInputGroup.appendChild(newSelect);

    newInput = document.createElement("button");
    newInput.classList.add("btn");
    newInput.classList.add("btn-primary");
    newInput.classList.add("col-1");
    newInput.innerHTML = "Add";

    newFormRow.appendChild(newInputGroup);
    newFormRow.appendChild(newInput);

    newFieldset.appendChild(newFormRow);
    newForm.appendChild(newFieldset);


    // ORDER INFORMATION ----------------------------------------------
    newFieldset = document.createElement("fieldset");
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
    newInput.setAttribute("rows", "3");
    newInputGroup.appendChild(newLabel);
    newInputGroup.appendChild(newInput);
    newFormRow.appendChild(newInputGroup);

    newInputGroup = document.createElement("div");
    newInputGroup.classList.add("order-prices");
    newInputGroup.classList.add("col-6");
    newLabel = document.createElement("p");
    newLabel.innerHTML = "Subtotal: $";
    newInputGroup.appendChild(newLabel);
    newLabel = document.createElement("p");
    newLabel.innerHTML = "Tip: $";
    newInputGroup.appendChild(newLabel);
    newLabel = document.createElement("p");
    newLabel.innerHTML = "Tax: $";
    newInputGroup.appendChild(newLabel);
    newLabel = document.createElement("p");
    newLabel.innerHTML = "Total: $";
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
    newInput = document.createElement("button");
    newInput.classList.add("btn");
    newInput.classList.add("btn-primary");
    newInput.setAttribute("type", "submit");
    newInput.innerHTML = "Save Order";
    newFormRow.appendChild(newInput);

    newForm.appendChild(newFormRow);

    formLocation.appendChild(newForm);
}




