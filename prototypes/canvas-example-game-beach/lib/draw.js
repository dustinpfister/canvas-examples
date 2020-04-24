var draw = {};

draw.back = function (ctx, canvas) {
    ctx.fillStyke = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

draw.cells = function (ctx, state) {
    var i = state.cells.length,
    colors = ['blue', 'yellow', 'green'],
    cell;
    while (i--) {
        cell = state.cells[i];
        ctx.fillStyle = colors[cell.areaType];
        ctx.fillRect(cell.x * 16, cell.y * 16, 16, 16);
    }
};
