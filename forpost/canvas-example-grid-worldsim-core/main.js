// MAIN
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 640;
canvas.height = 480;
ctx.translate(0.5, 0.5);

var state = world.create();

var loop = function () {
    requestAnimationFrame(loop);

    world.update(state);

    draw.back(ctx, canvas);
    draw.worldCells(ctx, state);

};

loop();
