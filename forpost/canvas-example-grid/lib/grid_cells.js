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

    // Bounds
    var createBoundsObject = function(grid){
        var xMax = grid.cellSize,
        yMax = grid.cellSize;
        return {
            xMax: xMax,
            yMax: yMax,
            xMin: xMax + grid.cellSize * grid.width * -1,
            yMin: yMax + grid.cellSize * grid.height * -1
        };
    };
    api.applyBounds = function(grid){
        var bounds = createBoundsObject(grid);
        grid.xOffset = grid.xOffset > bounds.xMax ? bounds.xMax : grid.xOffset;
        grid.xOffset = grid.xOffset < bounds.xMin ? bounds.xMin : grid.xOffset;
        grid.yOffset = grid.yOffset > bounds.yMax ? bounds.yMax : grid.yOffset;
        grid.yOffset = grid.yOffset < bounds.yMin ? bounds.yMin : grid.yOffset;
    };
    api.onEdge = function(grid){
        var bounds = createBoundsObject(grid);
        if(grid.xOffset >= bounds.xMax || 
        grid.xOffset <= bounds.xMin || 
        grid.yOffset >= bounds.yMax || 
        grid.yOffset <= bounds.yMin){
            return true;
        }
        return false;
    };

    // move map method
    api.moveMap = function(grid, secs, radian, pps){
        secs = secs === undefined ? 0 : secs;
        radian = radian === undefined ? 0 : radian;
        pps = pps === undefined ? 0 : pps;

        var deltaX = Math.cos(radian) * pps * secs;
        var deltaY = Math.sin(radian) * pps * secs;

        grid.xOffset += deltaX;
        grid.yOffset += deltaY;

    };

    return api;

}());