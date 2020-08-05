var gameMod = (function () {

    var api = {};

    api.create = function (opt) {
        opt = opt || {};
        var game = {
            mode: 'map',
            maps: []
        };
        game.maps.push(mapMod.create());
        return game;
    }
    return api;

}
    ());
