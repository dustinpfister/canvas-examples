var gameMod = (function () {

    var hardCode = {
        maxDistance: Number.MAX_SAFE_INTEGER, //1000000000000,
        ppsArray: [32, 64, 128, 256, 512, 1024, 2048, 4096]
    };

    var powerUpOptions = {
        count: 100,
        w: 16,
        h: 16,
        spawn: function (pu, pool, game, opt) {
            var ps = game.playerShip;
            pu.x = utils.mod(ps.x + ps.w + 1 + Math.floor((canvas.width - ps.w - pu.w - 2) * Math.random()), canvas.width);
            pu.y = pu.h * -1;
            pu.heading = Math.PI * 0.5;
            pu.pps = 128;
            pu.lifespan = 1;
        },
        purge: function (pu, pool, game) {},
        update: function (pu, pool, game, secs) {
            poolMod.moveByPPS(pu, secs);
            pu.lifespan = 1;
            // if power up reaches other side of canvas
            if (pu.y >= game.canvas.height) {
                pu.lifespan = 0;
            }
            // hits player object
            if (poolMod.boundingBox(pu, game.playerShip)) {
                if (game.powerUps.stack.length < 6) {
                    game.powerUps.stack.push({
                        secs: 0,
                        maxSecs: 10,
                        ppsIndex: 1
                    });
                    console.log('power up');
                    console.log(game.powerUps.stack);
                }
                pu.lifespan = 0;
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
                stack: [],
                secs: 0,
                spawnRate: 0.1
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

        // speed
        game.pps = hardCode.ppsArray[game.ppsIndex];

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
        // spawn
        pow.secs += secs;
        if (pow.secs >= pow.spawnRate) {
            poolMod.spawn(pow.pool, game, {});
            pow.secs %= pow.spawnRate;
        }
        // update
        poolMod.update(pow.pool, secs, game);
        // update stack
        var i = pow.stack.length,
        stackItem;
        game.ppsIndex = 0;
        while (i--) {
            stackItem = pow.stack[i];
            stackItem.secs += secs;
            if (stackItem.secs >= stackItem.maxSecs) {
                pow.stack.splice(i, 1);
            } else {
                game.ppsIndex += 1;
            }
        }
    };

    return api;
}
    ());
