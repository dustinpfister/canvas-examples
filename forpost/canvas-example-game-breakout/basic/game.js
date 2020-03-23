
var breakout = (function () {

    // create a blocks grid
    var createBlocks = function (opt) {
        opt = opt || {};
        opt.sx = opt.sx || 0;
        opt.sy = opt.sy || 0;
        opt.blockWidth = opt.blockWidth || 32;
        opt.blockHeight = opt.blockHeight || 16;
        opt.gridWidth = opt.gridWidth || 4;
        opt.gridHeight = opt.gridHeight || 4;
        var blocks = [],
        i = 0,
        len = opt.gridWidth * opt.gridHeight;
        while (i < len) {
            var gx = i % opt.gridWidth,
            gy = Math.floor(i / opt.gridWidth);
            blocks.push({
                gx: gx,
                gy: gy,
                x: opt.sx + gx * opt.blockWidth,
                y: opt.sy + gy * opt.blockHeight,
                w: opt.blockWidth,
                h: opt.blockHeight,
                points: 1,
                i: i
            });
            i += 1;
        }
        return blocks;
    };

    // move the paddle
    var movePaddle = function (state, secs) {
        var paddle = state.paddle,
        d = 0;
        // set direction
        if (state.input.left) {
            d = -1;
        }
        if (state.input.right) {
            d = 1;
        }
        if (state.input.left && state.input.right) {
            d = 0;
        }
        // move paddle
        paddle.x += paddle.pps * secs * d;
        // bounds
        if (paddle.x + paddle.w > state.canvas.width) {
            paddle.x = canvas.width - paddle.w;
        }
        if (paddle.x < 0) {
            paddle.x = 0;
        }
    };

    // check if a ball hit a block, and purge it if it did
    var ballBlockHitCheck = function (ball, state) {
        var blocks = state.blocks,
        i = blocks.length,
        bl;
        while (i--) {
            bl = blocks[i];
            if (util.boundingBox(ball.x, ball.y, 1, 1, bl.x, bl.y, bl.w, bl.h)) {
                state.score += bl.points;
                blocks.splice(i, 1);
                if (blocks.length === 0) {
                    setGame(state);
                }
            }
        }
    };

    // check if a ball hot a wall
    var ballBounds = function (ball, canvas) {
        if (ball.y <= ball.radius) {
            ball.y = ball.radius;
            ball.heading = ball.heading * -1;
        }
        if (ball.x >= canvas.width - ball.radius) {
            ball.x = canvas.width - ball.radius;
            ball.heading = (ball.heading + Math.PI) * -1
        }
        if (ball.x <= ball.radius) {
            ball.x = ball.radius;
            ball.heading = (ball.heading + Math.PI) * -1;
        }
    };

    // check if a ball has hit the paddle and change ball heading if it did.
    var ballPaddleHitCheck = function (ball, paddle) {
        if (util.boundingBox(ball.x, ball.y, 1, 1, paddle.x, paddle.y, paddle.w, paddle.h)) {
            ball.heading = Math.PI * 1.5;
            ball.y = paddle.y;
            var d = util.distance(ball.x, ball.y, paddle.x + paddle.w / 2, paddle.y),
            per = d / (paddle.w / 2),
            dir = ball.x < paddle.x + paddle.w / 2 ? -1 : 1,
            a = Math.PI / 4 * per * dir;
            ball.heading = Math.PI * 1.5 + a;
        }
    };

    // reset a ball
    var resetBall = function (ballIndex, state) {
        var ball = state.balls[ballIndex],
        len = state.balls.length,
        xAjust = len === 1 ? 0 : -60 + 120 / (len - 1) * ballIndex,
        per = ballIndex / len;
        ball.x = state.canvas.width / 2 + xAjust;
        ball.y = state.canvas.height / 1.5;
        ball.heading = Math.PI / 2;
    };

    // reset all balls
    var resetAllBalls = function (state) {
        var i = state.balls.length;
        while (i--) {
            resetBall(i, state);
        }
    };

    // make a ball object
    var addBalls = function (state, count) {
        count = count || 1;
        var canvas = state.canvas,
        i = count,
        ball;
        state.balls = state.balls || [];
        while (i--) {
            ball = {
                x: canvas.width / 2 - 60,
                y: canvas.height / 1.5,
                radius: 5,
                heading: Math.PI - Math.PI / 4,
                pps: 128
            };
            state.balls.push(ball);
        }
        return ball;
    };

    // move balls
    var moveBalls = function (state, secs) {
        var i = 0,
        ball,
        len = state.balls.length,
        paddle = state.paddle;
        while (i < len) {
            ball = state.balls[i];
            // move ball
            ball.x += Math.cos(ball.heading) * ball.pps * secs;
            ball.y += Math.sin(ball.heading) * ball.pps * secs;
            // out?
            if (ball.y >= state.canvas.height + ball.radius) {
                // reset ball
                resetBall(i, state);
            }
            // hit a wall?
            ballBounds(ball, state.canvas);
            ballBlockHitCheck(ball, state);
            // hit the paddle?
            ballPaddleHitCheck(ball, state.paddle);
            // make sure ball heading is normalized
            ball.heading = util.angleNormalize(ball.heading);
            i += 1;
        }
    };

    // set game state and balls
    var setGame = function (state) {
        var canvas = state.canvas;
        state.blocks = createBlocks({
                sx: 32,
                sy: 32,
                blockWidth: (canvas.width - 64) / 8,
                blockHeight: 16,
                gridWidth: 8,
                gridHeight: 5
            });
        state.balls = [];
        addBalls(state, 3);
        resetAllBalls(state);
        state.paddle = {
            x: canvas.width / 2 - 60,
            y: canvas.height - 30,
            w: 120,
            h: 15,
            pps: 128
        };
    };

    var api = {};

    // create a new game state
    api.createNewState = function (canvas) {
        canvas = canvas || {
            width: 320,
            height: 240
        };
        var state = {
            score: 0,
            input: {
                left: false,
                right: false
            },
            canvas: canvas,
            balls: [],
            blocks: [],
            paddle: {}
        };
        setGame(state);
        return state;
    };

    // update the given state object with the given amount of time
    // passed sense last update in seconds
    api.update = function (state, secs) {

        movePaddle(state, secs);
        moveBalls(state, secs);

    };

    return api;

}
    ());
