var utils = {};
utils.logPer = function (per, high) {
    high = high === undefined ? 2 : high;
    per = per < 0 ? 0 : per;
    per = per > 1 ? 1 : per;
    return Math.log((1 + high - 2) + per) / Math.log(high);
};

var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

ctx.fillRect(0, 0, canvas.width, canvas.height);

var i = 0,
x, y, per,
high = 2,
len = 50;

ctx.beginPath();
ctx.lineWidth = 3;
while (i < len) {
    per = i / len;
    x = canvas.width / (len-1) * i;
    y = canvas.height - utils.logPer(per, high) * canvas.height;
    if (i === 0) {
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
    }
    i += 1;
}
ctx.strokeStyle = 'red';
ctx.stroke();
