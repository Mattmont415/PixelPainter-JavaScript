

//Constants
const mainContainerWidth = 60;
const blankColor = '#f9faf5';
const startingBoardSize = 16;
const gridItem = document.getElementsByClassName("grid-item");
const buttonColorPicker = document.getElementById("color-picker").innerHTML;
let gridLines = 0;
//const buttonGridLines = document.getElementById("grid-lines");


//Have bordered pixels optional
//Have mouse-down event

let squareWidth = 0;
let userBoardSize;
let mouseDown = false;
let isErase = false;
let currentColor = document.getElementById("color-picker").value;

//get the canvas to work on, the class from the div
let canvas = document.querySelector(".canvas");


function createSquare(numSquares) {

    squareWidth = mainContainerWidth / numSquares;
    //creating the square in a div element
    const square = document.createElement('div');

    square.className = "square";
    square.style.width = `${squareWidth}vh`;
    square.style.height = `${squareWidth}vh`;
    square.style.backgroundColor = blankColor;

    return square;
}


function makeGrid(numSquares) {

    while (canvas.hasChildNodes()) {
        canvas.removeChild(canvas.lastChild);
    }

    for (let i = 0; i < (numSquares*numSquares); i++) {
        canvas.appendChild(createSquare(numSquares));
    }

    const canvasLength = numSquares*squareWidth;
    canvas.setAttribute('style', `width: ${canvasLength}vh; height: ${canvasLength}vh;`)

    colorSquare(currentColor);
}


function colorSquare(currentColor) {
    let color = currentColor;

    if (isErase) {
        color = blankColor;
    }

    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
        square.addEventListener('mousedown', event => {
            mouseDown = true;
            event.target.style.backgroundColor = color;
        });
        square.addEventListener('mouseover', event => {
            if (mouseDown) {
                event.target.style.backgroundColor = color;
            }
        });

        square.addEventListener('mouseup', event => mouseDown = false);
    });
}



// Color Picker Hover Effect
function colorHoverEffect() {
    for (let i = 0; i < gridItem.length; i++) {
        gridItem[i].addEventListener("mouseover", function () {

            gridItem[i].style.backgroundColor = buttonColorPicker.target.value;
            gridItem[i].style.color = buttonColorPicker.target.value;
        })
    }
    currentColor.style.color = buttonColorPicker.target.value;
    // gridItem.style.color = buttonColorPicker.value;
    currentColor.textContent = buttonColorPicker.target.value;
    // gridItem.textContent = buttonColorPicker.value;
}


function addOrRemoveGridLines() {
    squares = document.querySelectorAll('.square')
    if (!gridLines) {
        squares.forEach((square) => {
            square.classList.add('grid-lines')
        })
        gridLines = 1;
    }else {
        squares.forEach((square) => {
            square.classList.remove('grid-lines')
        })
        gridLines = 0;
    }
}

function completeErase() {
    const board = document.querySelectorAll(".square");
    board.forEach (square => {
        square.style.backgroundColor = blankColor;
    });
}

//The reset button for the board ALWAYS RUNNING
const clearBoard = document.querySelector('#reset');
clearBoard.addEventListener('click',completeErase);


//change the gridlines feature. FUCKing feature
//buttonGridLines.addEventListener("click", gridLines);
let gridLinesButton = document.getElementById('grid-lines');
gridLinesButton.addEventListener("click", addOrRemoveGridLines)


makeGrid(40);


buttonColorPicker.addEventListener("input", colorHoverEffect);
