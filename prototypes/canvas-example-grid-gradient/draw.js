var draw = {};

// draw Cells
draw.cells = function (ctx, grid) {
    var ci = 0,
    cell,
    c,
    cLen = grid.cells.length;
    ctx.lineWidth = 3;
    while (ci < cLen) {
        cell = grid.cells[ci];
        c = cell.color;
        ctx.fillStyle = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + c[3] + ')';
        ctx.beginPath();
        ctx.rect(
            cell.x * grid.cellWidth,
            cell.y * grid.cellHeight,
            grid.cellWidth, grid.cellHeight);
        //ctx.stroke();
        ctx.fill();
        ci += 1;
    }
};
