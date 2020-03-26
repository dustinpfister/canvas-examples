// GRID
var Grid = function (opt) {
    opt = opt || {};
    //this.cellSize = opt.cellSize === undefined ? 32 : opt.cellSize;

    this.gridWidth = opt.gridWidth || 7;
    this.gridHeight = opt.gridHeight || 6;
    this.cellWidth = opt.cellWidth || 7;
    this.cellHeight = opt.cellHeight || 6;
    this.setCells(opt.forCell);
};

// set cell objects for each cell in the grid
Grid.prototype.setCells = function (forCell) {
    this.cells = [];
    var ci = 0,
    cellObj,
    cLen = this.gridWidth * this.gridHeight;
    forCell = forCell || function () {};
    while (ci < cLen) {
        cellObj = {
            i: ci,
            y: Math.floor(ci / this.gridWidth),
            x: ci % this.gridWidth,
            color: [0, 0, 0, 1]
        };
        forCell(cellObj);
        this.cells.push(cellObj);
        ci += 1;
    }
};
