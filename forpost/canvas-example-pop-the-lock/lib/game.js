var gameMod = (function(){
    // helpers
    var getInRange = function (game) {
        return game.sec_current >= game.sec_target - game.sec_margin && game.sec_current <= game.sec_target + game.sec_margin;
    };
    var randomTarget = function (game) {
        game.sec_target = Math.floor(Math.random() * (game.sec_total - game.sec_margin * 2)) + game.sec_margin;
    };
    // public API
    var api = {};
    // create method
    api.create = function(){
        var game = {
            ver: '0.1.0',
            sec_current: 0,
            sec_target: 4,
            sec_total: 100,
            sec_margin: 4,

            dir: -1,
            degPerSecond: 20,
            inRange: false,
            score: 0
        };
        randomTarget(game);
        return game;
    };
    // update
    api.update = function(game, secs){
        game.sec_current +=  game.degPerSecond * secs * game.dir; 
        game.sec_current = utils.mod(game.sec_current, game.sec_total); 
        game.inRange = getInRange(game);
    };
    // create click handler
    api.click = function (game) {
        return function(e){
            game.score += game.inRange ? 1 : -1;
            if (game.inRange) {
                game.dir = game.dir === 1 ? -1 : 1;
                randomTarget(game);
            }
        };
    };
    // return public api
    return api;
}());
