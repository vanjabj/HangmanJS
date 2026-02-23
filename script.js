const randomWord = wordListArray[Math.floor(Math.random() * wordListArray.length)];
const wordArray = randomWord.toUpperCase().split('');
const numberOfLetters = wordArray.length;
let guessedWord = Array(wordArray.length).fill('_ ');

console.log(wordArray);

// life counter
const totalLives = 6;
let remainingLives = totalLives;
let playingGame = true;

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
const ropeEndY = standTop+50;
const headRadius = 40;
const bodyEnd = ropeEndY + 2*headRadius + 120;
const legLength = 50;
const armStartY = ropeEndY+2*headRadius+legLength;

// setting the parameters for drawing dashes and letters
const sizePerWord = 300;
const textPlacementX = 600;
const textPlacementY = 400;


function drawBoard() {
    const canvas = document.getElementById("drawingCanvas")
    const ctx = canvas.getContext("2d");
    
    ctx.fillStyle = "rgba(255, 227, 239, 0.81)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawMan(ctx);
    drawDashes(ctx);
}

// somehow replacing each dash with letter when guessed correctly
// replacing all remaing dashes if player loose

createCanvas();
createKeyboard();
drawBoard();
