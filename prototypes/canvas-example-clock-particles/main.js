
// create and append canvas element, and get 2d context
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
// set width and height
canvas.width = 320;
canvas.height = 240;

// loop
var clock = clockMod.create(new Date());
var loop = function () {
    requestAnimationFrame(loop);
    clock = clockMod.update(clock, new Date());
    draw.clear(canvas, ctx);
    draw.pool(canvas, ctx, clock);
    draw.clockDayCircle(canvas, ctx, clock);
    draw.clockText(canvas, ctx, clock);
};
// start loop
loop();
