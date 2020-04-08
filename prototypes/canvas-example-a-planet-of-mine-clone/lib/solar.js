var solarMod = (function () {

    return {

        create: function () {

            var solar = {
                lt: new Date(),
                tickRate: 3000,
                ticks: 0,
                t: 0,
                tPer: 0,
                currentWorldIndex: 0,
                currentWorld: {},
                resources: {
                    solid: 0,
                    liquid: 0,
                    wood: 0,
                    raspberries: 500
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

            // make sure current world, is also currentWorld Index
            solar.currentWorld = solar.worlds[solar.currentWorldIndex];

            // for each world
            solar.worlds.forEach(function (world) {
                world.onTickProgress(solar, solar.ticks, solar.tPer);
                if (solar.tPer === 1) {
                    world.onTickEnd(solar, solar.ticks);
                }
            });

            // if tPer === 1
            if (solar.tPer === 1) {
                solar.ticks += 1;
                solar.lt = now;
            }

        }

    }

}
    ())
