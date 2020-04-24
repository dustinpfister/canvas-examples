var draw = (function () {

    var api = {};

    api.back = function (ctx, canvas) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    api.cells = function (ctx, state) {
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

    var drawPool = function (ctx, state, poolName) {

        var i = state.pool[poolName].length,
        colors = {
            player: 'purple',
            enemy: 'red'
        },
        cellSize = game.GRID.cellSize;
        while (i--) {
            disp = state.pool[poolName][i];
            ctx.fillStyle = colors[poolName];
            ctx.fillRect(disp.x * cellSize, disp.y * cellSize, cellSize, cellSize);
        }

    };

    api.units = function (ctx, state) {
        drawPool(ctx, state, 'player');
        drawPool(ctx, state, 'enemy');
    };

    return api;

}
    ());
