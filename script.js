document.addEventListener("DOMContentLoaded", function () {
    createBoard();
    
    // Dark/Light mode toggle
    const modeToggle = document.getElementById('mode-toggle');
    modeToggle.addEventListener('click', toggleMode);
  
    if (localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark-mode');
        modeToggle.textContent = '🌕';
    }
});
  
function toggleMode() {
    const modeToggle = document.getElementById('mode-toggle');
    document.body.classList.toggle('dark-mode');
  
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled');
        modeToggle.textContent = '🌕';
    } else {
        localStorage.removeItem('dark-mode');
        modeToggle.textContent = '🌙';
    }
}
  
function createBoard() {
    const grid = document.getElementById("sudoku-grid");
    grid.innerHTML = "";
    for (let i = 0; i < 81; i++) {
        let input = document.createElement("input");
        input.type = "text";
        input.classList.add("cell");
        input.maxLength = 1;
        input.addEventListener("input", validateInput);
        grid.appendChild(input);
    }
}
  
function validateInput(event) {
    let value = event.target.value;
    if (!/^[1-9]?$/.test(value)) {
        event.target.value = "";
    }
}
  
function solveSudoku() {
    let board = [];
    let cells = document.querySelectorAll(".cell");
  
    let hasInput = false;
    for (let i = 0; i < 9; i++) {
        board.push([]);
        for (let j = 0; j < 9; j++) {
            let value = cells[i * 9 + j].value;
            if (value) hasInput = true;
            board[i].push(value ? parseInt(value) : 0);
        }
    }
  
    if (!hasInput) {
        alert("Please enter at least one number before solving!");
        return;
    }
  
    if (!isValidSudoku(board)) {
        alert("The given Sudoku puzzle is incorrect!");
        return;
    }
  
    const loader = document.getElementById('loader');
    loader.style.display = 'flex';
  
    setTimeout(() => {
        loader.style.display = 'none';
        
        if (sudokuSolver(board)) {
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    let index = i * 9 + j;
                    if (!cells[index].value) {
                        cells[index].value = board[i][j];
                        cells[index].classList.add("solved");
                    }
                }
            }
        } else {
            alert("No solution found!");
        }
    }, 3000);
}
  
function isValidSudoku(board) {
    let seen = new Set();
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let num = board[i][j];
            if (num !== 0) {
                let rowKey = `row-${i}-${num}`;
                let colKey = `col-${j}-${num}`;
                let boxKey = `box-${Math.floor(i / 3)}-${Math.floor(j / 3)}-${num}`;
                if (seen.has(rowKey) || seen.has(colKey) || seen.has(boxKey)) {
                    return false;
                }
                seen.add(rowKey);
                seen.add(colKey);
                seen.add(boxKey);
            }
        }
    }
    return true;
}
  
function sudokuSolver(board) {
    let empty = findEmptyCell(board);
    if (!empty) return true;
  
    let [row, col] = empty;
    for (let num = 1; num <= 9; num++) {
        if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (sudokuSolver(board)) return true;
            board[row][col] = 0;
        }
    }
    return false;
}
  
function findEmptyCell(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) return [i, j];
        }
    }
    return null;
}
  
function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) return false;
    }
  
    let startRow = Math.floor(row / 3) * 3;
    let startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] === num) return false;
        }
    }
    return true;
}
  
function clearBoard() {
    document.querySelectorAll(".cell").forEach(cell => {
        cell.value = "";
        cell.classList.remove("solved");
    });
}

document.addEventListener("DOMContentLoaded", function () {
    createBoard();
    
    // Dark/Light mode toggle
    const modeToggle = document.getElementById('mode-toggle');
    modeToggle.addEventListener('click', toggleMode);
  
    if (localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark-mode');
        modeToggle.textContent = '🌕';
    }
});

// Sound effect for the loader
const scanningSound = new Audio('ScanningEffect.mp3');

function solveSudoku() {
    let board = [];
    let cells = document.querySelectorAll(".cell");
  
    let hasInput = false;
    for (let i = 0; i < 9; i++) {
        board.push([]);
        for (let j = 0; j < 9; j++) {
            let value = cells[i * 9 + j].value;
            if (value) hasInput = true;
            board[i].push(value ? parseInt(value) : 0);
        }
    }
  
    if (!hasInput) {
        alert("Please enter at least one number before solving!");
        return;
    }
  
    if (!isValidSudoku(board)) {
        alert("The given Sudoku puzzle is incorrect!");
        return;
    }
  
    const loader = document.getElementById('loader');
    loader.style.display = 'flex';

    // Play the scanning sound when the loader starts
    scanningSound.loop = true; // Looping the sound
    scanningSound.play();

    setTimeout(() => {
        loader.style.display = 'none';

        // Stop the scanning sound when solving is done
        scanningSound.pause();
        scanningSound.currentTime = 0; // Reset audio position
        
        if (sudokuSolver(board)) {
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    let index = i * 9 + j;
                    if (!cells[index].value) {
                        cells[index].value = board[i][j];
                        cells[index].classList.add("solved");
                    }
                }
            }
        } else {
            alert("No solution found!");
        }
    }, 3000);
}
