var canvasObj = utils.createCanvas();
var canvas = canvasObj.canvas;
var ctx = canvasObj.ctx;

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
    draw.ballCollection(ctx, canvas, ballCollection);
    // move all
    i = 0;
    while (i < ballCollection.balls.length) {
        b.moveBallObject(ballCollection.balls[i], canvas);
        i += 1;
    }
};

loop();
