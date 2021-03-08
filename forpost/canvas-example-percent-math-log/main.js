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


var demo = {};

demo.createState = function (canvas) {
    var state = {
        ver: '0.1.1',
        canvas: canvas,
        points: [],
        a: 2.2,
        b: 2.5,
        maxHigh: 5,
        bias: 0,
        per: 0,
        i: 0,
        iMax: 250,
        IPS: 10,
        lt: new Date(),
        FPS: 30,
        currentPoint: {},
        backBox: {
            x: 60,
            y: 20,
            w: 200,
            h: 200
        },
        boxPer: {
            x: 0,
            y: 64,
            w: 32,
            h: 32,
            heading: 0,
            pps: 0
        },
        boxLogPer: {
            x: 0,
            y: 128,
            w: 32,
            h: 32,
            heading: 0,
            pps: 0
        }
    };
    state.points = utils.createLogPerPoints(state.a, state.b, state.backBox.x, state.backBox.y, state.backBox.w, state.backBox.h, 100);
    return state;
};

demo.update = function (state, secs) {

    var cp = state.currentPoint;
    state.i += state.IPS * secs;
    state.i %= state.iMax;
    state.per = state.i / state.iMax;
    state.bias = 1 - Math.abs(0.5 - state.per) / 0.5;
    state.boxLogPer.pps = 512 * cp.logPer;
    state.boxPer.pps = 512 * cp.per;
    //state.boxLogPer.heading = state.boxPer.heading = Math.PI / 20 * state.bias;
    demo.moveBox(state.boxLogPer, state, secs);
    demo.moveBox(state.boxPer, state, secs);
};

demo.moveBox = function (box, state, secs) {
    if (box.x > canvas.width + box.w) {
        box.x = box.w * -1;
    }
    if (box.x < box.w * -1) {
        box.x = canvas.width + box.w;
    }
    if (box.y > canvas.height + box.h) {
        box.y = box.h * -1;
    }
    if (box.y < box.h * -1) {
        box.y = canvas.height + box.h;
    }
    box.x += Math.cos(box.heading) * box.pps * secs;
    box.y += Math.sin(box.heading) * box.pps * secs;
};


var canvasObj = utils.createCanvas(),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;

var state = demo.createState(canvas);
var loop = function () {

    var now = new Date(),
    t = now - state.lt,
    secs = t / 1000;

    requestAnimationFrame(loop);

    if (t >= 1000 / state.FPS) {
        state.currentPoint = state.points[Math.floor(state.bias * (state.points.length - 1))];
        draw.back(ctx, canvas);
        draw.logPerPoints(ctx, state);
        draw.box(ctx, state.boxLogPer, 'red');
        draw.box(ctx, state.boxPer, 'lime');
        draw.info(ctx, state);
        demo.update(state, secs);
        state.lt = now;
    }
};

loop();
