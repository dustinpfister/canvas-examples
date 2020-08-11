var mapMod = (function () {

    var api = {};

    var createCells = function (map) {
        var cells = [];
        var len = map.w * map.h,
        i = 0;
        while (i < len) {
            cells.push({
                i: i,
                x: i % map.w,
                y: Math.floor(i / map.w),
                unit: false // reference to current unit here or false if empty
            });
            i += 1;
        }
        return cells;
    };

    // return a cell at the given position, or false for out of bounds values
    api.get = function (map, x, y) {
        if (x < 0 || y < 0 || x >= map.w || y >= map.h) {
            return false;
        }
        return map.cells[y * map.w + x];
    };

    // get a cell in the current map by way of 
    // a canvas relative x and y pixel pos
    api.getCellByPointer = function (map, x, y) {
        var cx = Math.floor((x - map.margin.x) / map.cellSize),
        cy = Math.floor((y - map.margin.y) / map.cellSize);
        return api.get(map, cx, cy)
    };

    api.create = function (opt) {
        opt = opt || {};
        var map = {
            w: opt.w || 9,
            h: opt.h || 7,
            cellSize: 32,
            margin: {
                x: 5,
                y: 5
            },
            cells: []
        };
        map.cells = createCells(map);
        return map;
    };
    return api;

}
    ());
