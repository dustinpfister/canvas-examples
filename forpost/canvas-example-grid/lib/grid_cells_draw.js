var draw = {};

draw.back = function(ctx, canvas){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

// draw Cell Lines
draw.cells = function (ctx, grid, style) {
    var ci = 0,
    cell,
    cLen = grid.cells.length;
    ctx.strokeStyle = style || 'red';
    while (ci < cLen) {
        cell = grid.cells[ci];
        ctx.strokeRect(
            cell.x * grid.cellSize + grid.xOffset + 0.5,
            cell.y * grid.cellSize + grid.yOffset + 0.5,
            grid.cellSize, grid.cellSize)
        ci += 1;
    }
};

draw.ver = function(ctx, grid){
    ctx.fillStyle = 'white';
    ctx.textBaseline  = 'top';
    ctx.font = '10px arial';
    ctx.fillText('v' + grid.ver, 5, grid.canvas.height - 15);
};