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
            if (disp.hp != undefined) {
                var per = disp.hp / disp.hpMax;
                ctx.fillStyle = 'lime';
                ctx.fillRect(disp.x * cellSize, disp.y * cellSize, cellSize * per, cellSize / 4);
            }
        }
    };

    api.units = function (ctx, state) {
        drawPool(ctx, state, 'player');
        drawPool(ctx, state, 'enemy');
    };

    api.shots = function (ctx, state) {
        var i = state.pool.shots.length,
        cellSize = game.GRID.cellSize,
        shot;
        ctx.fillStyle = 'white';
        while (i--) {
            shot = state.pool.shots[i];
            ctx.beginPath();
            ctx.arc(shot.x * cellSize, shot.y * cellSize, 2, 0, Math.PI * 2);
            ctx.fill();
        }
    };

    api.blasts = function (ctx, state) {
        var i = state.pool.blasts.length,
        cellSize = game.GRID.cellSize,
        blast;
        ctx.fillStyle = 'rgba(255,255,0,0.3)';
        while (i--) {
            blast = state.pool.blasts[i];
            ctx.beginPath();
            ctx.arc(blast.x * cellSize, blast.y * cellSize, blast.radius * cellSize, 0, Math.PI * 2);
            ctx.fill();
        }
    };

    api.info = function (ctx, state) {

        ctx.fillStyle = 'white';
        ctx.textBaseline = 'top';
        ctx.font = '10px arial';
        ctx.fillText('kills: ' + state.kills, 10, 10);

    };

    return api;

}
    ());
