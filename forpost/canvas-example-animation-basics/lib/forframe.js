var forFrame = (function(){

    var api = {};

    var setFrame = function(ff, frame){
        ff.frame = frame;
        ff.frame %= ff.maxFrame;
        ff.per = ff.frame / ff.maxFrame;
        ff.model = ff.forFrame(ff, ff.frame, ff.maxFrame);
        return ff.model;
    };

    // create a main ff object
    api.create = function(opt){
        var ff = {
            frame: 0,
            maxFrame: opt.maxFrame || 50,
            model: {},
            per: 0,
            forFrame: opt.forFrame || function(ff, frame, maxFrame){
                return {};
            }
        };
        return ff;
    };

    // update a ff object with the given secs
    api.step = function(ff, stepFrames){
        stepFrames = stepFrames === undefined ? 1 : stepFrames;
        return setFrame(ff, ff.frame + stepFrames);
    };

}());