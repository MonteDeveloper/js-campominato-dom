let squaresContainer = document.getElementById("my-squaresContainer");
let squareSide;
let selectEl = document.getElementsByTagName("select")[0];

let nBombs;
let totalSquare;
let nSideSquare;
let score;
let bestScoreEasy = 0;
let bestScoreNormal = 0;
let bestScoreHard = 0;
let bestScore = 0;
let actualDifficulty;
let squareToWin;

const elScore = document.getElementById("my-score");
const elBestScore = document.getElementById("my-bestScore");
const elSquareToWin = document.getElementById("my-squareToWin");

function generateGrid(){
    squaresContainer.innerHTML = "";

    score = 0;

    if(selectEl.options[selectEl.selectedIndex].text == "HARD"){
        totalSquare = 100;
        nSideSquare = 10;
        nBombs = 16;
        actualDifficulty = 3;
        bestScore = bestScoreHard;
    }else if(selectEl.options[selectEl.selectedIndex].text == "NORMAL"){
        totalSquare = 81;
        nSideSquare = 9;
        nBombs = 10;
        actualDifficulty = 2;
        bestScore = bestScoreNormal;
    }else{
        totalSquare = 49;
        nSideSquare = 7;
        nBombs = 4;
        actualDifficulty = 1;
        bestScore = bestScoreEasy;
    }

    squareToWin = totalSquare - nBombs;

    elBestScore.innerHTML = bestScore;
    elScore.innerHTML = score;
    elSquareToWin.innerHTML = squareToWin;

    let bombsPositions = getBombsPositions(nBombs, 1, totalSquare);
    console.log(bombsPositions);

    if(squaresContainer.offsetHeight < squaresContainer.offsetWidth){
        squareSide = squaresContainer.offsetHeight / nSideSquare;
    }else{
        squareSide = squaresContainer.offsetWidth / nSideSquare;
    }
    
    squaresContainer.style.width = `${squareSide * nSideSquare}px`;
    squaresContainer.style.height = `${squareSide * nSideSquare}px`;
    
    for (let i = 1; i <= totalSquare; i++) {
        squaresContainer.innerHTML += `<div class="my-square" onclick="setActive(this)">${i}</div>`;
    
        let lastSquare = Array.from(
            document.querySelectorAll('.my-square')
        ).pop();
    
        lastSquare.style.width = `${squareSide}px`;
        lastSquare.style.height = `${squareSide}px`;
        lastSquare.style.lineHeight = `${squareSide}px`;
        if(bombsPositions.includes(i)){
            lastSquare.classList.add("bomb");
        }
    }
}

function setActive(element){
    console.log(`Casella cliccata n: ${element.innerText}`);

    element.classList.add("active");

    if(!element.classList.contains('bomb')){
        score += 1;
        squareToWin -= 1;
    }else{
        let msg = "";
        if(squareToWin <= 0){
            msg += "VITTORIA!";
        }else{
            msg += "SCONFITTA...";
        }

        msg += `<br>Hai totalizzato un punteggio di ${score}`;

        if(score > bestScore){
            bestScore = score;
            if(actualDifficulty == 3){
                bestScoreHard = bestScore;
                msg += `, il migliore nella modalità HARD!`;
            }else if(actualDifficulty == 2){
                bestScoreNormal = bestScore;
                msg += `, il migliore nella modalità NORMAL!`;
            }else{
                bestScoreEasy = bestScore;
                msg += `, il migliore nella modalità EASY!`;
            }
        }

        squaresContainer.innerHTML += `
        <div class="d-flex justify-content-center align-items-center h-100 w-100 rounded-3" id="my-gameoverBox">
            <p class="h4 text-white" id="my-textResult">
                ${msg}
            </p>
        </div>
        `;
    }

    elBestScore.innerHTML = bestScore;
    elScore.innerHTML = score;
    elSquareToWin.innerHTML = squareToWin;
}

function getBombsPositions(n, min, max){
    let bombsPositions = [];
    while (bombsPositions.length < n) {
        let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        if (bombsPositions.indexOf(randomNumber) === -1) bombsPositions.push(randomNumber);
    }
    return bombsPositions;
}

