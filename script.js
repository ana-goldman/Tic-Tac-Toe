const cells = document.querySelectorAll('[data-cell-index]');
const restartButton = document.getElementById ? document.getElementById('restart') : null;
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let currentPlayer = 'X';
let board = Array(9).fill('');
let gameEnded = false;

function hasWinningCombination(player) {
  return winningCombinations.some((combination) => (
    combination.every((index) => board[index] === player)
  ));
}

function isDraw() {
  return board.every(Boolean);
}

function handleCellClick(event) {
  const cell = event.target;
  const index = Number(cell.dataset.cellIndex);

  if (gameEnded || board[index]) {
    return;
  }

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.dataset.mark = currentPlayer;

  if (hasWinningCombination(currentPlayer) || isDraw()) {
    gameEnded = true;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function restartGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameEnded = false;

  cells.forEach((cell) => {
    cell.textContent = '';
    delete cell.dataset.mark;
  });
}

function initializeGame() {
  cells.forEach((cell) => {
    cell.addEventListener('click', handleCellClick);
  });

  if (restartButton) {
    restartButton.addEventListener('click', restartGame);
  }
}

initializeGame();
