// Const

const wordList = [  "discount", "roof", "beat", "hostile", "illusion", 
                    "closed", "heavy", "book", "screw", "diver",
                    "coin", "navy", "silk", "cow", "evolution"];

const MAX_ROUNDS = 5;
const MAX_POINTS = 10;

// Variables

let wordGoal = "";
let wordGuess = "";
let points = 0;
let curentRound = 0;

// Functions

function catchClick() {
    console.log("Catch clicked!");
}

function startClick() {
    console.log("Start clicked!");

    // start the game
    startGame();
}

function stopClick() {
    console.log("Stop clicked!");
}


function getRandomWord() {
    return wordList[Math.floor(Math.random() * wordList.length)];
}

function getGoalWord() {
    wordGoal = getRandomWord();
    return wordGoal;
}

function tick() {
    // sends a tick every half second
    // which prompts a different random word to be displayed

    setInterval(displayRandomWord, 500);
}

function displayRandomWord() {
    var word = getRandomWord();
    document.getElementById("current_word").innerHTML = word;
} 

function displayGoalWord() {
    document.getElementById("goal_word").innerHTML = wordGoal;
}

function addPoints() {
    points++;
}

function removePoints() {
    points--;
}

function compareWords() {
    return wordGuess === wordGoal;
}

function isEndCondition() {
    return checkPoints() || checkRounds();
}

function checkPoints() {
    return points === MAX_POINTS;
}

function checkRounds() {
    return curentRound === MAX_ROUNDS;
}

function getPoints() {
    return points;
}

function getRound() {
    return curentRound;
}

function stopGame() {

}

function resetGame() {
    console.log("Game reset");
    wordGoal = "";
    wordGuess = "";
    points = 0;
    curentRound = 0;
}

function startGame() {

    console.log("Game started");

    // reset the game
    resetGame();

    // get the goal word

    getGoalWord();
    displayGoalWord();

}
