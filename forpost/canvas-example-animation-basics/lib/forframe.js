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
                var len = 5,
                i = len;
                while(i--){
                    points.push({
                       x: ff.width * ( len - ( i + 1 ) ),
                       y: ff.height / 2 - 50 + 100 * ff.per
                    });
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
        // call beforeCall for the current type
        ff.model = FF_TYPES[ff.type].beforeCall(ff);
        var argu = FF_TYPES[ff.type].forframe_arguments(ff);
        ff.model = ff.forFrame.apply(ff, [ff].concat(argu));
        //ff.model = ff.forFrame(ff);
        return ff;
    };

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

    api.createPoints = function(opt){
        opt = opt || {};
        // this will be set to points no matter what if U am to have a public method like this
        opt.type = 'points'; 
        return api.create(opt);
    };

    // STEP an ff object with a given amount of frames
    // as such STEPFRAMES needs to be a whole number
    api.step = function(ff, stepFrames){
        stepFrames = stepFrames === undefined ? 1 : stepFrames;
        stepFrames = Math.round(stepFrames);
        return setFrame(ff, ff.frame + stepFrames);
    };

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

    // return the public api;
    return api;

}());