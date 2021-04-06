var gameMod = (function () {

    var api = {};

/********** ********** **********
  HARD CODED SETTINGS and DATA
********** ********** **********/

    var UNIT_PPS = 32,
    UNIT_RELEASE_RATE_MIN = 0.25,
    UNIT_RELEASE_RATE_MAX = 3,
    UNIT_HP_RANGE = [1, 10],
    UNIT_SPAWN_DIST = 400,
    SHOT_PPS = 512,
    SHOT_MAX_DIST = 375,
    PLAYER_UNIT_FIRE_RANGE = Math.PI / 180 * 5;

    var PLAYER_UNITS = {};

    // manual control turret
    PLAYER_UNITS.manual = {
        spawn: function(obj, pool, sm, opt){
            obj.heading = Math.PI * 1.5;
            obj.data.damage = 1;

            //obj.data.facing = obj.heading;
            //obj.data.target = null;
            //obj.data
            // Rotation and Fire Control object
            obj.RFControl = RFC_create();

        },
        update: function(obj, pool, sm, secs){
            RFC_update_facing(obj.RFControl, obj.heading, true, secs);
        },
        onclick: function(obj, pool, sm, pos, e){
            var unit = poolMod.getObjectAt(sm.game.unitPool, pos.x, pos.y);
            // fire a shot
            poolMod.spawn(sm.game.playerShotsPool, sm, {
                playerUnit: obj,
                pos: pos
            });

            //RFC_update_target(obj, pos.x, pos.y);

        },
        ondown: function(obj, pool, sm, pos, e){
        },
        onmove: function(obj, pool, sm, pos, e){
            RFC_update_target(obj, pos.x, pos.y);
        },
        onend: function(obj, pool, sm, pos, e){
        }
    };

/********** ********** **********
  Rotation and Fire Control object Helpers
********** ********** **********/

    var RFC_create = function(opt){
        opt = opt || {};
        return {
            radiansPerSec: Math.PI / 180 * 90,
            facing: 1.2,
            target: 0,
            fireRate: 0.125,
            fireSecs: 0,
            inRange: false
        };
    };

    var RFC_update_target = function(obj, x, y){
        obj.RFControl.target = utils.getAngleToPoint({x: x, y: y}, obj, utils.pi2);
    };

    var RFC_update_facing = function (rfc, heading, down, secs) {
        down = down || false;
        var toAngle = heading === undefined ? 0: heading;
        if (down) {
            toAngle = rfc.target;
        }
        var dist = utils.angleDistance(rfc.facing, toAngle, utils.pi2);
        var dir = utils.shortestAngleDirection(toAngle, rfc.facing, utils.pi2);
        var delta = rfc.radiansPerSec * secs;

        if (delta > dist) {
            rfc.facing = toAngle;
        } else {
            rfc.facing += delta * dir;
        }
        rfc.inRange = false;
        if (down && dist < PLAYER_UNIT_FIRE_RANGE) {
            rfc.inRange = true;
        }
    };

/********** ********** **********
  HELPERS
********** ********** **********/

    var createHPprops = function(obj, hpRange, hpPer){
        var HPDelta = Math.round( ( hpRange[1] -hpRange[0] ) * hpPer );
        obj.data.maxHP = hpRange[0] + HPDelta;
        obj.data.HP = obj.data.maxHP;
    };

    var onWaveStart = function (waveObj, sm) {
        sm.game.unitQueue.unitCount += waveObj.data.unitCount;
    };

/********** ********** **********
  PLAYER UNITS
********** ********** **********/

    var playerUnitSpawn = function (obj, pool, sm, opt) {

        // lifespan set to Infinity, will be set to zero in the event that
        // HP === 0
        obj.lifespan = Infinity;

        // type
        var type = opt.type || 'manual';
        obj.data.type = type;

        // Position
        obj.data.gridIndex = opt.gridIndex || 0;
        var size = 32,
        halfSize = size / 2,
        x = sm.canvas.width / 2 - halfSize,
        y = sm.canvas.height / 2 - halfSize;
        obj.heading = Math.PI * 1.5;
        obj.x = x;
        obj.y = y;
        obj.w = 32;
        obj.h = 32;
        obj.data.cx = obj.x + halfSize;
        obj.data.cy = obj.y + halfSize;

        // create base player unit HP Object
        createHPprops(obj, [10, 10], 1);

        // call spawn method for current type
        PLAYER_UNITS[type].spawn(obj, pool, sm, opt);
    };

    var playerUnitUpdate = function (obj, pool, sm, secs) {
        // unit becomes inactive when HP === 0
        if(obj.data.HP === 0){
            obj.lifespan = 0;
        }
        PLAYER_UNITS[obj.data.type].update(obj, pool, sm, secs);
    };

/********** ********** **********
  PLAYER SHOTS
********** ********** **********/

    var playerShotSpawn = function (obj, pool, sm, opt) {

        // set heading to pos
        //obj.heading = utils.getAngleToPoint(opt.pos, opt.playerUnit);

// use RF control to set heading
obj.heading = opt.playerUnit.RFControl.facing;

        obj.pps = SHOT_PPS;
        obj.w = 8;
        obj.h = 8;
        //obj.x = opt.playerUnit.x + opt.playerUnit.w / 2 - obj.w / 2;
        //obj.y = opt.playerUnit.y + opt.playerUnit.h / 2 - obj.h / 2;
        obj.x = opt.playerUnit.x - obj.w / 2;
        obj.y = opt.playerUnit.y - obj.h / 2; 
        obj.lifespan = Infinity;

        obj.data.playerUnit = opt.playerUnit;
        obj.data.damage = opt.playerUnit.data.damage;

    };

    var playerShotUpdate = function (obj, pool, sm, secs) {
        poolMod.moveByPPS(obj, secs);
        sm.game.unitPool.objects.forEach(function(eUnit){
            if(eUnit.active && poolMod.boundingBox(eUnit, obj)){
                eUnit.data.HP -= obj.data.damage;
                if(eUnit.data.HP <= 0){
                    eUnit.data.HP = 0;
                    eUnit.lifespan = 0;
                }
                obj.lifespan = 0;
            }
        });

        // distance from playerUnit that shot the shot
        if(utils.distance(obj.x, obj.y, obj.data.playerUnit.x, obj.data.playerUnit.y) >= SHOT_MAX_DIST){
            obj.lifespan = 0;
        }

    };

/********** ********** **********
  ENEMY UNITS
********** ********** **********/

    // Enemy unit spawn
    var unitSpawn = function (obj, pool, sm, opt) {
        var radian = Math.PI * 2 * Math.random(),
        radius = UNIT_SPAWN_DIST;
        obj.x = sm.canvas.width * 0.5 - obj.w / 2 + Math.cos(radian) * radius;
        obj.y = sm.canvas.height * 0.5 - obj.h / 2 + Math.sin(radian) * radius;
        obj.heading = radian + Math.PI;
        obj.lifespan = Infinity;

        // create HP Object
        createHPprops(obj, UNIT_HP_RANGE, opt.hpPer);

        // enemy unit damage
        obj.damage = 1;

    };

    // Enemy unit update
    var unitUpdate = function (obj, pool, sm, secs) {
        var cx = sm.canvas.width * 0.5,
        cy = sm.canvas.height * 0.5;
        obj.pps = UNIT_PPS;
        // enemy has come in range of player unit(s)
        if( utils.distance(obj.x + obj.w / 2, obj.y + obj.h / 2, cx, cy) <= 25 ){
            // apply damage to player units
            sm.game.playerUnitPool.objects.forEach((function(playerUnit){
                playerUnit.data.HP -= obj.damage;
                playerUnit.data.HP = playerUnit.data.HP < 0 ? 0 : playerUnit.data.HP;
            }));
            obj.lifespan = 0;
            obj.pps = 0;
        }
        poolMod.moveByPPS(obj, secs);
    };

/********** ********** **********
  CREATE a game object
********** ********** **********/

    api.create = function (opt) {
        opt = opt || {};
        var game = {
            activeCount: 0,
            win: false,
            gameOver: false,
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
            playerShotsPool: poolMod.create({
                count: 50,
                spawn: playerShotSpawn,
                update: playerShotUpdate,
                data: {}
            }),
            waveButtons: waveMod.create({
                startY: 64,
                waveCount: opt.waveCount || 99,
                baseUnitCount: opt.baseUnitCount || 10
            }),
            onWaveStart: onWaveStart
        };
        return game;
    };

/********** ********** **********
  UPDATE A game object
********** ********** **********/

    api.update = function (sm, secs) {
        var game = sm.game;
        // UNIT Queue
        if (game.unitQueue.unitCount > 0) {
            game.unitQueue.secs += secs;
            var releasePer = game.unitQueue.unitCount / 30;
            releasePer = releasePer > 1 ? 1 : releasePer;
            var releaseDelta = (UNIT_RELEASE_RATE_MAX - UNIT_RELEASE_RATE_MIN) * (1 - releasePer);
            game.unit_release_rate = UNIT_RELEASE_RATE_MIN + releaseDelta;
            if (game.unitQueue.secs > game.unit_release_rate) {
                // SPAWN A UNIT
                var waveData = game.waveButtons.pool.data,
                wavePer = waveData.currentWave / waveData.waveCount;
                var unit = poolMod.spawn(game.unitPool, sm, {
                    hpPer: wavePer
                });
                if (unit) {
                    game.unitQueue.unitCount -= 1;
                }
                game.unitQueue.secs = 0;
            }
        }
        // check player unit active count
        // game will end with a player loss if game.activeCount === 0
        if(poolMod.activeCount(game.playerUnitPool) === 0){
            game.win = false;
            game.gameOver = true;
        }

        var wbData = game.waveButtons.pool.data;
        var over = false,
        activeCount = poolMod.activeCount(game.unitPool);
        if(wbData.currentWave === wbData.waveCount){
            if(activeCount === 0 && sm.game.unitQueue.unitCount === 0){
                game.win = true;
                game.gameOver = true;
            }
        }
        game.activeCount = activeCount;

        // update wave buttons
        waveMod.update(sm, secs);
        // units
        poolMod.update(game.unitPool, secs, sm);
        poolMod.update(game.playerUnitPool, secs, sm);
        poolMod.update(game.playerShotsPool, secs, sm);
    };

/********** ********** **********
  CLICK
********** ********** **********/

    var unitEventCheck = function(type, game, pos, e, sm){
        game.playerUnitPool.objects.forEach(function(obj){
            var unitProfile = PLAYER_UNITS[obj.data.type];
            if(unitProfile['on' + type] && obj.active){
                unitProfile['on' + type](obj, game.playerUnitPool, sm, pos, e);
            }
        });
    };

    api.click = function(game, pos, e, sm){
        // wave buttons
        if(!waveMod.onClick(sm, pos)){
            unitEventCheck('click', game, pos, e, sm);
        }
    };

    api.onPointerDown = function(game, pos, e, sm){
        unitEventCheck('down', game, pos, e, sm);
    };
    api.onPointerMove = function(game, pos, e, sm){
        unitEventCheck('move', game, pos, e, sm);
    };
    api.onPointerUp = function(game, pos, e, sm){
        unitEventCheck('end', game, pos, e, sm);
    };

    // return the public api
    return api;
}
    ());
