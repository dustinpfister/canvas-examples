var solarMod = (function () {

    return {

        create: function () {

            var worlds = [];

            worlds.push(worldMod.create());

            return {
                currentWorld: 0,
                worlds: worlds
            };

        },

        update: function () {}

    }

}
    ())
