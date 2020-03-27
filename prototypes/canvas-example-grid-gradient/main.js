
var canvas = document.getElementById('thecanvas'),
ctx = canvas.getContext('2d');
canvas.width = 640;
canvas.height = 480
ctx.translate(0.5, 0.5);


var w = 32,
h = 24;
var grad = new gradient.Grid({
        cellWidth: canvas.width / w,
        cellHeight: canvas.height / h,
        gridWidth: w,
        gridHeight: h
    });

var loop = function () {
    requestAnimationFrame(loop);
    grad.update();
    draw.back(ctx, canvas);
    draw.cells(ctx, grad);

};

loop();
