var game = (function () {

    // GRID 'Constants'
    var GRID = {
        w: 16,
        h: 12,
        cellSize: 16
    };

    // SPAWN 'Constants'
    var SPAWN = {
        rate: 0.5, // spawn rate in secs
        playerMax: 10 // max player units
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

    // create a new state
    var create = function (opt) {
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

    // get areas of type and clear status
    var getAreas = function (state, areaType, clear) {
        clear === undefined ? true : clear;
        return state.cells.filter(function (cell) {
            return String(cell.areaType) === String(areaType) && clear === cell.clear;
        });
    };

    // return a list of free lands sorted by most amount of land tiles
    // in the given range
    var getBestTurretLands = function (state, range) {
		
		
	};

    // spawn units
    var spawn = function (state, secs) {
        state.spawnSecs += secs;
        if (state.spawnSecs >= SPAWN.rate) {
            state.spawnSecs %= SPAWN.rate;
            // player spawn
            if (state.pool.player.length < SPAWN.playerMax) {
                var freeLands = getAreas(state, 2, true);
                if (freeLands.length >= 1) {
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
    api.create = create,

    // update a state object
    api.update = function (state) {
        // time
        var now = new Date(),
        t = now - state.lt,
        secs = t / 1000;
        // spawn
        spawn(state, secs);
        // set lt to now
        state.lt = now;
    };

    return api;

}
    ());
