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
        playerMax: 10, // max player units
        enemyMax: 3
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

    var getCell = function (state, x, y) {
        return state.cells[GRID.w * y + x];
    }

    // get areas of type and clear status (optional)
    // clear === undefined (clear and not clear tiles)
    // clear === true (only clear tiles)
    // clear === false (only not clear tiles)
    var getAreas = function (state, areaType, clear) {
        return state.cells.filter(function (cell) {
            return String(cell.areaType) === String(areaType) && (clear === undefined ? true : clear === cell.clear);
        });
    };

    // get cells near the cell
    var getNear = function (state, cell, range, areaType) {
        range = range || 1;
        areaType = areaType === undefined ? 0 : areaType;
        return state.cells.filter(function (target) {
            return utils.distance(cell.x, cell.y, target.x, target.y) <= range;
        }).filter(function (target) {
            return String(areaType) === String(target.areaType) && cell.i != target.i;
        }).filter(function (target) {
            return target.clear;
        })
    };

    // return a list of objects with landIndex values sorted by
    // most amount of water tiles in the given range
    var getBestTurretLands = function (state, range) {
        var waterAreas = getAreas(state, 0);
        return getAreas(state, 2, true).map(function (cell) {
            var count = 0;
            waterAreas.forEach(function (waterCell) {
                if (utils.distance(cell.x, cell.y, waterCell.x, waterCell.y) <= range) {
                    count += 1;
                }
            });
            return {
                i: cell.i,
                cell: cell,
                waterCount: count
            }
        }).filter(function (obj) {
            return obj.waterCount > 0;
        }).sort(function (a, b) {
            if (a.waterCount > b.waterCount) {
                return -1;
            }
            if (a.waterCount < b.waterCount) {
                return 1;
            }
            return 0;
        });
    };

    // get border waters
    var getBorderWaters = function (state) {
        return getAreas(state, 0, true).filter(function (cell) {
            return cell.x === 0 || cell.y == 0 || cell.x === GRID.w - 1 || cell.y === GRID.h - 1;
        });
    };

    // spawn units
    var spawn = function (state, secs) {
        state.spawnSecs += secs;
        if (state.spawnSecs >= SPAWN.rate) {
            state.spawnSecs %= SPAWN.rate;
            // player spawn
            if (state.pool.player.length < SPAWN.playerMax) {
                var freeLands = getBestTurretLands(state, 3);
                if (freeLands.length >= 1) {
                    var land = freeLands[0].cell;
                    land.clear = false;
                    state.pool.player.push({
                        x: land.x,
                        y: land.y
                    })
                }
            }
            // enemy
            if (state.pool.enemy.length < SPAWN.enemyMax) {
                var waters = getBorderWaters(state);
                if (waters.length >= 1) {
                    var water = waters[Math.floor(waters.length * Math.random())];
                    water.clear = false;
                    state.pool.enemy.push({
                        x: water.x,
                        y: water.y,
                        secs: 0,
                        speed: 3
                    });
                }
            }
        }
    };

    var moveBoats = function (state, secs) {

        var i = state.pool.enemy.length,
        boat;
        while (i--) {
            boat = state.pool.enemy[i];
            boat.secs += secs;
            if (boat.secs >= boat.speed) {
                boat.secs %= boat.speed;
                var near = getNear(state, boat, 1.5, 0);
                if (near.length >= 1) {
                    var water = near[Math.floor(Math.random() * near.length)],
                    current = getCell(state, boat.x, boat.y);
                    current.clear = true;
                    water.clear = false;
                    boat.x = water.x;
                    boat.y = water.y;
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
        var state = {
            cells: createCells(opt.areaData),
            lt: new Date(),
            spawnSecs: 0,
            pool: {
                player: [],
                enemy: []
            }
        };

        console.log(getNear(state, state.cells[0], 1.5, 0))

        return state;
    };

    // update a state object
    api.update = function (state) {
        // time
        var now = new Date(),
        t = now - state.lt,
        secs = t / 1000;
        // spawn
        spawn(state, secs);
        moveBoats(state, secs);
        // set lt to now
        state.lt = now;
    };

    return api;

}
    ());
