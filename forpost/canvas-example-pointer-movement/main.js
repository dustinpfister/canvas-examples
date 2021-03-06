var canvasObj = utils.createCanvas({ width: 640, height: 480}),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;

var pm = PM.newPM({
        maxPPS: 256
    });

// a point
var pt = {
    x: 0,
    y: 0
};

var lt = new Date();
var loop = function () {
    var now = new Date(),
    t = now - lt,
    secs = t / 1000;
    requestAnimationFrame(loop);
    PM.updatePM(pm);

    PM.stepPointByPM(pm, pt, secs);

    draw.background(pm, ctx, canvas);
    draw.PTGridlines(pt, ctx, canvas);
    draw.navCircle(pm, ctx, canvas);
    draw.debugInfo(pm, pt, ctx, canvas);
    draw.ver(ctx, pm);
    lt = now;
};
loop();

canvas.addEventListener('mousedown', function (e) {
    PM.onPointerStart(pm, e);
});
canvas.addEventListener('mousemove', function (e) {
    PM.onPointerMove(pm, e);
});
canvas.addEventListener('mouseup', function (e) {
    PM.onPointerEnd(pm, e);
});
canvas.addEventListener('touchstart', function (e) {
    PM.onPointerStart(pm, e);
});
canvas.addEventListener('touchmove', function (e) {
    PM.onPointerMove(pm, e);
});
canvas.addEventListener('touchend', function (e) {
    PM.onPointerEnd(pm, e);
});
