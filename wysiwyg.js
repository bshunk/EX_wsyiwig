let input = document.getElementById("input");
let container = document.getElementById("container");
let cards = document.getElementsByClassName("cards");
let bio = "";
let array = [];

// receives XHR information and sets the value to var array
function setArr() {
	array = JSON.parse(this.responseText)
	outputCards(array)
};
	
function outputCards(peopleArray) {
	for (var i = 0; i < peopleArray.length; i++) {
		container.innerHTML += `<div class="cards"><person><header>${peopleArray[i].name} & ${peopleArray[i].title}</header><span class="bio">${peopleArray[i].bio}</span><img src="${peopleArray[i].image}"></img></section><footer>${peopleArray[i].lifespan.birth} ${peopleArray[i].lifespan.death}</footer></person></div>`
	}
	activateClickEvent()
};

// function to create the object of the XHR fail
function XHRFail() {
	console.log(this.status, this.statusText)
};

// variable to get XHR to get json files
var myRequest = new XMLHttpRequest();

//event listeners that will send and get json, or show error if unable 
myRequest.addEventListener("load", setArr);
myRequest.addEventListener("error", XHRFail);

// opens json files and sends it to getJson function
myRequest.open("GET", "items.json");
	// console.log("data", myRequest);
myRequest.send();

function activateClickEvent() {
	for (var i = 0; i < cards.length; i++) {
		cards[i].addEventListener("click", function (e) {
			activateFocusEvent()
			deathCard()
			activateBorderEvent(e.currentTarget)
		})
	}
};

function activateFocusEvent() {
	input.focus()
};

function activateBorderEvent(clickedCard) {
	clickedCard.classList.add("selectedCard")
	activateKeyEvent(clickedCard)
};

function deathCard() {
	for (var i = 0; i < cards.length; i++) {
		if (cards[i].classList.contains("selectedCard")) {
			cards[i].classList.remove("selectedCard")
		}
	}
};

function activateKeyEvent(clickedCard) {
	input.addEventListener("keyup", function() {
		mirrorText(clickedCard);
	});
};

function mirrorText(clickedCard) {
	console.log("input value", input.value);
	clickedCard.querySelector(".bio").innerHTML = input.value;
};

