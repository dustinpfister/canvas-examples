var forFrame = (function(){

    var api = {};

    var setFrame = function(ff, frame){
        ff.frame = frame;
        ff.frame = utils.mod(ff.frame, ff.maxFrame);
        ff.per = ff.frame / ff.maxFrame;
        ff.model = ff.forFrame(ff, ff.frame, ff.maxFrame);
        return ff.model;
    };

    // create a main ff object
    api.create = function(opt){
        opt = opt || {};
        var ff = {
            frame: 0,
            width: opt.width || 320,
            height: opt.height || 240,
            maxFrame: opt.maxFrame || 100,
            model: {},
            per: 0,
            forFrame: opt.forFrame || function(ff, frame, maxFrame){
                return {
                    x : -32 + ff.width * ff.per,
                    y : 0 + utils.bias(frame, maxFrame) * (ff.height - 32),
                    w : 32,
                    h : 32
                };
            }
        };
        ff.model = setFrame(ff, 0);
        return ff;
    };

    // update a ff object with the given secs
    api.step = function(ff, stepFrames){
        stepFrames = stepFrames === undefined ? 1 : stepFrames;
        return setFrame(ff, ff.frame + stepFrames);
    };

    // return the public api;
    return api;

}());