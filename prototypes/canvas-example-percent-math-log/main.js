var utils = {};
utils.logPer = function (per, high) {
    high = high === undefined ? 2 : high;
    per = per < 0 ? 0 : per;
    per = per > 1 ? 1 : per;
    return Math.log((1 + high - 2) + per) / Math.log(high);
};
utils.createLogPerPoints = function (high, w, h, len) {
    high = high === undefined ? 2 : high;
    w = w === undefined ? 320 : w;
    h = h === undefined ? 240 : h;
    len = len === undefined ? 50 : len;
    var points = [],
    i = 0,
    x,
    y,
    per;
    while (i < len) {
        per = i / len;
        x = w / (len - 1) * i;
        y = h - utils.logPer(per, high) * h;
        points.push({
            x: x,
            y: y
        });
        i += 1;
    }
    return points;
};

var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

ctx.fillRect(0, 0, canvas.width, canvas.height);

var points = utils.createLogPerPoints(2, canvas.width, canvas.height, 100);

ctx.strokeStyle = 'red';
ctx.lineWidth = 3;
ctx.moveTo(points[0].x, points[0].y);
var i = 1;
while (i < points.length) {
    ctx.lineTo(points[i].x, points[i].y);
    i += 1;
}
ctx.stroke();

