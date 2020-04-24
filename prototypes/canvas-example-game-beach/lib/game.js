var game = (function () {

    var GRID = {
        w: 10,
        h: 8,
        cellSize: 32
    };

    // create the array of cell objects
    var createCells = function (areaData) {
        var i = 0,
        len = GRID.w * GRID.h,
        cells = [];
        while (i < len) {
            cells.push({
                i: i,
                x: i % GRID.w,
                y: Math.floor(i / GRID.w),
                areaType: areaData[i] === undefined ? 0 : areaData[i]
            })
            i += 1;
        }
        return cells;
    };

    var api = {};

    api.create = function (opt) {
        opt = opt || {};
        opt.areaData = opt.areaData || '';
        return {
            cells: createCells(opt.areaData)
        };
    };

    return api;

}
    ());
