//Array of possible word choices
var words = [
    "eraser",
    "window",
    "hungry",
    "lunch",
    "apple",
    "toilet",
    "television",
    "sassafras",
    "soup",
    "barracuda",
    "computer",
    "destiny",
    "clothespin",
    "hamper",
    "gumshoe",
    "knight",
    "bologna",
    "horsefeathers",
    "pneumatic",
    "fluoride"
];

//Array of acceptable letters for input
var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

//Establishing empty arrays for:
//Array of letters contained in the random word
var wordArray = [];
//Array of dashes, replaced with letters, displayed 
var wordLetterArray = [];
//Array of letters guessed by user
var guessedLetters = [];
//Array of letters that were correct guesses
var rightLetters = [];
//I don't know if I even use this.
var emptyArray = [];
//gameState is either 'not started', 'playing', 'win', or 'lose'
var gameState = "not started";
//var for storing user input
var input;
//This is for "play again?" after win/lose. True= user plays again, false= nothing happens
var again = false;
//stores the chosen word
var word;
//var for storing length of word
var wordLength;

//gives a random integer between 0 and x
var randomNum = function (x) {
    return (Math.floor(Math.random() * x));
}
//picks a random word from the 'words' array and removes it from the list.
var pickWord = function () {
    var num = randomNum(words.length);
    word = words[num];
    words.splice(num, 1);
    return word;
}
//makes an array of all the letters in the selected word, in order.
function makeWordArray(y) {
    wordLength = y.length;
    for (var i = 0; i < wordLength; i++) {
        wordArray.push("_ ");
        wordLetterArray.push(y[i]);
        document.querySelector("#blanks").innerHTML = wordArray.join(" ");
    }
}
//Checks if input is a letter, and if it's included in the selected word
var checkLetter = function (letter) {
    letter = letter.toLowerCase();
    //checks against array of acceptable input
    if (letters.includes(letter)) {
        //is the letter part of the word? if so, it replaces the dash in the display, && the letter(s) in the selected word with 'null'
        if (wordLetterArray.includes(letter)) {
            for (var i = 0; i < wordLetterArray.length; i++) {
                if (wordLetterArray.indexOf(letter) == i) {
                    wordLetterArray.splice(i, 1, "null");
                    wordArray.splice(i, 1, letter);
                    document.querySelector('#blanks').innerHTML = wordArray.join(" ");
                }
            }
            //adds the correct guess to the rightLetters array
            rightLetters.push(letter);
            return;
        } else if (guessedLetters.includes(letter)) {
            alert("You've already tried that one.");
            return;
        } else if (rightLetters.includes(letter)) {
            alert("You've clearly already guessed that one.")
            return;
        } else if (!wordLetterArray.includes(letter) && !guessedLetters.includes(letter)) {
            guessedLetters.push(letter);
            document.querySelector('#franklin').innerHTML = guessedLetters.join(", ");
            alert("Nope!");
            return;
        }
    //if it ain't a letter....
    } else {
        alert("Only letters, pal. Try again.")
    }
}
//function, called back, to see if 'x' is 'null'
var isNull = function (x) {
    return x === 'null';
}
//Conditions for win/lose
var checkWin = function () {
    //more than 6 guesses and you lose
    if (guessedLetters.length > 6) {
        document.querySelector('#gameMessage').innerHTML = "You lost. The word was &quot;" + word + ".&quot;";
        gameState = "lose";
    //but if every letter from the selected word has been replaced with 'null', you win.
    } else if (wordLetterArray.every(isNull)) {
        document.querySelector('#gameMessage').innerHTML = "You win!";
        gameState = "win";
    } else {
        gameState = "playing";
    }

}
//I don't think these need to be here, as they're called in start() when the game starts. delete?
// word = pickWord();
// makeWordArray(word);

function playagain() {
    if (gameState == "lose") {
        again = confirm('So you lost. Give it another go?');
    } else if (gameState == "win") {
        again = confirm("You won! Play again?");
    } 
    if(again == true){
        if (words.length == 0){
            alert("Congratulations. You've made it through every word in the English language, give or take a few. Reload the page to guess the same words again.")
        }
        start();
    }
    else {
        return;
    }
}

//--------Start Game Functions
window.onload = function () {
    detectStart();
}

detectStart = function () {
    document.onkeyup = function () {
        if (gameState == 'not started') {
            input = event.keyCode;
            if (input > 0) {
                start();
            }
        } else {
            return;
        }
    }
}

function start() {
    document.querySelector('#gameMessage').innerHTML = "Choose any letter.";
    guessedLetters = [];
    // document.querySelector('#franklin').innerHTML = guessedLetters;
    wordArray = [];
    wordLetterArray = [];
    rightLetters = [];
    word = pickWord();
    makeWordArray(word);
    gameState = 'playing';
    playGame();
}


function playGame() {
    document.querySelector('#blanks').innerHTML = wordArray.join(" ");
    document.querySelector('#franklin').innerHTML = guessedLetters;
    document.onkeyup = function () {
        input = event.key;
        if (gameState == "playing") {
            checkLetter(input);
            checkWin();

            console.log(
                'wordarray ' + wordArray +
                'wordletterarray ' + wordLetterArray +
                'guessedletters ' + guessedLetters +
                ' word length: ' + wordLength +
                'rightletters ' + rightLetters +
                'emptyarray' + emptyArray +
                'gameState' + gameState +
                'input ' + input +
                'again ' + again +
                'word' + word);

            document.onkeydown = function () {
                console.log(
                    ' wordarray ' + wordArray +
                    ' wordletterarray ' + wordLetterArray +
                    ' guessedletters ' + guessedLetters +
                    ' word length: ' + wordLength +
                    ' rightletters ' + rightLetters +
                    ' emptyarray' + emptyArray +
                    ' gameState' + gameState +
                    ' input ' + input +
                    ' again ' + again +
                    ' word' + word);
            }
        } else if (gameState == "win") {
            playagain();
        } else if (gameState == "lose") {
            playagain();
        }
    }
}