/*************************************************************************
 * Functions to deal with displaying menu items for admin and client
 *************************************************************************/

// async function to retreive the json output from the database related to a menu item
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

// called from webpage, gets the data and it in the location given
function getAdminMenu(elementID){
    let location = document.getElementById(elementID);
    // async call to get the data
    getMenuItems(location, "admin");
}

// called from webpage, gets the data and it in the location given
function getCustomerMenu(elementID){
    let location = document.getElementById(elementID);
    // async call to get the data
    getMenuItems(location, "customer");
}

// Converts the jsonData into menu item text for the admin panel edit view
function displayAdminMenuItems(textBox, menuItems, toppingIDs, toppings){

    // create a new div element to add contents to
    const newDiv = document.createElement("div");

    // iterate over each key value pair to output the strings
    for(let i = 0; i < menuItems.length; i++){
        // get toppings associated with menu item
        let currToppings = [];                        // empty array
        let itemToppings = toppingIDs.map(item => {   // iterates over toppingIDs
            if(menuItems[i].menu_item_id === item.menu_item_id){   // if the menu item ids match
                // finds the topping with the specific topping_id and adds to array
                currToppings.push(toppings.find(topping => topping.topping_id === item.topping_id));
            }
        })

        let newUL = document.createElement("ul");
        newUL.classList.add("menu-item-container");
        let newItem = document.createElement("div");
        newItem.classList.add("row");
        newItem.classList.add("menu-item-box");
        let newHeader = document.createElement("div");

        // edit item link
        let editLink = document.createElement("a");
        let editLinkText = document.createTextNode("Edit");
        editLink.title = "Edit Menu Item";
        editLink.setAttribute("id", menuItems[i].menu_item_id);
        editLink.classList.add("edit-button");
        editLink.appendChild(editLinkText);
        newItem.appendChild(editLink);

        // delete item link
        let deleteLink = document.createElement("a");
        let deleteLinkText = document.createTextNode("Delete");
        deleteLink.title = "Delete Menu Item";
        deleteLink.href = "";
        deleteLink.id = menuItems[i].item_id;
        deleteLink.classList.add("delete-button");
        deleteLink.appendChild(deleteLinkText);
        newItem.appendChild(deleteLink);

        // title
        let newTitle = document.createElement("h2");
        newTitle.classList.add("pizzaName");
        newTitle.appendChild(document.createTextNode(menuItems[i].item_name));
        newHeader.appendChild(newTitle);
        newItem.appendChild(newHeader);

        // List of pizza style options
        let styleTitle = document.createElement("h4");
        styleTitle.classList.add("subTitle");
        styleTitle.appendChild(document.createTextNode("Pizza Style"));
        newItem.appendChild(styleTitle);
        let styleUL = document.createElement("ul");

        //styling + layout for the line that contains info regarding crust, sauce, toppings and cheese
        let firstLI = document.createElement("li");
        firstLI.classList.add("info");
        //crust information
        let crustLabel = document.createElement("a");
        crustLabel.classList.add("labels");
        crustLabel.appendChild(document.createTextNode("Crust: "));
        firstLI.appendChild(crustLabel);
        let crustInfo = document.createElement("a");
        crustInfo.appendChild(document.createTextNode(menuItems[i].crust + "\t"));
        crustInfo.classList.add("info");
        firstLI.appendChild(crustInfo);

        //sauce information
        let hasSauce = false;
        let sauceLabel = document.createElement("a");
        sauceLabel.classList.add("labels");
        sauceLabel.appendChild(document.createTextNode("Sauce: "));
        firstLI.appendChild(sauceLabel);
        currToppings.map(topping => {
            if(topping.topping_category === "sauce") {
                let sauceInfo = document.createTextNode(topping.topping_name + ", ");
                firstLI.appendChild(sauceInfo);
                hasSauce = true;
            }
        });
        if(!hasSauce){
            let sauceInfo = document.createElement("a");
            sauceInfo.appendChild(document.createTextNode("None" + "\t"));
            sauceInfo.classList.add("info");
            firstLI.appendChild(sauceInfo);
        }

        //cheese information
        let hasCheese = false;
        let cheeseLabel = document.createElement("a");
        cheeseLabel.classList.add("labels");
        cheeseLabel.appendChild(document.createTextNode("Cheese: "));
        firstLI.appendChild(cheeseLabel);
        currToppings.map(topping => {
            if(topping.topping_category === "cheese") {
                let cheeseInfo = document.createTextNode(topping.topping_name + ", ");
                firstLI.appendChild(cheeseInfo);
                hasCheese = true;
            }
        });
        if(!hasCheese){
            let cheeseInfo = document.createElement("a");
            cheeseInfo.appendChild(document.createTextNode("None" + "\t"));
            cheeseInfo.classList.add("info");
            firstLI.appendChild(cheeseInfo);
        }

        //toppings information
        let secondLI = document.createElement("li");
        secondLI.classList.add("info");
        let hasToppings = false;
        let toppingsLabel = document.createElement("a");
        toppingsLabel.classList.add("labels");
        toppingsLabel.appendChild(document.createTextNode("Toppings: "));
        secondLI.appendChild(toppingsLabel);
        currToppings.map(topping => {
            if(topping.topping_category != "cheese" && topping.topping_category != "sauce") {
                let toppingsInfo = document.createTextNode(topping.topping_name + ", ");
                secondLI.appendChild(toppingsInfo);
                hasToppings = true;
            }
        });
        if(!hasToppings){
            let toppingsInfo = document.createElement("a");
            toppingsInfo.appendChild(document.createTextNode("None" + "\t"));
            toppingsInfo.classList.add("info");
            secondLI.appendChild(toppingsInfo);
        }


        styleUL.appendChild(firstLI);
        styleUL.appendChild(secondLI);
        newItem.appendChild(styleUL);

        // list of prices for item
        let priceTitle = document.createElement("h4");
        priceTitle.classList.add("subTitle");
        priceTitle.appendChild(document.createTextNode("Prices"));
        newItem.appendChild(priceTitle);
        let priceUL = document.createElement("ul");

        //labels for prices
        let priceLabel = document.createElement("a");
        priceLabel.classList.add("labels");
        priceLabel.appendChild(document.createTextNode("Small/Medium/Large/XL: "));
        let priceInfo = document.createElement("a");
        priceInfo.classList.add("info");
        priceInfo.appendChild(document.createTextNode("$" + menuItems[i].sm_price
            + " / $" + menuItems[i].med_price + " / $" + menuItems[i].lg_price + " / $" + menuItems[i].xlg_price));

        priceUL.appendChild(priceLabel);
        priceUL.appendChild(priceInfo);
        newItem.appendChild(priceUL);

        // list the description for the item
        let descTitle = document.createElement("h4");
        descTitle.classList.add("subTitle");
        descTitle.appendChild(document.createTextNode("Description"));
        newItem.appendChild(descTitle);
        let descUL = document.createElement("ul");
        let descriptionLI = document.createElement("li");
        descriptionLI.classList.add("info");
        descriptionLI.appendChild(document.createTextNode(menuItems[i].description));
        descUL.appendChild(descriptionLI);
        newItem.appendChild(descUL);

        newDiv.appendChild(newItem);
        textBox.appendChild(newDiv);
    }

    // add event listeners to edit buttons
    addEditListeners();
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