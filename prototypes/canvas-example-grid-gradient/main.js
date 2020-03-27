
var canvas = document.getElementById('thecanvas'),
ctx = canvas.getContext('2d');
canvas.width = 640;
canvas.height = 480
ctx.translate(0.5, 0.5);

var grid = new Grid({
        cellWidth: canvas.width / 32,
        cellHeight: canvas.height / 24,
        gridWidth: 32,
        gridHeight: 24
    });

var loop = function () {
    requestAnimationFrame(loop);
    grid.update();
    draw.back(ctx, canvas);
    draw.cells(ctx, grid);

};

loop();
