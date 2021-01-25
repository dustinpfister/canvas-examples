
// create and append canvas element, and get 2d context
/*
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
// set width and height
canvas.width = 320;
canvas.height = 240;
//canvas.style.width = '100%';
//canvas.style.height = '100%';
*/

var canvasObj = utils.createCanvas();

var canvas = canvasObj.canvas;
var ctx = canvasObj.ctx;

// loop
var clock = clockMod.create(new Date());
var loop = function () {
    requestAnimationFrame(loop);
    //clock = clockMod.update(clock, new Date(2020, 4, 6, 14, 0, 0, 0));
    clock = clockMod.update(clock, new Date());
    draw.clear(canvas, ctx);
    draw.pool(canvas, ctx, clock);
    draw.clockDayCircle(canvas, ctx, clock);
    draw.clockText(canvas, ctx, clock);
    draw.ver(canvas, ctx, clock);
};
// start loop
loop();
