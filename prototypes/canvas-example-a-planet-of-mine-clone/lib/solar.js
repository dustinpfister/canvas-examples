var solarMod = (function () {

    return {

        create: function () {

            var worlds = [];

            worlds.push(worldMod.create());

            return {
                currentWorldIndex: 0,
                currentWorld: worlds[0],
                worlds: worlds
            };

        },

        update: function () {}

    }

}
    ())
