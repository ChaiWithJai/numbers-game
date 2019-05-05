function generateWinningNumber() {
    return Math.ceil(Math.random() * 100);
}

function shuffle(array) {
    var m = array.length, t, i; 
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
}

class Game {
    constructor(playersGuess, pastGuesses, winningNumber) {
        this.playersGuess = null;
        this.pastGuesses = [];
        this.winningNumber = generateWinningNumber()
    }
    difference() {
        return Math.abs(this.winningNumber - this.playersGuess);
    }
    isLower() {
        return this.winningNumber > this.playersGuess;
    }
    playersGuessSubmission(num) {
        if (num > 100 || num < 1 || isNaN(num)) {
            throw 'That is an invalid guess.';
        }
        this.playersGuess = num;
        return this.checkGuess();
    }
    checkGuess() {
        if (this.playersGuess === this.winningNumber) {
            return 'You Win!';
        }
        if (this.pastGuesses.includes(this.playersGuess)) {
            return 'You have already guessed that number.';
        }
        this.pastGuesses.push(this.playersGuess);
        if (this.pastGuesses.length > 4) {
            return 'You Lose.';
        }
        if (Math.abs(this.playersGuess - this.winningNumber) < 10) {
            return `You're burning up!`;
        }
        if (Math.abs(this.playersGuess - this.winningNumber) < 25) {
            return `You're lukewarm.`;
        }
        if (Math.abs(this.playersGuess - this.winningNumber) < 50) {
            return `You're a bit chilly.`;
        }
        if (Math.abs(this.playersGuess - this.winningNumber) < 100) {
            return `You're ice cold!`;
        }
    }
    provideHint() {
        let hintArray = [];
        hintArray.push(this.winningNumber, generateWinningNumber(), generateWinningNumber());
        shuffle(hintArray);
        return hintArray;
    }
}

function newGame() {
    return new Game();
}

function provideHint() {
    let hintArray = [];
    hintArray.push(winningNumber())
}

function disableToggle(trueOrFalse) {
    if (trueOrFalse === true) {
        $('#InputGuess').prop('disabled', true);
        $('#Submit').prop('disabled', true);
        $('#Hint').prop('disabled', true);
    } else {
        $('#InputGuess').prop('disabled', false);
        $('#Submit').prop('disabled', false);
        $('#Hint').prop('disabled', false);
    }
}

$(document).ready( function() {

var game = new Game();
console.log('Hmmm... What\'s this number for?', game.winningNumber);

$('#Submit').on('click', function() {
    $('#HintMessage').text(game.playersGuessSubmission(parseInt($('#InputGuess').val())));
    $('#InputGuess').val('');    
});

$('#InputGuess').keypress(function() {
    if (event.which === 13) {
    $('#HintMessage').text(game.playersGuessSubmission(parseInt($('#InputGuess').val())));
    $('#InputGuess').val('');
    }
});

$('#Hint').on('click', function() {
    $('#HintMessage').text(game.provideHint());
});

$('#Reset').on('click', function() {
    game = new Game();
    console.log('Hmmm... What\'s this number for?', game.winningNumber);
    disableToggle(false);
    $('#HintMessage').text('Enter a number between 0 and 100.');
    $('#InputGuess').val('');
    $('#Guesses').empty();
});

});