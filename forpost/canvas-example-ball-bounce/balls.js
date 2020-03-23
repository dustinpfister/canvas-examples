
var b = {};

b.createBallObject = function (opt) {
    var ball = {};
    opt = opt || {};
    ball.x = opt.x === undefined ? 0 : opt.x;
    ball.y = opt.y === undefined ? 0 : opt.y;
    ball.r = opt.r === undefined ? 5 : opt.r;
    ball.h = opt.h === undefined ? 0 : opt.h;
    ball.d = opt.d === undefined ? 0 : opt.d;
    return ball;
};

b.createBallCollection = function (opt) {
    var noop = function (ball, i) {
        ball.x = ball.r + ball.r * 3 * i;
        ball.y = ball.r;
    },
    i,
    ball,
    balls;
    opt = opt || {};
    opt.r = opt.r === undefined ? 5 : opt.r;
    opt.h = opt.h === undefined ? 5 : opt.h;
    opt.count = opt.count === undefined ? 4 : opt.count;
    opt.forBall = opt.forBall === undefined ? noop : opt.forBall;

    i = 0;
    balls = [];
    while (i < opt.count) {
        ball = b.createBallObject({
                r: opt.r,
                h: opt.h,
                d: opt.d,
            });
        opt.forBall(ball, i, opt);
        balls.push(ball);
        i += 1;
    }
    return balls;
};

b.moveBallObject = function (ball, canvas) {
    canvas = canvas || {
        width: 320,
        height: 240
    };
    // move
    ball.x += Math.cos(ball.h) * ball.d;
    ball.y += Math.sin(ball.h) * ball.d;
    // boundaries
    if (ball.y >= canvas.height - ball.r) {
        ball.y = canvas.height - ball.r;
        ball.h = ball.h * -1;
    }
    if (ball.y <= ball.r) {
        ball.y = ball.r;
        ball.h = ball.h * -1;
    }
    if (ball.x >= canvas.width - ball.r) {
        ball.x = canvas.width - ball.r;
        ball.h = (ball.h + Math.PI) * -1
    }
    if (ball.x <= ball.r) {
        ball.x = ball.r;
        ball.h = (ball.h + Math.PI) * -1;
    }
};
