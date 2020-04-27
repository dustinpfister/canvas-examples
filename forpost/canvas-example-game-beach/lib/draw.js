var draw = (function () {

    var api = {};

    api.back = function (ctx, canvas, op) {
        ctx.fillStyle = 'rgba(0,0,0,' + op + ')';
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

    // old simple draw pool method
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

    // draw turrets method
    var drawTurrets = function (ctx, state) {
        var i = state.pool.player.length,
        tur,
        cellSize = game.GRID.cellSize;
        while (i--) {
            tur = state.pool.player[i];
            ctx.fillStyle = 'pink';
            ctx.save();
            ctx.translate((tur.x + 0.5) * cellSize, (tur.y + 0.5) * cellSize);
            ctx.rotate(tur.h);
            ctx.beginPath();
            ctx.moveTo(6, 0);
            ctx.lineTo(6 * -1, 6 * -1);
            ctx.lineTo(6 * -1, 6);
            ctx.fill();
            ctx.restore();

            // attack range
            ctx.strokeStyle = 'rgba(255,255,255,0.5)';
            ctx.beginPath();
            ctx.arc((tur.x + 0.5) * cellSize, (tur.y + 0.5) * cellSize, tur.attackRange * cellSize, 0, Math.PI * 2);
            ctx.stroke();

            // info
            ctx.fillStyle = 'white';
            ctx.textBaseline = 'top';
            ctx.font = '8px arial';
            ctx.fillText(tur.killLevel.level, tur.x * cellSize, tur.y * cellSize);
        }

    };

    api.units = function (ctx, state) {
        drawPool(ctx, state, 'enemy');
        drawPool(ctx, state, 'player');
        drawTurrets(ctx, state);
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
        while (i--) {
            blast = state.pool.blasts[i];
            var per = blast.secs / blast.secsMax;
            per = per > 1 ? 1 : per;
            ctx.beginPath();
            ctx.fillStyle = 'rgba(255,128,0,' + (0.6 - (0.55 * per)) + ')';
            ctx.arc(blast.x * cellSize, blast.y * cellSize, blast.radius * cellSize * per, 0, Math.PI * 2);
            ctx.fill();
        }
    };

    // basic info that I would want no matter what
    api.info = function (ctx, state, yi) {
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'top';
        ctx.font = '10px arial';
        ctx.fillText('kills: ' + state.kills, 10, 10 * yi);
    };

    api.debugInfoTurrets = function (ctx, state, yi, op) {
        var i = state.pool.player.length;
        ctx.fillStyle = 'rgba(255,255,255,' + op + ')';
        ctx.textBaseline = 'top';
        ctx.font = '10px arial';
        ctx.lineWidth = 1;
        while (i--) {
            var tur = state.pool.player[i];
            if (tur) {
                var kl = tur.killLevel,
                text = i + ') turret: { ' +
                    'k: ' + tur.kills + ',' +
                    'kl: ' + kl.level + ',' +
                    //'killsToNext: ' + kl.toNext +
                    'a: ' + tur.attack + ',' +
                    'ar: ' + tur.attackRange  +
                    '}';
                ctx.fillText(text, 10, 10 * (yi + i));
            }
        }
    };

    return api;

}
    ());
