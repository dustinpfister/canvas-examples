var gameMod = (function(){

    var plugs = {
        energy: {
            name: 'energy',
            create: function(game){
                 console.log('create ' + this.name);
            },
            onDeltaYear: function(game, deltaYears){
            }
        }
    };

    var usePlugs = function(game, method, args){
        method = method || 'create';
        args = args || [game]
        Object.keys(plugs).forEach(function(plugKey){
            var plugObj = plugs[plugKey];
            plugObj[method].apply(plugObj, args);
        });
    };

    // public API
    var api = {};
    // create a new game state object
    api.create = function(opt){
        opt = opt || {};
        opt.canvas = opt.canvas || {width: 320, height: 240 };

 
        // base object
        var game = {};
        game.centerX = opt.centerX || opt.canvas.width / 2;
        game.centerY = opt.centerY || opt.canvas.height / 2;
        game.sectionRadius = opt.sectionRadius || 16;
        game.worldRadius = opt.worldRadius || 100;

        game.secs = 0;
        game.year = 0;
        game.yearRate = 1;

        // sun object
        game.sun = {
            radius: 16,
            x: game.centerX,
            y: game.centerY
        };

        // setup sections
        var i = 0,
        sections = [],
        total = opt.sectionCount || 20,
        radian,	
        cx = game.centerX,
        cy = game.centerY;
        while(i < total){
            radian = Math.PI * 2 / total * i;
            sections.push({
                x: Math.cos(radian) * game.worldRadius + cx,
                y: Math.sin(radian) * game.worldRadius + cy,
                radius: game.sectionRadius,
                per: 1
            });
            i += 1;
        }
        game.sections = sections;
        usePlugs(game, 'create', [game, opt])
        gameMod.updateSections(game);
        return game;
    };
    // update sections
    api.updateSections = function(game){
        var sun = game.sun;
        game.sections.forEach(function(section){
            var ajust = section.radius + sun.radius;
            var d = utils.distance(section.x, section.y, sun.x, sun.y) - ajust;
            var per = d / (game.worldRadius * 2 - ajust * 2);
            per = per > 1 ? 1: per;
            per = per < 0 ? 0: per;
            per = 1 - per;
            section.per = per;
        });
    };
    // move sun
    var boundToCircle = function(obj, cx, cy, radius){
        if(utils.distance(obj.x, obj.y, cx, cy) > radius){
            var a = Math.atan2(obj.y - cy, obj.x - cx);
            obj.x = cx + Math.cos(a) * radius;
            obj.y = cy + Math.sin(a) * radius;
        }
    };
    api.moveSun = function(game, pos){
        var ajust = game.sun.radius + game.sectionRadius;
        game.sun.x = pos.x;
        game.sun.y = pos.y;
        boundToCircle(game.sun, game.centerX, game.centerY, game.worldRadius - ajust);
        api.updateSections(sm.game);
    };
    // update method
    api.update = function(game, secs){
        game.secs += secs;
        var deltaYears = Math.floor(game.secs / game.yearRate);
        if(deltaYears >= 1){
            game.year	 += deltaYears;
            game.secs %= game.yearRate;
        }
    };
    api.load = function(plugObj){
    };
    // return the Public API
    return api;

}());