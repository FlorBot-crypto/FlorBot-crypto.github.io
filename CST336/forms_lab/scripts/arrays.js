let colors = [];

let toppings = ['lettuce', 'tomato', 'cheese'];

colors.push('red');
colors.push('green');

//splice is a function that lets you insert elements between other elements
//Slice lets you remove an element.

colors[0];
colors[1];

let toppingsInput = document.querySelectorAll("input[name=toppings]");
//If a query is not found it will return an empty array.

let ages = [50,30,35,20,24];
let sum = 0;

for (let index of ages){
    sum += ages[index];
}

console.log(sum/ages.length);

let checkboxes = document.querySelectorAll('input[name=toppings]');
let count = 0;

for (let checkbox of checkboxes){
    if (checkbox.checked){
        count++
    }
}
console.log("checkboxes checked: " + count);

//Creating Elements
// Step 1: Create the Element

let newParagraph = document.createElement("p");

//Step 2: Configure new element
newParagraph.textContent = "I have been created";
newParagraph.id = "dynamic-paragrah";

//Step 3: Insert into page

//Make a variable for which part of the page the element should go in
let insertArea =  document.querySelector('#insert-area');
insertArea.appendChild(newParagraph);

let names = ['Drew', 'Angel', 'Jeff', 'Nelson'];
//write a paragraph for each of the names.

for (let name of names){
    let newParagraph = document.createElement("p");
    insertArea.appendChild(newParagraph);
    newParagraph.textContent = name;
    newParagraph.id = "dynamic-paragrah";
}

let namesDropdown = document.querySelector("#names-dropdown");

for (let name of names) {
    let nameItem = document.createElement("option");
    nameItem.textContent = name;
    nameItem.value = name;
    namesDropdown.appendChild(nameItem);
}

//THECATAPI

//Async function, lets the OS know that this function could take an unknown time to finish
let limit = 20;
console.log("Cats (but not yet): ");

async function getCats () {
    let catResult = await fetch ("https://api.thecatapi.com/v1/images/search?limit=10");

    //Get fetched cats API result, and convert to JSON, or javascript language.
    let catsData = await catResult.json();
    console.log(catsData);

    let catResults = document.querySelector("#insert-cats");

    for (let cat in catsData){
        let catItem = document.createElement("img");
        catItem.src = cat.url
        catResults.appendChild(catItem);
    }
}

getCats();

//Any code after this, could start before API is fetched