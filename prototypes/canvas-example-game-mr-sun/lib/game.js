var gameMod = (function(){
    // public API
    var api = {};
    // create a new game state object
    api.create = function(sm){
        var game = {};
        game.sun = {
            radius: 16
        };
        game.sun.x = sm.canvas.width / 2;
        game.sun.y = sm.canvas.height / 2;
        // setup sections
        var i = 0,
        sections = [],
        total = 19,
        radian, 
        radius = 100,
        cx = sm.canvas.width / 2,
        cy = sm.canvas.height / 2;
        while(i < total){
            radian = Math.PI * 2 / total * i;
            sections.push({
                x: Math.cos(radian) * radius + cx,
                y: Math.sin(radian) * radius + cy,
                radius: 16,
                per: 1
            });
            i += 1;
        }
        game.sections = sections;
        gameMod.updateSections(game);
        return game;
    };
    // update sections
    api.updateSections = function(game){
        var sun = game.sun;
        game.sections.forEach(function(section){
            var ajust = section.radius + sun.radius;
            var d = utils.distance(section.x, section.y, sun.x, sun.y) - ajust;
            var per = d / (200 - ajust * 2);
            per = per > 1 ? 1: per;
            per = per < 0 ? 0: per;
            per = 1 - per;
            section.per = per;
        });
    };
    // return the Public API
    return api;

}());