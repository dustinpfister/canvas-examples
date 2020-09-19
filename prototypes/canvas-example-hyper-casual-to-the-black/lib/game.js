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
            timeUnit: 'years',
            timeToTarget: 0
        };
        api.update(game, 0);
        return game;
    };

    var secsToX = function(secs, x){
        x = x === undefined ? 'days' : x;
        if(x === 'minutes'){
            return secs / 60;
        }
        if(x === 'hours'){
            return secs / 60 / 60;
        }
        if(x === 'days'){
            return secs / 60 / 60 / 24;
        }
        if(x === 'years'){
            return secs / 60 / 60 / 24 / 365.25;
        }
        return secs;
    };

    var timeToDistance = function(game, distance){
        if(game.distance < distance){
            var secs = (distance - game.distance) / game.pps;
            return secs;
        }
        return 0;
    }

    api.update = function(game, secs){
        var secsToTarget = timeToDistance(game, hardCode.maxDistance);
        game.timeToTarget = secsToX(secsToTarget, game.timeUnit);
    };

    return api;
}
    ());
