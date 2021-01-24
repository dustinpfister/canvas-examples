var draw = {};

// draw a ball object
draw.ballObject = function (ctx, ball) {
    var x,
    y;
    // draw ball
    ctx.fillStyle = 'lime';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // draw heading line
    ctx.beginPath();
    ctx.moveTo(ball.x, ball.y);
    x = Math.cos(ball.h) * ball.r * 2 + ball.x;
    y = Math.sin(ball.h) * ball.r * 2 + ball.y;
    ctx.lineTo(x, y);
    ctx.stroke();
};

// draw ball collection
draw.ballCollection = function (ctx, canvas, ballCollection) {
    ballCollection.balls.forEach(function (ball) {
        draw.ballObject(ctx, ball);
    });
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.font = '10px courier';
    ctx.fillText('v' + ballCollection.ver, 10, canvas.height - 15);
};