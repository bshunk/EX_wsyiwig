let input = document.getElementById("input");
let container = document.getElementById("container");
let card = document.getElementsByClassName("");
let bio = "";
let array = [];

// receives XHR information and sets the value to var array
function setArr() {
	array = JSON.parse(this.responseText)
	console.log("array", array)
	outputCards(array)
};
	
function outputCards(peopleArray) {
	for (i = 0; i < peopleArray.length; i++) {
		console.log(peopleArray[i].title)
		container.innerHTML += `<person><header>${peopleArray[i].name} & ${peopleArray[i].title}</header><section>${peopleArray[i].bio} ${peopleArray[i].image}</section><footer>${peopleArray[i].lifespan}</footer></person>`
	}
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






