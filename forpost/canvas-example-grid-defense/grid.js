// GRID
var Grid = function (opt) {
    opt = opt || {};
    this.xOffset = opt.xOffset === undefined ? 5 : opt.xOffset;
    this.yOffset = opt.yOffset === undefined ? 5 : opt.yOffset;
    this.cellSize = opt.cellSize === undefined ? 32 : opt.cellSize;
    this.cellWidth = opt.cellWidth || 7;
    this.cellHeight = opt.cellHeight || 6;
    this.cells = [];
    // set cells for the grid
    this.setCells(opt.forCell);
};
// return a cell by index or x y cell position
Grid.prototype.getCell = function (ix, y) {
    var cell;
    if (arguments.length === 1) {
        cell = this.cells[ix];
    }
    if (arguments.length === 2 && ix >= 0 && ix < this.cellWidth) {
        cell = this.cells[y * this.cellWidth + ix];
    }
    return cell ? cell : false;
};
// return the cell at the given canvas relative x and y pixel position
// or false if out of range
Grid.prototype.getCellFromPoint = function (x, y) {
    var insideX = x >= this.xOffset && x <= this.xOffset + this.cellSize * this.cellWidth,
    insideY = y >= this.yOffset && y <= this.yOffset + this.cellSize * this.cellHeight;
    if (insideX && insideY) {
        return this.getCell(
            Math.floor((x - this.xOffset) / this.cellSize),
            Math.floor((y - this.yOffset) / this.cellSize));
    }
    return false;
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
            x: ci % this.cellWidth
        };
        forCell(cellObj);
        this.cells.push(cellObj);
        ci += 1;
    }
};
