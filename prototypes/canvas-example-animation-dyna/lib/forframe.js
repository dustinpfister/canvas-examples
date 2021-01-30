var forFrame = (function(){

    /********** **********
        CONSTANTS 
    *********************/

    var DEFAULT_MAX_FRAME = 50,
    DEFAULT_FRAME = 0,
    DEFAULT_WIDTH = 320,
    DEFAULT_HEIGHT = 240,
    FORFRAME_BUILT_IN = function(){},
    FFDRAW_BUILT_IN = function(){};

    /********** **********
        HELPERS
    *********************/

    // set frame helper
    var setFrame = function(ff, frame, argu){
        argu = argu || [ff.model, ff.model.points, ff.per];
        ff.frame = frame;
        ff.frame = utils.mod(ff.frame, ff.maxFrame);
        ff.per = ff.frame / ff.maxFrame;
        ff.bias = 1 - Math.abs(0.5 - ff.per) / 0.5;
        // call beforeCall for the current type
        ff.model = {};
        ff.model = ff.forFrame.apply(ff, [ff].concat(argu));
        //ff.model = ff.forFrame(ff);
        return ff;
    };

    /********** **********
        FF object 
    *********************/

    // Public API
    var api = {};
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
        };
        ff.forFrame = opt.forFrame || FORFRAME_BUILT_IN; 
        ff = setFrame(ff, ff.frame);
        return ff;
    };
    // make setFrame public
    api.set = setFrame;
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
        CANVAS OBJECTS
    *********************/

    // create and return a canvas based object on the given ff
    api.createCanvas = function(ff, ffDraw, backFill, stroke, fill){
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = ff.width * ff.maxFrame;
        canvas.height = ff.height;
        ffDraw = ffDraw || FFDRAW_BUILT_IN;
        if(backFill){
            ctx.fillStyle=backFill;
            ctx.fillRect(0,0,canvas.width, canvas.height);
        }
        ff.frame = 0;
        while(ff.frame < ff.maxFrame){
            setFrame(ff, ff.frame);
            ffDraw.apply(ff, [ff, ctx, canvas, stroke, fill]);
            ctx.translate(ff.width, 0);
            ff.frame += 1;
        }
        return {
            canvas: canvas,
            ctx: ctx,
            frame: 0,
            maxFrame: ff.maxFrame,
            cellWidth: ff.width,
            cellHeight: ff.height,
            step: function(delta){
                delta = delta === undefined ? 1 : delta;
                this.frame += delta;
                this.frame = utils.mod(this.frame, this.maxFrame);
            },
            set: function(frame){
                frame = frame === undefined ? 0 : frame;
                this.frame = frame;
                this.frame = utils.mod(this.frame, this.maxFrame);
            },
            // draw the current state of this canvas object
            // to the given canvas, with the given values for position and size
            draw: function(ctx, x, y, w, h){
                ctx.drawImage(this.canvas, this.cellWidth * this.frame, 0, this.cellWidth, this.cellHeight, x, y, w, h);
            }
        };
    };

    // return the public api;
    return api;

}());