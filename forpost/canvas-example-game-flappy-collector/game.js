
var game = (function () {

    // bounding box
    var bb = function (a, b) {
        return !(
            ((a.y + a.size) < (b.y)) ||
            (a.y > (b.y + b.size)) ||
            ((a.x + a.size) < b.x) ||
            (a.x > (b.x + b.size)));
    };

    // spawn a new berry
    var spawnBerry = function (bird, canvas) {
        var count = bird.berries.length,
        now = new Date(),
        secs = (now - bird.berriesLastSpawn) / 1000;
        if (secs >= bird.berriesDelay) {
            if (count < bird.berriesMax) {
                var yRange = canvas.height - 64;
                bird.berries.push({
                    x: canvas.width + 32,
                    y: yRange - Math.random() * yRange,
                    size: 32,
                    pps: 64
                });
            }
            bird.berriesLastSpawn = now;
        }
    };

    // update berries
    var updateBerries = function (bird, secs, canvas) {
        var i = bird.berries.length,
        berry;
        while (i--) {
            berry = bird.berries[i];
            berry.x -= berry.pps * secs;
            if (bb(bird, berry)) {
                bird.points += 1;
                bird.berries.splice(i, 1);
            }
            if (berry.x <= berry.size * -1) {
                bird.berries.splice(i, 1);
            }
        }
    };

    // update bird Pixels per second
    var updateBirdPPS = function (bird, secs) {
        bird.pps = 128 - 256 * bird.flap;
        bird.flap = bird.flap > 0 ? bird.flap - 0.9 * secs : 0;
    };

    // public api
    var api = {};

    // create and return a new bird ( game object )
    api.newBird = function () {
        return {
            x: 32,
            y: 0,
            size: 32,
            flap: 0,
            pps: 64,
            lt: new Date(),
            berries: [],
            berriesLastSpawn: new Date(),
            berriesDelay: 1,
            berriesMax: 4,
            points: 0
        };
    };

    // update a bird ( game object )
    api.update = function (bird, canvas) {
        var now = new Date(),
        secs = (now - bird.lt) / 1000;
        bird.y += bird.pps * secs;
        if (bird.y >= canvas.height - bird.size) {
            bird.y = canvas.height - bird.size;
        }
        if (bird.y < 0) {
            bird.y = 0;
        }
        updateBerries(bird, secs, canvas);
        spawnBerry(bird, canvas);
        updateBirdPPS(bird, secs);
        bird.lt = new Date();
    };

    // flap a bird
    api.flap = function (bird) {
        bird.flap = 1;
    };

    return api;

}
    ());
