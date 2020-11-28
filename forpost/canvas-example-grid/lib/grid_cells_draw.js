var draw = {};

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