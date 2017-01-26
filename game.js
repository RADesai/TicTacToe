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
function continueGame() {
  result = isOver();
  if (!gameOver) {
    console.log('current results:', resObj);
    makeMove();
  } else {
    console.log('Game is over!', result, 'wins!');
    console.log(board[0]);
    console.log(board[1]);
    console.log(board[2]);
  }
}
function isOver() {
  for (var i = 0; i < board.length; i++) {
    var currentRow = board[i];

    for (var j = 0; j < board[i].length; j++) {
      var currentCol = board[i][j];

      if (i === 0) {
        resObj.row1[0] = currentCol;
        resObj.dia1[0] = currentCol;
        if (j === 0) {
          resObj.col1[0] = currentCol;
        } else if (j === 1) {
          resObj.col2[1] = currentCol;
        } else if (j === 2) {
          resObj.col3[2] = currentCol;
          resObj.dia2[0] = currentCol;
        }
      } else if (i === 1) {
        resObj.row2[1] = currentCol;
        if (j === 0) {
          resObj.col1[0] = currentCol;
        } else if (j === 1) {
          resObj.col2[1] = currentCol;
          resObj.dia1[1] = currentCol;
          resObj.dia2[1] = currentCol;
        } else if (j === 2) {
          resObj.col3[2] = currentCol;
        }
      } else if (i === 2) {
        resObj.row3[2] = currentCol;
        if (j === 0) {
          resObj.col1[0] = currentCol;
          resObj.dia2[2] = currentCol;
        } else if (j === 1) {
          resObj.col2[1] = currentCol;
        } else if (j === 2) {
          resObj.col3[2] = currentCol;
          resObj.dia1[2] = currentCol;
        }
      }
    }
  }
  for (var win in resObj) {
    if (resObj[win][0] === 'X' || resObj[win][0] === 'O') {
      if (resObj[win][0] === resObj[win][1] && resObj[win][0] === resObj[win][2]) {
        gameOver = true;
        return resObj[win][0];
      }
    }
  }
  return false;
}
