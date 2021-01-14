// create canvas helper
var createCanvas = function(opt){
    opt = opt || {};
    opt.container = opt.container || document.getElementById('canvas-app') || document.body;
    opt.canvas = document.createElement('canvas');
    opt.ctx = opt.canvas.getContext('2d');
    opt.container.appendChild(opt.canvas);
    opt.canvas.width = opt.width === undefined ? 440 : opt.width;
    opt.canvas.height = opt.height === undefined ? 280 : opt.height;
    opt.ctx.translate(0.5, 0.5);
    return opt;
};
// state object
var canvasObj = createCanvas();
var state = {
    ver: '0.4.0',
    canvas: canvasObj.canvas,
    ctx: canvasObj.ctx,
    ff: forFrame.create({
        type: 'points',
        maxFrame: 50,
        width: canvasObj.canvas.width,
        height: canvasObj.canvas.height
    }),
    lt: new Date(),
    framesPerSec: 20
};

var box = forFrame.create({
   type: 'points',
   maxFrame: 3,
   width: 32,
   height: 32
});

var can = forFrame.createCanvas(box);

// basic app loop
var loop = function(){
    var now = new Date(),
    secs = (now - state.lt) / 1000;
    requestAnimationFrame(loop);
    // draw
    draw.background(state.ctx, state.canvas);
    //draw.box2(state.ctx, state.ff.model);
    draw.ffType(state.ctx, state.ff);
    draw.ffInfo(state.ctx, state.ff, 10, 10);
    draw.ver(state.ctx, state.canvas, state);

    state.ctx.drawImage(can, 32, 32);


    // update by secs
    forFrame.update(state.ff, secs, state.framesPerSec);
    state.lt = now;
};
loop();
