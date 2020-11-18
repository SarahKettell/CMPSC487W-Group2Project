/*************************************************************************
* Functions to deal with creating the forms to add, update, or 
* customize menu items
*************************************************************************/
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

function loadAdminMenuForm(pageElement, option, submitAction){
	getToppingsData(pageElement, option, null, submitAction);
}


// Creates the form for adding/editing menu items
// if option == new, do not try to load prev data
// if option == edit, load prev data into form
// Form ids = 
function generateAdminMenuForm(pageElement, option, toppingData, submitAction){

	console.log(toppingData);

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