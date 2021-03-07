// create a canvas
var canvasObj = utils.createCanvas({ width: 640, height: 480}),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;
// create a pm object
var pm = PM.create({
        modesList:'dir32,dir16,dir12,dir8,dir4,dir360,dir1440,fine'.split(','),
        longDownTime: 1,
        distMin: 32,
        distMax: 128,
        maxPPS: 512
    });
// a point
var pt = {
    x: 0,
    y: 0
};
// loop
var lt = new Date();
var loop = function () {
    var now = new Date(),
    t = now - lt,
    secs = t / 1000;
    requestAnimationFrame(loop);
    PM.update(pm, secs);

    PM.stepPointByPM(pm, pt, secs);

    draw.background(pm, ctx, canvas, 'black');
    draw.PTGridlines(pt, ctx, canvas);
    draw.navCircle(pm, ctx, canvas);
    draw.debugInfo(pm, pt, ctx, canvas);
    draw.ver(ctx, pm);
    lt = now;
};
loop();

canvas.addEventListener('mousedown', PM.onPointerStart(pm) );
canvas.addEventListener('mousemove', PM.onPointerMove(pm) );
canvas.addEventListener('mouseup', PM.onPointerEnd(pm) );
canvas.addEventListener('touchstart', PM.onPointerStart(pm) );
canvas.addEventListener('touchmove', PM.onPointerMove(pm) );
canvas.addEventListener('touchend', PM.onPointerEnd(pm) );
// mouse out and touch cancel will also fire an end pointer event
canvas.addEventListener('mouseout', PM.onPointerEnd(pm) );
canvas.addEventListener('touchcancel', PM.onPointerEnd(pm) );
