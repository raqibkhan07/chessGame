const board = document.getElementById("chessboard");
const pieces = {
  r: "♜", n: "♞", b: "♝", q: "♛", k: "♚", p: "♟",
  R: "♖", N: "♘", B: "♗", Q: "♕", K: "♔", P: "♙"
};

let initialBoard = [
  "rnbqkbnr",
  "pppppppp",
  "        ",
  "        ",
  "        ",
  "        ",
  "PPPPPPPP",
  "RNBQKBNR"
];

let selectedSquare = null;

function createBoard() {
  board.innerHTML = "";
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.className = `square ${(row + col) % 2 === 0 ? "white" : "black"}`;
      square.dataset.row = row;
      square.dataset.col = col;
      const piece = initialBoard[row][col];
      if (piece !== " ") {
        square.textContent = pieces[piece];
      }
      square.addEventListener("click", () => handleMove(row, col));
      board.appendChild(square);
    }
  }
}

function handleMove(row, col) {
  if (selectedSquare) {
    const fromRow = selectedSquare.row;
    const fromCol = selectedSquare.col;
    const piece = initialBoard[fromRow][fromCol];
    initialBoard[fromRow] = replaceChar(initialBoard[fromRow], fromCol, " ");
    initialBoard[row] = replaceChar(initialBoard[row], col, piece);
    selectedSquare = null;
    createBoard();
  } else {
    if (initialBoard[row][col] !== " ") {
      selectedSquare = { row, col };
    }
  }
}

function replaceChar(str, index, char) {
  return str.substring(0, index) + char + str.substring(index + 1);
}

createBoard();