var dynaMod = (function(){
    var api = {};
    var plugins = {};
    // load a plugin for /dyna
    api.load = function(plug){
        var key = plug.name || 'dyna_' + Object.keys(plugins).length;
        // just ref it in for now as long as that works okay
        plugins[key] = plug;
        console.log(plugins);
    };
    api.create = function(opt){
        var dynas = {};
        Object.keys(plugins).forEach(function(key){
            var plug = plugins[key];
            dynas[key] = 
        });
        return dynas;
    };
    api.create = function(dynaName, frame, options){
    };
    // return the public api;
    return api;

}());