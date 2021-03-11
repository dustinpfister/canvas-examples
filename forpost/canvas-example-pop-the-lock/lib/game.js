var gameMod = (function(){
    // return the shortest distance to the target from the current position
    var getDistanceFromTarget = function(game){
        return utils.shortestDistance(game.deg.current, game.deg.target, game.deg.total);
    };
    // helpers
    var getInRange = function (game) {
        return game.deg.distance <= game.deg.margin;
    };
    // get a target function, with percent, and range arguments
    var getTarget = function(game, per, rangePer){
        rangePer = utils.clampPer(rangePer === undefined ? 1 : rangePer);
        per = utils.mod(per === undefined ? 0 : per, 1);
        var halfDeg = game.deg.total / 2,
        halfRange = halfDeg * rangePer,
        homeDeg = utils.mod(game.deg.current + halfDeg, game.deg.total),
        deg = utils.mod(homeDeg - halfRange + (halfRange * 2 * per), game.deg.total);
        return Math.floor(deg);
    };
    // get a random target
    var getTargetRandom = function(game){
        return getTarget(game, Math.random(), game.range);
    };
    // public API
    var api = {};
    // CREATE and return a main game object
    api.create = function(){
        var game = {         // THE MAIN GAME OBJECT
            deg: {           // 'degree' object
               perSec: 20,   // degrees per second
               current: 25,  // the current 'degree'
               target: 0,    // the target 'degree'
               total: 100,   // total number of 'degrees'
               margin: 4,    // the margin of 'degrees' +- from target that will still count as in range
               distance: 0   // should be the shortest distance in 'degrees' from target
            },
            range: 0.5,      // a number (0-1) that will set the range in which a new target can be
            dir: -1,         // the direction in which the current degree will change
            inRange: false,  // true if the current degree is in range of the target degree
            score: 0         // player score
        };
        game.deg.target = getTargetRandom(game);
        game.deg.distance = getDistanceFromTarget(game);
        game.inRange = getInRange(game);
        return game;
    };
    // update
    api.update = function(game, secs){
        game.deg.current +=  game.deg.perSec * secs * game.dir; 
        game.deg.current = utils.mod(game.deg.current, game.deg.total);
        game.deg.distance = getDistanceFromTarget(game);
        game.inRange = getInRange(game);
    };
    // create click handler
    api.click = function (game) {
        game.score += game.inRange ? 1 : -1;
        if (game.inRange) {
            game.dir = game.dir === 1 ? -1 : 1;
            game.deg.target = getTargetRandom(game);
        }
    };
    // return public api
    return api;
}());
