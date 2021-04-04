var gameMod = (function () {

    var UNIT_PPS = 32,
    UNIT_RELEASE_RATE_MIN = 0.25,
    UNIT_RELEASE_RATE_MAX = 3,
    UNIT_HP_RANGE = [1, 10];

    // unit helpers
    var createHPObject = function(obj, hpRange, hpPer){
        var HPDelta = Math.round( ( hpRange[1] -hpRange[0] ) * hpPer );
        obj.data.maxHP = hpRange[0] + HPDelta;
        obj.data.HP = obj.data.maxHP;
    };


    var PLAYER_UNITS = {};

    // manual control turret
    PLAYER_UNITS.manual = {
        spawn: function(obj, pool, sm, opt){
            obj.heading = Math.PI * 1.5;
            obj.data.facing = obj.heading;
            obj.data.target = null;
        },
        update: function(obj, pool, sm, secs){},
        onClick:function(obj, pool, sm, pos, e){
            var unit = poolMod.getObjectAt(sm.game.unitPool, pos.x, pos.y);
            if(unit){
                unit.data.HP -= 1;
                if(unit.data.HP <= 0){
                    unit.data.HP = 0;
                    unit.lifespan = 0;
                }
            }
        }
    };

    var api = {};

    var playerUnitSpawn = function (obj, pool, sm, opt) {
        // type
        var type = opt.type || 'manual';
        obj.data.type = type;

        // Position
        obj.data.gridIndex = opt.gridIndex || 0;
        var size = 32,
        halfSize = size / 2,
        x = sm.canvas.width / 2 - halfSize,
        y = sm.canvas.height / 2 - halfSize;
        obj.x = x;
        obj.y = y;
        obj.data.cx = obj.x + halfSize;
        obj.data.cy = obj.y + halfSize;

        // create base player unit HP Object
        createHPObject(obj, [100, 100], 1);

        // call spawn method for current type
        PLAYER_UNITS[type].spawn(obj, pool, sm, opt);
    };

    var playerUnitUpdate = function (obj, pool, sm, secs) {
        PLAYER_UNITS[obj.data.type].update(obj, pool, sm, secs);
    };

    // Enemy unit spawn
    var unitSpawn = function (obj, pool, sm, opt) {
        var radian = Math.PI * 2 * Math.random(),
        radius = sm.canvas.width * 0.5;
        obj.x = sm.canvas.width * 0.5 - obj.w / 2 + Math.cos(radian) * radius;
        obj.y = sm.canvas.height * 0.5 - obj.h / 2 + Math.sin(radian) * radius;
        obj.heading = radian + Math.PI;
        obj.lifespan = Infinity;

        // create HP Object
        createHPObject(obj, UNIT_HP_RANGE, opt.hpPer);
    };

    // Enemy unit update
    var unitUpdate = function (obj, pool, sm, secs) {
        var cx = sm.canvas.width * 0.5,
        cy = sm.canvas.height * 0.5;
        obj.pps = UNIT_PPS;
        if( utils.distance(obj.x + obj.w / 2, obj.y + obj.h / 2, cx, cy) <= 25 ){
            obj.lifespan = 0;
            obj.pps = 0;
        }
        poolMod.moveByPPS(obj, secs);
    };

    var onWaveStart = function (waveObj, sm) {
        sm.game.unitQueue.unitCount += waveObj.data.unitCount;
    };

    api.create = function () {
        var game = {
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
            playerUnitPool: poolMod.create({
                count: 1,
                spawn: playerUnitSpawn,
                update: playerUnitUpdate,
                data: {}
            }),
            waveButtons: waveMod.create({
                startY: 64,
                waveCount: 99,
                baseUnitCount: 10
            }),
            onWaveStart: onWaveStart
        };
        return game;
    };

    api.update = function (sm, secs) {
        if (sm.game.unitQueue.unitCount > 0) {
            sm.game.unitQueue.secs += secs;
            var releasePer = sm.game.unitQueue.unitCount / 30;
            releasePer = releasePer > 1 ? 1 : releasePer;
            var releaseDelta = (UNIT_RELEASE_RATE_MAX - UNIT_RELEASE_RATE_MIN) * (1 - releasePer);
            sm.game.unit_release_rate = UNIT_RELEASE_RATE_MIN + releaseDelta;
            if (sm.game.unitQueue.secs > sm.game.unit_release_rate) {
                // SPAWN A UNIT
                var waveData = sm.game.waveButtons.pool.data,
                wavePer = waveData.currentWave / waveData.waveCount;
                var unit = poolMod.spawn(sm.game.unitPool, sm, {
                    hpPer: wavePer
                });
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

    api.click = function(game, pos, e, sm){

        // unit
        //var unit = poolMod.getObjectAt(game.unitPool, pos.x, pos.y);
        //if(unit){
            //unit.lifespan = 0;

        //}

        game.playerUnitPool.objects.forEach(function(obj){

            var unitProfile = PLAYER_UNITS[obj.data.type];

            if(unitProfile.onClick){
                unitProfile.onClick(obj, game.playerUnitPool, sm, pos, e);
            }
        });

    };

    return api;
}
    ());
