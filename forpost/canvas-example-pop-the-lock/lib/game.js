var gameMod = (function(){
    // helpers
    var getInRange = function (game) {
        return game.deg.current >= game.deg.target - game.deg.margin && game.deg.current <= game.deg.target + game.deg.margin;
    };
    var randomTarget = function (game) {
        game.deg.target = Math.floor(Math.random() * (game.deg.total - game.deg.margin * 2)) + game.deg.margin;
    };
    // public API
    var api = {};
    // create method
    api.create = function(){
        var game = {
            deg: {
               perSec: 40,
               current: 0,
               target: 4,
               total: 100,
               margin: 4
            },
            dir: -1,
            inRange: false,
            score: 0
        };
        randomTarget(game);
        return game;
    };
    // update
    api.update = function(game, secs){
        game.deg.current +=  game.deg.perSec * secs * game.dir; 
        game.deg.current = utils.mod(game.deg.current, game.deg.total); 
        game.inRange = getInRange(game);
    };
    // create click handler
    api.click = function (game) {
        //return function(e){
            game.score += game.inRange ? 1 : -1;
            if (game.inRange) {
                game.dir = game.dir === 1 ? -1 : 1;
                randomTarget(game);
            }
        //};
    };
    // return public api
    return api;
}());
