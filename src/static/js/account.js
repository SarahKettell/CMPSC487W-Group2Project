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
      method: 'PUT',
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

function verifyUser(email, password){
  /*const response = await fetch('http://localhost:3000/account');
	const myJson = await response.json(); 
  let acctInfo = new Array(myJson.length);
  for(let i = 0; i < myJson.length; i++){
    acctInfo[i] = Object.values(myJson[i]);
  }
  for(let i = 0; i < acctInfo.length; i++){
    if((myJson[i].email == email) && (myJson[i].password == password)) {
      if(myJson[i].acct_type == 'customer') {
        //display my-account-cust.html because this is a customer
        return "customer";
      }
      //display my-account.html because this is an admin
      return "staff";
    }
    //user's password and email don't match
  }*/
  console.log("got to log-in verifyUser");
  if(email == "surabhi.sahay24@gmail.com" && password == "123") {
    return "customer";
  } else if(email == "dfollweiler@gmail.com" && password == "passy") {
    return "staff";
  } else if(email == ""){
    return "emptyEmail";
  } else if(password == ""){
    return "emptyPassword";
  } else if(email == "" || password == ""){
    return "emptyFields";
  }
}





