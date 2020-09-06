var draw = (function () {
    return {
        // draw background
        back: function (ctx, canvas) {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },
        pool: function (sm, poolName, fill) {
            var pool = sm.game[poolName],
            unit,
            i = pool.length;
            while (i--) {
                unit = pool[i];
                if (unit.active) {
                    ctx.fillStyle = fill || 'white';
                    ctx.fillRect(unit.x, unit.y, unit.w, unit.h);
                }
            }
        },
        // draw a map
        map: function (sm) {
            var canvas = sm.canvas,
            ctx = sm.ctx,
            map = sm.game.map;
            var cs = map.cellSize,
            i = 0,
            x,
            y,
            len = map.cells.length,
            cell;
            while (i < len) {
                cell = map.cells[i];
                x = map.margin.x + cell.x * cs;
                y = map.margin.y + cell.y * cs;
                // draw cell
                ctx.fillStyle = '#008800';
                ctx.strokeStyle = '#005500';
                ctx.beginPath();
                ctx.rect(x, y, 32, 32);
                ctx.fill();
                ctx.stroke();
                i += 1;
            }
        },
        // draw pointer cursor
        cursor: function (sm) {
            var ctx = sm.ctx;
            ctx.strokeStyle = 'lime';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(sm.input.pos.x, sm.input.pos.y, 5, 0, Math.PI * 2);
            ctx.stroke();
        },
        //draw version number
        ver: function (sm) {
            var ctx = sm.ctx;
            ctx.fillStyle = 'lime';
            ctx.textBaseline = 'top';
            ctx.font = '10px arial';
            ctx.fillText('v' + sm.ver, 2, sm.canvas.height - 12);
        }
    }
}
    ());
