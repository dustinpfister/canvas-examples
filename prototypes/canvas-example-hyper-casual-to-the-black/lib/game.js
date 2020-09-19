var gameMod = (function () {

    var api = {};

    api.create = function(opt){
        opt = opt || {};
        var game = {
            distance: opt.distance === undefined ? 0 : opt.distance
        };
        return game;
    };

    return api;
}
    ());
