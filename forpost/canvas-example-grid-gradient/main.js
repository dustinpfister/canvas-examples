
var canvas = document.getElementById('thecanvas'),
ctx = canvas.getContext('2d');
canvas.width = 640;
canvas.height = 480
    ctx.translate(0.5, 0.5);

var w = 24,
h = 12;
var grad = new gradient.Grid({
        cellWidth: canvas.width / w,
        cellHeight: canvas.height / h,
        gridWidth: w,
        gridHeight: h,
        initMethod: ['random', 'rgb'],
        MIN_RADIUS: 3,
        MAX_RADIUS: 7,
        MAX_CPS: 5,
        objCount: 10
    });

var loop = function () {
    requestAnimationFrame(loop);
    grad.update();
    draw.back(ctx, canvas);
    draw.cells(ctx, grad);

};

loop();
