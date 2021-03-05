var gameMod = (function () {
    var api = {};

    api.create = function(){
        var game = {
            hp: 10,
            hpMax: 100,
            grid: new UnitGrid({
                xOffset: 15,
                yOffset: 25,
                cellSize: 32,
                cellWidth: 9
            })
        };
        return game;
    };

    api.update = function(game){
        var grid = game.grid;
        grid.update();
        if(grid.hits > 0){
            game.hp -= grid.hits;
            grid.hits = 0;
        }
    };

    return api;
}
    ());
