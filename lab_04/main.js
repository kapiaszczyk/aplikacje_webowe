// Const
// const wordList = [  "discount", "roof", "beat", "hostile", "illusion", 
//                     "closed", "heavy", "book", "screw", "diver",
//                     "coin", "navy", "silk", "cow", "evolution"];

const wordList = [  "discount", "roof"];
const MAX_POINTS = 5;
const WORD_INTERVAL = 1000;

// Variables
let wordGoal = "";
let wordGuess = "";
let points = 0;
let stopClickedFlag = false;

// Intervals
let randomWordInterval;
let pointsInterval;
let gameOverInterval;

// Click handlers

function startGame() {

    // reset the game
    resetGame();

    console.log("Game started");

    // get the goal word
    displayGoalWord();

    // display score
    displayPoints();

    setRandomWordInterval();
    setGameOverInterval();
}   

function catchWord() {

    if (shouldGameStop()) {
        console.log("Game stopped, can't catch words!");
        return;
    }

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

function stopGame() {
    console.log("Stop clicked!");

    // reset the intervals
    clearInterval(randomWordInterval);
    clearInterval(pointsInterval);
    clearInterval(gameOverInterval);

    document.getElementById("end-game").innerHTML = "Game stopped!";
    stopClickedFlag = true;
}

// Game logic functions

function resetGame() {
    console.log("Game reset");
    wordGoal = "";
    wordGuess = "";
    points = 0;
    stopClickedFlag = false;

    console.log("Resetting words");
    displayGoalWord();
    displayRandomWord();
    displayPoints();
    document.getElementById("end-game").innerHTML = "";
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
    displayPoints();
}

function removePoints() {
    console.log("Points removed");
    points--;
    displayPoints();
}

function compareWords() {
    console.log("Comparing words");
    return wordGuess === wordGoal;
}

function shouldGameStop() {
    return (points >= MAX_POINTS) || stopClickedFlag;
}

function getPoints() {
    return points;
}

function setRandomWordInterval() {
    randomWordInterval = setInterval(function() {
        if (!shouldStopInterval()) {
        console.log("Random word tick: ");
        displayRandomWord();
        }
    }, WORD_INTERVAL);
}

function setGameOverInterval() {
    gameOverInterval = setInterval(function() {
        if (shouldGameStop()) {
            console.log("Clearing interval_end");
            clearInterval(randomWordInterval);
            clearInterval(gameOverInterval);
            console.log("Game over");            
            document.getElementById("end-game").innerHTML = "Game over!";
        }
    }, 100);
}