var draw = {};

draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

draw.cells = function (ctx, state) {
    var i = state.cells.length,
    colors = ['blue', 'yellow', 'green'],
    cellSize = game.GRID.cellSize,
    cell;
    while (i--) {
        cell = state.cells[i];
        ctx.fillStyle = colors[cell.areaType];
        ctx.fillRect(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize);
    }
};

draw.units = function (ctx, state) {

    var i = state.pool.player.length,
    colors = ['purple', 'red'],
    cellSize = game.GRID.cellSize;
    while (i--) {
        disp = state.pool.player[i];
        ctx.fillStyle = colors[0];
        ctx.fillRect(disp.x * cellSize, disp.y * cellSize, cellSize, cellSize);
    }

};
