// client side functions

/*******************************************************************
* Following functions deal with GETTING and DISPLAYING 
* info from the Database
********************************************************************/
// async function to retreive the json output from the database
const getJsonData = async (textBox) => {
	// get database "items"
	const response = await fetch('http://localhost:3000/menuItems');
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



const getToppingData = async(contentDiv) =>{

}

// displays the toppings as a selection of checkboxes
function displayToppingOptions(contentDiv){
    // creates a post request, which is defined in the src/index.js file to call "addItem.js"
    console.log(contentDiv);
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


/*---------------------------------------------------
ADMIN MENU CODE
----------------------------------------------------*/




