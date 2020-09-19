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
            canvas: opt.canvas || {width: 320, height: 240},
            pps: opt.pps || hardCode.pps.start,
            distance: opt.distance === undefined ? 0 : opt.distance,
            gamePer: 0,
            target: {
                distance: opt.targetDistance === undefined ? hardCode.maxDistance : targetDistance,
                timeUnit: opt.targetTimeUnit === undefined ? 'years' : opt.targetTimeUnit,
                ETA: 0
            },
            playerShip: {
                x: 0,
                y: 0,
                w: 32,
                h: 32
            }
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

        // distance
        game.distance = game.distance + game.pps * secs;
        game.distance = game.distance > hardCode.maxDistance ? hardCode.maxDistance : game.distance;
        game.gamePer = game.distance / hardCode.maxDistance;

        // target
        var secsToTarget = timeToDistance(game, game.target.distance);
        game.target.ETA = secsToX(secsToTarget, game.target.timeUnit);

        // player display object
        game.playerShip.x = game.canvas.width / 2 - 16;
        game.playerShip.y = game.canvas.height - 64;
    };

    return api;
}
    ());
