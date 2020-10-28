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
	displayMenuItems(textBox, myJson);
}

// called from webpage, gets the data and it in the location given
function getDatafromDB(elementID){
    let location = document.getElementById(elementID);
    // async call to get the data
    getJsonData(location);
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

  // create a new div element to add contents to
  const newDiv = document.createElement("div");

  // iterate over each key value pair to output the strings
  for(let i = 0; i < menuValues.length; i++){
    let newDiv = document.createElement("div");
    let newParagraph = document.createElement("p");
    for(let j = 1; j < menuKeys.length; j++){
      let textInput = document.createTextNode(menuKeys[j] + ": " + menuValues[i][j]);
      newParagraph.appendChild(textInput);
      newParagraph.appendChild(document.createElement("br"));
      newDiv.appendChild(newParagraph);
    }
    textBox.appendChild(newDiv);
  }


  // let textInput = document.createTextNode(JSON.stringify(jsonData));
  // textBox.appendChild(textInput);
}


// adds the data to the database
const addDatatoDB = async (inputData) => {
	// creates the item object
	const newMenuItem = {
        id: 0,
        pizza_name: 'Plain Cheese',
        crust: 'thin',
        sauce: 'white',
        cheese: 'three cheese blend',
        toppings: 'none',
        sm_price: '6.00',
        med_price: '8.00',
        lg_price: '10.00',
        xlg_price: '12.00',
        description: 'It has cheese only.'
    };

    // creates a post request, which is defined in the src/index.js file to call "addItem.js"
  	const response = await fetch('http://localhost:3000/items', {
    	method: 'POST',
    	body: JSON.stringify(newMenuItem), // string or object
    	headers: {
      		'Content-Type': 'application/json'
    	}
  	});

  	// gets the json back if we want to do something new with it
  	const myJson = await response.json(); //extract JSON from the http response
  	// do something with myJson
  	console.log(myJson);
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
