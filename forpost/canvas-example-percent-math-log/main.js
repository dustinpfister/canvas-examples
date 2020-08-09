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
    per,
    logPer;
    while (i < len) {
        per = i / len;
        logPer = utils.logPer(per, a, b);
        x = sx + w / (len - 1) * i;
        y = sy + h - logPer * h;
        points.push({
            x: x,
            y: y,
            per: per,
            logPer: logPer,
            perY: sy + h - h * per
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

draw.box = function (ctx, box, style) {
    ctx.fillStyle = style || 'grey';
    ctx.strokeStyle = '#afafaf';
    ctx.beginPath();
    ctx.rect(box.x, box.y, box.w, box.h);
    ctx.fill();
    ctx.stroke();
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
draw.logPerPoints = function (ctx, state) {
    draw.box(ctx, state.backBox);
    draw.points(ctx, state.points);
    ctx.strokeStyle = 'lime';
    draw.points(ctx, state.points.map(function (point) {
            return {
                x: point.x,
                y: point.perY
            }
        }));
    draw.currentPoints(ctx, state);
};
draw.currentPoints = function (ctx, state) {
    var cp = state.currentPoint;
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.arc(cp.x, cp.y, 5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cp.x, cp.perY, 5, 0, Math.PI * 2);
    ctx.stroke();

};
draw.info = function (ctx, state) {
    var cp = state.currentPoint;
    ctx.fillStyle = 'rgba(255,255,255,1)';
    ctx.textBaseline = 'top';
    ctx.fillText('v' + state.ver, 10, 10);
    ctx.fillText('a: ' + state.a.toFixed(2) + ', b: ' + state.b.toFixed(2), 10, 20);
    ctx.fillText('current: ' + Math.floor(cp.x) + ',' + Math.floor(cp.y), 10, 30);
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
    a: 2.5,
    b: 3,
    maxHigh: 5,
    bias: 0,
    per: 0,
    i: 0,
    currentPoint: {},
    backBox: {
        x: 60,
        y: 20,
        w: 200,
        h: 200
    },
    boxPer: {
        x: 0,
        y: 0,
        w: 32,
        h: 32,
        heading: 0,
        pps: 0
    },
    boxLogPer: {
        x: 0,
        y: 32,
        w: 32,
        h: 32,
        heading: 0,
        pps: 0
    }
};

state.points = utils.createLogPerPoints(state.a, state.b, state.backBox.x, state.backBox.y, state.backBox.w, state.backBox.h, 100);

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
    draw.logPerPoints(ctx, state);
    draw.box(ctx, state.boxLogPer, 'red');
    draw.box(ctx, state.boxPer, 'lime');
    draw.info(ctx, state);

    update(state);
};

loop();
