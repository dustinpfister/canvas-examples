var gameMod = (function(){
    
    var api = {};

    api.create = function(plugObj){
        return {
            ship: { 
                x: 0, // ship position relative to map position
                y: 0,
            },
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
        game.map.radian = Math.PI / 180 * degree;
        // wrap radian
        if(game.map.radian >= Math.PI * 2 || game.map.radian < 0){
            game.map.radian = utils.mod(game.map.radian, Math.PI * 2);
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
    }

    // return the Public API
    return api;
}());