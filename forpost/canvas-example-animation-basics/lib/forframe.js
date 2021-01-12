var forFrame = (function(){

    var DEFAULT_MAX_FRAME = 50,
    DEFAULT_FRAME = 0,
    DEFAULT_WIDTH = 320,
    DEFAULT_HEIGHT = 240;

    // built in forFrame example
    var FORFRAME_BUILT_IN = function(ff, frame, maxFrame){
        return {
            x : 24 + ( ff.width - 48 ) * ff.per,
            y : utils.log1(utils.bias(frame, maxFrame), 1, 16) * ff.height - 24,
            w : 32,
            h : 32,
            r : Math.PI / 180 * 360 * 2 * ff.per,
            fillStyle : 'red'
        };
    };

    var api = {};

    // set frame helper
    var setFrame = function(ff, frame){
        ff.frame = frame;
        ff.frame = utils.mod(ff.frame, ff.maxFrame);
        ff.per = ff.frame / ff.maxFrame;
        ff.model = ff.forFrame(ff, ff.frame, ff.maxFrame);
        return ff;
    };

    // create a plain ff object
    api.create = function(opt){
        opt = opt || {};
        var ff = {
            frame: opt.frame || DEFAULT_FRAME,
            width: opt.width || DEFAULT_WIDTH,
            height: opt.height || DEFAULT_HEIGHT,
            maxFrame: opt.maxFrame || DEFAULT_MAX_FRAME,
            model: {},
            per: 0,
            secs: 0,
            forFrame: opt.forFrame || FORFRAME_BUILT_IN
        };
        ff.model = setFrame(ff, ff.frame);
        return ff;
    };

    api.createPoints = function(opt){
        opt = opt || {};
        var ff = api.create(opt);
        model.points = [];
        return ff;
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