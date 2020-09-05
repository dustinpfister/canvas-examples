var gameMod = (function () {

    var enemyPoolOptions = {
        count: 5,
        spawn: function (enemy, game, spawnOptions) {
            var map = game.map;
            enemy.x = map.margin.x;
            enemy.y = map.margin.y;
        }
    };

    var playerPoolOptions = {
        count: 5,
        spawn: function (enemy, game, spawnOptions) {
            var map = game.map;
            enemy.x = map.margin.x;
            enemy.y = map.margin.y;
        }
    };

    var shotPoolOptions = {
        count: 10,
        w: 5,
        h: 5,
        spawn: function (enemy, game, spawnOptions) {
            var map = game.map;
            enemy.x = map.margin.x;
            enemy.y = map.margin.y;
        }
    };

    return {
        create: function (opt) {
            var game = {
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
            game.enemies = poolMod.create(enemyPoolOptions);
            game.playerUnits = poolMod.create(playerPoolOptions);
            game.shots = poolMod.create(shotPoolOptions);
            console.log(game);
            var spawnOptions = {
                cellPos: {
                    x: 0,
                    y: 0
                }
            };
            poolMod.spawn(game.enemies, game, spawnOptions);
            poolMod.spawn(game.playerUnits, game, spawnOptions);
            poolMod.spawn(game.shots, game, spawnOptions);
            return game;
        }
    }
}
    ());
