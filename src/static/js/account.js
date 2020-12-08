// client side functions for accounts

/*******************************************************************
* Following functions deal with GETTING and DISPLAYING 
* info from the Database
********************************************************************/
// async function to retreive the json output from the database
const getJsonData = async (textBox) => {
	// get database accounts
	const response = await fetch('http://localhost:3000/account');
	const myJson = await response.json(); 

  const textBoxID = textBox.id;
  if(textBoxID === "admin-menu-list"){
    displayAllAccounts(textBox, myJson);
  } 
}

// called from webpage, gets the data and it in the location given
function getDatafromDB(elementID){
    let location = document.getElementById(elementID);
    // async call to get the data
    getJsonData(location);
}

function displayAllAccounts(textBox, jsonData){

}

//updates the account info to database by ID
const updateAccounttoDBbyId = async (inputData) => {
    const response = await fetch('http://localhost:3000/account/' + inputData.id, { //url needs to match in src/index
      method: 'PUT',
      body: JSON.stringify(inputData),
      headers: {
          'Content-Type' : 'application/json'
      }
    });

    const myJson = await response.json();
}

//updates the account info to database by Email
const updateAccounttoDBbyEmail = async (inputData) => {
    const response = await fetch('http://localhost:3000/account/' + inputData.email, { //url needs to match in src/index
      method: 'GET',
      body: JSON.stringify(inputData),
      headers: {
          'Content-Type' : 'application/json'
      }
    });

    const myJson = await response.json();
}

//add account to database
const addAccounttoDB = async (inputData) => {
	// creates a post request, which is defined in the src/index.js file to call "addItem.js"
	const response = await fetch('http://localhost:3000/account', {
		method: 'POST',
		body: JSON.stringify(inputData), // string or object
		headers: {
			'Content-Type': 'application/json'
		}
	});
	// gets the json back if we want to do something new with it
	const myJson = await response.json(); //extract JSON from the http response
}





