// Function that selects word from word-list and returns an array
const wordStr = "test";
const upperCaseWord = wordStr.toUpperCase();
const wordArray = upperCaseWord.split('');
const numberOfLetters = wordArray.length;
let guessedWord = Array(numberOfLetters);

console.log(wordArray);

// life counter
const totalLives = 6;
let remainingLives = totalLives;

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


function playGame() {
    // creating the area for drawing the hangman
    const canvas = document.getElementById("drawingCanvas")
    const ctx = canvas.getContext("2d");
    
    ctx.fillStyle = "rgba(255, 227, 239, 0.81)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    remainingLives = 0;
    drawMan(ctx);
    drawDashes(ctx);
}




// somehow replacing each dash with letter when guessed correctly
// replacing all remaing dashes if player loose

// creating the area for the keyboard
// creating one square for each letter that give the corresponding letter as an input when clicked


createCanvas();
playGame();
createKeyboard();

function drawMan(ctx) {
    ctx.beginPath();
    ctx.moveTo(standLeft, standBottom);     // bottom
    ctx.lineTo(standLeft, standTop);        // top
    ctx.lineTo(standRight, standTop);       // right
    ctx.lineTo(standRight, ropeEndY);       // rope
    ctx.stroke();

    // ground
    ctx.beginPath();
    ctx.moveTo(standLeft-70, standBottom);
    ctx.lineTo(standLeft+70, standBottom);
    ctx.stroke();

    // crossed
    ctx.beginPath();
    ctx.moveTo(standLeft, standTop+70);
    ctx.lineTo(standLeft+70, standTop);
    ctx.stroke();

    // head
    if (remainingLives <=5) {
        ctx.beginPath();
        ctx.arc(standRight, ropeEndY + headRadius, headRadius, 0, 2*Math.PI);
        ctx.stroke();
    }
    

    // body
    if (remainingLives <=4) {
        ctx.beginPath();
        ctx.moveTo(standRight, ropeEndY + 2*headRadius);
        ctx.lineTo(standRight, bodyEnd);
        ctx.stroke(); 
    }

    // left leg
    if (remainingLives <=3) {
        ctx.beginPath();
        ctx.moveTo(standRight, bodyEnd);
        ctx.lineTo(standRight-legLength, bodyEnd+legLength);
        ctx.stroke();
    }

    // right leg
    if (remainingLives <=2) {
        ctx.beginPath();
        ctx.moveTo(standRight, bodyEnd);
        ctx.lineTo(standRight+legLength, bodyEnd+legLength);
        ctx.stroke();
    }

    // left arm
    if (remainingLives <=1) {
        ctx.beginPath();
        ctx.moveTo(standRight, armStartY);
        ctx.lineTo(standRight-legLength, armStartY-legLength/2);
        ctx.stroke();
    }

    // right leg
    if (remainingLives <= 0) {
        ctx.beginPath();
        ctx.moveTo(standRight, armStartY);
        ctx.lineTo(standRight+legLength, armStartY-legLength/2);
        ctx.stroke();
        drawFace(ctx);
    }
}

function drawFace(ctx) {
    // facial expression
    let x = headRadius/10;
    // left eye
    ctx.beginPath();
    ctx.moveTo(standRight-2*x, ropeEndY + headRadius/2+5*x);
    ctx.lineTo(standRight-6*x, ropeEndY + headRadius/2+x);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(standRight-2*x, ropeEndY + headRadius/2+x);
    ctx.lineTo(standRight-6*x, ropeEndY + headRadius/2+5*x);
    ctx.stroke();

    // right eye
    ctx.beginPath();
    ctx.moveTo(standRight+2*x, ropeEndY + headRadius/2+5*x);
    ctx.lineTo(standRight+6*x, ropeEndY + headRadius/2+x);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(standRight+2*x, ropeEndY + headRadius/2+x);
    ctx.lineTo(standRight+6*x, ropeEndY + headRadius/2+5*x);
    ctx.stroke();

    // mouth
    ctx.beginPath();
    ctx.moveTo(standRight-4*x, ropeEndY + headRadius + 4*x);
    ctx.lineTo(standRight+4*x, ropeEndY + headRadius + 4*x);
    ctx.stroke();
}

function drawDashes(ctx) {
    let sizePerDash = sizePerWord / (numberOfLetters + (numberOfLetters-1) / 2);
    let sizePerSpace = sizePerDash / 2;

    for (let i=0; i < numberOfLetters; i++) {
        ctx.beginPath();
        ctx.moveTo(textPlacementX + (sizePerDash + sizePerSpace)*i, textPlacementY);
        ctx.lineTo(textPlacementX + (sizePerDash + sizePerSpace)*i + sizePerDash, textPlacementY);
        ctx.stroke();
    }
}

function createKeyboard() {
    const canvas = document.getElementById("keyboardCanvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgba(255, 227, 239, 0.81)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const keyboardLayout = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ];

    const keyWidth = 60;
    const keyHeight = 50;
    const keySpacing = 10;

    for (let i = 0; i < keyboardLayout.length; i++) {
        let row = keyboardLayout[i];
        let indentY = (canvas.height - (keyboardLayout.length * keyHeight + (keyboardLayout.length-1) * keySpacing)) / 2;
        let y = (keyHeight + keySpacing) * i + indentY;
        for (let col = 0; col < row.length; col++) {
            let key = row[col];
            let indentX = (canvas.width - (row.length * keyWidth + (row.length-1) * keySpacing)) / 2;
            let x = (keyWidth + keySpacing) * col + indentX;

            ctx.beginPath();
            ctx.strokeRect(x, y, keyWidth, keyHeight);
            ctx.stroke()

            ctx.fillStyle = "#000";
            ctx.font = "16px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(key, x + keyWidth/2, y + keyHeight/2);

            
        }
    }

}