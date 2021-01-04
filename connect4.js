/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */


//my only issue is trying to generate a board with a function rather than
//hard coding a board

//I use a lastIndexOf(undefined) method in order to fill the array board, which does not
//seem to work whenever I dynamically generate a board 

//board2 is used in the interim as my hardcoded board until I can work this out.

//I would love to add a reset button to the game, as well as sound effects for 
//when pieces are dropped

const header = document.querySelector("h1")

const width = 7;
const height = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])
let board2 = [

  [undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined]
]


/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

// function makeBoard() {
//   const array = new Array(width)
//   for (let i = 0; i < array.length; i++) {
//     array[i] = new Array(height);
//   } return array.fill([undefined, undefined, undefined, undefined,
//     undefined, undefined])
// }

function makeBoard() {
  const newBoard = new Array(6)
  for (let i = 0; i < newBoard.length; i++) {
    newBoard[i] = new Array(7).fill(undefined);
  }
}

board = makeBoard()

/** makeHtmlBoard: make HTML table and row of column tops. */
function makeHtmlBoard() {
  const htmlBoard = document.querySelector('#board')
  //this creates the top row that you click and "drop" pieces through
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
  htmlBoard.append(top)

  for (let x = 0; x < width; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
    console.log("it works")
  }

  for (let y = 0; y < height; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < width; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${x}-${y}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}
/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  //how to look in an array within an array
  let y = board2[x].lastIndexOf(undefined)
  board2[x][y] = currPlayer
  return y;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  //this function adds pieces to the HTML board
  let newPiece = document.createElement("div")
  let whichDiv = document.getElementById(`${x}-${y}`)
  newPiece.classList.add(`piecep${currPlayer}`)
  whichDiv.appendChild(newPiece)
}

/** endGame: announce game end */
//it should announce the current player

function endGame(currPlayer) {
  alert(`Winner is Player ${currPlayer}`)
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;
  console.log(x)
  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    endGame(currPlayer);
  }

  //switch players here with an if statement

  if (currPlayer === 1) {
    currPlayer = 2
  } else {
    currPlayer = 1
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < width &&
        x >= 0 &&
        x < height &&
        board2[y][x] === currPlayer
    );
  }

  //checking within the array for a win condition

  for (let y = 0; y < width; y++) {
    for (let x = 0; x < height; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
