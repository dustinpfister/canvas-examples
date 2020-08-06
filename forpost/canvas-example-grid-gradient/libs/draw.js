var draw = {};

// draw background
draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

// draw Cells
draw.cells = function (ctx, grid, xOffset, yOffset) {
    xOffset = xOffset === undefined ? 0 : xOffset;
    yOffset = yOffset === undefined ? 0 : yOffset;
    var ci = 0,
    cell,
    c,
    cLen = grid.cells.length;
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'black';
    while (ci < cLen) {
        cell = grid.cells[ci];
        c = cell.color;
        ctx.fillStyle = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + c[3] + ')';
        ctx.beginPath();
        ctx.rect(
            cell.x * grid.cellWidth + xOffset,
            cell.y * grid.cellHeight + yOffset,
            grid.cellWidth, grid.cellHeight);
        ctx.stroke();
        ctx.fill();
        ci += 1;
    }
};

// draw info
draw.info = function (ctx, canvas, grid) {
    ctx.fillStyle = 'grey';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.font = '15px courier';
    ctx.fillText('v' + grid.ver, 10, canvas.height - 20);
};
