
var canvas = document.getElementById('thecanvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var grid = new Grid({
        cellWidth: canvas.width / 30,
        cellHeight: canvas.height / 20,
        gridWidth: 30,
        gridHeight: 20
    });

var loop = function () {
    requestAnimationFrame(loop);
    grid.update();
    draw.back(ctx, canvas);
    draw.cells(ctx, grid);

};

loop();
