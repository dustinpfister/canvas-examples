var gameMod = (function () {

    var enemyPoolOptions = {
        count: 20
    };

    return {
        create: function (opt) {

            return {
                enemies: poolMod.create(enemyPoolOptions)
            };

        }
    }
}
    ());
