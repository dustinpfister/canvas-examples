var gameMod = (function () {

    var enemyPoolOptions = {
        count: 20
    };

    return {
        create: function (opt) {
            var game = {
                enemies: poolMod.create(enemyPoolOptions)
            };
            console.log(game);
            return game;
        }
    }
}
    ());
