//Author: Aaron Flores & Cole Giuffrida
//Date: 9/29/26 to 10/13/26


async function getMons(url) {
    let response = await fetch(url);
    if (!response.ok) {
        throw new Error("Could not load Digimon.");
    }
    let data = await response.json();
    return data;
}

async function loadLevels() {
    let levelFilter = document.querySelector("#level");
    let message = document.querySelector("#monMessage");
    try {
        let mons = await getMons(
            "https://digimon-api.vercel.app/api/digimon"
        );
        let addedLevels = [];
        for (let mon of mons) {
            if (!addedLevels.includes(mon.level)) {
                let option = document.createElement("option");
                option.value = mon.level;
                option.textContent = mon.level;
                levelFilter.appendChild(option);
                addedLevels.push(mon.level);
            }
        }
    } 
    catch (error) {
        message.textContent = "Could not load the level options.";
    }
}

function displayMons(mons) {
    let results = document.querySelector("#monInsert");
    results.innerHTML = "";
    for (let mon of mons) {
        let card = document.createElement("div");
        card.classList.add("result-card");
        let image = document.createElement("img");
        image.src = mon.img;
        image.alt = mon.name;
        let name = document.createElement("h3");
        name.textContent = mon.name;
        let level = document.createElement("p");
        level.textContent = "Level: " + mon.level;
        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(level);
        results.appendChild(card);
    }
}

let monSearchNumber = 0;
let monResults = [];
let monPageSize = 10;
let monCurrentPage = 1;

function showMonPage() {
    let startIndex = (monCurrentPage - 1) * monPageSize;
    let endIndex = startIndex + monPageSize;
    let pageResults = monResults.slice(startIndex, endIndex);
    displayMons(pageResults);
}

function setMonResults(mons) {
    monResults = mons;
    monCurrentPage = 1;
    let pageSelect = document.querySelector("#monPage");
    let paging = document.querySelector("#monPaging");
    pageSelect.innerHTML = "";
    let numberOfPages = Math.ceil(monResults.length / monPageSize);
    for (let page = 1; page <= numberOfPages; page++) {
        let option = document.createElement("option");
        option.value = page;
        option.textContent = page;
        pageSelect.appendChild(option);
    }
    paging.hidden = monResults.length === 0;
    if (monResults.length > 0) {
        pageSelect.value = "1";
    }
    showMonPage();
}

async function filterMons() {
    let searchNumber = ++monSearchNumber;
    let name = document.querySelector("#monName").value.trim();
    let level = document.querySelector("#level").value;
    let sort = document.querySelector("#sort").checked;
    let message = document.querySelector("#monMessage");
    setMonResults([]);
    if (name.length > 30) {
        message.textContent = "Please enter a name with 30 characters or fewer.";
        return;
    }
    if (name === "" && level === "") {
        message.textContent = "Choose at least one filter to see results.";
        return;
    }
    let url = "https://digimon-api.vercel.app/api/digimon";
    if (level !== "") {
        url += "/level/" + encodeURIComponent(level);
    }
    message.textContent = "Loading Digimon...";
    try {
        let mons = await getMons(url);
        if (searchNumber !== monSearchNumber) {
            return;
        }
        if (name !== "") {
            mons = mons.filter(function(mon) {
                return mon.name.toLowerCase().includes(name.toLowerCase());
            });
        }
        if (sort) {
            mons.sort(function(a, b) {
                return a.name.localeCompare(b.name);
            });
        }
        setMonResults(mons);
        message.textContent = mons.length + " Digimon found.";
    } 
    catch (error) {
        if (searchNumber !== monSearchNumber) {
            return;
        }
        message.textContent = "Could not load Digimon. Please try again.";
    }
}

async function getGames(url) {
    let response = await fetch(url);
    if (!response.ok) {
        throw new Error("Could not load games.");
    }
    let data = await response.json();
    if (!Array.isArray(data)) {
        throw new Error("Unexpected response from the games API.");
    }
    return data;
}

function displayGames(games) {
    let results = document.querySelector("#insert");
    results.innerHTML = "";
    for (let game of games) {
        let card = document.createElement("div");
        card.classList.add("result-card");
        let image = document.createElement("img");
        image.src = game.thumbnail;
        image.alt = game.title;
        let title = document.createElement("h3");
        title.textContent = game.title;
        let genre = document.createElement("p");
        genre.textContent = "Genre: " + game.genre;
        let platform = document.createElement("p");
        platform.textContent = "Platform: " + game.platform;
        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(genre);
        card.appendChild(platform);
        results.appendChild(card);
    }
}

let gameSearchNumber = 0;

async function filterGames() {
    let searchNumber = ++gameSearchNumber;
    let genre = document.querySelector("#genre").value;
    let platform = document.querySelector("#platform").value;
    let message = document.querySelector("#gameMessage");
    displayGames([]);
    if (genre === "" && platform === "") {
        message.textContent = "Choose at least one filter to see results.";
        return;
    }
    let parameters = [];
    if (genre !== "") {
        parameters.push("category=" + encodeURIComponent(genre));
    }
    if (platform !== "") {
        parameters.push("platform=" + encodeURIComponent(platform));
    }
    let url = "https://www.freetogame.com/api/games?" + parameters.join("&");
    message.textContent = "Loading games...";
    try {
        let games = await getGames(url);
        if (searchNumber !== gameSearchNumber) {
            return;
        }
        displayGames(games);
        message.textContent = games.length + " games found.";
    } 
    catch (error) {
        if (searchNumber !== gameSearchNumber) {
            return;
        }
        message.textContent = "Could not load games for these filters. Try another selection.";
        console.error(error);
    }
}

let monForm = document.querySelector("#monFilters");
if (monForm !== null) {
    monForm.reset();
    setMonResults([]);
    loadLevels();
    document.querySelector("#monName").addEventListener("input", filterMons);
    document.querySelector("#level").addEventListener("change", filterMons);
    document.querySelector("#sort").addEventListener("change", filterMons);
    monForm.addEventListener("submit", function(event) {
        event.preventDefault();
    });

    monForm.addEventListener("reset", function() {
        monSearchNumber++;
        setMonResults([]);
        document.querySelector("#monMessage").textContent = "Choose at least one filter to see results.";
    });

    document.querySelector("#monPage").addEventListener("change", function() {
        monCurrentPage = Number(this.value);
        showMonPage();
    });
}

let gameForm = document.querySelector("#gameFilters");

if (gameForm !== null) {
    gameForm.reset();
    displayGames([]);
    document.querySelector("#genre").addEventListener("change", filterGames);
    document.querySelector("#platform").addEventListener("change", filterGames);
    gameForm.addEventListener("submit", function(event) {
        event.preventDefault();
    });
    gameForm.addEventListener("reset", function() {
        gameSearchNumber++;
        displayGames([]);
        document.querySelector("#gameMessage").textContent = "Choose at least one filter to see results.";
    });
}
