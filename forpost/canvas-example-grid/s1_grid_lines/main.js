// GRID
var Grid = function (opt) {
    opt = opt || {};
    this.xOffset = opt.xOffset === undefined ? 5 : opt.xOffset;
    this.yOffset = opt.yOffset === undefined ? 5 : opt.yOffset;
    this.cellSize = opt.cellSize === undefined ? 32 : opt.cellSize;
    this.cellWidth = opt.cellWidth || 7;
    this.cellHeight = opt.cellHeight || 6;
};

// draw grid lines method
var drawGridLines = function (ctx, grid, style) {
    var x,
    y,
    cx = 0,
    cy = 0;
    ctx.strokeStyle = style || 'red';
    while (cy < grid.cellHeight + 1) {
        y = cy * grid.cellSize + grid.yOffset + 0.5;
        x = grid.xOffset + 0.5;
        ctx.beginPath();
        ctx.moveTo(x, y);
        x = grid.xOffset + grid.cellSize * grid.cellWidth + 0.5;
        ctx.lineTo(x, y);
        ctx.stroke();
        cy += 1;
    }
    while (cx < grid.cellWidth + 1) {
        y = grid.yOffset + 0.5;
        x = cx * grid.cellSize + grid.xOffset + 0.5;
        ctx.beginPath();
        ctx.moveTo(x, y);
        y = grid.yOffset + grid.cellSize * grid.cellHeight + 0.5;
        ctx.lineTo(x, y);
        ctx.stroke();
        cx += 1;
    }
};

// SETUP CANVAS
(function () {
    // create and append canvas element, and get 2d context
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.getElementById('gamearea') || document.body;
    container.appendChild(canvas);
    // set width and height
    canvas.width = 320;
    canvas.height = 240;

    // creating a grid instance
    var grid = new Grid({
            xOffset: 15,
            yOffset: 25,
            cellSize: 32,
            cellWidth: 9
        });

    // fill black
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw grid lines
    drawGridLines(ctx, grid, 'orange');
}
    ());
