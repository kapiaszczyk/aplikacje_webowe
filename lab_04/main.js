// Const
// const wordList = [  "discount", "roof", "beat", "hostile", "illusion", 
//                     "closed", "heavy", "book", "screw", "diver",
//                     "coin", "navy", "silk", "cow", "evolution"];
const wordList = [  "discount", "roof", "beat"];

const MAX_POINTS = 3;
const MIN_POINTS = -5;
const WORD_INTERVAL = 1000;

class wordGenerator {
    
        constructor() {
            this.wordList = [  "discount", "roof", "beat", "hostile", "illusion", 
                                "closed", "heavy", "book", "screw", "diver",
                                "coin", "navy", "silk", "cow", "evolution"];
        }
    
        getRandomWord() {
            var index = Math.floor(Math.random() * this.wordList.length);
            console.log("Random word: " + this.wordList[index]);
            return this.wordList[index];
        }
    
    
}

class Game {

    // Constructor
    constructor() {

        console.log("Game constructor called")

        // Game variables
        this.wordGoal = "";
        this.wordGuess = "";
        this.currentWord = "";
        this.points = 0;
        this.stopClickedFlag = false;
        this.wordGenerator = new wordGenerator();

        // Intervals
        this.randomWordInterval;
        this.pointsInterval;
        this.gameOverInterval;
    }

    // Reset the game
    resetGame() {
        console.log("Game reset");
        this.wordGoal = "";
        this.wordGuess = "";
        this.currentWord = "";
        this.points = 0;
        this.stopClickedFlag = false;
        this.wordGenerator = new wordGenerator();

        console.log("Resetting words");
        this.displayGoalWord("");
        this.displayRandomWord("");
        this.displayPoints();
        document.getElementById("end-game").innerHTML = "";

        console.log("Resetting intervals");
        clearInterval(this.randomWordInterval);
        clearInterval(this.pointsInterval);
        clearInterval(this.gameOverInterval);
    }

    startGame() {

        console.log("Game started");
    
        // get the goal word
        console.log("Getting goal word");
        this.displayGoalWord(this.wordGenerator.getRandomWord());
    
        // display score
        console.log("Displaying score");
        this.displayPoints();
    
        this.setRandomWordInterval();
        this.setGameOverInterval();
    }   

    
    stopGame() {

        console.log("Stopping game");

        // reset the intervals
        console.log("Clearing intervals");
        clearInterval(this.randomWordInterval);
        clearInterval(this.pointsInterval);
        clearInterval(this.gameOverInterval);

        // if flag set to stop, display game stopped
        // else display game over or game won

        if (this.stopClickedFlag) {
            document.getElementById("end-game").innerHTML = "Game stopped!";
        } else {
            if (this.points >= MAX_POINTS) {
                document.getElementById("end-game").innerHTML = "Game won!";
            }
            else if (this.points <= MIN_POINTS) {
                document.getElementById("end-game").innerHTML = "Game lost!";
            
            }
        }
        
    }

    catchWord() {
    
        if (this.shouldGameStop()) {
            console.log("Game stopped, can't catch words!");
            return;
        }
    
        // and compare them
        if (this.compareWords()) {
            console.log("Words match!");
            this.addPoints();
        } else {
            console.log("Words don't match!");
            this.removePoints();
        }
    }

    displayRandomWord(word) {
        console.log("Displaying current guess word");
        this.currentWord = word;
        document.getElementById("current_word").innerHTML = this.currentWord;
    } 
    
    displayGoalWord(word) {
        this.wordGoal = word;
        document.getElementById("goal_word").innerHTML = this.wordGoal;
        console.log("Displaying goal word: " + this.wordGoal);
    }
    
    displayPoints() {
        document.getElementById("score").innerHTML = this.points;
    }
    
    addPoints() {
        console.log("Points added");
        this.points++;
        this.displayPoints();
    }
    
    removePoints() {
        console.log("Points removed");
        this.points--;
        this.displayPoints();
    }
    
    compareWords() {
        console.log("Comparing words");
        return (this.currentWord.localeCompare(this.wordGoal) === 0);
    }
    
    shouldGameStop() {
        return (this.points >= MAX_POINTS) || (this.points <= MIN_POINTS) || this.stopClickedFlag;
    }

    setRandomWordInterval() {
        console.log("Setting random word interval");
    
        this.randomWordInterval = setInterval(() => { // Change to arrow function
    
            console.log("Inside random word interval");
    
            if (!this.shouldGameStop()) {
                console.log("shouldGameStop evaluated to false, displaying random word ");
                this.displayRandomWord(this.wordGenerator.getRandomWord());
            } else {
                this.stopGame();
            }
            
        }, WORD_INTERVAL);
    }
    
    
    
    
     
    
    
    setGameOverInterval() {
        this.gameOverInterval = setInterval(function() {
            if (this.shouldGameStop()) {
                console.log("Game over");
                clearInterval(this.randomWordInterval);            
                document.getElementById("end-game").innerHTML = "Game over!";
            }
        }, 100);
    }

}

let game;

function startGameHandler() {
    console.log("Creating a new game");
    game = new Game();
    game.startGame();
}

function catchWordHandler() {
    console.log("Catch clicked!");
    game.catchWord();
}

function stopGameHandler() {
    console.log("Stop clicked!");
    game.stopClickedFlag = true;
    game.stopGame();
}

function resetGameHandler() {
    console.log("Reset clicked!");
    game.resetGame();
}