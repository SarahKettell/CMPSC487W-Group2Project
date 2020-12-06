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

  //get database contact
  const contResponse = await fetch('http://localhost:3000/contact');
  const contJson = await contResponse.json();

  //get database hours
  const hoursResponse = await fetch('http://localhost:3000/hours');
  const hoursJson = await hoursResponse.json();

  const textBoxID = textBox.id;
  if(textBoxID === "admin-menu-list"){
    displayAdminMenuItems(textBox, myJson);
  } 
  if(textBoxID === "test") {
    displayTest(textBox, addrJson, contJson);
    //displayAdminMenuItems(textBox, myJson);
  }
  if(textBoxID === "admin-contact") {
    displayAdminContact(textBox, contJson);
    //displayAdminMenuItems(textBox, myJson);
  }
  if(textBoxID === "admin-hours") {
    displayAdminHours(textBox, hoursJson);
    //displayAdminMenuItems(textBox, myJson);
  }
  if(textBoxID === "admin-address") {
    displayAdminAddress(textBox, addrJson);
    //displayAdminMenuItems(textBox, myJson);
  }
  else{
	 displayMenuItems(textBox, myJson);
  }
}

function displayTest() {
    getDatafromDB("admin-address");
    getDatafromDB("admin-contact");
    getDatafromDB("admin-hours");
}

// called from webpage, gets the data and it in the location given
function getDatafromDB(elementID){
    let location = document.getElementById(elementID);
    // async call to get the data
    getJsonData(location);
}

function displayAddressFooter(textBox, jsonData) {
  // array that stores the keys for the address_info table
  const addrKeys = Object.keys(jsonData[0]);
  // new array to hold the menu values corresponding to each key
  let addrValues = new Array(jsonData.length)

  for(let i = 0; i < jsonData.length; i++){
    addrValues[i] = Object.values(jsonData[i]);
  }

  for(let i = 0; i < addrValues.length; i++){
    console.log('test compName: ' + jsonData[i].company_name);
    let ul = document.createElement("ul");

    //company name
    let compName = document.createElement("li");
    compName.appendChild(document.createTextNode(jsonData[i].company_name));

    //street address
    let streetAddr = document.createElement("li");
    streetAddr.appendChild(document.createTextNode(jsonData[i].street_address));

    //city state
    let cityState = document.createElement("li");
    cityState.appendChild(document.createTextNode(jsonData[i].city + "," + jsonData[i].state_name));

    //zip code
    let zipCode = document.createElement("li");
    zipCode.appendChild(document.createTextNode(jsonData[i].zip_code));

    //append all info to parent div which is admin-address
    ul.appendChild(compName);
    ul.appendChild(streetAddr);
    ul.appendChild(cityState);
    ul.appendChild(zipCode);

    textBox.appendChild(ul);
  }
  //console.log("Got to admin function.");
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

// Converts the jsonData into address info text for the admin restaurant info edit view
function displayAdminHours(textBox, jsonData) {
  // new array to hold the menu values corresponding to each key
  let hoursValues = new Array(jsonData.length)

  for(let i = 0; i < jsonData.length; i++){
    hoursValues[i] = Object.values(jsonData[i]);
  }

 
  for(let i = 0; i < hoursValues.length; i++){
    console.log('test monBeg: ' + jsonData[i].mon_beg);

    //Monday
    let monday = document.createElement("a");
    monday.appendChild(document.createTextNode("MON: " + jsonData[i].mon_beg + " - " + jsonData[i].mon_end));
    monday.appendChild(document.createElement("br"));

    //Tuesday 
    let tuesday = document.createElement("a");
    tuesday.appendChild(document.createTextNode("TUE: " + jsonData[i].tue_beg + " - " + jsonData[i].tue_end));
    tuesday.appendChild(document.createElement("br"));

    //Wednesday 
    let wednesday = document.createElement("a");
    wednesday.appendChild(document.createTextNode("WED: " + jsonData[i].wed_beg + " - " + jsonData[i].wed_end));
    wednesday.appendChild(document.createElement("br"));

    //Thursday 
    let thursday = document.createElement("a");
    thursday.appendChild(document.createTextNode("THU: " + jsonData[i].thu_beg + " - " + jsonData[i].thu_end));
    thursday.appendChild(document.createElement("br"));

    //Friday 
    let friday = document.createElement("a");
    friday.appendChild(document.createTextNode("FRI: " + jsonData[i].fri_beg + " - " + jsonData[i].fri_end));
    friday.appendChild(document.createElement("br"));

    //Saturday 
    let saturday = document.createElement("a");
    saturday.appendChild(document.createTextNode("SAT: " + jsonData[i].sat_beg + " - " + jsonData[i].sat_end));
    saturday.appendChild(document.createElement("br"));

    //Sunday 
    let sunday = document.createElement("a");
    sunday.appendChild(document.createTextNode("SUN: " + jsonData[i].sun_beg + " - " + jsonData[i].sun_end));
    sunday.appendChild(document.createElement("br"));

    //append all info to parent div which is admin-address
    textBox.appendChild(monday);
    textBox.appendChild(tuesday);
    textBox.appendChild(wednesday);
    textBox.appendChild(thursday);
    textBox.appendChild(friday);
    textBox.appendChild(saturday);
    textBox.appendChild(sunday);
  }
  //console.log("Got to admin function.");
}

function displayAdminContact(textBox, jsonData) {
  // new array to hold the menu values corresponding to each key
  let contValues = new Array(jsonData.length)

  for(let i = 0; i < jsonData.length; i++){
    contValues[i] = Object.values(jsonData[i]);
  }

 
  for(let i = 0; i < contValues.length; i++){
    console.log('test phone: ' + jsonData[i].phone);

    //phone number
    let phone = document.createElement("a");
    phone.appendChild(document.createTextNode(jsonData[i].phone));
    phone.appendChild(document.createElement("br"));

    //email address
    let email = document.createElement("a");
    email.appendChild(document.createTextNode(jsonData[i].email));
    email.appendChild(document.createElement("br"));

    textBox.appendChild(phone);
    textBox.appendChild(email);
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

//updates the address for restaurant info to the database
const updateContacttoDB = async (inputData) => {
  const response = await fetch('http://localhost:3000/contact/1', { //url needs to match in src/index
    method: 'PUT',
    body: JSON.stringify(inputData),
    headers: {
        'Content-Type' : 'application/json'
    }
  });

  const myJson = await response.json();
}

//updates the business hours for restaurant info to the database
const updateHourstoDB = async (inputData) => {
  const response = await fetch('http://localhost:3000/hours/1', { //url needs to match in src/index
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




