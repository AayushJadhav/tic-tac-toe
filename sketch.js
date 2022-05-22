const x = "X";
const o = "O"

const h1First = document.getElementById("h1-1");
const btn1 = document.getElementById("btn-1");
const state1 = document.getElementById("start-game");
const state2 = document.getElementById("main-game");
const board = document.getElementById("game-board");
const cells = document.querySelectorAll(".cell");
const xCheckBox = document.getElementById("x-checkbox");
const oCheckBox = document.getElementById("o-checkbox");
const turnElem = document.getElementById("turn");
const state3 = document.getElementById("end-game");
const resultH1 = document.getElementById('result');
state2.style.display = "none";
state3.style.display = "none";
const winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

var gameState = 0;
var oTurn;

function startGame() {
    state1.style.display = 'none';
    state2.style.display = 'block';
    state3.style.display = 'none';
    oTurn = true;

    cells.forEach(cell => {
        cell.innerHTML = "";
        cell.addEventListener('click', handleClick, { once: true });
    })
}

function handleClick(e) {
    var cell = e.target;
    currentTurn = !oTurn ? o : x;
    cell.innerHTML = currentTurn;
    
    if(checkWin(currentTurn) || checkDraw()) {
        state2.style.display = "none";
        state3.style.display = "block";
        if(checkWin(currentTurn)) {
            console.log(`${oTurn ? "X" : "O"} won!`);
            resultH1.innerHTML = `${ oTurn ? "X" : "O" } won!`;

        } else if(checkDraw()) {
            console.log("draw!");
            resultH1.innerHTML = "Draw!"
        }
    } else {
        swapTurn();
        turnElem.innerHTML = oTurn ? x : o;
    }
}

function swapTurn() {
    oTurn = !oTurn;
}

function checkWin(currentTurn) {
    return winningCombo.some(combo => {
        return combo.every(index => {
            if(cells[index].textContent === currentTurn) {
                return true;
            } else {
                return false;
            }
        })
    })
}

function checkDraw() {
    return [...cells].every(cell => {
        return cell.textContent == x || cell.textContent === o;
    })
}