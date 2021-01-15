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
   maxFrame: 30,
   width: 64,
   height: 64,
   forFrame: function(ff, model, frame, maxFrame, per){
       return {
          x: (ff.width - 8) * ff.per,
          y: ff.height / 2 - 4,
          w: 8,
          h: 8
       };
   }
});

var ffDraw = function(ff, ctx, canvas){
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    //ctx.fillText(ff.frame, 5, 5);
    var box = ff.model;
    ctx.fillRect(box.x, box.y, box.w, box.h);
};

var can = forFrame.createCanvas(box, ffDraw, 'green');

// basic app loop
var loop = function(){
    var now = new Date(),
    secs = (now - state.lt) / 1000;
    requestAnimationFrame(loop);
    // draw
    draw.background(state.ctx, state.canvas);


    can.draw(state.ctx, 100, 100, 128, 128);
    // just step frame
    can.step();


    draw.ffType(state.ctx, state.ff);
    draw.ffInfo(state.ctx, state.ff, 10, 10);
    draw.ver(state.ctx, state.canvas, state);

    // update by secs
    forFrame.update(state.ff, secs, state.framesPerSec);
    state.lt = now;
};
loop();
