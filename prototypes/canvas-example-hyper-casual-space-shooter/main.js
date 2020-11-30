var createCanvas = function(opt){
    opt = opt || {};
    opt.container = opt.container || document.getElementById('canvas-app') || document.body;
    opt.canvas = document.createElement('canvas');
    opt.ctx = opt.canvas.getContext('2d');
    opt.container.appendChild(opt.canvas);
    opt.canvas.width = opt.width === undefined ? 320 : opt.width;
    opt.canvas.height = opt.height === undefined ? 240 : opt.height;
    opt.ctx.translate(0.5, 0.5);
    return opt;
};

// STATE
var canvasObj = createCanvas();
var state = {
    canvas : canvasObj.canvas,
    ctx: canvasObj.ctx,
    ship: {
        x: canvasObj.canvas.width / 2,
        y: canvasObj.canvas.height / 2
    }
};

var draw = {
    // draw background
    background: function (ctx, canvas) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
};

var lt = new Date(),
FPS_target = 1000 / 30;

var loop = function () {
    var now = new Date(),
    t = now - lt,
    secs = t / 1000;
    requestAnimationFrame(loop);
    if (t >= FPS_target) {
        draw.background(state.ctx, state.canvas);
        lt = now;
    }
};
loop();