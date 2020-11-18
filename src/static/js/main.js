// client side functions

/*******************************************************************
* Following functions deal with GETTING and DISPLAYING 
* info from the Database
********************************************************************/
// async function to retreive the json output from the database
const getJsonData = async (textBox) => {
	// get database "items"
	const response = await fetch('http://localhost:3000/items');
	const myJson = await response.json(); 

  //get database address
  const addrResponse = await fetch('http://localhost:3000/address');
  const addrJson = await addrResponse.json();

  const textBoxID = textBox.id;
  if(textBoxID === "admin-menu-list"){
    displayAdminMenuItems(textBox, myJson);
  } if(textBoxID === "admin-address") {
    displayAdminAddress(textBox, addrJson);
    //displayAdminMenuItems(textBox, myJson);
  }
  else{
	 displayMenuItems(textBox, myJson);
  }
}



// called from webpage, gets the data and it in the location given
function getDatafromDB(elementID){
    let location = document.getElementById(elementID);
    // async call to get the data
    getJsonData(location);
}

const getJsonToppings = async (itemInfo) => {
  const response = await fetch('http://localhost:3000/toppings/' + itemInfo);
  const myJson = await response.json(); 

  console.log(myJson);
}

// get toppings
function getToppingsFromDB(item_id){
    getJsonToppings(item_id);
}

// Converts the jsonData into menu item text
// appends it to the element referenced
function displayMenuItems(textBox, jsonData){

  // array that stores the keys for the menu_item table
  const menuKeys = Object.keys(jsonData[0]);
  // new array to hold the menu values corresponding to each key
  let menuValues = new Array(jsonData.length)

  // creates a 2-dim array [i][j] where i = pizza menu item, j = value stored in that menu item
  for(let i = 0; i < jsonData.length; i++){
    menuValues[i] = Object.values(jsonData[i]);
  }

  // // iterate over each key value pair to output the strings
  // for(let i = 0; i < menuValues.length; i++){
  //   let newUL = document.createElement("ul");
  //   newUL.classList.add("menu-item-container");
  //   let newItem = document.createElement("li");
  //   newItem.classList.add("row");
  //   newItem.classList.add("menu-item-box");
  //   for(let j = 1; j < menuKeys.length; j++){
  //     let textInput = document.createTextNode(menuKeys[j] + ": " + menuValues[i][j]);
  //     newItem.appendChild(textInput);
  //     newDiv.appendChild(newItem);
  //   }
  //   textBox.appendChild(newDiv);
  // }

  // create a new div element to add contents to
  const newDiv = document.createElement("div");

  // iterate over each key value pair to output the strings
  for(let i = 0; i < menuValues.length; i++){
    let newUL = document.createElement("ul");
    newUL.classList.add("menu-item-container");
    let newItem = document.createElement("div");
    newItem.classList.add("row");
    newItem.classList.add("main-menu-item");
    //newItem.classList.add("menu-item-box");
    let newHeader = document.createElement("div");

    // image
    let imageDiv = document.createElement("div");
    imageDiv.classList.add("image-div");
    newItem.appendChild(imageDiv);


    let contentDiv = document.createElement("div");
    contentDiv.classList.add("content-div");

    // title
    let newTitle = document.createElement("h2");
    newTitle.appendChild(document.createTextNode(jsonData[i].pizza_name));
    newHeader.appendChild(newTitle);
    contentDiv.appendChild(newHeader);

    // List of pizza style options
    let styleUL = document.createElement("ul");
    let crustLI = document.createElement("li");
    crustLI.appendChild(document.createTextNode(jsonData[i].crust));
    let sauceLI = document.createElement("li");
    sauceLI.appendChild(document.createTextNode(jsonData[i].sauce));
    let cheeseLI = document.createElement("li");
    cheeseLI.appendChild(document.createTextNode(jsonData[i].cheese));
    let toppingsLI = document.createElement("li");
    toppingsLI.appendChild(document.createTextNode(jsonData[i].toppings));
    styleUL.appendChild(crustLI);
    styleUL.appendChild(sauceLI);
    styleUL.appendChild(cheeseLI);
    styleUL.appendChild(toppingsLI);
    contentDiv.appendChild(styleUL);

    // list of prices for item
    let priceUL = document.createElement("ul");
    let smPrice = document.createElement("li");
    smPrice.appendChild(document.createTextNode("Small Size: $" + jsonData[i].sm_price));
    let medPrice = document.createElement("li");
    medPrice.appendChild(document.createTextNode("Medium Size: $" + jsonData[i].med_price));
    let lgPrice = document.createElement("li");
    lgPrice.appendChild(document.createTextNode("Large Size: $" + jsonData[i].lg_price));
    let xlgPrice = document.createElement("li");
    xlgPrice.appendChild(document.createTextNode("Extra Large Size: $" + jsonData[i].xlg_price));
    priceUL.appendChild(smPrice);
    priceUL.appendChild(medPrice);
    priceUL.appendChild(lgPrice);
    priceUL.appendChild(xlgPrice);
    contentDiv.appendChild(priceUL);

    // list the description for the item
    let descUL = document.createElement("ul");
    let descriptionLI = document.createElement("li");
    descriptionLI.appendChild(document.createTextNode(jsonData[i].description));
    descUL.appendChild(descriptionLI);
    contentDiv.appendChild(descUL);

    // delete item link
    let orderLink = document.createElement("a");
    let orderLinkText = document.createTextNode("Add to Cart");
    orderLink.title = "Delete Menu Item";
    orderLink.href = "";
    orderLink.id = jsonData[i].item_id;
    orderLink.classList.add("delete-button");
    orderLink.appendChild(orderLinkText);
    contentDiv.appendChild(orderLink);

    newItem.appendChild(contentDiv);
    textBox.appendChild(newItem);
  }
}

// Converts the jsonData into address info text for the admin restaurant info edit view
function displayAdminAddress(textBox, jsonData) {
  // array that stores the keys for the address_info table
  const addrKeys = Object.keys(jsonData[0]);
  // new array to hold the menu values corresponding to each key
  let addrValues = new Array(jsonData.length)

  for(let i = 0; i < jsonData.length; i++){
    addrValues[i] = Object.values(jsonData[i]);
  }

 
  for(let i = 0; i < addrValues.length; i++){
    console.log('test compName: ' + jsonData[i].company_name);
    let lineBreak = document.createElement("br");

    //company name
    let compName = document.createElement("a");
    compName.appendChild(document.createTextNode(jsonData[i].company_name));
    compName.appendChild(document.createElement("br"));

    //street address
    let streetAddr = document.createElement("a");
    streetAddr.appendChild(document.createTextNode(jsonData[i].street_address));
    streetAddr.appendChild(document.createElement("br"));

    //city state
    let cityState = document.createElement("a");
    cityState.appendChild(document.createTextNode(jsonData[i].city + "," + jsonData[i].state_name));
    cityState.appendChild(document.createElement("br"));

    //zip code
    let zipCode = document.createElement("a");
    zipCode.appendChild(document.createTextNode(jsonData[i].zip_code));
    zipCode.appendChild(document.createElement("br"));

    //append all info to parent div which is admin-address
    textBox.appendChild(compName);
    textBox.appendChild(streetAddr);
    textBox.appendChild(cityState);
    textBox.appendChild(zipCode);
  }
  //console.log("Got to admin function.");
}

// Converts the jsonData into menu item text for the admin panel edit view
function displayAdminMenuItems(textBox, jsonData){
  console.log("Got to admin function.");

  // array that stores the keys for the menu_item table
  const menuKeys = Object.keys(jsonData[0]);
  // new array to hold the menu values corresponding to each key
  let menuValues = new Array(jsonData.length)

  // creates a 2-dim array [i][j] where i = pizza menu item, j = value stored in that menu item
  for(let i = 0; i < jsonData.length; i++){
    menuValues[i] = Object.values(jsonData[i]);
  }


  // iterate over arrays -> not used for this but left for reference
  // for(let j = 1; j < menuKeys.length; j++){
  //   let textInput = document.createTextNode(menuKeys[j] + ": " + menuValues[i][j]);
  //   newItem.appendChild(textInput);
  //   newDiv.appendChild(newItem);
  // }

  // create a new div element to add contents to
  const newDiv = document.createElement("div");

  // iterate over each key value pair to output the strings
  for(let i = 0; i < menuValues.length; i++){
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
    editLink.href = "edit-menu.html";
    editLink.id = jsonData[i].item_id;
    editLink.classList.add("edit-button");
    editLink.appendChild(editLinkText);
    newItem.appendChild(editLink);

    // delete item link
    let deleteLink = document.createElement("a");
    let deleteLinkText = document.createTextNode("Delete");
    deleteLink.title = "Delete Menu Item";
    deleteLink.href = "";
    deleteLink.id = jsonData[i].item_id;
    deleteLink.classList.add("delete-button");
    deleteLink.appendChild(deleteLinkText);
    newItem.appendChild(deleteLink);
    /*let deleteLink = document.createElement("img");
    deleteLink.src = "delete.svg";
    deleteLink.classList.add("delete-button");
    newItem.appendChild(deleteLink);*/
    

    // title
    let newTitle = document.createElement("h2");
    newTitle.classList.add("pizzaName");
    newTitle.appendChild(document.createTextNode(jsonData[i].pizza_name));
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
      crustInfo.appendChild(document.createTextNode(jsonData[i].crust + "\t"));
      crustInfo.classList.add("info");
      firstLI.appendChild(crustInfo);

      //sauce information
      let sauceLabel = document.createElement("a");
      sauceLabel.classList.add("labels");
      sauceLabel.appendChild(document.createTextNode("Sauce: "));
      firstLI.appendChild(sauceLabel);
      let sauceInfo = document.createElement("a"); 
      sauceInfo.appendChild(document.createTextNode(jsonData[i].sauce + "\t"));
      sauceInfo.classList.add("info");
      firstLI.appendChild(sauceInfo);

      //cheese information
      let cheeseLabel = document.createElement("a");
      cheeseLabel.classList.add("labels");
      cheeseLabel.appendChild(document.createTextNode("Cheese: "));
      firstLI.appendChild(cheeseLabel);
      let cheeseInfo = document.createElement("a"); 
      cheeseInfo.appendChild(document.createTextNode(jsonData[i].cheese + "\t"));
      cheeseInfo.classList.add("info");
      firstLI.appendChild(cheeseInfo);

      //toppings information
      let toppingsLabel = document.createElement("a");
      toppingsLabel.classList.add("labels");
      toppingsLabel.appendChild(document.createTextNode("Toppings: "));
      firstLI.appendChild(toppingsLabel);
      let toppingsInfo = document.createElement("a"); 
      toppingsInfo.appendChild(document.createTextNode(jsonData[i].toppings));
      toppingsInfo.classList.add("info");
      firstLI.appendChild(toppingsInfo);
    
    styleUL.appendChild(firstLI);
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
    priceInfo.appendChild(document.createTextNode("$" + jsonData[i].sm_price
      + " / $" + jsonData[i].med_price + " / $" + jsonData[i].lg_price + " / $" + jsonData[i].xlg_price));

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
    descriptionLI.appendChild(document.createTextNode(jsonData[i].description));
    descUL.appendChild(descriptionLI);
    newItem.appendChild(descUL);

    newDiv.appendChild(newItem);
    textBox.appendChild(newDiv);
  }
}

const getToppingData = async(contentDiv) =>{

}

// displays the toppings as a selection of checkboxes
function displayToppingOptions(contentDiv){
    // creates a post request, which is defined in the src/index.js file to call "addItem.js"
    console.log(contentDiv);
}

// adds a menu item to the database
const addMenuItemtoDB = async (inputData) => {
    // input data is stored as a menu item object

    // creates a post request, which is defined in the src/index.js file to call "addItem.js"
  	const response = await fetch('http://localhost:3000/items', {
    	method: 'POST',
    	body: JSON.stringify(inputData), // string or object
    	headers: {
      		'Content-Type': 'application/json'
    	}
  	});

  	// gets the json back if we want to do something new with it
  	const myJson = await response.json(); //extract JSON from the http response
  	// do something with myJson
  	console.log(myJson);
}

//updates the address for restaurant info to the database
const updateAddresstoDB = async (inputData) => {
    const response = await fetch('http://localhost:3000/address/1', { //url needs to match in src/index
      method: 'PUT',
      body: JSON.stringify(inputData),
      headers: {
          'Content-Type' : 'application/json'
      }
    });

    const myJson = await response.json();
}

// called from webpage to save info to the database
function addNewData(elementID){
	// gets the input field value referenced by elementID
	var inputVal = document.getElementById(elementID).value;
	// if not empty, add to database
	if(inputVal != null){
		addDatatoDB(inputVal);
	}
}
