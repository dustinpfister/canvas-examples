
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var pm = PM.newPM();

// a point
var pt = {
    x: 0,
    y: 0
};


var loop = function () {
    requestAnimationFrame(loop);
    PM.updatePM(pm);
    PM.stepPointByPM(pm, pt);
    draw.background(pm, ctx, canvas);
    draw.navCircle(pm, ctx, canvas);
    draw.debugInfo(pm, pt, ctx, canvas);
    draw.PTGridlines(pt, ctx, canvas);
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
