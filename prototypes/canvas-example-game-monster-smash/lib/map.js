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

    // get a cell in the current map is any by way of the
    // a canvas relative x and y pos
    api.getCellByPointer = function (map, x, y) {

        var cx = Math.floor((x - map.margin.x) / map.cellSize),
        cy = Math.floor((y - map.margin.y) / map.cellSize);

        console.log(cx, cy);

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
    }
    return api;

}
    ());
