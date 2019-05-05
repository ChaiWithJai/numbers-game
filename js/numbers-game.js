document.getElementById('');

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
        this.reset();
    }
    reset() {
        this.playersGuess = null;
        this.pastGuesses = ['-', '-', '-', '-', '-'];
        this.winningNumber = generateWinningNumber();
        this.numberOfGuesses = 0;
        document.querySelector('#guess-feedback > h4').innerHTML = '';
        this.render();
        document.querySelector('input').readOnly = false;
    }
    render(){
        document.querySelectorAll('li').forEach((li, i) => {
            li.innerHTML = this.pastGuesses[i];
        })
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
        
        let result = this.checkGuess();
        
        document.querySelector('#guess-feedback > h4').innerHTML = result;
        this.render();
        if (result === 'You Win!' || result === 'You Lose.') {
            document.querySelector('input').readOnly = true;
            setTimeout(() => {this.reset()}, 5000);
        }
    }
    checkGuess() {
        if (this.playersGuess === this.winningNumber) {
            return 'You Win!';
        }
        else if (this.pastGuesses.includes(this.playersGuess)) {
            return 'You have already guessed that number.';
        }
        this.pastGuesses[this.numberOfGuesses] = this.playersGuess;
        this.numberOfGuesses++;
        if (typeof this.pastGuesses[4] === 'number') {
            return 'You Lose.';
        }
        else if (Math.abs(this.playersGuess - this.winningNumber) < 10) {
            return `You're burning up!`;
        }
        else if (Math.abs(this.playersGuess - this.winningNumber) < 25) {
            return `You're lukewarm.`;
        }
        else if (Math.abs(this.playersGuess - this.winningNumber) < 50) {
            return `You're a bit chilly.`;
        }
        else if (Math.abs(this.playersGuess - this.winningNumber) < 100) {
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

function playGame() {
    const game = newGame();   
    const button = document.querySelector('#submit');
    const hintButton = document.querySelector('#hint')

    hintButton.addEventListener('click', function() {
        document.querySelector('h4').innerHTML = game.provideHint().join(' ');
    })
    button.addEventListener('click', function() {
      const playersGuess = +document.querySelector('input').value;
      document.querySelector('input').value = '';
      game.playersGuessSubmission(playersGuess);
      console.log(game.pastGuesses);
    });
}

playGame();