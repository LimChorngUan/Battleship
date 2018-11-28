// Get the container of the game board
var board = document.getElementById("board");

// set number of turns and ships
// get the number of turns-left and ships-left
var turns = 10;
var numShips = 7;
var turnsLeft = document.getElementById("turns-left");
var shipsLeft = document.getElementById("ships-left");

// Place the ships
// 0 = empty, 1 = part of a ship, 2 = a sunken part of a ship, 3 = a missed shot
var ships = [
  [0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0],
  [1, 0, 0, 0, 0],
  [0, 1, 0, 0, 0],
  [0, 0, 0, 0, 1]
];

// make the grid
function makeBoard() {
  for (var row = 0; row < 5; row++) {
    // create grid-row, and append to board
    var gridRow = document.createElement("div");
    board.appendChild(gridRow);

    for (var col = 0; col < 5; col++) {
      // create grid-col, give it a class and id name, add eventlistener and append to grid-row
      var cell = document.createElement("div");
      cell.id = "p" + row + col;
      cell.className = "grid-col";
      cell.addEventListener("click", fire);
      gridRow.appendChild(cell);
    }
  }
}

// fire function
function fire(e) {
  // get the position of the event target
  var positionX, positionY;
  var target = e.target.id.split("");
  console.log(target);

  positionX = Number(target[1]);
  positionY = Number(target[2]);
  cell = ships[positionX][positionY];
  // check if the target hits the ship
  if (cell === 0) {
    console.log("Missed Shot");
    ships[positionX][positionY] = 3;
    e.target.classList.add("miss-ship");
  } else if (cell === 1) {
    console.log("Boom! You hit a ship!");
    e.target.classList.add("hit-ship");
    ships[positionX][positionY] = 2;
    numShips--;
  } else if (cell === 2) {
    console.log("Stop Wasting Your Missel! The ship has sunken");
  } else if (cell === 3) {
    console.log("Stop Wasting Your Missel! You already fired this location");
  }
  turns--;
  turnsLeft.textContent = turns;
  shipsLeft.textContent = numShips;
  if (turns === 0 || numShips === 0) {
    endGame();
    if (numShips === 0) {
      document.querySelector(".win").style.display = "block";
    } else if (turns === 0) {
      document.querySelector(".lose").style.display = "block";
    }
  }
}

// remove fire function: ends game
function endGame() {
  for (var row = 0; row < 5; row++) {
    for (var col = 0; col < 5; col++) {
      document
        .getElementById("p" + row + col)
        .removeEventListener("click", fire);
    }
  }
}

makeBoard();
