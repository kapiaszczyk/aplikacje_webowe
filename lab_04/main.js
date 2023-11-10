// Const

const wordList = [  "discount", "roof", "beat", "hostile", "illusion", 
                    "closed", "heavy", "book", "screw", "diver",
                    "coin", "navy", "silk", "cow", "evolution"];

// const MAX_ROUNDS = 5;
const MAX_POINTS = 10;

// Variables

let wordGoal = "";
let wordGuess = "";
let points = 0;
// let round = 0;
let stopClickedFlag = false;

// Click handlers

function catchClicked() {
    console.log("Catch clicked!");

    // get the current word and the goal word
    wordGuess = document.getElementById("current_word").innerHTML;
    wordGoal = document.getElementById("goal_word").innerHTML;

    // and compare them

    if (compareWords()) {
        console.log("Words match!");
        addPoints();
    } else {
        console.log("Words don't match!");
        removePoints();
    }
}

function startClicked() {
    console.log("Start clicked!");

    // start the game
    startGame();

}

function stopClicked() {
    console.log("Stop clicked!");

    // stop the game
    stopGame();

    stopClickedFlag = true;
}

// Game logic functions

function resetGame() {
    console.log("Game reset");
    wordGoal = "";
    wordGuess = "";
    points = 0;
    round = 0;
    stopClickedFlag = false;

    console.log("Resetting words");
    document.getElementById("goal_word").innerHTML = "";
    document.getElementById("current_word").innerHTML = "";
}

function getRandomWord() {
    return wordList[Math.floor(Math.random() * wordList.length)];
}

function displayRandomWord() {
    var word = getRandomWord();
    document.getElementById("current_word").innerHTML = word;
} 

function displayGoalWord() {
    wordGoal= getRandomWord();
    document.getElementById("goal_word").innerHTML = wordGoal;
}

function displayPoints() {
    document.getElementById("score").innerHTML = getPoints();
}

function addPoints() {
    console.log("Points added");
    points++;
}

function removePoints() {
    console.log("Points removed");
    points--;
}

function compareWords() {
    console.log("Comparing words");
    return wordGuess === wordGoal;
}

function isEndCondition() {
    return checkPoints();
}

function checkPoints() {
    return points >= MAX_POINTS;
}

function getPoints() {
    return points;
}


function stopGame() {
    console.log("Game stopped");

    // clear setInterval
    clearInterval(displayRandomWord);
    resetGame();
}

function startGame() {

    console.log("Game started");

    // reset the game
    resetGame();

    // get the goal word
    displayGoalWord();

    // display score
    document.getElementById("score").innerHTML = getPoints();

    // untill the end condition is met
    // display a random word

    let interval = setInterval(function() {
        displayRandomWord();
        displayPoints();
        if (isEndCondition() || stopClickedFlag) {
            clearInterval(interval);
        }
    }, 1000);

    // while (!isEndCondition()) {
    //     randomWordTick();
    // }

    // for (let i = 0; i < MAX_POINTS; i++) {
    //     addPoints();
    // }

}
