const WORD_LIST = [  "discount", "roof", "beat", "hostile", "illusion", 
                    "closed", "heavy", "book", "screw", "diver",
                    "coin", "navy", "silk", "cow", "evolution"];

const MAX_POINTS = 5;
const MIN_POINTS = -5;
const WORD_INTERVAL = 1000;

class wordDisplayer {

    displayWord(word, destinationID) {
        document.getElementById(destinationID).innerHTML = word;
    }

    clearDisplayedWord(destinationID) {
        document.getElementById(destinationID).innerHTML = "";
    }
    
}

class wordGenerator {
    
        constructor() {
            this.wordList = WORD_LIST;
        }
    
        getRandomWord() {
            var index = Math.floor(Math.random() * this.wordList.length);
            console.log("Random word: " + this.wordList[index]);
            return this.wordList[index];
        }
    
}

class Game {

    constructor() {

        console.log("Game constructor called")

        // Game variables
        this.initailizeGame();

        // Intervals
        this.randomWordInterval;
        this.gameOverInterval;
    }

    initailizeGame() {
        this.wordGoal = "";
        this.wordGuess = "";
        this.currentWord = "";
        this.points = 0;
        this.stopClickedFlag = false;
        this.wordGenerator = new wordGenerator();
        this.wordDisplayer = new wordDisplayer();
    }

    resetGame() {
        this.initailizeGame();

        console.log("Resetting words");
        this.wordDisplayer.clearDisplayedWord("goal_word");
        this.wordDisplayer.clearDisplayedWord("current_word");
        this.wordDisplayer.clearDisplayedWord("score");
        this.wordDisplayer.clearDisplayedWord("end-game");

        console.log("Resetting intervals");
        this.clearIntervals();
    }

    setWordGoal(word) {
        this.wordGoal = word;
    }

    getWordGoal() {
        return this.wordGoal;
    }

    setCurrentWord(word) {
        this.currentWord = word;
    }

    getCurrentWord() {
        return this.currentWord;
    }

    clearIntervals() {
        clearInterval(this.randomWordInterval);
        clearInterval(this.gameOverInterval);
    }

    startGame() {

        console.log("Game started");
    
        // get the goal word
        console.log("Getting goal word");
        this.setWordGoal(this.wordGenerator.getRandomWord());
        this.wordDisplayer.displayWord(this.getWordGoal(), "goal_word");
    
        // display score
        console.log("Displaying score");
        this.wordDisplayer.displayWord(this.points, "score");

        this.setRandomWordInterval();
        this.setGameOverInterval();
    }   

    
    stopGame() {

        console.log("Stopping game");

        console.log("Clearing intervals");
        this.clearIntervals();

        if (this.stopClickedFlag && !this.shouldGameStop()) {
            this.wordDisplayer.displayWord("Game stopped!", "end-game");
        } else {
            if (this.points >= MAX_POINTS) {
                this.wordDisplayer.displayWord("Game won!", "end-game");
            }
            else if (this.points <= MIN_POINTS) {
                this.wordDisplayer.displayWord("Game lost!", "end-game");
            
            }
        }
        
    }

    catchWord() {
    
        if (this.shouldGameStop()) {
            console.log("Game stopped, can't catch words!");
            return;
        }
    
        if (this.compareWords()) {
            console.log("Words match!");
            this.addPoints();
        } else {
            console.log("Words don't match!");
            this.removePoints();
        }
    }
    
    addPoints() {
        console.log("Points added");
        this.points++;
        this.wordDisplayer.displayWord(this.points, "score");
    }
    
    removePoints() {
        console.log("Points removed");
        this.points--;
        this.wordDisplayer.displayWord(this.points, "score");
    }
    
    compareWords() {
        console.log("Comparing words: " + this.getCurrentWord() + " and " + this.getWordGoal() );
        return (this.getCurrentWord().localeCompare(this.getWordGoal()) === 0);
    }
    
    shouldGameStop() {
        return (this.points >= MAX_POINTS) || (this.points <= MIN_POINTS) || this.stopClickedFlag;
    }

    setRandomWordInterval() {
        console.log("Setting random word interval");
    
        this.randomWordInterval = setInterval(() => {
    
            console.log("Inside random word interval");
    
            if (!this.shouldGameStop()) {
                console.log("shouldGameStop evaluated to false, displaying random word ");
                this.setCurrentWord(this.wordGenerator.getRandomWord());
                this.wordDisplayer.displayWord(this.getCurrentWord(), "current_word");
            } else {
                this.stopGame();
            }
            
        }, WORD_INTERVAL);
    }

    setGameOverInterval() {
        this.gameOverInterval = setInterval(function() {
            if (this.shouldGameStop()) {
                console.log("Game over");
                this.stopGame();
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