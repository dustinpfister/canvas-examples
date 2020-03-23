// MAIN
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
canvas.style.width = '100%';
canvas.style.height = '100%';
ctx.translate(0.5, 0.5);

var state = paricles.create({
        canvas: canvas,
        ctx: ctx
    });
draw.setGradient(state);
var loop = function () {
    requestAnimationFrame(loop);
    draw.background(state);
    draw.pool(state);
    paricles.update(state);

};

loop();
