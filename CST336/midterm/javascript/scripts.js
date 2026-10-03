let limit = 20;
console.log("Dogs (but not yet): ");

async function getGames() {
    let gameResults = await fetch("https://www.freetogame.com/api/games");

    //Get fetched cats API result, and convert to JSON, or javascript language.
    let gameData = await gameResults.json();
    console.log(gameData);

    let gameResult = document.querySelector("#insert");
    let genreFilter = document.querySelector("#genre");
    let platformFilter = document.querySelector("#platform")
    let duplicateGenre = [];
    let duplicatePlatform = [];


    for (let game of gameData) {
        let gameThumbnail = document.createElement("img");
        let gameTitle = document.createElement("p");
        gameTitle.textContent = game.title;
        gameThumbnail.src = game.thumbnail;
        gameResult.appendChild(gameThumbnail);
        gameResult.appendChild(gameTitle);

        let gameGenre = document.createElement("option");
        if (!duplicateGenre.includes(game.genre)) {
            gameGenre.textContent = game.genre;
            gameGenre.value = game.genre;
            genreFilter.appendChild(gameGenre);
        }
        duplicateGenre.push(game.genre);

        let gamePlatform = document.createElement("option");
        if (!duplicatePlatform.includes(game.platform)) {
            gamePlatform.textContent = game.platform;
            gamePlatform.value = game.platform;
            platformFilter.appendChild(gamePlatform);
        }
        duplicatePlatform.push(game.platform);
    }

    //I need to check for duplicates
    //Add the duplicates to a list
    //use that list for the options
    //I do not want to reiterate through the API more than once

    //Loop throught API
    // for (let genre of gameData) {
    //     let gameGenre = document.createElement("option");

    //     // If a duplicate genre is found, DO NOT make a new option
    //     if (!duplicateGenre.includes(genre.genre)) {
    //         gameGenre.textContent = genre.genre;
    //         gameGenre.value = genre.genre;
    //         genreFilter.appendChild(gameGenre);
    //     }

    //     duplicateGenre.push(genre.genre);
    // }
}

//TODO: Make an even listener to filter the games by genre.
//TODO: Make another filter for Platform


getGames();