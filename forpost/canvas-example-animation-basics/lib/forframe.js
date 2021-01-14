var forFrame = (function(){

    var DEFAULT_MAX_FRAME = 50,
    DEFAULT_FRAME = 0,
    DEFAULT_WIDTH = 320,
    DEFAULT_HEIGHT = 240;

    var FF_TYPES = {
        // plain generic type
        plain: {
            // this will be called just once when the ff object is created
            // so this method would be a good place to define a custom api
            create: function(ff){
                return ff;
            },
            // this will be called before forFrame is called
            // here a default starting model can be define for the type
            beforeCall: function(ff){
                return {
                    points:[],
                    x: 0,
                    y:0,
                    w : 32,
                    h : 32,
                    r : 0,
                    fillStyle: 'red'
                };
            },
            forframe_arguments: function(ff){
                return [ff.model, ff.frame, ff.maxFrame, ff.per];
            },
            // a default forFrame function if none is given
            default_forframe: function(ff, model, frame, maxFrame, per){
                model.x = 24 + ( ff.width - 48 ) * per;
                model.y = utils.log1(utils.bias(frame, maxFrame), 1, 16) * ff.height - 24;
                model.r = Math.PI / 180 * 360 * 2 * per;
                return model;
            }
        },
        // points type
        points: {
            create: function(ff){
               return ff;
            },
            // starting points model
            beforeCall: function(ff){
               return {
                   points: []
               };
            },
            forframe_arguments: function(ff){
                return [ff.model, ff.model.points, ff.per];
            },
            default_forframe: function(ff, model, points){
                var len = 50,
                i = 0,
                pointPer;
                while(i < len){
                    pointPer = i / len;
                    points.push({
                       x: ff.width * pointPer,
                       y: ff.height * 0.75 - utils.log1(i, len, 8) * (ff.height * 0.25) * ff.bias
                    });
                    i += 1;
                }
                return ff.model;
            }
        }
    };

    var api = {};

    // set frame helper
    var setFrame = function(ff, frame){
        ff.frame = frame;
        ff.frame = utils.mod(ff.frame, ff.maxFrame);
        ff.per = ff.frame / ff.maxFrame;
        ff.bias = 1 - Math.abs(0.5 - ff.per) / 0.5;
        // call beforeCall for the current type
        ff.model = FF_TYPES[ff.type].beforeCall(ff);
        var argu = FF_TYPES[ff.type].forframe_arguments(ff);
        ff.model = ff.forFrame.apply(ff, [ff].concat(argu));
        //ff.model = ff.forFrame(ff);
        return ff;
    };

    /********** **********
        CREATE an ff object 
    *********************/

    // create a plain ff object
    api.create = function(opt){
        opt = opt || {};
        var ff = {
            type: opt.type || 'plain',
            frame: opt.frame || DEFAULT_FRAME,
            width: opt.width || DEFAULT_WIDTH,
            height: opt.height || DEFAULT_HEIGHT,
            maxFrame: opt.maxFrame || DEFAULT_MAX_FRAME,
            model: {},
            per: 0,
            secs: 0
            //forFrame: opt.forFrame || FORFRAME_BUILT_IN
        };
        ff = FF_TYPES[ff.type].create(ff);
        ff.forFrame = opt.forFrame || FF_TYPES[ff.type].default_forframe;
        ff = setFrame(ff, ff.frame);
        return ff;
    };

    // create and return a points type ff object
    api.createPoints = function(opt){
        opt = opt || {};
        // this will be set to points no matter what if U am to have a public method like this
        opt.type = 'points'; 
        return api.create(opt);
    };

    /********** **********
        UPDATE an ff object 
    *********************/

    // STEP an ff object with a given amount of frames
    // as such STEPFRAMES needs to be a whole number
    api.step = function(ff, stepFrames){
        stepFrames = stepFrames === undefined ? 1 : stepFrames;
        stepFrames = Math.round(stepFrames);
        return setFrame(ff, ff.frame + stepFrames);
    };
   // UPDATE an ff Object
    api.update = function(ff, secs, fps){
        var frames;
        secs = secs === undefined ? 0: secs;
        fps = fps === undefined ? 30: fps;
        ff.secs += secs;
        if(ff.secs >= 1 / fps){
            frames = Math.floor(ff.secs / (1 / fps));
            api.step(ff, frames);
            ff.secs = utils.mod(ff.secs, 1 / fps);
        }
        return ff;
    };

    /********** **********
        CANVAS
    *********************/

    // create and return a canvas based on the given ff
    api.createCanvas = function(ff, ffDraw, fill){

        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = ff.width * ff.maxFrame;
        canvas.height = ff.height;

        ffDraw = ffDraw || function(){};
        
        if(fill){
            ctx.fillStyle=fill;
            ctx.fillRect(0,0,canvas.width, canvas.height);
        }

        ff.frame = 0;
        console.log(ff.maxFrame);
        while(ff.frame < ff.maxFrame){

            setFrame(ff, ff.frame);
            ffDraw.apply(ff, [ff, ctx, canvas]);
            ff.frame += 1;
        }

        return canvas;
    };

    // return the public api;
    return api;

}());