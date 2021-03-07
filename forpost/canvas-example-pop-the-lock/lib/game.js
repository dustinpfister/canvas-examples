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
            tick_dir: -1,
            tick_rate: 30,
            tick_last: new Date(),
            inRange: false,
            score: 0
        };
        randomTarget(game);
        return game;
    };
    // tick method
    api.tick = function (game) {
        var time = new Date() - game.tick_last,
        ticks = time / game.tick_rate;
        game.sec_current += ticks * game.tick_dir;
        game.sec_current = utils.mod(game.sec_current, game.sec_total); //game.wrapSec(game.sec_current);
        game.inRange = getInRange(game);
        game.tick_last = new Date();
    };
    // create click handler
    api.click = function (game) {
        return function(e){
            game.score += game.inRange ? 1 : -1;
            if (game.inRange) {
                game.tick_dir = game.tick_dir === 1 ? -1 : 1;
                //game.randomTarget();
                randomTarget(game);
            }
        };
    };
    // return public api
    return api;
}());
