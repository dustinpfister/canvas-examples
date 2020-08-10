

var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var state = breakout.createNewState(canvas);




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
    draw.info(ctx, canvas, state);
};
loop();
