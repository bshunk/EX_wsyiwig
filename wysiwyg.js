// declared variables to hold variables
let input = document.getElementById("input");
let container = document.getElementById("container");
let cards = document.getElementsByClassName("cards");
let bio = "";
let array = [];

// defines the function setArr 
function setArr() {

	// set array to equal the parsed json file so it's not displayed like a straight JSON file 
	array = JSON.parse(this.responseText)

	// calls outputCards function and passes array into the function
	outputCards(array)
};
	
// defines the function outputCards while expecting peopleArray to be passed in (from line 15, through 'array')
function outputCards(peopleArray) {
	
	// for loop that iterates over the peopleArray
	for (var i = 0; i < peopleArray.length; i++) {

		// sets the container to display all the json info through concatenation upon getting the json file through the XHR
		container.innerHTML += `<div class="cards"><person><header>${peopleArray[i].name} & ${peopleArray[i].title}</header><span class="bio">${peopleArray[i].bio}</span><img src="${peopleArray[i].image}"></img></section><footer>${peopleArray[i].lifespan.birth} ${peopleArray[i].lifespan.death}</footer></person></div>`
	}

	// calls activateClickEvent function
	activateClickEvent()
};

// defines the function XHRFail
function XHRFail() {

	// displays "error" in the console if the XHR failed to load
	console.log(this.status, this.statusText)
};

// creates variable myRequest and sets it equal to a new XHR object
var myRequest = new XMLHttpRequest();

//adds an event listener so when the page loads, the setArr function will run
myRequest.addEventListener("load", setArr);

// adds an event listener so if there is an error, the XHRFail function will run
myRequest.addEventListener("error", XHRFail);

// intitializing a request for items.json file ---> tells it that it's a "GET" request for a json file
myRequest.open("GET", "items.json");
	
// sends the request 
myRequest.send();

// defines the function activateClickEvent
function activateClickEvent() {

	// for loop that iterates over the cards array
	for (var i = 0; i < cards.length; i++) {

		// for each card it adds a "click" event listener and an (e), aka 'event', function
		cards[i].addEventListener("click", function (e) {

			// calls the function clearInputEvent
			clearInputEvent();

			// calls the function activateFocusEvent
			activateFocusEvent();
			
			// calls the function deathCard
			deathCard();

			// calls the function activateBorderEvent and passes in (e.currentTarget)
			activateBorderEvent(e.currentTarget);
		})
	}
};

// defines function activateFocusEvent
function activateFocusEvent() {

	// selects the input element and adds the method 'focus'--> the input gets focused when clicked
	input.focus()
};

// defines function activateBorderEvent and expects clickedCard to be passed in (from line 73, through 'e.currentTarget')
function activateBorderEvent(clickedCard) {

	// adds a class element of "selectedCard" to clickedCard
	clickedCard.classList.add("selectedCard");

	// calls activateKeyEvent and passes in clickedCard
	activateKeyEvent(clickedCard);
};

// defines function deathCard
function deathCard() {

	// for loop that iterates over the cards array
	for (var i = 0; i < cards.length; i++) {

		// condition checking to see if each card contains a class of "selectedCard"
		if (cards[i].classList.contains("selectedCard")) {

			// if true, removes the class "selectedCard" from each card selected
			cards[i].classList.remove("selectedCard")
		}
	}
};

// defines function activateKeyEvent and expects clickedCard to be passed in (from line 92, through 'clickedCard')
function activateKeyEvent(clickedCard) {

	// adds an event listener to any 'keyup' in the input field and runs an event function
	input.addEventListener("keyup", function(e) {

		// condition that checks to see if the key stroke was a return/enter from the user
		if (e.keyCode === 13) {

			// if true, calls clearInputEvent
			clearInputEvent()

		// otherwise if false
		}else {

		// calls mirrorText function and passes in clickedCard
		mirrorText(clickedCard);
		}
	});
};

// defines function mirrorText and expects clickedCard to be passed in (from line 126, through 'clickedCard')
function mirrorText(clickedCard) {

	// condition that checks to see if the selected card contains a class of "selectedCard"
	if (clickedCard.classList.contains("selectedCard")) {

		// if true, selects the innerHTML of the element (<span>) and sets it to equal the value of what is typed into the input field
		clickedCard.querySelector(".bio").innerHTML = input.value;
	}
};

// defines function clearInputEvent
function clearInputEvent() {

	// sets the input field to the value of an empty string
	input.value = "";
};

