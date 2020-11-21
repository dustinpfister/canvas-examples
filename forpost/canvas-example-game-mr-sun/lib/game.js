var gameMod = (function(){
    // the plug-in object
    var plugs = {};
    var getCallPrioritySorted = function(){
        var keys = Object.keys(plugs);
        return keys.sort(function(a, b){
            var plugObjA = plugs[a],
            plugObjB = plugs[b];
            if(plugObjA.callPriority > plugObjB.callPriority){
                return 1;
            }
            if(plugObjA.callPriority < plugObjB.callPriority){
                return -1;
            }
            return 0;
        });
    };
    // use plugins for the given method
    var usePlugs = function(game, methodName, args){
        methodName = methodName || 'create';
        args = args || [game]
        var keys = getCallPrioritySorted();
        keys.forEach(function(plugKey){
            var plugObj = plugs[plugKey],
            method = plugObj[methodName];
            if(method){
                method.apply(plugObj, args);
            }
        });
    };
    // public API
    var api = {};
    // create a new game state object
    api.create = function(opt){
        opt = opt || {};
        opt.canvas = opt.canvas || {width: 320, height: 240 };
        // create base game object
        var game = {};
        game.centerX = opt.centerX || opt.canvas.width / 2;
        game.centerY = opt.centerY || opt.canvas.height / 2;
        game.sectionRadius = opt.sectionRadius || 16;
        game.worldRadius = opt.worldRadius || 100;
        game.secs = 0;
        game.year = opt.year || 0;
        game.yearRate = opt.yearRate || 1;
        // create base sun object
        game.sun = {
            radius: 16,
            x: game.centerX,
            y: game.centerY,
            sunGrid: {}
        };
        // create sections
        var i = 0,
        sections = [],
        total = opt.sectionCount || 20,
        radian,	
        cx = game.centerX,
        cy = game.centerY;
        while(i < total){
            radian = Math.PI * 2 / total * i;
            sections.push({
                i: i,
                x: Math.cos(radian) * game.worldRadius + cx,
                y: Math.sin(radian) * game.worldRadius + cy,
                radius: game.sectionRadius,
                per: 1
            });
            i += 1;
        }
        game.sections = sections;
        // use 'create' method of all plug-ins
        usePlugs(game, 'create', [game, opt]);
        gameMod.updateSections(game);
console.log(game.centerX);
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

    // get a section by canvas position
    api.getSectionByPos = function(game, x, y){
        var section,
        i = game.sections.length;
        while(i--){
            section = game.sections[i];
            if(utils.distance(section.x, section.y, x, y) <= section.radius){
                return section;
            }
        }
        return false;
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
            usePlugs(game, 'onDeltaYear', [game, deltaYears]);
        }
    };
    // load a plug-in
    api.load = function(plugObj){
        var len = Object.keys(plugs).length;
        // use given key name, or else use number of public keys in plugs
        plugObj.name = plugObj.name || len;
        // callPriority defaults to len
        plugObj.callPriority = plugObj.callPriority || len;
        // just reference the object for now
        plugs[plugObj.name] = plugObj;
    };
    // return the Public API
    return api;
}());