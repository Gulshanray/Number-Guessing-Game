let randomnumber = parseInt(Math.random() * 100 + 1);

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guesses = document.querySelector('.guesses');
const lastresult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');
const guessSolt = document.querySelector('.guesses');
const remaining = document.querySelector('.remaining');

const p = document.createElement('p');
let prevGuess = [];
let numGuess = 1;
let playGame = true;

if (playGame) {
    submit.addEventListener('click', function (e) {
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    });
}

function validateGuess(guess) {
    if (isNaN(guess)) {
        alert('Please enter a valid number');
    } else if (guess < 1) {
        alert('Please enter a number more than 1');
    } else if (guess > 100) {
        alert('Please enter a number less than 100');
    } else {
        prevGuess.push(guess);
        if (numGuess === 11) {
            displayGuess(guess);
            displayMessage(`Game Over. Random number was ${randomnumber}`);
            endGame();
        } else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if (guess === randomnumber) {
        displayMessage(`Correct! You got it in ${numGuess} guesses!`);
        endGame();
    } else if (guess < randomnumber) {
        displayMessage(`Number is Too Low!`);
    } else if (guess > randomnumber) {
        displayMessage(`Number is too high!`);
    }
}

function displayGuess(guess) {
    userInput.value = '';
    guesses.innerHTML += `${guess}  ,  `;
    numGuess++;
    remaining.innerHTML = `${11 - numGuess}`;
}

function displayMessage(message) {
    lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
    userInput.value = '';
    userInput.setAttribute("disabled", "");
    p.classList.add('button');
    p.innerHTML = `<h1 id="newGame">Start New Game</h1>`;
    startOver.appendChild(p);
    playGame = false;
    newGame();
}

function newGame() {
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', function (e) {
        randomnumber = parseInt(Math.random() * 100 + 1);
        prevGuess = [];
        numGuess = 1;
        guessSolt.innerHTML = '';
        remaining.innerHTML = '10';
        userInput.removeAttribute("disabled");
        startOver.removeChild(p);
        playGame = true;
        newGameButton.removeEventListener('click', arguments.callee);
    });
}
