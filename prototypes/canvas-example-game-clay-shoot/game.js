var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    return {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
};

var drawPoints = function (ctx, points, close) {
    var i = 2,
    len = points.length;
    ctx.beginPath();
    ctx.moveTo(points[0], points[1]);
    while (i < len) {
        ctx.lineTo(points[i], points[i + 1]);
        i += 2;
    }
    if (close) {
        ctx.closePath();
    }
    ctx.stroke();

};

var getDiscPath = function (opt) {
    opt = opt || {};
    opt.canvas = opt.canvas === undefined ? {
        width: 320,
        height: 240
    }
     : opt.canvas;
    opt.leftSize = opt.sr === undefined ? true : false;
    opt.angleMax = 20;
    opt.angleMin = 70;
    opt.anglePer = opt.anglePer === undefined ? 1 : opt.anglePer;
    opt.pointCount = 50;
    var sx = opt.leftSize ? 0 : opt.canvas.width,
    sy = opt.canvas.height,
    i = 0,
    x,
    y,
    points = [],
    angleDelta = (opt.angleMax - opt.angleMin) * opt.anglePer;
    while (i < opt.pointCount) {
        var a = (opt.angleMin + angleDelta / opt.pointCount * i),
        mr = Math.PI / 180 * opt.angleMin,
        sr = opt.leftSize ? Math.PI * 2 - mr : Math.PI + mr,
        d = opt.leftSize ? 1 : -1,
        r = sr + a / 90 * (Math.PI * 2) * d;
        x = Math.cos(r) * canvas.width,
        y = Math.sin(r) * canvas.height,
        points.push(x, y);
        i += 1;
    }
    return points;
};

var p = getDiscPath();
console.log(p);
ctx.fillStyke = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = 'red';
drawPoints(ctx, p, false);
