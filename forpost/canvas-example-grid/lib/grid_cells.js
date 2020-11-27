var gridMod = (function(){
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
var createBaseCellsArray = function (width, height) {
    var cells = [],
    i = 0,
    len = width * height;
    while (i < len) {
        cells.push){
            i: i,
            y: Math.floor(i / width),
            x: i % width
        });
        ci += 1;
    }
    return cells;
};

}());