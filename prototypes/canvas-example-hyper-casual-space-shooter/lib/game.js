var gameMod = (function(){
    
    var api = {};

    api.create = function(plugObj){
        return {
            ship: { 
                x: 0, // ship position relative to map position
                y: 0,
                r: 8
            },
            blocks: poolMod.create({
                spawn: function(obj, pool, state, opt){
                    //obj.x = state.canvas.width;
                    //console.log(state);

                    var a = Math.PI * 2 * Math.random();
                    obj.x = state.game.ship.x + Math.cos(a) * 100;
                    obj.y = state.game.ship.y + Math.sin(a) * 100;

                    obj.radian = Math.PI * 1; //Math.PI / 180 * 90 * -1;


                    obj.lifespan = 5;

                },
                update: function(obj, pool, state, secs){
                    //obj.lifespan = 1;
                    var map = state.game.map;
                    var mapDeltaX = Math.cos(map.radian + Math.PI) * (map.pps * 0.5) * secs;
                    var mapDeltaY = Math.sin(map.radian) * (map.pps * 0.5) * secs;
                    var objDeltaX = Math.cos(obj.radian) * obj.pps * secs;
                    var objDeltaY = Math.sin(obj.radian) * obj.pps * secs;
                    obj.x += mapDeltaX + objDeltaX;
                    obj.y += mapDeltaY + objDeltaY;
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
        game.map.radian = Math.PI * 1; //Math.PI / 180 * 90;
        // wrap radian
        if(game.map.radian >= Math.PI * 2 || game.map.radian < 0){
            game.map.radian = utils.mod(game.map.radian , Math.PI * 2);
        }
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