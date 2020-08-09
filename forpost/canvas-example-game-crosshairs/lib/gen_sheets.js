var genSheets = (function () {

    var sheets = [];
    var sheet = {},
    canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 32 * 10;
    canvas.height = 32 * 1;
    ctx.translate(0.5, 0.5);

    sheet.canvas = canvas;
    sheet.cellType = {
        type: 'grass',
        i: 0
    };
    sheet.cellWidth = 10;
    sheet.cellHeight = 1;
    sheet.cellSize = 32;

    ctx.fillStyle = '#008800';
    ctx.fillRect(-1, -1, canvas.width+1, canvas.height+1);
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
