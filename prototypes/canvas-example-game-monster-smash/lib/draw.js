var draw = (function () {

    var unitColors = ['blue', 'red'];

    return {
        // draw background
        back: function (sm) {
            var canvas = sm.canvas,
            ctx = sm.ctx;
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },

        // draw a map
        map: function (sm) {
            var canvas = sm.canvas,
            ctx = sm.ctx,
            map = sm.game.maps[sm.game.mapIndex];

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

                ctx.fillStyle = 'green';
                ctx.beginPath();
                ctx.rect(x, y, 32, 32);
                ctx.fill();
                ctx.stroke();

                if (cell.unit) {

                    ctx.fillStyle = unitColors[cell.unit.sheetIndex];
                    ctx.beginPath();
                    ctx.rect(x, y, 32, 32);
                    ctx.fill();
                    ctx.stroke();

                }

                i += 1;
            }
        }
    }
}
    ());
