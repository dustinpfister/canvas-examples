var gameMod = (function(){
    // return the shortest distance to the target from the current position
    var getDistanceFromTarget = function(game){
        return utils.shortestDistance(game.deg.current, game.deg.target, game.deg.total);
    };
    // helpers
    var getInRange = function (game) {
        return game.deg.distance <= game.deg.margin;
    };
    // get a target degree, with degOrgin, percent, and range arguments
    var getTarget = function(game, degOrgin, per, rangePer){
        degOrgin = degOrgin === undefined ? game.deg.current: degOrgin;
        per = utils.mod(per === undefined ? 0 : per, 1);
        rangePer = utils.clampPer(rangePer === undefined ? 1 : rangePer);
        var halfDeg = game.deg.total / 2,
        halfRange = halfDeg * rangePer,
        homeDeg = utils.mod(degOrgin + halfDeg, game.deg.total),
        deg = homeDeg - halfRange + (halfRange * 2 * per);
        return utils.mod(Math.round(deg), game.deg.total);
    };
    // get a target degree from a given degOrigin (0 to deg.total) 
    // by a margin (0 to deg.total) in a direction (1, -1)
    var getTargetFrom = function(game, degOrgin, margin, dir){
        margin = margin === undefined ? 0 : margin;
        dir = dir === undefined ? 1 : dir;
        return utils.mod(Math.round(degOrgin + margin * dir), game.deg.total);
    };
    // get a random target
    var getTargetRandom = function(game){
        return getTarget(game, game.deg.current, Math.random(), game.range);
    };
    // get a random target that is a 'trip up' target
    var getTargetRandomTripUp = function(game){
        //var deltaDeg = utils.randomRange(game.tripUp.degMin, game.tripUp.degMax);
        var deltaDeg = utils.randomRange(game.tripUp.degRange);
        return getTargetFrom(game, game.deg.current + deltaDeg * game.dir);
    };
    // create and return a new target
    var newTarget = function(game){
        if(game.tripUp.count > 0){
            game.tripUp.count -= 1;
            return getTargetRandomTripUp(game);
        }
        var roll = Math.random();
        if(roll < game.tripUp.chance){
            game.tripUp.count = Math.floor(utils.randomRange(game.tripUp.countRange));
            return getTargetRandomTripUp(game);
        }
        return getTargetRandom(game);
    };
    // public API
    var api = {};
    // CREATE and return a main game object
    api.create = function(){
        var game = {         // THE MAIN GAME OBJECT
            deg: {           // 'degree' object
               perSec: 30,   // degrees per second
               current: 25,  // the current 'degree'
               target: 0,    // the target 'degree'
               total: 100,   // total number of 'degrees'
               margin: 4,    // the margin of 'degrees' +- from target that will still count as in range
               distance: 0   // should be the shortest distance in 'degrees' from target
            },
            missTrack: {
                canMiss: false,
                count: 0
            },
            clickTrack: {
                total: 0,     // total number of clicks
                hits: 0       // total number of clicks that are hits
            },
            tripUp: {        // settings for 'tripUp' mode
               count: 5,
               chance: 0.12,
               countRange: [3, 10],
               degRange: [10, 20]
            },
            pause: true,
            range: 0.5,      // a number (0-1) that will set the range in which a new target can be whe using getTargetRandom
            dir: -1,         // the direction in which the current degree will change
            inRange: false,  // true if the current degree is in range of the target degree
            score: 0         // player score
        };
        game.deg.target = newTarget(game);
        game.deg.distance = getDistanceFromTarget(game);
        game.inRange = getInRange(game);
        return game;
    };
    // update
    api.update = function(game, secs){
        if(!game.pause){
            game.deg.current +=  game.deg.perSec * secs * game.dir;
        } 
        game.deg.current = utils.mod(game.deg.current, game.deg.total);
        game.deg.distance = getDistanceFromTarget(game);
        game.inRange = getInRange(game);
        if(game.inRange){
            game.missTrack.canMiss = true;
        }
        if(game.missTrack.canMiss && !game.inRange){
            game.missTrack.count += 1;
            game.missTrack.canMiss = false;
        }
    };
    // create click handler
    api.click = function (game) {
        if(!game.pause){
            game.score += game.inRange ? 1 : -1;
            game.clickTrack.total += 1;
            game.clickTrack.hits += game.inRange ? 1 : 0;
            if (game.inRange) {
                game.missTrack.canMiss = false;
                game.dir = game.dir === 1 ? -1 : 1;
                game.deg.target = newTarget(game);
            }
        }
        game.pause = false;
    };
    // return public api
    return api;
}());
