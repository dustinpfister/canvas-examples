

var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var state = breakout.createNewState(canvas);

window.addEventListener('keydown', function (e) {
    var key = e.key.toLowerCase();
    if (key === 'a') {
        state.input.left = true;
    }
    if (key === 'd') {
        state.input.right = true;
    }
});

window.addEventListener('keyup', function (e) {
    var key = e.key.toLowerCase();
    if (key === 'a') {
        state.input.left = false;
    }
    if (key === 'd') {
        state.input.right = false;
    }
});

var lt = new Date();
var loop = function () {
    var now = new Date();
    requestAnimationFrame(loop);
    breakout.update(state, (now - lt) / 1000);
    lt = now;
    draw.background(ctx, canvas);
    draw.blocks(ctx, state);
    draw.paddle(ctx, state);
    draw.balls(ctx, state);
    draw.info(ctx, state);
};
loop();
