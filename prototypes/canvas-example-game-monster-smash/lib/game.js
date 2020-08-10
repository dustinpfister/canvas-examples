var gameMod = (function () {

    var createBaseUnit = function () {
        return {
            HP: 100,
            maxHP: 100,
            weaponIndex: 0,
            sheetIndex: 1,
            active: false
        }
    };

    var createPlayerUnit = function () {
        var player = createBaseUnit();
        player.active = true;
        player.sheetIndex = 0; // player sheet
        return player;
    };

    var api = {};

    // start game helper
    var setupGame = function (game) {
        game.mapIndex = 0;
        var map = game.maps[game.mapIndex];
        map.cells[0].unit = game.player;
    };

    // get a cell in the current map is any by way of the
    // a canvas relative x and y pos
    api.getCellByPointer = function (game, x, y) {

        var map = game.maps[game.mapIndex];

        var cx = Math.floor((x - map.margin.x) / map.cellSize),
        cy = Math.floor((y - map.margin.y) / map.cellSize);

        console.log(cx, cy);

    };

    // create a new game state
    api.create = function (opt) {
        opt = opt || {};
        var game = {
            mode: 'map',
            maps: [],
            mapIndex: 0,
            player: createPlayerUnit()
        };
        game.maps.push(mapMod.create());

        setupGame(game)

        return game;
    };

    return api;

}
    ());
