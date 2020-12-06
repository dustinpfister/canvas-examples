var gameMod = (function(){
    
    var BLOCK_MAX_DIST = 320;
 

    var api = {};

    var positionBlock = function(state, obj){
        var game = state.game,
        map = game.map,
        rDelta = Math.PI / 180 * 45,
        dist = 160 + 100 * Math.random();
        var a = utils.wrapRadian(map.radian - rDelta + ( rDelta * 2 ) * Math.random()); //Math.PI * 2 * Math.random();
        obj.x = game.ship.x + Math.cos(a) * dist;
        obj.y = game.ship.y + Math.sin(a) * dist;
    };


    api.create = function(plugObj){
        return {
            ship: { 
                x: 0, // ship position relative to map position
                y: 0,
                r: 8
            },
            blocks: poolMod.create({
                spawn: function(obj, pool, state, opt){
                    var game = state.game;

                    // set starting position of block
                    positionBlock(state, obj);
 
                    obj.radian = utils.wrapRadian(game.map.radian + Math.PI);
                    obj.pps = game.map.pps;
                    obj.lifespan = 1;

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
                        obj.lifespan = 0;
                    }
                    // block goes out of range
                    if(obj.data.dist >= BLOCK_MAX_DIST){
                        obj.lifespan = 0;
                    }
                }
            }),
            map: { // map position
                x: 0,
                y: 0,
                radian: Math.PI / 180 * 45,
                pps: 0,
                maxPPS: 256
            }
        };
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
    };

    api.updateBlocks = function(game, secs, state){
        poolMod.update(game.blocks, secs, state);

        poolMod.spawn(game.blocks, state, {});
    };

    // return the Public API
    return api;
}());