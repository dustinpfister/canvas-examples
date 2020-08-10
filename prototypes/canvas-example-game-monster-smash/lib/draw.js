var draw = (function () {
    return {
        // draw background
        back: function (ctx, canvas) {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },

        // draw a map
        map: function (ctx, map) {
            var cs = map.cellSize,
            i = 0,
            x,
            y,
            len = map.cells.length,
            cell;
            ctx.fillStyle = 'green';
            while (i < len) {
                cell = map.cells[i];
                x = map.margin.x + cell.x * cs;
                y = map.margin.y + cell.y * cs;
                ctx.beginPath();
                ctx.rect(x, y, 32, 32);
                ctx.fill();
                ctx.stroke();
                i += 1;
            }
        }
    }
}
    ());
