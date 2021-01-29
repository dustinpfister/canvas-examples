var pixmapMod = (function(){

    var api = {};

    var plugins = {};

    api.load = function(plug){
        var key = plug.name || 'pix_' + Object.keys(plugins).length;
        // just ref it in for now as long as that works okay
        plugins[key] = plug;
        console.log(plugins);
    };

    // create and return a forFrame ff object for pixmaps
    var createFF = function(maxFrame, w, h, pixdata, pallette){
        var size = w * h;
        return forFrame.create({
            maxFrame: maxFrame,
            width: w,
            height: h,
            forFrame: function(ff, model, frame, maxFrame, per){
                return {
                   pallette: pallette,
                   pixdata: pixdata.slice(ff.frame * size, ff.frame * size + size)
                };
            }
        });
    };

    // FF draw for pixmaps
    var ffDraw = function(ff, ctx, canvas){
        //var colors = ['black', 'white'];
        var colors = ff.model.pallette;
        ctx.imageSmoothingEnabled = false;
        ff.model.pixdata.forEach(function(colorIndex, pxIndex){
            var x = pxIndex % ff.width,
            y = Math.floor(pxIndex / ff.width);
            if(typeof colors[colorIndex] === 'string'){
                ctx.fillStyle = colors[colorIndex];
                ctx.fillRect(x, y, 1, 1);
            }
        });
    };

    // create a collection of forFrame.js canvas objects
    // based off of what is loaded into the pixmaps object 
    // with pixmapMod.load
    api.create = function(opt){
        var pixmaps = {};
        Object.keys(plugins).forEach(function(key){
            var plug = plugins[key];
            pixmaps[key] = {};
            Object.keys(plug.ani).forEach(function(aniKey){
                var ani = plug.ani[aniKey],
                frameSize = ani.w * ani.h,
                maxFrame = ani.data.length / frameSize,
                palette = plug.palettes[ani.paletteIndex],
                ff = createFF(maxFrame, ani.w, ani.h, ani.data, palette);
                pixmaps[key][aniKey] = forFrame.createCanvas(ff, ffDraw);
            });
        });
        return pixmaps;
    };

    // return the public api;
    return api;

}());