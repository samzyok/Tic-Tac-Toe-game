const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentplayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function checkGameOver() {
    let answer = "";
    winningPositions.forEach((position) => {
        if ((gameGrid[position[0]] !== "" && gameGrid[position[1]] !== "" && gameGrid[position[2]] !== "") &&
            (gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[0]] === gameGrid[position[2]])) {
            if (gameGrid[position[0]] === "X") {
                answer = "X";
            } else {
                answer = "O";
            }

            boxes.forEach((box) => {
                box.style.pointerEvents = "none"; //stop marking if we have a winner
            })
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    if (answer !== "") { //this means we have a winner
        gameInfo.innerHTML = `Winner is - ${answer}`;
        newGameBtn.classList.add("active");
    }

    //  if game tied
    let fillCount = 0;
    boxes.forEach((box) => {
        if (box.innerHTML !== "") {
            fillCount++;
        }
    })

    if (fillCount == 9 && answer == "") {
        gameInfo.innerHTML = "Game Tied";
        newGameBtn.classList.add("active");
    }
}


function swapturn() {
    if (currentplayer == "X") {
        currentplayer = "O";
    } else {
        currentplayer = "X";
    }

    gameInfo.innerHTML = `Current Player - ${currentplayer}`; // changing UI
}

function handleboxes(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerHTML = currentplayer;
        boxes[index].style.pointerEvents = "none";
        gameGrid[index] = currentplayer;
        swapturn(); // change turn
        checkGameOver(); // check if someone has won the game
    }
}

function initializeGame() {
    boxes.forEach((box, index) => {
        box.innerHTML = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = (`box box${index+1}`);
    })
    currentplayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    newGameBtn.classList.remove("active");
    gameInfo.innerHTML = `Current Player - ${currentplayer}`;
}

initializeGame();

boxes.forEach((box, index) => {
    box.addEventListener(("click"), () => {
        handleboxes(index);
    })
})