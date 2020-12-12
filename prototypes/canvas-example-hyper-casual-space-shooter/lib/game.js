var gameMod = (function(){
    
    // CONSTANTS
    var BLOCK_COUNT = 20,
    BLOCK_POS_MAX_DIST = 600,
    BLOCK_POS_SLOT_DIST = 15,
    BLOCK_HP_MIN = 5,
    BLOCK_HP_MAX = 1000,
    BLOCK_MONEY_BASE = 1,
    BLOCK_MONEY_DIST = 999,
    SHIP_AUTOFIRE = false,
    SHIP_HP = 5,
    MAP_MAX_DIST = Math.pow(10,5); //Number.MAX_SAFE_INTEGER;      // max distance from 0,0

    // DEFAULT WEAPON OBJECTS
    var DEFAULT_WEAPONS = {
        0 : {
            name: "Pulse gun",
            firesPerSecond: 2,
            shotDamage: 1
        },
        1 : {
            name: "Cannon",
            firesPerSecond: 5,
            shotDamage: 3
        },
        2 : {
            name: "Atom",
            firesPerSecond: 1,
            shotDamage: 100
        }
    };

    var api = {};

    // HIT POINTS
    var CreateHPObject = function(maxHP){
        return {
            current: maxHP || 100,
            max: maxHP || 100,
            per: 1,
            autoHeal: {
                rate: 1,
                amount: 1, // every RATE heal AMOUNT
                secs: 0
            }
        };
    };

    var autoHealObject = function(obj, secs){
        if(obj.hp){
            obj.hp.autoHeal.secs += secs;
            if(obj.hp.autoHeal.secs >= obj.hp.autoHeal.rate){
                obj.hp.current += obj.hp.autoHeal.amount;
                obj.hp.current = obj.hp.current > obj.hp.max ? obj.hp.max : obj.hp.current;
                obj.hp.autoHeal.secs = 0;
            }
        }
    };

    var onShipDeath = function(game){
        game.ship = createShip(game);
        game.map.x = 0;
        game.map.y = 0;
        // set all blocks inactive
        poolMod.getAllActive(game.blocks).forEach(function(block){
           block.active = false;
           block.lifespan = 0;
        });
        // game money effected
        game.money = game.money > 0 ? game.money / 2 : 0;
    };

    // attack the given object with the given amount of damage
    var attackObject = function(game, obj, damage){
        if(obj.hp){
            obj.hp.current -= damage;
            obj.hp.current = obj.hp.current < 0 ? 0 : obj.hp.current;
            obj.hp.per = obj.hp.current / obj.hp.max;
            // if ship death
            if(obj.hp.current === 0 && obj.type === 'ship'){
                onShipDeath(game);
            }
        }
    };

    // SHOTS

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
                    obj.damage = weapon.shotDamage; // damage when shot hits a block
                   
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
                            attackObject(state.game, block, shot.damage);
                            // if the block is dead
                            if(block.hp.current <= 0 ){
                                state.game.money += block.money;
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
        free = [],
        gridH = 10,
        gridW = 10,
        slotDist = BLOCK_POS_SLOT_DIST,
        // starting position of grid
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

    // position a block
    var positionBlock = function(state, obj){
        var game = state.game;
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
                // block money based on BASE amount plus DIST AMOUNT
                obj.money = BLOCK_MONEY_BASE + Math.round(game.map.per * BLOCK_MONEY_DIST);
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
                    attackObject(game, game.ship, obj.damage);
                    obj.lifespan = 0;
                }
                // block goes out of range
                if(obj.data.dist >= BLOCK_POS_MAX_DIST){
                    obj.lifespan = 0;
                }
            }
        });
    };

    var createShip = function(game){
        var ship = {
            type: 'ship',
            x: 0, // ship position relative to map position
            y: 0,
            r: 8,
            hp: CreateHPObject(SHIP_HP),
            fillStyle: 'blue',
            weaponSecs: 0,
            weapon: game.weapons[0] // reference to the current weapon
        };
        return ship;
    };

    // public create method
    api.create = function(){
        var game = {
            money: 0,
            weapons: utils.deepClone(DEFAULT_WEAPONS),
            ship: {}, //createShip(),
            shots: createShotsPool(),
            blocks: createBlocksPool(),
            map: { // map position
                x: 0,
                y: 0,
                radian: 0, 
                pps: 0,
                maxPPS: 256,
                dist: 0,
                per: 0 // map.dist / MAX_MAX_DIST
            }
        };

        // set current weapon
        game.ship = createShip(game);

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
        if(SHIP_AUTOFIRE || state.input.fire){
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