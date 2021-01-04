/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const header = document.querySelector("h1")

const width = 7;
const height = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])
// let board2 = [
//   [undefined, undefined, undefined, undefined, undefined, undefined],
//   [undefined, undefined, undefined, undefined, undefined, undefined],
//   [undefined, undefined, undefined, undefined, undefined, undefined],
//   [undefined, undefined, undefined, undefined, undefined, undefined],
//   [undefined, undefined, undefined, undefined, undefined, undefined],
//   [undefined, undefined, undefined, undefined, undefined, undefined],
//   [undefined, undefined, undefined, undefined, undefined, undefined]
// ]

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  //something isn't right, so I am using a hardcoded board until 
  //I can figure this out
  const newBoard = new Array(width)
  for (let i = 0; i < array.length; i++) {
    newBoard[i] = new Array(height);
  }
  // return array.fill([undefined, undefined, undefined, undefined,
  //   //   undefined, undefined])
  // }

  board = makeBoard()

  /** makeHtmlBoard: make HTML table and row of column tops. */

  // function makeHtmlBoard() {
  //   // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"

  //   // TODO: add comment for this code
  //   var top = document.createElement("tr");
  //   top.setAttribute("id", "column-top");
  //   top.addEventListener("click", handleClick);

  //   for (var x = 0; x < WIDTH; x++) {
  //     var headCell = document.createElement("td");
  //     headCell.setAttribute("id", x);
  //     top.append(headCell);
  //   }
  //   htmlBoard.append(top);

  function makeHtmlBoard() {
    const htmlBoard = document.querySelector('#board')
    // TODO: add comment for this code
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

    // TODO: add comment for this code
    for (let y = 0; y < height; y++) {
      const row = document.createElement("tr");
      for (let x = 0; x < width; x++) {
        const cell = document.createElement("td");
        cell.setAttribute("id", `${x}-${y}`);
        cell.classList.add("empty")
        row.append(cell);
        console.log("it works again!")
      }
      htmlBoard.append(row);
    }
  }
  /** findSpotForCol: given column x, return top empty y (null if filled) */

  function findSpotForCol(x) {
    //how to look in an array within an array
    let y = board[x].lastIndexOf(undefined)
    if (currPlayer === 1) {
      board[x][y] = 1
    } else if (currPlayer === 2) {
      board[x][y] = 2
    }
    return y;
  }

  /** placeInTable: update DOM to place piece into HTML table of board */

  function placeInTable(y, x) {
    // TODO: make a div and insert into correct table cell
    let newPiece = document.createElement("div")
    //this should change, whichDiv should go according to the x and y
    //coordinates from findspotforcol 
    //and then be matched here
    let whichDiv = document.getElementById(`${x}-${y}`)

    //add divs here and switch player
    if (currPlayer === 1) {
      newPiece.classList.add("piecep1")
      whichDiv.appendChild(newPiece)
      // currPlayer = 2

    } else if (currPlayer === 2) {
      newPiece.classList.add("piecep2")
      whichDiv.appendChild(newPiece)
      // currPlayer = 1
    }
  }

  /** endGame: announce game end */
  //it should announce the current player

  function endGame(player) {
    alert(`Winner is Player ${player}`)
  }

  /** handleClick: handle click of column top to play piece */

  function handleClick(evt) {
    // get x from ID of clicked cell
    let x = +evt.target.id;
    console.log(x)
    // get next spot in column (if none, ignore click)
    let y = findSpotForCol(x);
    //might need to expand this more?
    if (y === null) {
      return;
    }

    // place piece in board and add to HTML table
    // TODO: add line to update in-memory board
    placeInTable(y, x);

    // checkForWin();

    console.log(checkForWin())

    // check for win
    if (checkForWin()) {
      endGame(currPlayer);
    }

    if (currPlayer === 1) {
      currPlayer = 2
    } else {
      currPlayer = 1
    }

    //switch players here with an if statement

    // check for tie
    // TODO: check if all cells in board are filled; if so call, call endGame

    // switch players
    // TODO: switch currPlayer 1 <-> 2
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
          board2[x][y] === currPlayer
      );
    }

    // TODO: read and understand this code. Add comments to help you.

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
