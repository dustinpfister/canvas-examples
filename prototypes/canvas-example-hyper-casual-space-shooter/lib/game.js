var gameMod = (function(){
    
    var BLOCK_COUNT = 20,
    BLOCK_POS_MIN_DIST = 220,
    BLOCK_POS_MAX_DIST = 360,
    BLOCK_POS_ADELTA = 45,    // the max DEGREE left or right from current map angle
    BLOCK_HP_MIN = 100;

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

    // basic random positioning of blocks
    var positionBlock = function(state, obj){
        var game = state.game,
        map = game.map,
        rDelta = Math.PI / 180 * BLOCK_POS_ADELTA,
        dist = BLOCK_POS_MIN_DIST + (BLOCK_POS_MAX_DIST - BLOCK_POS_MIN_DIST) * Math.random();
        var a = utils.wrapRadian(map.radian - rDelta + ( rDelta * 2 ) * Math.random()); //Math.PI * 2 * Math.random();
        obj.x = game.ship.x + Math.cos(a) * dist;
        obj.y = game.ship.y + Math.sin(a) * dist;
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
                    blocks.forEach(function(block){
                        var dist = utils.distance(shot.x, shot.y, block.x, block.y);
                        // if a shot hits a block
                        if(dist <= block.r + shot.r){
                            shot.lifespan = 0;
                            //block.hp.current -= shot.damage;
                            //block.hp.per = block.hp.current / block.hp.max;
                            attackObject(block, shot.damage);
                            if(block.hp.current <= 0 ){
                                block.lifespan = 0;
                                block.active = false;
                            }
                        }
                    });
                }
            });
    };

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
                obj.hp = CreateHPObject(BLOCK_HP_MIN);
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
            ship: { 
                x: 0, // ship position relative to map position
                y: 0,
                r: 8,
                hp: CreateHPObject(100),
                fillStyle: 'blue',
                weaponSecs: 0,
                weapon: {
                    firesPerSecond: 4,
                    shotsPerFire: 1,
                    shotDamage: 2
                }
            },
            shots: createShotsPool(),
            blocks: createBlocksPool(),
            map: { // map position
                x: 0,
                y: 0,
                radian: Math.PI / 180 * 45,
                pps: 0,
                maxPPS: 256
            }
        };
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

    // update the MAP using current RADIAN and PPS values
    // with the given SECS value.
    api.updateMap = function(game, secs){
        game.map.x += Math.cos(game.map.radian) * game.map.pps * secs;
        game.map.y += Math.sin(game.map.radian) * game.map.pps * secs;
        game.map.dist = utils.distance(0, 0, game.map.x, game.map.y)
    };

    api.updateBlocks = function(game, secs, state){
        poolMod.update(game.blocks, secs, state);
        poolMod.spawn(game.blocks, state, {});
    };

    api.updateShots = function(game, secs, state){

        var ship = game.ship,
        weapon = ship.weapon;

        ship.weaponSecs += secs;
        if(ship.weaponSecs >= 1 / weapon.firesPerSecond){
            poolMod.spawn(game.shots, state, {});
            ship.weaponSecs = 0;
        }
        poolMod.update(game.shots, secs, state);
    };

    // return the Public API
    return api;
}());