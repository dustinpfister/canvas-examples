// MAIN
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var cross = crossMod.create(canvas),
map = mapMod.create();

canvas.addEventListener('mousedown', crossMod.createEvent(cross, 'start'));
canvas.addEventListener('mouseup', crossMod.createEvent(cross, 'end'));
canvas.addEventListener('mousemove', crossMod.createEvent(cross, 'move'));

var lt = new Date();
var loop = function () {
    var now = new Date(),
    t = now - lt,
    secs = t / 1000;
    requestAnimationFrame(loop);
    crossMod.update(cross, secs);
    draw.back(ctx, canvas);
    draw.map(ctx, map, cross);
    draw.cross(ctx, cross);
    draw.info(ctx, cross);
    lt = now;
};

loop();
