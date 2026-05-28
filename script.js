const cells = document.querySelectorAll('[data-cell-index]');
const restartButton = document.getElementById ? document.getElementById('restart') : null;
const statusMessage = document.querySelector ? document.querySelector('#status') : null;
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

function showStatus(message, isFinal = false) {
  if (!statusMessage) {
    return;
  }

  statusMessage.textContent = message;
  statusMessage.dataset.state = isFinal ? 'final' : 'active';
}

function getWinningCombination(player) {
  return winningCombinations.find((combination) => (
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

  const winningCombination = getWinningCombination(currentPlayer);

  if (winningCombination) {
    winningCombination.forEach((winningIndex) => {
      cells[winningIndex].dataset.winner = 'true';
    });
    gameEnded = true;
    showStatus(`Player ${currentPlayer} wins`, true);
    return;
  }

  if (isDraw()) {
    gameEnded = true;
    showStatus('Draw game', true);
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  showStatus(`Player ${currentPlayer}'s turn`);
}

function restartGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameEnded = false;
  showStatus("Player X's turn");

  cells.forEach((cell) => {
    cell.textContent = '';
    delete cell.dataset.mark;
    delete cell.dataset.winner;
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
