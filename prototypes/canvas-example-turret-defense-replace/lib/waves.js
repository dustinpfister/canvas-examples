var waveMod = (function () {

    var BUTTON_HEIGHT = 128,
    BUTTON_BASE_PPS = BUTTON_HEIGHT / 60, // every 30 secs
    BUTTON_RUSH_PPS = BUTTON_HEIGHT / 1; // every 1 sec

    var api = {};

    // spawn an update methods
    var spawn = function (obj, pool, sm, opt) {
        obj.heading = Math.PI * 1.5;
        obj.pps = pool.data.pps; //opt.pps || BUTTON_BASE_PPS;
        obj.h = BUTTON_HEIGHT;
        obj.lifespan = Infinity;
        obj.x = opt.x || 0;
        obj.y = opt.startY;

        obj.data.waveNumber = pool.data.waveNumber || 0;
        obj.data.unitCount = pool.data.baseUnitCount;

        pool.data.waveNumber += 1;
        pool.data.toSpawn -= 1;
    };

    var update = function (obj, pool, sm, secs) {
        obj.pps = pool.data.pps;
        poolMod.moveByPPS(obj, secs);
        if (obj.y <= 0) {
            obj.active = false;
            sm.game.onWaveStart(obj, sm);
            pool.data.currentWave += 1;
        }
    };

    // create a waveButtons pool
    api.create = function (opt) {
        opt = opt || {};
        opt.startY = opt.startY || 0;
        var pool = poolMod.create({
                count: 4, // max number of buttons on the canvas
                spawn: spawn,
                update: update,
                data: {
                    pps: BUTTON_BASE_PPS,
                    baseUnitCount: opt.baseUnitCount || 1,
                    currentWave: 0,
                    waveNumber: 1,
                    waveCount: opt.waveCount || 0, // total number of waves
                    toSpawn: opt.waveCount,
                    activeCount: 4,
                    rushTo: 0
                }
            });
        // set all to active
        //poolMod.setActiveStateForAll(pool, true);
        pool.objects.map(function (obj, i) {
            // if i is less than wave count then start the object
            // off as active
            if (i < opt.waveCount) {
                poolMod.spawn(pool, sm, {
                    x: opt.x,
                    startY: opt.startY + i * BUTTON_HEIGHT
                });
            }
        });
        return {
            x: opt.x || 0, // the upper left position of the wave bar
            y: opt.y || 0,
            pool: pool
        };
    };

    var getLowsetActive = function (pool) {
        var lowest = {
            y: 0,
            obj: {}
        };
        pool.objects.forEach(function (obj, i) {
            if (obj.active && obj.y > lowest.y) {
                lowest.y = obj.y;
                lowest.obj = obj;
            }
        });
        return lowest.obj;
    };

    api.update = function (sm, secs) {
        // get pool
        var pool = sm.game.waveButtons.pool;
        // update all buttons
        poolMod.update(pool, secs, sm);
        // spawn next button
        pool.data.activeCount = poolMod.activeCount(pool);
        if (pool.data.activeCount < pool.objects.length && pool.data.toSpawn > 0) {
            var lowest = getLowsetActive(pool);
            poolMod.spawn(pool, sm, {
                startY: lowest.y + BUTTON_HEIGHT //sm.canvas.height
            });
        }
        pool.data.pps = BUTTON_BASE_PPS;
        if (pool.data.rushTo > pool.data.currentWave) {
            pool.data.pps = BUTTON_RUSH_PPS;
        }
    };

    api.onClick = function (sm, pos) {
        var pool = sm.game.waveButtons.pool;
        var obj = poolMod.getObjectAt(pool, pos.x, pos.y);
        if (obj) {
            pool.data.rushTo = obj.data.waveNumber;
        }
    }

    return api;

}
    ());
