const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');
const startButton = document.getElementById('start');
const selectXButton = document.getElementById('selectX');
const selectOButton = document.getElementById('selectO');
const selectionSection = document.getElementById('selection');
const gameSection = document.getElementById('game');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let userMark = 'X';
let computerMark = 'O';
let gameActive = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellPlayed = (clickedCell, clickedCellIndex) => {
    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());
};

const handleResultValidation = () => {
    let roundWon = false;
    let winningCombo = [];

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            winningCombo = winCondition;
            break;
        }
    }

    if (roundWon) {
        message.innerText = `${currentPlayer} wins!`;
        gameActive = false;
        restartButton.classList.remove('hidden');
        winningCombo.forEach(index => {
            document.querySelector(`.cell[data-index='${index}']`).classList.add('winner');
        });
        return;
    }

    let roundDraw = !board.includes('');
    if (roundDraw) {
        message.innerText = 'Draw!';
        gameActive = false;
        restartButton.classList.remove('hidden');
        return;
    }

    currentPlayer = currentPlayer === userMark ? computerMark : userMark;
    if (currentPlayer === computerMark) {
        setTimeout(handleComputerTurn, 500);
    }
};

const handleCellClick = (clickedCellEvent) => {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
};

const handleRestartGame = () => {
    gameActive = true;
    currentPlayer = userMark;
    board = ['', '', '', '', '', '', '', '', ''];
    message.innerText = '';
    cells.forEach(cell => {
        cell.innerText = '';
        cell.className = 'col-4 cell';
    });
    restartButton.classList.add('hidden');
};

const handleStartGame = () => {
    gameActive = true;
    currentPlayer = userMark;
    board = ['', '', '', '', '', '', '', '', ''];
    message.innerText = '';
    cells.forEach(cell => {
        cell.innerText = '';
        cell.className = 'col-4 cell';
    });
    startButton.classList.add('hidden');
    selectionSection.classList.add('hidden');
    gameSection.classList.remove('hidden');
};

const handleComputerTurn = () => {
    let availableCells = [];
    board.forEach((cell, index) => {
        if (cell === '') {
            availableCells.push(index);
        }
    });

    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    const cell = document.querySelector(`.cell[data-index='${randomIndex}']`);

    handleCellPlayed(cell, randomIndex);
    handleResultValidation();
};

const handleMarkSelection = (mark) => {
    userMark = mark;
    computerMark = mark === 'X' ? 'O' : 'X';
    startButton.classList.remove('hidden');
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestartGame);
startButton.addEventListener('click', handleStartGame);
selectXButton.addEventListener('click', () => handleMarkSelection('X'));
selectOButton.addEventListener('click', () => handleMarkSelection('O'));
