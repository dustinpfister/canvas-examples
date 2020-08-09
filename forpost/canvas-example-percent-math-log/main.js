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

var draw = {};

draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

draw.box = function (ctx, box) {
    ctx.fillStyle = 'grey';
    ctx.fillRect(box.x, box.y, box.w, box.h);
    ctx.strokeStyle = 'red';
};

draw.points = function (ctx, points) {
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
draw.currentPoint = function (ctx, state) {
    var cp = state.currentPoint;
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.arc(cp.x, cp.y, 5, 0, Math.PI * 2);
    ctx.stroke();

};
draw.info = function (ctx, state) {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.fillText('v' + state.ver, 10, 10);
    ctx.fillText('a: ' + state.a.toFixed(2), 10, 20);

};

var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var state = {
    ver: '0.1.0',
    points: [],
    a: 2,
    b: 10,
    maxHigh: 5,
    bias: 0,
    per: 0,
    i: 0,
    currentPoint: {},
    box: {
        x: 60,
        y: 20,
        w: 200,
        h: 200
    }
};

state.points = utils.createLogPerPoints(state.a, state.b, state.box.x, state.box.y, state.box.w, state.box.h, 100);

var update = function (state) {

    state.i += 1;
    state.i %= 120;
    state.per = state.i / 120;
    state.bias = 1 - Math.abs(0.5 - state.per) / 0.5;
    //state.a = 2 + 3 * state.bias;
    //state.b = state.a;
};

var loop = function () {

    requestAnimationFrame(loop);
    state.currentPoint = state.points[Math.floor(state.bias * (state.points.length - 1))];

    draw.back(ctx, canvas);
    draw.box(ctx, state.box);

    draw.points(ctx, state.points);
    draw.currentPoint(ctx, state);
    draw.info(ctx, state);

    update(state);
};

loop();
