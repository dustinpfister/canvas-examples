var draw = (function () {
    return {
        // draw background
        back: function (ctx, canvas) {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },
        // crude starting draw cell index method
        cellIndex: function (ctx, sheet, cellIndex, x, y, opt) {
            opt = opt || {};
            opt.cellWidthPX = opt.cellWidth || 32;
            opt.cellHeightPX = opt.cellHeight || 32;
            opt.drawWidth = opt.drawWidth || 32;
            opt.drawHeight = opt.drawHeight || 32;
            var sx = sheet.width / opt.cellWidthPX * cellIndex,
            sy = 0,
            sw = opt.cellWidthPX,
            sh = opt.cellHeightPX;
            ctx.drawImage(sheet,
                sheet.width / opt.cellWidthPX * cellIndex, 0,
                opt.cellWidthPX, opt.cellHeightPX,
                x, y,
                opt.drawWidth, opt.drawHeight);
        }
    }
}
    ());
