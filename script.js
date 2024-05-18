let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let currentPlayer = 'X';
let gameEnded = false;

document.addEventListener('DOMContentLoaded', function() {
    createBoard();
    document.getElementById('restartBtn').addEventListener('click', restartGame);
});

function createBoard() {
    const boardElement = document.getElementById('board');
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', () => playerMove(cell, row, col));
            boardElement.appendChild(cell);
        }
    }
}

function playerMove(cell, row, col) {
    if (!gameEnded && cell.innerText === '') {
        board[row][col] = currentPlayer;
        cell.innerText = currentPlayer;
        if (checkWinner()) {
            document.getElementById('message').innerText = `Player ${currentPlayer} wins!`;
            gameEnded = true;
        } else if (checkDraw()) {
            document.getElementById('message').innerText = "It's a draw!";
            gameEnded = true;
        } else {
            switchPlayer();
        }
    }
}

function switchPlayer() {
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
}

function checkWinner() {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
            return true;
        }
        if (board[0][i] && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
            return true;
        }
    }
    if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
        return true;
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
        return true;
    }
    return false;
}

function checkDraw() {
    return board.flat().every(cell => cell);
}

function restartGame() {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    currentPlayer = 'X';
    gameEnded = false;
    document.getElementById('message').innerText = '';
    document.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
}
