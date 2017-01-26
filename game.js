var prompt = require('prompt');
prompt.start();
var move;
var board = [['', '', ''], ['', '', ''], ['', '', '']];
var player1 = true;
var resObj = {
  row1: [],
  row2: [],
  row3: [],
  col1: [],
  col2: [],
  col3: [],
  dia1: [],
  dia2: []
}
// var moveCount = 0;
function makeMove() {
  // Whose turn?
  player1 ? console.log("Player 1's move") : console.log("Player 2's move");
  console.log('Enter the location of your next move in this format: ROW#, COL#');
  // Show the current board
  console.log(board[0]);
  console.log(board[1]);
  console.log(board[2]);

  prompt.get(['move'], function(err, result) {
    // Move was made
    console.log('move received');
    move = result.move.split(',');
    player1 ? board[move[0]][move[1]] = 'X' : board[move[0]][move[1]] = 'O';
    // After turn
    player1 = !player1;
    continueGame();
  });
}
var gameOver = false;
makeMove();
function continueGame(result) {
  isOver();
  if (!gameOver) {
    console.log('current results:,' resObj);
    makeMove();
  } else {
    console.log('Game is over!', result, 'wins!');
  }
}
function isOver() {
  for (var i = 0; i < board.length; i++) {
    var currentRow = board[i];

    for (var j = 0; j < board[i].length; j++) {
      var currentCol = board[i][j];

      if (i === 0) {
        resObj[row1].push(currentCol)
      } else if (i === 1) {
        resObj[row3].push(currentCol)
      } else {
        resObj[row3].push(currentCol)
      }
    }
  }
  return false;
}
