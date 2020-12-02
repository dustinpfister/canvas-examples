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
                pps: 32
            }
        };
    };

    // update the MAP using current RADIAN and PPS values
    // with the given SECS value.
    api.updateMap = function(game, secs){
        game.map.x += Math.cos(game.map.radian) * game.map.pps * secs;
        game.map.y += Math.sin(game.map.radian) * game.map.pps * secs;
        //game.map.radian += Math.PI / 180 * 45 * secs;
        //game.map.radian = game.map.radian > Math.PI * 2 ? game.map.radian % (Math.PI * 2) : game.map.radian;
    }

    // return the Public API
    return api;
}());