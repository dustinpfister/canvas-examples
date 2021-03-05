var gameMod = (function () {
    var api = {};
    api.create = function(){
        var game = {
            grid: new UnitGrid({
                xOffset: 15,
                yOffset: 25,
                cellSize: 32,
                cellWidth: 9
            })
        };
        return game;
    };
    return api;
}
    ());
