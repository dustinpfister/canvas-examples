var utils = {};
utils.logPer = function (per, a, b) {
    a = a === undefined ? 2 : a;
    b = b === undefined ? a : b;
    per = per < 0 ? 0 : per;
    per = per > 1 ? 1 : per;
    return Math.log((1 + a - 2) + per) / Math.log(b);
};
utils.createLogPerPoints = function (a, b, sx, sy, w, h, len) {
    var points = [],
    i = 0,
    x,
    y,
    per;
    while (i < len) {
        per = i / len;
        x = sx + w / (len - 1) * i;
        y = sy + h - utils.logPer(per, a, b) * h;
        points.push({
            x: x,
            y: y
        });
        i += 1;
    }
    return points;
};

var drawPoints = function (points) {
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    var i = 1;
    while (i < points.length) {
        ctx.lineTo(points[i].x, points[i].y);
        i += 1;
    }
    ctx.stroke();
};

var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var a = 2,
b = 10,
maxHigh = 5,
bias, per,
i = 0,
box = {
    x: 60,
    y: 20,
    w: 200,
    h: 200
};
var loop = function () {

    var points = utils.createLogPerPoints(a, b, box.x, box.y, box.w, box.h, 100);

    requestAnimationFrame(loop);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'grey';
    ctx.fillRect(box.x, box.y, box.w, box.h);
    ctx.strokeStyle = 'red';

    drawPoints(points);

    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.fillText('a: ' + a.toFixed(2), 10, 10);

    i += 1;
    i %= 1000;
    per = i / 1000;
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    a = 2 + 3 * bias;
    b = a;
};

loop();
