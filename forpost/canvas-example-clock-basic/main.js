
// pad a value
var pad = function (a) {
    return String('00' + a).slice(-2);
};
// get a clock state with the give date or new Date(0) by default
var getClock = function (date) {
    var c = {};
    c.now = date || new Date(0);
    c.timeText = pad(c.now.getHours()) + ' : ' + pad(c.now.getMinutes()) + ' : ' + pad(c.now.getSeconds());
    return c;
};

// draw a clock to a canvas
var drawClockText = function (canvas, ctx, clock) {
    ctx.lineWidth = 1;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.font = '20px arial';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(clock.timeText, canvas.width / 2, canvas.height / 2);
    ctx.strokeText(clock.timeText, canvas.width / 2, canvas.height / 2);
};

// loop
var loop = function (canvas) {
    var clock = getClock(new Date());
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawClockText(canvas, ctx, clock);
};

// create and append canvas element, and get 2d context
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
// set width and height
canvas.width = 320;
canvas.height = 240;

// start loop
loop(canvas);
setInterval(function () {
    loop(canvas);
}, 1000);
