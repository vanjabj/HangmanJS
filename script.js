const randomWord = wordListArray[Math.floor(Math.random() * wordListArray.length)];
const wordArray = randomWord.toUpperCase().split('');
const numberOfLetters = wordArray.length;
let guessedWord = Array(wordArray.length).fill('_ ');

// console.log(wordArray);

// life counter
const totalLives = 6;
let remainingLives = totalLives;
let playingGame = true;
let gameWon = false;

// keyboard 
let keys = [];
let lettersTried = [];

// creating the background canvas
function createCanvas() {
    const canvas = document.getElementById("backCanvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgba(245, 195, 108, 0.31)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// setting the parameters for drawing the hangman
const standTop = 80;
const standBottom = 420;
const standLeft = 150;
const standRight = 300;
let ropeEndY = standTop+50;
const headRadius = 40;
let bodyEnd = ropeEndY + 2*headRadius + 120;
const legLength = 50;
let armStartY = ropeEndY+2*headRadius+legLength;

// setting the parameters for drawing dashes and letters
const sizePerWord = 300;
const textPlacementX = 600;
const textPlacementY = 400;
const sizePerDash = sizePerWord / (numberOfLetters + (numberOfLetters-1) / 2);
const sizePerSpace = sizePerDash / 2;

// keyboard inputs
document.addEventListener("keydown", function (event) {
    const pressedKey = event.key.toLowerCase();

    keys.forEach(key => {
        if (key.letter.toLowerCase() === pressedKey) {
            key.onClick();   // reuse same logic as mouse click
        }
    });
});

function drawBoard() {
    const canvas = document.getElementById("drawingCanvas")
    const ctx = canvas.getContext("2d");
    
    ctx.fillStyle = "rgba(255, 227, 239, 0.81)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawStand(ctx);
    drawMan(ctx);
    drawDashes(ctx);
    drawLetters(ctx);

    if (playingGame == false) {
        drawAllLetters(ctx);
        printWinText(ctx, canvas.width / 1.35, canvas.height / 2);
    }
}

createCanvas();
createKeyboard();
drawBoard();
