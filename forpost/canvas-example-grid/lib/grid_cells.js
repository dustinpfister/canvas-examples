var gridMod = (function(){

    var createGrid = function (opt) {
        opt = opt || {};
        var grid = {};
        grid.xOffset = opt.xOffset === undefined ? 5 : opt.xOffset;
        grid.yOffset = opt.yOffset === undefined ? 5 : opt.yOffset;
        grid.cellSize = opt.cellSize === undefined ? 32 : opt.cellSize;
        grid.width = opt.width || 4;
        grid.height = opt.height || 2;
        // create cells
        grid.cells = createBaseCellsArray(grid.width, grid.height);
        return grid;
    };

    // set cell objects for each cell in the grid
    var createBaseCellsArray = function (width, height) {
        var cells = [],
        i = 0,
        len = width * height;
        while (i < len) {
            cells.push({
                i: i,
                y: Math.floor(i / width),
                x: i % width
            });
            i += 1;
        }
        return cells;
    };

    // PUBLIC API
    var api = {};
    // create a grid object
    api.create = createGrid;
    // apply bounds
    api.applyBounds = function(grid, xMax, yMax, xMin, yMin){
        var xMax = 32;
        grid.xOffset = grid.xOffset > xMax ? xMax : grid.xOffset;
        var xMin = xMax + grid.cellSize * grid.width * -1;
        grid.xOffset = grid.xOffset < xMin ? xMin : grid.xOffset;
    };

    return api;

}());