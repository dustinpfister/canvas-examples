// GRID
var Grid = function (opt) {
    opt = opt || {};
    this.xOffset = opt.xOffset === undefined ? 5 : opt.xOffset;
    this.yOffset = opt.yOffset === undefined ? 5 : opt.yOffset;
    this.cellSize = opt.cellSize === undefined ? 32 : opt.cellSize;
    this.cellWidth = opt.cellWidth || 7;
    this.cellHeight = opt.cellHeight || 6;
};

// Draw a grid Axis
var drawGridAxis = function (ctx, grid, axis, style) {
    axis = axis || 'y';
    var otherAxis = axis === 'y' ? 'x' : 'y',
    ca = 0,
    caOffset = grid[axis + 'Offset'],
    oaOffset = grid[otherAxis + 'Offset'],
    caLen = grid['cell' + (axis === 'y' ? 'Height' : 'Width')],
    oaLen = grid['cell' + (axis === 'y' ? 'Width' : 'Height')],
    a1,
    a2;
    ctx.strokeStyle = style || 'green';
    while (ca < caLen + 1) {
        a1 = ca * grid.cellSize + caOffset + 0.5;
        a2 = oaOffset + 0.5;
        ctx.beginPath();
        if (axis === 'y') {
            ctx.moveTo(a2, a1);
        } else {
            ctx.moveTo(a1, a2)
        }
        a2 = oaOffset + grid.cellSize * oaLen + 0.5;
        if (axis === 'y') {
            ctx.lineTo(a2, a1);
        } else {
            ctx.lineTo(a1, a2)
        }
        ctx.stroke();
        ca += 1;
    }
};

// Now by drawGridLines method just calls 
// drawGridLines twice
var drawGridLines = function(ctx, grid, style){
    drawGridAxis(ctx, grid, 'y', style);
    drawGridAxis(ctx, grid, 'x', style);
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
    drawGridLines(ctx, grid, 'white');

}
    ());
