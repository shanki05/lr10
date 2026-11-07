const symbols = ['🍎', '🍐', '🍋', '🍑', '🍒'];

let userName = '';
const maxAttempts = 3;
let currentAttempt = 0;
let hasWon = false;

window.onload = () => {
    requestName();
};

function requestName() {
    while (!userName || userName.trim() === '') {
        userName = prompt('Вітаємо у грі! Введіть ваше ім\'я:', '');
        if (userName === null) {
            userName = 'Гість'; 
        }
    }
    document.getElementById('userNameDisplay').textContent = userName;
    updateAttemptDisplay();
    fillEmptyGrid();
}

function updateAttemptDisplay() {
    document.getElementById('attemptDisplay').textContent = `Спроба ${currentAttempt} з ${maxAttempts}`;
}

function getUniqueSymbolsColumn() {
    let shuffled = [...symbols].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
}

function fillEmptyGrid() {
    for(let r = 0; r < 3; r++) {
        for(let c = 0; c < 3; c++) {
            document.getElementById(`cell-${r}-${c}`).textContent = '❓';
        }
    }
}

document.getElementById('generateBtn').addEventListener('click', function() {
    if (currentAttempt >= maxAttempts || hasWon) return;

    const btn = this;
    btn.disabled = true; 
    currentAttempt++;
    updateAttemptDisplay();

    const cells = document.querySelectorAll('.cell');
    
    cells.forEach(cell => {
        cell.classList.remove('win-highlight');
        cell.classList.add('spin');
    });

    setTimeout(() => {
        const col0 = getUniqueSymbolsColumn();
        const col1 = getUniqueSymbolsColumn();
        const col2 = getUniqueSymbolsColumn();

        const grid = [
            [col0[0], col1[0], col2[0]], 
            [col0[1], col1[1], col2[1]], 
            [col0[2], col1[2], col2[2]]  
        ];

        for(let r = 0; r < 3; r++) {
            for(let c = 0; c < 3; c++) {
                const cell = document.getElementById(`cell-${r}-${c}`);
                cell.textContent = grid[r][c];
                cell.classList.remove('spin');
            }
        }

        for(let r = 0; r < 3; r++) {
            if(grid[r][0] === grid[r][1] && grid[r][1] === grid[r][2]) {
                hasWon = true;
                document.getElementById(`cell-${r}-0`).classList.add('win-highlight');
                document.getElementById(`cell-${r}-1`).classList.add('win-highlight');
                document.getElementById(`cell-${r}-2`).classList.add('win-highlight');
            }
        }

        const msgBox = document.getElementById('resultMessage');
        if (hasWon) {
            msgBox.innerHTML = `<span class="success">Вітаємо, ${userName}! Ви перемогли!</span>`;
            document.getElementById('restartBtn').style.display = 'inline-block';
        } else if (currentAttempt >= maxAttempts) {
            msgBox.innerHTML = `<span class="danger">Гру закінчено! Ви програли.</span>`;
            document.getElementById('restartBtn').style.display = 'inline-block';
        } else {
            btn.disabled = false; 
        }

    }, 300); 
});

document.getElementById('restartBtn').addEventListener('click', () => {
    currentAttempt = 0;
    hasWon = false;
    updateAttemptDisplay();
    document.getElementById('resultMessage').innerHTML = '';
    document.getElementById('restartBtn').style.display = 'none';
    document.getElementById('generateBtn').disabled = false;
    
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('win-highlight');
    });
    fillEmptyGrid();
});