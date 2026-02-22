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