var gameMod = (function(){
    // MODES
    var modeAPI = {};
    var modes = {};


    // public API
    var api = {};

    // make modes public
    api.modes = modes;

    // CREATE and return a main game object
    api.create = function(opt){
        opt = opt || {};
        var game = {
            mode: opt.mode || 'freePlay',
            paused: false,
            gameOver: false
        };
        return game;
    };
    // update
    api.update = function(game, secs){
        // call update method for the current mode
        modes[game.mode].update(modeAPI, game, secs);
    };
    // create click handler
    api.click = function (game, modeOptions) {
        if(!game.pause && !game.gameOver){
            modes[game.mode].onClick(modeAPI, game, modeOptions);
        }
        game.pause = false;
    };
    // load a game mode file
    api.loadMode = function(gameMode){
        // props that should default to utils.noop
        ['init','update','onClick', 'draw'].forEach(function(key){
            gameMode[key] = gameMode[key] || utils.noop;
        });
        gameMode.key = gameMode.key || 'nameMe-' + Object.keys(modes).length;
        gameMode.settings = gameMode.settings || [];
        gameMode.background = gameMode.background || '#4a4a4a';
        gameMode.createBackground = gameMode.createBackground || false;
        modes[gameMode.key] = gameMode;
    };
    // return public api
    return api;
}());
