var drawClockText = function (clock, canvas, ctx, x, y) {
    ctx.lineWidth = 1;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.font = '40px courier';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(clock.timeText, x + 0.5, y + 0.5);
    ctx.strokeText(clock.timeText, x + 0.5, y + 0.5);
};

// create and append canvas element, and get 2d context
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
// set width and height
canvas.width = 640;
canvas.height = 240;

console.log(clock.figMoney(101.5))

var loop = function () {
    requestAnimationFrame(loop);
    var c = clock.get(new Date());
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawClockText(c, canvas, ctx, canvas.width / 2, canvas.height / 2);
};
loop();
