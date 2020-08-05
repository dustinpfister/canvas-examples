var gameMod = (function () {

    var createBaseUnit = function () {
        return {
            HP: 100,
            maxHP: 100,
            weaponIndex: 0,
            active: false
        }
    };

    var api = {};

    // create a new game state
    api.create = function (opt) {
        opt = opt || {};
        var game = {
            mode: 'map',
            maps: [],
            mapIndex: 0
        };
        game.maps.push(mapMod.create());
        return game;
    };

    return api;

}
    ());
