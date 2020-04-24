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
                areaType: areaData[i] === undefined ? 0 : areaData[i],
                clear: true // nothing on it
            })
            i += 1;
        }
        return cells;
    };

    var getAreas = function (state, areaType, clear) {
        clear === undefined ? true : clear;
        return state.cells.filter(function (cell) {

            return String(cell.areaType) === String(areaType);

        });
    };

    var spawn = function (state, secs) {

        state.spawnSecs += secs;
        if (state.spawnSecs >= SPAWN.rate) {
            state.spawnSecs %= SPAWN.rate;
            console.log('spawn event');

            if (state.pool.player.length < SPAWN.playerMax) {

                var freeLands = getAreas(state, 2, true);
                console.log(freeLands);

                if (freeLands.length >= 1) {
                    console.log('yes');
                    var land = freeLands[Math.floor(Math.random() * freeLands.length)];
                    land.clear = false;
                    state.pool.player.push({
                        x: land.x,
                        y: land.y
                    })
                }

            }

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
            pool: {
                player: [],
                enemy: []
            }
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
