var genSheets = (function () {

    var createSheet = function (cellSize, cw, ch) {
        var sheet = {},
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = cellSize * cw;
        canvas.height = cellSize * ch;
        ctx.translate(0.5, 0.5);
        sheet.canvas = canvas;
        sheet.ctx = ctx;
        sheet.cellWidth = cw;
        sheet.cellHeight = ch;
        sheet.cellSize = cellSize;
        return sheet;
    };

    var sheets = [];

    var sheet = createSheet(32, 10, 1),
    canvas = sheet.canvas,
    ctx = sheet.ctx;

    ctx.fillStyle = '#008800';
    ctx.fillRect(-1, -1, canvas.width + 1, canvas.height + 1);
    ctx.strokeStyle = 'lime';
    var i = 0,
    s;
    while (i < sheet.cellWidth) {
        ctx.save();
        ctx.translate(16 + 32 * i, 16);
        s = 28 - 14 * (i / sheet.cellWidth);
        ctx.beginPath();
        ctx.rect(-14, -14, s, s);
        ctx.stroke();
        ctx.restore();
        i += 1;
    }

    sheets.push(sheet);
    return {
        sheets: sheets
    };

}
    ());
