
var game = (function () {

    // BOUNDING BOX
    var bb = function (a, b) {
        return !(
            ((a.y + a.size) < (b.y)) ||
            (a.y > (b.y + b.size)) ||
            ((a.x + a.size) < b.x) ||
            (a.x > (b.x + b.size)));
    };

    // BERRIES

    // spawn a new berry
    var spawnBerry = function (bird, canvas) {
        var count = bird.berries.length,
        now = new Date(),
        secs = (now - bird.berriesLastSpawn) / 1000;
        if (secs >= bird.berriesDelay) {
            if (count < bird.berriesMax) {
                var yRange = canvas.height - 64,
                l = bird.berryLevel - 1,
                p = (l > 16 ? 16 : l) / 16;
                bird.berries.push({
                    x: canvas.width + 32,
                    y: yRange - Math.random() * yRange,
                    size: 32,
                    pps: 32 + Math.floor(96 * p),
                    worth: 1 + 0.25 * l
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
                bird.points += berry.worth;
                bird.berries.splice(i, 1);
                bird.berriesCollected += 1;
            }
            if (berry.x <= berry.size * -1) {
                bird.berries.splice(i, 1);
            }
        }
    };

    // set berry next level property
    var berryNextLevelSet = function (bird) {
        var e = Math.floor(Math.log(bird.berriesCollected) / Math.log(2));
        bird.berriesNextLevel = e >= 6 ? Math.pow(2, bird.berryLevel + 5) : 64;
    };

    // check and set berry level
    var berryLevelCheck = function (bird) {
        var e = Math.floor(Math.log(bird.berriesCollected) / Math.log(2));
        berryNextLevelSet(bird);
        bird.berryLevel = e >= 6 ? e - 4 : 1;
        berryNextLevelSet(bird);
    };

    // set the berries delay based on current berry level
    var setBerriesDelay = function (bird) {
        var l = bird.berryLevel - 1,
        p = (l > 16 ? 16 : l) / 16;
        bird.berriesDelay = 3 - 3.75 * p;
    };

    // BIRD

    // update bird Pixels per second
    var updateBirdPPS = function (bird, secs) {
        bird.pps = 128 - 256 * bird.flap;
        bird.flap = bird.flap > 0 ? bird.flap - secs * 1 : 0;
    };

    // AUTO PLAY MODE

    // return true if the bird should flap in order to get
    // the next berry
    var getShouldFlap = function (bird) {
        var berry = bird.berries[0];
        if (berry) {
            return berry.y + 16 < bird.y ? true : false;
        }
        return false;
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
            pps: 0,
            lt: new Date(),
            // berries
            berries: [],
            berryLevel: 1,
            berriesCollected: 0, // used in level up
            berriesNextLevel: Infinity, // used in level up
            berriesLastSpawn: new Date(),
            berriesDelay: 3,
            berriesMax: 100,
            // points
            points: 0,
            // auto play
            shouldFlap: false,
            autoPlay: true,
            autoTime: 5,
            autoDelay: 5
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

        // berries
        updateBerries(bird, secs, canvas);
        spawnBerry(bird, canvas);
        berryNextLevelSet(bird);
        berryLevelCheck(bird);
        setBerriesDelay(bird);

        // bird pps
        updateBirdPPS(bird, secs);

        // auto play
        bird.shouldFlap = getShouldFlap(bird);
        if (bird.autoPlay && bird.shouldFlap) {
            bird.flap = 1;
        } else {
            bird.autoTime -= secs;
            bird.autoTime = bird.autoTime < 0 ? 0 : bird.autoTime;
            bird.autoPlay = bird.autoTime === 0 ? true : false;
        }

        bird.lt = new Date();
    };

    // flap a bird
    api.flap = function (bird) {
        //if (bird.autoPlay) {

        //}
        bird.autoPlay = false;
        bird.autoTime = bird.autoDelay;
        bird.flap = 1;
    };

    return api;

}
    ());
