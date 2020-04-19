var draw = (function () {

    return {
        // draw background
        back: function (ctx, canvas) {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },

        worldCells: function (ctx, state) {
            var i = state.cells.length,
            x,
            y,
            r,
            g,
            b,
            per,
            cell;
            while (i--) {
                cell = state.cells[i];
                per = 1 - (cell.land.fert / 10);
                r = Math.floor(100 + 100 * per);
                g = Math.floor(75 + 75 * per);
                b = Math.floor(25 + 25 * per);
                ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ',1)';
                x = cell.x * world.CELL_VALUES.size + world.CELL_VALUES.sx;
                y = cell.y * world.CELL_VALUES.size + world.CELL_VALUES.sy;
                ctx.fillRect(x, y, world.CELL_VALUES.size, world.CELL_VALUES.size);
            }
        }

    }
}
    ());
