// GRID
var Grid = function (opt) {
    opt = opt || {};
    //this.cellSize = opt.cellSize === undefined ? 32 : opt.cellSize;

    this.gridWidth = opt.gridWidth || 7;
    this.gridHeight = opt.gridHeight || 6;
    this.cellWidth = opt.cellWidth || 7;
    this.cellHeight = opt.cellHeight || 6;
    this.objs = opt.objs || [];
    this.setCells(opt.forCell);
};

Grid.prototype.update = function () {

    this.setCells();
    this.setCells(function (cell, grid) {
        var i = grid.objs.length,
        d,
        obj,
        per,
        c;
        while (i--) {
            obj = grid.objs[i];
            d = Math.sqrt(Math.pow(cell.x - obj.x, 2) + Math.pow(cell.y - obj.y, 2));
            if (d <= obj.radius) {
                per = 1 - d / obj.radius;
                c = cell.color;
                c[0] = Math.floor(255 * per);
                c[1] = 0;
                c[2] = 0;
            }
        }
    });

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
        forCell(cellObj, this);
        this.cells.push(cellObj);
        ci += 1;
    }
};
