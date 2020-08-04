
// draw a ball object
var drawBallObject = function (ctx, ball) {
    var x,
    y;
    // draw ball
    ctx.fillStyle = 'red';
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
var drawBallCollection = function (ctx, canvas, ballCollection) {
    ballCollection.balls.forEach(function (ball) {
        drawBallObject(ctx, ball);
    });
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.font = '10px courier';
    ctx.fillText('v' + ballCollection.ver, 10, canvas.height - 15);
};

// create and append canvas element, and get 2d context
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
// set width and height
canvas.width = 320;
canvas.height = 240;

ctx.translate(0.5, 0.5);

// create ball collection
var ballCollection = b.createBallCollection({
        count: 4,
        r: 20,
        d: 1,
        forBall: function (ball, i, opt) {
            var space = 3.5;
            ball.x = canvas.width / 2 - ball.r * space * opt.count / 2 + ball.r * (space / 2) + ball.r * i * space;
            ball.y = canvas.height / 2;
            ball.h = Math.PI * 2 / opt.count * i + Math.PI * 0.25;
            //ball.h = Math.PI * 2 * Math.random();
        }
    });

var loop = function () {
    var i;
    requestAnimationFrame(loop);
    // black background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // draw balls
    drawBallCollection(ctx, canvas, ballCollection);
    // move all
    i = 0;
    while (i < ballCollection.balls.length) {
        b.moveBallObject(ballCollection.balls[i], canvas);
        i += 1;
    }
};

loop();
