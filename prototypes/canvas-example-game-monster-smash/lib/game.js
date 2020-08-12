var gameMod = (function () {

    // create a base unit object
    var createBaseUnit = function () {
        return {
            HP: 100,
            maxHP: 100,
            weaponIndex: 0,
            sheetIndex: 0,
            currentCell: false,
            active: false
        }
    };

    // create an enemy Unit Object
    var createEnemyUnit = function () {
        var enemy = createBaseUnit();
        enemy.sheetIndex = 1;
        return enemy;
    };

    // create a player unit
    var createPlayerUnit = function () {
        var player = createBaseUnit();
        player.sheetIndex = 0; // player sheet
        return player;
    };
    // create enemy pool
    var createEnemyUnitPool = function (size) {
        var pool = [];
        var i = 0;
        while (i < size) {
            pool.push(createEnemyUnit());
            i += 1;
        }
        return pool;
    };
    var getActiveCount = function (game, pool) {
        pool = pool || game.enemyPool;
        return pool.reduce(function (acc, obj) {
            acc = typeof acc === 'object' ? !!acc.active : acc;
            return acc + !!obj.active;
        });
    };
    var spawnEnemy = function (game) {
        var map = getCurrentMap(game),
        spawnCell = map.spawnCells[0]; // just index 0 for now
    };
    // get next inactive
    var getNextInactive = function (game, pool) {
        pool = pool || game.enemyPool;
        var i = 0,
        len = pool.length;
        while (i < len) {
            if (!pool[i].active) {
                return pool[i];
            }
            i += 1;
        }
        return false;
    };

    // get the current map
    var getCurrentMap = function (game) {
        return game.maps[game.mapIndex];
    };

    // place a unit at a current map location
    var placeUnit = function (game, unit, x, y) {
        var map = getCurrentMap(game);
        var newCell = mapMod.get(map, x, y);
        if (newCell) {
            // clear old position if any
            if (unit.currentCell) {
                map.cells[unit.currentCell.i].unit = false;
            }
            // make sure the unit is active
            unit.active = true;
            // update to new location
            unit.currentCell = newCell; // unit ref to cell
            map.cells[unit.currentCell.i].unit = unit; // map ref to unit
        }
    };

    // remove a unit from any map location it may be at
    // this will not destroy the object if it is part of a pool, or reference elsewhere
    var removeUnit = function (game, unit) {
        unit.active = false;
        getCurrentMap(game).cells[unit.currentCell.i].unit = false;
        unit.currentCell = false;
    };

    // start game helper
    var setupGame = function (game) {
        game.mapIndex = 0;
        var map = getCurrentMap(game);
        placeUnit(game, game.player, 0, 0);
        placeUnit(game, getNextInactive(game), 5, 5);
        placeUnit(game, getNextInactive(game), 2, 5);
    };

    var moveEnemies = function (game) {
        var i = 0,
        cell,
        radian,
        map = getCurrentMap(game),
        e,
        p = game.player,
        len = game.enemyPool.length;
        while (i < len) {
            e = game.enemyPool[i];
            if (e.active) {
                cell = e.currentCell;
                radian = utils.angleToPoint(cell.x, cell.y, p.currentCell.x, p.currentCell.y);
                var cx = Math.round(cell.x + Math.cos(radian)),
                cy = Math.round(cell.y + Math.sin(radian));

                // get location before moving to it
                var newCell = mapMod.get(map, cx, cy);

                // if no unit just move there
                if (!newCell.unit) {
                    placeUnit(game, e, cx, cy);
                }

            }
            i += 1;
        }
    };

    var api = {};
    // create a new game state
    api.create = function (opt) {
        opt = opt || {};
        var game = {
            mode: 'map',
            maps: [],
            mapIndex: 0,
            targetCell: false, // a reference to the current target cell to move to, or false
            player: createPlayerUnit(),
            kills: 0,
            enemyPool: createEnemyUnitPool(10)
        };
        game.maps.push(mapMod.create());
        setupGame(game);

        return game;
    };
    // update a game state object
    api.update = function (game, secs) {
        var cell,
        map = getCurrentMap(game),
        radian,
        target;

        // move player
        if (target = game.targetCell) {
            cell = game.player.currentCell;
            if (target != cell) {
                radian = utils.angleToPoint(cell.x, cell.y, target.x, target.y);
                var cx = Math.round(cell.x + Math.cos(radian)),
                cy = Math.round(cell.y + Math.sin(radian));

                // get location before moving to it
                var newCell = mapMod.get(map, cx, cy);

                // if no unit just move there
                if (!newCell.unit) {
                    placeUnit(game, game.player, cx, cy);
                } else {
                    // else there is an enemy there
                    var e = newCell.unit;
                    e.active = false;
                    removeUnit(game, e)
                    game.kills += 1; // just step a kill count for now
                    placeUnit(game, game.player, cx, cy);
                }
                game.targetCell = false;
                // move active enemies
                moveEnemies(game);
            }
        }

    };

    // return the public api
    return api;
}
    ());
