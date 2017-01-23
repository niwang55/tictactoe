var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var turn = 1;
var winner;

var matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

var gameOver = function() {
  // rows
  for (let i = 0; i < matrix.length; i++) {
    let str = '';
    for (let j = 0; j < matrix[i].length; j++) {
      str += matrix[i][j];
      if (str === 'OOO') {
        winner = 'O';
        return true;
      } else if (str === 'XXX') {
        winner = 'X';
        return true;
      }
    }
  }

  // columns
  for (let i = 0; i < matrix.length; i++) {
    let str = '';
    for (let j = 0; j < matrix[i].length; j++) {
      str += matrix[j][i];
      if (str === 'OOO') {
        winner = 'O';
        return true;
      } else if (str === 'XXX') {
        winner = 'X';
        return true;
      }
    }
  }

  return false;
};

var display = function() {
  matrix.forEach( row => console.log(row) );
};

var update = function(player, position) {
  if (player === 1) {
    for (var i = 0; i < matrix.length; i++) {
      for (var j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === position) {
          matrix[i][j] = 'O';
        }
      }
    }
  } else {
    for (var i = 0; i < matrix.length; i++) {
      for (var j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === position) {
          matrix[i][j] = 'X';
        }
      }
    }
  }

  if (!gameOver()) {
    prompt();
  } else {
    console.log('winner is: ', winner);
    rl.close();
  }
  display();
};

var prompt = function() {
  rl.question('Player ' + turn + '\'s turn, Enter a position\n', (position) => {
    update(turn, parseInt(position));
  });

  if (turn === 1) {
    turn = 2;
  } else {
    turn = 1;
  }
};

display();


prompt();