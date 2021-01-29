var pixmapMod = (function(){

    var api = {};

    var plugins = {};

    api.load = function(plug){
        var key = plug.name || 'pix_' + Object.keys(plugins).length;
        // just ref it in for now as long as that works okay
        plugins[key] = plug;
        console.log(plugins);
    };

    var createFF = function(maxFrame, w, h, pixdata){
        var size = w * h;
        return forFrame.create({
            maxFrame: maxFrame,
            width: w,
            height: h,
            forFrame: function(ff, model, frame, maxFrame, per){
                return pixdata.slice(ff.frame * size, ff.frame * size + size);
            }
        });
    };

    var ffDraw = function(ff, ctx, canvas){
    };

    // create a collection of forFrame.js canvas objects
    // based off of what is loaded into the pixmaps object 
    // with pixmapMod.load
    api.create = function(opt){
        var pixmaps = {};
        Object.keys(plugins).forEach(function(key){
            var plug = plugins[key],
            ani = plug.ani['box1'],
            frameSize = ani.w * ani.h,
            maxFrame = ani.data.length / frameSize,
            ff = createFF(maxFrame, ani.w, ani.h, ani.data);
            pixmaps[key] = {
                ffCanvas : forFrame.createCanvas(ff, ffDraw)
            };
        });
        return pixmaps;
    };

    // return the public api;
    return api;

}());