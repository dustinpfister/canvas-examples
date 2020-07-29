// MAIN
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var cross = crossMod.create(canvas);

canvas.addEventListener('mousedown', crossMod.createEvent(cross, 'start'));
canvas.addEventListener('mouseup', crossMod.createEvent(cross, 'end'));
canvas.addEventListener('mousemove', crossMod.createEvent(cross, 'move'));

var loop = function () {
    requestAnimationFrame(loop);
    crossMod.update(cross, 0.1);
    draw.back(ctx, canvas);
    draw.cross(ctx, cross);
    draw.info(ctx, cross);
};

loop();
