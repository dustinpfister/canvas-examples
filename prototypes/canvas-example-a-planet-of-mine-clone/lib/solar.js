var solarMod = (function () {

    return {

        create: function () {
            var worlds = [];
            worlds.push(worldMod.create());
            return {
                lt: new Date(),
                tickRate: 3000,
                t: 0,
                tPer: 0,
                currentWorldIndex: 0,
                currentWorld: worlds[0],
                worlds: worlds
            };
        },

        update: function (solar) {

            var now = new Date(),
            t = now - solar.lt;

            solar.t = t;
            solar.tPer = t / solar.tickRate;
            solar.tPer = solar.tPer > 1 ? 1 : solar.tPer;

            if (solar.tPer === 1) {
                console.log('tick');
                solar.lt = now;
            }

        }

    }

}
    ())
