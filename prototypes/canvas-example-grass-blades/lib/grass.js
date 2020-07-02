
var Grass = (function () {

    // public API
    return {
        // create a state
        create: function (opt) {
            opt = opt || {};
            return {
                maxBlades: opt.maxBlades || 10,
                spawnRate: 1000,
                canvas: opt.canvas || {
                    width: 320,
                    heigh: 240
                },
                t: 0,
                blades: []
            };
        },

        update: function (grass, t) {

            grass.t += t;

            grass.blades.forEach(function (blade) {

                blade.t += t;
                blade.t = blade.t > blade.tMax ? blade.tMax : blade.t;

            });

            if (grass.t >= grass.spawnRate) {

                if (grass.blades.length >= grass.maxBlades) {
                    grass.blades.shift();
                }

                //if (grass.blades.length < grass.maxBlades) {
                grass.blades.push(Blade.create({
                        baseX: Math.floor(grass.canvas.width * Math.random()),
                        turn: -90 + 180 * Math.random()
                    }));
                //}
                grass.t %= grass.spawnRate;
            }

        }

    }

}
    ());
