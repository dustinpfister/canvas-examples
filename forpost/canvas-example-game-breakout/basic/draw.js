

var draw = {};

draw.background = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

draw.blocks = function (ctx, state) {
    ctx.fillStyle = 'rgba(0,255,0,0.5)';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    state.blocks.forEach(function (block) {
        ctx.beginPath();
        ctx.rect(block.x, block.y, block.w, block.h);
        ctx.fill();
        ctx.stroke();
    });
};

draw.paddle = function (ctx, state) {
    var paddle = state.paddle;
    ctx.fillStyle = 'blue';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fill();
    ctx.stroke();
};

draw.balls = function (ctx, state) {
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'white';
    state.balls.forEach(function (ball) {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    });
};

draw.info = function (ctx, state) {
    ctx.fillStyle = 'white';
    ctx.font = '15px arial';
    ctx.textBaseline = 'top';
    ctx.fillText(state.score, 10, 10);
};
