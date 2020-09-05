var gameMod = (function () {

    var enemyPoolOptions = {
        count: 5,
        spawn: function (enemy) {
            enemy.x = 128;
            enemy.y = 0;
        }
    };

    var playerPoolOptions = {
        count: 5,
        spawn: function (enemy) {
            enemy.x = 128;
            enemy.y = 200;
        }
    };

    var shotPoolOptions = {
        count: 10,
        w: 5,
        h: 5,
        spawn: function (enemy) {
            enemy.x = 0;
            enemy.y = 0;
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
                        x: 0,
                        y: 0
                    }
                })
            };
            game.enemies = poolMod.create(enemyPoolOptions);
            game.playerUnits = poolMod.create(playerPoolOptions);
            game.shots = poolMod.create(shotPoolOptions);
            console.log(game);
            poolMod.spawn(game.enemies);
            poolMod.spawn(game.playerUnits);
            poolMod.spawn(game.shots);
            return game;
        }
    }
}
    ());
