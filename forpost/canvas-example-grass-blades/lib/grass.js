
var Grass = (function () {
    // public API
    return {
        // create a grass state
        create: function (opt) {
            opt = opt || {};
            return {
                maxBlades: opt.maxBlades || 10,
                spawnRate: opt.spawnRate || 300,
                canvas: opt.canvas || {
                    width: 320,
                    heigh: 240
                },
                t: 0,
                blades: []
            };
        },
        // update grass
        update: function (grass, t) {
            grass.t += t;
            grass.blades.forEach(function (blade) {
                blade.t += t;
                blade.t = blade.t > blade.tMax ? blade.tMax : blade.t;
            });
            if (grass.t >= grass.spawnRate) {
                // shift out old blade
                if (grass.blades.length >= grass.maxBlades) {
                    grass.blades.shift();
                }
                // push new blade
                grass.blades.push(Blade.create({
                        r: 100 + Math.floor(156 * Math.random()),
                        g: 100 + Math.floor(156 * Math.random()),
                        b: 100 + Math.floor(156 * Math.random()),
                        baseX: Math.floor(grass.canvas.width * Math.random()),
                        turn: -180 + 360 * Math.random(),
                        tMax: 1000 + Math.floor(20000 * Math.random()),
                        ptCount: 20 + Math.floor(30 * Math.random()),
                        segLength: 5,
                        widthMin: 1,
                        widthMax: 5
                    }));
                grass.t %= grass.spawnRate;
            }
        }
    }

}
    ());
