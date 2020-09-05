var gameMod = (function () {

    var enemyPoolOptions = {
        count: 20,
        spawn: function (enemy) {
            enemy.x = 128;
            enemy.y = 0;
        }
    };

    var playerPoolOptions = {
        count: 20,
        spawn: function (enemy) {
            enemy.x = 128;
            enemy.y = 200;
        }
    };

    return {
        create: function (opt) {
            var game = {
                enemies: []
            };
            game.enemies = poolMod.create(enemyPoolOptions);
            game.playerUnits = poolMod.create(playerPoolOptions);
            console.log(game);
            poolMod.spawn(game.enemies);
            return game;
        }
    }
}
    ());
