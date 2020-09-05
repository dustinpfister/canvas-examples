var gameMod = (function () {

    var enemyPoolOptions = {
        count: 20,
        spawn: function (enemy) {
            enemy.x = 128;
            enemy.y = 0;
        }
    };

    return {
        create: function (opt) {
            var game = {
                enemies: poolMod.create(enemyPoolOptions)
            };
            console.log(game);
            poolMod.spawn(game.enemies);
            return game;
        }
    }
}
    ());
