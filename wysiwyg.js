// made a variable for the html input element 
let input = document.getElementById("input");

// made a variable for the entire container that holds all the cards
let container = document.getElementById("container");

// made a variable for the cards that we'll output into the dom from the output cards func
let cards = document.getElementsByClassName("cards");

// created an open element bio to put the json into from the XHR
let bio = "";

// created and empty array to store the entire json file into when called 
let array = [];

// created the function setArr to receive XHR information and sets the value to var array
function setArr() {

	// set the array to equal the parsed the json file relative to the current functions scope
	array = JSON.parse(this.responseText)

	// executes outputCards function
	outputCards(array)
};
	
// created outputCards function while have peopleArray in function definition to expect it later
function outputCards(peopleArray) {
	
	// created for loop to iterate through the peopleArray
	for (var i = 0; i < peopleArray.length; i++) {

		// sets the container to display all the json info through string temperate literals upon getting the json file through the XHR
		container.innerHTML += `<div class="cards"><person><header>${peopleArray[i].name} & ${peopleArray[i].title}</header><span class="bio">${peopleArray[i].bio}</span><img src="${peopleArray[i].image}"></img></section><footer>${peopleArray[i].lifespan.birth} ${peopleArray[i].lifespan.death}</footer></person></div>`
	}

	// executes activateClickEvent function
	activateClickEvent()
};

// function to create the object of the XHR fail
function XHRFail() {

	// displays error in the console if the XHR failed to load
	console.log(this.status, this.statusText)
};

// variable to get XHR to get json files
var myRequest = new XMLHttpRequest();

//event listeners that will send and get json
myRequest.addEventListener("load", setArr);

// event listener that will show error if unable to send and get json
myRequest.addEventListener("error", XHRFail);

// opens json files and sends it to getJson function
myRequest.open("GET", "items.json");
	
// console.log("data", myRequest);
myRequest.send();

// created a function that will activate the click event and iterate through the cards
function activateClickEvent() {

	// for loop that iterates through the available cards
	for (var i = 0; i < cards.length; i++) {

		// sets each selected card in the iteration to have events / listeners / functions
		cards[i].addEventListener("click", function (e) {

			// executes function that will clear the input field
			clearInputEvent();

			// executes function that will have the input field react to a click event
			activateFocusEvent();
			
			// executes deathCard function that removes new user input from each card once clicked on another card
			deathCard();

			// executes function that will display a dotted border around the selected card
			activateBorderEvent(e.currentTarget);
		})
	}
};

// function that activates the focus on the input field once clicked by the user
function activateFocusEvent() {

	// takes the input variable and adds the property focus to react once clicked
	input.focus()
};

// function that runs the border event with the selected card defined/ expected to carry out once function runs
function activateBorderEvent(clickedCard) {

	// adds a class element to the clickedCard object 
	clickedCard.classList.add("selectedCard")

	// executes the key event functions while passing clickedCard through to that function
	activateKeyEvent(clickedCard)
};

// function that removes all information from the card once user clicks another card
function deathCard() {

	// for loop that iterates through the selected cards 
	for (var i = 0; i < cards.length; i++) {

		// condition stating if the selected card contains a classList of 'selectedCard'
		if (cards[i].classList.contains("selectedCard")) {

			// removes the data from the condition if it met in line above
			cards[i].classList.remove("selectedCard")
		}
	}
};

// function that creates a click event when user types / keysup in the input field
function activateKeyEvent(clickedCard) {

	// added the keyup event listener to the input field and created an event function
	input.addEventListener("keyup", function(e) {

		// console log to see if event worked
		console.log("event", e);

		// condition that sees if the key stroke was a return/enter from the user
		if (e.keyCode === 13) {

			// executes function that clers the input field
			clearInputEvent()

		// else condition that will run if the above if statement was false 
		}else {

		// instead of clearing input, the condition will output new data in the bio DOM
		mirrorText(clickedCard);
		}
	});
};

// created a function that will output exactly what the user inputs into the DOM for a card's bio section
function mirrorText(clickedCard) {
	
	//console log that tests whether the input.value ran properly 
	console.log("input value", input.value);

	// if statement that sets the condition if a clickedCard class contains the selectedCard class
	if (clickedCard.classList.contains("selectedCard")) {

		// it if statement is true, sets the current bio to the user input data and replaces original json information
		clickedCard.querySelector(".bio").innerHTML = input.value;
	}
};

// function that runs the clear input field
function clearInputEvent() {

	// sets the input field to nothing/ aka removes any data in the field
	input.value = "";
};








