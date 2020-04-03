var solarMod = (function () {

    return {

        create: function () {

            var solar = {
                lt: new Date(),
                tickRate: 3000,
                t: 0,
                tPer: 0,
                currentWorldIndex: 0,
                resources: {
                    solid: 0,
                    liquid: 0
                }
            };

            solar.worlds = [];
            solar.worlds.push(worldMod.create(solar));
            solar.currentWorld = solar.worlds[solar.currentWorldIndex];
            return solar;
        },

        update: function (solar) {

            var now = new Date(),
            t = now - solar.lt;

            solar.t = t;
            solar.tPer = t / solar.tickRate;
            solar.tPer = solar.tPer > 1 ? 1 : solar.tPer;

            if (solar.tPer === 1) {
                console.log('tick');
                solar.worlds.forEach(function (world) {

                    world.onTick();

                });
                solar.lt = now;
            }

        }

    }

}
    ())
