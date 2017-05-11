var villains = ["joker", "clayface", "bane", "scarecrow", "catwoman"];
var currentWord = "";
var lettersInCurrentWord = [];
var blankSpaces = 0;
var gameBoard = [];
var incorrectGuesses = [];
var wins = 0;
var losses = 0;
var lives = 10;

window.onload = function() {
    function startGame() {
        lives = 10;
        currentWord = villains[Math.floor(Math.random() * villains.length)];
        lettersInCurrentWord = currentWord.split("");
        blankSpaces = lettersInCurrentWord.length;
        gameBoard = [];
        incorrectGuesses = [];
        for (var i = 0; i < blankSpaces; i++) {
            gameBoard.push("_");

            document.getElementById("lives").innerHTML = lives;
            document.getElementById("gameBoard").innerHTML = gameBoard.join(" ");
            document.getElementById('incorrectGuesses').innerHTML = incorrectGuesses.join(" ");
        }
    }

    function checkLetters(letter) {
        var letterInWord = false;
        for (var i = 0; i < blankSpaces; i++) {
            if (currentWord[i] == letter) {
                letterInWord = true;  
            }
        }
        if (letterInWord) {
            for (var i = 0; i < blankSpaces; i++) {
                if (currentWord[i] == letter) {
                    gameBoard[i] = letter;
                }
            }
        } else {
            incorrectGuesses.push(letter);
            lives--;
        }
    }

    function roundComplete() {
        document.getElementById("lives").innerHTML = lives;
        document.getElementById("gameBoard").innerHTML = gameBoard.join(" ");
        document.getElementById("incorrectGuesses").innerHTML = incorrectGuesses.join(" ");

        if (lettersInCurrentWord.toString() == gameBoard.toString()) {
            wins++;
            alert("You win!");
            document.getElementById("wins").innerHTML = wins;
            startGame();
        } else if (lives == 0) {
            alert("Loser! The correct villain was " + currentWord);
            losses++;
            document.getElementById("losses").innerHTML = losses;
            startGame();
        }
    }
    startGame();
    document.onkeyup = function(event) {
        letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();

        checkLetters(letterGuessed);
        roundComplete();
    }
}
