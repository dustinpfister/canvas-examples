var gameMod = (function () {

    var placeUnitInMap = function (game, unit, pos) {
        var map = game.map,
        cell = mapMod.get(map, pos.x, pos.y);
        unit.x = map.margin.x + map.cellSize * cell.x;
        unit.y = map.margin.y + map.cellSize * cell.y;
    };

    var enemyPoolOptions = {
        count: 5,
        spawn: function (enemy, game, spawnOptions) {
            placeUnitInMap(game, enemy, spawnOptions.cellPos);
        }
    };

    var playerPoolOptions = {
        count: 5,
        spawn: function (playerUnit, game, spawnOptions) {
            placeUnitInMap(game, playerUnit, spawnOptions.cellPos);
        }
    };

    var shotPoolOptions = {
        count: 10,
        w: 5,
        h: 5,
        spawn: function (shot, game, spawnOptions) {
            placeUnitInMap(game, shot, spawnOptions.cellPos);
        }
    };

    // create a new base game object
    var createBaseGameObject = function (opt) {
        return {
            enemies: [],
            playerUnits: [],
            shots: [],
            map: mapMod.create({
                margin: {
                    x: 10,
                    y: 10
                }
            })
        };
    };

    var createObjectPools = function (game) {
        game.enemies = poolMod.create(enemyPoolOptions);
        game.playerUnits = poolMod.create(playerPoolOptions);
        game.shots = poolMod.create(shotPoolOptions);
    };

    return {
        create: function (opt) {
            var game = createBaseGameObject(opt);
            createObjectPools(game);
            var spawnOptions = {
                cellPos: {
                    x: 3,
                    y: 0
                }
            };
            poolMod.spawn(game.enemies, game, spawnOptions);
            spawnOptions.cellPos.x = 7;
            spawnOptions.cellPos.y = 6;
            poolMod.spawn(game.playerUnits, game, spawnOptions);
            spawnOptions.cellPos.x = 1;
            spawnOptions.cellPos.y = 1;
            poolMod.spawn(game.shots, game, spawnOptions);
            return game;
        }
    }
}
    ());
