// GRID
var Grid = function (opt) {
    opt = opt || {};
    //this.cellSize = opt.cellSize === undefined ? 32 : opt.cellSize;

    this.gridWidth = opt.gridWidth || 7;
    this.gridHeight = opt.gridHeight || 6;
    this.cellWidth = opt.cellWidth || 7;
    this.cellHeight = opt.cellHeight || 6;
    this.objs = opt.objs || [];
    this.cells = [];
    this.resetCells()
    this.update();
};

// setup reset cells
Grid.prototype.resetCells = function () {
    this.cells = [];
    var ci = 0,
    cellObj,
    cLen = this.gridWidth * this.gridHeight;
    while (ci < cLen) {
        cellObj = {
            i: ci,
            y: Math.floor(ci / this.gridWidth),
            x: ci % this.gridWidth,
            color: [0, 0, 0, 1]
        };
        this.cells.push(cellObj);
        ci += 1;
    }
};

Grid.prototype.capCellColors = function () {
    this.cells.forEach(function (cell) {
        var c = cell.color;
        c[0] = Math.floor(c[0] > 255 ? 255 : c[0]);
    });
}

Grid.prototype.update = function () {

    var grid = this;
    // reset
    grid.resetCells();
    // increase color channel values for objects
    grid.objs.forEach(function (obj) {
        grid.cells.forEach(function (cell) {
            var d = Math.sqrt(Math.pow(cell.x - obj.x, 2) + Math.pow(cell.y - obj.y, 2));
            if (d <= obj.radius) {
                var per = 1 - d / obj.radius;
                var c = cell.color;
                c[0] += Math.floor(255 * per);
                c[1] = 0;
                c[2] = 0;
            }
        });
    });
    grid.capCellColors();

};
