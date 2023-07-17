const boardCells = document.querySelectorAll("#board div");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");

let mark = "X";
let isWon = false;
let isDraw = false;

const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

function getRowIndex(cellIndex) {
  switch (true) {
    case cellIndex <= 2:
      return 0;
    case cellIndex > 2 && cellIndex <= 5:
      return 1;
    case cellIndex > 5 && cellIndex <= 8:
      return 2;
    default:
      return 0;
  }
}

function handleDraw() {
  isDraw = true;
  showModal("Draw!");
}

function handleWin() {
  isWon = true;
  showModal("You won!");
}

function showModal(msg) {
  modal.querySelector("#msg").innerText = msg;
  modal.classList.add("show");
  overlay.classList.add("show");

  modal.addEventListener("click", (event) => {
    if (event.target.id === "playAgainBtn") {
      return location.reload();
    }

    if (event.target.id === "cancelBtn") {
      modal.classList.remove("show");
      overlay.classList.remove("show");
    }

    console.log(event.target);
  });
}

function checkForWinner() {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (
        (board[row][col] !== "" &&
          board[row][col] === board[row][col + 1] &&
          board[row][col + 1] === board[row][col + 2]) ||
        (board[0][col] !== "" &&
          board[0][col] === board[1][col] &&
          board[1][col] === board[2][col]) ||
        (board[0][0] !== "" &&
          board[0][0] === board[1][1] &&
          board[1][1] === board[2][2]) ||
        (board[0][2] !== "" &&
          board[0][2] === board[1][1] &&
          board[1][1] === board[2][0])
      ) {
        isWon = true;
        showModal("You won!");
        removeListeners();
      }

      // if (row === 2 && col === 2 && !isWon) {
      //   handleDraw();
      // }
    }
  }
}

function removeListeners() {
  boardCells.forEach((cell) =>
    cell.removeEventListener("click", handleCellClick)
  );
}

function handleCellClick(cell, cellIndex) {
  if (!isWon) {
    const rowIndex = getRowIndex(cellIndex);
    if (cell.innerText == "") {
      cell.innerText = mark;
      board[rowIndex][cellIndex % 3] = mark;
      checkForWinner();
      mark = mark === "X" ? "O" : "X";
    }
  }
}

// function handleMouseOver(cell) {
//   if (cell.innerText !== "") return;
//   cell.innerText = mark;
// }

// function handleMouseOut(cell) {
//   cell.innerText = "";
// }

boardCells.forEach((cell, cellIndex) => {
  cell.addEventListener("click", () => handleCellClick(cell, cellIndex));
  // cell.addEventListener("mouseover", () => handleMouseOver(cell));
  // cell.addEventListener("mouseout", () => handleMouseOut(cell));
});
