var gameMod = (function () {

    var hardCode = {
       maxDistance: 1000000000000,
       pps: {
           start: 32,
           cap: 2048
       }
    };

    var api = {};

    api.create = function(opt){
        opt = opt || {};
        var game = {
            pps: opt.pps || hardCode.pps.start,
            distance: opt.distance === undefined ? 0 : opt.distance,
            target: opt.target === undefined ? hardCode.maxDistance : opt.target,
            timeToTarget: 0
        };
        api.update(game, 0);
        return game;
    };

    var timeToDistance = function(game, distance){
        if(game.distance < distance){
            var secs = (distance - game.distance) / game.pps;
            return secs;
        }
        return 0;
    }

    api.update = function(game, secs){
        game.timeToTarget = timeToDistance(game, hardCode.maxDistance);
    };

    return api;
}
    ());
