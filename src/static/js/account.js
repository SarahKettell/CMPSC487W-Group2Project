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
  if(textBoxID === "account-list"){
    displayAllAccounts(textBox, myJson);
  }
}

const getData = async (textBox, arg) => {
  const accResponse = await fetch('http://localhost:3000/account');
  const accJson = await accResponse.json();

  const textBoxID = textBox.id;
  if(textBoxID === "cust-data"){
    displayCertainAccount(textBox, accJson, arg);
  }
}

// called from webpage, gets the data and it in the location given
function getDatafromDB(elementID){
    let location = document.getElementById(elementID);
    // async call to get the data
    getJsonData(location);
}

function getAccountFromDB(elementID, arg){
  let location = document.getElementById(elementID);
    // async call to get the data
    getData(location, arg);
}

function displayCertainAccount(textBox, jsonData, arg){
  // new array to hold the menu values corresponding to each key
  let accValues = new Array(jsonData.length);
  //fill those arrays with JSON data
  for(let i = 0; i < jsonData.length; i++){
    accValues[i] = Object.values(jsonData[i]);
  }

  //iterate through array
  for(let i = 0; i < accValues.length; i++){
    if (jsonData[i].email == arg) {
      let fname = document.createElement("a");
      /*fname.appendChild(document.createTextNode("First Name: "));*/
        let fnamelabel = document.createElement("a");
        fnamelabel.appendChild(document.createTextNode("First Name: "));
        fnamelabel.classList.add("label");
      fname.appendChild(fnamelabel);
      fname.appendChild(document.createTextNode(jsonData[i].fname));
      fname.appendChild(document.createElement("br"));

      //street address
      let lname = document.createElement("a");
        let lnamelabel = document.createElement("a");
        lnamelabel.appendChild(document.createTextNode("Last Name: "));
        lnamelabel.classList.add("label");
      lname.appendChild(lnamelabel);
      lname.appendChild(document.createTextNode(jsonData[i].lname));
      lname.appendChild(document.createElement("br"));

      //city state
      let email = document.createElement("a");
        let emaillabel = document.createElement("a");
        emaillabel.appendChild(document.createTextNode("Email: "));
        emaillabel.classList.add("label");
      email.appendChild(emaillabel);
      email.appendChild(document.createTextNode(jsonData[i].email));
      email.appendChild(document.createElement("br"));

      textBox.appendChild(fname);
      textBox.appendChild(lname);
      textBox.appendChild(email);
    }
  }
}

function displayAllAccounts(textBox, jsonData){
  // new array to hold the menu values corresponding to each key
  let accValues = new Array(jsonData.length);
  //fill those arrays with JSON data
  for(let i = 0; i < jsonData.length; i++){
    accValues[i] = Object.values(jsonData[i]);
  }
  let table = document.createElement("table");
  table.classList.add("account-table");

    let headingRow = document.createElement("tr");
    headingRow.classList.add("account-table-heading-row");

      //heading for first name
      let fnameHeading = document.createElement("th");
      fnameHeading.appendChild(document.createTextNode("FIRST NAME"));
      fnameHeading.classList.add("fnameheading");

      //heading for last name
      let lnameHeading = document.createElement("th");
      lnameHeading.appendChild(document.createTextNode("LAST NAME"));
      lnameHeading.classList.add("heading");

      //heading for email
      let emailHeading = document.createElement("th");
      emailHeading.appendChild(document.createTextNode("EMAIL ADDRESS"));
      emailHeading.classList.add("heading");

      //heading for account type
      let typeHeading = document.createElement("th");
      typeHeading.appendChild(document.createTextNode("ACCOUNT TYPE"));
      typeHeading.classList.add("typeheading");

    //append all the headings to the row
    headingRow.appendChild(fnameHeading);
    headingRow.appendChild(lnameHeading);
    headingRow.appendChild(emailHeading);
    headingRow.appendChild(typeHeading);

  //append the row to the table
  table.appendChild(headingRow);

  //reiterate over all the jason values
  for(let i = 0; i < accValues.length; i++){
    let dataRow = document.createElement("tr");
    dataRow.classList.add("account-table-data-row");

      //data regarding first name
      let fnameData = document.createElement("td");
      fnameData.appendChild(document.createTextNode(jsonData[i].fname));
      fnameData.classList.add("data");

      //data regarding last name
      let lnameData = document.createElement("td");
      lnameData.appendChild(document.createTextNode(jsonData[i].lname));
      lnameData.classList.add("data");

      //data regarding email
      let emailData = document.createElement("td");
      emailData.appendChild(document.createTextNode(jsonData[i].email));
      emailData.classList.add("data");

      //data regarding email
      let typeData = document.createElement("td");
      typeData.appendChild(document.createTextNode(jsonData[i].acct_type));
      typeData.classList.add("data");

    //append the data to the row
    dataRow.appendChild(fnameData);
    dataRow.appendChild(lnameData);
    dataRow.appendChild(emailData);
    dataRow.appendChild(typeData);

    //append the row to the table
    table.appendChild(dataRow);
  }

  //finally append table to the textbox
  textBox.appendChild(table);

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





