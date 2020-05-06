
// create and append canvas element, and get 2d context
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
// set width and height
canvas.width = 320;
canvas.height = 240;


// loop
var loop = function (canvas) {
    var clock = clockMod.create(new Date());
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawClockText(canvas, ctx, clock);
    drawClockDayCircle(canvas, ctx, clock);
};


// start loop
loop(canvas);
setInterval(function () {
    loop(canvas);
}, 100);
