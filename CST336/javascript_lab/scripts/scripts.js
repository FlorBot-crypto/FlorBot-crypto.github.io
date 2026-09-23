let guesses;
let triesLeft = 7;
numbersGuessed = [];
let wins = 0;
let losses = 0;
let answer = getRndInteger(1, 99);

let guessMessage = document.querySelector("#guessMessage");
let guessButton = document.querySelector(("#guessButton"));
let guessInput = document.querySelector("#guessInput");
let winsText = document.querySelector("#wins");
let lossesText = document.querySelector("#losses");

let winMessage = "Congratualations! You Guessed it!";
let loseMessage = "No more tries! Try again with another number!";
document.getElementById("tryAgainButton").hidden = true;


guessButton.addEventListener('click', function () {
    if (+guessInput.value < 1 || +guessInput.value > 100) {
        guessMessage.textContent = "Invalid input.";
        return null;
    }
    numbersGuessed.push(+guessInput.value);

    gameStatus();
});

tryAgainButton.addEventListener('click', function () {
    document.getElementById("guessButton").hidden = false;
    triesLeft = 7;
    numbersGuessed = [];
    numGuessed.textContent = "Numbers Guessed: ";
    guessMessage.style.color = "black";
    guessMessage.textContent = " ";
    document.getElementById("tryAgainButton").hidden = true;
    answer = getRndInteger(1, 99);
});

function gameStatus() {
    if (+guessInput.value === answer) {
        guessMessage.style.color = "green";
        guessMessage.textContent = winMessage + "\nThe answer was: " + answer;
        document.getElementById("guessButton").hidden = true;
        document.getElementById("tryAgainButton").hidden = false;
        wins++;
        winsText.textContent = "Wins: " + wins;

    } else if (+guessInput.value >= answer) {
        guessMessage.style.color = "red";
        triesLeft--;
        guessMessage.textContent = "Too High! " + triesLeft + " Tries Left!";
        numGuessed.textContent += "[" + numbersGuessed[numbersGuessed.length - 1] + "]";

    } else {
        guessMessage.style.color = "red";
        triesLeft--;
        guessMessage.textContent = "Too Low! " + triesLeft + " Tries Left!";
        numGuessed.textContent += "[" + numbersGuessed[numbersGuessed.length - 1] + "]";

    }
    if (triesLeft == 0) {
        guessMessage.style.color = "red";
        guessMessage.textContent = loseMessage + "\nThe answer was: " + answer;
        document.getElementById("guessButton").hidden = true;
        document.getElementById("tryAgainButton").hidden = false;
        losses++;
        lossesText.textContent = "Losses: " + losses;
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}