var gameMod = (function(){

    var normalizeHalf = function(degree, scale) {
      var halfScale = scale / 2;
      return utils.mod(degree + halfScale, scale) - halfScale;
    };

    var shortestDistance = function(a, b, scale) {
      var halfScale = scale / 2,
      diff = normalizeHalf(a - b, scale);
      if (diff > halfScale){
        diff = diff - scale;
      }
      return Math.abs(diff);
    };

    // return the shortest distance to the target from the current position
    var getDistanceFromTarget = function(game){
        return shortestDistance(game.deg.current, game.deg.target, game.deg.total);
    };

    // helpers
    var getInRange = function (game) {
        return game.deg.distance <= game.deg.margin;
    };
    // get a target Pure Function
    var getTarget = function(game, per){
        per = per === undefined ? 0 : per;
        per = per > 1 ? 1 : per;
        per = per < 0 ? 0 : per;
        return Math.floor(utils.mod(game.deg.total * per, game.deg.total));
    };
    // get a random target
    var getTargetRandom = function(game){
        return getTarget(game, Math.random());
    };
    // set a random target
    var randomTarget = function (game) {
        game.deg.target = utils.mod(Math.floor(Math.random() * (game.deg.total - game.deg.margin * 2)) + game.deg.margin, game.deg.total);
    };
    // public API
    var api = {};
    // create method
    api.create = function(){
        var game = {
            deg: {
               perSec: 5,   // degrees per second
               current: 5,   // the current 'degree'
               target: 0,    // the target 'degree'
               total: 100,   // total number of 'degrees'
               margin: 4,    // the margin of 'degrees' +- from target that will still count as in range
               distance: 0   // should be the shortest distance in 'degrees' from target
            },
            dir: -1,
            inRange: false,
            score: 0
        };

        game.deg.target = getTargetRandom(game);
        game.deg.distance = getDistanceFromTarget(game);
        game.inRange = getInRange(game);
        //randomTarget(game);
        return game;
    };
    // update
    api.update = function(game, secs){
        //game.deg.current +=  game.deg.perSec * secs * game.dir; 
        game.deg.current = utils.mod(game.deg.current, game.deg.total);
        game.deg.distance = getDistanceFromTarget(game);
        game.inRange = getInRange(game);
    };
    // create click handler
    api.click = function (game) {
        game.score += game.inRange ? 1 : -1;
        if (game.inRange) {
            game.dir = game.dir === 1 ? -1 : 1;
            //randomTarget(game);
        }
    };
    // return public api
    return api;
}());
