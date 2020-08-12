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

    var createEnemyUnitPool = function (size) {
        var pool = [];
        var i = 0;
        while (i < size) {
            pool.push(createEnemyUnit());
            i += 1;
        }
        return pool;
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
    var removeUnit = function (game, unit) {
        unit.active = false;
        map.cells[unit.currentCell.i] = false;
        unit.currentCell = false;
    };

    // start game helper
    var setupGame = function (game) {
        game.mapIndex = 0;
        var map = getCurrentMap(game);
        placeUnit(game, game.player, 0, 0);
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
            enemyPool: createEnemyUnitPool(10)
        };
        game.maps.push(mapMod.create());

        placeUnit(game, game.enemyPool[0], 5, 5);

        setupGame(game);
        return game;
    };
    // update a game state object
    api.update = function (game, secs) {
        var cell,
        radian,
        target;
        // move player
        if (target = game.targetCell) {
            cell = game.player.currentCell;
            if (target != cell) {
                radian = utils.angleToPoint(cell.x, cell.y, target.x, target.y);
                var cx = Math.round(cell.x + Math.cos(radian)),
                cy = Math.round(cell.y + Math.sin(radian));
                placeUnit(game, game.player, cx, cy);
                game.targetCell = false;
            }
        }
    };
    // return the public api
    return api;
}
    ());
