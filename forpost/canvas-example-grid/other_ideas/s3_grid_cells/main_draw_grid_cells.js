// GRID
var Grid = function (opt) {
    opt = opt || {};
    this.xOffset = opt.xOffset === undefined ? 5 : opt.xOffset;
    this.yOffset = opt.yOffset === undefined ? 5 : opt.yOffset;
    this.cellSize = opt.cellSize === undefined ? 32 : opt.cellSize;
    this.cellWidth = opt.cellWidth || 7;
    this.cellHeight = opt.cellHeight || 6;
    // set cells for the grid
    this.setCells();
};

// set cell objects for each cell in the grid
Grid.prototype.setCells = function (forCell) {
    this.cells = [];
    var ci = 0,
    cellObj,
    cLen = this.cellWidth * this.cellHeight;
    forCell = forCell || function () {};
    while (ci < cLen) {
        cellObj = {
            i: ci,
            y: Math.floor(ci / this.cellWidth),
            x: ci % this.cellWidth,
            backgroundIndex: 0
        };
        forCell(cellObj);
        this.cells.push(cellObj);
        ci += 1;
    }
};

// draw Cell Lines
var drawCellLines = function (ctx, grid, style) {
    var ci = 0,
    cell,
    cLen = grid.cells.length;
    ctx.strokeStyle = style || 'red';
    while (ci < cLen) {
        cell = grid.cells[ci];
        ctx.strokeRect(
            cell.x * grid.cellSize + grid.xOffset + 0.5,
            cell.y * grid.cellSize + grid.yOffset + 0.5,
            grid.cellSize, grid.cellSize)
        ci += 1;
    }
};

// draw cell backgrounds
var drawCellBackgrounds = function (ctx, grid, sheet) {
    var ci = 0,
    cell,
    cLen = grid.cells.length;
    while (ci < cLen) {
        cell = grid.cells[ci];
        ctx.drawImage(
            sheet,
            // source
            cell.backgroundIndex * grid.cellSize + 0.5,
            -0.5,
            grid.cellSize, grid.cellSize,
            // placement
            cell.x * grid.cellSize + grid.xOffset + 0.5,
            cell.y * grid.cellSize + grid.yOffset + 0.5,
            grid.cellSize, grid.cellSize)
        ci += 1;
    }
};

// SETUP CANVAS
(function () {
    // create and append canvas element, and get 2d context
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.getElementById('gamearea') || document.body;
    container.appendChild(canvas);
    // set width and height
    canvas.width = 320;
    canvas.height = 240;

    // creating a grid instance
    var grid = new Grid({
            xOffset: 15,
            yOffset: 25,
            cellSize: 32,
            cellWidth: 9
        });

    // create a sheet
    var sheet = document.createElement('canvas'),
    ctx_sheet = sheet.getContext('2d');
    sheet.width = 64;
    sheet.height = 32;
    ctx_sheet.fillStyle = 'orange';
    ctx_sheet.fillRect(0, 0, sheet.width, sheet.height);
    ctx_sheet.fillStyle = 'green';
    ctx_sheet.fillRect(grid.cellSize, 0, grid.cellSize, grid.cellSize);

    // setting some cells to a background index
    // other that the default 0
    grid.cells[10].backgroundIndex = 1;
    grid.cells[18].backgroundIndex = 1;
    grid.cells[19].backgroundIndex = 1;
    grid.cells[20].backgroundIndex = 1;
    grid.cells[28].backgroundIndex = 1;

    // fill black
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw backgrounds
    drawCellBackgrounds(ctx, grid, sheet);
    // draw grid lines
    drawCellLines(ctx, grid, 'grey');

}
    ());
