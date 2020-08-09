var genSheets = (function () {

    var sheet = {},
    canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 32 * 10;
    canvas.height = 32 * 1;

    sheet.canvas = canvas;
    sheet.cellType = {
        type: 'grass',
        i: 0
    };
    sheet.cellWidth = 10;
    sheet.cellHeight = 1;
    sheet.cellSize = 32;

    ctx.fillStyle = '#ff00ff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    return {
        sheets: [].push(sheet)
    };

}
    ());
