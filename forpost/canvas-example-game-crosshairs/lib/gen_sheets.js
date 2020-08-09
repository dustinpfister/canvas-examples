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
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'lime';
    ctx.beginPath();
    ctx.rect(2, 2, 28, 28);
    ctx.stroke();

    sheets.push(sheet);
    return {
        sheets: sheets
    };

}
    ());
