// DOM Elements
const cells = document.querySelectorAll(".cell");
const info = document.querySelector("#infor h5");
const restartBtn = document.getElementById("Reset");
const playerXBox = document.querySelector(".palybox1");
const playerOBox = document.querySelector(".palybox2");
const scoreXEl = document.getElementById("scoreX");
const scoreOEl = document.getElementById("scoreO");

// Game State Variables
let currentPlayer = "X";
let options = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;
let scoreX = 0;
let scoreO = 0;

const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Initialize Game
function initGame() {
    cells.forEach(cell => {
        cell.addEventListener("click", handleCellClick);
    });
    restartBtn.addEventListener("click", restartGame);
}

// Handle Cell Clicks
function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute("data-index");

    // Ignore click if cell already filled or game over
    if (options[index] !== "" || !isGameActive) {
        return;
    }

    updateCell(cell, index);
    checkResult();
}

// Update Cell State
function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);
}

// Switch Player Turns
function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    info.textContent = `${currentPlayer}'s Turn!`;

    if (currentPlayer === "X") {
        playerXBox.classList.add("activie");
        playerOBox.classList.remove("activie");
    } else {
        playerOBox.classList.add("activie");
        playerXBox.classList.remove("activie");
    }
}

// Check Win/Draw State
function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winCombinations.length; i++) {
        const [a, b, c] = winCombinations[i];
        if (options[a] && options[a] === options[b] && options[a] === options[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        info.textContent = `Player ${currentPlayer} Wins! 🎉`;
        isGameActive = false;
        updateScore(currentPlayer);
        return;
    }

    // Check for Draw
    if (!options.includes("")) {
        info.textContent = "Game Draw! 🤝";
        isGameActive = false;
        return;
    }

    switchPlayer();
}

// Update Scores
function updateScore(winner) {
    if (winner === "X") {
        scoreX++;
        scoreXEl.textContent = scoreX;
    } else {
        scoreO++;
        scoreOEl.textContent = scoreO;
    }
}

// Restart Game State
function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    info.textContent = "Start Game - X's Turn";

    playerXBox.classList.add("activie");
    playerOBox.classList.remove("activie");

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("X", "O");
    });
}

// Start Game
initGame();