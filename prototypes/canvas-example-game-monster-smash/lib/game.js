var gameMod = (function () {

    var createBaseUnit = function () {
        return {
            HP: 100,
            maxHP: 100,
            weaponIndex: 0,
            sheetIndex: 1,
            currentCell: false,
            active: false
        }
    };

    var createPlayerUnit = function () {
        var player = createBaseUnit();
        player.active = true;
        player.sheetIndex = 0; // player sheet
        return player;
    };

    var placeUnit = function (game, unit, x, y) {
        var map = game.maps[game.mapIndex];
        var newCell = mapMod.get(map, x, y);
        if (newCell) {
            // clear old position if any
            if (unit.currentCell) {
                map.cells[unit.currentCell.i].unit = false;
            }
            // update to new location
            unit.currentCell = newCell; // unit ref to cell
            map.cells[unit.currentCell.i].unit = unit; // map ref to unit
        }
    };

    // start game helper
    var setupGame = function (game) {
        game.mapIndex = 0;
        var map = game.maps[game.mapIndex];

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
            player: createPlayerUnit()
        };
        game.maps.push(mapMod.create());
        setupGame(game);
        return game;
    };

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

    return api;

}
    ());
