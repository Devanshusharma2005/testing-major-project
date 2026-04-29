document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('sudoku-grid');
    const solveBtn = document.getElementById('solve-btn');
    const clearBtn = document.getElementById('clear-btn');

    // Create the Sudoku grid
    for (let i = 0; i < 81; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        const input = document.createElement('input');
        input.type = 'text';
        input.maxLength = '1';
        input.addEventListener('input', (e) => {
            if (!/^[1-9]$/.test(e.target.value)) {
                e.target.value = '';
            }
        });
        cell.appendChild(input);
        grid.appendChild(cell);
    }

    // Solve the Sudoku puzzle
    solveBtn.addEventListener('click', () => {
        const inputs = document.querySelectorAll('.cell input');
        const board = Array.from({ length: 9 }, () => Array(9).fill(0));

        // Fill the board with the current values
        inputs.forEach((input, index) => {
            const row = Math.floor(index / 9);
            const col = index % 9;
            board[row][col] = input.value ? parseInt(input.value) : 0;
        });

        // Solve the Sudoku
        if (solveSudoku(board)) {
            // Update the grid with the solution
            inputs.forEach((input, index) => {
                const row = Math.floor(index / 9);
                const col = index % 9;
                input.value = board[row][col];
            });
        } else {
            alert('No solution exists for the given Sudoku puzzle.');
        }
    });

    // Clear the Sudoku grid
    clearBtn.addEventListener('click', () => {
        const inputs = document.querySelectorAll('.cell input');
        inputs.forEach(input => {
            input.value = '';
        });
    });

    // Sudoku solver function
    function solveSudoku(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(board, row, col, num)) {
                            board[row][col] = num;
                            if (solveSudoku(board)) {
                                return true;
                            }
                            board[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    // Check if a number is valid in the current position
    function isValid(board, row, col, num) {
        // Check row
        for (let x = 0; x < 9; x++) {
            if (board[row][x] === num) {
                return false;
            }
        }

        // Check column
        for (let x = 0; x < 9; x++) {
            if (board[x][col] === num) {
                return false;
            }
        }

        // Check 3x3 box
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[startRow + i][startCol + j] === num) {
                    return false;
                }
            }
        }

        return true;
    }
});