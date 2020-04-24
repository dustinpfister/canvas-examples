var game = (function () {

    // GRID 'Constants'
    var GRID = {
        w: 16,
        h: 12,
        cellSize: 16
    };

    // SPAWN 'Constants'
    var SPAWN = {
        rate: 3, // spawn rate in secs
        playerMax: 3 // max player units
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

    var spawn = function (state, secs) {

        state.spawnSecs += secs;
        if (state.spawnSecs >= SPAWN.rate) {
            state.spawnSecs %= SPAWN.rate;
            console.log('spawn event');
        }

    };

    // PUBLIC API
    var api = {
        GRID: GRID,
        SPAWN: SPAWN
    };

    // create a state object
    api.create = function (opt) {
        opt = opt || {};
        opt.areaData = opt.areaData || '';
        return {
            cells: createCells(opt.areaData),
            lt: new Date(),
            spawnSecs: 0,
            playerPool: [],
            enemyPool: []
        };
    };

    // update a state object
    api.update = function (state) {

        var now = new Date(),
        t = now - state.lt,
        secs = t / 1000;

        spawn(state, secs);

        state.lt = now;

    };

    return api;

}
    ());
