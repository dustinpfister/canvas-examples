var drawMap = function (grid, ctx, canvas, pxRatio) {
    var colors = ['yellow', 'green'],
    cellSize = grid.cellSize || 10,
    x,
    y,
    xOffset = grid.xOffset,
    yOffset = grid.yOffset;

    pxRatio = pxRatio || 1;
    cellSize = cellSize * pxRatio;

    grid.cells.forEach(function (cell) {
        ctx.fillStyle = colors[cell.type] || 'white';
        x = cell.x * cellSize + xOffset * pxRatio;
        y = cell.y * cellSize + yOffset * pxRatio;
        ctx.fillRect(x, y, cellSize, cellSize);
        ctx.strokeStyle = 'white';
        ctx.strokeRect(x, y, cellSize, cellSize);
    });

    if (grid.selectedCellIndex > -1) {
        ctx.strokeStyle = 'red';
        var cell = grid.cells[grid.selectedCellIndex],
        x = cell.x * cellSize + xOffset * pxRatio;
        y = cell.y * cellSize + yOffset * pxRatio;
        ctx.strokeStyle = 'red';
        ctx.strokeRect(x, y, cellSize, cellSize);
    }
};
