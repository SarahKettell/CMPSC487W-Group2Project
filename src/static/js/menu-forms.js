/*************************************************************************
 * Functions to deal with creating the forms to add, update, or
 * customize menu items
 *************************************************************************/
// get all toppings, called from other function
const getJsonToppings = async () => {
		const response = await fetch('http://localhost:3000/toppings');
		const myJson = await response.json();
		generateNewItemForm(myJson);
}

// get toppings, called from html page
function getToppingsFromDB(item_id){
	getJsonToppings(item_id);
}

// get toppings for a specific menu item
const getToppingsData = async (pageElement, option, itemInfo, submitAction) => {
  if(option === "new"){
    const response = await fetch('http://localhost:3000/toppings');
    const myJson = await response.json();
    generateAdminMenuForm(pageElement, option, myJson, submitAction);
  }
  else {
    const response = await fetch('http://localhost:3000/toppings/' + itemInfo);
    const myJson = await response.json();
  } 
}

// async function to retreive the json output from the database
const getMenuItemForEdit = async (textBox, itemID) => {
	// get menu items
	const menuResponse = await fetch('http://localhost:3000/menuItems');
	const menuItems = await menuResponse.json();

	// get menu item topping list
	const toppingIDResponse = await fetch('http://localhost:3000/menuItemToppings');
	const toppingIDs = await toppingIDResponse.json();

	//get toppings
	const toppingResponse = await fetch('http://localhost:3000/toppings');
	const toppings = await toppingResponse.json();

	await generateMenuItemEditForm(textBox, itemID, menuItems, toppingIDs, toppings);
}

function loadAdminMenuForm(pageElement, option, submitAction){
	getToppingsData(pageElement, option, null, submitAction);
}

// Creates the form for adding/editing menu items
// if option == new, do not try to load prev data
// if option == edit, load prev data into form
// Form ids = 
function generateAdminMenuForm(pageElement, option, toppingData, submitAction){

	// create new form element
	const newForm = document.createElement("form");
	newForm.id = "form-add-menu-item row";

	// nameRow = Pizza Name
	let nameRow = document.createElement("div");
	nameRow.classList.add("form-row");
	let nameLabel = document.createElement("label");
	nameLabel.setAttribute("for", "item_name");
	nameLabel.innerHTML = "Pizza Name:";
	let nameInput = document.createElement("input");
	nameInput.setAttribute("type", "text");
	nameInput.setAttribute("id", "item_name");
	nameInput.classList.add("form-control");
	nameRow.appendChild(nameLabel);
	nameRow.appendChild(nameInput);
	newForm.appendChild(nameRow);

	// crustRow = Crust type
	let crustRow = document.createElement("div");
	crustRow.classList.add("form-row");
	let crustLabel = document.createElement("label");
	crustLabel.setAttribute("for", "itemCrust");
	crustLabel.innerHTML = "Crust Type:";
	let crustSelect = document.createElement("select");
	crustSelect.setAttribute("id", "itemCrust");
	crustSelect.classList.add("form-control");
	let crust1 = document.createElement("option");
	crust1.setAttribute("id", "crust-thin");
	crust1.setAttribute("value", "crust-thin");
	crust1.innerHTML = "Thin-Crust";
	let crust2 = document.createElement("option");
	crust2.setAttribute("id", "crust-thick");
	crust2.setAttribute("value", "crust-thick");
	crust2.innerHTML = "Thick-Crust";
	let crust3 = document.createElement("option");
	crust3.setAttribute("id", "crust-whole-wheat");
	crust3.setAttribute("value", "crust-whole-wheat");
	crust3.innerHTML = "Whole Wheat";
	let crust4 = document.createElement("option");
	crust4.setAttribute("id", "crust-gluten-free");
	crust4.setAttribute("value", "crust-gluten-free");
	crust4.innerHTML = "Gluten Free";
	crustSelect.appendChild(crust1);
	crustSelect.appendChild(crust2);
	crustSelect.appendChild(crust3);
	crustSelect.appendChild(crust4);
	crustRow.appendChild(crustLabel);
	crustRow.appendChild(crustSelect);
	newForm.appendChild(crustRow);

	// sauceRow = Sauce(s)
	let sauceRow = document.createElement("div");
	sauceRow.classList.add("form-row");
	let sauceLabel = document.createElement("label");
	sauceLabel.innerHTML = "Sauce(s):";
	let sauceInputGroup = document.createElement("div");
	sauceInputGroup.classList.add("input-group");

	let cheeseRow = document.createElement("div");
	cheeseRow.classList.add("form-row");
	let cheeseLabel = document.createElement("label");
	cheeseLabel.innerHTML = "Cheese(s):";
	let cheeseInputGroup = document.createElement("div");
	cheeseInputGroup.classList.add("input-group");

	let toppingRow = document.createElement("div");
	toppingRow.classList.add("form-row");
	let toppingLabel = document.createElement("label");
	toppingLabel.innerHTML = "Topping(s):";
	let toppingInputGroup = document.createElement("div");
	toppingInputGroup.classList.add("input-group");

	for(let i = 0; i < toppingData.length; i++){

		let formCheck = document.createElement("div");
			formCheck.classList.add("form-check");
			formCheck.classList.add("form-check-inline");
			let checkLabel = document.createElement("label");
			checkLabel.classList.add("form-check-label");

		if(toppingData[i].topping_category === "sauce"){
			checkLabel.setAttribute("for", "sauceid_" + toppingData[i].topping_id);
			checkLabel.innerHTML = toppingData[i].topping_name;
			let checkInput = document.createElement("input");
			checkInput.setAttribute("type", "checkbox");
			checkInput.setAttribute("id", "sauceid_" + toppingData[i].topping_id);
			checkInput.setAttribute("value", toppingData[i].topping_name);
			formCheck.appendChild(checkInput);
			formCheck.appendChild(checkLabel);
			sauceInputGroup.appendChild(formCheck);
		}
		else if(toppingData[i].topping_category === "cheese"){
			checkLabel.setAttribute("for", "cheeseid_" + toppingData[i].topping_id);
			checkLabel.innerHTML = toppingData[i].topping_name;
			let checkInput = document.createElement("input");
			checkInput.setAttribute("type", "checkbox");
			checkInput.setAttribute("id", "cheeseid_" + toppingData[i].topping_id);
			checkInput.setAttribute("value", toppingData[i].topping_name);
			formCheck.appendChild(checkInput);
			formCheck.appendChild(checkLabel);
			cheeseInputGroup.appendChild(formCheck);
		}
		else {
			checkLabel.setAttribute("for", "toppingid_" + toppingData[i].topping_id);
			checkLabel.innerHTML = toppingData[i].topping_name;
			let checkInput = document.createElement("input");
			checkInput.setAttribute("type", "checkbox");
			checkInput.setAttribute("id", "toppingid_" + toppingData[i].topping_id);
			checkInput.setAttribute("value", toppingData[i].topping_name);
			formCheck.appendChild(checkInput);
			formCheck.appendChild(checkLabel);
			toppingInputGroup.appendChild(formCheck);
		}
	}
	sauceRow.appendChild(sauceLabel);
	sauceRow.appendChild(sauceInputGroup);
	cheeseRow.appendChild(cheeseLabel);
	cheeseRow.appendChild(cheeseInputGroup);
	toppingRow.appendChild(toppingLabel);
	toppingRow.appendChild(toppingInputGroup);
	newForm.appendChild(sauceRow);
	newForm.appendChild(cheeseRow);
	newForm.appendChild(toppingRow);


	// smallPRow = Small Price
	let smallPRow = document.createElement("div");
	smallPRow.classList.add("form-row");
	let smallPLabel = document.createElement("label");
	smallPLabel.setAttribute("for", "sm_price");
	smallPLabel.innerHTML = "Small Size Price:";
	let smallPInput = document.createElement("input");
	smallPInput.setAttribute("type", "number");
	smallPInput.setAttribute("id", "sm_price");
	smallPInput.setAttribute("placeholder", "0.00");
	smallPInput.classList.add("form-control");
	smallPRow.appendChild(smallPLabel);
	smallPRow.appendChild(smallPInput);
	newForm.appendChild(smallPRow);

	// mediumPRow = Medium Price
	let mediumPRow = document.createElement("div");
	mediumPRow.classList.add("form-row");
	let mediumPLabel = document.createElement("label");
	mediumPLabel.setAttribute("for", "med_price");
	mediumPLabel.innerHTML = "Medium Size Price:";
	let mediumPInput = document.createElement("input");
	mediumPInput.setAttribute("type", "number");
	mediumPInput.setAttribute("id", "med_price");
	mediumPInput.setAttribute("placeholder", "0.00");
	mediumPInput.classList.add("form-control");
	mediumPRow.appendChild(mediumPLabel);
	mediumPRow.appendChild(mediumPInput);
	newForm.appendChild(mediumPRow);

	// largePRow = Large Price
	let largePRow = document.createElement("div");
	largePRow.classList.add("form-row");
	let largePLabel = document.createElement("label");
	largePLabel.setAttribute("for", "lg_price");
	largePLabel.innerHTML = "Large Size Price:";
	let largePInput = document.createElement("input");
	largePInput.setAttribute("type", "number");
	largePInput.setAttribute("id", "lg_price");
	largePInput.setAttribute("placeholder", "0.00");
	largePInput.classList.add("form-control");
	largePRow.appendChild(largePLabel);
	largePRow.appendChild(largePInput);
	newForm.appendChild(largePRow);

	// xlargePRow = Small Price
	let xlargePRow = document.createElement("div");
	xlargePRow.classList.add("form-row");
	let xlargePLabel = document.createElement("label");
	xlargePLabel.setAttribute("for", "xlg_price");
	xlargePLabel.innerHTML = "Extra Large Price:";
	let xlargePInput = document.createElement("input");
	xlargePInput.setAttribute("type", "number");
	xlargePInput.setAttribute("id", "xlg_price");
	xlargePInput.setAttribute("placeholder", "0.00");
	xlargePInput.classList.add("form-control");
	xlargePRow.appendChild(xlargePLabel);
	xlargePRow.appendChild(xlargePInput);
	newForm.appendChild(xlargePRow);

	// xlargePRow = Small Price
	let noteRow = document.createElement("div");
	noteRow.classList.add("form-row");
	let noteLabel = document.createElement("label");
	noteLabel.setAttribute("for", "description");
	noteLabel.innerHTML = "Description:";
	let noteInput = document.createElement("textarea");
	noteInput.setAttribute("rows", "5");
	noteInput.setAttribute("id", "description");
	noteInput.classList.add("form-control");
	noteRow.appendChild(noteLabel);
	noteRow.appendChild(noteInput);
	newForm.appendChild(noteRow);


	// submitButton = Submit/Save
	let submitRow = document.createElement("div");
	submitRow.classList.add("form-row");
	submitRow.setAttribute("id", "submit-button-ref");
	let submitButton = document.createElement("button");
	submitButton.classList.add("btn");
	submitButton.classList.add("btn-primary");
	submitButton.setAttribute("type", "button");
	submitButton.setAttribute("onclick", submitAction);
	submitButton.innerHTML = "Save Item";
	submitRow.appendChild(submitButton);
	newForm.appendChild(submitRow);

	pageElement.appendChild(newForm);
}

// Creates the form to customize a menu item for an order
function generateCustomerMenuForm(){

}

function loadEditItemForm(){
	getMenuItemForEdit(this, this.id);
}

// generates the form for editing a menu item
// might be reusable in customer edit item for cart
function generateMenuItemEditForm(textBox, itemID, menuItems, toppingIDs, toppings){
	const documentBody = document.getElementById("footer");
	const editBackground = document.createElement("div");
	editBackground.setAttribute("id", "pop-up-box-background");
	const editBox = document.createElement("div");
	editBox.setAttribute("id", "edit-item-box");

	// get information about current menu item
	const currItem = menuItems.find(item => item.menu_item_id === itemID);
	let currToppings = [];
	for(let i = 0; i < toppingIDs.length; i++){
		if(toppingIDs[i].menu_item_id === itemID){
			currToppings.push(toppings.find(topping => topping.topping_id === toppingIDs[i].topping_id));
		}
	}
	console.log(currItem);
	console.log(currToppings);

	// create new form element
	const newForm = document.createElement("form");
	newForm.id = "form-add-menu-item row";
	const formTitle = document.createElement("h3");
	formTitle.appendChild(document.createTextNode("Edit Menu Item"));
	newForm.appendChild(formTitle);

	// nameRow = Pizza Name
	let nameRow = document.createElement("div");
	nameRow.classList.add("form-row");
	let nameLabel = document.createElement("label");
	nameLabel.setAttribute("for", "item_name");
	nameLabel.innerHTML = "Pizza Name:";
	let nameInput = document.createElement("input");
	nameInput.setAttribute("type", "text");
	nameInput.setAttribute("name", "item_name");
	nameInput.classList.add("form-control");
	nameInput.setAttribute("value", currItem.item_name);
	nameRow.appendChild(nameLabel);
	nameRow.appendChild(nameInput);
	newForm.appendChild(nameRow);

	// crustRow = Crust type
	let crustRow = document.createElement("div");
	crustRow.classList.add("form-row");
	let crustLabel = document.createElement("label");
	crustLabel.setAttribute("for", "crust");
	crustLabel.innerHTML = "Crust Type:";
	let crustSelect = document.createElement("select");
	crustSelect.setAttribute("name", "crust");
	crustSelect.classList.add("form-control");
	let crust1 = document.createElement("option");
	crust1.setAttribute("name", "crust");
	crust1.setAttribute("value", "thin-crust");
	crust1.innerHTML = "Thin-Crust";
	if(currItem.crust === "thin-crust"){crust1.setAttribute("selected", "selected");}
	let crust2 = document.createElement("option");
	crust2.setAttribute("name", "crust");
	crust2.setAttribute("value", "thick-crust");
	crust2.innerHTML = "Thick-Crust";
	if(currItem.crust === "thick-crust"){crust2.setAttribute("selected", "selected");}
	let crust3 = document.createElement("option");
	crust3.setAttribute("name", "crust");
	crust3.setAttribute("value", "whole-wheat-crust");
	crust3.innerHTML = "Whole Wheat";
	if(currItem.crust === "whole-wheat-crust"){crust3.setAttribute("selected", "selected");}
	let crust4 = document.createElement("option");
	crust4.setAttribute("name", "crust");
	crust4.setAttribute("value", "gluten-free-crust");
	crust4.innerHTML = "Gluten Free";
	if(currItem.crust === "gluten-free-crust"){crust4.setAttribute("selected", "selected");}
	crustSelect.appendChild(crust1);
	crustSelect.appendChild(crust2);
	crustSelect.appendChild(crust3);
	crustSelect.appendChild(crust4);
	crustRow.appendChild(crustLabel);
	crustRow.appendChild(crustSelect);
	newForm.appendChild(crustRow);

	// sauceRow = Sauce(s)
	let sauceRow = document.createElement("div");
	sauceRow.classList.add("form-row");
	let sauceLabel = document.createElement("label");
	sauceLabel.innerHTML = "Sauce(s):";
	let sauceInputGroup = document.createElement("div");
	sauceInputGroup.classList.add("input-group");

	// cheeseRow = Cheese(s)
	let cheeseRow = document.createElement("div");
	cheeseRow.classList.add("form-row");
	let cheeseLabel = document.createElement("label");
	cheeseLabel.innerHTML = "Cheese(s):";
	let cheeseInputGroup = document.createElement("div");
	cheeseInputGroup.classList.add("input-group");

	// toppingRow = Topping(s)
	let toppingRow = document.createElement("div");
	toppingRow.classList.add("form-row");
	let toppingLabel = document.createElement("label");
	toppingLabel.innerHTML = "Topping(s):";
	let toppingInputGroup = document.createElement("div");
	toppingInputGroup.classList.add("input-group");

	for(let i = 0; i < toppings.length; i++){
		let formCheck = document.createElement("div");
		formCheck.classList.add("form-check");
		formCheck.classList.add("form-check-inline");
		let checkLabel = document.createElement("label");
		checkLabel.classList.add("form-check-label");

		if(toppings[i].topping_category === "sauce"){
			checkLabel.setAttribute("for", "topping_id-" + toppings[i].topping_id);
			checkLabel.innerHTML = toppings[i].topping_name;
			let checkInput = document.createElement("input");
			checkInput.setAttribute("type", "checkbox");
			checkInput.setAttribute("name", "topping");
			checkInput.setAttribute("id", toppings[i].topping_id);
			checkInput.setAttribute("value", toppings[i].topping_name);
			if(currToppings.includes(toppings[i])){
				checkInput.setAttribute("checked", true);
			}
			formCheck.appendChild(checkInput);
			formCheck.appendChild(checkLabel);
			sauceInputGroup.appendChild(formCheck);
		}
		else if(toppings[i].topping_category === "cheese"){
			checkLabel.setAttribute("for", "topping_id-" + toppings[i].topping_id);
			checkLabel.innerHTML = toppings[i].topping_name;
			let checkInput = document.createElement("input");
			checkInput.setAttribute("type", "checkbox");
			checkInput.setAttribute("name", "topping");
			checkInput.setAttribute("id", toppings[i].topping_id);
			checkInput.setAttribute("value", toppings[i].topping_name);
			if(currToppings.includes(toppings[i])){
				checkInput.setAttribute("checked", true);
			}
			formCheck.appendChild(checkInput);
			formCheck.appendChild(checkLabel);
			cheeseInputGroup.appendChild(formCheck);
		}
		else {
			checkLabel.setAttribute("for", "toppingid_" + toppings[i].topping_id);
			checkLabel.innerHTML = toppings[i].topping_name;
			let checkInput = document.createElement("input");
			checkInput.setAttribute("type", "checkbox");
			checkInput.setAttribute("name", "topping");
			checkInput.setAttribute("id", toppings[i].topping_id);
			checkInput.setAttribute("value", toppings[i].topping_name);
			if(currToppings.includes(toppings[i])){
				checkInput.setAttribute("checked", true);
				console.log("found one" + toppings[i]);
			}
			formCheck.appendChild(checkInput);
			formCheck.appendChild(checkLabel);
			toppingInputGroup.appendChild(formCheck);
		}
	}
	sauceRow.appendChild(sauceLabel);
	sauceRow.appendChild(sauceInputGroup);
	cheeseRow.appendChild(cheeseLabel);
	cheeseRow.appendChild(cheeseInputGroup);
	toppingRow.appendChild(toppingLabel);
	toppingRow.appendChild(toppingInputGroup);
	newForm.appendChild(sauceRow);
	newForm.appendChild(cheeseRow);
	newForm.appendChild(toppingRow);


	// smallPRow = Small Price
	let smallPRow = document.createElement("div");
	smallPRow.classList.add("form-row");
	let smallPLabel = document.createElement("label");
	smallPLabel.setAttribute("for", "sm_price");
	smallPLabel.innerHTML = "Small Size Price:";
	let smallPInput = document.createElement("input");
	smallPInput.setAttribute("type", "number");
	smallPInput.setAttribute("name", "sm_price");
	smallPInput.setAttribute("value", currItem.sm_price);
	smallPInput.classList.add("form-control");
	smallPRow.appendChild(smallPLabel);
	smallPRow.appendChild(smallPInput);
	newForm.appendChild(smallPRow);

	// mediumPRow = Medium Price
	let mediumPRow = document.createElement("div");
	mediumPRow.classList.add("form-row");
	let mediumPLabel = document.createElement("label");
	mediumPLabel.setAttribute("for", "med_price");
	mediumPLabel.innerHTML = "Medium Size Price:";
	let mediumPInput = document.createElement("input");
	mediumPInput.setAttribute("type", "number");
	mediumPInput.setAttribute("name", "med_price");
	mediumPInput.setAttribute("value", currItem.med_price);
	mediumPInput.classList.add("form-control");
	mediumPRow.appendChild(mediumPLabel);
	mediumPRow.appendChild(mediumPInput);
	newForm.appendChild(mediumPRow);

	// largePRow = Large Price
	let largePRow = document.createElement("div");
	largePRow.classList.add("form-row");
	let largePLabel = document.createElement("label");
	largePLabel.setAttribute("for", "lg_price");
	largePLabel.innerHTML = "Large Size Price:";
	let largePInput = document.createElement("input");
	largePInput.setAttribute("type", "number");
	largePInput.setAttribute("name", "lg_price");
	largePInput.setAttribute("value", currItem.lg_price);
	largePInput.classList.add("form-control");
	largePRow.appendChild(largePLabel);
	largePRow.appendChild(largePInput);
	newForm.appendChild(largePRow);

	// xlargePRow = Small Price
	let xlargePRow = document.createElement("div");
	xlargePRow.classList.add("form-row");
	let xlargePLabel = document.createElement("label");
	xlargePLabel.setAttribute("for", "xlg_price");
	xlargePLabel.innerHTML = "Extra Large Price:";
	let xlargePInput = document.createElement("input");
	xlargePInput.setAttribute("type", "number");
	xlargePInput.setAttribute("name", "xlg_price");
	xlargePInput.setAttribute("value", currItem.xlg_price);
	xlargePInput.classList.add("form-control");
	xlargePRow.appendChild(xlargePLabel);
	xlargePRow.appendChild(xlargePInput);
	newForm.appendChild(xlargePRow);

	// xlargePRow = Small Price
	let noteRow = document.createElement("div");
	noteRow.classList.add("form-row");
	let noteLabel = document.createElement("label");
	noteLabel.setAttribute("for", "description");
	noteLabel.innerHTML = "Description:";
	let noteInput = document.createElement("textarea");
	noteInput.setAttribute("rows", "5");
	noteInput.setAttribute("name", "itemDescription");
	noteInput.setAttribute("id", "itemDescription");
	noteInput.setAttribute("placeholder", currItem.description);
	noteInput.value = currItem.description;
	noteInput.classList.add("form-control");
	noteRow.appendChild(noteLabel);
	noteRow.appendChild(noteInput);
	newForm.appendChild(noteRow);


	// submitButton = Submit/Save
	let submitRow = document.createElement("div");
	submitRow.classList.add("form-row");
	submitRow.setAttribute("id", "submit-button-ref");
	let cancelButton = document.createElement("button");
	cancelButton.classList.add("btn");
	cancelButton.classList.add("btn-primary");
	cancelButton.setAttribute("type", "button");
	cancelButton.setAttribute("id", "cancel-edit-button");
	cancelButton.addEventListener("click", removeEditWindow, false);
	cancelButton.innerHTML = "Cencel";
	let submitButton = document.createElement("button");
	submitButton.classList.add("btn");
	submitButton.classList.add("btn-primary");
	submitButton.setAttribute("type", "button");
	submitButton.addEventListener("click", () => {saveEditedMenuItem(itemID)}, false);
	submitButton.innerHTML = "Save Item";
	submitRow.appendChild(cancelButton);
	submitRow.appendChild(submitButton);
	newForm.appendChild(submitRow);

	editBox.appendChild(newForm);
	documentBody.appendChild(editBackground);
	documentBody.appendChild(editBox);
}

function removeEditWindow(){
	document.getElementById("form-add-menu-item row").remove();
	document.getElementById("pop-up-box-background").remove();
	document.getElementById("edit-item-box").remove();
}

function saveEditedMenuItem(menuItemID) {
	let formData = document.getElementById("form-add-menu-item row");

	// get form values
	let itemName = formData.elements.namedItem("item_name").value;
	let crustName = formData.elements.namedItem("crust").value;
	let smPrice = formData.elements.namedItem("sm_price").value;
	let medPrice = formData.elements.namedItem("med_price").value;
	let lgPrice = formData.elements.namedItem("lg_price").value;
	let xlgPrice = formData.elements.namedItem("xlg_price").value;
	console.log(xlgPrice);
	let itemDescription = document.getElementById("itemDescription").value;

	// get all included topping ids
	let toppingList = formData.elements.namedItem("topping");
	let toppingListIds = [];
	for (let currTop = 0; currTop < toppingList.length; currTop++) {
		if (toppingList[currTop].checked) {
			toppingListIds.push(toppingList[currTop].id);
		}
	}

	// check for empty fields
	let formValid = true;
	if (!itemName) {
		formValid = false;
		formData.elements.namedItem("item_name").classList.add("form-field-empty");
	} else {
		formData.elements.namedItem("item_name").classList.remove("form-field-empty");
	}
	if (!crustName) {
		formValid = false;
		formData.elements.namedItem("crust").classList.add("form-field-empty");
	} else {
		formData.elements.namedItem("crust").classList.remove("form-field-empty");
	}
	if (!smPrice) {
		formValid = false;
		formData.elements.namedItem("sm_price").classList.add("form-field-empty");
	} else{
		formData.elements.namedItem("sm_price").classList.remove("form-field-empty");
	}
	if (!medPrice) {
		formValid = false;
		formData.elements.namedItem("med_price").classList.add("form-field-empty");
	} else {
		formData.elements.namedItem("med_price").classList.remove("form-field-empty");
	}
	if (!lgPrice) {
		formValid = false;
		formData.elements.namedItem("lg_price").classList.add("form-field-empty");
	} else {
		formData.elements.namedItem("lg_price").classList.remove("form-field-empty");
	}
	if (!xlgPrice) {
		formValid = false;
		formData.elements.namedItem("xlg_price").classList.add("form-field-empty");
	} else {
		formData.elements.namedItem("xlg_price").classList.remove("form-field-empty");
	}
	if (!itemDescription) {
		formValid = false;
		document.getElementById("itemDescription").classList.add("form-field-empty");
	} else {
		document.getElementById("itemDescription").classList.remove("form-field-empty");
	}

	// if fields were filled, create new menu object and send to DB
	if (formValid) {
		// update all the field
		const newMenuItem = {
			menu_item_id: menuItemID,
			item_name: itemName,
			crust: crustName,
			toppings: toppingListIds, 	// array of topping ids that are checked
			sm_price: smPrice,
			med_price: medPrice,
			lg_price: lgPrice,
			xlg_price: xlgPrice,
			description: itemDescription
		};
		updateMenuItemDB(newMenuItem);
	}
}

function refreshAdminMenuItems(){
	let currListElement = document.getElementById('admin-menu-list');
	currListElement.innerText = "";
	getAdminMenu('admin-menu-list');
}

// update menu item
const updateMenuItemDB = async (inputData) => {
	const response = await fetch('http://localhost:3000/menuItems/' + inputData.menu_item_id, { //url needs to match in src/index
		method: 'PUT',
		body: JSON.stringify(inputData),
		headers: {
			'Content-Type' : 'application/json'
		}
	});

	await refreshAdminMenuItems();
	await removeEditWindow();
	const myJson = await response.json();
}

// loads a form for a new memu item
function loadNewItemForm() {
	getJsonToppings();
}

function generateNewItemForm(toppings){
	const documentBody = document.getElementById("footer");
	const editBackground = document.createElement("div");
	editBackground.setAttribute("id", "pop-up-box-background");
	const editBox = document.createElement("div");
	editBox.setAttribute("id", "edit-item-box");

	// create new form element
	const newForm = document.createElement("form");
	newForm.id = "form-add-menu-item row";
	const formTitle = document.createElement("h3");
	formTitle.appendChild(document.createTextNode("Add New Menu Item"));
	newForm.appendChild(formTitle);

	// nameRow = Pizza Name
	let nameRow = document.createElement("div");
	nameRow.classList.add("form-row");
	let nameLabel = document.createElement("label");
	nameLabel.setAttribute("for", "item_name");
	nameLabel.innerHTML = "Pizza Name:";
	let nameInput = document.createElement("input");
	nameInput.setAttribute("type", "text");
	nameInput.setAttribute("name", "item_name");
	nameInput.classList.add("form-control");
	nameRow.appendChild(nameLabel);
	nameRow.appendChild(nameInput);
	newForm.appendChild(nameRow);

	// crustRow = Crust type
	let crustRow = document.createElement("div");
	crustRow.classList.add("form-row");
	let crustLabel = document.createElement("label");
	crustLabel.setAttribute("for", "crust");
	crustLabel.innerHTML = "Crust Type:";
	let crustSelect = document.createElement("select");
	crustSelect.setAttribute("name", "crust");
	crustSelect.classList.add("form-control");
	let crust1 = document.createElement("option");
	crust1.setAttribute("name", "crust");
	crust1.setAttribute("value", "thin-crust");
	crust1.innerHTML = "Thin-Crust";
	let crust2 = document.createElement("option");
	crust2.setAttribute("name", "crust");
	crust2.setAttribute("value", "thick-crust");
	crust2.innerHTML = "Thick-Crust";
	let crust3 = document.createElement("option");
	crust3.setAttribute("name", "crust");
	crust3.setAttribute("value", "whole-wheat-crust");
	crust3.innerHTML = "Whole Wheat";
	let crust4 = document.createElement("option");
	crust4.setAttribute("name", "crust");
	crust4.setAttribute("value", "gluten-free-crust");
	crust4.innerHTML = "Gluten Free";
	crustSelect.appendChild(crust1);
	crustSelect.appendChild(crust2);
	crustSelect.appendChild(crust3);
	crustSelect.appendChild(crust4);
	crustRow.appendChild(crustLabel);
	crustRow.appendChild(crustSelect);
	newForm.appendChild(crustRow);

	// sauceRow = Sauce(s)
	let sauceRow = document.createElement("div");
	sauceRow.classList.add("form-row");
	let sauceLabel = document.createElement("label");
	sauceLabel.innerHTML = "Sauce(s):";
	let sauceInputGroup = document.createElement("div");
	sauceInputGroup.classList.add("input-group");

	let cheeseRow = document.createElement("div");
	cheeseRow.classList.add("form-row");
	let cheeseLabel = document.createElement("label");
	cheeseLabel.innerHTML = "Cheese(s):";
	let cheeseInputGroup = document.createElement("div");
	cheeseInputGroup.classList.add("input-group");

	let toppingRow = document.createElement("div");
	toppingRow.classList.add("form-row");
	let toppingLabel = document.createElement("label");
	toppingLabel.innerHTML = "Topping(s):";
	let toppingInputGroup = document.createElement("div");
	toppingInputGroup.classList.add("input-group");

	for(let i = 0; i < toppings.length; i++){
		let formCheck = document.createElement("div");
		formCheck.classList.add("form-check");
		formCheck.classList.add("form-check-inline");
		let checkLabel = document.createElement("label");
		checkLabel.classList.add("form-check-label");

		if(toppings[i].topping_category === "sauce"){
			checkLabel.setAttribute("for", "topping_id-" + toppings[i].topping_id);
			checkLabel.innerHTML = toppings[i].topping_name;
			let checkInput = document.createElement("input");
			checkInput.setAttribute("type", "checkbox");
			checkInput.setAttribute("name", "topping");
			checkInput.setAttribute("id", toppings[i].topping_id);
			checkInput.setAttribute("value", toppings[i].topping_name);
			formCheck.appendChild(checkInput);
			formCheck.appendChild(checkLabel);
			sauceInputGroup.appendChild(formCheck);
		}
		else if(toppings[i].topping_category === "cheese"){
			checkLabel.setAttribute("for", "topping_id-" + toppings[i].topping_id);
			checkLabel.innerHTML = toppings[i].topping_name;
			let checkInput = document.createElement("input");
			checkInput.setAttribute("type", "checkbox");
			checkInput.setAttribute("name", "topping");
			checkInput.setAttribute("id", toppings[i].topping_id);
			checkInput.setAttribute("value", toppings[i].topping_name);
			formCheck.appendChild(checkInput);
			formCheck.appendChild(checkLabel);
			cheeseInputGroup.appendChild(formCheck);
		}
		else {
			checkLabel.setAttribute("for", "toppingid_" + toppings[i].topping_id);
			checkLabel.innerHTML = toppings[i].topping_name;
			let checkInput = document.createElement("input");
			checkInput.setAttribute("type", "checkbox");
			checkInput.setAttribute("name", "topping");
			checkInput.setAttribute("id", toppings[i].topping_id);
			checkInput.setAttribute("value", toppings[i].topping_name);
			formCheck.appendChild(checkInput);
			formCheck.appendChild(checkLabel);
			toppingInputGroup.appendChild(formCheck);
		}
	}
	sauceRow.appendChild(sauceLabel);
	sauceRow.appendChild(sauceInputGroup);
	cheeseRow.appendChild(cheeseLabel);
	cheeseRow.appendChild(cheeseInputGroup);
	toppingRow.appendChild(toppingLabel);
	toppingRow.appendChild(toppingInputGroup);
	newForm.appendChild(sauceRow);
	newForm.appendChild(cheeseRow);
	newForm.appendChild(toppingRow);


	// smallPRow = Small Price
	let smallPRow = document.createElement("div");
	smallPRow.classList.add("form-row");
	let smallPLabel = document.createElement("label");
	smallPLabel.setAttribute("for", "sm_price");
	smallPLabel.innerHTML = "Small Size Price:";
	let smallPInput = document.createElement("input");
	smallPInput.setAttribute("type", "number");
	smallPInput.setAttribute("name", "sm_price");
	smallPInput.setAttribute("placeholder", "0.00");
	smallPInput.classList.add("form-control");
	smallPRow.appendChild(smallPLabel);
	smallPRow.appendChild(smallPInput);
	newForm.appendChild(smallPRow);

	// mediumPRow = Medium Price
	let mediumPRow = document.createElement("div");
	mediumPRow.classList.add("form-row");
	let mediumPLabel = document.createElement("label");
	mediumPLabel.setAttribute("for", "med_price");
	mediumPLabel.innerHTML = "Medium Size Price:";
	let mediumPInput = document.createElement("input");
	mediumPInput.setAttribute("type", "number");
	mediumPInput.setAttribute("name", "med_price");
	mediumPInput.setAttribute("placeholder", "0.00");
	mediumPInput.classList.add("form-control");
	mediumPRow.appendChild(mediumPLabel);
	mediumPRow.appendChild(mediumPInput);
	newForm.appendChild(mediumPRow);

	// largePRow = Large Price
	let largePRow = document.createElement("div");
	largePRow.classList.add("form-row");
	let largePLabel = document.createElement("label");
	largePLabel.setAttribute("for", "lg_price");
	largePLabel.innerHTML = "Large Size Price:";
	let largePInput = document.createElement("input");
	largePInput.setAttribute("type", "number");
	largePInput.setAttribute("name", "lg_price");
	largePInput.setAttribute("placeholder", "0.00");
	largePInput.classList.add("form-control");
	largePRow.appendChild(largePLabel);
	largePRow.appendChild(largePInput);
	newForm.appendChild(largePRow);

	// xlargePRow = Small Price
	let xlargePRow = document.createElement("div");
	xlargePRow.classList.add("form-row");
	let xlargePLabel = document.createElement("label");
	xlargePLabel.setAttribute("for", "xlg_price");
	xlargePLabel.innerHTML = "Extra Large Price:";
	let xlargePInput = document.createElement("input");
	xlargePInput.setAttribute("type", "number");
	xlargePInput.setAttribute("name", "xlg_price");
	xlargePInput.setAttribute("placeholder", "0.00");
	xlargePInput.classList.add("form-control");
	xlargePRow.appendChild(xlargePLabel);
	xlargePRow.appendChild(xlargePInput);
	newForm.appendChild(xlargePRow);

	// xlargePRow = Small Price
	let noteRow = document.createElement("div");
	noteRow.classList.add("form-row");
	let noteLabel = document.createElement("label");
	noteLabel.setAttribute("for", "description");
	noteLabel.innerHTML = "Description:";
	let noteInput = document.createElement("textarea");
	noteInput.setAttribute("rows", "5");
	noteInput.setAttribute("name", "itemDescription");
	noteInput.setAttribute("id", "itemDescription");
	noteInput.classList.add("form-control");
	noteRow.appendChild(noteLabel);
	noteRow.appendChild(noteInput);
	newForm.appendChild(noteRow);


	// submitButton = Submit/Save
	let submitRow = document.createElement("div");
	submitRow.classList.add("form-row");
	submitRow.setAttribute("id", "submit-button-ref");
	let cancelButton = document.createElement("button");
	cancelButton.classList.add("btn");
	cancelButton.classList.add("btn-primary");
	cancelButton.setAttribute("type", "button");
	cancelButton.setAttribute("id", "cancel-edit-button");
	cancelButton.addEventListener("click", removeEditWindow, false);
	cancelButton.innerHTML = "Cencel";
	let submitButton = document.createElement("button");
	submitButton.classList.add("btn");
	submitButton.classList.add("btn-primary");
	submitButton.setAttribute("type", "button");
	submitButton.addEventListener("click", () => {saveNewMenuItem()}, false);
	submitButton.innerHTML = "Save Item";
	submitRow.appendChild(cancelButton);
	submitRow.appendChild(submitButton);
	newForm.appendChild(submitRow);

	editBox.appendChild(newForm);
	documentBody.appendChild(editBackground);
	documentBody.appendChild(editBox);
}

function saveNewMenuItem() {
	let formData = document.getElementById("form-add-menu-item row");

	// get form values
	let itemName = formData.elements.namedItem("item_name").value;
	let crustName = formData.elements.namedItem("crust").value;
	let smPrice = formData.elements.namedItem("sm_price").value;
	let medPrice = formData.elements.namedItem("med_price").value;
	let lgPrice = formData.elements.namedItem("lg_price").value;
	let xlgPrice = formData.elements.namedItem("xlg_price").value;
	let itemDescription = document.getElementById("itemDescription").value;

	// get all included topping ids
	let toppingList = formData.elements.namedItem("topping");
	let toppingListIds = [];
	for (let currTop = 0; currTop < toppingList.length; currTop++) {
		if (toppingList[currTop].checked) {
			toppingListIds.push(toppingList[currTop].id);
		}
	}

	// check for empty fields
	let formValid = true;
	if (!itemName) {
		formValid = false;
		formData.elements.namedItem("item_name").classList.add("form-field-empty");
	} else {
		formData.elements.namedItem("item_name").classList.remove("form-field-empty");
	}
	if (!crustName) {
		formValid = false;
		formData.elements.namedItem("crust").classList.add("form-field-empty");
	} else {
		formData.elements.namedItem("crust").classList.remove("form-field-empty");
	}
	if (!smPrice) {
		formValid = false;
		formData.elements.namedItem("sm_price").classList.add("form-field-empty");
	} else{
		formData.elements.namedItem("sm_price").classList.remove("form-field-empty");
	}
	if (!medPrice) {
		formValid = false;
		formData.elements.namedItem("med_price").classList.add("form-field-empty");
	} else {
		formData.elements.namedItem("med_price").classList.remove("form-field-empty");
	}
	if (!lgPrice) {
		formValid = false;
		formData.elements.namedItem("lg_price").classList.add("form-field-empty");
	} else {
		formData.elements.namedItem("lg_price").classList.remove("form-field-empty");
	}
	if (!xlgPrice) {
		formValid = false;
		formData.elements.namedItem("xlg_price").classList.add("form-field-empty");
	} else {
		formData.elements.namedItem("xlg_price").classList.remove("form-field-empty");
	}
	if (!itemDescription) {
		formValid = false;
		document.getElementById("itemDescription").classList.add("form-field-empty");
	} else {
		document.getElementById("itemDescription").classList.remove("form-field-empty");
	}

	// if fields were filled, create new menu object and send to DB
	if (formValid) {
		// update all the field
		const newMenuItem = {
			item_name: itemName,
			crust: crustName,
			toppings: toppingListIds, 	// array of topping ids that are checked
			sm_price: smPrice,
			med_price: medPrice,
			lg_price: lgPrice,
			xlg_price: xlgPrice,
			description: itemDescription
		};
		addMenuItemtoDB(newMenuItem);
	}
}

// adds a menu item to the database
const addMenuItemtoDB = async (inputData) => {
	// creates a post request, which is defined in the src/index.js file to call "addItem.js"
	const response = await fetch('http://localhost:3000/menuItems', {
		method: 'POST',
		body: JSON.stringify(inputData), // string or object
		headers: {
			'Content-Type': 'application/json'
		}
	});
	await refreshAdminMenuItems();
	await removeEditWindow();
	// gets the json back if we want to do something new with it
	const myJson = await response.json(); //extract JSON from the http response
}

