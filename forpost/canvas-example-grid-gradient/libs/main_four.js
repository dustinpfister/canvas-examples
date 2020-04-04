
var canvas = document.getElementById('thecanvas'),
ctx = canvas.getContext('2d');
canvas.width = 640;
canvas.height = 480;
ctx.translate(0.5, 0.5);

var w = 16,
h = 16;
var grad = new gradient.Grid({
        cellWidth: 160 / w,
        cellHeight: 160 / h,
        gridWidth: w,
        gridHeight: h,
        initMethod: ['random', 'rgb', 'updatersStager'],
        MIN_RADIUS: 3,
        MAX_RADIUS: 7,
        MAX_CPS: 5,
        objCount: 15
    });

var lt = new Date(),
target_fps = 12;
var loop = function () {
    var now = new Date(),
    t = now - lt;
    requestAnimationFrame(loop);
    if (t > 1000 / target_fps) {
        grad.update();
        draw.back(ctx, canvas);
        draw.cells(ctx, grad, 50, 50);
        lt = now;
    }
};

loop();
