document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game');

    // Crear el tablero
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }

    let currentPlayer = 'X';
    let tableGame = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    function handleCellClick(event) {
        const clickedCell = event.target;
        const cellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (tableGame[cellIndex] === '' && gameActive) {
            tableGame[cellIndex] = currentPlayer;
            clickedCell.textContent = currentPlayer;
            
            if (player()) {
                alert(`¡Jugador ${currentPlayer} ha ganado!`);
                gameActive = false;
            } else if (tableGame.every(cell => cell !== '')) {
                alert('El juego ha terminado en empate.');
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    function player() {
        const toWin = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
            [0, 4, 8], [2, 4, 6]             // Diagonales
        ];

        return toWin.some(condition => {
            const [a, b, c] = condition;
            return tableGame[a] !== '' && tableGame[a] === tableGame[b] && tableGame[b] === tableGame[c];
        });
    }
});
