var gameMod = (function(){
    
    // CONSTANTS
    var BLOCK_COUNT = 20,
    BLOCK_POS_MIN_DIST = 110, //220, // center of grid location ( see getFreePositions helper )
    BLOCK_POS_MAX_DIST = 1000,
    BLOCK_POS_ADELTA = 45,    // the max DEGREE left or right from current map angle
    BLOCK_POS_SLOT_DIST = 15,
    BLOCK_HP_MIN = 5,
    BLOCK_HP_MAX = 1000,
    SHIP_AUTOFIRE = true,
    MAP_MAX_DIST = Math.pow(10,5); //Number.MAX_SAFE_INTEGER;      // max distance from 0,0

    // DEFAULT WEAPON OBJECTS
    var DEFAULT_WEAPONS = {
        0 : {
            name: "Pulse gun",
            firesPerSecond: 2,
            shotDamage: 1,
            shotsPerFire: 1
        },
        1 : {
            name: "Cannon",
            firesPerSecond: 5,
            shotDamage: 3,
            shotsPerFire: 1
        },
        2 : {
            name: "Atom",
            firesPerSecond: 1,
            shotDamage: 100,
            shotsPerFire: 1
        }
    };

    var api = {};

    // HIT POINTS
    var CreateHPObject = function(maxHP){
        return {
            current: maxHP || 100,
            max: maxHP || 100,
            per: 1
        };
    };

    // attack the given object with the given amount of damage
    var attackObject = function(obj, damage){
        if(obj.hp){
            obj.hp.current -= damage;
            obj.hp.current = obj.hp.current < 0 ? 0 : obj.hp.current;
            obj.hp.per = obj.hp.current / obj.hp.max;
        }
    };

    // create shots pool helper
    var createShotsPool = function(){
        return poolMod.create({
                count: 60,
                fillStyle: 'red',
                r: 2,
                spawn: function(obj, pool, state, opt){
                    obj.x = 0;
                    obj.y = 0;
                    // shot radian should be set to current map radian
                    obj.radian = state.game.map.radian;
                    obj.pps = 128;
                    obj.lifespan = 3;
                    var weapon = state.game.ship.weapon;
                    obj.damage = weapon.shotDamage;
                },
                update: function(shot, pool, state, secs){
                    var objDeltaX = Math.cos(shot.radian) * shot.pps * secs;
                    var objDeltaY = Math.sin(shot.radian) * shot.pps * secs;
                    shot.x += objDeltaX;
                    shot.y += objDeltaY;
                    // check if the shot has hit an active block
                    var blocks = poolMod.getAllActive(state.game.blocks, true);

                    var i = blocks.length;
                    while(i--){
                        var block = blocks[i];
                        var dist = utils.distance(shot.x, shot.y, block.x, block.y);
                        // if a shot hits a block
                        if(dist <= block.r + shot.r){
                            shot.lifespan = 0;
                            attackObject(block, shot.damage);
                            if(block.hp.current <= 0 ){
                                block.lifespan = 0;
                                block.active = false;
                            }
                            break;
                        }
                    }

                }
            });
    };

    // BLOCK POOL

    // get a block distance between BLOCK_POS_MIN_DIST and BLOCK_POS_MAX_DIST with given per
    var getBlockDist = function(per){
        return BLOCK_POS_MIN_DIST + (BLOCK_POS_MAX_DIST - BLOCK_POS_MIN_DIST) * per;
    };

    // get all free positions where a block can go
    // will retrun an empty array in the event that there are none
    var getFreePositions = function(game, blockPool){
        var map = game.map,
        activeBlocks = poolMod.getAllActive(blockPool || game.blocks, true),
        xMapAjust = utils.mod(game.map.x, 32), // take into account current map position
        yMapAjust = utils.mod(game.map.y, 32),
        spotX, // the position relative to 0,0
        spotY,
        blockIndex,
        block,
        //dist = getBlockDist(0), // get a distance from ship
        free = [],
        gridH = 10,
        gridW = 10,
        slotDist = BLOCK_POS_SLOT_DIST,
        // starting position of grid
        //sx = Math.ceil(gridW / 2 * -1) + Math.ceil(Math.cos(game.map.radian) * (gridW / 2 + slotDist ) ), 
        //sy = Math.ceil(gridH / 2 * -1) + Math.ceil(Math.sin(game.map.radian) * (gridH / 2 + slotDist ) ),
        sx = Math.ceil(Math.cos(game.map.radian) * (gridH / 2 + slotDist) - gridW / 2),
        sy = Math.ceil(Math.sin(game.map.radian) * (gridH / 2 + slotDist) - gridH / 2),
        x = sx, // grid position
        y = sy;
        while(y < gridH + sy){
            x = sx;
            spotY =  y * 32 - yMapAjust;
            loopx:while(x < gridW + sx){
                spotX = x * 32 - xMapAjust;
                blockIndex = activeBlocks.length;
                while(blockIndex--){
                    block = activeBlocks[blockIndex];
                    if(utils.distance(block.x, block.y, spotX, spotY) <= block.r){
                       x+=1;
                       continue loopx;
                    }
                }
                free.push({
                    x: spotX,
                    y: spotY
                });
                x += 1;
            }
            y += 1;
        }
        return free;
    };

    // set block position helper
    var setBlockPos = function(game, block, dist, a){
        block.x = game.ship.x + Math.cos(a) * dist;
        block.y = game.ship.y + Math.sin(a) * dist;
    };

    // basic random positioning of a block
    var positionBlockRandom = function(state, obj){
        var game = state.game,
        map = game.map,
        rDelta = Math.PI / 180 * BLOCK_POS_ADELTA,
        dist =  getBlockDist(Math.random());
        var a = utils.wrapRadian(map.radian - rDelta + ( rDelta * 2 ) * Math.random()); //Math.PI * 2 * Math.random();
        setBlockPos(game, obj, dist, a)
    };

    var positionBlock = function(state, obj){
        var game = state.game,
        map = game.map,
        dist =  getBlockDist(0),
        rDelta = Math.PI / 180 * BLOCK_POS_ADELTA;

        var freeSlots = getFreePositions(game);
        if(freeSlots.length === 0){
            obj.active = false;
            obj.lifespan = 0;
        }else{
            var slot = freeSlots.splice(Math.floor(freeSlots.length * Math.random()), 1)[0];
            obj.x = slot.x;
            obj.y = slot.y;
        }
    };



    // create block pool helper
    var createBlocksPool = function(){
        return poolMod.create({
            data: {},
            fillStyle: '#1a1a1a',
            count: BLOCK_COUNT,
            spawn: function(obj, pool, state, opt){
                var game = state.game;

                // set starting position of block
                positionBlock(state, obj);

                obj.radian = utils.wrapRadian(game.map.radian + Math.PI);
                obj.pps = game.map.pps;
                obj.lifespan = 1;
                obj.hp = CreateHPObject( BLOCK_HP_MIN + Math.round( (BLOCK_HP_MAX - BLOCK_HP_MIN) ) * game.map.per );
                obj.damage = 1;
            },
            update: function(obj, pool, state, secs){
                obj.lifespan = 1;
                var game = state.game;
                var map = state.game.map;
                obj.radian = utils.wrapRadian(state.game.map.radian + Math.PI);
                obj.pps = state.game.map.pps;
                var objDeltaX = Math.cos(obj.radian) * obj.pps * secs;
                var objDeltaY = Math.sin(obj.radian) * obj.pps * secs;
                obj.x += objDeltaX;
                obj.y += objDeltaY;
                // data object for 'block'
                obj.data.dist = utils.distance(obj.x, obj.y, state.game.ship.x, state.game.ship.y);
                // become inactive if
                // block hits ship
                if(obj.data.dist <= game.ship.r + obj.r){
                    attackObject(game.ship, obj.damage);
                    obj.lifespan = 0;
                }
                // block goes out of range
                if(obj.data.dist >= BLOCK_POS_MAX_DIST){
                    obj.lifespan = 0;
                }
            }
        });
    };

    // public create method
    api.create = function(){
        var game = {
            weapons: utils.deepClone(DEFAULT_WEAPONS),
            ship: { 
                x: 0, // ship position relative to map position
                y: 0,
                r: 8,
                hp: CreateHPObject(100),
                fillStyle: 'blue',
                weaponSecs: 0,
                weapons: {},
/*
                weapon: { // reference to the current weapon for the ship
                    name: 'foo',
                    firesPerSecond: 2,
                    shotsPerFire: 1,
                    shotDamage: 5
                }
*/
            },
            shots: createShotsPool(),
            blocks: createBlocksPool(),
            map: { // map position
                x: 0,
                y: 0,
                radian: 0, //Math.PI / 180 * 45,
                pps: 0,
                maxPPS: 256,
                dist: 0,
                per: 0
            }
        };

        // set current weapon
        game.ship.weapon = game.weapons[0];


        // text block pool
        //var testBlocks = createBlocksPool();
        //testBlocks.objects[0].active = true;
        //testBlocks.objects[0].x = 32;
        //testBlocks.objects[0].y = 32;
        //console.log(getFreePositions(game, testBlocks));


        return game;
    };

    // set map movment values and wrap or clamp anything that might go out of range
    api.setMapMovement = function(game, degree, pps){
        game.map.radian = utils.wrapRadian(Math.PI / 180 * degree);
        // clamp PPS
        game.map.pps = pps;
        game.map.pps = game.map.pps < 0 ? 0 : game.map.pps;
        game.map.pps = game.map.pps > game.map.maxPPS ? game.map.maxPPS : game.map.pps;
    };

    // clamp map pos helper for map updater
    var clampMapPos = function(map){
        if(map.dist >= MAP_MAX_DIST){
          var radian = utils.wrapRadian(map.radian + Math.PI);
          map.x = Math.cos(radian) * MAP_MAX_DIST;
          map.y = Math.sin(radian) * MAP_MAX_DIST;
        }
    };
    // update the MAP using current RADIAN and PPS values
    // with the given SECS value.
    api.updateMap = function(game, secs){
        var map = game.map;
        map.x += Math.cos(map.radian) * map.pps * secs;
        map.y += Math.sin(map.radian) * map.pps * secs;
        map.dist = utils.distance(0, 0, map.x, map.y);
        clampMapPos(map);
        map.per = game.map.dist / MAP_MAX_DIST;
        map.aToOrigin = utils.angleTo(map.x, map.y, 0, 0);
    };

    api.updateBlocks = function(game, secs, state){
        poolMod.update(game.blocks, secs, state);
        poolMod.spawn(game.blocks, state, {});
    };

    api.updateShots = function(game, secs, state){

        var ship = game.ship,
        weapon = ship.weapon;

        ship.weaponSecs += secs;
        if(SHIP_AUTOFIRE){
            if(ship.weaponSecs >= 1 / weapon.firesPerSecond){
                poolMod.spawn(game.shots, state, {});
                ship.weaponSecs = 0;
            }
        }
        poolMod.update(game.shots, secs, state);
    };

    // return the Public API
    return api;
}());