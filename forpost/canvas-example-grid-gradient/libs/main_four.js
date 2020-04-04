
var canvas = document.getElementById('thecanvas'),
ctx = canvas.getContext('2d');
canvas.width = 640;
canvas.height = 480;
ctx.translate(0.5, 0.5);

var w = 12,
h = 12;

var grad = new gradient.Grid({
        cellWidth: 160 / w,
        cellHeight: 160 / h,
        gridWidth: w,
        gridHeight: h,
        init: ['rgb', 'randomSpeed', 'randomHeading', 'randomPos'],
        updaters: ['radiusGrow'],
        MIN_RADIUS: 3,
        MAX_RADIUS: 7,
        MAX_CPS: 5,
        objCount: 4
    });

var grad2 = new gradient.Grid({
        cellWidth: 160 / w,
        cellHeight: 160 / h,
        gridWidth: w,
        gridHeight: h,
        init: ['random'],
        updaters: [],
        MIN_RADIUS: 3,
        MAX_RADIUS: 7,
        MAX_CPS: 5,
        objCount: 3
    });

var grad3 = new gradient.Grid({
        cellWidth: 160 / w,
        cellHeight: 160 / h,
        gridWidth: w,
        gridHeight: h,
        init: ['br'],
        updaters: ['br'],
        MIN_RADIUS: 3,
        MAX_RADIUS: 7,
        MAX_CPS: 5,
        objCount: 10
    });

var lt = new Date(),
target_fps = 12;
var loop = function () {
    var now = new Date(),
    t = now - lt;
    requestAnimationFrame(loop);
    if (t > 1000 / target_fps) {
        grad.update();
        grad2.update();
        grad3.update();
        draw.back(ctx, canvas);
        draw.cells(ctx, grad, 50, 50);
        draw.cells(ctx, grad2, 250, 50);
        draw.cells(ctx, grad3, 50, 250);
        lt = now;
    }
};

loop();
