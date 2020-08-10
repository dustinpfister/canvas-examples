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
                y: Math.floor(i / map.w)
            });
            i += 1;
        }
        return cells;
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
