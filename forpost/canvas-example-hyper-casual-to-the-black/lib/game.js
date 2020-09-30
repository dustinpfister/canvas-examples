var gameMod = (function () {

    var hardCode = {
        maxDistance: Number.MAX_SAFE_INTEGER, //1000000000000,
        ppsArray: [32, 64, 128, 256, 512, 1024, 2048, 4096]
    };

    var powerUpOptions = {
        count: 5,
        spawn: function (pu, game, opt) {

            pu.x = 0;
            pu.y = game.canvas.height - pu.h;
            pu.heading = Math.PI * 0.5;
            pu.pps = 64;

        },
        purge: function (pu, game) {},
        update: function (pu, game, secs) {
            poolMod.moveByPPS(pu, secs);
            pu.lifespan = 1;
            if (pu.y >= game.canvas.height - pu.h) {
                pu.active = false;
            }
        }
    };

    var api = {};

    var centerShip = function (game) {
        var ship = game.playerShip;
        ship.x = game.canvas.width / 2 - ship.w / 2;
    };

    api.create = function (opt) {
        opt = opt || {};
        var game = {
            canvas: opt.canvas || {
                width: 320,
                height: 240
            },
            ppsIndex: opt.ppsIndex === undefined ? 0 : opt.ppsIndex,
            pps: hardCode.ppsArray[opt.ppsIndex === undefined ? 0 : opt.ppsIndex], //opt.pps || hardCode.ppsArray[0],
            distance: 0, //opt.distance === undefined ? 0 : opt.distance,
            gamePer: 0,
            startTime: opt.startTime || new Date(),
            target: {
                distance: opt.targetDistance === undefined ? hardCode.maxDistance : targetDistance,
                timeUnit: opt.targetTimeUnit === undefined ? 'years' : opt.targetTimeUnit,
                ETA: 0
            },
            input: {
                right: false,
                left: false
            },
            playerShip: {
                x: 0,
                y: 0,
                w: 32,
                h: 32
            },
            powerUps: {
                pool: poolMod.create(powerUpOptions),
                secs: 0,
                spawnRate: 3
            },
            distObj: opt.distObj || {}
        };
        console.log(game.powerUps);
        centerShip(game);
        return game;
    };

    var secsToX = function (secs, x) {
        x = x === undefined ? 'days' : x;
        if (x === 'minutes') {
            return secs / 60;
        }
        if (x === 'hours') {
            return secs / 60 / 60;
        }
        if (x === 'days') {
            return secs / 60 / 60 / 24;
        }
        if (x === 'years') {
            return secs / 60 / 60 / 24 / 365.25;
        }
        return secs;
    };

    // set state distance based on startTime
    // and distObj of PPS and time key pairs
    var setDistance = function (game, now) {
        // before I credit I first need to know the amount of time
        // and distance thus far
        var storedSecs = 0,
        storedDist = 0;
        Object.keys(game.distObj).forEach(function (pps) {
            var secs = game.distObj[pps];
            storedSecs += secs;
            storedDist += Number(pps) * secs;
        });
        // now I can subtract storedSecs from secs and
        // use that to set Delta distance for current PPS
        var secs = (now - game.startTime) / 1000 - storedSecs,
        deltaDist = game.pps * secs;
        // update distObj for current PPS
        var current = game.distObj[game.pps];
        game.distObj[game.pps] = current === undefined ? secs : current + secs;
        // now I can set distance
        game.distance = storedDist + deltaDist;
    };

    var timeToDistance = function (game, distance) {
        if (game.distance < distance) {
            var secs = (distance - game.distance) / game.pps;
            return secs;
        }
        return 0;
    };

    api.update = function (game, secs, now) {

        // distance
        //game.distance = game.distance + game.pps * secs;
        setDistance(game, now);
        game.distance = game.distance > hardCode.maxDistance ? hardCode.maxDistance : game.distance;
        game.gamePer = game.distance / hardCode.maxDistance;

        // target
        var secsToTarget = timeToDistance(game, game.target.distance);
        game.target.ETA = secsToX(secsToTarget, game.target.timeUnit);

        // player display object
        var xPPS = 0;
        xPPS = game.input.right ? xPPS + 32 : xPPS;
        xPPS = game.input.left ? xPPS - 32 : xPPS;
        //game.playerShip.x = game.canvas.width / 2 - 16;
        game.playerShip.x += xPPS * secs;
        game.playerShip.x = game.playerShip.x < 0 ? 0 : game.playerShip.x;
        game.playerShip.x = game.playerShip.x > game.canvas.width - game.playerShip.w ? game.canvas.width - game.playerShip.w : game.playerShip.x;
        game.playerShip.y = game.canvas.height - 64;

        // power ups
        var pow = game.powerUps;
        pow.secs += secs;
        if (pow.secs >= pow.spawnRate) {
            console.log('spawn');
            pow.secs %= pow.spawnRate;
        }
    };

    return api;
}
    ());
