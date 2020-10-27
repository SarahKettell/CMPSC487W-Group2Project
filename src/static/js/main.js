// client side functions
// async function to retreive the json output from the database
const getJsonData = async (textBox) => {
	// get database "items"
	const response = await fetch('http://localhost:3000/items');
	const myJson = await response.json(); 
	// Create a text element with the string version of the JSON
	let textInput = await document.createTextNode(JSON.stringify(myJson));
	// Add that to the div in the main webpage
	textBox.appendChild(textInput);
}

// called from webpage, gets the data and it in the location given
function getDatafromDB(elementID){
    let location = document.getElementById(elementID);
    // async call to get the data
    getJsonData(location);
}

// 
const addDatatoDB = async (inputString) => {
	const someInput = "This is a name.";
	const testItem = {
        id: 6,
        name: 'test',
        completed: false,
    };



	// const submitNewItem = e => {
 //        e.preventDefault();
 //        setSubmitting(true);
 //        fetch('/items', {
 //            method: 'POST',
 //            body: JSON.stringify({ name: 'Word' }),
 //            headers: { 'Content-Type': 'application/json' },
 //        })
 //            .then(r => r.json())
 //            .then(item => {
 //                onNewItem(item);
 //                setSubmitting(false);
 //                setNewItem('');
 //            });
 //    };
}

const userAction = async () => {
	const testItem = {
        id: 6,
        name: 'test',
        completed: false,
    };
  	const response = await fetch('http://localhost:3000/items', {
    	method: 'POST',
    	body: JSON.stringify(testItem), // string or object
    	headers: {
      		'Content-Type': 'application/json'
    	}
  	});
  	const myJson = await response.json(); //extract JSON from the http response
  	// do something with myJson
  	console.log(myJson);
}
