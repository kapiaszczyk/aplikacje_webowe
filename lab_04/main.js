const WORD_LIST = [  "discount", "roof", "beat", "hostile", "illusion", 
                    "closed", "heavy", "book", "screw", "diver",
                    "coin", "navy", "silk", "cow", "evolution"];

const MAX_POINTS = 5;
const MIN_POINTS = -5;
const WORD_INTERVAL = 1000;

class WordDisplayer {

    displayWord(word, destinationID) {
        const element = document.getElementById(destinationID);
        if (element) {
            element.textContent = word;
        }
    }

    clearDisplayedWord(destinationID) {
        const element = document.getElementById(destinationID);
        if (element) {
            element.textContent = "";
        }
    }
    
}

class WordGenerator {

    constructor(wordList) {
        this.wordList = wordList;
    }

    getRandomWord() {
        const index = Math.floor(Math.random() * this.wordList.length);
        return this.wordList[index];
    }

}

class Game {

    #worldGoal = "";
    #wordGuess = "";
    #currentWord = "";
    #points = 0;
    #stopClickedFlag = false;

    constructor(wordGenerator, wordDisplayer) {

        this.wordGenerator = wordGenerator;
        this.wordDisplayer = wordDisplayer;

        // Intervals
        this.randomWordInterval;
        this.gameOverInterval;

        this.initailizeGame();
    }

    initailizeGame() {
        this.wordGoal = "";
        this.wordGuess = "";
        this.currentWord = "";
        this.points = 0;
        this.stopClickedFlag = false;
    }

    resetGame() {
        this.initailizeGame();

        this.wordDisplayer.clearDisplayedWord("goal_word");
        this.wordDisplayer.clearDisplayedWord("current_word");
        this.wordDisplayer.clearDisplayedWord("score");
        this.wordDisplayer.clearDisplayedWord("end-game");

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
    
        // get the goal word
        this.setWordGoal(this.wordGenerator.getRandomWord());
        this.wordDisplayer.displayWord(this.getWordGoal(), "goal_word");
    
        // display score
        this.wordDisplayer.displayWord(this.points, "score");

        this.setRandomWordInterval();
        this.setGameOverInterval();
    }   

    
    stopGame() {

        this.stopClickedFlag = true;

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
            return;
        }
    
        if (this.compareWords()) {
            this.addPoints();
        } else {
            this.removePoints();
        }
    }
    
    addPoints() {
        this.points++;
        this.wordDisplayer.displayWord(this.points, "score");
    }
    
    removePoints() {
        this.points--;
        this.wordDisplayer.displayWord(this.points, "score");
    }
    
    compareWords() {
        return (this.getCurrentWord().localeCompare(this.getWordGoal()) === 0);
    }
    
    shouldGameStop() {
        return (this.points >= MAX_POINTS) || (this.points <= MIN_POINTS) || this.stopClickedFlag;
    }

    setRandomWordInterval() {
    
        this.randomWordInterval = setInterval(() => {
        
            if (!this.shouldGameStop()) {
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
                this.stopGame();
            }
        }, 100);
    }

}

const wordGenerator = new WordGenerator(WORD_LIST);
const wordDisplayer = new WordDisplayer();
const game = new Game(wordGenerator, wordDisplayer);

function startGameHandler() {
    game.startGame();
}

function catchWordHandler() {
    game.catchWord();
}

function stopGameHandler() {
    game.stopGame();
}

function resetGameHandler() {
    game.resetGame();
}