var pixmapMod = (function(){

    var api = {};

    var pixmaps = {};

    api.load = function(pixObj){
        var pixKey = pixObj.name || 'pix_' + Object.keys(pixmaps).length;
        // just ref it in for now as long as that works okay
        pixmaps[pixKey] = pixObj;
        console.log(pixmaps);
    };

    api.create = function(opt){
    };

    // return the public api;
    return api;

}());