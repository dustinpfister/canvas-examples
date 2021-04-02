var gameMod = (function () {
    var UNIT_PPS = 32,
    UNIT_RELEASE_RATE_MIN = 0.25,
    UNIT_RELEASE_RATE_MAX = 3;
    var api = {};

    // on unit spawn
    var unitSpawn = function (obj, pool, sm, opt) {
        obj.heading = Math.PI * 0.5;
        //var delta = sm.canvas.width * 0.5 * Math.random();
        //obj.x = sm.canvas.width * 0.25 + delta;
        //obj.y = 0;

var radian = Math.PI * 2 * Math.random(),
radius = sm.canvas.width * 0.5;
obj.x = sm.canvas.width * 0.5 - obj.w / 2 + Math.cos(radian) * radius;
obj.y = sm.canvas.height * 0.5 - obj.h / 2 + Math.sin(radian) * radius;
obj.heading = radian + Math.PI;

        obj.lifespan = Infinity;
    };

    // on unit update
    var unitUpdate = function (obj, pool, sm, secs) {
        obj.pps = UNIT_PPS;

var cx = sm.canvas.width * 0.5,
cy = sm.canvas.height * 0.5;
if( utils.distance(obj.x + obj.w / 2, obj.y + obj.h / 2, cx, cy) <= 25 ){
    obj.lifespan = 0;
}

        poolMod.moveByPPS(obj, secs);


        //if (obj.y >= sm.canvas.height - 50) {
        //    obj.lifespan = 0;
        //}
    };

    var onWaveStart = function (waveObj, sm) {
        sm.game.unitQueue.unitCount += waveObj.data.unitCount;
    };

    api.create = function () {
        return {
            unitQueue: {
                unitCount: 0,
                secs: 0
            },
            unitPool: poolMod.create({
                count: 30,
                spawn: unitSpawn,
                update: unitUpdate,
                data: {}
            }),
            waveButtons: waveMod.create({
                startY: 64,
                waveCount: 99,
                baseUnitCount: 10
            }),
            onWaveStart: onWaveStart
        };
    };

    api.update = function (sm, secs) {

        if (sm.game.unitQueue.unitCount > 0) {
            sm.game.unitQueue.secs += secs;
            var releasePer = sm.game.unitQueue.unitCount / 30;
            releasePer = releasePer > 1 ? 1 : releasePer;
            var releaseDelta = (UNIT_RELEASE_RATE_MAX - UNIT_RELEASE_RATE_MIN) * (1 - releasePer);
            sm.game.unit_release_rate = UNIT_RELEASE_RATE_MIN + releaseDelta;
            if (sm.game.unitQueue.secs > sm.game.unit_release_rate) {
                var unit = poolMod.spawn(sm.game.unitPool, sm, {});
                if (unit) {
                    sm.game.unitQueue.unitCount -= 1;
                }
                sm.game.unitQueue.secs = 0;
            }
        }

        // update wave buttons
        waveMod.update(sm, secs);

        //
        poolMod.update(sm.game.unitPool, secs, sm);

    };

    return api;
}
    ());
