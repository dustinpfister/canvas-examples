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
            cell;
            while (i--) {
                cell = state.cells[i];
                ctx.fillStyle = 'green';
                x = cell.x * world.CELL_VALUES.size + world.CELL_VALUES.sx;
                y = cell.y * world.CELL_VALUES.size + world.CELL_VALUES.sy;
                ctx.fillRect(x, y, world.CELL_VALUES.size, world.CELL_VALUES.size);
            }
        }

    }
}
    ());
