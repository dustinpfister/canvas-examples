var gridMod = (function(){


    var createGrid = function (opt) {
        opt = opt || {};
        var grid = {};
        grid.xOffset = opt.xOffset === undefined ? 5 : opt.xOffset;
        grid.yOffset = opt.yOffset === undefined ? 5 : opt.yOffset;
        grid.cellSize = opt.cellSize === undefined ? 32 : opt.cellSize;
        grid.width = opt.width || 7;
        grid.height = opt.height || 6;
        // create cells
        grid.cells = createBaseCellsArray(grid.width, grid.height);
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