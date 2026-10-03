let stateSelect = document.querySelector("#state-id");
let countySelect = document.querySelector("#county");
let cityInsert = document.querySelector("#city");
let latitudeInsert = document.querySelector("#latitude");
let longitudeInsert = document.querySelector("#longitude");
let usernameError = document.querySelector("#usernameError")

async function geUsername(){
    let userNameResults = await fetch ("https://csumb.space/api/usernamesAPI.php")
    let userNameData = await userNameResults.json();



    // if (userNameData.usernmae == "maria" || userNameData.username == "John"){
    //     usernameError.textContent = "Username already exists. Use a different username.";
    // }
}

async function getCityData(){
    let cityResults = await fetch ("https://csumb.space/api/cityInfoAPI.php?zip=93955")
    let cityData = await cityResults.json();
    
    console.log(cityData);
    cityInsert.textContent = cityData.city;
    latitudeInsert.textContent = cityData.latitude;
    longitudeInsert.textContent = cityData.longitude;

}

async function getStates() {
    let stateResults = await fetch ("https://csumb.space/api/allStatesAPI.php");
    let stateData = await stateResults.json();

    for (let state of stateData){
        let stateOption = document.createElement("option");
        stateOption.textContent = state.state;
        stateOption.value = state.id;
        stateSelect.appendChild(stateOption);
    }
}

async function getCounties() {
    let countyResult = await fetch ("https://csumb.space/api/countyListAPI.php?state=ca");
    let countyData = await countyResult.json();

    for (let county of countyData){
        let countyOption = document.createElement("option");
        countyOption.textContent = county.county;
        stateSelect.appendChild(countyOption);
    }
}

getStates();
getCityData();
getCounties();