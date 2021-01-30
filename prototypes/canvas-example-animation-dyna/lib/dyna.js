var dynaMod = (function(){
    var api = {};
    var plugins = {};
    // load a plugin for /dyna
    api.load = function(plug){
        var key = plug.name || 'dyna_' + Object.keys(plugins).length;
        // just ref it in for now as long as that works okay
        plugins[key] = plug;
    };

    api.create = function(){
        var dynas = {};

        Object.keys(plugins).forEach(function(key){
            var plug = plugins[key];
            var dyna = dynas[key] = {};
            dyna.ff = forFrame.create(plug.ffOpt);
            dyna.set = function(frame, argu){
                forFrame.set(dyna.ff, argu);
            };
            dyna.draw = function(ctx){
                plug.draw(dyna.ff, ctx);
            };
        });
        return dynas;
    };
    // return the public api;
    return api;

}());