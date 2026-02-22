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

            keys.push({
                letter: key,
                x: x,
                y: y,
                width: keyWidth,
                height: keyHeight,
                onClick: function () {
                    if (!lettersTried.includes(key)) {
                        ctx.fillStyle = "rgba(255, 227, 239, 0.62)";
                        ctx.beginPath();
                        ctx.fillRect(x, y, keyWidth, keyHeight);
                        ctx.fill()
                        lettersTried.push(key);
                        console.log("Letters tried: " + lettersTried);
                        checkNewLetter(key);
                    }
                }
            });
        }
    }

    canvas.addEventListener("click", function (event) {
    const rect = canvas.getBoundingClientRect();        // returns the canvas’s position and size relative to viewport
    const mouseX = event.clientX - rect.left;           // returns the x position relative to the canvas
    const mouseY = event.clientY - rect.top;            // returns the y position relative to the canvas

        keys.forEach(key => {
            if (
                mouseX >= key.x &&
                mouseX <= key.x + key.width &&
                mouseY >= key.y &&
                mouseY <= key.y + key.height
            ) {
                key.onClick();
            }
        });
    });
}

function checkNewLetter(key) {
    if (wordArray.includes(key)) {
        // do something

    } else {
        remainingLives -= 1;
    }

    if (remainingLives <= 0) {
        // do something
    }

    playGame();
    console.log("Remaining lives: " + remainingLives);
}
