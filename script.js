let app = document.getElementById('app');

let gridLengthY = 4;
let gridLengthX = 4;

let firstClickIndex;
let firstClick;
let secondClick;
let firstColor;
let secondColor;
let matchedColorPairs = 0;
let infoMessage = "";
let youWin = false;
let attempts = 0;


let initialColorsList = [
    { color: "blue", isRevealed: false },
    { color: "blue", isRevealed: false },
    { color: "green", isRevealed: false },
    { color: "green", isRevealed: false },
    { color: "yellow", isRevealed: false },
    { color: "yellow", isRevealed: false },
    { color: "red", isRevealed: false },
    { color: "red", isRevealed: false },
    { color: "magenta", isRevealed: false },
    { color: "magenta", isRevealed: false },
    { color: "pink", isRevealed: false },
    { color: "pink", isRevealed: false },
    { color: "orange", isRevealed: false },
    { color: "orange", isRevealed: false },
    { color: "cyan", isRevealed: false },
    { color: "cyan", isRevealed: false },
];

let randomizedColorsList = generateRandomizedColors();

updateView();

function updateView() {
    app.innerHTML = /*HTML*/`
    <div class="title">Match the colors!</div>
    ${drawGrid(randomizedColorsList)}
    <div class="infoContainer">
    <div class="${youWin ? 'infoMessageWinLeft' : 'infoMessageLeft'}">${infoMessage}</div>
    <div class="${youWin ? 'infoMessageWinRight' : 'infoMessageRight'}">Attempts: ${attempts}</div>
    </div>
    <div class="button">
    <button class="${youWin ? 'restartButtonWin' : 'restartButton'}" onmousedown="location.reload()">Restart</button>
    </div>
    `;
}

function drawGrid(colorsList) {
    let gridHTML = '';
    for (let y = 0; y < gridLengthY; y++) {
        for (let x = 0; x < gridLengthX; x++) {
            let index = y * gridLengthX + x;
            let color = colorsList[index];
            gridHTML += `
                <div id='x${x}y${y}' ${color.isRevealed ? '' : `onclick="revealPicture(${index})"`} style="border: 1px solid black; ${color.isRevealed ? 'background-color: ' + color.color : 'background-color: rgb(46,46,46)'};"></div>
            `;
        }
    }
    return `<div id="grid" style="display: grid; grid-auto-rows: 1fr; grid-template-columns: repeat(${gridLengthX}, 1fr);">${gridHTML}</div>`;
}


function revealPicture(index) {
    if (!firstClick && !secondClick) {
        randomizedColorsList[index].isRevealed = true;
        firstColor = randomizedColorsList[index].color;
        firstClick = true;
        firstClickIndex = index;
    } else if (firstClick && !secondClick) {
        randomizedColorsList[index].isRevealed = true;
        secondColor = randomizedColorsList[index].color;
        secondClick = true;
        if (firstColor === secondColor) {
            infoMessage = "It's a match!"
            firstClick = false;
            secondClick = false;
            matchedColorPairs++;
            attempts++;
            if(matchedColorPairs == randomizedColorsList.length / 2){
                infoMessage = "You win!"
                console.log("Congrats!")

                setInterval(() => {
                    youWin = !youWin;
                    updateView();
                }, 200);
            }
        } else {
            infoMessage = "Try again!"
            setTimeout(() => {
                randomizedColorsList[firstClickIndex].isRevealed = false;
                randomizedColorsList[index].isRevealed = false;
                firstClick = false;
                secondClick = false;
                attempts++;
                updateView();
            }, 500);
        }
    }
    updateView();
}


function generateRandomizedColors() {
    let colorsCopy = [...initialColorsList];
    let randomizedList = [];
    for (let i = 0; i < gridLengthX * gridLengthY; i++) {
        if (colorsCopy.length === 0) break;
        let randomIndex = Math.floor(Math.random() * colorsCopy.length);
        let randomColor = colorsCopy[randomIndex];
        randomizedList.push(randomColor);
        colorsCopy.splice(randomIndex, 1);
    }
    return randomizedList;
}
