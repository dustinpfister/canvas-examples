var draw = (function () {

    var CELL_VALUES = {
        sx: 32,
        sy: 32,
        size: 32
    };

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
                x = cell.x * CELL_VALUES.size + CELL_VALUES.sx;
                y = cell.y * CELL_VALUES.size + CELL_VALUES.sy;
                ctx.fillRect(x, y, CELL_VALUES.size, CELL_VALUES.size);
            }
        }
    }
}
    ());
